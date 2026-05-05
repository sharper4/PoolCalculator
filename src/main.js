const refs = {
  units: document.getElementById('units'),
  size: document.getElementById('size'),
  sizeUnit: document.getElementById('size-unit'),
  temp: document.getElementById('temp'),
  tempUnit: document.getElementById('temp-unit'),

  customerName: document.getElementById('customer-name'),
  customerAddress: document.getElementById('customer-address'),
  technicianName: document.getElementById('technician-name'),
  tcNow: document.getElementById('tc-now'),
  phosphatesNow: document.getElementById('phosphates-now'),
  weatherConditions: document.getElementById('weather-conditions'),

  fcFrom: document.getElementById('fc-from'),
  fcTo: document.getElementById('fc-to'),
  fcCard: document.querySelector('.chem-card.fc'),
  fcTargetRange: document.getElementById('fc-target-range'),
  fcAutoTarget: document.getElementById('fc-auto-target'),
  fcPercent: document.getElementById('fc-percent'),
  fcJug: document.getElementById('fc-jug'),
  fcPop: document.getElementById('fc-pop'),

  phFrom: document.getElementById('ph-from'),
  phTo: document.getElementById('ph-to'),
  phCard: document.querySelector('.chem-card.ph'),
  phTargetRange: document.getElementById('ph-target-range'),
  maPop: document.getElementById('ma-pop'),

  taFrom: document.getElementById('ta-from'),
  taTo: document.getElementById('ta-to'),
  taCard: document.querySelector('.chem-card.ta'),
  taTargetRange: document.getElementById('ta-target-range'),

  chFrom: document.getElementById('ch-from'),
  chTo: document.getElementById('ch-to'),
  chCard: document.querySelector('.chem-card.ch'),
  chTargetRange: document.getElementById('ch-target-range'),
  chFill: document.getElementById('ch-fill'),

  cyaFrom: document.getElementById('cya-from'),
  cyaTo: document.getElementById('cya-to'),
  cyaCard: document.querySelector('.chem-card.cya'),
  cyaTargetRange: document.getElementById('cya-target-range'),

  saltFrom: document.getElementById('salt-from'),
  saltTo: document.getElementById('salt-to'),
  saltCard: document.querySelector('.chem-card.salt'),
  saltTargetRange: document.getElementById('salt-target-range'),

  borFrom: document.getElementById('bor-from'),
  borTo: document.getElementById('bor-to'),
  borCard: document.querySelector('.chem-card.bor'),
  borTargetRange: document.getElementById('bor-target-range'),
  borPop: document.getElementById('bor-pop'),

  fromPop: document.getElementById('from-pop'),
  chlorinePop: document.getElementById('chlorine-pop'),
  surfacePop: document.getElementById('surface-pop'),

  szWid: document.getElementById('sz-wid'),
  szLen: document.getElementById('sz-len'),
  szDeep: document.getElementById('sz-deep'),
  szPop: document.getElementById('sz-pop'),

  effOz: document.getElementById('eff-oz'),
  effUnit: document.getElementById('eff-unit'),
  effPop: document.getElementById('eff-pop'),

  fcResult: document.getElementById('fc-result'),
  phResult: document.getElementById('ph-result'),
  taResult: document.getElementById('ta-result'),
  chResult: document.getElementById('ch-result'),
  cyaResult: document.getElementById('cya-result'),
  saltResult: document.getElementById('salt-result'),
  borResult: document.getElementById('bor-result'),
  csiResult: document.getElementById('csi-result'),
  goalResult: document.getElementById('goal-result'),
  szResult: document.getElementById('sz-result'),
  effResult: document.getElementById('eff-result'),

  openReport: document.getElementById('open-report'),
  backToApp: document.getElementById('back-to-app'),
  printReport: document.getElementById('print-report'),
  reportView: document.getElementById('report-view'),

  rCustomer: document.getElementById('r-customer'),
  rAddress: document.getElementById('r-address'),
  rDate: document.getElementById('r-date'),
  rTechnician: document.getElementById('r-technician'),
  rWeather: document.getElementById('r-weather'),
  rFc: document.getElementById('r-fc'),
  rPh: document.getElementById('r-ph'),
  rTa: document.getElementById('r-ta'),
  rCh: document.getElementById('r-ch'),
  rCya: document.getElementById('r-cya'),
  rPhos: document.getElementById('r-phos'),
  rSalt: document.getElementById('r-salt'),
  idealFc: document.getElementById('ideal-fc'),
  idealPh: document.getElementById('ideal-ph'),
  idealTa: document.getElementById('ideal-ta'),
  idealCh: document.getElementById('ideal-ch'),
  idealCya: document.getElementById('ideal-cya'),
  idealPhos: document.getElementById('ideal-phos'),
  idealSalt: document.getElementById('ideal-salt'),
  sFc: document.getElementById('s-fc'),
  sPh: document.getElementById('s-ph'),
  sTa: document.getElementById('s-ta'),
  sCh: document.getElementById('s-ch'),
  sCya: document.getElementById('s-cya'),
  sPhos: document.getElementById('s-phos'),
  sSalt: document.getElementById('s-salt'),
  rPlanFc: document.getElementById('r-plan-fc'),
  rPlanBalance: document.getElementById('r-plan-balance'),
  rPlanStructure: document.getElementById('r-plan-structure'),
  rPlanPrevent: document.getElementById('r-plan-prevent'),
  rChemList: document.getElementById('r-chem-list'),
  issueLowChlorine: document.getElementById('issue-low-chlorine'),
  statusClear: document.getElementById('status-clear'),
  statusMinor: document.getElementById('status-minor'),
  statusImmediate: document.getElementById('status-immediate'),
  issueHighPh: document.getElementById('issue-high-ph'),
  issueHighCya: document.getElementById('issue-high-cya'),
  issueAlgae: document.getElementById('issue-algae'),
  issuePhosphates: document.getElementById('issue-phosphates')
};

