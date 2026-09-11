(() => {
  const TEXT_SELECTORS = [
    '#goal-result',
    '#passive-outlook',
    '#r-treatment-list',
    '#r-forecast-list',
    '#r-insights',
    '#r-insights-print',
    '.report-table',
    '.result-block',
    '.range-pill'
  ];

  const replacements = [
    [/Ã¢â‚¬â€|â€”|\u2014/g, '-'],
    [/Ã¢â‚¬â€œ|â€“|\u2013/g, '-'],
    [/âˆ’|\u2212/g, '-'],
    [/Ã¢â€ â€™|â†’|\u2192/g, '->'],
    [/Ã‚Â°|Â°|\u00b0/g, ' deg '],
    [/\u00d7/g, 'x'],
    [/â€˜|â€™|\u2018|\u2019/g, "'"],
    [/â€œ|â€�|\u201c|\u201d/g, '"'],
    [/â€¦|\u2026/g, '...'],
    [/â˜‘|\u2611/g, '[x]'],
    [/â˜|\u2610/g, '[ ]'],
    [/âœ“|âœ”|\u2713|\u2714|\u2705/g, '[ok]'],
    [/\u00a0/g, ' '],
    [/[\t ]{2,}/g, ' ']
  ];

  function normalizeText(value) {
    if (typeof value !== 'string' || !value) return value;
    let out = value;
    for (const [pattern, replacement] of replacements) {
      out = out.replace(pattern, replacement);
    }
    return out;
  }

  function normalizeTextNodes(root) {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node = walker.nextNode();
    while (node) {
      const next = normalizeText(node.nodeValue);
      if (next !== node.nodeValue) {
        node.nodeValue = next;
      }
      node = walker.nextNode();
    }
  }

  function normalizeInputValue(el) {
    if (!(el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement)) return;
    const next = normalizeText(el.value);
    if (next !== el.value) {
      const start = el.selectionStart;
      const end = el.selectionEnd;
      el.value = next;
      try {
        if (typeof start === 'number' && typeof end === 'number') {
          el.setSelectionRange(start, end);
        }
      } catch (_) {
        // Ignore non-text inputs that do not support selection range.
      }
    }
  }

  function normalizeRegions() {
    TEXT_SELECTORS.forEach((selector) => {
      document.querySelectorAll(selector).forEach((el) => {
        normalizeTextNodes(el);
        normalizeInputValue(el);
      });
    });
  }

  function bindInputNormalization() {
    document.addEventListener('input', (event) => {
      const target = event.target;
      if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
        normalizeInputValue(target);
      }
    });
  }

  function bindMutationNormalization() {
    const observer = new MutationObserver(() => {
      normalizeRegions();
    });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  }

  function init() {
    normalizeRegions();
    bindInputNormalization();
    bindMutationNormalization();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
