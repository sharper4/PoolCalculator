import { buildGmailMessageRaw, buildHtmlEmailDocument } from './emailUtil.js';

const refs = {
  units: document.getElementById('units'),
  size: document.getElementById('size'),
  sizeUnit: document.getElementById('size-unit'),
  temp: document.getElementById('temp'),
  tempUnit: document.getElementById('temp-unit'),
  tempEstimateNote: document.getElementById('temp-estimate-note'),

  customerName: document.getElementById('customer-name'),
  customerAddress: document.getElementById('customer-address'),
  emailAddress: document.getElementById('email-address'),
  tcNow: document.getElementById('tc-now'),
  phosphatesNow: document.getElementById('phosphates-now'),
  weatherConditions: document.getElementById('weather-conditions'),
  weatherForecast: document.getElementById('weather-forecast'),
  weatherLabel: document.getElementById('weather-label'),
  weatherLabelText: document.getElementById('weather-label-text'),
  serviceDetailsSection: document.getElementById('service-details-section'),

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
  phAeration: document.getElementById('ph-aeration'),

  taFrom: document.getElementById('ta-from'),
  taTo: document.getElementById('ta-to'),
  taCard: document.querySelector('.chem-card.ta'),
  taTargetRange: document.getElementById('ta-target-range'),

  chFrom: document.getElementById('ch-from'),
  chTo: document.getElementById('ch-to'),
  chCard: document.querySelector('.chem-card.ch'),
  chTargetRange: document.getElementById('ch-target-range'),
  chFill: document.getElementById('ch-fill'),

  tclFrom: document.getElementById('tcl-from'),
  tclTo: document.getElementById('tcl-to'),
  tclCard: document.querySelector('.chem-card.tcl'),
  tclTargetRange: document.getElementById('tcl-target-range'),
  tclAutoTarget: document.getElementById('tcl-auto-target'),

  cyaFrom: document.getElementById('cya-from'),
  cyaTo: document.getElementById('cya-to'),
  cyaCard: document.querySelector('.chem-card.cya'),
  cyaTargetRange: document.getElementById('cya-target-range'),

  saltFrom: document.getElementById('salt-from'),
  saltTo: document.getElementById('salt-to'),
  swgRuntime: document.getElementById('swg-runtime'),
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
  passiveOutlook: document.getElementById('passive-outlook'),

  fcResult: document.getElementById('fc-result'),
  phResult: document.getElementById('ph-result'),
  taResult: document.getElementById('ta-result'),
  chResult: document.getElementById('ch-result'),
  tclResult: document.getElementById('tcl-result'),
  cyaResult: document.getElementById('cya-result'),
  saltResult: document.getElementById('salt-result'),
  borResult: document.getElementById('bor-result'),
  csiResult: document.getElementById('csi-result'),
  goalResult: document.getElementById('goal-result'),
  goalNote: document.getElementById('goal-note'),
  szResult: document.getElementById('sz-result'),
  effResult: document.getElementById('eff-result'),

  openReport: document.getElementById('open-report'),
  backToApp: document.getElementById('back-to-app'),
  printReport: document.getElementById('print-report'),
  sendReportEmail: document.getElementById('send-report-email'),
  reportView: document.getElementById('report-view'),

  emailModalOverlay: document.getElementById('email-modal-overlay'),
  emailModalInput: document.getElementById('email-modal-input'),
  emailModalConfirm: document.getElementById('email-modal-confirm'),
  emailModalCancel: document.getElementById('email-modal-cancel'),

  rCustomer: document.getElementById('r-customer'),
  rAddress: document.getElementById('r-address'),
  rRowCustomer: document.getElementById('r-row-customer'),
  rRowAddress: document.getElementById('r-row-address'),
  rDate: document.getElementById('r-date'),
  rEmailAddress: document.getElementById('r-email-address'),
  rRowEmailAddress: document.getElementById('r-row-email-address'),
  rWeather: document.getElementById('r-weather'),
  rWeatherForecast: document.getElementById('r-weather-forecast'),
  rPoolSize: document.getElementById('r-pool-size'),
  rPoolTemp: document.getElementById('r-pool-temp'),
  rFc: document.getElementById('r-fc'),
  rPh: document.getElementById('r-ph'),
  rTa: document.getElementById('r-ta'),
  rCh: document.getElementById('r-ch'),
  rCya: document.getElementById('r-cya'),
  rPhos: document.getElementById('r-phos'),
  rSalt: document.getElementById('r-salt'),
  rBor: document.getElementById('r-bor'),
  rowSalt: document.getElementById('row-salt'),
  rowBor: document.getElementById('row-bor'),
  idealFc: document.getElementById('ideal-fc'),
  idealPh: document.getElementById('ideal-ph'),
  idealTa: document.getElementById('ideal-ta'),
  idealCh: document.getElementById('ideal-ch'),
  idealCya: document.getElementById('ideal-cya'),
  idealPhos: document.getElementById('ideal-phos'),
  idealSalt: document.getElementById('ideal-salt'),
  idealBor: document.getElementById('ideal-bor'),
  rangeFc: document.getElementById('range-fc'),
  rangePh: document.getElementById('range-ph'),
  rangeTa: document.getElementById('range-ta'),
  rangeCh: document.getElementById('range-ch'),
  rangeCya: document.getElementById('range-cya'),
  rangeSalt: document.getElementById('range-salt'),
  rangeBor: document.getElementById('range-bor'),
  sFc: document.getElementById('s-fc'),
  sPh: document.getElementById('s-ph'),
  sTa: document.getElementById('s-ta'),
  sCh: document.getElementById('s-ch'),
  sCya: document.getElementById('s-cya'),
  sPhos: document.getElementById('s-phos'),
  sSalt: document.getElementById('s-salt'),
  sBor: document.getElementById('s-bor'),
  rTreatmentList: document.getElementById('r-treatment-list'),
  rForecastList: document.getElementById('r-forecast-list'),
  rInsights: document.getElementById('r-insights'),
  rInsightsPrint: document.getElementById('r-insights-print'),
  reportTechInsights: document.getElementById('report-tech-insights'),
  reportEliteDifference: document.getElementById('report-elite-difference'),
  reportServiceChecklist: document.getElementById('report-service-checklist'),
  rServiceChecklist: document.getElementById('r-service-checklist'),
  statusClear: document.getElementById('status-clear'),
  statusMinor: document.getElementById('status-minor'),
  statusImmediate: document.getElementById('status-immediate')
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
    '6% bleach',
    '7.5% bleach',
    '10% bleach',
    '12.5% bleach',
    'trichlor',
    'dichlor',
    '48% cal-hypo',
    '53% cal-hypo',
    '65% cal-hypo',
    '73% cal-hypo',
    'lithium hypochlorite',
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
    'salt',
    '8.25% bleach'
  ]
};

const effUnits = [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 0];
const BAKING_SODA_TA_OZMUL = 4461.56;
const TRICHLOR_EFFECT_INDEX = 4;
const TRICHLOR_3IN_TABLET_OZ = 8;
// FC/CYA ppm multipliers for trichlor (ppm = oz * mul / gallons), matching calcFC/effects math.
const TRICHLOR_FC_OZMUL = 6854.95;
const TRICHLOR_CYA_OZMUL = 4159.41;
const ALK_MONITOR_BUFFER = 0.20;
const SALT_MONITOR_BUFFER = 0.20;

let oldUnit = 0;
let suppressTargetOverrideCapture = false;
let suppressManualTempCapture = false;
let customerSectionsVisible = false;
let manualConditionSummaryOverride = false;
let manualWaterTempOverride = false;
const manualTargetOverride = {
  tcl: false,
  fc: false,
  cya: false,
  ta: false,
  ch: false
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

function replaceWithBreaks(el, lines) {
  if (!el) return;
  const fragment = document.createDocumentFragment();
  lines.forEach((line, idx) => {
    if (idx > 0) fragment.appendChild(document.createElement('br'));
    fragment.append(line);
  });
  el.replaceChildren(fragment);
}

function reorderEffectsDropdownOptions() {
  if (!refs.effPop) return;
  const options = Array.from(refs.effPop.options);
  const bleach825 = options.find((opt) => opt.textContent.trim().toLowerCase() === '8.25% bleach');
  const bleach10 = options.find((opt) => opt.textContent.trim().toLowerCase() === '10% bleach');
  if (!bleach825 || !bleach10) return;

  // Keep underlying option values intact so effect math mapping does not change.
  refs.effPop.insertBefore(bleach825, bleach10);
}

function effectUnitOptions(system, chemicalUnit, chemicalIndex) {
  if (chemicalIndex === TRICHLOR_EFFECT_INDEX) {
    return system === 1
      ? [['tab3', '3" tablets'], ['g', 'grams'], ['kg', 'kilograms']]
      : [['tab3', '3" tablets'], ['oz', 'oz'], ['lb', 'pounds']];
  }

  if (system === 1) {
    return chemicalUnit === 0
      ? [['ml', 'ml'], ['l', 'liters']]
      : [['g', 'grams'], ['kg', 'kilograms']];
  }

  return chemicalUnit === 0
    ? [['oz', 'oz'], ['gal', 'gallons']]
    : [['oz', 'oz'], ['lb', 'pounds']];
}

function fillEffectUnitOptions(options, selectedValue) {
  refs.effUnit.innerHTML = '';
  options.forEach(([value, label]) => {
    const opt = document.createElement('option');
    opt.value = value;
    opt.textContent = label;
    refs.effUnit.appendChild(opt);
  });
  refs.effUnit.value = options.some(([value]) => value === selectedValue) ? selectedValue : options[0][0];
}

function effectAmountToBaseOz(amount, unitValue, system, chemicalUnit, chemicalIndex) {
  if (chemicalIndex === TRICHLOR_EFFECT_INDEX && unitValue === 'tab3') {
    return amount * TRICHLOR_3IN_TABLET_OZ;
  }

  if (chemicalUnit === 0) {
    if (unitValue === 'gal') return amount * (system === 2 ? 153.7216 : 128);
    if (unitValue === 'l') return amount * 33.814;
    if (unitValue === 'ml') return amount * 0.033814;
    if (unitValue === 'oz') return system === 2 ? amount * 0.96076 : amount;
    return amount;
  }

  if (unitValue === 'lb') return amount * 16;
  if (unitValue === 'kg') return amount * 35.274;
  if (unitValue === 'g') return amount * 0.035274;
  return amount;
}

function baseOzToEffectAmount(oz, unitValue, system, chemicalUnit, chemicalIndex) {
  if (chemicalIndex === TRICHLOR_EFFECT_INDEX && unitValue === 'tab3') {
    return oz / TRICHLOR_3IN_TABLET_OZ;
  }

  if (chemicalUnit === 0) {
    if (unitValue === 'gal') return oz / (system === 2 ? 153.7216 : 128);
    if (unitValue === 'l') return oz / 33.814;
    if (unitValue === 'ml') return oz / 0.033814;
    if (unitValue === 'oz') return system === 2 ? oz / 0.96076 : oz;
    return oz;
  }

  if (unitValue === 'lb') return oz / 16;
  if (unitValue === 'kg') return oz / 35.274;
  if (unitValue === 'g') return oz / 0.035274;
  return oz;
}

function effectUnitKind(unitValue) {
  return ['gal', 'l', 'lb', 'kg'].includes(unitValue) ? 'large' : 'small';
}

function syncEffectUnitControl(targetSystem, previousSystem = targetSystem, preserveAmount = true) {
  const chemicalIndex = Number(n(refs.effPop));
  const chemicalUnit = effUnits[chemicalIndex];
  const previousValue = refs.effUnit.value;
  const previousChemicalUnit = Number.parseInt(refs.effUnit.dataset.chemicalUnit || String(chemicalUnit), 10);
  const currentAmount = n(refs.effOz);
  const baseOz = preserveAmount
    ? effectAmountToBaseOz(currentAmount, previousValue, previousSystem, previousChemicalUnit, chemicalIndex)
    : null;

  const options = effectUnitOptions(targetSystem, chemicalUnit, chemicalIndex);
  const preferredKind = effectUnitKind(previousValue);
  const fallbackValue = preferredKind === 'large'
    ? (options.find(([value]) => effectUnitKind(value) === 'large') || options[0])[0]
    : options[0][0];

  fillEffectUnitOptions(options, previousValue || fallbackValue);
  if (!refs.effUnit.value) refs.effUnit.value = fallbackValue;
  refs.effUnit.dataset.chemicalUnit = String(chemicalUnit);

  if (preserveAmount && Number.isFinite(baseOz)) {
    refs.effOz.value = String(round2(baseOzToEffectAmount(baseOz, refs.effUnit.value, targetSystem, chemicalUnit, chemicalIndex)));
  }
}

function formatNum(value) {
  if (!Number.isFinite(value)) return '0';
  return value >= 10 ? String(Math.round(value)) : String(round2(value));
}

function putWeight(oz) {
  if (Number(n(refs.units)) === 1) return `${Math.floor(oz * 28.3495 + 0.5)} g`;
  return `${formatNum(oz)} oz`;
}

function putWeightLbsOz(oz) {
  if (Number(n(refs.units)) === 1) return putWeight(oz);
  const totalOz = Math.max(0, Math.round(oz));
  const lbs = Math.floor(totalOz / 16);
  const rem = totalOz - lbs * 16;
  if (lbs <= 0) return `${totalOz} oz`;
  return rem > 0 ? `${lbs} lb ${rem} oz` : `${lbs} lb`;
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

function statusMark(value, min, max, monitorBuf = 0.10, monitorBounds = null) {
  if (!Number.isFinite(value)) return '--';
  if (value >= min && value <= max) return 'OK';
  let loBound = min - (max - min) * monitorBuf;
  let hiBound = max + (max - min) * monitorBuf;
  if (monitorBounds) {
    if (Number.isFinite(monitorBounds.min)) loBound = monitorBounds.min;
    if (Number.isFinite(monitorBounds.max)) hiBound = monitorBounds.max;
  }
  if (monitorBuf > 0 || monitorBounds) {
    if (value >= loBound && value <= hiBound) return 'Monitor';
  }
  return 'Needs attention';
}

function cleanResult(text) {
  return text.replace(/\s+/g, ' ').trim();
}

function hasAction(planText, noActionPrefix) {
  return Boolean(planText) && !planText.startsWith(noActionPrefix);
}

function setPlanLine(rowEl, valueEl, text) {
  if (!rowEl || !valueEl) return;
  const visible = Boolean(text);
  rowEl.hidden = !visible;
  valueEl.textContent = visible ? text : '';
}

function setChecklist(listEl, items) {
  if (!listEl) return;
  const checkedMap = new Map();
  listEl.querySelectorAll('li').forEach((li) => {
    const labelText = li.querySelector('span')?.textContent?.trim();
    const checked = li.querySelector('input[type="checkbox"]')?.checked;
    if (labelText) checkedMap.set(labelText, Boolean(checked));
  });

  listEl.innerHTML = '';
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
    listEl.appendChild(li);
  });
}