const data = {
  fcJugUS: ['96 oz', '128 oz', '174 oz', '182 oz'],
  fcJugMetric: ['2 liter', '2.85 liter', '3.6 liter', '5 liter'],
  fcPop: ['trichlor', 'dichlor', 'cal-hypo 48%', 'cal-hypo 53%', 'cal-hypo 65%', 'cal-hypo 73%', 'lithium-hypo', 'chlorine gas'],
  maPop: ['15.7% - 10 deg Baume', '28.3% - 18 deg Baume', '31.45% - 20 deg Baume', '34.6% - 22 deg Baume', '14.5%', '29%'],
  borPop: ['borax', 'boric acid', 'tetraborate pentahydrate'],
  fromPop: ['Not Setup', 'Traditional Pool', 'TroubleFreePool.com', 'Traditional Spa'],
  chlorinePop: ['Not Setup', 'Bleach', 'SWG', 'Trichlor'],
  surfacePop: ['Not Setup', 'Plaster', 'Vinyl', 'Fiberglass'],
  szPop: ['rectangular', 'oval', 'round (ignores length)'],
  effPop: [
    '5.25% bleach',
    '6% bleach',
    '10% bleach',
    '12.5% bleach',
    'trichlor',
    'dichlor',
    '48% cal-hypo',
    '53% cal-hypo',
    '65% cal-hypo',
    '73% cal-hypo',
    'lithium hypochlorite',
    'chlorine gas',
    '15.7% muriatic acid',
    '31.45% muriatic acid',
    'dry acid',
    'washing soda or soda ash',
    'borax (20 Mule Team)',
    'sodium tetraborate pentahydrate',
    'caustic soda (lye)',
    'baking soda',
    'calcium chloride',
    'calcium chloride dihydrate',
    'stabilizer',
    'liquid stabilizer',
    'salt'
  ]
};

const effUnits = [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 2];

let oldUnit = 0;
let suppressTargetOverrideCapture = false;
const manualTargetOverride = {
  fc: false,
  ta: false,
  ch: false,
  cya: false
};

function n(el, fallback = 0) {
  const v = Number.parseFloat(el.value);
  return Number.isFinite(v) ? v : fallback;
}

function i(el, fallback = 0) {
  const v = Number.parseInt(el.value, 10);
  return Number.isFinite(v) ? v : fallback;
}

function round2(x) {
  return Math.round(x * 100) / 100;
}

function setOptions(select, options) {
  select.innerHTML = '';
  options.forEach((label, idx) => {
    const opt = document.createElement('option');
    opt.value = String(idx);
    opt.textContent = label;
    select.appendChild(opt);
  });
}

function formatNum(value) {
  if (!Number.isFinite(value)) return '0';
  return value >= 10 ? String(Math.round(value)) : String(round2(value));
}

function putWeight(oz) {
  if (Number(n(refs.units)) === 1) return `${Math.floor(oz * 28.3495 + 0.5)} g`;
  return `${formatNum(oz)} oz`;
}

function putLbs(oz) {
  if (Number(n(refs.units)) === 1) return `${Math.floor(oz * 0.0283495 + 0.5)} kg`;
  return `${Math.floor(oz / 16 + 0.5)} lbs`;
}

function putVolume(oz) {
  const unit = Number(n(refs.units));
  if (unit === 1) return `${Math.floor(oz * 29.5735 + 0.5)} ml`;
  if (unit === 2) oz *= 1.04084;
  return `${formatNum(oz)} oz`;
}

function putGallons(gal) {
  const unit = Number(n(refs.units));
  if (unit === 1) return `${Math.floor((gal / 7.48052) * 10 + 0.5) * 100} liters`;
  if (unit === 2) gal *= 0.832674;
  if (gal < 1000) return `${Math.floor(gal / 10 + 0.5) * 10} gallons`;
  return `${Math.floor(gal / 100 + 0.5) * 100} gallons`;
}

function getGallons() {
  const unit = Number(n(refs.units));
  const size = n(refs.size);
  if (unit === 1) return size / 3.78541;
  if (unit === 2) return size * 1.20095;
  return size;
}

function statusVolume(oz) {
  if (oz <= 0) return 'None';
  const unit = Number(n(refs.units));
  if (unit === 1) return `${round2((oz * 29.5735) / 1000)} liters`;
  if (unit === 2) oz *= 1.04084;

  const gallons = Math.floor(oz / 128);
  const remAfterGal = oz - gallons * 128;
  const quarts = Math.floor(remAfterGal / 32);
  const remAfterQt = remAfterGal - quarts * 32;
  const cups = Math.floor(remAfterQt / 8);
  const rem = round2(remAfterQt - cups * 8);

  const parts = [];
  if (gallons) parts.push(`${gallons} gallon${gallons > 1 ? 's' : ''}`);
  if (quarts) parts.push(`${quarts} quart${quarts > 1 ? 's' : ''}`);
  if (cups) parts.push(`${cups} cup${cups > 1 ? 's' : ''}`);
  if (rem > 0) parts.push(`${rem} oz`);
  return parts.join(' ');
}

function statusWeight(oz) {
  if (oz <= 0) return 'None';
  const unit = Number(n(refs.units));
  if (unit === 1) return `${round2((oz * 28.3495) / 1000)} kg`;
  const lbs = Math.floor(oz / 16);
  const rem = round2(oz - lbs * 16);
  if (lbs <= 0) return `${rem} oz`;
  if (rem <= 0) return `${lbs} lb${lbs > 1 ? 's' : ''}`;
  return `${lbs} lb${lbs > 1 ? 's' : ''} ${rem} oz`;
}

function statusBleach(oz) {
  const jugOz = [96, 128, 174, 182];
  const jugLiter = [2000, 2850, 3600, 5000];
  const idx = Number(n(refs.fcJug));
  const unit = Number(n(refs.units));
  const base = statusVolume(oz);

  if (unit === 1) {
    const jug = jugLiter[idx];
    const ml = oz * 29.5735;
    if (ml >= jug) {
      const jugs = round2(ml / jug);
      return `${base} or ${jugs} (${jug / 1000} liter) jugs`;
    }
    return base;
  }

  const jug = jugOz[idx];
  if (oz >= jug) {
    const jugs = round2(oz / jug);
    return `${base} or ${jugs} (${jug} oz) jugs`;
  }
  return base;
}

