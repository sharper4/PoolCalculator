(() => {
  function keyFromText(text) {
    const normalized = String(text || '').trim();
    const optionMatch = normalized.match(/^([A-Z]+\s*-\s*Option\s*\d+:)/i);
    if (optionMatch) return optionMatch[1].replace(/\s+/g, ' ').toUpperCase();
    return normalized;
  }

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
        return keyFromText(labelTextFromRow(li));
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
      const text = keyFromText(labelTextFromRow(li));
      if (!wanted.has(text)) return;
      box.checked = true;
    });
  }

  document.addEventListener('change', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement) || target.type !== 'checkbox') return;
    if (!target.closest('#r-service-checklist')) return;

    const snapshot = checkedForecastLabels();
    const list = document.getElementById('r-forecast-list');
    const restore = () => {
      restoreForecastChecks(snapshot);
    };

    [0, 60, 140, 260, 420, 700, 1100, 1600].forEach((delayMs) => {
      setTimeout(restore, delayMs);
    });

    if (!list) return;
    const observer = new MutationObserver(() => {
      restore();
    });
    observer.observe(list, { childList: true, subtree: true });
    setTimeout(() => {
      observer.disconnect();
    }, 1800);
  }, true);
})();