function clearChemicalChecks() {
  [refs.rTreatmentList, refs.rForecastList].forEach((listEl) => {
    listEl?.querySelectorAll('input[type="checkbox"]').forEach((box) => {
      box.checked = false;
    });
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
  row.classList.toggle('monitor-row', statusCell.textContent === 'Monitor');
}

function setRangeState(card, value, min, max, monitorBuf = 0.10, monitorBounds = null) {
  const hasNow = (raw) => String(raw ?? '').trim() !== '';
  if (
    (card === refs.fcCard && !hasNow(refs.fcFrom.value))
    || (card === refs.phCard && !hasNow(refs.phFrom.value))
    || (card === refs.taCard && !hasNow(refs.taFrom.value))
    || (card === refs.cyaCard && !hasNow(refs.cyaFrom.value))
    || (card === refs.chCard && !hasNow(refs.chFrom.value))
    || (card === refs.tclCard && !hasNow(refs.tclFrom.value))
    || (card === refs.saltCard && !hasNow(refs.saltFrom.value))
    || (card === refs.borCard && !hasNow(refs.borFrom.value))
  ) {
    card.classList.remove('within-range', 'out-of-range', 'near-range');
    return;
  }

  if (!card || !Number.isFinite(value) || !Number.isFinite(min) || !Number.isFinite(max)) return;
  const inRange = value >= min && value <= max;
  if (inRange) {
    card.classList.add('within-range');
    card.classList.remove('out-of-range', 'near-range');
  } else {
    card.classList.remove('within-range');
    let loBound = min - (max - min) * monitorBuf;
    let hiBound = max + (max - min) * monitorBuf;
    if (monitorBounds) {
      if (Number.isFinite(monitorBounds.min)) loBound = monitorBounds.min;
      if (Number.isFinite(monitorBounds.max)) hiBound = monitorBounds.max;
    }
    const isNear = (monitorBuf > 0 || monitorBounds) && value >= loBound && value <= hiBound;
    card.classList.toggle('near-range', isNear);
    card.classList.toggle('out-of-range', !isNear);
  }
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

// Forecast average temperature and UV from the next 5 days.
// Used to project chlorine demand instead of the current momentary conditions.
let weeklyAvgTemp = 80; // default 80°F
let weeklyAvgUV = 7;    // default UV index
let weatherModelSource = 'baseline'; // forecast | current | baseline

function parseFirstFahrenheitValue(text) {
  const match = String(text || '').replace(/\u00b0/g, '').match(/(-?\d+(?:\.\d+)?)\s*F/i);
  return match ? Number(match[1]) : Number.NaN;
}

function parseUvValue(text) {
  const match = String(text || '').match(/UV\s*(-?\d+(?:\.\d+)?)/i);
  return match ? Number(match[1]) : Number.NaN;
}

function updateWaterTempNote(message) {
  if (!refs.tempEstimateNote) return;
  refs.tempEstimateNote.textContent = message;
}

function estimateWaterTempF() {
  const currentAirF = parseFirstFahrenheitValue(refs.weatherConditions?.value);
  const forecastAirF = parseFirstFahrenheitValue(refs.weatherForecast?.value);
  const modeledAirF = Number.isFinite(forecastAirF)
    ? forecastAirF
    : Number.isFinite(weeklyAvgTemp)
      ? weeklyAvgTemp
      : Number.isFinite(currentAirF)
        ? currentAirF
        : 80;
  const currentFallbackF = Number.isFinite(currentAirF) ? currentAirF : modeledAirF;
  const uvValue = Number.isFinite(parseUvValue(refs.weatherForecast?.value))
    ? parseUvValue(refs.weatherForecast?.value)
    : Number.isFinite(parseUvValue(refs.weatherConditions?.value))
      ? parseUvValue(refs.weatherConditions?.value)
      : weeklyAvgUV;

  const sunAdjustment = uvValue >= 10 ? 1 : uvValue <= 3 ? -1 : 0;
  const weightedAirF = modeledAirF * 0.6 + currentFallbackF * 0.4;
  const estimated = clamp(Math.round(weightedAirF - 9 + sunAdjustment), 68, 93);
  return estimated;
}

function applyEstimatedWaterTemp() {
  if (!refs.temp || manualWaterTempOverride) return;

  const estimatedF = estimateWaterTempF();
  const useMetricDisplay = Number(n(refs.units)) === 1;
  const displayValue = useMetricDisplay
    ? Math.round((estimatedF - 32) * 5 / 9)
    : estimatedF;

  suppressManualTempCapture = true;
  refs.temp.value = String(displayValue);
  suppressManualTempCapture = false;
  refs.temp.dataset.estimated = '1';
  updateWaterTempNote(`Estimated from weather (~${estimatedF}F, +/-3F). Enter a measured value to override.`);
}

function markManualWaterTemp() {
  if (suppressManualTempCapture) return;
  manualWaterTempOverride = true;
  refs.temp.dataset.estimated = '0';
  updateWaterTempNote('Using manual water temperature.');
}

function exactTarget(value, unit = '') {
  return `${value}${unit}`.trim();
}

function weatherCodeLabel(code) {
  if (code >= 1 && code <= 3) return 'Partly Cloudy';
  if (code >= 45 && code <= 48) return 'Fog';
  if (code >= 51 && code <= 67) return 'Rain';
  if (code >= 71 && code <= 77) return 'Snow';
  if (code >= 80 && code <= 82) return 'Rain Showers';
  if (code >= 95) return 'Thunderstorm';
  return 'Clear';
}

function averageFirstDays(values, count, digits = 0) {
  const usable = (values || []).slice(0, count).filter(Number.isFinite);
  if (!usable.length) return Number.NaN;
  const avg = usable.reduce((sum, value) => sum + value, 0) / usable.length;
  const factor = 10 ** digits;
  return Math.round(avg * factor) / factor;
}

function dominantWeatherLabel(codes, count) {
  const usable = (codes || []).slice(0, count).filter(Number.isFinite);
  if (!usable.length) return 'Clear';
  const counts = new Map();
  usable.forEach((code) => {
    const label = weatherCodeLabel(code);
    counts.set(label, (counts.get(label) || 0) + 1);
  });
  return [...counts.entries()].sort((a, b) => b[1] - a[1])[0][0];
}

// Parse current temperature (°F) from the weather conditions field.
// Weather string format: "Clear, 85F (feels 83F), wind 5 mph"
function parseWeatherTemp() {
  const w = (refs.weatherConditions.value || '').replace(/°/g, '');
  const m = w.match(/(\d+)F/);
  return m ? parseInt(m[1], 10) : 80; // default 80°F if weather not loaded
}

function getPoolTempF() {
  const rawTemp = n(refs.temp, Number.NaN);
  if (!Number.isFinite(rawTemp)) return estimateWaterTempF();
  return Number(n(refs.units)) === 1 ? rawTemp * 9 / 5 + 32 : rawTemp;
}

// FC daily loss rate (ppm/day) using temperature + UV index + CYA level.
// Sources: TFP (CYA/UV relationship), Litra Pool Care (temperature demand)
function fcDailyLossRate(tempF, cyaPpm, uvIndex) {
  // Temperature sets base biological/chemical demand (water temperature driven).
  let base;
  if (tempF >= 95) base = 2.6;
  else if (tempF >= 88) base = 2.2;
  else if (tempF >= 80) base = 1.8;
  else if (tempF >= 70) base = 1.3;
  else if (tempF >= 60) base = 0.8;
  else base = 0.4;
  // UV index drives photolysis — primary outdoor chlorine loss mechanism (TFP)
  // Scale: 0-2 Low, 3-5 Moderate, 6-7 High (baseline), 8-10 Very High, 11+ Extreme
  const uvFactor =
    uvIndex >= 11 ? 1.3  :
    uvIndex >=  8 ? 1.15 :
    uvIndex >=  6 ? 0.9  :
    uvIndex >=  3 ? 0.8  :
                    0.65;
  // CYA protects FC from UV by binding it as reserve chlorine (TFP)
  const cyaFactor =
    cyaPpm <= 0  ? 1.45 : // no stabilizer — very rapid UV burn-off
    cyaPpm <= 30 ? 1.0  :
    cyaPpm <= 50 ? 0.85 :
    cyaPpm <= 70 ? 0.72 :
    cyaPpm <= 90 ? 0.62 :
                   0.55;
  return Math.round(base * uvFactor * cyaFactor * 10) / 10;
}

// Weekly pH rise estimate from CO2 off-gassing (Henry's Law — Orenda Tech).
// Aeration accelerates CO2 loss: SWG H2 bubbles, waterfalls, jets all force CO2 out.
// TA level sets the ceiling; aeration level amplifies how fast we climb toward it.
function phWeeklyRise(taPpm, aeration) {
  // Base rise from TA (bicarbonate equilibrium drives CO2 off-gassing rate)
  let base;
  if (taPpm > 120) base = 0.4;
  else if (taPpm > 90) base = 0.3;
  else if (taPpm > 60) base = 0.2;
  else base = 0.1;
  // Aeration multiplier (Orenda: aeration / CO2 off-gassing are primary pH rise drivers)
  const aerFactor =
    aeration === 'high'   ? 1.6 :
    aeration === 'medium' ? 1.2 :
    aeration === 'low'    ? 0.85 :
                            0.6;  // none
  return Math.round(base * aerFactor * 100) / 100;
}

// ── Forecast chemical quantity helpers ──────────────────────────────────────
// Returns the oz of liquid bleach needed to raise a pool by doseNeeded ppm.
function bleachOzForDose(doseNeeded, gallons, percent) {
  if (doseNeeded <= 0) return 0;
  return doseNeeded * gallons / 482.202 * 6 / percent;
}
// FC ppm that one 3" trichlor puck (~8 oz, ~90% available chlorine) contributes over 7 days
// (slow-dissolve; effectively full puck dissolves in the week).
// Uses the same ozmul as calcFC: ozmul[trichlor] = 6854.95
// ppm = oz * ozmul / gallons  (re-arranged from: oz = delta * gallons / ozmul)
function ppmPerTrichlorPuck(gallons) {
  return (TRICHLOR_3IN_TABLET_OZ * TRICHLOR_FC_OZMUL) / gallons;
}

function cyaPpmPerTrichlorPuck(gallons) {
  return (TRICHLOR_3IN_TABLET_OZ * TRICHLOR_CYA_OZMUL) / gallons;
}

function roundToNearestFive(value) {
  return Math.round(value / 5) * 5;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function buildSwgRecommendation(gallons, cyaPpm, tempF, uvIndex, runtimeHours) {
  if (gallons <= 0) return '';
  // fcDailyLossRate is calibrated for typical residential pools — no additional bather factor.
  const demandPpmPerDay = fcDailyLossRate(tempF, cyaPpm, uvIndex);
  const swgCapacityPpmPerDay24h = (1.25 * 16 * 7489.4) / gallons;
  if (swgCapacityPpmPerDay24h <= 0) return '';

  // SWG cells are rated at 100% for 24 hrs. Scale to the actual pump runtime entered.
  const rt = clamp(runtimeHours || 10, 1, 24);
  const effectiveCapacity = swgCapacityPpmPerDay24h * (rt / 24);

  const center = clamp((demandPpmPerDay / effectiveCapacity) * 100, 10, 100);
  let low = clamp(roundToNearestFive(center * 0.9), 10, 100);
  let high = clamp(roundToNearestFive(center * 1.1), 10, 100);
  if (high - low < 10) {
    low = clamp(roundToNearestFive(center - 5), 10, 100);
    high = clamp(roundToNearestFive(center + 5), 10, 100);
  }
  if (high < low) high = low;

  return `SWG: Estimated ${low}–${high}% output (based on ${rt} hr/day runtime, ~1.25 lb/day cell). Demand modeled at ~${demandPpmPerDay.toFixed(1)} ppm/day from ${Math.round(tempF)}°F, UV ${uvIndex}, CYA ${Math.round(cyaPpm)}.`;
}

// Format oz as a friendly string (oz or gallons + oz for large amounts)
function fmtOz(oz) {
  if (oz <= 0) return '0 oz';
  if (oz >= 128) {
    const gals = Math.floor(oz / 128);
    const rem  = Math.round(oz % 128);
    return rem > 0 ? `${gals} gal ${rem} oz` : `${gals} gal`;
  }
  return `${Math.round(oz)} oz`;
}

// Use the same pH-to-acid model as calcPH so treatment and forecast comparisons stay consistent.
function muriaticAcidOzForPhDrop(from, to, taPpm, borPpm, gallons, maStrength) {
  if (from <= to) return 0;
  const mamul = [2.0, 1.11111, 1.0, 0.909091, 2.16897, 1.08448];
  const maMul = mamul[maStrength] || 1.0;

  let delta = (to - from) * gallons;
  const temp = (from + to) / 2;
  const adj = (192.1626 + -60.1221 * temp + 6.0752 * temp * temp + -0.1943 * temp * temp * temp) * (taPpm + 13.91) / 114.6;
  let extra = (-5.476259 + 2.414292 * temp + -0.355882 * temp * temp + 0.01755 * temp * temp * temp) * borPpm;
  extra *= delta;
  delta *= adj;

  return delta / -240.15 * maMul + extra / -240.15 * maMul;
}

function formatPhVolume(volumeOz) {
  return Number(n(refs.units)) === 0 ? fmtOz(volumeOz) : putVolume(volumeOz);
}

function parseDisplayedOz(text) {
  if (!text) return Number.NaN;
  let match = text.match(/Add\s+(\d+)\s+gal\s+(\d+)\s+oz/i);
  if (match) {
    return Number(match[1]) * 128 + Number(match[2]);
  }
  match = text.match(/Add\s+([0-9]+(?:\.[0-9]+)?)\s+oz/i);
  if (match) {
    return Number.parseFloat(match[1]);
  }
  return Number.NaN;
}

function buildFcTreatmentAction(fcNow, fcTarget, gallons, bleachPercent) {
  const doseNeeded = Math.max(0, Math.round((fcTarget - fcNow) * 10) / 10);
  if (doseNeeded <= 0 || gallons <= 0) {
    return 'FC: No FC increase required.';
  }

  const totalBleachOz = bleachOzForDose(doseNeeded, gallons, bleachPercent);
  const immediateFc = fcNow + doseNeeded;
  let line = `FC: Add ${fmtOz(totalBleachOz)} of ${bleachPercent}% liquid bleach today → FC ~${fcNow.toFixed(1)} to ~${immediateFc.toFixed(1)} ppm.`;

  const ppmPerPuck = ppmPerTrichlorPuck(gallons);
  const maxPucks = doseNeeded >= ppmPerPuck * 2 ? 2 : doseNeeded >= ppmPerPuck ? 1 : 0;
  if (maxPucks > 0) {
    const puckPpm = maxPucks * ppmPerPuck;
    const remainPpm = Math.max(0, doseNeeded - puckPpm);
    if (remainPpm > 0.1) {
      const remainBleach = bleachOzForDose(remainPpm, gallons, bleachPercent);
      line += ` Or: ${maxPucks} trichlor puck${maxPucks > 1 ? 's' : ''} + ${fmtOz(remainBleach)} of ${bleachPercent}% bleach (pucks contribute ~${puckPpm.toFixed(1)} ppm over the week).`;
    } else {
      line += ` Or: ${maxPucks} trichlor puck${maxPucks > 1 ? 's' : ''} (~${puckPpm.toFixed(1)} ppm).`;
    }
  }

  return line;
}

function updatePassiveOutlook() {
  if (!refs.passiveOutlook) return;

  const tested = {
    tcl: refs.tclFrom.value.trim() !== '',
    fc: refs.fcFrom.value.trim() !== '',
    cya: refs.cyaFrom.value.trim() !== '',
    ta: refs.taFrom.value.trim() !== '',
    ph: refs.phFrom.value.trim() !== '',
    ch: refs.chFrom.value.trim() !== '',
    salt: refs.saltFrom.value.trim() !== '',
    bor: refs.borFrom.value.trim() !== ''
  };

  const lines = [];
  const tempF = getPoolTempF();
  const gallons = getGallons();

  if (weatherModelSource === 'current') {
    lines.push('Note: 5-day forecast inputs were unavailable, so this model is using current weather as fallback.');
  } else if (weatherModelSource === 'baseline') {
    lines.push('Note: Weather inputs are unavailable, so this model is using baseline assumptions (80F, UV 7).');
  }

  if (tested.fc) {
    const fc = n(refs.fcFrom);
    const cyaForModel = tested.cya ? n(refs.cyaFrom) : n(refs.cyaTo);
    const dailyLoss = fcDailyLossRate(tempF, cyaForModel, weeklyAvgUV);
    const weeklyLoss = Math.round(dailyLoss * 7 * 10) / 10;
    const fcProjected = Math.max(0, Math.round((fc - weeklyLoss) * 10) / 10);
    lines.push(
      `FC: If untreated, expect ~${dailyLoss.toFixed(1)} ppm/day reduction (~${weeklyLoss.toFixed(1)} ppm this week) → ~${fcProjected.toFixed(1)} ppm in 7 days.`
    );
  }

  if (tested.tcl) {
    lines.push('TCL: If untreated, Combined Chlorine (TCL minus FC) can build up as FC is consumed; retest alongside FC.');
  }

  if (tested.cya) {
    const cya = n(refs.cyaFrom);
    const cyaWeeklyLoss = tempF >= 85 ? 2 : 1;
    const cyaDailyLoss = Math.round((cyaWeeklyLoss / 7) * 10) / 10;
    const cyaProjected = Math.max(0, Math.round(cya - cyaWeeklyLoss));
    lines.push(
      `CYA: If untreated, expect ~${cyaDailyLoss.toFixed(1)} ppm/day loss (~${cyaWeeklyLoss} ppm this week) → ~${cyaProjected} ppm in 7 days.`
    );
  }

  if (tested.ph) {
    const ph = n(refs.phFrom);
    const taForPhModel = i(refs.taFrom, 100);
    const aeration = refs.phAeration ? refs.phAeration.value : 'medium';
    const phRiseWeek = phWeeklyRise(taForPhModel, aeration);
    const phRiseDay = Math.round((phRiseWeek / 7) * 100) / 100;
    const phProjected = Math.round((ph + phRiseWeek) * 100) / 100;
    lines.push(
      `pH: If untreated, expect ~${phRiseDay.toFixed(2)}/day rise (~${phRiseWeek.toFixed(2)}/week) → ~${phProjected.toFixed(2)} in 7 days.`
    );
  }

  if (tested.ta) {
    const ta = n(refs.taFrom);
    const taWeeklyLoss = 3;
    const taDailyLoss = Math.round((taWeeklyLoss / 7) * 10) / 10;
    const taProjected = Math.max(0, Math.round(ta - taWeeklyLoss));
    lines.push(
      `Alk: If untreated, model ~${taDailyLoss.toFixed(1)} ppm/day reduction (~${taWeeklyLoss} ppm this week) → ~${taProjected} ppm in 7 days.`
    );
  }

  if (tested.ch) {
    lines.push('CH: If untreated, no meaningful weekly draw is modeled under normal conditions.');
  }

  if (tested.salt) {
    lines.push('Salt: If untreated, no meaningful weekly draw is modeled unless water is lost or diluted.');
  }

  if (tested.bor) {
    lines.push('Borate: If untreated, no meaningful weekly draw is modeled in the normal forecast window.');
  }

  if (!lines.length) {
    refs.passiveOutlook.textContent = 'Enter current "Now" test values to see modeled do-nothing draw and drift.';
    return;
  }

  refs.passiveOutlook.innerHTML = lines.join('<br>');
}

function updateBuildBadge() {
  const badge = document.getElementById('build-badge');
  if (!badge) return;

  const modified = new Date(document.lastModified);
  if (Number.isNaN(modified.getTime())) {
    badge.textContent = 'Build live';
    return;
  }

  const year = modified.getFullYear();
  const month = String(modified.getMonth() + 1).padStart(2, '0');
  const day = String(modified.getDate()).padStart(2, '0');
  const hour = String(modified.getHours()).padStart(2, '0');
  const minute = String(modified.getMinutes()).padStart(2, '0');
  badge.textContent = `Build ${year}.${month}.${day}.${hour}${minute}`;
}

function setupUsageCounter() {
  const counter = document.getElementById('usage-count');
  const fallback = document.getElementById('usage-count-fallback');
  if (!counter || window.location.hostname !== 'sharper4.github.io') return;

  counter.addEventListener('load', () => {
    counter.hidden = false;
    counter.alt = "Fun Fact: This calculator's total number of usage is:";
    counter.title = 'Counts live Pool Calculator page loads';
    if (fallback) fallback.hidden = true;
  }, { once: true });
  counter.addEventListener('error', () => {
    counter.hidden = true;
    if (fallback) fallback.textContent = 'usage count is temporarily unavailable.';
  }, { once: true });
  counter.src = 'https://hits.sh/sharper4.github.io/PoolCalculator.svg?style=flat&label=Fun%20Fact%3A%20This%20calculator%27s%20total%20number%20of%20usage%20is%3A&labelColor=0e4f97&color=0e4f97';
}

function updateReport() {
  const today = new Date();
  const dateText = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  refs.rCustomer.textContent = refs.customerName.value || '__________________________';
  refs.rAddress.textContent = refs.customerAddress.value || '__________________________';
  refs.rDate.textContent = dateText;
  refs.rEmailAddress.textContent = refs.emailAddress.value || '';
  if (refs.rRowCustomer) refs.rRowCustomer.hidden = !customerSectionsVisible || !refs.customerName.value.trim();
  if (refs.rRowAddress) refs.rRowAddress.hidden = !customerSectionsVisible || !refs.customerAddress.value.trim();
  if (refs.rRowEmailAddress) refs.rRowEmailAddress.hidden = !customerSectionsVisible || !refs.emailAddress.value.trim();
  refs.rWeather.textContent = refs.weatherConditions.value || 'Unavailable';
  if (refs.rWeatherForecast) {
    refs.rWeatherForecast.textContent = refs.weatherForecast.value || 'Unavailable';
  }
  refs.rPoolSize.textContent = `${Math.round(n(refs.size))} ${refs.sizeUnit.textContent}`;
  refs.rPoolTemp.textContent = `${Math.round(n(refs.temp))} ${refs.tempUnit.textContent === 'Celsius' ? 'C' : 'F'}`;

  const fc = n(refs.fcFrom);
  const tcl = n(refs.tclFrom);
  const cya = n(refs.cyaFrom);
  const ph = n(refs.phFrom);
  const ta = n(refs.taFrom);
  const taForPhModel = i(refs.taFrom, 100);
  const ch = n(refs.chFrom);
  const salt = n(refs.saltFrom);
  const bor = n(refs.borFrom);
  const tested = {
    fc: refs.fcFrom.value.trim() !== '',
    tcl: refs.tclFrom.value.trim() !== '',
    cya: refs.cyaFrom.value.trim() !== '',
    ph: refs.phFrom.value.trim() !== '',
    ta: refs.taFrom.value.trim() !== '',
    ch: refs.chFrom.value.trim() !== '',
    salt: refs.saltFrom.value.trim() !== '',
    bor: refs.borFrom.value.trim() !== ''
  };
  const gallons = getGallons();

  refs.rFc.textContent = tested.fc ? `${round2(fc)} ppm` : 'Not tested';
  refs.rCya.textContent = tested.cya ? `${Math.round(cya)} ppm` : 'Not tested';
  refs.rPh.textContent = tested.ph ? `${round2(ph)} ppm` : 'Not tested';
  refs.rTa.textContent = tested.ta ? `${Math.round(ta)} ppm` : 'Not tested';
  refs.rCh.textContent = tested.ch ? `${Math.round(ch)} ppm` : 'Not tested';
  refs.rSalt.textContent = tested.salt ? `${Math.round(salt)} ppm` : 'Not tested';
  refs.rBor.textContent = tested.bor ? `${Math.round(bor)} ppm` : 'Not tested';

  refs.idealFc.textContent = exactTarget(round2(n(refs.fcTo)), ' ppm');
  refs.idealCya.textContent = exactTarget(Math.round(n(refs.cyaTo)), ' ppm');
  refs.idealPh.textContent = exactTarget(round2(n(refs.phTo)), ' ppm');
  refs.idealTa.textContent = exactTarget(Math.round(n(refs.taTo)), ' ppm');
  refs.idealCh.textContent = exactTarget(Math.round(n(refs.chTo)), ' ppm');
  refs.idealSalt.textContent = exactTarget(Math.round(n(refs.saltTo)), ' ppm');
  refs.idealBor.textContent = exactTarget(Math.round(n(refs.borTo)), ' ppm');

  const [fcMin, fcMax] = parseRange(refs.fcTargetRange.textContent, n(refs.fcTo), n(refs.fcTo));
  const [tclMin, tclMax] = parseRange(refs.tclTargetRange.textContent, n(refs.tclTo), n(refs.tclTo));
  const [cyaMin, cyaMax] = parseRange(refs.cyaTargetRange.textContent, n(refs.cyaTo), n(refs.cyaTo));
  const [phMin, phMax] = parseRange(refs.phTargetRange.textContent, n(refs.phTo), n(refs.phTo));
  const [taMin, taMax] = parseRange(refs.taTargetRange.textContent, n(refs.taTo), n(refs.taTo));
  const [chMin, chMax] = parseRange(refs.chTargetRange.textContent, n(refs.chTo), n(refs.chTo));
  const [saltMin, saltMax] = parseRange(refs.saltTargetRange.textContent, n(refs.saltTo), n(refs.saltTo));
  const [borMin, borMax] = parseRange(refs.borTargetRange.textContent, n(refs.borTo), n(refs.borTo));

  const fmtRange = (lo, hi, rounder, unit) => {
    if (!Number.isFinite(lo) || !Number.isFinite(hi)) return '--';
    if (lo === hi) return `${rounder(lo)}${unit}`;
    return `${rounder(lo)}–${rounder(hi)}${unit}`;
  };
  refs.rangeFc.textContent = fmtRange(fcMin, fcMax, round2, ' ppm');
  refs.rangeCya.textContent = fmtRange(cyaMin, cyaMax, Math.round, ' ppm');
  refs.rangePh.textContent = fmtRange(phMin, phMax, round2, '');
  refs.rangeTa.textContent = fmtRange(taMin, taMax, Math.round, ' ppm');
  refs.rangeCh.textContent = fmtRange(chMin, chMax, Math.round, ' ppm');
  refs.rangeSalt.textContent = fmtRange(saltMin, saltMax, Math.round, ' ppm');
  refs.rangeBor.textContent = fmtRange(borMin, borMax, Math.round, ' ppm');

  refs.sFc.textContent = tested.fc ? statusMark(fc, fcMin, fcMax) : 'Not tested';
  refs.sCya.textContent = tested.cya ? statusMark(cya, cyaMin, cyaMax) : 'Not tested';
  // pH uses absolute ±0.2 tolerance for Monitor (not % of span)
  refs.sPh.textContent = tested.ph ? (() => {
    if (!Number.isFinite(ph)) return '--';
    if (ph >= phMin && ph <= phMax) return 'OK';
    if (ph >= phMin - 0.2 && ph <= phMax + 0.2) return 'Monitor';
    return 'Needs attention';
  })() : 'Not tested';
  refs.sTa.textContent = tested.ta ? statusMark(ta, taMin, taMax, ALK_MONITOR_BUFFER) : 'Not tested';
  refs.sCh.textContent = tested.ch ? statusMark(ch, chMin, chMax, undefined, { max: 500 }) : 'Not tested';
  refs.sSalt.textContent = tested.salt ? statusMark(salt, saltMin, saltMax, SALT_MONITOR_BUFFER) : 'Not tested';
  refs.sBor.textContent = tested.bor ? statusMark(bor, borMin, borMax) : 'Not tested';

  [refs.sFc, refs.sCya, refs.sPh, refs.sTa, refs.sCh, refs.sSalt, refs.sBor].forEach(syncAttentionRow);

  if (refs.rowSalt) refs.rowSalt.style.display = tested.salt ? '' : 'none';
  if (refs.rowBor) refs.rowBor.style.display = tested.bor ? '' : 'none';

  setRangeState(refs.fcCard, fc, fcMin, fcMax);
  setRangeState(refs.tclCard, tcl, tclMin, tclMax);
  setRangeState(refs.cyaCard, cya, cyaMin, cyaMax);
  // pH card uses absolute ±0.2 tolerance for near-range
  if (refs.phCard && Number.isFinite(ph) && Number.isFinite(phMin) && Number.isFinite(phMax)) {
    const hasNow = String(refs.phFrom.value ?? '').trim() !== '';
    if (!hasNow) {
      refs.phCard.classList.remove('within-range', 'out-of-range', 'near-range');
    } else if (ph >= phMin && ph <= phMax) {
      refs.phCard.classList.add('within-range');
      refs.phCard.classList.remove('out-of-range', 'near-range');
    } else {
      refs.phCard.classList.remove('within-range');
      const isNear = ph >= phMin - 0.2 && ph <= phMax + 0.2;
      refs.phCard.classList.toggle('near-range', isNear);
      refs.phCard.classList.toggle('out-of-range', !isNear);
    }
  }
  setRangeState(refs.taCard, ta, taMin, taMax, ALK_MONITOR_BUFFER);
  setRangeState(refs.chCard, ch, chMin, chMax, undefined, { max: 500 });
  setRangeState(refs.saltCard, salt, saltMin, saltMax, SALT_MONITOR_BUFFER);
  setRangeState(refs.borCard, n(refs.borFrom), borMin, borMax);


  const outCount = [
    refs.sFc.textContent,
    refs.sCya.textContent,
    refs.sPh.textContent,
    refs.sTa.textContent,
    refs.sCh.textContent,
    refs.sSalt.textContent
  ].filter((state) => state === 'Needs attention').length;

  if (!manualConditionSummaryOverride) {
    refs.statusClear.checked = outCount === 0;
    refs.statusMinor.checked = outCount > 0 && outCount < 3;
    refs.statusImmediate.checked = outCount >= 3;
  }

  const fcPlan = cleanResult(refs.fcResult.textContent);
  const tclPlan = cleanResult(refs.tclResult.textContent);
  const cyaPlan = cleanResult(refs.cyaResult.textContent);
  const phPlan = cleanResult(refs.phResult.textContent);
  const taPlan = cleanResult(refs.taResult.textContent);
  const chPlan = cleanResult(refs.chResult.textContent);
  const borPlan = cleanResult(refs.borResult.textContent);

  const saltPlan = cleanResult(refs.saltResult.textContent);
  const fcTarget = n(refs.fcTo);
  const fcAction = tested.fc
    ? buildFcTreatmentAction(fc, fcTarget, gallons, Math.max(0.1, n(refs.fcPercent, 6)))
    : '';
  const tclAction = tested.tcl && hasAction(tclPlan, 'No Total Chlorine') ? `TCL: ${tclPlan}` : '';
  const cyaAction = tested.cya && hasAction(cyaPlan, 'No CYA') ? `CYA: ${cyaPlan}` : '';
  const phAction = tested.ph && hasAction(phPlan, 'No pH') ? `pH: ${phPlan}` : '';
  const taAction = tested.ta && hasAction(taPlan, 'No Alk') ? `Alk: ${taPlan}` : '';
  const chAction = tested.ch && hasAction(chPlan, 'No CH') ? `CH: ${chPlan}` : '';
  const borAction = tested.bor && hasAction(borPlan, 'No borate') ? `Borate: ${borPlan}` : '';
  const saltAction = tested.salt && !saltPlan.startsWith('No salt') ? `Salt: ${saltPlan}` : '';

  const treatmentItems = [fcAction, tclAction, cyaAction, phAction, taAction, chAction, saltAction, borAction].filter(Boolean);
  if (Number(n(refs.chlorinePop)) === 2) {
    const swgRuntime = n(refs.swgRuntime, 8);
    const swgAction = buildSwgRecommendation(gallons, cya, getPoolTempF(), weeklyAvgUV, swgRuntime);
    if (swgAction) treatmentItems.push(swgAction);
  }
  if (!treatmentItems.length) {
    treatmentItems.push('No immediate chemical balancing action required today.');
  }

  // ── Elite Pool Forecast Plan ─────────────────────────────────────────────
  // Goal: add chemicals TODAY to reach the BOTTOM of each target range after 7 days.
  // No mid-week adjustments assumed. One dose, one week.
  // Sources:
  //   FC/CYA:  TroubleFreePool (CYA/UV relationship, daily demand)
  //   Temp+UV: pool water temperature input + Open-Meteo daily uv_index_max
  //   pH rise: Orenda Tech (CO2 off-gassing / Henry's Law)
  const forecastItems = [];
  const tempF    = getPoolTempF();
  const blPct    = Math.max(0.1, n(refs.fcPercent, 6));
  const aeration = refs.phAeration ? refs.phAeration.value : 'medium';
  let forecastUsesAcid = false;

  if (weatherModelSource === 'current') {
    forecastItems.push('Weather model note: 5-day forecast inputs were unavailable, so this forecast plan is temporarily using current weather conditions.');
  } else if (weatherModelSource === 'baseline') {
    forecastItems.push('Weather model note: Weather inputs are unavailable, so this forecast plan is using baseline assumptions (80F, UV 7).');
  }

  // ── FC ──────────────────────────────────────────────────────────────────
  if (tested.fc) {
    const dailyLoss  = fcDailyLossRate(tempF, cya, weeklyAvgUV);
    const weeklyLoss = Math.round(dailyLoss * 7 * 10) / 10;
    // Strategy: raise FC now with liquid chlorine (up to FC max), then use trichlor
    // for remaining 7-day maintenance demand while respecting CYA limits.
    const maxBleachPpmToday = Math.max(0, fcMax - fc);
    const bleachPpm = maxBleachPpmToday;
    const bleachOz = bleachOzForDose(bleachPpm, gallons, blPct);
    const immediateFc = fc + bleachPpm;
    const requiredPuckPpm = Math.max(0, Math.round((fcMin - (immediateFc - weeklyLoss)) * 10) / 10);
    const uvLabel     = weeklyAvgUV >= 8 ? 'high' : weeklyAvgUV >= 5 ? 'moderate' : 'low';
    if ((bleachPpm > 0 || requiredPuckPpm > 0) && gallons > 0) {
      const ppmPerPuck = ppmPerTrichlorPuck(gallons);
      const cyaPerPuck = cyaPpmPerTrichlorPuck(gallons);
      const targetPucksByDose = ppmPerPuck > 0 ? Math.ceil(requiredPuckPpm / ppmPerPuck) : 0;
      const maxPucksByCya = tested.cya && cyaPerPuck > 0
        ? Math.max(0, Math.floor((cyaMax - cya) / cyaPerPuck))
        : 0;
      const puckCount = Math.max(0, Math.min(targetPucksByDose, maxPucksByCya));
      const puckPpm = puckCount * ppmPerPuck;
      const puckCyaPpm = puckCount * cyaPerPuck;
      const projectedNextVisit = Math.max(0, Math.round((fc + bleachPpm + puckPpm - weeklyLoss) * 10) / 10);
      const projectedCyaWithPucks = cya + puckCyaPpm;

      const parts = [];
      if (puckCount > 0) {
        parts.push(`${puckCount} trichlor puck${puckCount > 1 ? 's' : ''}`);
      }
      if (bleachPpm > 0.1) {
        parts.push(`${fmtOz(bleachOz)} of ${blPct}% liquid bleach`);
      }

      let fcLine = parts.length
        ? `FC: Add ${parts.join(' + ')} today.`
        : `FC: No practical FC dose can be added today without exceeding the max target (${fcMax} ppm).`;

      if (bleachPpm > 0.1) {
        fcLine += ` Immediate effect: liquid chlorine raises FC from ~${fc.toFixed(1)} to ~${immediateFc.toFixed(1)} ppm today`;
        fcLine += ` (max target: ${fcMax} ppm).`;
      }

      if (puckCount > 0) {
        fcLine += ` Trichlor adds ~${puckPpm.toFixed(1)} ppm FC and ~${puckCyaPpm.toFixed(1)} ppm CYA over the week`;
        if (tested.cya) {
          fcLine += `, keeping CYA near ~${projectedCyaWithPucks.toFixed(1)} ppm (high limit: ${cyaMax} ppm).`;
        } else {
          fcLine += '.';
        }
      }

      if (puckCount < targetPucksByDose && tested.cya) {
        fcLine += ` Full weekly target is limited by CYA max (${cyaMax} ppm), so plan a mid-week liquid chlorine top-up if needed.`;
      }

      fcLine += ` Projected ~${projectedNextVisit.toFixed(1)} ppm at next visit (min: ${fcMin} ppm). Demand: ~${dailyLoss} ppm/day at ${Math.round(tempF)}°F, UV avg ${weeklyAvgUV} (${uvLabel}), CYA ${Math.round(cya)} ppm.`;
      forecastItems.push(fcLine);
    } else {
      const fcEnd = Math.max(Math.round((fc - weeklyLoss) * 10) / 10, 0).toFixed(1);
      forecastItems.push(
        `FC: No dose needed today. Projected ~${fcEnd} ppm at next visit (min: ${fcMin} ppm). Demand: ~${dailyLoss} ppm/day at ${Math.round(tempF)}°F, UV avg ${weeklyAvgUV} (${uvLabel}), CYA ${Math.round(cya)} ppm.`
      );
    }
  }

  // ── CYA ─────────────────────────────────────────────────────────────────
  // CYA degrades ~1-2 ppm/week (faster above 85°F per TFP). Dose today if projected low.
  if (tested.cya) {
    const cyaWeeklyLoss = tempF >= 85 ? 2 : 1;
    const cyaProjected  = Math.round(cya - cyaWeeklyLoss);

    if (cyaProjected >= cyaMin) {
      forecastItems.push(
        `CYA: No addition today. Projected ~${cyaProjected} ppm at next visit (min: ${cyaMin} ppm; ~${cyaWeeklyLoss} ppm/week at ${Math.round(tempF)}\u00b0F).`
      );
    } else {
      forecastItems.push(
        `CYA: Add stabilizer today to at least ${cyaMin} ppm (currently ${Math.round(cya)} ppm; ` +
        `will lose ~${cyaWeeklyLoss} ppm this week). Low CYA accelerates FC burn-off.`
      );
    }
  }

  // ── pH ──────────────────────────────────────────────────────────────────
  // Strategy: lower pH today toward the BOTTOM of range so natural CO2 off-gassing
  // (driven by aeration) rises through the week. Aeration level selected in pH card.
  if (tested.ph) {
    const phRise = phWeeklyRise(taForPhModel, aeration);
    // Forecast target is the bottom of the range because pH naturally rises through the week.
    const phTargetStart  = Math.max(7.0, Math.round(phMin * 100) / 100);
    const phEndProjected = Math.round((ph + phRise) * 100) / 100;
    const aerLabel       = aeration.charAt(0).toUpperCase() + aeration.slice(1);
    const bor = i(refs.borFrom, 0);

    if (ph < phMin) {
      // pH is below minimum — recommend raising with borax or soda ash.
      // Use the same polynomial model as calcPH().
      const phr_raw = (phMin - ph) * gallons;
      const phr_mid = (ph + phMin) / 2;
      const phr_adj = (192.1626 + -60.1221 * phr_mid + 6.0752 * phr_mid * phr_mid + -0.1943 * phr_mid * phr_mid * phr_mid) * (taForPhModel + 13.91) / 114.6;
      const phr_xco = (-5.476259 + 2.414292 * phr_mid + -0.355882 * phr_mid * phr_mid + 0.01755 * phr_mid * phr_mid * phr_mid) * bor;
      const phr_extra = phr_xco * phr_raw;
      const phr_delta = phr_raw * phr_adj;
      const sodaAshOz = phr_delta / 218.68 + phr_extra / 218.68;
      const boraxOz   = phr_delta / 110.05 + phr_extra / 110.05;
      const phAfterRaise = Math.min(phMin + phRise, phMax);
      forecastItems.push(
        `pH: Below minimum (${ph.toFixed(1)} < ${phMin}) — raise pH today. ` +
        `Add ${putWeight(sodaAshOz)} by weight or ${putVolume(sodaAshOz * 0.8715)} by volume of washing soda/soda ash → pH ~${ph.toFixed(1)} to ~${phMin.toFixed(1)}. ` +
        `Or add ${putWeight(boraxOz)} by weight or ${putVolume(boraxOz * 0.9586)} by volume of borax → pH ~${ph.toFixed(1)} to ~${phMin.toFixed(1)}. ` +
        `(Borax preferred: smaller Alk impact.) ` +
        `Natural CO2 off-gassing (+${phRise.toFixed(2)}/week, Alk ${Math.round(ta)} ppm, ${aerLabel} aeration) → ~${phAfterRaise.toFixed(1)} by next visit (target: ${phMin}–${phMax}).`
      );
    } else if (ph <= phTargetStart) {
      forecastItems.push(
        `pH: No adjustment needed today. Natural CO2 off-gassing (+${phRise.toFixed(2)}/week, Alk ${Math.round(ta)} ppm, ${aerLabel} aeration) → ~${Math.min(ph + phRise, phMax).toFixed(1)} by next visit.`
      );
    } else if (phEndProjected <= phMax) {
      forecastItems.push(
        `pH: No acid dose needed today — projected ~${phEndProjected.toFixed(1)} by next visit (max: ${phMax}). Natural rise +${phRise.toFixed(2)}/week at Alk ${Math.round(ta)} ppm (${aerLabel} aeration) stays in range.`
      );
    } else {
      // Compute acid doses using the exact same pH-acid model as treatment plan.
      forecastUsesAcid = true;
      const maStrength = Number(n(refs.maPop));
      const forecastOz = muriaticAcidOzForPhDrop(ph, phTargetStart, taForPhModel, bor, gallons, maStrength);
      // Compare rounded recommendation amounts to match what user sees in the UI text.
      const treatmentDisplayedOz = parseDisplayedOz(phPlan);
      const treatmentOz = Number.isFinite(treatmentDisplayedOz)
        ? treatmentDisplayedOz
        : muriaticAcidOzForPhDrop(ph, n(refs.phTo), taForPhModel, bor, gallons, maStrength);
      const forecastRounded = Math.round(forecastOz);
      const treatmentRounded = Math.round(treatmentOz);
      let doseNote = '';
      if (treatmentRounded > 0 && forecastRounded < treatmentRounded) {
        doseNote = ` This is LESS than today's treatment plan because the forecast targets the BOTTOM of the pH range (${phMin}) for a natural weekly rise.`;
      } else if (treatmentRounded > 0 && forecastRounded > treatmentRounded) {
        doseNote = ` This is MORE than today's treatment plan because the forecast starts at the range bottom and models weekly upward drift.`;
      }
      forecastItems.push(
        `pH: Add ${formatPhVolume(forecastOz)} muriatic acid today → pH ${phTargetStart.toFixed(2)}.${doseNote} Natural +${phRise.toFixed(2)}/week rise (Alk ${Math.round(taForPhModel)} ppm, ${aerLabel} aeration) → ~${Math.min(phTargetStart + phRise, phMax).toFixed(2)} by next visit (target: ${phMin}–${phMax}).`
      );
    }
  }

  // ── Alk ─────────────────────────────────────────────────────────────────
  // Alk (Total Alkalinity) is influenced by acid additions for pH and can be corrected with baking soda when low.
  if (tested.ta) {
    const taWeeklyDrop = forecastUsesAcid ? 8 : 3;
    const taProjected  = Math.round(ta - taWeeklyDrop);

    if (ta > taMax) {
      forecastItems.push(
        `Alk: High at ${Math.round(ta)} ppm \u2014 no bicarbonate dose today. pH-control acid will reduce it ~${taWeeklyDrop} ppm/week toward target (${taMin}\u2013${taMax} ppm).`
      );
    } else if (taProjected >= taMin) {
      forecastItems.push(
        `Alk: Stable \u2014 no dose needed today. Projected ~${taProjected} ppm at next visit (target: ${taMin}\u2013${taMax} ppm).`
      );
    } else {
      const taBoostNeeded = taMin - taProjected;
      const bakingSodaOz = taBoostNeeded * gallons / BAKING_SODA_TA_OZMUL;
      const taImmediate = Math.round(ta + taBoostNeeded);
      const taNextVisit = Math.round(taImmediate - taWeeklyDrop);
      forecastItems.push(
        `Alk: Projected ~${taProjected} ppm \u2014 below minimum (${taMin} ppm). ` +
        `Add ~${putWeightLbsOz(bakingSodaOz)} (${Math.round(bakingSodaOz)} oz) of baking soda today. ` +
        `Immediate effect today: Alk ~${Math.round(ta)} \u2192 ~${taImmediate} ppm. ` +
        `1-week projection after normal drift (~${taWeeklyDrop} ppm): ~${taNextVisit} ppm (target: ${taMin}\u2013${taMax} ppm).`
      );
    }
  }

  // ── CH ──────────────────────────────────────────────────────────────────
  // CH is stable over 7 days — no dose needed for the forecast window.
  if (tested.ch) {
    if (ch >= chMin && ch <= chMax) {
      forecastItems.push(
        `CH: Stable \u2014 no calcium dose needed today. Projected to hold near ${Math.round(ch)} ppm at next visit (target: ${chMin}\u2013${chMax} ppm).`
      );
    } else {
      forecastItems.push(
        chAction
          ? `CH: ${chAction.replace(/^CH:\s*/, '')} \u2014 no further change expected after today's dose.`
          : `CH: At ${Math.round(ch)} ppm against target ${chMin}\u2013${chMax} ppm \u2014 review at next visit.`
      );
    }
  }

  // ── Salt ────────────────────────────────────────────────────────────────
  // Salt is stable week-to-week; only rainfall or water replacement changes it.
  if (tested.salt) {
    if (salt >= saltMin && salt <= saltMax) {
      forecastItems.push(
        `Salt: Stable \u2014 no addition today. Projected to hold near ${Math.round(salt)} ppm at next visit (target: ${saltMin}\u2013${saltMax} ppm).`
      );
    } else {
      forecastItems.push(
        saltAction
          ? `Salt: ${saltAction.replace(/^Salt:\s*/, '')} \u2014 retest at next visit after today's correction.`
          : `Salt: At ${Math.round(salt)} ppm against target ${saltMin}\u2013${saltMax} ppm \u2014 adjust today and retest at next visit.`
      );
    }
  }

  // ── Borate ──────────────────────────────────────────────────────────────
  if (tested.bor) {
    forecastItems.push(
      borAction
        ? `Borate: ${borAction.replace(/^Borate:\s*/, '')} \u2014 retest at next visit.`
        : `Borate: Stable \u2014 projected near target (${Math.round(n(refs.borTo))} ppm). Borate will help buffer pH drift through the week.`
    );
  }

  if (!forecastItems.length) {
    forecastItems.push('No forecast items are shown because no Chemistry Targets "Now" values were entered.');
  }

  setChecklist(refs.rTreatmentList, treatmentItems);
  setChecklist(refs.rForecastList, forecastItems);
  updateTechnicianInsightsFromChecks();
}

function expandReportInsightsForPrint() {
  if (!refs.rInsights) return;

  const style = window.getComputedStyle(refs.rInsights);
  const lineHeight = Number.parseFloat(style.lineHeight) || 20;
  const paddingY = (Number.parseFloat(style.paddingTop) || 0) + (Number.parseFloat(style.paddingBottom) || 0);
  const minHeight = Math.round(lineHeight * 3 + paddingY + 2);
  const maxHeight = Math.round(lineHeight * 6 + paddingY + 2);

  refs.rInsights.rows = 3;
  refs.rInsights.style.minHeight = `${minHeight}px`;
  refs.rInsights.style.maxHeight = `${maxHeight}px`;
  refs.rInsights.style.height = 'auto';
  const desired = Math.min(Math.max(refs.rInsights.scrollHeight, minHeight), maxHeight);
  refs.rInsights.style.height = `${desired}px`;
  refs.rInsights.style.overflowY = refs.rInsights.scrollHeight > maxHeight ? 'auto' : 'hidden';

  if (refs.rInsightsPrint) {
    refs.rInsightsPrint.textContent = refs.rInsights.value;
  }

  updateServiceChecklistState();
}

function updateServiceChecklistState(root = document) {
  const checklist = root.getElementById('r-service-checklist');
  const checklistSection = root.getElementById('report-service-checklist');
  if (!checklist || !checklistSection) return;

  let hasNonChemicalChecked = false;
  checklist.querySelectorAll('.service-check-item').forEach((item) => {
    const box = item.querySelector('input[type="checkbox"]');
    const checked = Boolean(box?.checked);
    item.classList.toggle('is-checked', checked);
    const isChemicalBalanced = item.dataset.chemicalBalanced === '1';
    if (checked && !isChemicalBalanced) hasNonChemicalChecked = true;
  });

  checklistSection.dataset.hasChecked = hasNonChemicalChecked ? '1' : '0';
}

function getCheckboxLabelText(checkbox) {
  const label = checkbox?.closest('label');
  if (!label) return '';

  const span = label.querySelector('span');
  if (span) return String(span.textContent || '').trim();
  return String(label.textContent || '').replace(/\s+/g, ' ').trim();
}

function getCheckedChecklistLabels(listEl) {
  if (!listEl) return [];
  return Array.from(listEl.querySelectorAll('input[type="checkbox"]:checked'))
    .map(getCheckboxLabelText)
    .filter(Boolean);
}

function stripAutoInsightLines(text) {
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

  return String(text || '')
    .split(/\r?\n/)
    .filter((line) => !autoPatterns.some((pattern) => pattern.test(line.trim())))
    .join('\n')
    .trim();
}

function buildChemicalInsightLinesFromChecks() {
  const checkedTexts = [
    ...getCheckedChecklistLabels(refs.rTreatmentList),
    ...getCheckedChecklistLabels(refs.rForecastList)
  ];

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

function buildServiceChecklistCompletedLine() {
  if (!refs.rServiceChecklist) return '';

  const chemicalBalancedItem = refs.rServiceChecklist.querySelector('.service-check-item[data-chemical-balanced="1"]');
  const chemicalBalancedChecked = Boolean(chemicalBalancedItem?.querySelector('input[type="checkbox"]')?.checked);

  const completed = Array.from(refs.rServiceChecklist.querySelectorAll('.service-check-item'))
    .filter((item) => item.dataset.chemicalBalanced !== '1')
    .filter((item) => item.querySelector('input[type="checkbox"]')?.checked)
    .map((item) => {
      const box = item.querySelector('input[type="checkbox"]');
      return getCheckboxLabelText(box);
    })
    .filter(Boolean);

  if (!completed.length) return '';
  if (chemicalBalancedChecked) completed.unshift('Chemicals Balanced');
  return `The following service checklist items were completed during this visit: ${completed.join(', ')}.`;
}

function updateTechnicianInsightsFromChecks() {
  if (!refs.rInsights) return;

  const manualBase = stripAutoInsightLines(refs.rInsights.value);
  const autoLines = buildChemicalInsightLinesFromChecks().map((line) => `- ${line}`);
  const serviceLine = buildServiceChecklistCompletedLine();
  if (serviceLine) autoLines.push(serviceLine);

  const nextValue = autoLines.length
    ? `${manualBase ? `${manualBase}\n` : ''}${autoLines.join('\n')}`
    : manualBase;

  if (refs.rInsights.value !== nextValue) {
    refs.rInsights.value = nextValue;
  }

  expandReportInsightsForPrint();
}

function setReportMode(enabled) {
  document.body.classList.toggle('report-mode', enabled);
  refs.reportView.hidden = !enabled;
  if (enabled) updateReport();
}

function applyCustomerSectionsVisibility() {
  if (refs.serviceDetailsSection) refs.serviceDetailsSection.hidden = !customerSectionsVisible;
  if (refs.rRowCustomer) refs.rRowCustomer.hidden = !customerSectionsVisible;
  if (refs.rRowAddress) refs.rRowAddress.hidden = !customerSectionsVisible;
  if (refs.rRowEmailAddress) refs.rRowEmailAddress.hidden = !customerSectionsVisible;
  if (refs.reportTechInsights) refs.reportTechInsights.hidden = false;
  if (refs.reportEliteDifference) refs.reportEliteDifference.hidden = false;
}

function resolveWeatherForecastFallback(force = false) {
  if (!refs.weatherForecast) return;

  const text = String(refs.weatherForecast.value || '').trim();
  const pendingText = /^(loading\s*5-?day\s*forecast|waiting for weather permission and forecast data)/i.test(text);
  const shouldFallback = !text || pendingText;
  if (!shouldFallback) return;

  if (Number.isFinite(weeklyAvgTemp) && Number.isFinite(weeklyAvgUV)) {
    refs.weatherForecast.value = `Forecast baseline, ${Math.round(weeklyAvgTemp)}F (feels ${Math.round(weeklyAvgTemp)}F), wind 0 mph, UV ${weeklyAvgUV}`;
  } else {
    refs.weatherForecast.value = 'Forecast unavailable (location permission or weather service issue).';
  }
}

async function loadWeather() {
  try {
    let latitude;
    let longitude;
    let locationName = '';

    if (typeof navigator !== 'undefined' && navigator.geolocation) {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: false,
            timeout: 6000,
            maximumAge: 300000
          });
        });
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
      } catch {
        refs.weatherConditions.value = '';
        weatherModelSource = 'baseline';
        if (refs.weatherForecast) {
          refs.weatherForecast.value = 'Forecast unavailable (location blocked).';
        }
        if (refs.weatherLabelText) {
          refs.weatherLabelText.textContent = 'Current weather conditions';
        }
        return;
      }
    } else {
      refs.weatherConditions.value = '';
      weatherModelSource = 'baseline';
      if (refs.weatherForecast) {
        refs.weatherForecast.value = 'Forecast unavailable (geolocation not supported).';
      }
      if (refs.weatherLabelText) {
        refs.weatherLabelText.textContent = 'Current weather conditions';
      }
      return;
    }

    // Try to resolve a human-friendly location name for the weather label.
    try {
      const reverseUrl = `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${latitude}&longitude=${longitude}&count=1&language=en&format=json`;
      const reverseResponse = await fetch(reverseUrl);
      if (reverseResponse.ok) {
        const reversePayload = await reverseResponse.json();
        const place = reversePayload?.results?.[0];
        if (place) {
          const city = place.name || '';
          const county = place.admin2 || '';
          const state = place.admin1 || '';
          if (city) {
            locationName = state ? `${city}, ${state}` : city;
          } else if (county) {
            locationName = county.includes('County') ? county : `${county} County`;
          }
        }
      }
    } catch {
      // Keep existing location label when reverse lookup fails.
    }

    // Fallback reverse geocoding provider when Open-Meteo has no usable place data.
    if (!locationName) {
      try {
        const bdcUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
        const bdcResponse = await fetch(bdcUrl);
        if (bdcResponse.ok) {
          const bdcPayload = await bdcResponse.json();
          const city = bdcPayload.city || bdcPayload.locality || bdcPayload.localityInfo?.administrative?.[2]?.name || '';
          const state = bdcPayload.principalSubdivision || '';
          const county = bdcPayload.localityInfo?.administrative?.find((item) => item.order === 5)?.name || '';

          if (city) {
            locationName = state ? `${city}, ${state}` : city;
          } else if (county) {
            locationName = county.includes('County') ? county : `${county} County`;
          }
        }
      } catch {
        // Keep generic label if fallback provider is unavailable.
      }
    }

    if (refs.weatherLabelText) {
      refs.weatherLabelText.textContent = locationName
        ? `Current weather conditions (${locationName})`
        : 'Current weather conditions';
    }

    // Include current and next-5-day forecast fields used in the UI and chemistry forecast model.
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m,uv_index&daily=weather_code,temperature_2m_max,apparent_temperature_max,wind_speed_10m_max,uv_index_max&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=auto`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Weather fetch failed');
    const payload = await response.json();
    const current = payload.current;
    const currentLabel = weatherCodeLabel(Number(current.weather_code));
    const currentUv = Number.isFinite(Number(current.uv_index))
      ? Math.round(Number(current.uv_index) * 10) / 10
      : averageFirstDays(payload.daily?.uv_index_max, 1, 1);
    refs.weatherConditions.value = `${currentLabel}, ${Math.round(current.temperature_2m)}F (feels ${Math.round(current.apparent_temperature)}F), wind ${Math.round(current.wind_speed_10m)} mph, UV ${currentUv}`;

    const forecastCount = 5;
    const forecastUv = averageFirstDays(payload.daily?.uv_index_max, forecastCount, 1);
    const forecastTemp = averageFirstDays(payload.daily?.temperature_2m_max, forecastCount, 0);
    const forecastFeels = averageFirstDays(payload.daily?.apparent_temperature_max, forecastCount, 0);
    const forecastWind = averageFirstDays(payload.daily?.wind_speed_10m_max, forecastCount, 0);
    const forecastLabel = dominantWeatherLabel(payload.daily?.weather_code, forecastCount);

    const hasForecastTemp = Number.isFinite(forecastTemp);
    const hasForecastUv = Number.isFinite(forecastUv);
    const currentTemp = Number(current.temperature_2m);
    const currentFeels = Number(current.apparent_temperature);
    const currentWind = Number(current.wind_speed_10m);
    const currentUvValue = Number(currentUv);

    if (hasForecastUv) {
      weeklyAvgUV = forecastUv;
    } else if (Number.isFinite(currentUvValue)) {
      weeklyAvgUV = currentUvValue;
    }
    if (hasForecastTemp) {
      weeklyAvgTemp = forecastTemp;
    } else if (Number.isFinite(currentTemp)) {
      weeklyAvgTemp = currentTemp;
    }

    const usingCurrentFallback = !hasForecastTemp || !hasForecastUv;
    weatherModelSource = usingCurrentFallback ? 'current' : 'forecast';

    if (refs.weatherForecast) {
      refs.weatherForecast.value = usingCurrentFallback
        ? `Current weather fallback, ${Math.round(currentTemp || weeklyAvgTemp)}F (feels ${Math.round(currentFeels || weeklyAvgTemp)}F), wind ${Math.round(currentWind || 0)} mph, UV ${Number.isFinite(currentUvValue) ? currentUvValue : weeklyAvgUV}`
        : `${forecastLabel}, ${Math.round(forecastTemp || weeklyAvgTemp)}F (feels ${Math.round(forecastFeels || weeklyAvgTemp)}F), wind ${Math.round(forecastWind || 0)} mph, UV ${Number.isFinite(forecastUv) ? forecastUv : weeklyAvgUV}`;
    }
  } catch (err) {
    refs.weatherConditions.value = '';
    weatherModelSource = 'baseline';
    if (refs.weatherForecast) {
      refs.weatherForecast.value = 'Forecast unavailable (weather service error).';
    }
    if (refs.weatherLabelText) {
      refs.weatherLabelText.textContent = 'Current weather conditions';
    }
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
    lines.push(`Add ${putWeight(up)} by weight or ${putVolume(up * 0.8715)} by volume of washing soda/soda ash today → pH ~${round2(from)} to ~${round2(to)}.`);
    up = delta / 110.05 + extra / 110.05;
    lines.push(`Or add ${putWeight(up)} by weight or ${putVolume(up * 0.9586)} by volume of borax today → pH ~${round2(from)} to ~${round2(to)}.`);
  }

  if (from > to) {
    const down = delta / -240.15 * mamul[ma] + extra / -240.15 * mamul[ma];
    lines.push(`Add ${formatPhVolume(down)} of ${data.maPop[ma]} muriatic acid today → pH ~${round2(from)} to ~${round2(to)}.`);
  }

  refs.phResult.innerHTML = lines.length ? lines.join('<br>') : 'No pH adjustment required.';
}

function calcTA() {
  const from = i(refs.taFrom, 100);
  const to = i(refs.taTo, 100);
  if (from >= to) {
    refs.taResult.innerHTML = 'No Alk increase required. Lower Alk by reducing pH to 7.0-7.2 and aerating.';
    return;
  }

  const taRise = to - from;
  const amountOz = taRise * getGallons() / BAKING_SODA_TA_OZMUL;
  refs.taResult.innerHTML = `Add ${putWeightLbsOz(amountOz)} (${Math.round(amountOz)} oz) of baking soda today → Alk ~${from} to ~${to} ppm.`;
}

function calcCH() {
  const from = i(refs.chFrom, 260);
  const to = i(refs.chTo, 260);
  const fill = i(refs.chFill, 0);

  if (from < to) {
    let amount = (to - from) * getGallons() / 6754.11;
    const line1 = `Add ${putWeight(amount)} by weight or ${putVolume(amount * 0.7988)} by volume of calcium chloride today → CH ~${Math.round(from)} to ~${Math.round(to)} ppm.`;
    amount = (to - from) * getGallons() / 5098.82;
    const line2 = `Or add ${putWeight(amount)} by weight or ${putVolume(amount * 1.148)} by volume of calcium chloride dihydrate today → CH ~${Math.round(from)} to ~${Math.round(to)} ppm.`;
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

// Total Chlorine (TCL) = Free Chlorine (FC) + Combined Chlorine. There is no chemical that
// raises TCL without also raising FC, so this card is diagnostic: it flags Combined Chlorine
// buildup (TCL minus FC) and points back to the FC card's shock guidance when it is high.
function calcTCL() {
  const from = n(refs.tclFrom);
  const to = n(refs.tclTo, 4);
  const hasFc = refs.fcFrom.value.trim() !== '';
  const fcNow = n(refs.fcFrom);

  // Target range is the FC target up to +0.5 ppm — the maximum allowed Combined Chlorine
  // before shock is recommended. This gives the card a real range (like the other cards)
  // so the Monitor/near-range status can apply instead of only OK/Needs attention.
  refs.tclTargetRange.textContent = `Target range: ${round2(to)}-${round2(to + 0.5)} ppm`;

  if (!hasFc) {
    refs.tclResult.innerHTML = 'No Total Chlorine action required — enter Free Chlorine to calculate Combined Chlorine.';
    return;
  }

  const combined = round2(from - fcNow);
  if (combined > 0.5) {
    refs.tclResult.innerHTML = [
      `Combined Chlorine (Total − Free) is elevated at ${combined.toFixed(1)} ppm.`,
      'Shock the pool with liquid chlorine to break down chloramines (see FC card for dosing), then retest Total and Free Chlorine.'
    ].join('<br>');
    return;
  }

  refs.tclResult.innerHTML = `No Total Chlorine action required. Combined Chlorine is ${combined.toFixed(1)} ppm (0.5 ppm or less).`;
}

function calcCYA() {
  const from = i(refs.cyaFrom, 40);
  const to = i(refs.cyaTo, 40);

  if (from < to) {
    let amount = (to - from) * getGallons() / 7489.51;
    const line1 = `Add ${putWeight(amount)} by weight or ${putVolume(amount * 1.042)} by volume of stabilizer today → CYA ~${Math.round(from)} to ~${Math.round(to)} ppm.`;
    amount = (to - from) * getGallons() / 2890;
    const line2 = `Or add ${putVolume(amount)} of liquid stabilizer today → CYA ~${Math.round(from)} to ~${Math.round(to)} ppm.`;
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
  const hasSaltReading = refs.saltFrom.value.trim() !== '';
  const [saltMin, saltMax] = parseRange(refs.saltTargetRange.textContent, to, to);

  if (from < to) {
    if (hasSaltReading && Number(n(refs.chlorinePop)) !== 2) refs.chlorinePop.value = '2';
    const amount = (to - from) * getGallons() / 7468.64;
    const lbs = Math.floor(amount / 16 + 0.5);
    const optionalNote = from >= saltMin && from <= saltMax
      ? ` Optional: current salt (${Math.round(from)} ppm) is already in target range (${saltMin}-${saltMax}); this dose only moves to exact target ${Math.round(to)} ppm.`
      : '';
    refs.saltResult.innerHTML = `Add ${putLbs(amount)} of salt (${statusBags(lbs)}) today → salt ~${Math.round(from)} to ~${Math.round(to)} ppm.${optionalNote}`;
    return;
  }

  if (from > to) {
    const replacement = `${Math.floor(100 - (to / from) * 100 + 0.5)}%`;
    const optionalNote = from >= saltMin && from <= saltMax
      ? ` Optional: current salt (${Math.round(from)} ppm) is already in target range (${saltMin}-${saltMax}); lowering to exact target ${Math.round(to)} ppm is optional.`
      : '';
    refs.saltResult.innerHTML = `To lower salt, replace ${replacement} of the water to move ~${Math.round(from)} to ~${Math.round(to)} ppm.${optionalNote}`;
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
      `Add ${putWeight(amount)} by weight or ${byVol} by volume of ${data.borPop[type]} today → Borate ~${Math.round(from)} to ~${Math.round(to)} ppm.`,
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
    taGoal = chlorine === 1 ? '70 to 120' : chlorine === 2 ? '60 to 120' : '100 to 120';
    chGoal = surface === 1 ? '250 to 350' : surface === 2 ? '50 to 300' : '220 to 320';
    cyaGoal = chlorine === 2 ? '70 to 80' : '30 to 50';
    phRange = [7.5, 7.8];
    taRange = chlorine === 1 ? [70, 120] : chlorine === 2 ? [60, 120] : [100, 120];
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

  if (refs.tclAutoTarget && refs.tclAutoTarget.checked && !manualTargetOverride.tcl) {
    writeTargetValue(refs.tclTo, round2(n(refs.fcTo)));
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
  refs.saltTargetRange.textContent = `Target range: 2700-3400`;
  refs.borTargetRange.textContent = `Target: ${i(refs.borTo, 0)} ppm`;

  replaceWithBreaks(refs.goalResult, [
    `Suggested FC Levels: SWG ${swg}, Normal ${min}-${targ}, Shock ${shock}, Mustard ${mustard}.`,
    `FC Goal Band: ${fcGoal} (target ${fcRangeMin}-${targ} ppm).`,
    `Suggested Goals -> CYA: ${cyaGoal}, Alk: ${taGoal}, pH: ${phGoal}, CH: ${chGoal}.`,
    `Shock and SLAM use the same FC level here: ${shock} ppm at the current CYA. Reach it with liquid chlorine, then test and re-dose often enough to hold that FC until the water is clear, combined chlorine is 0.5 ppm or less, and overnight FC loss is 1 ppm or less.`,
    `Mustard algae cleanup is ${mustard} ppm after SLAM is complete.`
  ]);
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
  const idx = Number(n(refs.effPop));
  const unit = effUnits[idx];
  const system = Number(n(refs.units));
  let oz = effectAmountToBaseOz(n(refs.effOz), refs.effUnit.value, system, unit, idx);

  const g = getGallons();
  let result = '';

  switch (idx) {
    case 0:
      result = `raise FC by ${formatEffect(oz / g * 602.7525)} and raise Salt by ${formatEffect(oz / g * 991.66992)}`;
      break;
    case 1:
      result = `raise FC by ${formatEffect(oz / g * 669.6891)} and raise Salt by ${formatEffect(oz / g * 1101.64368)}`;
      break;
    case 2:
      result = `raise FC by ${formatEffect(oz / g * 781.2496)} and raise Salt by ${formatEffect(oz / g * 1285.6)}`;
      break;
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
      oz /= 2;
    case 12:
      result = `lower pH by ${round2(oz / g * 240.15)} and lower Alk by ${formatEffect(oz / g * 3911.47)}`;
      break;
    case 13:
      result = `lower pH by ${round2(oz / g * 167.9)} and lower Alk by ${formatEffect(oz / g * 2909.47)}`;
      break;
    case 14:
      result = `raise pH by ${round2(oz / g * 217.1)} and raise Alk by ${formatEffect(oz / g * 7072.46)}`;
      break;
    case 15:
      result = `raise pH by ${round2(oz / g * 109.1)}, raise Borate by ${formatEffect(oz / g * 849.271)}, and raise Alk by ${formatEffect(oz / g * 1949.93)}`;
      break;
    case 16:
      result = `raise pH by ${round2(oz / g * 166.8)}, raise Borate by ${formatEffect(oz / g * 1111.69)}, and raise Alk by ${formatEffect(oz / g * 2548.89)}`;
      break;
    case 17:
      result = `raise pH by ${round2(oz / g * 546.3)} and raise Alk by ${formatEffect(oz / g * 9135.78)}`;
      break;
    case 18:
      result = `raise Alk by ${formatEffect(oz / g * 4461.56)} and raise pH by ${round2(oz / g * 9.091)}`;
      break;
    case 19:
      result = `raise CH by ${formatEffect(oz / g * 6754.11)}`;
      break;
    case 20:
      result = `raise CH by ${formatEffect(oz / g * 5098.82)}`;
      break;
    case 21:
      result = `raise CYA by ${formatEffect(oz / g * 7489.51)} and lower pH by ${round2(oz / g * 138.8)}`;
      break;
    case 22:
      result = `raise CYA by ${formatEffect(oz / g * 2890)}`;
      break;
    case 23:
      result = `raise Salt by ${formatEffect(oz / g * 7468.64 * 16)}`;
      break;
    case 24:
      result = `raise FC by ${formatEffect(oz / g * 482.202 * 8.25 / 6)} and raise Salt by ${formatEffect(oz / g * 1607 * 8.25 / 12.5)}`;
      break;
    default:
      result = 'no change';
  }

  const amountValue = n(refs.effOz);
  const unitLabel = refs.effUnit.options[refs.effUnit.selectedIndex]?.textContent || refs.effUnit.value;
  const singularUnitLabel = Math.abs(amountValue - 1) < 0.0001 ? unitLabel.replace(/s$/, '') : unitLabel;
  refs.effResult.textContent = `Adding ${amountValue} ${singularUnitLabel} of ${data.effPop[idx]} will ${result}.`;
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

  syncEffectUnitControl(next, oldUnit, true);
  oldUnit = next;
}

function calcAll() {
  // calcSuggested() auto-syncs target fields (FC/Alk/CH/CYA/TCL) from the goal presets
  // before any dosing math runs, so calcFC()/calcTCL()/etc. read fresh target values
  // instead of a stale one from the previous render.
  calcSuggested();

  calcTCL();
  calcCH();
  calcFC();
  calcCYA();
  calcTA();
  calcPH();
  calcSalt();
  calcBorate();

  const csiFrom = csi(n(refs.phFrom), i(refs.taFrom), i(refs.chFrom), i(refs.cyaFrom), i(refs.saltFrom), i(refs.borFrom), n(refs.temp));
  const csiTo = csi(n(refs.phTo), i(refs.taTo), i(refs.chTo), i(refs.cyaTo), i(refs.saltTo), i(refs.borTo), n(refs.temp));
  refs.csiResult.innerHTML = `Now: ${csiFrom} (${statusCSI(csiFrom)})<br>Target: ${csiTo} (${statusCSI(csiTo)})`;

  calcPoolVolume();
  calcEffect();
  updatePassiveOutlook();
  updateReport();
}

// Opening/closing one collapsible panel in a two-column row mirrors its row partner.
function linkRowCollapsibles() {
  const isMobileViewport = () => window.matchMedia('(max-width: 980px)').matches;
  const isSideBySideRow = (panels) => {
    if (!panels || panels.length < 2) return false;
    const firstTop = panels[0].getBoundingClientRect().top;
    const secondTop = panels[1].getBoundingClientRect().top;
    return Math.abs(firstTop - secondTop) < 3;
  };

  let syncing = false;
  document.querySelectorAll('.grid.two > details.collapsible, .grid.mobile-two > details.collapsible').forEach((panel) => {
    if (panel.dataset.rowLinked === '1') return;
    panel.dataset.rowLinked = '1';
    panel.addEventListener('toggle', () => {
      if (syncing) return;
      syncing = true;
      const siblings = Array.from(panel.parentElement.querySelectorAll(':scope > details.collapsible'));
      if (isSideBySideRow(siblings)) {
        siblings.forEach((sibling) => {
          if (sibling !== panel) sibling.open = panel.open;
        });
      } else if (isMobileViewport()) {
        if (panel.open) {
          siblings.forEach((sibling) => {
            if (sibling !== panel) sibling.open = false;
          });
        }
      }
      syncing = false;
    });
  });

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
  reorderEffectsDropdownOptions();

  refs.fcJug.value = '0';
  refs.fcPop.value = '0';
  refs.maPop.value = '2';
  refs.borPop.value = '0';
  refs.fromPop.value = '1';
  refs.chlorinePop.value = '1';
  refs.surfacePop.value = '1';
  refs.szPop.value = '0';
  refs.effPop.value = '24';

  updateBuildBadge();
  setupUsageCounter();

  refs.openReport.addEventListener('click', () => {
    customerSectionsVisible = !customerSectionsVisible;
    applyCustomerSectionsVisibility();
    updateReport();
  });

  refs.backToApp.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  refs.printReport.addEventListener('click', () => {
    expandReportInsightsForPrint();
    window.print();
  });

  refs.rServiceChecklist?.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      updateServiceChecklistState();
      updateTechnicianInsightsFromChecks();
    });
  });

  refs.rTreatmentList?.addEventListener('change', (event) => {
    if (event.target instanceof HTMLInputElement && event.target.type === 'checkbox') {
      updateTechnicianInsightsFromChecks();
    }
  });

  refs.rForecastList?.addEventListener('change', (event) => {
    if (event.target instanceof HTMLInputElement && event.target.type === 'checkbox') {
      updateTechnicianInsightsFromChecks();
    }
  });

  refs.rInsights?.addEventListener('input', () => {
    expandReportInsightsForPrint();
  });

  // Gmail email functionality
  const POOL_CALC_CLIENT_ID = '401370888475-3mo4smpbf7r0l39gmk776d2g1vird0eu.apps.googleusercontent.com';
  const POOL_CALC_SCOPES = ['https://www.googleapis.com/auth/gmail.send'];
  let poolCalcTokenClient = null;
  let poolCalcAccessToken = null;
  let poolCalcGisLoaded = false;
  let pendingSendEmailAddress = null;

  function initPoolCalcTokenClient() {
    try {
      if (!window.google || !window.google.accounts || !window.google.accounts.oauth2) {
        console.error('Google library not loaded yet');
        setTimeout(initPoolCalcTokenClient, 500);
        return;
      }

      poolCalcTokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: POOL_CALC_CLIENT_ID,
        scope: POOL_CALC_SCOPES.join(' '),
        callback: (tokenResponse) => {
          if (tokenResponse.error !== undefined) {
            console.error('OAuth error:', tokenResponse.error);
            alert('Authentication failed: ' + tokenResponse.error);
            return;
          }
          poolCalcAccessToken = tokenResponse.access_token;
          console.log('Pool Calc: Access token obtained');
          sendPoolCalcReport();
        },
      });
      poolCalcGisLoaded = true;
      console.log('Pool Calc: Token client initialized successfully');
    } catch (error) {
      console.error('Failed to initialize token client:', error);
      setTimeout(initPoolCalcTokenClient, 500);
    }
  }

  function requestPoolCalcAccessToken() {
    if (poolCalcTokenClient && poolCalcGisLoaded) {
      poolCalcTokenClient.requestAccessToken({ hint: '' });
    } else {
      alert('Google authentication not ready. Please refresh the page.');
    }
  }

  function promptForEmailAddress(defaultValue) {
    return new Promise((resolve) => {
      const overlay = refs.emailModalOverlay;
      const input = refs.emailModalInput;
      const confirmBtn = refs.emailModalConfirm;
      const cancelBtn = refs.emailModalCancel;

      if (!overlay || !input || !confirmBtn || !cancelBtn) {
        resolve(window.prompt('Enter the email address to send the report to:', defaultValue || '') || '');
        return;
      }

      input.value = defaultValue || '';
      overlay.hidden = false;
      input.focus();
      input.select();

      function cleanup(result) {
        overlay.hidden = true;
        confirmBtn.removeEventListener('click', onConfirm);
        cancelBtn.removeEventListener('click', onCancel);
        overlay.removeEventListener('click', onOverlayClick);
        input.removeEventListener('keydown', onKeydown);
        resolve(result);
      }

      function onConfirm() {
        cleanup(input.value.trim());
      }

      function onCancel() {
        cleanup('');
      }

      function onOverlayClick(event) {
        if (event.target === overlay) cleanup('');
      }

      function onKeydown(event) {
        if (event.key === 'Enter') {
          event.preventDefault();
          onConfirm();
        } else if (event.key === 'Escape') {
          onCancel();
        }
      }

      confirmBtn.addEventListener('click', onConfirm);
      cancelBtn.addEventListener('click', onCancel);
      overlay.addEventListener('click', onOverlayClick);
      input.addEventListener('keydown', onKeydown);
    });
  }

  async function resolveReportEmailAddress() {
    const currentEmail = refs.emailAddress.value.trim();
    const shouldPrompt = !customerSectionsVisible || !currentEmail;

    if (!shouldPrompt) {
      return currentEmail;
    }

    const promptValue = await promptForEmailAddress(currentEmail);
    if (!promptValue) {
      return '';
    }

    refs.emailAddress.value = promptValue;
    return promptValue;
  }

  async function buildEmailReadyReportHtml() {
    const reportElement = document.querySelector('.report-sheet');
    if (!reportElement) return { html: '', images: [] };

    customerSectionsVisible = true;
    applyCustomerSectionsVisibility();
    refs.reportView.hidden = false;
    refs.reportView.style.display = 'block';

    if (refs.rInsights) {
      refs.rInsights.style.height = '72px';
      refs.rInsights.style.minHeight = '72px';
      refs.rInsights.rows = 3;
      refs.rInsights.style.resize = 'vertical';
      expandReportInsightsForPrint();
    }

    if (refs.reportTechInsights) refs.reportTechInsights.hidden = false;
    if (refs.reportEliteDifference) refs.reportEliteDifference.hidden = false;

    updateReport();

    const clone = reportElement.cloneNode(true);
    const inlineImages = [];

    clone.querySelector('.report-two-col.no-print')?.remove();
    [
      ['#r-row-customer', refs.customerName],
      ['#r-row-address', refs.customerAddress],
      ['#r-row-email-address', refs.emailAddress]
    ].forEach(([selector, input]) => {
      if (!input.value.trim()) clone.querySelector(selector)?.remove();
    });
    clone.querySelectorAll('.report-insights-print').forEach((el) => el.remove());

    const cloneServiceChecklist = clone.querySelector('#r-service-checklist');
    const cloneServiceChecklistSection = clone.querySelector('#report-service-checklist');
    if (cloneServiceChecklist && cloneServiceChecklistSection) {
      let hasNonChemicalChecked = false;
      cloneServiceChecklist.querySelectorAll('.service-check-item').forEach((item) => {
        const box = item.querySelector('input[type="checkbox"]');
        const isChemicalBalanced = item.dataset.chemicalBalanced === '1';
        if (box?.checked && !isChemicalBalanced) hasNonChemicalChecked = true;
      });

      if (!hasNonChemicalChecked) {
        cloneServiceChecklistSection.remove();
      } else {
      cloneServiceChecklist.querySelectorAll('.service-check-item').forEach((item) => {
        const box = item.querySelector('input[type="checkbox"]');
        if (!box?.checked) item.remove();
      });
        if (!cloneServiceChecklist.querySelector('.service-check-item')) {
          cloneServiceChecklistSection.remove();
        } else {
          cloneServiceChecklistSection.dataset.hasChecked = '1';
        }
      }
    }

    clone.querySelectorAll('textarea').forEach((textarea) => {
      const value = textarea.value || '';
      const block = document.createElement('div');
      block.className = 'report-notes';
      block.textContent = value;
      block.style.whiteSpace = 'pre-wrap';
      block.style.minHeight = '72px';
      block.style.lineHeight = '1.5';
      block.style.color = '#071b43';
      block.style.padding = '8px 10px';
      block.style.border = '1px solid #c7d8ee';
      block.style.borderRadius = '6px';
      block.style.background = '#f9fbff';
      textarea.replaceWith(block);
    });

    clone.querySelectorAll('input[type="checkbox"]').forEach((input) => {
      const mark = document.createElement('span');
      mark.textContent = input.checked ? '☑' : '☐';
      mark.style.display = 'inline-block';
      mark.style.minWidth = '16px';
      mark.style.fontSize = '14px';
      mark.style.color = '#071b43';
      input.replaceWith(mark);
    });

    const eliteLayout = clone.querySelector('.elite-difference-layout');
    const eliteContent = eliteLayout?.querySelector('.elite-difference-content');
    const reportWebsite = eliteLayout?.querySelector('.report-website');
    if (eliteLayout && eliteContent && reportWebsite) {
      const websiteText = reportWebsite.querySelector('span');
      const websiteQr = reportWebsite.querySelector('img');
      const layoutTable = document.createElement('table');
      const layoutRow = layoutTable.insertRow();
      const contentCell = layoutRow.insertCell();
      const websiteCell = layoutRow.insertCell();

      layoutTable.setAttribute('role', 'presentation');
      layoutTable.setAttribute('cellpadding', '0');
      layoutTable.setAttribute('cellspacing', '0');
      layoutTable.setAttribute('border', '0');
      layoutTable.setAttribute('width', '100%');
      layoutTable.setAttribute('style', 'width: 100%; border: 0; border-collapse: collapse; table-layout: fixed;');
      contentCell.setAttribute('width', '68%');
      contentCell.setAttribute('valign', 'top');
      contentCell.setAttribute('style', 'width: 68%; vertical-align: top; border: 0; padding: 0 16px 0 0;');
      websiteCell.setAttribute('width', '32%');
      websiteCell.setAttribute('valign', 'top');
      websiteCell.setAttribute('style', 'width: 32%; vertical-align: top; border: 0; padding: 0;');

      const benefitList = eliteContent.querySelector('.static-grid');
      if (benefitList) {
        const benefitTable = document.createElement('table');
        const benefitRow = benefitTable.insertRow();
        const leftBenefitsCell = benefitRow.insertCell();
        const rightBenefitsCell = benefitRow.insertCell();
        const leftBenefits = document.createElement('ul');
        const rightBenefits = document.createElement('ul');

        benefitTable.setAttribute('role', 'presentation');
        benefitTable.setAttribute('cellpadding', '0');
        benefitTable.setAttribute('cellspacing', '0');
        benefitTable.setAttribute('border', '0');
        benefitTable.setAttribute('width', '100%');
        benefitTable.setAttribute('style', 'width: 100%; border: 0; border-collapse: collapse; table-layout: fixed;');
        [leftBenefitsCell, rightBenefitsCell].forEach((cell) => {
          cell.setAttribute('width', '50%');
          cell.setAttribute('valign', 'top');
          cell.setAttribute('style', 'width: 50%; vertical-align: top; border: 0; padding: 0;');
        });
        rightBenefitsCell.setAttribute('style', 'width: 50%; vertical-align: top; border: 0; padding: 0 0 0 12px;');
        [leftBenefits, rightBenefits].forEach((list) => {
          list.setAttribute('style', 'margin: 10px 0 0; padding-left: 20px;');
        });
        Array.from(benefitList.children).forEach((item, index) => {
          (index % 2 === 0 ? leftBenefits : rightBenefits).appendChild(item);
        });
        leftBenefitsCell.appendChild(leftBenefits);
        rightBenefitsCell.appendChild(rightBenefits);
        benefitList.replaceWith(benefitTable);
      }

      contentCell.appendChild(eliteContent);

      if (websiteText && websiteQr) {
        const websiteTable = document.createElement('table');
        const websiteRow = websiteTable.insertRow();
        const textCell = websiteRow.insertCell();
        const qrCell = websiteRow.insertCell();

        websiteTable.setAttribute('role', 'presentation');
        websiteTable.setAttribute('cellpadding', '0');
        websiteTable.setAttribute('cellspacing', '0');
        websiteTable.setAttribute('border', '0');
        websiteTable.setAttribute('width', '100%');
        websiteTable.setAttribute('style', 'width: 100%; border: 0; border-collapse: collapse;');
        textCell.setAttribute('valign', 'middle');
        textCell.setAttribute('align', 'right');
        textCell.setAttribute('style', 'vertical-align: middle; text-align: right; border: 0; padding: 0 10px 0 0; font-size: 12px; line-height: 1.3; color: #0d2f62;');
        qrCell.setAttribute('width', '98');
        qrCell.setAttribute('valign', 'top');
        qrCell.setAttribute('style', 'width: 98px; vertical-align: top; border: 0; padding: 0;');
        websiteQr.setAttribute('width', '88');
        websiteQr.setAttribute('height', '88');
        websiteQr.setAttribute('style', 'display: block; width: 88px; height: 88px; max-width: 88px; border: 1px solid #c7d8ee; background: #ffffff; padding: 4px;');
        textCell.appendChild(websiteText);
        qrCell.appendChild(websiteQr);
        websiteCell.appendChild(websiteTable);
      }

      eliteLayout.replaceWith(layoutTable);
    }

    const imageElements = Array.from(clone.querySelectorAll('img'));
    for (const [index, img] of imageElements.entries()) {
      const src = img.getAttribute('src');
      if (!src) continue;

      const absoluteSrc = src.startsWith('http')
        ? src
        : src.startsWith('/')
          ? `https://sharper4.github.io/PoolCalculator${src}`
          : new URL(src, window.location.href).href;

      const isLogo = img.classList.contains('report-logo');
      const isPhone = img.classList.contains('report-phone-img');
      const isWebsiteQr = img.alt.startsWith('QR code for');
      const imageStyle = isLogo
        ? 'height: 56px; width: auto; display: block;'
        : isPhone
          ? 'height: 34px; width: auto; display: block;'
          : isWebsiteQr
            ? 'display: block; width: 88px; height: 88px; max-width: 88px; border: 1px solid #c7d8ee; background: #ffffff; padding: 4px;'
            : 'max-width: 100%; height: auto; display: block;';

      try {
        const response = await fetch(absoluteSrc);
        const blob = await response.blob();
        const dataUrl = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });

        const cid = `report-inline-${index + 1}`;
        const contentType = String(dataUrl).match(/^data:([^;,]+)/)?.[1] || 'image/png';
        const extension = contentType === 'image/svg+xml' ? 'svg' : contentType.split('/')[1] || 'png';
        img.setAttribute('src', `cid:${cid}`);
        img.setAttribute('style', imageStyle);
        inlineImages.push({ cid, dataUrl, filename: `report-inline-${index + 1}.${extension}` });
      } catch {
        img.setAttribute('src', absoluteSrc);
        img.setAttribute('style', imageStyle);
      }
    }

    const reportHeader = clone.querySelector('.report-header');
    if (reportHeader) {
      reportHeader.setAttribute(
        'style',
        'display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.6rem; border-bottom: 2px solid #0e4f97; margin-bottom: 0.5rem; padding-bottom: 0.3rem;'
      );
    }

    const headerCenter = clone.querySelector('.report-header-center');
    if (headerCenter) {
      headerCenter.setAttribute('style', 'flex: 1; display: flex; align-items: center; justify-content: center;');
    }

    const headerTitle = clone.querySelector('.report-header-title');
    if (headerTitle) {
      headerTitle.setAttribute(
        'style',
        'flex: 1 1 100%; display: flex; flex-direction: column; align-items: center; margin-top: 0.4rem;'
      );
      headerTitle.innerHTML = '';
      const combinedHeading = document.createElement('h2');
      combinedHeading.textContent = 'CHEMICAL BALANCING AND WATER QUALITY REPORT';
      combinedHeading.setAttribute(
        'style',
        'margin: 0; font-size: 0.85rem; text-align: center; letter-spacing: 0.04em; line-height: 1.3; color: #0e4f97;'
      );
      headerTitle.appendChild(combinedHeading);
    }

    clone.style.width = '100%';
    clone.style.maxWidth = '820px';
    clone.style.margin = '0 auto';
    clone.style.boxSizing = 'border-box';
    clone.style.background = '#ffffff';
    clone.style.border = '1px solid #bdd2ee';
    clone.style.borderRadius = '14px';
    clone.style.padding = '22px';

    return {
      html: buildHtmlEmailDocument({
        subject: 'Pool Chemistry Analysis Report from North Texas Elite Pool Care',
        reportHtml: clone.outerHTML
      }),
      images: inlineImages
    };
  }

  async function sendPoolCalcReport() {
    const emailAddress = pendingSendEmailAddress || await resolveReportEmailAddress();

    if (!emailAddress) {
      pendingSendEmailAddress = null;
      return;
    }
    pendingSendEmailAddress = emailAddress;

    if (!poolCalcAccessToken && poolCalcTokenClient && poolCalcGisLoaded) {
      requestPoolCalcAccessToken();
      return;
    }

    const emailSubject = 'Pool Chemistry Analysis Report from North Texas Elite Pool Care';
    const emailReport = await buildEmailReadyReportHtml();
    const emailHtml = emailReport.html;
    const inlineImages = emailReport.images || [];

    const fallbackPayload = {
      mailtoUrl: `mailto:${emailAddress}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent('Please open the email with the report attachment or check the rendered HTML report.')}`
    };

    if (!poolCalcAccessToken) {
      pendingSendEmailAddress = null;
      window.location.href = fallbackPayload.mailtoUrl;
      return;
    }

    try {
      const response = await fetch('https://www.googleapis.com/gmail/v1/users/me/messages/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${poolCalcAccessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          raw: buildGmailMessageRaw({
            to: emailAddress,
            subject: emailSubject,
            htmlBody: emailHtml,
            inlineImages
          })
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Gmail API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
      }

      const result = await response.json();
      alert(`✅ Report sent successfully to ${emailAddress}!`);
      console.log('Report sent. ID:', result.id);
    } catch (error) {
      console.warn('Gmail send failed, falling back to mail client:', error);
      window.location.href = fallbackPayload.mailtoUrl;
      alert('The Gmail send failed, so your email app opened instead.');
    } finally {
      pendingSendEmailAddress = null;
    }
  }

  refs.sendReportEmail.addEventListener('click', () => {
    sendPoolCalcReport();
  });

  // Initialize token client when page loads
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPoolCalcTokenClient);
  } else {
    initPoolCalcTokenClient();
  }

  if (refs.rInsights) {
    refs.rInsights.addEventListener('input', expandReportInsightsForPrint);
  }

  window.addEventListener('beforeprint', expandReportInsightsForPrint);

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Backspace') return;
    const target = event.target;
    const isEditable = target instanceof HTMLInputElement
      || target instanceof HTMLTextAreaElement
      || target instanceof HTMLSelectElement
      || target?.isContentEditable;
    if (!isEditable) event.preventDefault();
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

  refs.tclTo.addEventListener('input', () => {
    if (!suppressTargetOverrideCapture) {
      manualTargetOverride.tcl = true;
      if (refs.tclAutoTarget.checked) refs.tclAutoTarget.checked = false;
    }
  });

  refs.tclTo.addEventListener('change', () => {
    if (!suppressTargetOverrideCapture) {
      manualTargetOverride.tcl = true;
      if (refs.tclAutoTarget.checked) refs.tclAutoTarget.checked = false;
    }
  });

  refs.tclAutoTarget.addEventListener('change', () => {
    if (refs.tclAutoTarget.checked) {
      manualTargetOverride.tcl = false;
      calcAll();
    }
  });

  refs.effPop.addEventListener('change', () => {
    syncEffectUnitControl(Number(n(refs.units)), Number(n(refs.units)), false);
  });

  refs.temp.addEventListener('input', () => {
    markManualWaterTemp();
  });

  refs.temp.addEventListener('change', () => {
    markManualWaterTemp();
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

  [refs.statusClear, refs.statusMinor, refs.statusImmediate].forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      manualConditionSummaryOverride = true;
      checkbox.checked = true;
      [refs.statusClear, refs.statusMinor, refs.statusImmediate].forEach((otherCheckbox) => {
        if (otherCheckbox !== checkbox) otherCheckbox.checked = false;
      });
    });
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
  applyEstimatedWaterTemp();
  applyCustomerSectionsVisibility();
  updateServiceChecklistState();
  calcAll();
  updateTechnicianInsightsFromChecks();
  linkRowCollapsibles();
  expandReportInsightsForPrint();
  loadWeather().then(() => {
    resolveWeatherForecastFallback(false);
    applyEstimatedWaterTemp();
    calcAll();
    updatePassiveOutlook();
    updateReport();
    expandReportInsightsForPrint();
  });

  window.setTimeout(() => {
    resolveWeatherForecastFallback(true);
    applyEstimatedWaterTemp();
    calcAll();
    updatePassiveOutlook();
    updateReport();
  }, 7000);
}

init();
