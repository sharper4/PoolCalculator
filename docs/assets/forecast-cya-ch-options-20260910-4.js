(() => {
  // Keep forecast checklist behavior stable like the treatment checklist.
  // This patch never rebuilds rows; it only preserves checkbox states across rerenders.
  const state = (window.__forecastOptionsPatch = window.__forecastOptionsPatch || {
    mode: 'state-mirror',
    loadedAt: Date.now(),
    checkedByKey: {}
  });
  if (!state.checkedByKey || typeof state.checkedByKey !== 'object') state.checkedByKey = {};

  let scheduled = false;

  function forecastList() {
    return document.getElementById('r-forecast-list');
  }

  function normalizeText(text) {
    return String(text || '').replace(/\s+/g, ' ').trim();
  }

  function checkboxLabelText(box) {
    const li = box?.closest('li');
    const span = li?.querySelector('span');
    return normalizeText(span?.textContent || li?.textContent || '');
  }

  function keyForText(text) {
    const t = normalizeText(text);
    const option = t.match(/^(CYA|CH)\s*-\s*Option\s*(\d+)\s*:/i);
    if (option) return `${option[1].toUpperCase()}-OPTION-${option[2]}`;

    // Normalize volatile numeric values so forecast line rewrites keep the same key.
    return t
      .toLowerCase()
      .replace(/\d+(?:\.\d+)?/g, '#')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function keyForBox(box) {
    const text = checkboxLabelText(box);
    return keyForText(text);
  }

  function applyState() {
    const list = forecastList();
    if (!list) return;
    list.querySelectorAll('input[type="checkbox"]').forEach((box) => {
      const key = keyForBox(box);
      if (!key) return;
      if (Object.prototype.hasOwnProperty.call(state.checkedByKey, key)) {
        box.checked = state.checkedByKey[key] === true;
      }
    });
  }

  function scheduleApply() {
    if (scheduled) return;
    scheduled = true;
    setTimeout(() => {
      scheduled = false;
      applyState();
    }, 0);
  }

  document.addEventListener('change', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement) || target.type !== 'checkbox') return;
    if (!target.closest('#r-forecast-list')) return;

    const key = keyForBox(target);
    if (!key) return;
    state.checkedByKey[key] = target.checked === true;
    scheduleApply();
  }, true);

  const observer = new MutationObserver(() => {
    scheduleApply();
  });

  function bind() {
    const list = forecastList();
    if (!list) return false;
    observer.observe(list, { childList: true, subtree: true });
    scheduleApply();
    return true;
  }

  if (!bind()) {
    const boot = new MutationObserver(() => {
      if (bind()) boot.disconnect();
    });
    boot.observe(document.body, { childList: true, subtree: true });
  }
})();