(() => {
  function text(button) {
    return String(button?.textContent || '').trim();
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

  function bindStablePrint() {
    const printButtons = Array.from(document.querySelectorAll('button')).filter((button) => button.id === 'print-report' || text(button) === 'Print Report');
    if (!printButtons.length) return;

    printButtons.forEach((button) => {
      if (button.dataset.mobilePrintStable === '1') return;
      button.dataset.mobilePrintStable = '1';
      button.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();

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
    bindStablePrint();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
