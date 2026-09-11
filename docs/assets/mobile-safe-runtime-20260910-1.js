(() => {
  let printInFlight = false;

  function text(button) {
    return String(button?.textContent || '').trim();
  }

  function ensureMobilePrintStyle() {
    if (document.getElementById('mobile-print-single-sheet-20260911-1')) return;
    const style = document.createElement('style');
    style.id = 'mobile-print-single-sheet-20260911-1';
    style.textContent = `
      @media print {
        html.mobile-print-capture,
        body.mobile-print-capture {
          height: auto !important;
          min-height: 0 !important;
          overflow: visible !important;
          background: #fff !important;
        }

        body.mobile-print-capture .layout > * {
          display: none !important;
        }

        body.mobile-print-capture #report-view,
        body.mobile-print-capture #report-view .report-sheet {
          display: block !important;
          visibility: visible !important;
        }

        body.mobile-print-capture #report-view {
          margin: 0 !important;
          padding: 0 !important;
        }

        body.mobile-print-capture #report-view .report-sheet {
          margin: 0 !important;
          break-after: auto !important;
          page-break-after: auto !important;
          break-before: auto !important;
          page-break-before: auto !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function ensureThreeCustomerButtons() {
    const heroButton = document.querySelector('.hero-actions #open-report')
      || document.querySelector('#open-report');
    const topToolbar = document.querySelector('.report-toolbar:not(.report-toolbar-bottom)');
    const bottomToolbar = document.querySelector('.report-toolbar-bottom');

    if (!heroButton || !topToolbar || !bottomToolbar) return;

    const createCopy = () => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'action-btn subtle';
      button.textContent = 'Customer Report';
      button.addEventListener('click', () => {
        heroButton.click();
      });
      return button;
    };

    const findInToolbar = (toolbar) => Array.from(toolbar.querySelectorAll('button')).find((button) => text(button) === 'Customer Report');

    const topExisting = findInToolbar(topToolbar);
    if (!topExisting) {
      const backButton = topToolbar.querySelector('#back-to-app')
        || Array.from(topToolbar.querySelectorAll('button')).find((button) => text(button) === 'Back to Top');
      const topButton = createCopy();
      if (backButton) {
        topToolbar.insertBefore(topButton, backButton);
      } else {
        topToolbar.prepend(topButton);
      }
    }

    const bottomExisting = findInToolbar(bottomToolbar);
    if (!bottomExisting) {
      const backButton = Array.from(bottomToolbar.querySelectorAll('button')).find((button) => text(button) === 'Back to Top');
      const bottomButton = createCopy();
      if (backButton) {
        bottomToolbar.insertBefore(bottomButton, backButton);
      } else {
        bottomToolbar.prepend(bottomButton);
      }
    }

    [topToolbar, bottomToolbar].forEach((toolbar) => {
      const customerButtons = Array.from(toolbar.querySelectorAll('button')).filter((button) => text(button) === 'Customer Report');
      customerButtons.slice(1).forEach((button) => button.remove());
    });
  }

  function ensureTechInsightsEditable() {
    const insights = document.getElementById('r-insights');
    if (!insights) return;
    insights.readOnly = false;
    insights.disabled = false;
    insights.removeAttribute('readonly');
    insights.removeAttribute('disabled');
    insights.style.pointerEvents = 'auto';
  }

  function restoreChecklistWhenCustomerVisible() {
    const openButton = document.getElementById('open-report');
    if (!openButton || openButton.dataset.checklistRestoreBound === '1') return;

    openButton.dataset.checklistRestoreBound = '1';
    openButton.addEventListener('click', () => {
      window.setTimeout(() => {
        const serviceDetails = document.getElementById('service-details-section');
        const checklist = document.getElementById('report-service-checklist');
        if (!serviceDetails || !checklist) return;
        if (!serviceDetails.hidden) {
          checklist.hidden = false;
          checklist.style.removeProperty('display');
        }
      }, 120);
    });
  }

  function bindStablePrint() {
    ensureMobilePrintStyle();
    const printButtons = Array.from(document.querySelectorAll('button')).filter((button) => button.id === 'print-report' || text(button) === 'Print Report');
    if (!printButtons.length) return;

    printButtons.forEach((button) => {
      if (button.dataset.mobilePrintStable === '1') return;
      button.dataset.mobilePrintStable = '1';
      button.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();

        if (printInFlight) return;
        printInFlight = true;

        const reportView = document.getElementById('report-view');
        const checklist = document.getElementById('report-service-checklist');
        const hadReportMode = document.body.classList.contains('report-mode');
        const priorChecklistDisplay = checklist ? (checklist.style.display || '__none__') : null;

        if (reportView) {
          reportView.hidden = false;
          reportView.style.display = 'block';
        }
        if (checklist) checklist.style.display = 'none';
        if (!hadReportMode) document.body.classList.add('report-mode');
        document.documentElement.classList.add('mobile-print-capture');
        document.body.classList.add('mobile-print-capture');

        const insights = document.getElementById('r-insights');
        const printMirror = document.getElementById('r-insights-print');
        if (insights && printMirror) {
          printMirror.textContent = insights.value;
        }

        let cleaned = false;
        const cleanup = () => {
          if (cleaned) return;
          cleaned = true;
          if (checklist) {
            if (priorChecklistDisplay === '__none__') checklist.style.removeProperty('display');
            else checklist.style.display = priorChecklistDisplay;
          }
          if (!hadReportMode) document.body.classList.remove('report-mode');
          document.documentElement.classList.remove('mobile-print-capture');
          document.body.classList.remove('mobile-print-capture');
          printInFlight = false;
        };

        window.addEventListener('afterprint', cleanup, { once: true });
        window.setTimeout(cleanup, 3000);

        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            window.print();
          });
        });
      }, true);
    });
  }

  function init() {
    ensureThreeCustomerButtons();
    ensureTechInsightsEditable();
    restoreChecklistWhenCustomerVisible();
    bindStablePrint();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