function statusBags(lbs) {
  if (lbs <= 0) return 'None';
  const unit = Number(n(refs.units));
  if (unit === 1) {
    const bags = Math.floor(lbs / 25);
    const rem = Math.max(0, lbs - bags * 25);
    if (bags <= 0) return `${lbs} kg`;
    return rem > 0 ? `${bags} (25 kg) bags and ${rem} kg` : `${bags} (25 kg) bags`;
  }

  const bags = Math.floor(lbs / 40);
  const rem = Math.max(0, lbs - bags * 40);
  if (bags <= 0) return `${lbs} lbs`;
  return rem > 0 ? `${bags} (40 lb) bags and ${rem} lbs` : `${bags} (40 lb) bags`;
}

function statusMark(value, min, max) {
  if (!Number.isFinite(value)) return '--';
  if (value < min || value > max) return 'Needs attention';
  return 'OK';
}

function cleanResult(text) {
  return text.replace(/\s+/g, ' ').trim();
}

function setChemList(items) {
  const checkedMap = new Map();
  refs.rChemList.querySelectorAll('li').forEach((li) => {
    const labelText = li.querySelector('span')?.textContent?.trim();
    const checked = li.querySelector('input[type="checkbox"]')?.checked;
    if (labelText) checkedMap.set(labelText, Boolean(checked));
  });

  refs.rChemList.innerHTML = '';
  items.forEach((item) => {
    const li = document.createElement('li');
    const label = document.createElement('label');
    const box = document.createElement('input');
    const text = document.createElement('span');
    box.type = 'checkbox';
    box.checked = checkedMap.get(item) === true;
    text.textContent = item;
    label.append(box, text);
    li.appendChild(label);
    refs.rChemList.appendChild(li);
  });
}

function clearChemicalChecks() {
  refs.rChemList.querySelectorAll('input[type="checkbox"]').forEach((box) => {
    box.checked = false;
  });
}

function writeTargetValue(inputEl, value) {
  suppressTargetOverrideCapture = true;
  inputEl.value = String(value);
  suppressTargetOverrideCapture = false;
}

function syncAttentionRow(statusCell) {
  const row = statusCell?.parentElement;
  if (!row) return;
  row.classList.toggle('needs-attention-row', statusCell.textContent === 'Needs attention');
}

function setRangeState(card, value, min, max) {
  if (!card || !Number.isFinite(value) || !Number.isFinite(min) || !Number.isFinite(max)) return;
  const inRange = value >= min && value <= max;
  card.classList.toggle('within-range', inRange);
  card.classList.toggle('out-of-range', !inRange);
}

function parseRange(text, fallbackMin, fallbackMax) {
  const match = text.match(/(\d+(?:\.\d+)?)\s*(?:to|-)+\s*(\d+(?:\.\d+)?)/i);
  if (match) {
    return [Number(match[1]), Number(match[2])];
  }
  const single = text.match(/(\d+(?:\.\d+)?)/);
  if (single) {
    const value = Number(single[1]);
    return [value, value];
  }
  return [fallbackMin, fallbackMax];
}

function exactTarget(value, unit = '') {
  return `${value}${unit}`.trim();
}

