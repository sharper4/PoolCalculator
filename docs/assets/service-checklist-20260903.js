(() => {
  const checklistSection = document.getElementById('report-service-checklist');
  const checklist = document.getElementById('r-service-checklist');
  const sendBtn = document.getElementById('send-report-email');
  const emailModalOverlay = document.getElementById('email-modal-overlay');

  if (!checklistSection || !checklist) return;

  let restoreTimer = null;
  let pendingRestore = [];
  let priorDisplayForPrint = null;
  let priorConditionRowStyle = null;
  const priorConditionLabelStyles = new Map();

  function applyConditionSummaryOutputLayout() {
    const row = document.querySelector('.condition-three-col');
    if (!row) return;

    if (priorConditionRowStyle === null) {
      priorConditionRowStyle = row.getAttribute('style');
    }
    row.style.display = 'flex';
    row.style.flexWrap = 'nowrap';
    row.style.alignItems = 'flex-start';
    row.style.justifyContent = 'space-between';
    row.style.gap = '0.6rem';

    row.querySelectorAll('label').forEach((label) => {
      if (!priorConditionLabelStyles.has(label)) {
        priorConditionLabelStyles.set(label, label.getAttribute('style'));
      }
      label.style.display = 'inline-flex';
      label.style.alignItems = 'flex-start';
      label.style.gap = '0.2rem';
      label.style.whiteSpace = 'nowrap';
      label.style.margin = '0';
    });
  }

  function restoreConditionSummaryLayout() {
    const row = document.querySelector('.condition-three-col');
    if (!row) return;

    if (priorConditionRowStyle === null) {
      row.removeAttribute('style');
    } else {
      row.setAttribute('style', priorConditionRowStyle);
    }
    priorConditionRowStyle = null;

    priorConditionLabelStyles.forEach((styleValue, label) => {
      if (!label.isConnected) return;
      if (styleValue === null) label.removeAttribute('style');
      else label.setAttribute('style', styleValue);
    });
    priorConditionLabelStyles.clear();
  }

  function updateChecklistState() {
    let hasNonChemicalChecked = false;

    checklist.querySelectorAll('.service-check-item').forEach((item) => {
      const box = item.querySelector('input[type="checkbox"]');
      const checked = Boolean(box?.checked);
      item.classList.toggle('is-checked', checked);
      const isChemicalBalanced = item.dataset.chemicalBalanced === '1';
      if (checked && !isChemicalBalanced) hasNonChemicalChecked = true;
    });

    checklistSection.dataset.hasChecked = hasNonChemicalChecked ? '1' : '0';
    return hasNonChemicalChecked;
  }

  function restoreChecklistVisibility() {
    pendingRestore.forEach((item) => {
      const priorDisplay = item.dataset.priorDisplay;
      if (priorDisplay === '__none__') {
        item.style.removeProperty('display');
      } else {
        item.style.display = priorDisplay;
      }
      delete item.dataset.priorDisplay;
    });

    pendingRestore = [];

    if (checklistSection.dataset.priorDisplay !== undefined) {
      const sectionPriorDisplay = checklistSection.dataset.priorDisplay;
      if (sectionPriorDisplay === '__none__') {
        checklistSection.style.removeProperty('display');
      } else {
        checklistSection.style.display = sectionPriorDisplay;
      }
      delete checklistSection.dataset.priorDisplay;
    }
  }

  function hideUncheckedForEmailCapture() {
    updateChecklistState();
    restoreChecklistVisibility();

    checklistSection.dataset.priorDisplay = checklistSection.style.display || '__none__';
    checklistSection.style.display = 'none';
  }

  checklist.querySelectorAll('input[type="checkbox"]').forEach((box) => {
    box.addEventListener('change', updateChecklistState);
  });

  window.addEventListener('beforeprint', updateChecklistState);
  window.addEventListener('beforeprint', () => {
    applyConditionSummaryOutputLayout();
    priorDisplayForPrint = checklistSection.style.display || '__none__';
    checklistSection.style.display = 'none';
  });
  window.addEventListener('afterprint', () => {
    if (priorDisplayForPrint === '__none__') {
      checklistSection.style.removeProperty('display');
    } else if (priorDisplayForPrint !== null) {
      checklistSection.style.display = priorDisplayForPrint;
    }
    priorDisplayForPrint = null;
    restoreConditionSummaryLayout();
  });

  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      applyConditionSummaryOutputLayout();
      hideUncheckedForEmailCapture();

      if (restoreTimer) clearTimeout(restoreTimer);
      restoreTimer = setTimeout(() => {
        restoreChecklistVisibility();
      }, 45000);
    }, true);
  }

  if (emailModalOverlay) {
    const observer = new MutationObserver(() => {
      if (emailModalOverlay.hidden) {
        restoreChecklistVisibility();
        if (priorDisplayForPrint === '__none__') {
          checklistSection.style.removeProperty('display');
        } else if (priorDisplayForPrint !== null) {
          checklistSection.style.display = priorDisplayForPrint;
        }
        priorDisplayForPrint = null;
        restoreConditionSummaryLayout();
        if (restoreTimer) {
          clearTimeout(restoreTimer);
          restoreTimer = null;
        }
      }
    });

    observer.observe(emailModalOverlay, {
      attributes: true,
      attributeFilter: ['hidden']
    });
  }

  updateChecklistState();
})();
