(() => {
  const isMobileViewport = () => window.matchMedia('(max-width: 980px)').matches;

  function enforceChemistryTargetsDesktopOpen() {
    const chemistryPanel = document.getElementById('chemistry-targets-panel');
    if (chemistryPanel && !isMobileViewport()) {
      chemistryPanel.open = true;
    }
  }

  function linkMobileAccordionBehavior() {
    let syncing = false;
    document.querySelectorAll('.grid.two > details.collapsible').forEach((panel) => {
      if (panel.dataset.mobileAccordionLinked === '1') return;
      panel.dataset.mobileAccordionLinked = '1';

      panel.addEventListener('toggle', () => {
        if (syncing || !isMobileViewport() || !panel.open) return;
        syncing = true;

        panel.parentElement
          ?.querySelectorAll(':scope > details.collapsible')
          .forEach((sibling) => {
            if (sibling !== panel) sibling.open = false;
          });

        syncing = false;
      });
    });
  }

  function init() {
    linkMobileAccordionBehavior();
    enforceChemistryTargetsDesktopOpen();
    window.addEventListener('resize', enforceChemistryTargetsDesktopOpen);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