function updateReport() {
  const today = new Date();
  const dateText = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  refs.rCustomer.textContent = refs.customerName.value || '__________________________';
  refs.rAddress.textContent = refs.customerAddress.value || '__________________________';
  refs.rDate.textContent = dateText;
  refs.rTechnician.textContent = refs.technicianName.value || 'Scott Harper';
  refs.rWeather.textContent = refs.weatherConditions.value || 'Unavailable';

  const fc = n(refs.fcFrom);
  const ph = n(refs.phFrom);
  const ta = n(refs.taFrom);
  const ch = n(refs.chFrom);
  const cya = n(refs.cyaFrom);
  const salt = n(refs.saltFrom);

  refs.rFc.textContent = `${round2(fc)} ppm`;
  refs.rPh.textContent = `${round2(ph)}`;
  refs.rTa.textContent = `${Math.round(ta)} ppm`;
  refs.rCh.textContent = `${Math.round(ch)} ppm`;
  refs.rCya.textContent = `${Math.round(cya)} ppm`;
  refs.rSalt.textContent = `${Math.round(salt)} ppm`;

  refs.idealFc.textContent = exactTarget(round2(n(refs.fcTo)), ' ppm');
  refs.idealPh.textContent = exactTarget(round2(n(refs.phTo)));
  refs.idealTa.textContent = exactTarget(Math.round(n(refs.taTo)), ' ppm');
  refs.idealCh.textContent = exactTarget(Math.round(n(refs.chTo)), ' ppm');
  refs.idealCya.textContent = exactTarget(Math.round(n(refs.cyaTo)), ' ppm');
  refs.idealSalt.textContent = exactTarget(Math.round(n(refs.saltTo)), ' ppm');

  const [fcMin, fcMax] = parseRange(refs.fcTargetRange.textContent, n(refs.fcTo), n(refs.fcTo));
  const [phMin, phMax] = parseRange(refs.phTargetRange.textContent, n(refs.phTo), n(refs.phTo));
  const [taMin, taMax] = parseRange(refs.taTargetRange.textContent, n(refs.taTo), n(refs.taTo));
  const [chMin, chMax] = parseRange(refs.chTargetRange.textContent, n(refs.chTo), n(refs.chTo));
  const [cyaMin, cyaMax] = parseRange(refs.cyaTargetRange.textContent, n(refs.cyaTo), n(refs.cyaTo));
  const [saltMin, saltMax] = parseRange(refs.saltTargetRange.textContent, n(refs.saltTo), n(refs.saltTo));
  const [borMin, borMax] = parseRange(refs.borTargetRange.textContent, n(refs.borTo), n(refs.borTo));

  refs.sFc.textContent = statusMark(fc, fcMin, fcMax);
  refs.sPh.textContent = statusMark(ph, phMin, phMax);
  refs.sTa.textContent = statusMark(ta, taMin, taMax);
  refs.sCh.textContent = statusMark(ch, chMin, chMax);
  refs.sCya.textContent = statusMark(cya, cyaMin, cyaMax);
  refs.sSalt.textContent = salt > 0 || n(refs.saltTo) > 0 ? statusMark(salt, saltMin, saltMax) : 'N/A';

  [refs.sFc, refs.sPh, refs.sTa, refs.sCh, refs.sCya, refs.sSalt].forEach(syncAttentionRow);

  setRangeState(refs.fcCard, fc, fcMin, fcMax);
  setRangeState(refs.phCard, ph, phMin, phMax);
  setRangeState(refs.taCard, ta, taMin, taMax);
  setRangeState(refs.chCard, ch, chMin, chMax);
  setRangeState(refs.cyaCard, cya, cyaMin, cyaMax);
  setRangeState(refs.saltCard, salt, saltMin, saltMax);
  setRangeState(refs.borCard, n(refs.borFrom), borMin, borMax);

  refs.issueLowChlorine.checked = fc < fcMin;
  refs.issueHighPh.checked = ph > phMax;
  refs.issueHighCya.checked = cya > cyaMax;
  refs.issueAlgae.checked = fc < fcMin;
  refs.issuePhosphates.checked = false;

  const outCount = [
    refs.sFc.textContent,
    refs.sPh.textContent,
    refs.sTa.textContent,
    refs.sCh.textContent,
    refs.sCya.textContent,
    refs.sSalt.textContent
  ].filter((state) => state === 'Needs attention').length;

  refs.statusClear.checked = outCount === 0;
  refs.statusMinor.checked = outCount > 0 && outCount < 3;
  refs.statusImmediate.checked = outCount >= 3;

  const fcPlan = cleanResult(refs.fcResult.textContent);
  const phPlan = cleanResult(refs.phResult.textContent);
  const taPlan = cleanResult(refs.taResult.textContent);
  const chPlan = cleanResult(refs.chResult.textContent);
  const cyaPlan = cleanResult(refs.cyaResult.textContent);
  const borPlan = cleanResult(refs.borResult.textContent);

  refs.rPlanFc.textContent = fcPlan || 'No adjustment required.';
  refs.rPlanBalance.textContent = `${phPlan} ${taPlan}`.trim() || 'No adjustment required.';
  refs.rPlanStructure.textContent = `${cyaPlan} ${chPlan}`.trim() || 'No adjustment required.';
  refs.rPlanPrevent.textContent = borPlan || 'Brush, circulate, and retest before next visit.';

  const applied = [];
  if (!fcPlan.startsWith('No FC')) applied.push(`FC: ${fcPlan}`);
  if (!phPlan.startsWith('No pH')) applied.push(`pH: ${phPlan}`);
  if (!taPlan.startsWith('No TA')) applied.push(`TA: ${taPlan}`);
  if (!chPlan.startsWith('No CH')) applied.push(`CH: ${chPlan}`);
  if (!cyaPlan.startsWith('No CYA')) applied.push(`CYA: ${cyaPlan}`);
  if (!cleanResult(refs.saltResult.textContent).startsWith('No salt')) {
    applied.push(`Salt: ${cleanResult(refs.saltResult.textContent)}`);
  }
  if (!borPlan.startsWith('No borate')) applied.push(`Borate: ${borPlan}`);

  if (!applied.length) {
    applied.push('No chemicals required today; values already within target range.');
  }
  setChemList(applied.slice(0, 5));
}

function setReportMode(enabled) {
  document.body.classList.toggle('report-mode', enabled);
  refs.reportView.hidden = !enabled;
  if (enabled) updateReport();
}

async function loadWeather() {
  try {
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=33.2148&longitude=-97.1331&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=mph';
    const response = await fetch(url);
    if (!response.ok) throw new Error('Weather fetch failed');
    const payload = await response.json();
    const current = payload.current;
    const code = Number(current.weather_code);
    let label = 'Clear';
    if (code >= 1 && code <= 3) label = 'Partly Cloudy';
    else if (code >= 45 && code <= 48) label = 'Fog';
    else if (code >= 51 && code <= 67) label = 'Rain';
    else if (code >= 71 && code <= 77) label = 'Snow';
    else if (code >= 80 && code <= 82) label = 'Rain Showers';
    else if (code >= 95) label = 'Thunderstorm';

    refs.weatherConditions.value = `${label}, ${Math.round(current.temperature_2m)}F (feels ${Math.round(current.apparent_temperature)}F), wind ${Math.round(current.wind_speed_10m)} mph`;
  } catch (err) {
    refs.weatherConditions.value = 'Unable to load live weather automatically';
  }
}

function calcFC() {
  const ozmul = [6854.95, 4149.03, 3565.44, 3936.84, 4828.12, 5422.41, 2637.5, 7489.4];
  const vol = ['X', 0.9351, 0.9352, 0.9352, 0.9352, 0.9352, 0.978, 'X'];
  const from = n(refs.fcFrom);
  const to = n(refs.fcTo);
  const percent = Math.max(0.1, n(refs.fcPercent, 6));
  const alt = Number(n(refs.fcPop));

  if (from >= to) {
    refs.fcResult.innerHTML = 'No FC increase required.';
    return;
  }

  const delta = to - from;
  const bleachOz = (delta * getGallons()) / 482.202 * 6 / percent;
  const altOz = delta * getGallons() / ozmul[alt];
  const altVol = vol[alt] === 'X' ? 'unknown' : putVolume(altOz * vol[alt]);

  refs.fcResult.innerHTML = [
    `Add ${putVolume(bleachOz)} of ${percent}% bleach (${statusBleach(bleachOz)}).`,
    `Or add ${putWeight(altOz)} by weight or ${altVol} by volume of ${data.fcPop[alt]}.`,
    'Note: Dichlor and trichlor add CYA and lower pH. Cal-hypo adds CH.'
  ].join('<br>');
}

