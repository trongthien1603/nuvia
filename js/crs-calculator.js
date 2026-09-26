/** CRS estimate aligned with IRCC CRS criteria (no arranged employment points — removed March 2025). Not legal advice. */

const AGE_POINTS_SINGLE = {
  17: 0, 18: 99, 19: 105, 20: 110, 21: 110, 22: 110, 23: 110, 24: 110, 25: 110, 26: 110, 27: 110, 28: 110, 29: 110,
  30: 95, 31: 90, 32: 85, 33: 80, 34: 75, 35: 70, 36: 65, 37: 60, 38: 55, 39: 50, 40: 45, 41: 35, 42: 25, 43: 15, 44: 5,
};

const AGE_POINTS_SPOUSE = {
  17: 0, 18: 90, 19: 95, 20: 100, 21: 100, 22: 100, 23: 100, 24: 100, 25: 100, 26: 100, 27: 100, 28: 100, 29: 100,
  30: 85, 31: 80, 32: 75, 33: 70, 34: 65, 35: 60, 36: 55, 37: 50, 38: 45, 39: 40, 40: 35, 41: 25, 42: 15, 43: 5, 44: 0,
};

const EDU_SINGLE = { none: 0, secondary: 30, onepost: 90, twopost: 98, bachelor: 120, twodegree: 128, master: 135, phd: 140 };
const EDU_SPOUSE = { none: 0, secondary: 28, onepost: 84, twopost: 91, bachelor: 112, twodegree: 119, master: 126, phd: 131 };

const FIRST_LANG_SKILL_WITH_SPOUSE = { 4: 6, 5: 6, 6: 8, 7: 16, 8: 22, 9: 29, 10: 32 };
const FIRST_LANG_SKILL_SINGLE = { 4: 6, 5: 6, 6: 9, 7: 17, 8: 23, 9: 31, 10: 34 };

const SPOUSE_LANG_SKILL = { 4: 0, 5: 1, 6: 1, 7: 3, 8: 3, 9: 6, 10: 6 };

function clampClb(value, min = 4) {
  const n = Number(value) || 0;
  if (n < min) return 0;
  return Math.min(10, Math.max(min, n));
}

function readSkillClbs(form, prefix, minClb = 4) {
  return ["Listen", "Read", "Write", "Speak"].map((suffix) => clampClb(form[`${prefix}${suffix}`], minClb));
}

function minClb(clbs) {
  const active = clbs.filter((c) => c >= 4);
  if (!active.length) return 0;
  return Math.min(...active);
}

function firstLangPointsPerSkill(clb, withSpouse) {
  if (clb < 4) return 0;
  const table = withSpouse ? FIRST_LANG_SKILL_WITH_SPOUSE : FIRST_LANG_SKILL_SINGLE;
  const key = Math.min(10, Math.max(4, clb));
  return table[key] || table[4];
}

function firstLangTotal(clbs, withSpouse) {
  const raw = clbs.reduce((sum, clb) => sum + firstLangPointsPerSkill(clb, withSpouse), 0);
  return Math.min(withSpouse ? 128 : 136, raw);
}

function secondLangSkillPoints(clb) {
  if (clb < 5) return 0;
  if (clb <= 6) return 1;
  if (clb <= 8) return 3;
  return 6;
}

function secondLangTotal(clbs, withSpouse) {
  const raw = clbs.reduce((sum, clb) => sum + secondLangSkillPoints(clb), 0);
  return Math.min(withSpouse ? 22 : 24, raw);
}

function spouseLangTotal(clbs) {
  const raw = clbs.reduce((sum, clb) => {
    if (clb < 4) return sum;
    const key = Math.min(10, Math.max(4, clb));
    return sum + (SPOUSE_LANG_SKILL[key] || 0);
  }, 0);
  return Math.min(20, raw);
}

function canWorkPoints(years, withSpouse) {
  const y = Math.min(5, Math.max(0, years));
  const single = [0, 40, 53, 64, 72, 80];
  const spouse = [0, 35, 46, 56, 63, 70];
  return (withSpouse ? spouse : single)[y];
}

