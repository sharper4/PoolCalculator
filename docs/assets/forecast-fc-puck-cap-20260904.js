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

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function getGallons() {
    const units = num('units', 0);
    const size = num('size', 0);
    if (units === 1) return size / 3.78541;
    if (units === 2) return size * 1.20095;
    return size;
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
    if (tempF >= 90) base = 3.2;
    else if (tempF >= 80) base = 2.5;
    else if (tempF >= 70) base = 1.8;
    else if (tempF >= 60) base = 1.0;
    else base = 0.5;

    const uvFactor = uvIndex >= 11 ? 1.45 : uvIndex >= 8 ? 1.25 : uvIndex >= 6 ? 1.0 : uvIndex >= 3 ? 0.75 : 0.5;
    const cyaFactor = cyaPpm <= 0 ? 1.5 : cyaPpm <= 30 ? 1.0 : cyaPpm <= 60 ? 0.82 : 0.65;
    return Math.round(base * uvFactor * cyaFactor * 10) / 10;
  }

  function ppmPerTrichlorPuck(gallons) {
    return (TRICHLOR_3IN_TABLET_OZ * TRICHLOR_FC_OZMUL) / gallons;
  }

  function cyaPpmPerTrichlorPuck(gallons) {
    return (TRICHLOR_3IN_TABLET_OZ * TRICHLOR_CYA_OZMUL) / gallons;
  }

  function practicalWeeklyTrichlorPuckCap(gallons) {
    if (gallons <= 0) return 0;
    return clamp(Math.round(gallons / 8000), 1, 8);
  }

  function shockLevelForCya(cyaPpm) {
    return Math.max(10, Math.floor(cyaPpm / 6 + 8.5));
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

  function patchForecastFcLine() {
    const list = document.getElementById('r-forecast-list');
    if (!list) return;

    const fcLineItem = Array.from(list.querySelectorAll('li')).find((li) => String(li.textContent || '').trim().startsWith('FC:'));
    if (!fcLineItem) return;

    const fc = num('fc-from', Number.NaN);
    const cya = num('cya-from', Number.NaN);
    const fcMin = parseRangeMin(document.getElementById('range-fc')?.textContent, 2);
    const cyaMax = parseRangeMax(document.getElementById('range-cya')?.textContent, 80);
    const gallons = getGallons();
    const blPct = Math.max(0.1, num('fc-percent', 8.25));

    if (!Number.isFinite(fc) || !Number.isFinite(cya) || !Number.isFinite(fcMin) || !Number.isFinite(cyaMax) || !(gallons > 0)) return;

    const forecastText = document.getElementById('weather-forecast')?.value || '';
    const currentText = document.getElementById('weather-conditions')?.value || '';
    const tempF = parseTempF(forecastText) || parseTempF(currentText) || 80;
    const weeklyUv = parseUv(forecastText) || parseUv(currentText) || 7;

    const dailyLoss = fcDailyLossRate(tempF, cya, weeklyUv);
    const weeklyLoss = Math.round(dailyLoss * 7 * 10) / 10;
    const requiredNow = Math.round((fcMin + weeklyLoss) * 10) / 10;
    const doseNeeded = Math.max(0, Math.round((requiredNow - fc) * 10) / 10);
    if (doseNeeded <= 0) return;

    const ppmPerPuck = ppmPerTrichlorPuck(gallons);
    const cyaPerPuck = cyaPpmPerTrichlorPuck(gallons);
    const maxPucksByDose = Math.floor(doseNeeded / ppmPerPuck);
    const maxPucksByCya = cyaPerPuck > 0 ? Math.max(0, Math.floor((cyaMax - cya) / cyaPerPuck)) : 0;
    const practicalCap = practicalWeeklyTrichlorPuckCap(gallons);
    const puckCount = Math.max(0, Math.min(maxPucksByDose, maxPucksByCya, practicalCap));

    const puckPpm = puckCount * ppmPerPuck;
    const puckCyaPpm = puckCount * cyaPerPuck;
    const remainingAfterPucks = Math.max(0, doseNeeded - puckPpm);
    const shockLevel = shockLevelForCya(cya);
    const maxBleachPpmToday = Math.max(0, shockLevel - fc);
    const bleachPpm = Math.min(remainingAfterPucks, maxBleachPpmToday);
    const bleachOz = bleachOzForDose(bleachPpm, gallons, blPct);
    const immediateFc = fc + bleachPpm;
    const projectedNextVisit = Math.max(0, Math.round((fc + bleachPpm + puckPpm - weeklyLoss) * 10) / 10);
    const projectedCyaWithPucks = cya + puckCyaPpm;
    const uvLabel = weeklyUv >= 8 ? 'high' : weeklyUv >= 5 ? 'moderate' : 'low';

    const parts = [];
    if (puckCount > 0) parts.push(`${puckCount} trichlor puck${puckCount > 1 ? 's' : ''}`);
    if (bleachPpm > 0.1) parts.push(`${fmtOz(bleachOz)} of ${blPct}% liquid bleach`);

    let line = parts.length
      ? `FC: Add ${parts.join(' + ')} today.`
      : `FC: No practical FC dose can be added today without exceeding shock (${shockLevel} ppm).`;

    if (bleachPpm > 0.1) {
      line += ` Immediate effect: liquid chlorine raises FC from ~${fc.toFixed(1)} to ~${immediateFc.toFixed(1)} ppm today (shock cap: ${shockLevel} ppm).`;
    }

    if (puckCount > 0) {
      line += ` Trichlor adds ~${puckPpm.toFixed(1)} ppm FC and ~${puckCyaPpm.toFixed(1)} ppm CYA over the week, keeping CYA near ~${projectedCyaWithPucks.toFixed(1)} ppm (high limit: ${cyaMax} ppm).`;
    }

    if (maxPucksByDose > puckCount && puckCount === practicalCap) {
      line += ` Trichlor is capped at ${practicalCap} puck${practicalCap > 1 ? 's' : ''} per week for practical dosing; remaining demand is covered with liquid chlorine.`;
    }

    if (remainingAfterPucks > maxBleachPpmToday + 0.1) {
      line += ` Full weekly target would require exceeding shock today, so bleach is capped at ~${shockLevel} ppm immediate FC.`;
    }

    line += ` Projected ~${projectedNextVisit.toFixed(1)} ppm at next visit (min: ${fcMin} ppm). Demand: ~${dailyLoss} ppm/day at ${Math.round(tempF)}F, UV avg ${weeklyUv} (${uvLabel}), CYA ${Math.round(cya)} ppm.`;

    setChecklistLineText(fcLineItem, line);
  }

  function runPatchSoon() {
    window.requestAnimationFrame(() => {
      patchForecastFcLine();
    });
  }

  document.addEventListener('input', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (target.matches('#fc-from, #cya-from, #fc-percent, #size, #units, #weather-forecast, #weather-conditions')) {
      runPatchSoon();
    }
  });

  document.addEventListener('change', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (target.matches('#fc-from, #cya-from, #fc-percent, #size, #units, #weather-forecast, #weather-conditions')) {
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