function calcPH() {
  const mamul = [2.0, 1.11111, 1.0, 0.909091, 2.16897, 1.08448];

  const from = n(refs.phFrom, 7.5);
  const to = n(refs.phTo, 7.5);
  const ta = i(refs.taFrom, 100);
  const bor = i(refs.borFrom, 0);
  const ma = Number(n(refs.maPop));

  let delta = (to - from) * getGallons();
  const temp = (from + to) / 2;
  const adj = (192.1626 + -60.1221 * temp + 6.0752 * temp * temp + -0.1943 * temp * temp * temp) * (ta + 13.91) / 114.6;
  let extra = (-5.476259 + 2.414292 * temp + -0.355882 * temp * temp + 0.01755 * temp * temp * temp) * bor;
  extra *= delta;
  delta *= adj;

  const lines = [];
  if (from < to) {
    let up = delta / 218.68 + extra / 218.68;
    lines.push(`Add ${putWeight(up)} by weight or ${putVolume(up * 0.8715)} by volume of washing soda/soda ash.`);
    up = delta / 110.05 + extra / 110.05;
    lines.push(`Or add ${putWeight(up)} by weight or ${putVolume(up * 0.9586)} by volume of borax.`);
  }

  if (from > to) {
    let down = delta / -240.15 * mamul[ma] + extra / -240.15 * mamul[ma];
    lines.push(`Add ${putVolume(down)} of ${data.maPop[ma]} muriatic acid.`);
    down = delta / -178.66 + extra / -178.66;
    lines.push(`Or add ${putWeight(down)} by weight or ${putVolume(down * 0.6657)} by volume of dry acid.`);
  }

  refs.phResult.innerHTML = lines.length ? lines.join('<br>') : 'No pH adjustment required.';
}

function calcTA() {
  const from = i(refs.taFrom, 100);
  const to = i(refs.taTo, 100);
  if (from >= to) {
    refs.taResult.innerHTML = 'No TA increase required. Lower TA by reducing pH to 7.0-7.2 and aerating.';
    return;
  }

  const amount = (to - from) * getGallons() / 4259.15;
  refs.taResult.innerHTML = `Add ${putWeight(amount)} by weight or ${putVolume(amount * 0.7988)} by volume of baking soda.`;
}

function calcCH() {
  const from = i(refs.chFrom, 260);
  const to = i(refs.chTo, 260);
  const fill = i(refs.chFill, 0);

  if (from < to) {
    let amount = (to - from) * getGallons() / 6754.11;
    const line1 = `Add ${putWeight(amount)} by weight or ${putVolume(amount * 0.7988)} by volume of calcium chloride.`;
    amount = (to - from) * getGallons() / 5098.82;
    const line2 = `Or add ${putWeight(amount)} by weight or ${putVolume(amount * 1.148)} by volume of calcium chloride dihydrate.`;
    refs.chResult.innerHTML = `${line1}<br>${line2}`;
    return;
  }

  if (from > to) {
    let replacement = "can't";
    if (to >= fill) {
      replacement = `${Math.floor(100 - ((to - fill) / (from - fill)) * 100 + 0.5)}%`;
    }
    refs.chResult.innerHTML = `To lower CH, replace ${replacement} of the water with fill water at CH ${fill}.`;
    return;
  }

  refs.chResult.innerHTML = 'No CH adjustment required.';
}

function calcCYA() {
  const from = i(refs.cyaFrom, 40);
  const to = i(refs.cyaTo, 40);

  if (from < to) {
    let amount = (to - from) * getGallons() / 7489.51;
    const line1 = `Add ${putWeight(amount)} by weight or ${putVolume(amount * 1.042)} by volume of stabilizer.`;
    amount = (to - from) * getGallons() / 2890;
    const line2 = `Or add ${putVolume(amount)} of liquid stabilizer.`;
    refs.cyaResult.innerHTML = `${line1}<br>${line2}`;
    return;
  }

  if (from > to) {
    const replacement = `${Math.floor(100 - (to / from) * 100 + 0.5)}%`;
    refs.cyaResult.innerHTML = `To lower CYA, replace ${replacement} of the water with new water.`;
    return;
  }

  refs.cyaResult.innerHTML = 'No CYA adjustment required.';
}

function calcSalt() {
  const from = i(refs.saltFrom, 0);
  const to = i(refs.saltTo, 0);

  if (from < to) {
    const amount = (to - from) * getGallons() / 7468.64;
    const lbs = Math.floor(amount / 16 + 0.5);
    refs.saltResult.innerHTML = `Add ${putLbs(amount)} of salt (${statusBags(lbs)}).`;
    return;
  }

  if (from > to) {
    const replacement = `${Math.floor(100 - (to / from) * 100 + 0.5)}%`;
    refs.saltResult.innerHTML = `To lower salt, replace ${replacement} of the water.`;
    return;
  }

  refs.saltResult.innerHTML = 'No salt adjustment required.';
}

function calcBorate() {
  const bormul = [849.271, 1309.52, 1111.69];
  const from = i(refs.borFrom, 0);
  const to = i(refs.borTo, 0);
  const type = Number(n(refs.borPop));

  if (from < to) {
    const amount = (to - from) * getGallons() / bormul[type];
    let byVol;
    let acid;
    if (type === 1) {
      byVol = putVolume(amount * 1.075);
      acid = '0';
    } else if (type === 2) {
      byVol = putVolume(amount * 0.5296);
      acid = putVolume(amount * 0.624);
    } else {
      byVol = putVolume(amount * 0.9586);
      acid = putVolume(amount * 0.4765);
    }
    refs.borResult.innerHTML = [
      `Add ${putWeight(amount)} by weight or ${byVol} by volume of ${data.borPop[type]}.`,
      `Add ${acid} of 31.45% muriatic acid to compensate for pH rise.`
    ].join('<br>');
    return;
  }

  if (from > to) {
    const replacement = `${Math.floor(100 - (to / from) * 100 + 0.5)}%`;
    refs.borResult.innerHTML = `To lower borate, replace ${replacement} of the water.`;
    return;
  }

  refs.borResult.innerHTML = 'No borate adjustment required.';
}

