(() => {
  function labelTextFromRow(li) {
    const label = li?.querySelector('label');
    if (!label) return '';
    const span = label.querySelector('span');
    if (span) return String(span.textContent || '').trim();
    return String(label.textContent || '').replace(/\s+/g, ' ').trim();
  }

  function checkedForecastLabels() {
    const list = document.getElementById('r-forecast-list');
    if (!list) return [];
    return Array.from(list.querySelectorAll('li'))
      .map((li) => {
        const box = li.querySelector('input[type="checkbox"]');
        if (!box || !box.checked) return '';
        return labelTextFromRow(li);
      })
      .filter(Boolean);
  }

  function restoreForecastChecks(labels) {
    if (!labels.length) return;
    const list = document.getElementById('r-forecast-list');
    if (!list) return;

    const wanted = new Set(labels);
    Array.from(list.querySelectorAll('li')).forEach((li) => {
      const box = li.querySelector('input[type="checkbox"]');
      if (!box) return;
      const text = labelTextFromRow(li);
      if (!wanted.has(text)) return;
      box.checked = true;
    });
  }

  document.addEventListener('change', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement) || target.type !== 'checkbox') return;
    if (!target.closest('#r-service-checklist')) return;

    const snapshot = checkedForecastLabels();
    // Allow the main app recalculation to run, then re-apply the prior forecast checks.
    setTimeout(() => {
      restoreForecastChecks(snapshot);
    }, 0);
  }, true);
})();
