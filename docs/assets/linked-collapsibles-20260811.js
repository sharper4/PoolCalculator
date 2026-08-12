// Link paired collapsible panels: opening or closing one panel in a two-column
// row mirrors the action on its row partner.
(() => {
  function linkRowCollapsibles() {
    let syncing = false;
    document.querySelectorAll('.grid.two > details.collapsible').forEach((panel) => {
      if (panel.dataset.rowLinked === '1') return;
      panel.dataset.rowLinked = '1';
      panel.addEventListener('toggle', () => {
        if (syncing) return;
        syncing = true;
        panel.parentElement.querySelectorAll(':scope > details.collapsible').forEach((sibling) => {
          if (sibling !== panel) sibling.open = panel.open;
        });
        syncing = false;
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', linkRowCollapsibles);
  } else {
    linkRowCollapsibles();
  }
})();
