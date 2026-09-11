(() => {
  function keyFromText(text) {
    const normalized = String(text || '').trim();
    const optionMatch = normalized.match(/^([A-Z]+\s*-\s*Option\s*\d+:)/i);
    if (optionMatch) return optionMatch[1].replace(/\s+/g, ' ').toUpperCase();
    const chemMatch = normalized.match(/^([A-Z]+:)\s*/i);
    if (chemMatch) return chemMatch[1].toUpperCase();
    return normalized;
  }

  function labelTextFromRow(li) {
    const label = li?.querySelector('label');
    if (!label) return '';
    const span = label.querySelector('span');
    if (span) return String(span.textContent || '').trim();
    return String(label.textContent || '').replace(/\s+/g, ' ').trim();
  }

  function checkedListState(listId) {
    const list = document.getElementById(listId);
    if (!list) return [];
    return Array.from(list.querySelectorAll('li'))
      .map((li, index) => {
        const box = li.querySelector('input[type="checkbox"]');
        if (!box || !box.checked) return null;
        const label = labelTextFromRow(li);
        return {
          key: keyFromText(label),
          index,
          text: label
        };
      })
      .filter(Boolean);
  }

  function restoreListChecks(listId, selectedRows) {
    if (!selectedRows.length) return;
    const list = document.getElementById(listId);
    if (!list) return;

    const wantedByKey = new Set(selectedRows.map((row) => row.key));
    const wantedByIndex = new Set(selectedRows.map((row) => row.index));

    Array.from(list.querySelectorAll('li')).forEach((li, index) => {
      const box = li.querySelector('input[type="checkbox"]');
      if (!box) return;
      const rowKey = keyFromText(labelTextFromRow(li));
      if (wantedByKey.has(rowKey) || wantedByIndex.has(index)) {
        box.checked = true;
      }
    });
  }

  document.addEventListener('change', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement) || target.type !== 'checkbox') return;
    if (!target.closest('#r-service-checklist')) return;

    const forecastSnapshot = checkedListState('r-forecast-list');
    const treatmentSnapshot = checkedListState('r-treatment-list');
    const list = document.getElementById('r-forecast-list');
    const restore = () => {
      restoreListChecks('r-forecast-list', forecastSnapshot);
      restoreListChecks('r-treatment-list', treatmentSnapshot);
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
