(() => {
  const CUSTOMER_LABEL = 'Customer Report';
  const PRINT_LABEL = 'Print Report';

  function byId(id) {
    return document.getElementById(id);
  }

  function buttonText(button) {
    return String(button?.textContent || '').trim();
  }

  function ensureTechInsightsEditable() {
    const insights = byId('r-insights');
    if (!insights) return;
    insights.readOnly = false;
    insights.disabled = false;
    insights.removeAttribute('readonly');
    insights.removeAttribute('disabled');
    insights.style.pointerEvents = 'auto';
  }

  function refreshCustomerDependentRows() {
    const serviceDetails = byId('service-details-section');
    const customerInput = byId('customer-name');
    const addressInput = byId('customer-address');
    const emailInput = byId('email-address');
    const rowCustomer = byId('r-row-customer');
    const rowAddress = byId('r-row-address');
    const rowEmail = byId('r-row-email-address');
    const insightsSection = byId('report-tech-insights');
    const checklistSection = byId('report-service-checklist');
    const showCustomerSections = Boolean(serviceDetails && !serviceDetails.hidden);

    if (rowCustomer) rowCustomer.hidden = !showCustomerSections || !(customerInput?.value || '').trim();
    if (rowAddress) rowAddress.hidden = !showCustomerSections || !(addressInput?.value || '').trim();
    if (rowEmail) rowEmail.hidden = !showCustomerSections || !(emailInput?.value || '').trim();
    if (insightsSection) insightsSection.hidden = !showCustomerSections;
    if (checklistSection) checklistSection.hidden = !showCustomerSections;
  }

  function ensureSingleMiddleCustomerButton() {
    const topToolbar = document.querySelector('.report-toolbar');
    if (!topToolbar) return null;

    const backButton = topToolbar.querySelector('#back-to-app')
      || Array.from(topToolbar.querySelectorAll('button')).find((button) => buttonText(button) === 'Back to Top');

    let primary = topToolbar.querySelector('#open-report');
    if (!primary) {
      primary = Array.from(topToolbar.querySelectorAll('button')).find((button) => buttonText(button) === CUSTOMER_LABEL);
    }

    if (!primary) {
      primary = document.createElement('button');
      primary.type = 'button';
      primary.className = 'action-btn subtle';
      primary.textContent = CUSTOMER_LABEL;
      if (backButton) {
        topToolbar.insertBefore(primary, backButton);
      } else {
        topToolbar.prepend(primary);
      }
    }

    primary.id = 'open-report';
    primary.dataset.customerPrimary = '1';
    primary.classList.add('action-btn', 'subtle');
    primary.textContent = CUSTOMER_LABEL;

    Array.from(document.querySelectorAll('button')).forEach((button) => {
      if (button === primary) return;
      if (buttonText(button) === CUSTOMER_LABEL) {
        button.remove();
      }
    });

    return primary;
  }

  function syncInsightsForPrint() {
    const insights = byId('r-insights');
    const insightsPrint = byId('r-insights-print');
    if (insights && insightsPrint) {
      insightsPrint.textContent = insights.value;
    }
  }

  function runStablePrintFlow() {
    const reportView = byId('report-view');
    const checklistSection = byId('report-service-checklist');
    if (reportView) {
      reportView.hidden = false;
      reportView.style.display = 'block';
    }

    ensureTechInsightsEditable();
    syncInsightsForPrint();

    const priorChecklistDisplay = checklistSection ? (checklistSection.style.display || '__none__') : null;
    if (checklistSection) checklistSection.style.display = 'none';

    const hadReportMode = document.body.classList.contains('report-mode');
    if (!hadReportMode) document.body.classList.add('report-mode');

    let cleaned = false;
    const cleanup = () => {
      if (cleaned) return;
      cleaned = true;
      if (checklistSection) {
        if (priorChecklistDisplay === '__none__') {
          checklistSection.style.removeProperty('display');
        } else {
          checklistSection.style.display = priorChecklistDisplay;
        }
      }
      if (!hadReportMode) document.body.classList.remove('report-mode');
    };

    window.addEventListener('afterprint', cleanup, { once: true });
    window.setTimeout(cleanup, 3500);

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        window.print();
      });
    });
  }

  function wirePrintButtons() {
    const printButtons = Array.from(document.querySelectorAll('button'))
      .filter((button) => button.id === 'print-report' || buttonText(button) === PRINT_LABEL);

    printButtons.forEach((button) => {
      if (button.dataset.mobilePrintPatched === '1') return;
      button.dataset.mobilePrintPatched = '1';
      button.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
        runStablePrintFlow();
      }, true);
    });
  }

  function bootstrap() {
    ensureTechInsightsEditable();
    refreshCustomerDependentRows();
    const customerButton = ensureSingleMiddleCustomerButton();

    if (customerButton && customerButton.dataset.customerFocusPatched !== '1') {
      customerButton.dataset.customerFocusPatched = '1';
      customerButton.addEventListener('click', () => {
        window.setTimeout(() => {
          ensureTechInsightsEditable();
          refreshCustomerDependentRows();
          const serviceDetails = byId('service-details-section');
          const insights = byId('r-insights');
          if (serviceDetails && !serviceDetails.hidden && insights) {
            insights.focus({ preventScroll: true });
          }
        }, 80);
      });
    }

    wirePrintButtons();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap, { once: true });
  } else {
    bootstrap();
  }

  const observer = new MutationObserver(() => {
    bootstrap();
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
})();
