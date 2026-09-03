(() => {
  const isMobileViewport = () => window.matchMedia('(max-width: 980px)').matches;
  const isSideBySideRow = (panels) => {
    if (!panels || panels.length < 2) return false;
    const firstTop = panels[0].getBoundingClientRect().top;
    const secondTop = panels[1].getBoundingClientRect().top;
    return Math.abs(firstTop - secondTop) < 3;
  };

  function bindLinkedPanels() {
    let syncing = false;

    document.querySelectorAll('.grid.mobile-two > details.collapsible').forEach((panel) => {
      if (panel.dataset.mobileAccordionLinked === '2') return;
      panel.dataset.mobileAccordionLinked = '2';

      panel.addEventListener('toggle', () => {
        if (syncing) return;

        syncing = true;
        const siblings = Array.from(panel.parentElement?.querySelectorAll(':scope > details.collapsible') || []);

        if (isSideBySideRow(siblings)) {
          siblings.forEach((sibling) => {
            if (sibling !== panel) sibling.open = panel.open;
          });
        } else if (isMobileViewport()) {
          if (panel.open) {
            siblings.forEach((sibling) => {
              if (sibling !== panel) sibling.open = false;
            });
          }
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
