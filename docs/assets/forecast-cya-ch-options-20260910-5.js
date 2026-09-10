(() => {
  window.__forecastOptionsPatch = window.__forecastOptionsPatch || { loadedAt: Date.now(), normalizeCount: 0, lastAppliedCount: 0 };
  if (typeof window.__forecastOptionsPatch.keepCyaOptions !== 'boolean') window.__forecastOptionsPatch.keepCyaOptions = false;
  if (typeof window.__forecastOptionsPatch.keepChOptions !== 'boolean') window.__forecastOptionsPatch.keepChOptions = false;
  const CYA_REMOVER_URL = 'https://www.amazon.com/Cyanuric-Reducer-Removes-Through-Filtration/dp/B0CN2DNJZR/ref=sr_1_3?crid=267RNJ4T1HNMO&dib=eyJ2IjoiMSJ9.0d4mAa_9aA2BwCx2lifaLLWbUEPyotpAREtsqVX7K8vBcWdFeGwIT87WiWKF1XUIKHJ3z91LLArlGX4QfoGlcOlhwtXesjczhIiXFDSh3u6k28vHEdvqr-ar4_ZXrafQ_QJAK6STfJ8KGG04wG5TDzsWYAArwylHqOOJLoufslwTOAlSA9z5naLSAF0GHQHzzFol_Kz_pV5i8jLZgVWZeEljLc3CsV1QxrTIYqE2XL4OtEzG-rutazgDT6h3Evwg9b1H-1Oj1BmQrkb_siRFTkumK-111v9Cftws19gWnAA.OjR4fKZ-FVIC1CaKuB4FJLUUI_gYQC1v0JuoYsSDhP4&dib_tag=se&keywords=cya+removal&qid=1789046028&sprefix=cya+remover%2Caps%2C433&sr=8-3';
  const LINK_PHRASE = 'Cyanuric Acid Remover';

  let scheduled = false;
  let applying = false;
  let lastSignature = '';
  let listObserver = null;
  let observedForecastList = null;
  let treatmentObserver = null;
  let observedTreatmentList = null;
  let retryTimer = null;
  let keepCyaOptions = window.__forecastOptionsPatch.keepCyaOptions;
  let keepChOptions = window.__forecastOptionsPatch.keepChOptions;
  const selectedOptionState = window.__forecastOptionsPatch.selectedOptionState || { CYA: '', CH: '' };
  window.__forecastOptionsPatch.selectedOptionState = selectedOptionState;

  function byId(id) {
    return document.getElementById(id);
  }

  function getEls() {
    const forecastList = byId('r-forecast-list');
    const treatmentList = byId('r-treatment-list');
    const cyaResult = byId('r-cya');
    const cyaRange = byId('range-cya');
    const chResult = byId('r-ch');
    const chRange = byId('range-ch');
    if (!forecastList || !treatmentList || !cyaResult || !cyaRange || !chResult || !chRange) return null;
    return { forecastList, treatmentList, cyaResult, cyaRange, chResult, chRange };
  }

  function parseFirstNumber(text) {
    const m = String(text || '').match(/-?\d+(?:\.\d+)?/);
    return m ? Number(m[0]) : Number.NaN;
  }

  function parseRange(text) {
    const m = String(text || '').match(/(-?\d+(?:\.\d+)?)\s*(?:to|-|\u2013)\s*(-?\d+(?:\.\d+)?)/i);
    if (!m) return [Number.NaN, Number.NaN];
    return [Number(m[1]), Number(m[2])];
  }

  function collectItems(listEl) {
    return Array.from(listEl.querySelectorAll('li')).map((li) => {
      const span = li.querySelector('span');
      const box = li.querySelector('input[type="checkbox"]');
      const text = String(span?.textContent || li.textContent || '').trim();
      const optionKey = getOptionKey(text);
      return {
        text,
        optionKey,
        checked: Boolean(box?.checked),
        checkable: Boolean(box)
      };
    }).filter((item) => item.text);
  }

  function findTreatmentLine(treatmentList, prefix) {
    const hit = collectItems(treatmentList).find((item) => item.text.startsWith(prefix));
    return hit ? hit.text : '';
  }

  function renderTextWithLink(target, text) {
    const idx = text.indexOf(LINK_PHRASE);
    target.textContent = '';
    if (idx < 0) {
      target.textContent = text;
      return;
    }

    const before = text.slice(0, idx);
    const after = text.slice(idx + LINK_PHRASE.length);
    if (before) target.appendChild(document.createTextNode(before));

    const anchor = document.createElement('a');
    anchor.href = CYA_REMOVER_URL;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    anchor.textContent = LINK_PHRASE;
    target.appendChild(anchor);

    if (after) target.appendChild(document.createTextNode(after));
  }

  function setItems(forecastList, items, checkedByText, checkedByOption) {
    forecastList.innerHTML = '';
    items.forEach((item) => {
      const li = document.createElement('li');
      const textSpan = document.createElement('span');
      renderTextWithLink(textSpan, item.text);

      if (item.checkable) {
        const label = document.createElement('label');
        const box = document.createElement('input');
        box.type = 'checkbox';
        const optionKey = getOptionKey(item.text);
        if (optionKey) {
          box.dataset.optionKey = optionKey;
          box.checked = checkedByOption.get(optionKey) === true;
        } else {
          box.checked = checkedByText.get(item.text) === true;
        }
        label.append(box, textSpan);
        li.appendChild(label);
      } else {
        li.classList.add('checklist-note');
        li.appendChild(textSpan);
      }

      forecastList.appendChild(li);
    });
  }

  function getOptionGroup(text) {
    if (/^CYA\s*-\s*Option\s*\d+:/i.test(text)) return 'CYA';
    if (/^CH\s*-\s*Option\s*\d+:/i.test(text)) return 'CH';
    return '';
  }

  function getOptionKey(text) {
    const match = String(text || '').match(/^(CYA|CH)\s*-\s*Option\s*(\d+)\s*:/i);
    if (!match) return '';
    return `${match[1].toUpperCase()}-${match[2]}`;
  }

  function enforceExclusiveOptionSelection(changedBox) {
    const changedLi = changedBox.closest('li');
    if (!changedLi) return;
    const changedText = String(changedLi.querySelector('span')?.textContent || changedLi.textContent || '').trim();
    const group = getOptionGroup(changedText);
    if (!group || !changedBox.checked) return;
    const selectedKey = getOptionKey(changedText);

    const forecastList = byId('r-forecast-list');
    if (!forecastList) return;

    forecastList.querySelectorAll('li input[type="checkbox"]').forEach((box) => {
      if (box === changedBox) return;
      const li = box.closest('li');
      if (!li) return;
      const text = String(li.querySelector('span')?.textContent || li.textContent || '').trim();
      if (getOptionGroup(text) === group) box.checked = false;
    });

    if (selectedKey) {
      selectedOptionState[group] = selectedKey;
      window.__forecastOptionsPatch.selectedOptionState = selectedOptionState;
    }
  }

  function normalize() {
    window.__forecastOptionsPatch.normalizeCount += 1;
    if (applying) return;

    const els = getEls();
    if (!els) return;

    const { forecastList, treatmentList, cyaRange, chRange } = els;
    const current = collectItems(forecastList);
    if (!current.length) return;

    const hasCyaOptionsNow = current.some((item) => /^CYA\s*-\s*Option\s*\d+:/i.test(item.text));
    const hasChOptionsNow = current.some((item) => /^CH\s*-\s*Option\s*\d+:/i.test(item.text));
    if (hasCyaOptionsNow) {
      keepCyaOptions = true;
      window.__forecastOptionsPatch.keepCyaOptions = true;
    }
    if (hasChOptionsNow) {
      keepChOptions = true;
      window.__forecastOptionsPatch.keepChOptions = true;
    }

    const checkedByText = new Map(current.map((item) => [item.text, item.checked]));
    const checkedByOption = new Map(
      current
        .filter((item) => item.optionKey && item.checked)
        .map((item) => [item.optionKey, true])
    );
    if (selectedOptionState.CYA) checkedByOption.set(selectedOptionState.CYA, true);
    if (selectedOptionState.CH) checkedByOption.set(selectedOptionState.CH, true);
    const [cyaMin, cyaMax] = parseRange(cyaRange.textContent);
    const [chMin, chMax] = parseRange(chRange.textContent);
    const cyaValue = parseFirstNumber(byId('cya-from')?.value);
    const chValue = parseFirstNumber(byId('ch-from')?.value);

    try {
      let items = current.filter((item) => {
        return !/^CYA:\s*High at .*Choose one option below\.$/i.test(item.text)
          && !/^CH:\s*High at .*Choose one option below\.$/i.test(item.text)
          && !/^CYA\s*-\s*Option\s*\d+:/i.test(item.text)
          && !/^CH\s*-\s*Option\s*\d+:/i.test(item.text);
      });

      const cyaTreatment = findTreatmentLine(treatmentList, 'CYA:');
      const treatmentImpliesHighCya = /lower\s+cya|replace\s+\d+%\s+of\s+the\s+water|water\s+was\s+replaced/i.test(cyaTreatment);
      const showCyaOptions = (Number.isFinite(cyaValue) && Number.isFinite(cyaMax) && cyaValue > cyaMax) || keepCyaOptions || treatmentImpliesHighCya;
      if (showCyaOptions) {
        keepCyaOptions = true;
        window.__forecastOptionsPatch.keepCyaOptions = true;
        items = items.filter((item) => !/^CYA:/i.test(item.text));
        const cyaOption2 = cyaTreatment
          ? `CYA - Option 2: ${cyaTreatment.replace(/^CYA:\s*/, '')}`
          : 'CYA - Option 2: Some water was replaced to help reduce CYA in the pool.';
        items.push(
          { text: `CYA: High at ${Math.round(cyaValue)} ppm (target: ${Math.round(cyaMin)}-${Math.round(cyaMax)} ppm). Choose one option below.`, checkable: false },
          { text: 'CYA - Option 1: Reduce CYA via Cyanuric Acid Remover filtration in skimmer basket.', checkable: true },
          { text: cyaOption2, checkable: true },
          { text: 'CYA - Option 3: Defer treatment until after the swimming season to address water replacement.', checkable: true }
        );
      }

      const chTreatment = findTreatmentLine(treatmentList, 'CH:');
      const treatmentImpliesHighCh = /reduce\s+water|water\s+replacement|drain/i.test(chTreatment);
      const showChOptions = (Number.isFinite(chValue) && Number.isFinite(chMax) && chValue > chMax) || keepChOptions || treatmentImpliesHighCh;
      if (showChOptions) {
        keepChOptions = true;
        window.__forecastOptionsPatch.keepChOptions = true;
        items = items.filter((item) => !/^CH:/i.test(item.text));
        const chOption1 = chTreatment
          ? `CH - Option 1: ${chTreatment.replace(/^CH:\s*/, '')}`
          : 'CH - Option 1: Reduce water as already programmed to lower calcium hardness.';
        items.push(
          { text: `CH: High at ${Math.round(chValue)} ppm (target: ${Math.round(chMin)}-${Math.round(chMax)} ppm). Choose one option below.`, checkable: false },
          { text: chOption1, checkable: true },
          { text: 'CH - Option 2: Delay remediation for now when appropriate, since water replacement is often better served during the off season.', checkable: true }
        );
      }

      const deduped = [];
      const seen = new Set();
      items.forEach((item) => {
        const key = String(item.text || '').trim();
        if (!key || seen.has(key)) return;
        seen.add(key);
        deduped.push(item);
      });
      items = deduped;

      const signature = JSON.stringify(items.map((item) => [item.text, item.checkable]));
      const currentSignature = JSON.stringify(current.map((item) => [item.text, item.checkable]));
      if (signature === lastSignature && currentSignature === signature) return;

      applying = true;
      try {
        setItems(forecastList, items, checkedByText, checkedByOption);
        window.__forecastOptionsPatch.lastAppliedCount = items.length;
        lastSignature = signature;
      } finally {
        applying = false;
      }
    } catch {
      applying = false;
    }
  }

  function normalizeWithRetries(attempts = 0) {
    ensureObservers();
    scheduleNormalize();
    if (attempts >= 4) return;
    if (retryTimer) clearTimeout(retryTimer);
    retryTimer = setTimeout(() => normalizeWithRetries(attempts + 1), 80);
  }

  function scheduleNormalize() {
    if (scheduled) return;
    scheduled = true;
    setTimeout(() => {
      scheduled = false;
      normalize();
    }, 0);
  }

  function ensureObservers() {
    const els = getEls();
    if (!els) return;

    if (!listObserver) {
      listObserver = new MutationObserver(() => scheduleNormalize());
    }
    if (!treatmentObserver) {
      treatmentObserver = new MutationObserver(() => scheduleNormalize());
    }

    if (observedForecastList !== els.forecastList) {
      if (observedForecastList) {
        listObserver.disconnect();
      }
      observedForecastList = els.forecastList;
      listObserver.observe(observedForecastList, { childList: true });
    }

    if (observedTreatmentList !== els.treatmentList) {
      if (observedTreatmentList) {
        treatmentObserver.disconnect();
      }
      observedTreatmentList = els.treatmentList;
      treatmentObserver.observe(observedTreatmentList, { childList: true });
    }
  }

  document.addEventListener('change', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement) || target.type !== 'checkbox') return;
    if (!target.closest('#r-forecast-list')) return;
    enforceExclusiveOptionSelection(target);

    const rowText = String(target.closest('li')?.querySelector('span')?.textContent || target.closest('li')?.textContent || '').trim();
    const group = getOptionGroup(rowText);
    const optionKey = target.dataset.optionKey || getOptionKey(rowText);
    if (group && optionKey) {
      if (target.checked) selectedOptionState[group] = optionKey;
      else if (selectedOptionState[group] === optionKey) selectedOptionState[group] = '';
      window.__forecastOptionsPatch.selectedOptionState = selectedOptionState;
    }
  }, true);

  document.addEventListener('change', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement)) return;
    if (target.id === 'cya-from' || target.id === 'cya-to' || target.id === 'ch-from' || target.id === 'ch-to' || target.id === 'size' || target.id === 'ch-fill') {
      normalizeWithRetries(0);
    }
  });

  const openReport = byId('open-report');
  if (openReport) {
    openReport.addEventListener('click', () => {
      normalizeWithRetries(0);
    });
  }

  const bootObserver = new MutationObserver(() => {
    ensureObservers();
    scheduleNormalize();
  });
  bootObserver.observe(document.body, { childList: true, subtree: true });

  ensureObservers();
  scheduleNormalize();
})();