function csi(ph, ta, ch, cya, salt, borate, temp) {
  if (ph < 6 || ph > 9 || Number.isNaN(ph)) return 'PH Err';

  let t = Number(temp);
  if (Number(n(refs.units)) !== 1) {
    t = (t - 32) * 5 / 9;
  }

  const carbAlk = ta - 0.38772 * cya / (1 + Math.pow(10, 6.83 - ph)) - 4.63 * borate / (1 + Math.pow(10, 9.11 - ph));
  if (carbAlk <= 0 || ch <= 0) return 'Invalid';

  let extraNaCl = salt - 1.1678 * ch;
  if (extraNaCl < 0) extraNaCl = 0;
  const ionic = (1.5 * ch + 1 * ta) / 50045 + extraNaCl / 58440;

  const csiValue = ph - 11.677 + Math.log(ch) / Math.LN10 + Math.log(carbAlk) / Math.LN10 - 2.56 * Math.sqrt(ionic) / (1 + 1.65 * Math.sqrt(ionic)) - 1412.5 / (t + 273.15) + 4.7375;

  return round2(csiValue);
}

function statusCSI(value) {
  const x = Number(value);
  if (!Number.isFinite(x)) return 'Invalid inputs';
  if (x <= -0.6) return 'Corrosion of plaster likely';
  if (x <= -0.3) return 'Potentially corrosive to plaster';
  if (x < 0.3) return 'Balanced';
  if (x < 0.6) return 'Potentially scaling';
  return 'Scaling likely';
}

function calcSuggested() {
  const cya = i(refs.cyaFrom, 0);
  const swg = Math.max(1, Math.floor(cya * 0.045 + 0.7));
  const min = Math.max(1, Math.floor(cya * 0.075 + 0.7));
  const targ = Math.max(3, Math.floor(cya / 10 + 3.5));
  const shock = Math.max(10, Math.floor(cya / 6 + 8.5));
  const mustard = Math.max(12, Math.floor(cya / 2 + 4.5));

  const from = Number(n(refs.fromPop));
  const chlorine = Number(n(refs.chlorinePop));
  const surface = Number(n(refs.surfacePop));

  let fcGoal = 'Not Setup';
  if (from === 3) fcGoal = '1 to 6';
  else if (from !== 0) fcGoal = `${chlorine === 2 ? swg : min} to ${targ}`;

  let phGoal = 'Not Setup';
  let taGoal = 'Not Setup';
  let chGoal = 'Not Setup';
  let cyaGoal = 'Not Setup';
  let phRange = null;
  let taRange = null;
  let chRange = null;
  let cyaRange = null;

  if (from === 1) {
    phGoal = '7.2 to 7.8';
    taGoal = '80 to 120';
    chGoal = '200 to 400';
    cyaGoal = '30 to 80';
    phRange = [7.2, 7.8];
    taRange = [80, 120];
    chRange = [200, 400];
    cyaRange = [30, 80];
  } else if (from === 2 && chlorine !== 0 && surface !== 0) {
    phGoal = '7.5 to 7.8';
    taGoal = chlorine === 1 ? '70 to 90+' : chlorine === 2 ? '60 to 80' : '100 to 120+';
    chGoal = surface === 1 ? '250 to 350' : surface === 2 ? '50 to 300' : '220 to 320';
    cyaGoal = chlorine === 2 ? '70 to 80' : '30 to 50';
    phRange = [7.5, 7.8];
    taRange = chlorine === 1 ? [70, 90] : chlorine === 2 ? [60, 80] : [100, 120];
    chRange = surface === 1 ? [250, 350] : surface === 2 ? [50, 300] : [220, 320];
    cyaRange = chlorine === 2 ? [70, 80] : [30, 50];
  } else if (from === 3) {
    phGoal = '7.4 to 7.8';
    taGoal = '50 to 80';
    chGoal = '120 to 200';
    cyaGoal = '20 to 40';
    phRange = [7.4, 7.8];
    taRange = [50, 80];
    chRange = [120, 200];
    cyaRange = [20, 40];
  }

  refs.chlorinePop.disabled = from === 3;
  refs.surfacePop.disabled = from === 3;

  const fcRangeMin = chlorine === 2 ? swg : min;
  refs.fcTargetRange.textContent = `Target range: ${fcRangeMin}-${targ} ppm`;
  if (refs.fcAutoTarget.checked && !manualTargetOverride.fc) {
    const fcTarget = fcRangeMin + (targ - fcRangeMin) * (2 / 3);
    writeTargetValue(refs.fcTo, Math.round(fcTarget));
  }

  if (taRange && !manualTargetOverride.ta) {
    const taTarget = taRange[0] + (taRange[1] - taRange[0]) * 0.5;
    writeTargetValue(refs.taTo, Math.round(taTarget));
  }

  if (chRange && !manualTargetOverride.ch) {
    const chTarget = chRange[0] + (chRange[1] - chRange[0]) * 0.5;
    writeTargetValue(refs.chTo, Math.round(chTarget));
  }

  if (cyaRange && !manualTargetOverride.cya) {
    const cyaTarget = cyaRange[0] + (cyaRange[1] - cyaRange[0]) * (1 / 3);
    writeTargetValue(refs.cyaTo, Math.round(cyaTarget));
  }

  refs.phTargetRange.textContent = phGoal === 'Not Setup'
    ? `Target: ${n(refs.phTo, 7.5)} pH`
    : `Target: ${phGoal}`;
  refs.taTargetRange.textContent = taGoal === 'Not Setup'
    ? `Target: ${i(refs.taTo, 100)} ppm`
    : `Target: ${taGoal} ppm`;
  refs.chTargetRange.textContent = chGoal === 'Not Setup'
    ? `Target: ${i(refs.chTo, 260)} ppm`
    : `Target: ${chGoal} ppm`;
  refs.cyaTargetRange.textContent = cyaGoal === 'Not Setup'
    ? `Target: ${i(refs.cyaTo, 40)} ppm`
    : `Target: ${cyaGoal} ppm`;
  refs.saltTargetRange.textContent = `Target: ${i(refs.saltTo, 0)} ppm`;
  refs.borTargetRange.textContent = `Target: ${i(refs.borTo, 0)} ppm`;

  refs.goalResult.innerHTML = [
    `Suggested FC Levels: SWG ${swg}, Normal ${min}-${targ}, Shock ${shock}, Mustard ${mustard}.`,
    `FC Goal Band: ${fcGoal} (target ${fcRangeMin}-${targ} ppm).`,
    `Suggested Goals -> pH: ${phGoal}, TA: ${taGoal}, CH: ${chGoal}, CYA: ${cyaGoal}.`
  ].join('<br>');
}

