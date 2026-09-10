(() => {
  const insights = document.getElementById('r-insights');
  const insightsPrint = document.getElementById('r-insights-print');
  const treatmentList = document.getElementById('r-treatment-list');
  const forecastList = document.getElementById('r-forecast-list');
  const serviceChecklist = document.getElementById('r-service-checklist');

  if (!insights) return;

  const autoPatterns = [
    /^-\s*No chemical additions were required during this visit\.$/i,
    /^-\s*Chlorine was added to help keep the pool properly sanitized\.$/i,
    /^-\s*Stabilizer \(CYA\) adjustments were made to support chlorine retention\.$/i,
    /^-\s*Stabilizer adjustments were not made\. CYA is expected to remain in range between now and our next visit\.$/i,
    /^-\s*Some water was replaced to help reduce CYA in the pool\.$/i,
    /^-\s*pH was adjusted with muriatic acid to support water balance and comfort\.$/i,
    /^-\s*Total alkalinity was adjusted to support overall water stability\.$/i,
    /^-\s*Calcium hardness was adjusted to help protect pool surfaces and equipment\.$/i,
    /^-\s*Calcium hardness adjustments were not needed today\. Levels are expected to remain near target until our next visit\.$/i,
    /^-\s*Calcium hardness was adjusted by replacing some water to help protect pool surfaces and equipment\.$/i,
    /^-\s*Salt levels were adjusted to support proper chlorination performance\.$/i,
    /^-\s*Borate levels were adjusted to support pH stability\.$/i,
    /^The following service checklist items were completed during this visit:/i,
    /^-\s*The following service checklist items were completed during this visit:/i
  ];

  function getCheckboxLabelText(checkbox) {
    const label = checkbox?.closest('label');
    if (!label) return '';
    const span = label.querySelector('span');
    if (span) return String(span.textContent || '').trim();
    return String(label.textContent || '').replace(/\s+/g, ' ').trim();
  }

  function getCheckedLabels(listEl) {
    if (!listEl) return [];
    return [...listEl.querySelectorAll('input[type="checkbox"]:checked')]
      .map(getCheckboxLabelText)
      .filter(Boolean);
  }

  function stripAutoLines(text) {
    return String(text || '')
      .split(/\r?\n/)
      .filter((line) => !autoPatterns.some((pattern) => pattern.test(line.trim())))
      .join('\n')
      .trim();
  }

  function buildChemicalLines() {
    const checkedTexts = [...getCheckedLabels(treatmentList), ...getCheckedLabels(forecastList)];
    const flags = {
      none: false,
      fc: false,
      cya: false,
      cyaNoAction: false,
      cyaWaterReplace: false,
      ph: false,
      ta: false,
      ch: false,
      chNoAction: false,
      chWaterReplace: false,
      salt: false,
      borate: false
    };

    checkedTexts.forEach((text) => {
      const normalized = text.toLowerCase();
      if (/no immediate chemical balancing action required today/.test(normalized)) flags.none = true;
      if (/^fc:|chlorine|bleach|trichlor|dichlor|shock|slam/.test(normalized)) flags.fc = true;
      if (/^cya:|stabilizer/.test(normalized)) {
        if (/replace .*water|with new water|to lower cya/.test(normalized)) {
          flags.cyaWaterReplace = true;
        } else if (/no addition today|no cya adjustment required|no cya action required/.test(normalized)) {
          flags.cyaNoAction = true;
        } else {
          flags.cya = true;
        }
      }
      if (/^ph:|muriatic acid|dry acid|acid/.test(normalized)) flags.ph = true;
      if (/^alk:|alkalinity|baking soda/.test(normalized)) flags.ta = true;
      if (/^ch:|calcium/.test(normalized)) {
        if (/replace .*water|to lower ch/.test(normalized)) {
          flags.chWaterReplace = true;
        } else if (/no calcium dose needed today|no ch adjustment required|stable/.test(normalized)) {
          flags.chNoAction = true;
        } else {
          flags.ch = true;
        }
      }
      if (/^salt:|\bsalt\b/.test(normalized)) flags.salt = true;
      if (/^borate:|\bborate\b/.test(normalized)) flags.borate = true;
    });

    const hasChemicalAction = flags.fc || flags.cya || flags.ph || flags.ta || flags.ch || flags.salt || flags.borate;
    const lines = [];

    if (flags.none && !hasChemicalAction) {
      lines.push('No chemical additions were required during this visit.');
      return lines;
    }

    if (flags.fc) lines.push('Chlorine was added to help keep the pool properly sanitized.');
    if (flags.cyaWaterReplace) lines.push('Some water was replaced to help reduce CYA in the pool.');
    else if (flags.cya) lines.push('Stabilizer (CYA) adjustments were made to support chlorine retention.');
    else if (flags.cyaNoAction) lines.push('Stabilizer adjustments were not made. CYA is expected to remain in range between now and our next visit.');
    if (flags.ph) lines.push('pH was adjusted with muriatic acid to support water balance and comfort.');
    if (flags.ta) lines.push('Total alkalinity was adjusted to support overall water stability.');
    if (flags.chWaterReplace) lines.push('Calcium hardness was adjusted by replacing some water to help protect pool surfaces and equipment.');
    else if (flags.ch) lines.push('Calcium hardness was adjusted to help protect pool surfaces and equipment.');
    else if (flags.chNoAction) lines.push('Calcium hardness adjustments were not needed today. Levels are expected to remain near target until our next visit.');
    if (flags.salt) lines.push('Salt levels were adjusted to support proper chlorination performance.');
    if (flags.borate) lines.push('Borate levels were adjusted to support pH stability.');

    return lines;
  }

  function buildServiceLine() {
    if (!serviceChecklist) return '';

    const chemicalBalancedItem = serviceChecklist.querySelector('.service-check-item[data-chemical-balanced="1"]');
    const chemicalBalancedChecked = Boolean(chemicalBalancedItem?.querySelector('input[type="checkbox"]')?.checked);

    const completed = [...serviceChecklist.querySelectorAll('.service-check-item')]
      .filter((item) => item.dataset.chemicalBalanced !== '1')
      .filter((item) => item.querySelector('input[type="checkbox"]')?.checked)
      .map((item) => getCheckboxLabelText(item.querySelector('input[type="checkbox"]')))
      .filter(Boolean);

    if (!completed.length) return '';
    if (chemicalBalancedChecked) completed.unshift('Chemicals Balanced');
    return `The following service checklist items were completed during this visit: ${completed.join(', ')}.`;
  }

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

  function syncInsights() {
    const base = stripAutoLines(insights.value);
    const lines = buildChemicalLines().map((line) => `- ${line}`);
    const serviceLine = buildServiceLine();
    if (serviceLine) lines.push(serviceLine);

    const nextValue = lines.length
      ? `${base ? `${base}\n` : ''}${lines.join('\n')}`
      : base;

    if (insights.value !== nextValue) {
      insights.value = nextValue;
    }

    if (insightsPrint) {
      insightsPrint.textContent = insights.value;
    }

    autoSizeInsights();
  }

  document.addEventListener('change', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement) || target.type !== 'checkbox') return;

    if (target.closest('#r-treatment-list') || target.closest('#r-forecast-list') || target.closest('#r-service-checklist')) {
      syncInsights();
    }
  });

  insights.addEventListener('input', () => {
    autoSizeInsights();
  });

  const observer = new MutationObserver(() => {
    syncInsights();
  });

  if (treatmentList) observer.observe(treatmentList, { childList: true, subtree: true });
  if (forecastList) observer.observe(forecastList, { childList: true, subtree: true });

  syncInsights();
})();
