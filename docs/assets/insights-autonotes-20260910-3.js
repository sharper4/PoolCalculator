(() => {
  const insights = document.getElementById('r-insights');
  const insightsPrint = document.getElementById('r-insights-print');

  if (!insights) return;

  function autoSizeInsights() {
    const style = window.getComputedStyle(insights);
    const lineHeight = Number.parseFloat(style.lineHeight) || 20;
    const paddingY = (Number.parseFloat(style.paddingTop) || 0) + (Number.parseFloat(style.paddingBottom) || 0);
    const minHeight = Math.round(lineHeight * 3 + paddingY + 2);
    const maxHeight = Math.round(lineHeight * 6 + paddingY + 2);

    insights.rows = 3;
    insights.style.minHeight = `${minHeight}px`;
    insights.style.maxHeight = `${maxHeight}px`;
    insights.style.height = 'auto';
    const desired = Math.min(Math.max(insights.scrollHeight, minHeight), maxHeight);
    insights.style.height = `${desired}px`;
    insights.style.overflowY = insights.scrollHeight > maxHeight ? 'auto' : 'hidden';
  }

  function syncPrintMirror() {
    if (insightsPrint) {
      insightsPrint.textContent = insights.value;
    }
  }

  insights.addEventListener('input', () => {
    autoSizeInsights();
    syncPrintMirror();
  });

  autoSizeInsights();
  syncPrintMirror();
})();
