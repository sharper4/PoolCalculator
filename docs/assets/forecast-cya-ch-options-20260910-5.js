(() => {
  // Forecast checklist now uses the same core renderer/state logic as the Elite treatment checklist.
  // Keep this patch passive to avoid checkbox reset races from DOM rewrites.
  window.__forecastOptionsPatch = window.__forecastOptionsPatch || {
    mode: 'passive',
    loadedAt: Date.now()
  };
})();