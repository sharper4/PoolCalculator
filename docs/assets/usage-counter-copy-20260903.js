(function () {
  function applyUsageCounterLabelPatch() {
    const counter = document.getElementById('usage-count');
    if (!counter) return;

    counter.alt = "Fun Fact: This calculator's total number of usage is:";
    counter.src = 'https://hits.sh/sharper4.github.io/PoolCalculator.svg?style=flat&label=Fun%20Fact%3A%20This%20calculator%27s%20total%20number%20of%20usage%20is%3A&labelColor=0e4f97&color=0e4f97';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyUsageCounterLabelPatch, { once: true });
  } else {
    applyUsageCounterLabelPatch();
  }
})();
