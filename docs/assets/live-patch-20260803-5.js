// Live patch 2026-08-03-5
// Consolidated: Range column, Monitor status, card amber/red
// pH uses 5% buffer; all others use 10%
(() => {
  const style = document.createElement('style');
  style.textContent = [
    '@media print { .no-print { display: none !important; } }',
    '.report-table tr.monitor-row td { font-weight: 600; color: #a05c00; }',
    '.chem-card.near-range { border-color: #c07a00; background: #fff8e6; box-shadow: inset 0 0 0 1px rgba(160,92,0,0.2); }',
  ].join('\n');
  document.head.appendChild(style);

  function parseRangeFromText(text) {
    const m = text.match(/(\d+(?:\.\d+)?)\s*(?:to|[–\-])+\s*(\d+(?:\.\d+)?)/i);
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

  // monitorBuf: fraction of span used as near-range buffer (0 = no Monitor)
  const PARAMS = [
    { resultId: 'r-fc',   rangeId: 'range-fc',   statusId: 's-fc',   pillId: 'fc-target-range',   idealId: 'ideal-fc',   fmtFn: round2str, unit: ' ppm', monitorBuf: 0.10, cardSel: '.chem-card.fc' },
    { resultId: 'r-ph',   rangeId: 'range-ph',   statusId: 's-ph',   pillId: 'ph-target-range',   idealId: 'ideal-ph',   fmtFn: round2str, unit: '',      monitorBuf: 0.05, cardSel: '.chem-card.ph' },
    { resultId: 'r-ta',   rangeId: 'range-ta',   statusId: 's-ta',   pillId: 'ta-target-range',   idealId: 'ideal-ta',   fmtFn: rndStr,    unit: ' ppm', monitorBuf: 0.10, cardSel: '.chem-card.ta' },
    { resultId: 'r-ch',   rangeId: 'range-ch',   statusId: 's-ch',   pillId: 'ch-target-range',   idealId: 'ideal-ch',   fmtFn: rndStr,    unit: ' ppm', monitorBuf: 0.10, cardSel: '.chem-card.ch' },
    { resultId: 'r-cya',  rangeId: 'range-cya',  statusId: 's-cya',  pillId: 'cya-target-range',  idealId: 'ideal-cya',  fmtFn: rndStr,    unit: ' ppm', monitorBuf: 0.10, cardSel: '.chem-card.cya' },
    { resultId: 'r-salt', rangeId: 'range-salt', statusId: 's-salt', pillId: 'salt-target-range', idealId: 'ideal-salt', fmtFn: rndStr,    unit: ' ppm', monitorBuf: 0.10, cardSel: '.chem-card.salt' },
  ];

  // ── Table: Range cell + Monitor status ───────────────────────────────────
  function applyTableParam(p) {
    const rangeEl  = document.getElementById(p.rangeId);
    const statusEl = document.getElementById(p.statusId);
    const pillEl   = document.getElementById(p.pillId);
    const resultEl = document.getElementById(p.resultId);
    if (!rangeEl || !pillEl) return;

    const [lo, hi] = parseRangeFromText(pillEl.textContent);
    const rangeText = fmtRange(lo, hi, p.fmtFn, p.unit);
    if (rangeEl.textContent !== rangeText) rangeEl.textContent = rangeText;

    if (!statusEl || !resultEl) return;
    if (p.monitorBuf > 0 && statusEl.textContent === 'Needs attention' && Number.isFinite(lo) && Number.isFinite(hi)) {
      const valMatch = resultEl.textContent.match(/(\d+(?:\.\d+)?)/);
      if (valMatch) {
        const value = Number(valMatch[1]);
        const buffer = (hi - lo) * p.monitorBuf;
        if (value >= lo - buffer && value <= hi + buffer) statusEl.textContent = 'Monitor';
      }
    }
    const row = statusEl.parentElement;
    if (row) {
      const s = statusEl.textContent;
      row.classList.toggle('needs-attention-row', s === 'Needs attention');
      row.classList.toggle('monitor-row', s === 'Monitor');
    }
  }

  // ── Card: green / amber / red ─────────────────────────────────────────────
  function applyCardParam(p) {
    if (!p.cardSel) return;
    const card = document.querySelector(p.cardSel);
    if (!card) return;

    if (card.classList.contains('within-range')) {
      card.classList.remove('near-range');
      return;
    }
    if (!card.classList.contains('out-of-range') && !card.classList.contains('near-range')) return;

    const resultEl = document.getElementById(p.resultId);
    const pillEl   = document.getElementById(p.pillId);
    if (!resultEl || !pillEl) { card.classList.remove('near-range'); return; }

    const valMatch = resultEl.textContent.match(/(\d+(?:\.\d+)?)/);
    if (!valMatch) { card.classList.remove('near-range'); return; }

    const [lo, hi] = parseRangeFromText(pillEl.textContent);
    if (!Number.isFinite(lo) || !Number.isFinite(hi) || lo === hi) {
      card.classList.remove('near-range');
      return;
    }

    const value  = Number(valMatch[1]);
    const buffer = (hi - lo) * p.monitorBuf;
    const isNear = p.monitorBuf > 0 && value >= lo - buffer && value <= hi + buffer;
    card.classList.toggle('near-range',   isNear);
    card.classList.toggle('out-of-range', !isNear);
  }

  function runAll() {
    PARAMS.forEach(applyTableParam);
    PARAMS.forEach(applyCardParam);
  }

  // ── DOM init ──────────────────────────────────────────────────────────────
  function initDom() {
    // Hide elite plans from print
    document.querySelectorAll('.report-two-col').forEach(section => {
      if (section.querySelector('h3')?.textContent.includes('ELITE TREATMENT'))
        section.classList.add('no-print');
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

    // Observe status cells and pills (table) + card classes (card colors)
    const watchEls = [
      ...PARAMS.map(p => document.getElementById(p.statusId)),
      ...PARAMS.map(p => document.getElementById(p.pillId)),
    ].filter(Boolean);
    const cardEls = PARAMS.map(p => p.cardSel && document.querySelector(p.cardSel)).filter(Boolean);

    let debounce = null;
    const observer = new MutationObserver(() => {
      clearTimeout(debounce);
      debounce = setTimeout(runAll, 0);
    });
    watchEls.forEach(el => observer.observe(el, { characterData: true, childList: true, subtree: true }));
    cardEls.forEach(el => observer.observe(el, { attributes: true, attributeFilter: ['class'] }));

    // Belt-and-suspenders on any input/change
    document.addEventListener('input',  () => setTimeout(runAll, 60), true);
    document.addEventListener('change', () => setTimeout(runAll, 60), true);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDom);
  } else {
    initDom();
  }
})();
