(function () {
  const targetSelectors = [
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
    let next = value;
    for (const [pattern, replacement] of replacements) {
      next = next.replace(pattern, replacement);
    }
    return next;
  }

  function normalizeTextNodes(root) {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node = walker.nextNode();
    while (node) {
      const normalized = normalizeText(node.nodeValue);
      if (normalized !== node.nodeValue) {
        node.nodeValue = normalized;
      }
      node = walker.nextNode();
    }
  }

  function normalizeInputValue(el) {
    if (!(el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement)) return;
    const normalized = normalizeText(el.value);
    if (normalized === el.value) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    el.value = normalized;
    try {
      if (typeof start === 'number' && typeof end === 'number') {
        el.setSelectionRange(start, end);
      }
    } catch (_) {
      // Non-text inputs can throw here.
    }
  }

  function normalizeNodeAttributes(root) {
    if (!root || !(root instanceof Element)) return;
    root.querySelectorAll('input, textarea, option').forEach((el) => {
      if (el.placeholder) {
        const normalized = normalizeText(el.placeholder);
        if (normalized !== el.placeholder) el.placeholder = normalized;
      }
      if (el.tagName === 'OPTION' && el.value) {
        const normalized = normalizeText(el.value);
        if (normalized !== el.value) el.value = normalized;
      }
      if (el.title) {
        const normalized = normalizeText(el.title);
        if (normalized !== el.title) el.title = normalized;
      }
      const ariaLabel = el.getAttribute('aria-label');
      if (ariaLabel) {
        const normalized = normalizeText(ariaLabel);
        if (normalized !== ariaLabel) el.setAttribute('aria-label', normalized);
      }
      normalizeInputValue(el);
    });
  }

  function normalizeTargets() {
    targetSelectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((el) => {
        normalizeTextNodes(el);
        normalizeNodeAttributes(el);
        normalizeInputValue(el);
      });
    });
  }

  function bindLiveNormalization() {
    document.addEventListener('input', (event) => {
      const target = event.target;
      if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
        normalizeInputValue(target);
      }
    });

    const observer = new MutationObserver(() => {
      normalizeTargets();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true
    });
  }

  function init() {
    normalizeTargets();
    bindLiveNormalization();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
