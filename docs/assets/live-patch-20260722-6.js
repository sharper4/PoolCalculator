(() => {
  const TRICHLOR_EFFECT_INDEX = 4;
  const TRICHLOR_3IN_TABLET_OZ = 8;

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

  function parseWeatherUv(weatherValue) {
    const match = String(weatherValue || '').match(/UV\s*([0-9]+(?:\.[0-9]+)?)/i);
    return match ? Number.parseFloat(match[1]) : Number.NaN;
  }

  function weatherModelSourceFromFields() {
    const forecastText = String(document.getElementById('weather-forecast')?.value || '').trim();
    if (!forecastText) return 'baseline';
    if (/^forecast unavailable/i.test(forecastText)) return 'baseline';
    if (/^current weather fallback/i.test(forecastText)) return 'current';
    return 'forecast';
  }

  function syncForecastPlanModelNote() {
    const list = document.getElementById('r-forecast-list');
    if (!list) return;

    const source = weatherModelSourceFromFields();
    const existing = list.querySelector('li[data-weather-model-note="1"]');
    if (existing) existing.remove();

    if (source === 'forecast') return;

    const note = document.createElement('li');
    note.dataset.weatherModelNote = '1';
    note.textContent = source === 'current'
      ? 'Weather model note: 5-day forecast inputs were unavailable, so this forecast plan is temporarily using current weather conditions.'
      : 'Weather model note: Weather inputs are unavailable, so this forecast plan is using baseline assumptions (80F, UV 7).';
    list.insertBefore(note, list.firstChild);
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

  function weatherCodeLabel(code) {
    if (code >= 1 && code <= 3) return 'Partly Cloudy';
    if (code >= 45 && code <= 48) return 'Fog';
    if (code >= 51 && code <= 67) return 'Rain';
    if (code >= 71 && code <= 77) return 'Snow';
    if (code >= 80 && code <= 82) return 'Rain Showers';
    if (code >= 95) return 'Thunderstorm';
    return 'Clear';
  }

  function averageFirstDays(values, count, digits = 0) {
    const usable = (values || []).slice(0, count).filter(Number.isFinite);
    if (!usable.length) return Number.NaN;
    const avg = usable.reduce((sum, value) => sum + value, 0) / usable.length;
    const factor = 10 ** digits;
    return Math.round(avg * factor) / factor;
  }

  function dominantWeatherLabel(codes, count) {
    const usable = (codes || []).slice(0, count).filter(Number.isFinite);
    if (!usable.length) return 'Clear';
    const counts = new Map();
    usable.forEach((code) => {
      const label = weatherCodeLabel(code);
      counts.set(label, (counts.get(label) || 0) + 1);
    });
    return [...counts.entries()].sort((a, b) => b[1] - a[1])[0][0];
  }

  function syncReportForecastWeather() {
    const reportForecast = document.getElementById('r-weather-forecast');
    const forecastField = document.getElementById('weather-forecast');
    if (!reportForecast || !forecastField) return;
    reportForecast.textContent = forecastField.value || 'Unavailable';
    syncForecastPlanModelNote();
  }

  function resolveForecastFallback(force) {
    const forecastField = document.getElementById('weather-forecast');
    const currentField = document.getElementById('weather-conditions');
    if (!forecastField) return;

    const text = String(forecastField.value || '').trim();
    const pendingText = /^(loading\s*5-?day\s*forecast|waiting for weather permission and forecast data)/i.test(text);
    const shouldFallback = !text || pendingText;
    if (!shouldFallback) {
      syncReportForecastWeather();
      return;
    }

    const fallbackTemp = parseWeatherTemp(currentField?.value || '');
    const fallbackUv = parseWeatherUv(currentField?.value || '');
    if (Number.isFinite(fallbackTemp) && Number.isFinite(fallbackUv)) {
      forecastField.value = `Current weather fallback, ${Math.round(fallbackTemp)}F (feels ${Math.round(fallbackTemp)}F), wind 0 mph, UV ${Math.round(fallbackUv * 10) / 10}`;
    } else {
      forecastField.value = 'Forecast unavailable (location permission or weather service issue).';
    }
    syncReportForecastWeather();
  }

  async function updateWeatherSummary() {
    const currentField = document.getElementById('weather-conditions');
    const forecastField = document.getElementById('weather-forecast');
    if (!currentField || !forecastField) return;
    if (!navigator.geolocation) {
      forecastField.value = 'Forecast unavailable (geolocation not supported).';
      syncReportForecastWeather();
      return;
    }

    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: false,
          timeout: 6000,
          maximumAge: 300000
        });
      });

      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m,uv_index&daily=weather_code,temperature_2m_max,apparent_temperature_max,wind_speed_10m_max,uv_index_max&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=auto`);
      if (!response.ok) {
        forecastField.value = 'Forecast unavailable (weather service error).';
        syncReportForecastWeather();
        return;
      }

      const payload = await response.json();
      const current = payload.current || {};
      const currentUv = Number.isFinite(Number(current.uv_index))
        ? Math.round(Number(current.uv_index) * 10) / 10
        : averageFirstDays(payload.daily?.uv_index_max, 1, 1);
      currentField.value = `${weatherCodeLabel(Number(current.weather_code))}, ${Math.round(current.temperature_2m)}F (feels ${Math.round(current.apparent_temperature)}F), wind ${Math.round(current.wind_speed_10m)} mph, UV ${currentUv}`;

      const forecastCount = 5;
      const avgTemp = averageFirstDays(payload.daily?.temperature_2m_max, forecastCount, 0);
      const avgFeels = averageFirstDays(payload.daily?.apparent_temperature_max, forecastCount, 0);
      const avgWind = averageFirstDays(payload.daily?.wind_speed_10m_max, forecastCount, 0);
      const avgUv = averageFirstDays(payload.daily?.uv_index_max, forecastCount, 1);
      const forecastLabel = dominantWeatherLabel(payload.daily?.weather_code, forecastCount);
      const hasForecastTemp = Number.isFinite(avgTemp);
      const hasForecastUv = Number.isFinite(avgUv);
      forecastField.value = hasForecastTemp && hasForecastUv
        ? `${forecastLabel}, ${Math.round(avgTemp)}F (feels ${Math.round(avgFeels)}F), wind ${Math.round(avgWind)} mph, UV ${avgUv}`
        : `Current weather fallback, ${Math.round(current.temperature_2m)}F (feels ${Math.round(current.apparent_temperature)}F), wind ${Math.round(current.wind_speed_10m)} mph, UV ${currentUv}`;
      syncReportForecastWeather();
    } catch {
      forecastField.value = 'Forecast unavailable (location blocked or weather fetch failed).';
      syncReportForecastWeather();
    }
  }

  function formatEffect(value) {
    if (value < 9.95) return Math.floor(value * 10 + 0.5) / 10;
    return Math.floor(value + 0.5);
  }

  function round2(value) {
    return Math.round(value * 100) / 100;
  }

  function syncTrichlorEffectUi() {
    const effPop = document.getElementById('eff-pop');
    const effUnit = document.getElementById('eff-unit');
    const effOz = document.getElementById('eff-oz');
    const effResult = document.getElementById('eff-result');
    const units = document.getElementById('units');
    const size = document.getElementById('size');

    if (!effPop || !effUnit || !effOz || !effResult || Number(num(effPop)) !== TRICHLOR_EFFECT_INDEX) {
      return;
    }

    const currentUnit = effUnit.value;
    const amount = num(effOz);
    let baseOz = amount;

    if (currentUnit === 'tab3') {
      baseOz = amount * TRICHLOR_3IN_TABLET_OZ;
    } else if (currentUnit === 'lb') {
      baseOz = amount * 16;
    } else if (currentUnit === 'kg') {
      baseOz = amount * 35.274;
    } else if (currentUnit === 'g') {
      baseOz = amount * 0.035274;
    }

    const system = Number(num(units));
    const options = system === 1
      ? [['tab3', '3" tablets'], ['g', 'grams'], ['kg', 'kilograms']]
      : [['tab3', '3" tablets'], ['oz', 'oz'], ['lb', 'pounds']];

    effUnit.innerHTML = '';
    options.forEach(([value, label]) => {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = label;
      effUnit.appendChild(option);
    });

    const nextUnit = options.some(([value]) => value === currentUnit) ? currentUnit : 'tab3';
    effUnit.value = nextUnit;

    if (nextUnit === 'tab3') {
      effOz.value = String(round2(baseOz / TRICHLOR_3IN_TABLET_OZ));
    }

    const gallons = getGallons({ units, size });
    const activeAmount = num(effOz);
    const activeOz = effUnit.value === 'tab3'
      ? activeAmount * TRICHLOR_3IN_TABLET_OZ
      : effUnit.value === 'lb'
        ? activeAmount * 16
        : effUnit.value === 'kg'
          ? activeAmount * 35.274
          : effUnit.value === 'g'
            ? activeAmount * 0.035274
            : activeAmount;

    const unitLabel = effUnit.options[effUnit.selectedIndex]?.textContent || effUnit.value;
    const singularUnitLabel = Math.abs(activeAmount - 1) < 0.0001 ? unitLabel.replace(/s$/, '') : unitLabel;
    effResult.textContent = `Adding ${activeAmount} ${singularUnitLabel} of trichlor will raise FC by ${formatEffect(activeOz / gallons * 6854.95)}, raise CYA by ${formatEffect(activeOz / gallons * 4159.41)}, lower pH by ${round2(activeOz / gallons * 367)}, and raise Salt by ${formatEffect(activeOz / gallons * 5600)}.`;
  }

  function updateBuildBadge() {
    const badge = document.getElementById('build-badge');
    if (!badge) return;

    const modified = new Date(document.lastModified);
    if (Number.isNaN(modified.getTime())) {
      badge.textContent = 'Build live';
      return;
    }

    const year = modified.getFullYear();
    const month = String(modified.getMonth() + 1).padStart(2, '0');
    const day = String(modified.getDate()).padStart(2, '0');
    const hour = String(modified.getHours()).padStart(2, '0');
    const minute = String(modified.getMinutes()).padStart(2, '0');
    badge.textContent = `Build ${year}.${month}.${day}.${hour}${minute}`;
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

    const forecastValue = document.getElementById('weather-forecast')?.value || '';
    const forecastTemp = parseWeatherTemp(forecastValue);
    const forecastUv = parseWeatherUv(forecastValue);
    const currentTemp = parseWeatherTemp(refs.weatherConditions?.value);
    const currentUv = parseWeatherUv(refs.weatherConditions?.value);

    const useForecast = Number.isFinite(forecastUv) && !/^current weather fallback/i.test(String(forecastValue));
    const useCurrentFallback = !useForecast && Number.isFinite(currentUv);
    const tempF = useForecast ? forecastTemp : useCurrentFallback ? currentTemp : num(refs.temp, 80);
    const uvIndex = useForecast ? forecastUv : useCurrentFallback ? currentUv : 7;
    const gallons = getGallons(refs);
    void gallons;
    const lines = [];

    if (useCurrentFallback) {
      lines.push('Note: 5-day forecast inputs were unavailable, so this model is using current weather as fallback.');
    } else if (!useForecast) {
      lines.push('Note: Weather inputs are unavailable, so this model is using baseline assumptions (80F, UV 7).');
    }

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

  function updateGoalNote() {
    const cyaFrom = document.getElementById('cya-from');
    const goalNote = document.getElementById('goal-note');
    if (!goalNote) return;

    const cya = intNum(cyaFrom, 0);
    const shock = Math.max(10, Math.floor(cya / 6 + 8.5));
    const mustard = Math.max(12, Math.floor(cya / 2 + 4.5));
    goalNote.textContent = `Shock and SLAM use the same FC level here: ${shock} ppm at the current CYA. Reach it with liquid chlorine, then test and re-dose often enough to hold that FC until the water is clear, combined chlorine is 0.5 ppm or less, and overnight FC loss is 1 ppm or less. Mustard algae cleanup is ${mustard} ppm after SLAM is complete.`;
  }

  function hidePassiveOutlookForPrint() {
    const printStyleId = 'hide-passive-outlook-print-style';
    if (!document.getElementById(printStyleId)) {
      const style = document.createElement('style');
      style.id = printStyleId;
      style.textContent = '@media print { .panel.reveal.stagger-5 { display: none !important; } }';
      document.head.appendChild(style);
    }

    const panel = document.querySelector('.panel.reveal.stagger-5');
    if (!panel) return;
    window.addEventListener('beforeprint', () => {
      panel.style.display = 'none';
    });
    window.addEventListener('afterprint', () => {
      panel.style.display = '';
    });
  }

  function init() {
    hidePassiveOutlookForPrint();
    updateBuildBadge();
    updateWeatherSummary();
    syncReportForecastWeather();
    resolveForecastFallback(false);
    updateGoalNote();
    updatePassiveOutlook();
    syncTrichlorEffectUi();
    document.addEventListener('input', updatePassiveOutlook, true);
    document.addEventListener('change', updatePassiveOutlook, true);
    document.addEventListener('input', updateGoalNote, true);
    document.addEventListener('change', updateGoalNote, true);
    document.addEventListener('input', () => window.setTimeout(syncTrichlorEffectUi, 0), true);
    document.addEventListener('change', () => window.setTimeout(syncTrichlorEffectUi, 0), true);
    document.addEventListener('input', () => window.setTimeout(syncReportForecastWeather, 0), true);
    document.addEventListener('change', () => window.setTimeout(syncReportForecastWeather, 0), true);
    window.setTimeout(updatePassiveOutlook, 1000);
    window.setTimeout(updatePassiveOutlook, 4000);
    window.setTimeout(updateWeatherSummary, 1000);
    window.setTimeout(() => resolveForecastFallback(true), 7000);
    window.setTimeout(syncReportForecastWeather, 1200);
    window.setTimeout(syncForecastPlanModelNote, 2000);
    window.setTimeout(updateGoalNote, 1000);
    window.setTimeout(syncTrichlorEffectUi, 1000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
