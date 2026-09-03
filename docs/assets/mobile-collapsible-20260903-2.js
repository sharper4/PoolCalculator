(() => {
  const isMobileViewport = () => window.matchMedia('(max-width: 980px)').matches;

  function bindLinkedPanels() {
    let syncing = false;

    document.querySelectorAll('.grid.mobile-two > details.collapsible').forEach((panel) => {
      if (panel.dataset.mobileAccordionLinked === '2') return;
      panel.dataset.mobileAccordionLinked = '2';

      panel.addEventListener('toggle', () => {
        if (syncing) return;

        syncing = true;
        const siblings = panel.parentElement?.querySelectorAll(':scope > details.collapsible');

        if (isMobileViewport()) {
          if (panel.open) {
            siblings?.forEach((sibling) => {
              if (sibling !== panel) sibling.open = false;
            });
          }
        } else {
          siblings?.forEach((sibling) => {
            if (sibling !== panel) sibling.open = panel.open;
          });
        }

        syncing = false;
      });
    });
  }

  function init() {
    bindLinkedPanels();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
