(() => {
  const insights = document.getElementById('r-insights');
  const insightsPrint = document.getElementById('r-insights-print');
  const treatmentList = document.getElementById('r-treatment-list');
  const forecastList = document.getElementById('r-forecast-list');
  const serviceChecklist = document.getElementById('r-service-checklist');

  if (!insights) return;

  const autoPatterns = [
    /^No chemical additions were required during this visit\.$/i,
    /^Chlorine was added to help keep the pool properly sanitized\.$/i,
    /^Stabilizer \(CYA\) adjustments were made to support chlorine retention\.$/i,
    /^pH was adjusted with muriatic acid to support water balance and comfort\.$/i,
    /^Total alkalinity was adjusted to support overall water stability\.$/i,
    /^Calcium hardness was adjusted to help protect pool surfaces and equipment\.$/i,
    /^Salt levels were adjusted to support proper chlorination performance\.$/i,
    /^Borate levels were adjusted to support pH stability\.$/i,
    /^The following service checklist items were completed during this visit:/i
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
      ph: false,
      ta: false,
      ch: false,
      salt: false,
      borate: false
    };

    checkedTexts.forEach((text) => {
      const normalized = text.toLowerCase();
      if (/no immediate chemical balancing action required today/.test(normalized)) flags.none = true;
      if (/^fc:|chlorine|bleach|trichlor|dichlor|shock|slam/.test(normalized)) flags.fc = true;
      if (/^cya:|stabilizer/.test(normalized)) flags.cya = true;
      if (/^ph:|muriatic acid|dry acid|acid/.test(normalized)) flags.ph = true;
      if (/^alk:|alkalinity|baking soda/.test(normalized)) flags.ta = true;
      if (/^ch:|calcium/.test(normalized)) flags.ch = true;
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
    if (flags.cya) lines.push('Stabilizer (CYA) adjustments were made to support chlorine retention.');
    if (flags.ph) lines.push('pH was adjusted with muriatic acid to support water balance and comfort.');
    if (flags.ta) lines.push('Total alkalinity was adjusted to support overall water stability.');
    if (flags.ch) lines.push('Calcium hardness was adjusted to help protect pool surfaces and equipment.');
    if (flags.salt) lines.push('Salt levels were adjusted to support proper chlorination performance.');
    if (flags.borate) lines.push('Borate levels were adjusted to support pH stability.');

    return lines;
  }

  function buildServiceLine() {
    if (!serviceChecklist) return '';

    const completed = [...serviceChecklist.querySelectorAll('.service-check-item')]
      .filter((item) => item.dataset.chemicalBalanced !== '1')
      .filter((item) => item.querySelector('input[type="checkbox"]')?.checked)
      .map((item) => getCheckboxLabelText(item.querySelector('input[type="checkbox"]')))
      .filter(Boolean);

    if (!completed.length) return '';
    return `The following service checklist items were completed during this visit: ${completed.join(', ')}.`;
  }

  function syncInsights() {
    const base = stripAutoLines(insights.value);
    const lines = [...buildChemicalLines()];
    const serviceLine = buildServiceLine();
    if (serviceLine) lines.push(serviceLine);

    const nextValue = lines.length
      ? `${base ? `${base}\n\n` : ''}${lines.join('\n')}`
      : base;

    if (insights.value !== nextValue) {
      insights.value = nextValue;
    }

    if (insightsPrint) {
      insightsPrint.textContent = insights.value;
    }
  }

  document.addEventListener('change', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement) || target.type !== 'checkbox') return;

    if (target.closest('#r-treatment-list') || target.closest('#r-forecast-list') || target.closest('#r-service-checklist')) {
      syncInsights();
    }
  });

  const observer = new MutationObserver(() => {
    syncInsights();
  });

  if (treatmentList) observer.observe(treatmentList, { childList: true, subtree: true });
  if (forecastList) observer.observe(forecastList, { childList: true, subtree: true });

  syncInsights();
})();