function foreignWorkPoints(years, withSpouse) {
  const y = Math.min(3, Math.max(0, years));
  const single = [0, 13, 25, 25];
  const spouse = [0, 12, 23, 23];
  return (withSpouse ? spouse : single)[y];
}

function isPostSecondary(edu) {
  return !["none", "secondary"].includes(edu);
}

function eduTransferTier(edu) {
  return ["onepost", "twopost"].includes(edu) ? 13 : 25;
}

function skillTransferability(edu, clbMin, canYears, foreignYears, hasTradeCert) {
  const postSec = isPostSecondary(edu);
  const clb7 = clbMin >= 7;
  const clb5 = clbMin >= 5;

  const eduLang = postSec && clb7 ? eduTransferTier(edu) : 0;
  const eduCan = postSec && canYears >= 1 ? (canYears >= 2 ? 25 : 13) : 0;
  const eduBlock = Math.min(50, eduLang + eduCan);

  const foreignLang = foreignYears >= 1 && clb7 ? (foreignYears >= 3 ? 25 : 13) : 0;
  const foreignEdu = foreignYears >= 1 && postSec ? (foreignYears >= 3 ? 25 : 13) : 0;
  const foreignBlock = Math.min(50, foreignLang + foreignEdu);

  const certLang = hasTradeCert && clb5 ? (clb7 ? 25 : 13) : 0;

  const total = Math.min(100, eduBlock + foreignBlock + certLang);

  return {
    total,
    eduLang,
    eduCan,
    foreignLang,
    foreignEdu,
    certLang,
    eduBlock,
    foreignBlock,
  };
}

function spouseCanPoints(years) {
  const y = Math.min(5, Math.max(0, years));
  if (y >= 2) return 10;
  if (y >= 1) return 5;
  return 0;
}

function spouseFactorBreakdown(spouseEdu, spouseClbs, spouseCanWork) {
  const education = EDU_SPOUSE[spouseEdu] || 0;
  const language = spouseLangTotal(spouseClbs);
  const canadianWork = spouseCanPoints(spouseCanWork);
  const total = Math.min(40, education + language + canadianWork);
  return { education, language, canadianWork, total };
}

function frenchBonusPoints(frenchBonus) {
  if (frenchBonus === "50") return 50;
  if (frenchBonus === "25") return 25;
  return 0;
}

