(() => {
  function refreshServiceChecklistState() {
    const checklist = document.getElementById('r-service-checklist');
    const section = document.getElementById('report-service-checklist');
    if (!checklist || !section) return;

    let hasNonChemicalChecked = false;
    checklist.querySelectorAll('.service-check-item').forEach((item) => {
      const box = item.querySelector('input[type="checkbox"]');
      const checked = Boolean(box?.checked);
      item.classList.toggle('is-checked', checked);
      const isChemicalBalanced = item.dataset.chemicalBalanced === '1';
      if (checked && !isChemicalBalanced) hasNonChemicalChecked = true;
    });

    section.dataset.hasChecked = hasNonChemicalChecked ? '1' : '0';
  }

  function stripRecalcListenersFromServiceChecklist() {
    const checklist = document.getElementById('r-service-checklist');
    if (!checklist) return;

    const boxes = Array.from(checklist.querySelectorAll('.service-check-item input[type="checkbox"]'));
    boxes.forEach((box) => {
      const replacement = box.cloneNode(true);
      replacement.checked = box.checked;
      box.replaceWith(replacement);
    });

    checklist.querySelectorAll('.service-check-item input[type="checkbox"]').forEach((box) => {
      box.addEventListener('change', () => {
        refreshServiceChecklistState();
      });
    });

    refreshServiceChecklistState();
  }

  stripRecalcListenersFromServiceChecklist();
})();
