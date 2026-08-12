// Live patch 2026-08-03-3
// - Fixes amber near-range card state: correctly downgrade near-range → out-of-range
//   when goal source changes and value falls outside the 10% buffer
(() => {
  const style = document.createElement('style');
  style.textContent = '.chem-card.near-range{border-color:#c07a00;background:#fff8e6;box-shadow:inset 0 0 0 1px rgba(160,92,0,0.2)}';
  document.head.appendChild(style);

  const CARDS = [
    { sel: '.chem-card.fc',   resultId: 'r-fc',   pillId: 'fc-target-range' },
    { sel: '.chem-card.ta',   resultId: 'r-ta',   pillId: 'ta-target-range' },
    { sel: '.chem-card.ch',   resultId: 'r-ch',   pillId: 'ch-target-range' },
    { sel: '.chem-card.cya',  resultId: 'r-cya',  pillId: 'cya-target-range' },
    { sel: '.chem-card.salt', resultId: 'r-salt', pillId: 'salt-target-range' },
  ];

  function parseRange(text) {
    const m = text.match(/(\d+(?:\.\d+)?)\s*(?:to|[–\-])+\s*(\d+(?:\.\d+)?)/i);
    if (m) return [Number(m[1]), Number(m[2])];
    return [NaN, NaN];
  }

  function applyCardState(c) {
    const card = document.querySelector(c.sel);
    if (!card) return;

    // When card is back in range, strip any stale near-range
    if (card.classList.contains('within-range')) {
      card.classList.remove('near-range');
      return;
    }

    // Only act when an out-of-tolerance class is present
    const hasFlag = card.classList.contains('out-of-range') || card.classList.contains('near-range');
    if (!hasFlag) return;

    const resultEl = document.getElementById(c.resultId);
    const pillEl   = document.getElementById(c.pillId);
    if (!resultEl || !pillEl) { card.classList.remove('near-range'); return; }

    const valMatch = resultEl.textContent.match(/(\d+(?:\.\d+)?)/);
    if (!valMatch) { card.classList.remove('near-range'); return; }

    const [lo, hi] = parseRange(pillEl.textContent);
    if (!Number.isFinite(lo) || !Number.isFinite(hi) || lo === hi) {
      card.classList.remove('near-range');
      return;
    }

    const value  = Number(valMatch[1]);
    const buffer = (hi - lo) * 0.10;
    const isNear = value >= lo - buffer && value <= hi + buffer;

    // Toggle both classes atomically so the observer settles in one round
    card.classList.toggle('near-range',   isNear);
    card.classList.toggle('out-of-range', !isNear);
  }

  function runAll() { CARDS.forEach(applyCardState); }

  function init() {
    runAll();
    let debounce = null;
    const observer = new MutationObserver(() => {
      clearTimeout(debounce);
      debounce = setTimeout(runAll, 0);
    });
    CARDS.forEach(c => {
      const card = document.querySelector(c.sel);
      if (card) observer.observe(card, { attributes: true, attributeFilter: ['class'] });
    });

    // Also re-run whenever the goal-source or any input changes (belt-and-suspenders)
    document.addEventListener('input',  () => setTimeout(runAll, 50), true);
    document.addEventListener('change', () => setTimeout(runAll, 50), true);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