function calculateCrs(form) {
  const withSpouse = form.hasSpouse === "yes";
  const ageRaw = Number(form.age) || 17;
  const age = ageRaw >= 45 ? 45 : Math.max(17, ageRaw);
  const edu = form.education || "none";

  const lang1 = readSkillClbs(form, "clb1", 0);
  const hasSecondLang = form.hasSecondLang === "yes";
  const lang2Raw = hasSecondLang ? readSkillClbs(form, "clb2", 0) : [0, 0, 0, 0];
  const lang2 = lang2Raw.map((c) => (c >= 5 ? c : 0));

  const clbMin = minClb(lang1);
  const canYears = Number(form.canWork) || 0;
  const foreignYears = Number(form.foreignWork) || 0;
  const hasTradeCert = form.tradeCert === "yes";

  const agePts = withSpouse ? AGE_POINTS_SPOUSE[Math.min(44, age)] || 0 : AGE_POINTS_SINGLE[Math.min(44, age)] || 0;
  if (ageRaw >= 45) {
    /* IRCC: no age points at 45+ */
  }
  const agePoints = ageRaw >= 45 ? 0 : agePts;

  const eduPoints = withSpouse ? EDU_SPOUSE[edu] || 0 : EDU_SINGLE[edu] || 0;
  const lang1Points = firstLangTotal(lang1, withSpouse);
  const lang2Points = hasSecondLang ? secondLangTotal(lang2, withSpouse) : 0;
  const canWorkPts = canWorkPoints(canYears, withSpouse);
  const foreignWorkPts = foreignWorkPoints(foreignYears, withSpouse);

  let spouse = null;
  let spousePoints = 0;
  if (withSpouse) {
    const spouseClbs = readSkillClbs(form, "spouseClb", 0);
    spouse = spouseFactorBreakdown(form.spouseEducation || "none", spouseClbs, Number(form.spouseCanWork) || 0);
    spousePoints = spouse.total;
  }

  const core = agePoints + eduPoints + lang1Points + lang2Points + canWorkPts + foreignWorkPts + spousePoints;

  const transferDetail = skillTransferability(edu, clbMin, canYears, foreignYears, hasTradeCert);

  let additional = 0;
  const additionalLines = [];
  if (form.pnp === "yes") {
    additional += 600;
    additionalLines.push({ key: "crs.breakdown.pnp", fallback: "Provincial nomination", points: 600 });
  }
  if (form.sibling === "yes") {
    additional += 15;
    additionalLines.push({ key: "crs.breakdown.sibling", fallback: "Sibling in Canada", points: 15 });
  }
  const frenchPts = frenchBonusPoints(form.frenchBonus || "none");
  if (frenchPts) {
    additional += frenchPts;
    additionalLines.push({
      key: frenchPts === 50 ? "crs.breakdown.french50" : "crs.breakdown.french25",
      fallback: frenchPts === 50 ? "French + English proficiency bonus" : "French proficiency bonus",
      points: frenchPts,
    });
  }
  if (form.canStudy === "one") {
    additional += 15;
    additionalLines.push({ key: "crs.breakdown.study15", fallback: "Canadian study (1–2 years)", points: 15 });
  }
  if (form.canStudy === "two") {
    additional += 30;
    additionalLines.push({ key: "crs.breakdown.study30", fallback: "Canadian study (3+ years)", points: 30 });
  }

  const total = core + transferDetail.total + additional;

  return {
    total,
    core,
    transfer: transferDetail.total,
    additional,
    detail: {
      age: agePoints,
      education: eduPoints,
      lang1: lang1Points,
      lang2: lang2Points,
      canWork: canWorkPts,
      foreignWork: foreignWorkPts,
      spouse,
      transfer: transferDetail,
      additionalLines,
      tradeCertChecked: hasTradeCert,
      clbMinFirstLang: clbMin,
    },
  };
}

function crsT(key, fallback) {
  return window.NuviaI18n ? window.NuviaI18n.t(key) : fallback;
}

function formatInviteCount(value) {
  if (value == null || value === "—") return "—";
  if (typeof value === "number") return value.toLocaleString();
  return String(value);
}

function renderCrsDrawsRows(draws) {
  const tbody = document.getElementById("crs-draws-body");
  const status = document.getElementById("crs-draws-status");
  if (!tbody) return;
  if (!draws.length) {
    tbody.innerHTML = `<tr><td colspan="4">${crsT("crs.draws.empty", "No draw data available right now.")}</td></tr>`;
    if (status) status.textContent = "";
    return;
  }
  tbody.innerHTML = draws
    .map(
      (row) =>
        `<tr><td>${row.date}</td><td>${row.program}</td><td>${row.score}</td><td>${formatInviteCount(row.invites)}</td></tr>`
    )
    .join("");
  if (status) status.textContent = crsT("crs.draws.live", "Loaded from official IRCC data.");
}

async function loadLiveCrsDraws() {
  const tbody = document.getElementById("crs-draws-body");
  const status = document.getElementById("crs-draws-status");
  if (!tbody) return;
  tbody.innerHTML = `<tr><td colspan="4">${crsT("crs.draws.loading", "Loading latest rounds…")}</td></tr>`;
  if (status) status.textContent = "";
  try {
    const fetcher = window.NuviaIrccDraws?.fetchLiveExpressEntryDraws;
    const draws = fetcher ? await fetcher(10) : window.CRS_RECENT_DRAWS || [];
    renderCrsDrawsRows(draws);
  } catch (_) {
    renderCrsDrawsRows(window.CRS_RECENT_DRAWS || []);
    if (status) status.textContent = crsT("crs.draws.fallback", "Could not reach IRCC — try again or use the link below.");
  }
}

