(function () {
  const replacements = [
    [/â€”/g, '-'],
    [/â€“/g, '-'],
    [/â†’/g, '->'],
    [/Â°/g, ' deg '],
    [/\u2192/g, '->'],
    [/\u2013/g, '-'],
    [/\u2014/g, '-'],
    [/\u2212/g, '-'],
    [/\u00d7/g, 'x'],
    [/\u00b0/g, ' deg ']
  ];

  function normalizeText(value) {
    if (typeof value !== 'string' || !value) return value;
    let next = value;
    for (const [pattern, replacement] of replacements) {
      next = next.replace(pattern, replacement);
    }
    return next.replace(/[\t ]{2,}/g, ' ');
  }

  function normalizeNodeText(root) {
    if (!root) return;

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node = walker.nextNode();
    while (node) {
      const original = node.nodeValue;
      const normalized = normalizeText(original);
      if (normalized !== original) {
        node.nodeValue = normalized;
      }
      node = walker.nextNode();
    }

    root.querySelectorAll('input, textarea, option').forEach((el) => {
      if (el.placeholder) {
        const normalized = normalizeText(el.placeholder);
        if (normalized !== el.placeholder) el.placeholder = normalized;
      }
      if (el.value && el.tagName === 'OPTION') {
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
    });
  }

  function runNormalize() {
    normalizeNodeText(document.body);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runNormalize, { once: true });
  } else {
    runNormalize();
  }
})();
