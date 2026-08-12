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

      // Card color: use inline style to avoid class-toggle conflict with patch-5
      if (phCard) {
        const hasValue = rPh.textContent.trim() !== 'Not tested' && rPh.textContent.trim() !== '--';
        if (hasValue) {
          const valMatch2 = rPh.textContent.match(/(\d+(?:\.\d+)?)/);  
          if (valMatch2) {
            const v = Number(valMatch2[1]);
            const near = v >= lo - ABS_TOL && v <= hi + ABS_TOL && (v < lo || v > hi);
            if (near) {
              phCard.style.setProperty('border-color', '#c07a00', 'important');
              phCard.style.setProperty('background',   '#fff8e6', 'important');
              phCard.style.setProperty('box-shadow',   'inset 0 0 0 1px rgba(160,92,0,0.2)', 'important');
            } else {
              phCard.style.removeProperty('border-color');
              phCard.style.removeProperty('background');
              phCard.style.removeProperty('box-shadow');
            }
          }
        } else {
          phCard.style.removeProperty('border-color');
          phCard.style.removeProperty('background');
          phCard.style.removeProperty('box-shadow');
        }
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
    // Note: phCard NOT observed — inline styles avoid the class-toggle feedback loop

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