const CRS_FORM_DEFAULTS = {
  hasSpouse: "no",
  hasSecondLang: "no",
  age: "17",
  education: "none",
  clb1Listen: "0",
  clb1Read: "0",
  clb1Write: "0",
  clb1Speak: "0",
  clb2Listen: "0",
  clb2Read: "0",
  clb2Write: "0",
  clb2Speak: "0",
  canWork: "0",
  foreignWork: "0",
  tradeCert: "no",
  spouseEducation: "none",
  spouseClbListen: "0",
  spouseClbRead: "0",
  spouseClbWrite: "0",
  spouseClbSpeak: "0",
  spouseCanWork: "0",
  canStudy: "none",
  frenchBonus: "none",
};

function resetCrsForm(form) {
  Object.entries(CRS_FORM_DEFAULTS).forEach(([name, value]) => {
    const el = form.elements.namedItem(name);
    if (!el) return;
    if (el.type === "checkbox") el.checked = false;
    else el.value = value;
  });
  ["pnp", "sibling"].forEach((name) => {
    const el = form.querySelector(`[name="${name}"]`);
    if (el) el.checked = false;
  });
}

function breakdownLine(label, points, { sub = false } = {}) {
  const cls = sub ? "calc-breakdown-sub" : "";
  return `<li class="${cls}">${label}: <strong>${points}</strong></li>`;
}

function renderBreakdown(result) {
  const d = result.detail;
  const lines = [];

  lines.push(
    `<li class="calc-breakdown-group">${crsT("crs.breakdown.core", "Core / human capital")}: <strong>${result.core}</strong></li>`
  );
  lines.push(breakdownLine(crsT("crs.breakdown.age", "Age"), d.age, { sub: true }));
  lines.push(breakdownLine(crsT("crs.breakdown.education", "Education"), d.education, { sub: true }));
  lines.push(breakdownLine(crsT("crs.breakdown.lang1", "First official language"), d.lang1, { sub: true }));
  if (d.lang2 > 0) lines.push(breakdownLine(crsT("crs.breakdown.lang2", "Second official language"), d.lang2, { sub: true }));
  lines.push(breakdownLine(crsT("crs.breakdown.canWork", "Canadian work experience"), d.canWork, { sub: true }));
  lines.push(breakdownLine(crsT("crs.breakdown.foreignWork", "Foreign work experience"), d.foreignWork, { sub: true }));

  if (d.spouse) {
    lines.push(
      breakdownLine(
        crsT("crs.breakdown.spouse", "Spouse or partner factors"),
        d.spouse.total,
        { sub: true }
      )
    );
    lines.push(breakdownLine(crsT("crs.breakdown.spouseEdu", "— Spouse education"), d.spouse.education, { sub: true }));
    lines.push(breakdownLine(crsT("crs.breakdown.spouseLang", "— Spouse language"), d.spouse.language, { sub: true }));
    lines.push(breakdownLine(crsT("crs.breakdown.spouseCan", "— Spouse Canadian work"), d.spouse.canadianWork, { sub: true }));
  }

  lines.push(
    `<li class="calc-breakdown-group">${crsT("crs.breakdown.transfer", "Skill transferability")}: <strong>${result.transfer}</strong></li>`
  );
  const t = d.transfer;
  if (t.eduLang) lines.push(breakdownLine(crsT("crs.breakdown.transferEduLang", "— Education + first language (lowest CLB 7+)"), t.eduLang, { sub: true }));
  if (t.eduCan) lines.push(breakdownLine(crsT("crs.breakdown.transferEduCan", "— Education + Canadian work"), t.eduCan, { sub: true }));
  if (t.foreignLang) lines.push(breakdownLine(crsT("crs.breakdown.transferForeignLang", "— Foreign work + first language (lowest CLB 7+)"), t.foreignLang, { sub: true }));
  if (t.foreignEdu) lines.push(breakdownLine(crsT("crs.breakdown.transferForeignEdu", "— Foreign work + education"), t.foreignEdu, { sub: true }));
  if (t.certLang) {
    lines.push(breakdownLine(crsT("crs.breakdown.transferCert", "— Trade certificate + first language (lowest CLB 5+)"), t.certLang, { sub: true }));
  } else if (d.tradeCertChecked) {
    lines.push(
      breakdownLine(
        crsT("crs.breakdown.transferCertPending", "— Trade certificate (needs first language lowest CLB 5+)"),
        0,
        { sub: true }
      )
    );
  }

  lines.push(
    `<li class="calc-breakdown-group">${crsT("crs.breakdown.additional", "Additional points")}: <strong>${result.additional}</strong></li>`
  );
  d.additionalLines.forEach((row) => {
    lines.push(breakdownLine(crsT(row.key, row.fallback), row.points, { sub: true }));
  });

  return lines.join("");
}

