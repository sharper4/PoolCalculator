(() => {
  const forecastList = document.getElementById('r-forecast-list');
  const treatmentList = document.getElementById('r-treatment-list');
  const cyaResult = document.getElementById('r-cya');
  const cyaRange = document.getElementById('range-cya');
  const chResult = document.getElementById('r-ch');
  const chRange = document.getElementById('range-ch');

  if (!forecastList || !treatmentList || !cyaResult || !cyaRange || !chResult || !chRange) return;

  let isApplying = false;

  function parseFirstNumber(text) {
    const m = String(text || '').match(/-?\d+(?:\.\d+)?/);
    return m ? Number(m[0]) : Number.NaN;
  }

  function parseRange(text) {
    const m = String(text || '').match(/(-?\d+(?:\.\d+)?)\s*(?:to|-|\u2013)\s*(-?\d+(?:\.\d+)?)/i);
    if (!m) return [Number.NaN, Number.NaN];
    return [Number(m[1]), Number(m[2])];
  }

  function getChecklistItems(listEl) {
    return Array.from(listEl.querySelectorAll('li')).map((li) => {
      const span = li.querySelector('span');
      const box = li.querySelector('input[type="checkbox"]');
      return {
        text: String(span?.textContent || '').trim(),
        checked: Boolean(box?.checked)
      };
    });
  }

  function setChecklistItems(listEl, items) {
    const checkedByText = new Map(items.map((item) => [item.text, item.checked]));
    listEl.innerHTML = '';
    items.forEach((item) => {
      const li = document.createElement('li');
      const label = document.createElement('label');
      const box = document.createElement('input');
      const text = document.createElement('span');
      box.type = 'checkbox';
      box.checked = checkedByText.get(item.text) === true;
      text.textContent = item.text;
      label.append(box, text);
      li.appendChild(label);
      listEl.appendChild(li);
    });
  }

  function findTreatmentLine(prefix) {
    const hit = getChecklistItems(treatmentList).find((item) => item.text.startsWith(prefix));
    return hit ? hit.text : '';
  }

  function normalizeForecastOptions() {
    if (isApplying) return;
    isApplying = true;

    try {
      const baseItems = getChecklistItems(forecastList);
      if (!baseItems.length) return;

      const [cyaMin, cyaMax] = parseRange(cyaRange.textContent);
      const [chMin, chMax] = parseRange(chRange.textContent);
      const cyaValue = parseFirstNumber(cyaResult.textContent);
      const chValue = parseFirstNumber(chResult.textContent);

      let items = baseItems.slice();

      if (Number.isFinite(cyaValue) && Number.isFinite(cyaMax) && cyaValue > cyaMax) {
        const cyaTreatment = findTreatmentLine('CYA:');
        const cyaOption2 = cyaTreatment
          ? `CYA - Option 2: ${cyaTreatment.replace(/^CYA:\s*/, '')}`
          : 'CYA - Option 2: Some water was replaced to help reduce CYA in the pool.';

        items = items.filter((item) => !/^CYA:/i.test(item.text) && !/^CYA\s*-\s*Option\s*\d+:/i.test(item.text));
        items.push(
          { text: `CYA: High at ${Math.round(cyaValue)} ppm (target: ${Math.round(cyaMin)}-${Math.round(cyaMax)} ppm). Choose one option below.`, checked: false },
          { text: 'CYA - Option 1: Reduce CYA via CYA filtration. Do not remove the sponge located in your skimmer. It costs $200 to replace and should remain in place for 2-3 weeks while reducing CYA in the pool.', checked: false },
          { text: cyaOption2, checked: false }
        );
      }

      if (Number.isFinite(chValue) && Number.isFinite(chMax) && chValue > chMax) {
        const chTreatment = findTreatmentLine('CH:');
        const chOption1 = chTreatment
          ? `CH - Option 1: ${chTreatment.replace(/^CH:\s*/, '')}`
          : 'CH - Option 1: Reduce water as already programmed to lower calcium hardness.';

        items = items.filter((item) => !/^CH:/i.test(item.text) && !/^CH\s*-\s*Option\s*\d+:/i.test(item.text));
        items.push(
          { text: `CH: High at ${Math.round(chValue)} ppm (target: ${Math.round(chMin)}-${Math.round(chMax)} ppm). Choose one option below.`, checked: false },
          { text: chOption1, checked: false },
          { text: 'CH - Option 2: Delay remediation for now when appropriate, since water replacement is often better served during the off season.', checked: false }
        );
      }

      const hasDiff = items.length !== baseItems.length || items.some((item, idx) => item.text !== baseItems[idx]?.text);
      if (hasDiff) {
        const checkedState = new Map(baseItems.map((item) => [item.text, item.checked]));
        const merged = items.map((item) => ({ text: item.text, checked: checkedState.get(item.text) === true }));
        setChecklistItems(forecastList, merged);
      }
    } finally {
      isApplying = false;
    }
  }

  const observer = new MutationObserver(() => normalizeForecastOptions());
  observer.observe(forecastList, { childList: true, subtree: true });

  normalizeForecastOptions();
})();
