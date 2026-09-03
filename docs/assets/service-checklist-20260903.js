(() => {
  const checklistSection = document.getElementById('report-service-checklist');
  const checklist = document.getElementById('r-service-checklist');
  const sendBtn = document.getElementById('send-report-email');
  const emailModalOverlay = document.getElementById('email-modal-overlay');

  if (!checklistSection || !checklist) return;

  let restoreTimer = null;
  let pendingRestore = [];

  function updateChecklistState() {
    let hasChecked = false;

    checklist.querySelectorAll('.service-check-item').forEach((item) => {
      const box = item.querySelector('input[type="checkbox"]');
      const checked = Boolean(box?.checked);
      item.classList.toggle('is-checked', checked);
      if (checked) hasChecked = true;
    });

    checklistSection.dataset.hasChecked = hasChecked ? '1' : '0';
    return hasChecked;
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
    const hasChecked = updateChecklistState();
    restoreChecklistVisibility();

    checklistSection.dataset.priorDisplay = checklistSection.style.display || '__none__';
    if (!hasChecked) {
      checklistSection.style.display = 'none';
      return;
    }

    checklist.querySelectorAll('.service-check-item').forEach((item) => {
      if (item.classList.contains('is-checked')) return;
      item.dataset.priorDisplay = item.style.display || '__none__';
      item.style.display = 'none';
      pendingRestore.push(item);
    });
  }

  checklist.querySelectorAll('input[type="checkbox"]').forEach((box) => {
    box.addEventListener('change', updateChecklistState);
  });

  window.addEventListener('beforeprint', updateChecklistState);

  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
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
