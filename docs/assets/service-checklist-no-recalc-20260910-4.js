(() => {
  const serviceDetails = document.getElementById('service-details-section');
  const customerInput = document.getElementById('customer-name');
  const addressInput = document.getElementById('customer-address');
  const emailInput = document.getElementById('email-address');
  const rowCustomer = document.getElementById('r-row-customer');
  const rowAddress = document.getElementById('r-row-address');
  const rowEmail = document.getElementById('r-row-email-address');
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
    const reportOpenedByUi = serviceDetails ? serviceDetails.hidden === false : false;
    const hideSections = !reportOpenedByUi;

    if (techInsights) techInsights.hidden = hideSections;
    if (serviceChecklist) serviceChecklist.hidden = hideSections;
  }

  function applyCustomerRowsVisibility() {
    const showRows = serviceDetails ? serviceDetails.hidden === false : false;
    if (rowCustomer) rowCustomer.hidden = !showRows || !(customerInput?.value || '').trim();
    if (rowAddress) rowAddress.hidden = !showRows || !(addressInput?.value || '').trim();
    if (rowEmail) rowEmail.hidden = !showRows || !(emailInput?.value || '').trim();
  }

  function setCustomerVisibility(visible) {
    if (serviceDetails) serviceDetails.hidden = !visible;
    applyCustomerRowsVisibility();
    applyReportSectionsVisibility();
  }

  function injectCustomerReportToolbarButtons() {
    document.querySelectorAll('.report-toolbar').forEach((toolbar) => {
      const existing = Array.from(toolbar.querySelectorAll('button')).find((button) => button.dataset.customerReportCopy === '1');
      if (existing) return;

      const backButton = Array.from(toolbar.querySelectorAll('button')).find((button) => (button.textContent || '').trim() === 'Back to Top');
      if (!backButton) return;

      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'action-btn subtle';
      button.textContent = 'Customer Report';
      button.dataset.customerReportCopy = '1';
      button.addEventListener('click', () => {
        document.getElementById('open-report')?.click();
      });

      toolbar.insertBefore(button, backButton);
    });
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
  let customerFieldsVisible = serviceDetails ? serviceDetails.hidden === false : false;

  if (openReportButton) {
    openReportButton.addEventListener('click', () => {
      customerFieldsVisible = !customerFieldsVisible;
      [0, 40, 120, 300].forEach((delay) => {
        setTimeout(() => {
          setCustomerVisibility(customerFieldsVisible);
        }, delay);
      });
    });
  }

  [customerInput, addressInput, emailInput].forEach((input) => {
    if (!input) return;
    input.addEventListener('input', applyCustomerRowsVisibility);
    input.addEventListener('change', applyCustomerRowsVisibility);
  });

  setCustomerVisibility(customerFieldsVisible);
  injectCustomerReportToolbarButtons();

  const observer = new MutationObserver(() => {
    applyReportSectionsVisibility();
    applyCustomerRowsVisibility();
    normalizeVisibleText(document.body);
    injectCustomerReportToolbarButtons();
  });
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    characterData: true
  });
})();
