(() => {
  // If the primary forecast options patch is active, this fallback stays idle.
  if (window.__forecastOptionsPatch) return;

  const CYA_REMOVER_URL = 'https://www.amazon.com/Cyanuric-Reducer-Removes-Through-Filtration/dp/B0CN2DNJZR/ref=sr_1_3?crid=267RNJ4T1HNMO&dib=eyJ2IjoiMSJ9.0d4mAa_9aA2BwCx2lifaLLWbUEPyotpAREtsqVX7K8vBcWdFeGwIT87WiWKF1XUIKHJ3z91LLArlGX4QfoGlcOlhwtXesjczhIiXFDSh3u6k28vHEdvqr-ar4_ZXrafQ_QJAK6STfJ8KGG04wG5TDzsWYAArwylHqOOJLoufslwTOAlSA9z5naLSAF0GHQHzzFol_Kz_pV5i8jLZgVWZeEljLc3CsV1QxrTIYqE2XL4OtEzG-rutazgDT6h3Evwg9b1H-1Oj1BmQrkb_siRFTkumK-111v9Cftws19gWnAA.OjR4fKZ-FVIC1CaKuB4FJLUUI_gYQC1v0JuoYsSDhP4&dib_tag=se&keywords=cya+removal&qid=1789046028&sprefix=cya+remover%2Caps%2C433&sr=8-3';
  const LINK_TEXT = 'Cyanuric Acid Remover';
  const state = (window.__forecastStickyFallback = window.__forecastStickyFallback || {
    keepCya: false,
    keepCh: false,
    running: false
  });

  function byId(id) {
    return document.getElementById(id);
  }

  function listItems(listEl) {
    return Array.from(listEl.querySelectorAll('li'));
  }

  function rowText(li) {
    return String(li.querySelector('span')?.textContent || li.textContent || '').trim();
  }

  function hasRowWithPrefix(listEl, prefix) {
    return listItems(listEl).some((li) => rowText(li).startsWith(prefix));
  }

  function treatmentLine(prefix) {
    const listEl = byId('r-treatment-list');
    if (!listEl) return '';
    const hit = listItems(listEl).find((li) => rowText(li).startsWith(prefix));
    return hit ? rowText(hit) : '';
  }

  function appendItem(listEl, text, checkable) {
    const li = document.createElement('li');
    const span = document.createElement('span');

    const idx = text.indexOf(LINK_TEXT);
    if (idx >= 0) {
      const before = text.slice(0, idx);
      const after = text.slice(idx + LINK_TEXT.length);
      if (before) span.appendChild(document.createTextNode(before));
      const a = document.createElement('a');
      a.href = CYA_REMOVER_URL;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = LINK_TEXT;
      span.appendChild(a);
      if (after) span.appendChild(document.createTextNode(after));
    } else {
      span.textContent = text;
    }

    if (checkable) {
      const label = document.createElement('label');
      const box = document.createElement('input');
      box.type = 'checkbox';
      label.append(box, span);
      li.appendChild(label);
    } else {
      li.classList.add('checklist-note');
      li.appendChild(span);
    }

    listEl.appendChild(li);
  }

  function ensureRows() {
    if (state.running) return;
    state.running = true;
    try {
      const forecast = byId('r-forecast-list');
      if (!forecast) return;

      const cyaNow = Number.parseFloat(byId('cya-from')?.value || 'NaN');
      const chNow = Number.parseFloat(byId('ch-from')?.value || 'NaN');
      const cyaHighByValue = Number.isFinite(cyaNow) && cyaNow > 80;
      const chHighByValue = Number.isFinite(chNow) && chNow > 400;

      const cyaTreatment = treatmentLine('CYA:');
      const chTreatment = treatmentLine('CH:');
      const cyaHighByTreatment = /lower\s+cya|replace\s+\d+%\s+of\s+the\s+water|water\s+was\s+replaced/i.test(cyaTreatment);
      const chHighByTreatment = /reduce\s+water|water\s+replacement|drain/i.test(chTreatment);

      if (hasRowWithPrefix(forecast, 'CYA - Option 1:')) state.keepCya = true;
      if (hasRowWithPrefix(forecast, 'CH - Option 1:')) state.keepCh = true;

      const showCya = cyaHighByValue || cyaHighByTreatment || state.keepCya;
      const showCh = chHighByValue || chHighByTreatment || state.keepCh;

      if (showCya) {
        state.keepCya = true;
        if (!hasRowWithPrefix(forecast, 'CYA - Option 1:')) {
          appendItem(forecast, 'CYA - Option 1: Reduce CYA via Cyanuric Acid Remover filtration in skimmer basket.', true);
        }
        if (!hasRowWithPrefix(forecast, 'CYA - Option 2:')) {
          const option2 = cyaTreatment
            ? `CYA - Option 2: ${cyaTreatment.replace(/^CYA:\s*/, '')}`
            : 'CYA - Option 2: Some water was replaced to help reduce CYA in the pool.';
          appendItem(forecast, option2, true);
        }
        if (!hasRowWithPrefix(forecast, 'CYA - Option 3:')) {
          appendItem(forecast, 'CYA - Option 3: Defer treatment until after the swimming season to address water replacement.', true);
        }
      }

      if (showCh) {
        state.keepCh = true;
        if (!hasRowWithPrefix(forecast, 'CH - Option 1:')) {
          const option1 = chTreatment
            ? `CH - Option 1: ${chTreatment.replace(/^CH:\s*/, '')}`
            : 'CH - Option 1: Reduce water as already programmed to lower calcium hardness.';
          appendItem(forecast, option1, true);
        }
        if (!hasRowWithPrefix(forecast, 'CH - Option 2:')) {
          appendItem(forecast, 'CH - Option 2: Delay remediation for now when appropriate, since water replacement is often better served during the off season.', true);
        }
      }
    } finally {
      state.running = false;
    }
  }

  document.addEventListener('change', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (target.closest('#report-view') || target.closest('#r-forecast-list') || target.closest('#r-treatment-list')) {
      setTimeout(ensureRows, 0);
      setTimeout(ensureRows, 300);
      setTimeout(ensureRows, 900);
    }
  });

  const mo = new MutationObserver(() => ensureRows());
  mo.observe(document.body, { childList: true, subtree: true });
  ensureRows();
})();
