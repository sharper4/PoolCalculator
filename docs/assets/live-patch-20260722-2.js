(() => {
  function num(el, fallback = 0) {
    const value = Number.parseFloat(el?.value ?? '');
    return Number.isFinite(value) ? value : fallback;
  }

  function intNum(el, fallback = 0) {
    const value = Number.parseInt(el?.value ?? '', 10);
    return Number.isFinite(value) ? value : fallback;
  }

  function parseWeatherTemp(weatherValue) {
    const match = String(weatherValue || '').replace(/°/g, '').match(/(\d+)F/);
    return match ? Number.parseInt(match[1], 10) : 80;
  }

  function getGallons(refs) {
    const system = Number.parseFloat(refs.units?.value || '0');
    const size = num(refs.size);
    if (system === 1) return size / 3.78541;
    if (system === 2) return size * 1.20095;
    return size;
  }

  function fcDailyLossRate(tempF, cyaPpm, uvIndex) {
    let base;
    if (tempF >= 90) base = 3.2;
    else if (tempF >= 80) base = 2.5;
    else if (tempF >= 70) base = 1.8;
    else if (tempF >= 60) base = 1.0;
    else base = 0.5;

    const uvFactor =
      uvIndex >= 11 ? 1.45 :
      uvIndex >= 8 ? 1.25 :
      uvIndex >= 6 ? 1.0 :
      uvIndex >= 3 ? 0.75 :
      0.5;

    const cyaFactor =
      cyaPpm <= 0 ? 1.5 :
      cyaPpm <= 30 ? 1.0 :
      cyaPpm <= 60 ? 0.82 :
      0.65;

    return Math.round(base * uvFactor * cyaFactor * 10) / 10;
  }

  function phWeeklyRise(taPpm, aeration) {
    let base;
    if (taPpm > 120) base = 0.4;
    else if (taPpm > 90) base = 0.3;
    else if (taPpm > 60) base = 0.2;
    else base = 0.1;

    const aerationFactor =
      aeration === 'high' ? 1.6 :
      aeration === 'medium' ? 1.2 :
      aeration === 'low' ? 0.85 :
      0.6;

    return Math.round(base * aerationFactor * 100) / 100;
  }

  function updatePassiveOutlook() {
    const refs = {
      passiveOutlook: document.getElementById('passive-outlook'),
      units: document.getElementById('units'),
      size: document.getElementById('size'),
      temp: document.getElementById('temp'),
      weatherConditions: document.getElementById('weather-conditions'),
      fcFrom: document.getElementById('fc-from'),
      phFrom: document.getElementById('ph-from'),
      taFrom: document.getElementById('ta-from'),
      chFrom: document.getElementById('ch-from'),
      cyaFrom: document.getElementById('cya-from'),
      cyaTo: document.getElementById('cya-to'),
      saltFrom: document.getElementById('salt-from'),
      borFrom: document.getElementById('bor-from'),
      phAeration: document.getElementById('ph-aeration')
    };

    if (!refs.passiveOutlook) return;

    const tested = {
      fc: refs.fcFrom?.value.trim() !== '',
      ph: refs.phFrom?.value.trim() !== '',
      ta: refs.taFrom?.value.trim() !== '',
      ch: refs.chFrom?.value.trim() !== '',
      cya: refs.cyaFrom?.value.trim() !== '',
      salt: refs.saltFrom?.value.trim() !== '',
      bor: refs.borFrom?.value.trim() !== ''
    };

    const tempF = parseWeatherTemp(refs.weatherConditions?.value) || num(refs.temp, 80);
    const uvIndex = 7;
    const gallons = getGallons(refs);
    void gallons;
    const lines = [];

    if (tested.fc) {
      const fc = num(refs.fcFrom);
      const cyaForModel = tested.cya ? num(refs.cyaFrom) : num(refs.cyaTo);
      const dailyLoss = fcDailyLossRate(tempF, cyaForModel, uvIndex);
      const weeklyLoss = Math.round(dailyLoss * 7 * 10) / 10;
      const fcProjected = Math.max(0, Math.round((fc - weeklyLoss) * 10) / 10);
      const cyaBasis = tested.cya ? '' : ' using target CYA as the fallback model basis.';
      lines.push(`FC: If untreated, expect ~${dailyLoss.toFixed(1)} ppm/day reduction (~${weeklyLoss.toFixed(1)} ppm this week) → ~${fcProjected.toFixed(1)} ppm in 7 days.${cyaBasis}`);
    }

    if (tested.ph) {
      const ph = num(refs.phFrom);
      const taForModel = intNum(refs.taFrom, 100);
      const aeration = refs.phAeration?.value || 'medium';
      const weeklyRise = phWeeklyRise(taForModel, aeration);
      const dailyRise = Math.round((weeklyRise / 7) * 100) / 100;
      const phProjected = Math.round((ph + weeklyRise) * 100) / 100;
      lines.push(`pH: If untreated, expect ~${dailyRise.toFixed(2)}/day rise (~${weeklyRise.toFixed(2)}/week) → ~${phProjected.toFixed(2)} in 7 days.`);
    }

    if (tested.ta) {
      const ta = num(refs.taFrom);
      const weeklyLoss = 3;
      const dailyLoss = Math.round((weeklyLoss / 7) * 10) / 10;
      const projected = Math.max(0, Math.round(ta - weeklyLoss));
      lines.push(`TA: If untreated, model ~${dailyLoss.toFixed(1)} ppm/day reduction (~${weeklyLoss} ppm this week) → ~${projected} ppm in 7 days.`);
    }

    if (tested.cya) {
      const cya = num(refs.cyaFrom);
      const weeklyLoss = tempF >= 85 ? 2 : 1;
      const dailyLoss = Math.round((weeklyLoss / 7) * 10) / 10;
      const projected = Math.max(0, Math.round(cya - weeklyLoss));
      lines.push(`CYA: If untreated, expect ~${dailyLoss.toFixed(1)} ppm/day loss (~${weeklyLoss} ppm this week) → ~${projected} ppm in 7 days.`);
    }

    if (tested.ch) {
      lines.push('CH: If untreated, no meaningful weekly draw is modeled under normal conditions.');
    }

    if (tested.salt) {
      lines.push('Salt: If untreated, no meaningful weekly draw is modeled unless water is lost or diluted.');
    }

    if (tested.bor) {
      lines.push('Borate: If untreated, no meaningful weekly draw is modeled in the normal forecast window.');
    }

    refs.passiveOutlook.innerHTML = lines.length
      ? lines.join('<br>')
      : 'Enter current "Now" test values to see modeled do-nothing draw and drift.';
  }

  function init() {
    updatePassiveOutlook();
    document.addEventListener('input', updatePassiveOutlook, true);
    document.addEventListener('change', updatePassiveOutlook, true);
    window.setTimeout(updatePassiveOutlook, 1000);
    window.setTimeout(updatePassiveOutlook, 4000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