function calcPoolVolume() {
  const volmult = [7.48052, 7.48052, 5.87518];
  const shape = Number(n(refs.szPop));
  let wid = n(refs.szWid);
  let len = n(refs.szLen);

  if (shape === 2) {
    len = wid;
    refs.szLen.disabled = true;
  } else {
    refs.szLen.disabled = false;
  }

  if (shape === 1 && len < wid) {
    const t = wid;
    wid = len;
    len = t;
  }

  let area = wid * len;
  if (shape === 1) area -= 0.214602 * wid * wid;
  const volumeGallons = area * n(refs.szDeep) * volmult[shape];
  refs.szResult.textContent = `Estimated volume: ${putGallons(volumeGallons)}.`;
}

function formatEffect(value) {
  if (value < 9.95) return Math.floor(value * 10 + 0.5) / 10;
  return Math.floor(value + 0.5);
}

function calcEffect() {
  let oz = n(refs.effOz);
  const unit = effUnits[Number(n(refs.effPop))];
  const system = Number(n(refs.units));

  if (system === 1) {
    if (unit === 1) {
      refs.effUnit.value = 'g';
      oz *= 0.035274;
    } else if (unit === 2) {
      refs.effUnit.value = 'kg';
      oz *= 2.20462;
    } else {
      refs.effUnit.value = 'ml';
      oz *= 0.033814;
    }
  } else if (system === 2) {
    if (unit === 2) {
      refs.effUnit.value = 'lbs';
    } else {
      refs.effUnit.value = 'oz';
      if (unit === 0) oz *= 0.96076;
    }
  } else {
    refs.effUnit.value = unit === 2 ? 'lbs' : 'oz';
  }

  const g = getGallons();
  const idx = Number(n(refs.effPop));
  let result = '';

  switch (idx) {
    case 0:
      oz = oz * 525 / 600;
    case 1:
      oz = oz * 0.61721856;
    case 2:
      oz = oz * 100 / 125;
    case 3:
      result = `raise FC by ${formatEffect(oz / g * 976.562)} and raise Salt by ${formatEffect(oz / g * 1607)}`;
      break;
    case 4:
      result = `raise FC by ${formatEffect(oz / g * 6854.95)}, raise CYA by ${formatEffect(oz / g * 4159.41)}, lower pH by ${round2(oz / g * 367)}, and raise Salt by ${formatEffect(oz / g * 5600)}`;
      break;
    case 5:
      result = `raise FC by ${formatEffect(oz / g * 4149.03)}, raise CYA by ${formatEffect(oz / g * 3776.46)}, lower pH by ${round2(oz / g * 158)}, and raise Salt by ${formatEffect(oz / g * 3384)}`;
      break;
    case 6:
      oz = oz * 48 / 53;
    case 7:
      oz = oz * 53 / 65;
    case 8:
      oz = oz * 65 / 73;
    case 9:
      result = `raise FC by ${formatEffect(oz / g * 5422.41)}, raise CH by ${formatEffect(oz / g * 3827.09)}, and raise Salt by ${formatEffect(oz / g * 5500)}`;
      break;
    case 10:
      result = `raise FC by ${formatEffect(oz / g * 2637.5)} and raise Salt by ${formatEffect(oz / g * 4170)}`;
      break;
    case 11:
      result = `raise FC by ${formatEffect(oz / g * 7489.4)}, lower pH by ${round2(oz / g * 625)}, and raise Salt by ${formatEffect(oz / g * 6140)}`;
      break;
    case 12:
      oz /= 2;
    case 13:
      result = `lower pH by ${round2(oz / g * 240.15)} and lower TA by ${formatEffect(oz / g * 3911.47)}`;
      break;
    case 14:
      result = `lower pH by ${round2(oz / g * 167.9)} and lower TA by ${formatEffect(oz / g * 2909.47)}`;
      break;
    case 15:
      result = `raise pH by ${round2(oz / g * 217.1)} and raise TA by ${formatEffect(oz / g * 7072.46)}`;
      break;
    case 16:
      result = `raise pH by ${round2(oz / g * 109.1)}, raise Borate by ${formatEffect(oz / g * 849.271)}, and raise TA by ${formatEffect(oz / g * 1949.93)}`;
      break;
    case 17:
      result = `raise pH by ${round2(oz / g * 166.8)}, raise Borate by ${formatEffect(oz / g * 1111.69)}, and raise TA by ${formatEffect(oz / g * 2548.89)}`;
      break;
    case 18:
      result = `raise pH by ${round2(oz / g * 546.3)} and raise TA by ${formatEffect(oz / g * 9135.78)}`;
      break;
    case 19:
      result = `raise TA by ${formatEffect(oz / g * 4461.56)} and raise pH by ${round2(oz / g * 9.091)}`;
      break;
    case 20:
      result = `raise CH by ${formatEffect(oz / g * 6754.11)}`;
      break;
    case 21:
      result = `raise CH by ${formatEffect(oz / g * 5098.82)}`;
      break;
    case 22:
      result = `raise CYA by ${formatEffect(oz / g * 7489.51)} and lower pH by ${round2(oz / g * 138.8)}`;
      break;
    case 23:
      result = `raise CYA by ${formatEffect(oz / g * 2890)}`;
      break;
    case 24:
      result = `raise Salt by ${formatEffect(oz / g * 7468.64 * 16)}`;
      break;
    default:
      result = 'no change';
  }

  refs.effResult.textContent = `Adding ${n(refs.effOz)} ${refs.effUnit.value} of ${data.effPop[idx]} will ${result}.`;
}

