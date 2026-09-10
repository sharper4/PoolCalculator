(() => {
  let reportSectionsEnabled = false;

  const asciiReplacements = [
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

  function normalizeAsciiText(value) {
    if (typeof value !== 'string' || !value) return value;
    let normalized = value;
    asciiReplacements.forEach(([pattern, replacement]) => {
      normalized = normalized.replace(pattern, replacement);
    });
    return normalized.replace(/[\t ]{2,}/g, ' ');
  }

  function normalizeVisibleText(root) {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let current = walker.nextNode();
    while (current) {
      const next = normalizeAsciiText(current.nodeValue);
      if (next !== current.nodeValue) current.nodeValue = next;
      current = walker.nextNode();
    }
  }

  function refreshServiceChecklistState() {
    const checklist = document.getElementById('r-service-checklist');
    const section = document.getElementById('report-service-checklist');
    if (!checklist || !section) return;

    let hasNonChemicalChecked = false;
    checklist.querySelectorAll('.service-check-item').forEach((item) => {
      const box = item.querySelector('input[type="checkbox"]');
      const checked = Boolean(box?.checked);
      item.classList.toggle('is-checked', checked);
      const isChemicalBalanced = item.dataset.chemicalBalanced === '1';
      if (checked && !isChemicalBalanced) hasNonChemicalChecked = true;
    });

    section.dataset.hasChecked = hasNonChemicalChecked ? '1' : '0';
  }

  function applyReportSectionsVisibility() {
    const techInsights = document.getElementById('report-tech-insights');
    const serviceChecklist = document.getElementById('report-service-checklist');
    const serviceDetails = document.getElementById('service-details-section');
    const reportOpenedByUi = serviceDetails ? serviceDetails.hidden === false : false;
    const hideSections = !(reportSectionsEnabled || reportOpenedByUi);

    if (techInsights) techInsights.hidden = hideSections;
    if (serviceChecklist) serviceChecklist.hidden = hideSections;
  }

  function stripRecalcListenersFromServiceChecklist() {
    const checklist = document.getElementById('r-service-checklist');
    if (!checklist) return;

    const boxes = Array.from(checklist.querySelectorAll('.service-check-item input[type="checkbox"]'));
    boxes.forEach((box) => {
      const replacement = box.cloneNode(true);
      replacement.checked = box.checked;
      box.replaceWith(replacement);
    });

    checklist.querySelectorAll('.service-check-item input[type="checkbox"]').forEach((box) => {
      box.addEventListener('change', () => {
        refreshServiceChecklistState();
        normalizeVisibleText(document.body);
      });
    });

    refreshServiceChecklistState();
    normalizeVisibleText(document.body);
  }

  stripRecalcListenersFromServiceChecklist();

  const openReportButton = document.getElementById('open-report');
  if (openReportButton) {
    openReportButton.addEventListener('click', () => {
      reportSectionsEnabled = true;
      applyReportSectionsVisibility();
    });
  }

  applyReportSectionsVisibility();

  const observer = new MutationObserver(() => {
    applyReportSectionsVisibility();
    normalizeVisibleText(document.body);
  });
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    characterData: true
  });
})();
