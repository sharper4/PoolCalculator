(() => {
  const TRICHLOR_3IN_TABLET_OZ = 8;
  const TRICHLOR_FC_OZMUL = 6854.95;
  const TRICHLOR_CYA_OZMUL = 4159.41;

  function num(id, fallback = Number.NaN) {
    const el = document.getElementById(id);
    if (!el) return fallback;
    const v = Number.parseFloat(el.value);
    return Number.isFinite(v) ? v : fallback;
  }

  function getGallons() {
    const units = num('units', 0);
    const size = num('size', 0);
    if (units === 1) return size / 3.78541;
    if (units === 2) return size * 1.20095;
    return size;
  }

  function getPoolTempF() {
    const units = num('units', 0);
    const temp = num('temp', Number.NaN);
    if (!Number.isFinite(temp)) return 80;
    return units === 1 ? temp * 9 / 5 + 32 : temp;
  }

  function parseRangeMax(text, fallback) {
    const m = String(text || '').match(/(\d+(?:\.\d+)?)\s*[\u2013-]\s*(\d+(?:\.\d+)?)/);
    if (!m) return fallback;
    return Number.parseFloat(m[2]);
  }

  function parseRangeMin(text, fallback) {
    const m = String(text || '').match(/(\d+(?:\.\d+)?)\s*[\u2013-]\s*(\d+(?:\.\d+)?)/);
    if (!m) return fallback;
    return Number.parseFloat(m[1]);
  }

  function parseTempF(text) {
    const m = String(text || '').replace(/\u00b0/g, '').match(/(\d+(?:\.\d+)?)\s*F/i);
    return m ? Number.parseFloat(m[1]) : Number.NaN;
  }

  function parseUv(text) {
    const m = String(text || '').match(/UV\s*([0-9]+(?:\.[0-9]+)?)/i);
    return m ? Number.parseFloat(m[1]) : Number.NaN;
  }

  function fcDailyLossRate(tempF, cyaPpm, uvIndex) {
    let base;
    if (tempF >= 95) base = 2.6;
    else if (tempF >= 88) base = 2.2;
    else if (tempF >= 80) base = 1.8;
    else if (tempF >= 70) base = 1.3;
    else if (tempF >= 60) base = 0.8;
    else base = 0.4;

    const uvFactor = uvIndex >= 11 ? 1.3 : uvIndex >= 8 ? 1.15 : uvIndex >= 6 ? 0.9 : uvIndex >= 3 ? 0.8 : 0.65;
    const cyaFactor = cyaPpm <= 0 ? 1.45 : cyaPpm <= 30 ? 1.0 : cyaPpm <= 50 ? 0.85 : cyaPpm <= 70 ? 0.72 : cyaPpm <= 90 ? 0.62 : 0.55;
    return Math.round(base * uvFactor * cyaFactor * 10) / 10;
  }

  function ppmPerTrichlorPuck(gallons) {
    return (TRICHLOR_3IN_TABLET_OZ * TRICHLOR_FC_OZMUL) / gallons;
  }

  function cyaPpmPerTrichlorPuck(gallons) {
    return (TRICHLOR_3IN_TABLET_OZ * TRICHLOR_CYA_OZMUL) / gallons;
  }

  function bleachOzForDose(doseNeeded, gallons, percent) {
    if (doseNeeded <= 0) return 0;
    return doseNeeded * gallons / 482.202 * 6 / percent;
  }

  function fmtOz(oz) {
    if (oz <= 0) return '0 oz';
    if (oz >= 128) {
      const gals = Math.floor(oz / 128);
      const rem = Math.round(oz % 128);
      return rem > 0 ? `${gals} gal ${rem} oz` : `${gals} gal`;
    }
    return `${Math.round(oz)} oz`;
  }

  function setChecklistLineText(lineItem, nextText) {
    const label = lineItem.querySelector('label');
    const checkbox = label?.querySelector('input[type="checkbox"]');
    if (!label || !checkbox) {
      lineItem.textContent = nextText;
      return;
    }

    let span = label.querySelector('span');
    if (!span) {
      span = document.createElement('span');
      label.appendChild(span);
    }
    span.textContent = ` ${nextText}`;
  }

  function findForecastLine(prefix) {
    const list = document.getElementById('r-forecast-list');
    if (!list) return null;
    return Array.from(list.querySelectorAll('li')).find((li) => String(li.textContent || '').trim().startsWith(prefix)) || null;
  }

  function patchForecastFcLine() {
    const fcLineItem = findForecastLine('FC:');
    if (!fcLineItem) return;

    const fc = num('fc-from', Number.NaN);
    const cya = num('cya-from', Number.NaN);
    const fcMin = parseRangeMin(document.getElementById('range-fc')?.textContent, 2);
    const fcMax = parseRangeMax(document.getElementById('range-fc')?.textContent, 3);
    const cyaMax = parseRangeMax(document.getElementById('range-cya')?.textContent, 80);
    const gallons = getGallons();
    const blPct = Math.max(0.1, num('fc-percent', 8.25));

    if (!Number.isFinite(fc) || !Number.isFinite(cya) || !Number.isFinite(fcMin) || !Number.isFinite(fcMax) || !Number.isFinite(cyaMax) || !(gallons > 0)) return;

    const forecastText = document.getElementById('weather-forecast')?.value || '';
    const currentText = document.getElementById('weather-conditions')?.value || '';
    const tempF = getPoolTempF();
    const weeklyUv = parseUv(forecastText) || parseUv(currentText) || 7;

    const dailyLoss = fcDailyLossRate(tempF, cya, weeklyUv);
    const weeklyLoss = Math.round(dailyLoss * 7 * 10) / 10;
    const maxBleachPpmToday = Math.max(0, fcMax - fc);
    const bleachPpm = maxBleachPpmToday;
    const bleachOz = bleachOzForDose(bleachPpm, gallons, blPct);
    const immediateFc = fc + bleachPpm;
    const requiredPuckPpm = Math.max(0, Math.round((fcMin - (immediateFc - weeklyLoss)) * 10) / 10);
    if (bleachPpm <= 0 && requiredPuckPpm <= 0) return;

    const ppmPerPuck = ppmPerTrichlorPuck(gallons);
    const cyaPerPuck = cyaPpmPerTrichlorPuck(gallons);
    const targetPucksByDose = ppmPerPuck > 0 ? Math.ceil(requiredPuckPpm / ppmPerPuck) : 0;
    const maxPucksByCya = cyaPerPuck > 0 ? Math.max(0, Math.floor((cyaMax - cya) / cyaPerPuck)) : 0;
    const puckCount = Math.max(0, Math.min(targetPucksByDose, maxPucksByCya));

    const puckPpm = puckCount * ppmPerPuck;
    const puckCyaPpm = puckCount * cyaPerPuck;
    const projectedNextVisit = Math.max(0, Math.round((fc + bleachPpm + puckPpm - weeklyLoss) * 10) / 10);
    const projectedCyaWithPucks = cya + puckCyaPpm;
    const uvLabel = weeklyUv >= 8 ? 'high' : weeklyUv >= 5 ? 'moderate' : 'low';

    const parts = [];
    if (puckCount > 0) parts.push(`${puckCount} trichlor puck${puckCount > 1 ? 's' : ''}`);
    if (bleachPpm > 0.1) parts.push(`${fmtOz(bleachOz)} of ${blPct}% liquid bleach`);

    let line = parts.length
      ? `FC: Add ${parts.join(' + ')} today.`
      : `FC: No practical FC dose can be added today without exceeding the max target (${fcMax} ppm).`;

    if (bleachPpm > 0.1) {
      line += ` Immediate effect: liquid chlorine raises FC from ~${fc.toFixed(1)} to ~${immediateFc.toFixed(1)} ppm today (max target: ${fcMax} ppm).`;
    }

    if (puckCount > 0) {
      line += ` Trichlor adds ~${puckPpm.toFixed(1)} ppm FC and ~${puckCyaPpm.toFixed(1)} ppm CYA over the week, keeping CYA near ~${projectedCyaWithPucks.toFixed(1)} ppm (high limit: ${cyaMax} ppm).`;
    }

    if (puckCount < targetPucksByDose) {
      line += ` Full weekly target is limited by CYA max (${cyaMax} ppm), so plan a mid-week liquid chlorine top-up if needed.`;
    }

    line += ` Projected ~${projectedNextVisit.toFixed(1)} ppm at next visit (min: ${fcMin} ppm). Demand: ~${dailyLoss} ppm/day at ${Math.round(tempF)}F, UV avg ${weeklyUv} (${uvLabel}), CYA ${Math.round(cya)} ppm.`;

    setChecklistLineText(fcLineItem, line);
  }

  function patchForecastCyaLine() {
    const cyaLineItem = findForecastLine('CYA:');
    if (!cyaLineItem) return;

    const cya = num('cya-from', Number.NaN);
    if (!Number.isFinite(cya)) return;

    const rangeText = document.getElementById('range-cya')?.textContent || '';
    const cyaMin = parseRangeMin(rangeText, 30);
    const tempF = getPoolTempF();
    const cyaWeeklyLoss = tempF >= 85 ? 2 : 1;
    const cyaProjected = Math.round(cya - cyaWeeklyLoss);

    const next = cyaProjected >= cyaMin
      ? `CYA: No addition today. Projected ~${cyaProjected} ppm at next visit (min: ${cyaMin} ppm; ~${cyaWeeklyLoss} ppm/week at ${Math.round(tempF)}°F).`
      : `CYA: Add stabilizer today to at least ${cyaMin} ppm (currently ${Math.round(cya)} ppm; will lose ~${cyaWeeklyLoss} ppm this week). Low CYA accelerates FC burn-off.`;

    setChecklistLineText(cyaLineItem, next);
  }

  function patchForecastAlkLine() {
    const alkLineItem = findForecastLine('Alk:');
    if (!alkLineItem) return;

    const ta = num('ta-from', Number.NaN);
    if (!Number.isFinite(ta)) return;

    const taRange = document.getElementById('range-ta')?.textContent || '';
    const taMin = parseRangeMin(taRange, 80);
    const taMax = parseRangeMax(taRange, 120);
    const phLineText = String(findForecastLine('pH:')?.textContent || '');
    const forecastUsesAcid = /Add\s+.*muriatic acid/i.test(phLineText);
    const taWeeklyDrop = forecastUsesAcid ? 8 : 3;
    const taProjected = Math.round(ta - taWeeklyDrop);

    let next;
    if (ta > taMax) {
      next = `Alk: High at ${Math.round(ta)} ppm — no bicarbonate dose today. pH-control acid will reduce it ~${taWeeklyDrop} ppm/week toward target (${taMin}–${taMax} ppm).`;
    } else if (taProjected >= taMin) {
      next = `Alk: Stable — no dose needed today. Projected ~${taProjected} ppm at next visit (target: ${taMin}–${taMax} ppm).`;
    } else {
      const gallons = getGallons();
      const taBoostNeeded = taMin - taProjected;
      const bakingSodaOz = taBoostNeeded * gallons / 4461.56;
      const taImmediate = Math.round(ta + taBoostNeeded);
      const taNextVisit = Math.round(taImmediate - taWeeklyDrop);
      next = `Alk: Projected ~${taProjected} ppm — below minimum (${taMin} ppm). Add ~${Math.round(bakingSodaOz)} oz of baking soda today. Immediate effect today: Alk ~${Math.round(ta)} → ~${taImmediate} ppm. 1-week projection after normal drift (~${taWeeklyDrop} ppm): ~${taNextVisit} ppm (target: ${taMin}–${taMax} ppm).`;
    }

    setChecklistLineText(alkLineItem, next);
  }

  function runPatchSoon() {
    window.requestAnimationFrame(() => {
      patchForecastFcLine();
      patchForecastCyaLine();
      patchForecastAlkLine();
    });
  }

  document.addEventListener('input', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (target.matches('#fc-from, #cya-from, #ta-from, #ph-from, #fc-percent, #size, #temp, #units, #weather-forecast, #weather-conditions')) {
      runPatchSoon();
    }
  });

  document.addEventListener('change', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (target.matches('#fc-from, #cya-from, #ta-from, #ph-from, #fc-percent, #size, #temp, #units, #weather-forecast, #weather-conditions')) {
      runPatchSoon();
    }
  });

  const forecastList = document.getElementById('r-forecast-list');
  if (forecastList) {
    const observer = new MutationObserver(() => runPatchSoon());
    observer.observe(forecastList, { childList: true, subtree: true });
  }

  runPatchSoon();
})();