function calcEffUnits(newUnit, old) {
  const unit = effUnits[Number(n(refs.effPop))];
  let factor = 1;

  if (newUnit === 0) {
    if (old === 1) {
      factor = unit === 0 ? 0.033814 : unit === 1 ? 0.035274 : 2.20462;
    } else if (old === 2) {
      factor = unit === 0 ? 0.96076 : 1;
    }
  } else if (newUnit === 1) {
    if (old === 0) {
      factor = unit === 0 ? 29.5735 : unit === 1 ? 28.3495 : 0.453592;
    } else if (old === 2) {
      factor = unit === 0 ? 28.4131 : unit === 1 ? 28.3495 : 0.453592;
    }
  } else if (newUnit === 2) {
    if (old === 0) {
      factor = unit === 0 ? 1.04084 : unit === 1 ? 1 : 1;
    } else if (old === 1) {
      factor = unit === 0 ? 0.0351951 : unit === 1 ? 0.035274 : 2.20462;
    }
  }

  refs.effOz.value = Math.floor(n(refs.effOz) * factor + 0.5);
}

function calcUnits() {
  const next = Number(n(refs.units));

  if (next === 1) {
    refs.sizeUnit.textContent = 'liters';
    refs.tempUnit.textContent = 'Celsius';
    setOptions(refs.fcJug, data.fcJugMetric);

    if (oldUnit === 0) refs.size.value = Math.floor(n(refs.size) * 3.78541 + 0.5);
    else if (oldUnit === 2) refs.size.value = Math.floor(n(refs.size) * 4.54609 + 0.5);

    if (oldUnit !== 1) refs.temp.value = Math.floor((n(refs.temp) - 32) * 5 / 9 + 0.5);
  } else {
    refs.sizeUnit.textContent = 'gallons';
    refs.tempUnit.textContent = 'Fahrenheit';
    setOptions(refs.fcJug, data.fcJugUS);

    if (next === 2) {
      if (oldUnit === 0) refs.size.value = Math.floor(n(refs.size) * 0.832674 + 0.5);
      else if (oldUnit === 1) refs.size.value = Math.floor(n(refs.size) * 0.219969 + 0.5);
    } else {
      if (oldUnit === 1) refs.size.value = Math.floor(n(refs.size) * 0.264172 + 0.5);
      else if (oldUnit === 2) refs.size.value = Math.floor(n(refs.size) * 1.20095 + 0.5);
    }

    if (oldUnit === 1) refs.temp.value = Math.floor(n(refs.temp) * 9 / 5 + 0.5) + 32;
  }

  calcEffUnits(next, oldUnit);
  oldUnit = next;
}

function calcAll() {
  calcFC();
  calcPH();
  calcTA();
  calcCH();
  calcCYA();
  calcSalt();
  calcBorate();

  const csiFrom = csi(n(refs.phFrom), i(refs.taFrom), i(refs.chFrom), i(refs.cyaFrom), i(refs.saltFrom), i(refs.borFrom), n(refs.temp));
  const csiTo = csi(n(refs.phTo), i(refs.taTo), i(refs.chTo), i(refs.cyaTo), i(refs.saltTo), i(refs.borTo), n(refs.temp));
  refs.csiResult.innerHTML = `Now: ${csiFrom} (${statusCSI(csiFrom)})<br>Target: ${csiTo} (${statusCSI(csiTo)})`;

  calcSuggested();
  calcPoolVolume();
  calcEffect();
  updateReport();
}

function init() {
  setOptions(refs.fcJug, data.fcJugUS);
  setOptions(refs.fcPop, data.fcPop);
  setOptions(refs.maPop, data.maPop);
  setOptions(refs.borPop, data.borPop);
  setOptions(refs.fromPop, data.fromPop);
  setOptions(refs.chlorinePop, data.chlorinePop);
  setOptions(refs.surfacePop, data.surfacePop);
  setOptions(refs.szPop, data.szPop);
  setOptions(refs.effPop, data.effPop);

  refs.fcJug.value = '0';
  refs.fcPop.value = '0';
  refs.maPop.value = '2';
  refs.borPop.value = '0';
  refs.fromPop.value = '0';
  refs.chlorinePop.value = '0';
  refs.surfacePop.value = '0';
  refs.szPop.value = '0';
  refs.effPop.value = '1';

  refs.openReport.addEventListener('click', () => {
    setReportMode(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  refs.backToApp.addEventListener('click', () => {
    setReportMode(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  refs.printReport.addEventListener('click', () => {
    window.print();
  });

  refs.fcTo.addEventListener('input', () => {
    if (!suppressTargetOverrideCapture) {
      manualTargetOverride.fc = true;
      if (refs.fcAutoTarget.checked) refs.fcAutoTarget.checked = false;
    }
  });

  refs.fcTo.addEventListener('change', () => {
    if (!suppressTargetOverrideCapture) {
      manualTargetOverride.fc = true;
      if (refs.fcAutoTarget.checked) refs.fcAutoTarget.checked = false;
    }
  });

  refs.fcAutoTarget.addEventListener('change', () => {
    if (refs.fcAutoTarget.checked) {
      manualTargetOverride.fc = false;
      calcAll();
    }
  });

  refs.taTo.addEventListener('input', () => {
    if (!suppressTargetOverrideCapture) manualTargetOverride.ta = true;
  });

  refs.chTo.addEventListener('input', () => {
    if (!suppressTargetOverrideCapture) manualTargetOverride.ch = true;
  });

  refs.cyaTo.addEventListener('input', () => {
    if (!suppressTargetOverrideCapture) manualTargetOverride.cya = true;
  });

  document.querySelectorAll('input,select').forEach((el) => {
    el.addEventListener('input', () => {
      if (el === refs.units) {
        calcUnits();
      }
      calcAll();
    });
    el.addEventListener('change', () => {
      if (el === refs.units) {
        calcUnits();
      }
      calcAll();
    });
  });

  calcUnits();
  calcAll();
  loadWeather().then(() => {
    updateReport();
  });
}

init();
