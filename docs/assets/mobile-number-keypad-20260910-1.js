(() => {
  function applyMobileNumericInputMode() {
    const numberInputs = [
      ...document.querySelectorAll('#size, #temp'),
      ...document.querySelectorAll('#chemistry-targets-panel input[type="number"]')
    ];

    numberInputs.forEach((input) => {
      const stepValue = String(input.getAttribute('step') || '1');
      const allowDecimal = stepValue.includes('.') || stepValue === 'any';
      input.setAttribute('inputmode', allowDecimal ? 'decimal' : 'numeric');
      input.setAttribute('pattern', allowDecimal ? '[0-9]*[.,]?[0-9]*' : '[0-9]*');
      input.setAttribute('enterkeyhint', 'done');
      input.setAttribute('autocorrect', 'off');
      input.setAttribute('autocomplete', 'off');
      input.setAttribute('spellcheck', 'false');
    });
  }

  function init() {
    applyMobileNumericInputMode();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
