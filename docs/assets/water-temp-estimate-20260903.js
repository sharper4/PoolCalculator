(() => {
  const tempInput = document.getElementById('temp');
  const tempUnit = document.getElementById('temp-unit');
  const tempNote = document.getElementById('temp-estimate-note');
  const weatherNow = document.getElementById('weather-conditions');
  const weatherForecast = document.getElementById('weather-forecast');

  if (!tempInput || !tempUnit) return;

  let manualOverride = false;
  let suppressManualCapture = false;

  function parseFirstFahrenheitValue(text) {
    const match = String(text || '').replace(/\u00b0/g, '').match(/(-?\d+(?:\.\d+)?)\s*F/i);
    return match ? Number(match[1]) : Number.NaN;
  }

  function parseUvValue(text) {
    const match = String(text || '').match(/UV\s*(-?\d+(?:\.\d+)?)/i);
    return match ? Number(match[1]) : Number.NaN;
  }

  function setTempNote(message) {
    if (!tempNote) return;
    tempNote.textContent = message;
  }

  function estimateWaterTempF() {
    const currentAirF = parseFirstFahrenheitValue(weatherNow?.value);
    const forecastAirF = parseFirstFahrenheitValue(weatherForecast?.value);
    const modeledAirF = Number.isFinite(forecastAirF)
      ? forecastAirF
      : Number.isFinite(currentAirF)
        ? currentAirF
        : 80;
    const currentFallbackF = Number.isFinite(currentAirF) ? currentAirF : modeledAirF;

    const uvForecast = parseUvValue(weatherForecast?.value);
    const uvCurrent = parseUvValue(weatherNow?.value);
    const uvValue = Number.isFinite(uvForecast)
      ? uvForecast
      : Number.isFinite(uvCurrent)
        ? uvCurrent
        : 7;

    const sunAdjustment = uvValue >= 9 ? 1 : uvValue <= 3 ? -1 : 0;
    return Math.min(95, Math.max(70, Math.round(modeledAirF * 0.55 + currentFallbackF * 0.45 - 5 + sunAdjustment)));
  }

  function applyEstimatedWaterTemp() {
    if (manualOverride) return;

    const estimatedF = estimateWaterTempF();
    const useMetric = /celsius/i.test(String(tempUnit.textContent || ''));
    const displayValue = useMetric
      ? Math.round((estimatedF - 32) * 5 / 9)
      : estimatedF;

    suppressManualCapture = true;
    tempInput.value = String(displayValue);

    tempInput.dataset.estimated = '1';
    setTempNote(`Estimated from weather (~${estimatedF}F, +/-3F). Enter a measured value to override.`);

    tempInput.dispatchEvent(new Event('input', { bubbles: true }));
    suppressManualCapture = false;
  }

  function markManualOverride() {
    if (suppressManualCapture) return;
    manualOverride = true;
    tempInput.dataset.estimated = '0';
    setTempNote('Using manual water temperature.');
  }

  tempInput.addEventListener('input', markManualOverride);
  tempInput.addEventListener('change', markManualOverride);

  if (weatherNow) {
    weatherNow.addEventListener('input', applyEstimatedWaterTemp);
    weatherNow.addEventListener('change', applyEstimatedWaterTemp);
  }
  if (weatherForecast) {
    weatherForecast.addEventListener('input', applyEstimatedWaterTemp);
    weatherForecast.addEventListener('change', applyEstimatedWaterTemp);
  }

  applyEstimatedWaterTemp();
  window.setTimeout(applyEstimatedWaterTemp, 1200);
  window.setTimeout(applyEstimatedWaterTemp, 7600);
})();
