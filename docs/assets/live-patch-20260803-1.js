// Live patch 2026-08-03-1
// - Hides ELITE TREATMENT PLAN and ELITE FORECAST PLAN sections from print output
// - Adds a "Range" column to the Precision Water Analysis table
// - Introduces a "Monitor" status for values within 5% of the acceptable range boundary
(() => {
  // ── CSS ──────────────────────────────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    @media print { .no-print { display: none !important; } }
    .report-table tr.monitor-row td { font-weight: 600; color: #a05c00; }
  `;
  document.head.appendChild(style);

  // ── Helpers ───────────────────────────────────────────────────────────────
  function parseRangeFromText(text) {
    const m = text.match(/(\d+(?:\.\d+)?)\s*(?:[–\-])+\s*(\d+(?:\.\d+)?)/i);
    if (m) return [Number(m[1]), Number(m[2])];
    const s = text.match(/(\d+(?:\.\d+)?)/);
    if (s) { const v = Number(s[1]); return [v, v]; }
    return [NaN, NaN];
  }

  function round2str(v) { return String(Math.round(v * 100) / 100); }
  function rndStr(v)    { return String(Math.round(v)); }

  function fmtRange(lo, hi, fmtFn, unit) {
    if (!Number.isFinite(lo) || !Number.isFinite(hi)) return '--';
    if (lo === hi) return `${fmtFn(lo)}${unit}`;
    return `${fmtFn(lo)}\u2013${fmtFn(hi)}${unit}`;
  }

  // ── Parameter map ─────────────────────────────────────────────────────────
  const PARAMS = [
    { resultId: 'r-fc',   rangeId: 'range-fc',   statusId: 's-fc',   pillId: 'fc-target-range',   idealId: 'ideal-fc',   fmtFn: round2str, unit: ' ppm' },
    { resultId: 'r-ph',   rangeId: 'range-ph',   statusId: 's-ph',   pillId: 'ph-target-range',   idealId: 'ideal-ph',   fmtFn: round2str, unit: '' },
    { resultId: 'r-ta',   rangeId: 'range-ta',   statusId: 's-ta',   pillId: 'ta-target-range',   idealId: 'ideal-ta',   fmtFn: rndStr,    unit: ' ppm' },
    { resultId: 'r-ch',   rangeId: 'range-ch',   statusId: 's-ch',   pillId: 'ch-target-range',   idealId: 'ideal-ch',   fmtFn: rndStr,    unit: ' ppm' },
    { resultId: 'r-cya',  rangeId: 'range-cya',  statusId: 's-cya',  pillId: 'cya-target-range',  idealId: 'ideal-cya',  fmtFn: rndStr,    unit: ' ppm' },
    { resultId: 'r-salt', rangeId: 'range-salt', statusId: 's-salt', pillId: 'salt-target-range', idealId: 'ideal-salt', fmtFn: rndStr,    unit: ' ppm' },
  ];

  // ── Core update (idempotent) ───────────────────────────────────────────────
  function applyParam(p) {
    const rangeEl  = document.getElementById(p.rangeId);
    const statusEl = document.getElementById(p.statusId);
    const pillEl   = document.getElementById(p.pillId);
    const resultEl = document.getElementById(p.resultId);
    if (!rangeEl || !pillEl) return;

    // Update Range cell
    const [lo, hi] = parseRangeFromText(pillEl.textContent);
    const rangeText = fmtRange(lo, hi, p.fmtFn, p.unit);
    if (rangeEl.textContent !== rangeText) rangeEl.textContent = rangeText;

    if (!statusEl || !resultEl) return;

    // Upgrade "Needs attention" → "Monitor" when within 5% buffer
    if (statusEl.textContent === 'Needs attention' && Number.isFinite(lo) && Number.isFinite(hi)) {
      const valMatch = resultEl.textContent.match(/(\d+(?:\.\d+)?)/);
      if (valMatch) {
        const value = Number(valMatch[1]);
        const buffer = (hi - lo) * 0.05;
        if (value >= lo - buffer && value <= hi + buffer) {
          statusEl.textContent = 'Monitor';
        }
      }
    }

    // Sync row classes
    const row = statusEl.parentElement;
    if (row) {
      const s = statusEl.textContent;
      row.classList.toggle('needs-attention-row', s === 'Needs attention');
      row.classList.toggle('monitor-row', s === 'Monitor');
    }
  }

  function runAll() { PARAMS.forEach(applyParam); }

  // ── DOM setup (runs once after load) ─────────────────────────────────────
  function initDom() {
    // Mark elite plans section as no-print
    document.querySelectorAll('.report-two-col').forEach(section => {
      if (section.querySelector('h3')?.textContent.includes('ELITE TREATMENT')) {
        section.classList.add('no-print');
      }
    });

    // Add Range column header
    const table = document.querySelector('.report-table');
    if (table) {
      const headerRow = table.querySelector('thead tr');
      const idealTh = headerRow &&
        Array.from(headerRow.querySelectorAll('th')).find(th => th.textContent.trim() === 'Ideal');
      if (idealTh && !headerRow.querySelector('th[data-range-col]')) {
        const th = document.createElement('th');
        th.dataset.rangeCol = '1';
        th.textContent = 'Range';
        idealTh.insertAdjacentElement('afterend', th);
      }

      // Add Range cells to each body row
      PARAMS.forEach(p => {
        const idealEl = document.getElementById(p.idealId);
        if (idealEl && !document.getElementById(p.rangeId)) {
          const td = document.createElement('td');
          td.id = p.rangeId;
          td.textContent = '--';
          idealEl.insertAdjacentElement('afterend', td);
        }
      });
    }

    runAll();

    // Watch status cells and target-range pills for bundle recalculations
    const watchEls = [
      ...PARAMS.map(p => document.getElementById(p.statusId)),
      ...PARAMS.map(p => document.getElementById(p.pillId)),
    ].filter(Boolean);

    let debounce = null;
    const observer = new MutationObserver(() => {
      clearTimeout(debounce);
      debounce = setTimeout(runAll, 0);
    });
    watchEls.forEach(el => observer.observe(el, { characterData: true, childList: true, subtree: true }));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDom);
  } else {
    initDom();
  }
})();
