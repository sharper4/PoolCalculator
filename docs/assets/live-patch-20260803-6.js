// Live patch 2026-08-03-6
// pH monitor zone: absolute ±0.2 unit tolerance (not % of span)
// Overrides the pH monitorBuf=0.05 from patch-5 with monitorAbs=0.2
(() => {
  // Wait for patch-5's initDom to finish, then patch the pH applyTableParam / applyCardParam
  function patchPH() {
    const sPh   = document.getElementById('s-ph');
    const rPh   = document.getElementById('r-ph');
    const pillPh = document.getElementById('ph-target-range');
    const phCard = document.querySelector('.chem-card.ph');
    if (!sPh || !rPh || !pillPh) return;

    const ABS_TOL = 0.2;

    function parseRange(text) {
      const m = text.match(/(\d+(?:\.\d+)?)\s*(?:to|[–\-])+\s*(\d+(?:\.\d+)?)/i);
      if (m) return [Number(m[1]), Number(m[2])];
      return [NaN, NaN];
    }

    function applyPH() {
      const [lo, hi] = parseRange(pillPh.textContent);
      if (!Number.isFinite(lo) || !Number.isFinite(hi)) return;

      // Table status
      if (sPh.textContent === 'Needs attention') {
        const valMatch = rPh.textContent.match(/(\d+(?:\.\d+)?)/);
        if (valMatch) {
          const value = Number(valMatch[1]);
          const isNear = value >= lo - ABS_TOL && value <= hi + ABS_TOL;
          if (isNear) {
            sPh.textContent = 'Monitor';
            const row = sPh.parentElement;
            if (row) {
              row.classList.remove('needs-attention-row');
              row.classList.add('monitor-row');
            }
          }
        }
      }

      // Card color
      if (phCard) {
        if (phCard.classList.contains('within-range')) {
          phCard.classList.remove('near-range');
          return;
        }
        const hasFlag = phCard.classList.contains('out-of-range') || phCard.classList.contains('near-range');
        if (!hasFlag) return;
        const valMatch = rPh.textContent.match(/(\d+(?:\.\d+)?)/);
        if (!valMatch) { phCard.classList.remove('near-range'); return; }
        const value = Number(valMatch[1]);
        const isNear = value >= lo - ABS_TOL && value <= hi + ABS_TOL;
        phCard.classList.toggle('near-range',   isNear);
        phCard.classList.toggle('out-of-range', !isNear);
      }
    }

    applyPH();

    // Observe s-ph and the pill for recalculations
    let debounce = null;
    const obs = new MutationObserver(() => {
      clearTimeout(debounce);
      debounce = setTimeout(applyPH, 0);
    });
    obs.observe(sPh,   { characterData: true, childList: true, subtree: true });
    obs.observe(pillPh, { characterData: true, childList: true, subtree: true });
    if (phCard) obs.observe(phCard, { attributes: true, attributeFilter: ['class'] });

    document.addEventListener('input',  () => setTimeout(applyPH, 70), true);
    document.addEventListener('change', () => setTimeout(applyPH, 70), true);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', patchPH);
  } else {
    // Small delay to let patch-5's initDom finish first
    setTimeout(patchPH, 100);
  }
})();
