// Live patch 2026-08-03-2
// - Adds amber near-range state to chemistry input cards (10% buffer, pH excluded)
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
    if (!card || !card.classList.contains('out-of-range')) return;
    const resultEl = document.getElementById(c.resultId);
    const pillEl   = document.getElementById(c.pillId);
    if (!resultEl || !pillEl) return;
    const valMatch = resultEl.textContent.match(/(\d+(?:\.\d+)?)/);
    if (!valMatch) return;
    const [lo, hi] = parseRange(pillEl.textContent);
    if (!Number.isFinite(lo) || !Number.isFinite(hi) || lo === hi) return;
    const value  = Number(valMatch[1]);
    const buffer = (hi - lo) * 0.10;
    if (value >= lo - buffer && value <= hi + buffer) {
      card.classList.remove('out-of-range');
      card.classList.add('near-range');
    }
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
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