const CRS_LANG2_FIELD_NAMES = ["clb2Listen", "clb2Read", "clb2Write", "clb2Speak"];
const CRS_SPOUSE_LANG_FIELD_NAMES = ["spouseClbListen", "spouseClbRead", "spouseClbWrite", "spouseClbSpeak"];

function initCrsCalculator() {
  const form = document.getElementById("crs-calculator-form");
  const spouseFields = document.getElementById("crs-spouse-fields");
  const lang2Fields = document.getElementById("crs-lang2-fields");
  if (!form) return;

  const scoreEl = document.getElementById("crs-total-score");
  const breakdownEl = document.getElementById("crs-breakdown");

  function syncSpouse() {
    const show = form.hasSpouse.value === "yes";
    if (spouseFields) spouseFields.hidden = !show;
    const spouseCoreNote = document.getElementById("crs-spouse-core-note");
    if (spouseCoreNote) spouseCoreNote.hidden = !show;
    if (!show) {
      CRS_SPOUSE_LANG_FIELD_NAMES.forEach((name) => {
        const el = form.elements.namedItem(name);
        if (el) el.value = "0";
      });
    }
  }

  function syncSecondLang() {
    const show = form.hasSecondLang?.value === "yes";
    if (lang2Fields) lang2Fields.hidden = !show;
    if (!show) {
      CRS_LANG2_FIELD_NAMES.forEach((name) => {
        const el = form.elements.namedItem(name);
        if (el) el.value = "0";
      });
    }
  }

  function readForm() {
    const data = Object.fromEntries(new FormData(form).entries());
    data.tradeCert = form.querySelector('[name="tradeCert"]')?.checked ? "yes" : "no";
    ["pnp", "sibling"].forEach((key) => {
      data[key] = form.querySelector(`[name="${key}"]`)?.checked ? "yes" : "no";
    });
    return data;
  }

  let touched = false;

  function showZeroResult() {
    if (scoreEl) scoreEl.textContent = "0";
    if (breakdownEl) breakdownEl.innerHTML = "";
    const tradeCertHint = document.getElementById("crs-trade-cert-hint");
    if (tradeCertHint) tradeCertHint.hidden = true;
  }

  function update() {
    if (!touched) {
      showZeroResult();
      return;
    }
    const result = calculateCrs(readForm());
    if (scoreEl) scoreEl.textContent = String(result.total);
    if (breakdownEl) breakdownEl.innerHTML = renderBreakdown(result);
    const tradeCertHint = document.getElementById("crs-trade-cert-hint");
    if (tradeCertHint) {
      tradeCertHint.hidden = !(result.detail.tradeCertChecked && !result.detail.transfer.certLang);
    }
  }

  function markTouched() {
    touched = true;
    update();
  }

  form.hasSpouse?.addEventListener("change", () => {
    syncSpouse();
    markTouched();
  });
  form.hasSecondLang?.addEventListener("change", () => {
    syncSecondLang();
    markTouched();
  });
  form.addEventListener("input", markTouched);
  form.addEventListener("change", markTouched);

  document.getElementById("crs-reset-btn")?.addEventListener("click", () => {
    touched = false;
    resetCrsForm(form);
    syncSpouse();
    syncSecondLang();
    update();
  });

  resetCrsForm(form);
  syncSpouse();
  syncSecondLang();
  update();
  loadLiveCrsDraws();

  window.refreshCrsCalculatorForLang = function () {
    syncSpouse();
    syncSecondLang();
    update();
    loadLiveCrsDraws();
  };
}

document.addEventListener("DOMContentLoaded", initCrsCalculator);

// Exported for tests / reuse
if (typeof window !== "undefined") {
  window.NuviaCrsCalculator = { calculateCrs, skillTransferability, firstLangTotal, secondLangTotal };
}
