const FEES_CATALOG = {
  consult: [
    { titleKey: "fees.consult.15", fee: "Free", flat: true, noteKey: "fees.consult.15.note", includesKeys: ["fees.includes.consult.1", "fees.includes.consult.2", "fees.includes.consult.3"] },
    { titleKey: "fees.consult.30", fee: "$175", flat: true, noteKey: "fees.consult.credit", includesKeys: ["fees.includes.consult.4", "fees.includes.consult.5", "fees.includes.consult.6"] },
    { titleKey: "fees.consult.60", fee: "$300", flat: true, noteKey: "fees.consult.credit", includesKeys: ["fees.includes.consult.4", "fees.includes.consult.5", "fees.includes.consult.7"] },
  ],
  temp: [
    { titleKey: "fees.temp.visitor", review: "$250 – $450", guided: "$400 – $700", full: "$800 – $1,500", govKey: "fees.temp.visitor.gov", includesKeys: ["fees.includes.temp.1", "fees.includes.temp.2", "fees.includes.temp.3", "fees.includes.temp.4"] },
    { titleKey: "fees.temp.business", review: "$400 – $700", guided: "$650 – $1,100", full: "$1,200 – $2,000", govKey: "fees.temp.business.gov", includesKeys: ["fees.includes.temp.1", "fees.includes.temp.2", "fees.includes.temp.3", "fees.includes.temp.4"] },
    { titleKey: "fees.temp.study", review: "$350 – $550", guided: "$750 – $1,000", full: "$1,500 – $2,000", govKey: "fees.temp.study.gov", includesKeys: ["fees.includes.study.1", "fees.includes.study.2", "fees.includes.study.3", "fees.includes.study.4"] },
    { titleKey: "fees.temp.lmia", review: "$1,200 – $1,800", guided: "$2,000 – $3,000", full: "$3,500 – $5,000", govKey: "fees.temp.lmia.gov", includesKeys: ["fees.includes.lmia.1", "fees.includes.lmia.2", "fees.includes.lmia.3", "fees.includes.lmia.4"] },
    { titleKey: "fees.temp.work", review: "$350 – $550", guided: "$750 – $1,000", full: "$1,500 – $2,000", govKey: "fees.temp.work.gov", includesKeys: ["fees.includes.work.1", "fees.includes.work.2", "fees.includes.work.3", "fees.includes.work.4"] },
    { titleKey: "fees.temp.gts", review: "$1,400 – $1,800", guided: "$2,400 – $3,200", full: "$4,000 – $5,000", govKey: "fees.temp.gts.gov", includesKeys: ["fees.includes.lmia.1", "fees.includes.work.2", "fees.includes.work.3", "fees.includes.work.4"] },
    { titleKey: "fees.temp.cusma", review: "$700 – $1,200", guided: "$1,100 – $2,000", full: "$2,000 – $3,500", govKey: "fees.temp.cusma.gov", includesKeys: ["fees.includes.work.1", "fees.includes.work.2", "fees.includes.work.3", "fees.includes.work.4"] },
    { titleKey: "fees.temp.fta", review: "$700 – $1,750", guided: "$1,100 – $2,800", full: "$2,000 – $5,000", govKey: "fees.temp.fta.gov", includesKeys: ["fees.includes.work.1", "fees.includes.work.2", "fees.includes.work.3", "fees.includes.work.4"] },
    { titleKey: "fees.temp.pgwp", review: "$175 – $275", guided: "$300 – $450", full: "$500 – $750", govKey: "fees.temp.pgwp.gov", includesKeys: ["fees.includes.study.1", "fees.includes.study.3", "fees.includes.temp.4"] },
    { titleKey: "fees.temp.bowp", review: "$175 – $275", guided: "$300 – $450", full: "$500 – $750", govKey: "fees.temp.bowp.gov", includesKeys: ["fees.includes.pr.1", "fees.includes.pr.3", "fees.includes.temp.4"] },
    { titleKey: "fees.temp.super", review: "$450 – $750", guided: "$750 – $1,100", full: "$1,500 – $2,200", govKey: "fees.temp.super.gov", includesKeys: ["fees.includes.family.1", "fees.includes.family.2", "fees.includes.temp.3", "fees.includes.temp.4"] },
  ],
  pr: [
    { titleKey: "fees.pr.express", review: "$500 – $900", guided: "$1,500 – $2,500", full: "$3,000 – $4,500", govKey: "fees.pr.express.gov", includesKeys: ["fees.includes.pr.1", "fees.includes.pr.2", "fees.includes.pr.3", "fees.includes.pr.4"] },
    { titleKey: "fees.pr.pnp", review: "$600 – $1,000", guided: "$2,000 – $3,500", full: "$4,500 – $6,500", govKey: "fees.pr.pnp.gov", includesKeys: ["fees.includes.pnp.1", "fees.includes.pnp.2", "fees.includes.pnp.3", "fees.includes.pr.4"] },
    { titleKey: "fees.pr.spousal", review: "$500 – $900", guided: "$1,800 – $2,800", full: "$3,500 – $4,500", govKey: "fees.pr.spousal.gov", includesKeys: ["fees.includes.family.1", "fees.includes.family.2", "fees.includes.family.3", "fees.includes.pr.4"] },
    { titleKey: "fees.pr.spousal.in", review: "$600 – $1,000", guided: "$2,000 – $3,200", full: "$4,000 – $5,000", govKey: "fees.pr.spousal.in.gov", includesKeys: ["fees.includes.family.1", "fees.includes.family.2", "fees.includes.family.4", "fees.includes.pr.4"] },
    { titleKey: "fees.pr.parent", review: "$450 – $750", guided: "$1,200 – $1,800", full: "$2,500 – $3,500", govKey: "fees.pr.parent.gov", includesKeys: ["fees.includes.family.1", "fees.includes.family.2", "fees.includes.family.3", "fees.includes.pr.4"] },
    { titleKey: "fees.pr.child", review: "$450 – $900", guided: "$1,200 – $2,400", full: "$2,500 – $4,500", govKey: "fees.pr.child.gov", includesKeys: ["fees.includes.family.1", "fees.includes.family.2", "fees.includes.pr.3", "fees.includes.pr.4"] },
    { titleKey: "fees.pr.appeal", review: "$1,500 – $2,250", guided: "$2,500 – $4,000", full: "$5,000 – $7,500", govKey: "fees.pr.appeal.gov", includesKeys: ["fees.includes.appeal.1", "fees.includes.appeal.2", "fees.includes.appeal.3", "fees.includes.appeal.4"] },
    { titleKey: "fees.pr.self", review: "$900 – $1,400", guided: "$2,500 – $3,500", full: "$5,000 – $6,500", govKey: "fees.pr.self.gov", includesKeys: ["fees.includes.pr.1", "fees.includes.pr.2", "fees.includes.pr.3", "fees.includes.pr.4"] },
    { titleKey: "fees.pr.startup", review: "$1,500 – $3,000", guided: "$4,000 – $7,500", full: "$8,000 – $15,000", govKey: "fees.pr.startup.gov", includesKeys: ["fees.includes.business.1", "fees.includes.business.2", "fees.includes.business.3", "fees.includes.pr.4"] },
    { titleKey: "fees.pr.investor", review: "$3,000 – $6,000", guided: "$7,500 – $15,000", full: "$15,000 – $30,000", govKey: "fees.pr.investor.gov", includesKeys: ["fees.includes.business.1", "fees.includes.business.2", "fees.includes.business.4", "fees.includes.pr.4"] },
    { titleKey: "fees.pr.caregiver", review: "$900 – $1,400", guided: "$2,200 – $3,500", full: "$4,500 – $6,000", govKey: "fees.pr.caregiver.gov", includesKeys: ["fees.includes.pr.1", "fees.includes.pr.2", "fees.includes.pr.3", "fees.includes.pr.4"] },
    { titleKey: "fees.pr.hc", review: "$900 – $1,600", guided: "$2,200 – $4,000", full: "$4,500 – $7,000", govKey: "fees.pr.hc.gov", includesKeys: ["fees.includes.appeal.1", "fees.includes.appeal.2", "fees.includes.appeal.3", "fees.includes.pr.4"] },
  ],
  dependents: [
    { titleKey: "fees.dep.spouse", review: "$250 – $450", guided: "$450 – $700", full: "$800 – $1,200", govKey: "fees.dep.spouse.gov", includesKeys: ["fees.includes.dep.1", "fees.includes.dep.2", "fees.includes.pr.3", "fees.includes.pr.4"] },
    { titleKey: "fees.dep.child", review: "$125 – $225", guided: "$225 – $350", full: "$400 – $600", govKey: "fees.dep.child.gov", includesKeys: ["fees.includes.dep.1", "fees.includes.dep.2", "fees.includes.pr.3", "fees.includes.pr.4"] },
  ],
  other: [
    { titleKey: "fees.other.citizenship", review: "$450 – $900", guided: "$900 – $1,500", full: "$1,500 – $2,500", govKey: "fees.other.citizenship.gov", includesKeys: ["fees.includes.citizenship.1", "fees.includes.citizenship.2", "fees.includes.citizenship.3", "fees.includes.citizenship.4"] },
    { titleKey: "fees.other.prcard", review: "$250 – $450", guided: "$450 – $700", full: "$800 – $1,200", gov: "$50", includesKeys: ["fees.includes.prcard.1", "fees.includes.prcard.2", "fees.includes.prcard.3"] },
    { titleKey: "fees.other.residence", review: "$400 – $900", guided: "$700 – $1,500", full: "$1,200 – $2,500", govKey: "fees.other.refusal.gov", includesKeys: ["fees.includes.residence.1", "fees.includes.residence.2", "fees.includes.residence.3"] },
    { titleKey: "fees.other.cert", review: "$250 – $450", guided: "$450 – $700", full: "$800 – $1,200", gov: "$75", includesKeys: ["fees.includes.citizenship.1", "fees.includes.citizenship.2", "fees.includes.citizenship.3"] },
    { titleKey: "fees.other.trp", review: "$900 – $1,250", guided: "$1,500 – $2,100", full: "$2,500 – $3,500", gov: "$239.75", includesKeys: ["fees.includes.appeal.1", "fees.includes.appeal.2", "fees.includes.appeal.3", "fees.includes.appeal.4"] },
    { titleKey: "fees.other.rehab", review: "$1,000 – $1,750", guided: "$1,800 – $3,000", full: "$3,000 – $5,000", govKey: "fees.other.rehab.gov", includesKeys: ["fees.includes.appeal.1", "fees.includes.appeal.2", "fees.includes.appeal.3", "fees.includes.appeal.4"] },
    { titleKey: "fees.other.arc", review: "$500 – $1,050", guided: "$900 – $1,800", full: "$1,500 – $3,000", gov: "$479.75", includesKeys: ["fees.includes.appeal.1", "fees.includes.appeal.2", "fees.includes.appeal.3"] },
    { titleKey: "fees.other.refusal", review: "$175 – $525", guided: "$300 – $900", full: "$500 – $1,500", govKey: "fees.other.refusal.gov", includesKeys: ["fees.includes.refusal.1", "fees.includes.refusal.2", "fees.includes.refusal.3"] },
    { titleKey: "fees.other.atip", review: "$150 – $250", guided: "—", full: "—", gov: "$5", includesKeys: ["fees.includes.atip.1", "fees.includes.atip.2", "fees.includes.atip.3"] },
  ],
};

function tFee(key, fallback) {
  return window.NuviaI18n ? window.NuviaI18n.t(key) : fallback;
}

function renderConsultFeeCard(item, index) {
  const title = tFee(item.titleKey, item.titleKey);
  const noteKey = item.noteKey || "";
  const note = noteKey
    ? `<p class="fees-consult-card-note" data-i18n="${noteKey}">${tFee(noteKey, noteKey)}</p>`
    : "";
  const includes = item.includesKeys
    .map((key) => `<li data-i18n="${key}">${tFee(key, key)}</li>`)
    .join("");

  return `
    <article class="fees-consult-card">
      <h3 data-i18n="${item.titleKey}">${title}</h3>
      <div class="fees-consult-price">
        <span class="fee-label" data-i18n="fees.col.consult">Consultation Fee</span>
        <strong>${item.fee}</strong>
        <span class="fee-tax-note" data-i18n="fees.tax.note">+ tax if applicable</span>
      </div>
      ${note}
      <h4 class="pricing-service-includes-title" data-i18n="fees.includes.consultHeading">Consultation includes:</h4>
      <ul class="pricing-service-includes">${includes}</ul>
    </article>
  `;
}

function renderFeeServiceCard(item, index) {
  const title = tFee(item.titleKey, item.titleKey);
  const gov = item.gov || tFee(item.govKey, item.govKey || "");
  const includes = item.includesKeys
    .map((key) => `<li data-i18n="${key}">${tFee(key, key)}</li>`)
    .join("");

  const feeGrid = item.flat
    ? `
        <div class="pricing-service-fees pricing-service-fees-flat">
          <div class="pricing-service-fee pricing-service-single">
            <span class="fee-label" data-i18n="fees.col.consult">Consultation Fee</span>
            <strong>${item.fee}</strong>
            <span class="fee-tax-note" data-i18n="fees.tax.note">+ tax if applicable</span>
          </div>
          <div class="pricing-service-fee pricing-service-gov">
            <span class="fee-label" data-i18n="fees.col.govShort">Gov / IRCC Fee</span>
            <strong${item.govKey ? ` data-i18n="${item.govKey}"` : ""}>${gov}</strong>
            <span class="fee-tax-note" data-i18n="fees.gov.payable">Payable to government</span>
          </div>
        </div>
        <h4 class="pricing-service-includes-title" data-i18n="fees.includes.consultHeading">Consultation includes:</h4>
      `
    : `
        <div class="pricing-service-fees">
          <div class="pricing-service-fee tier-col tier-review">
            <span class="fee-label" data-i18n="fees.col.review">Document Review</span>
            <strong>${item.review}</strong>
            <span class="fee-tax-note" data-i18n="fees.tax.note">+ tax if applicable</span>
          </div>
          <div class="pricing-service-fee tier-col tier-guided">
            <span class="fee-label" data-i18n="fees.col.guided">Guided Support</span>
            <strong>${item.guided}</strong>
            <span class="fee-tax-note" data-i18n="fees.tax.note">+ tax if applicable</span>
          </div>
          <div class="pricing-service-fee tier-col tier-full">
            <span class="fee-label" data-i18n="fees.col.full">Full Representation</span>
            <strong>${item.full}</strong>
            <span class="fee-tax-note" data-i18n="fees.tax.note">+ tax if applicable</span>
          </div>
          <div class="pricing-service-fee pricing-service-gov">
            <span class="fee-label" data-i18n="fees.col.govShort">Gov / IRCC Fee</span>
            <strong${item.govKey ? ` data-i18n="${item.govKey}"` : ""}>${gov}</strong>
            <span class="fee-tax-note" data-i18n="fees.gov.payable">Payable to government</span>
          </div>
        </div>
        <h4 class="pricing-service-includes-title" data-i18n="fees.includes.heading">Full Representation includes:</h4>
      `;

  return `
    <article class="pricing-service-card" data-fee-card>
      <button type="button" class="pricing-service-toggle" aria-expanded="false" aria-controls="fee-panel-${index}">
        <span class="pricing-service-title" data-i18n="${item.titleKey}">${title}</span>
        <span class="pricing-service-chevron" aria-hidden="true"></span>
      </button>
      <div class="pricing-service-panel" id="fee-panel-${index}" hidden>
        ${feeGrid}
        <ul class="pricing-service-includes">${includes}</ul>
      </div>
    </article>
  `;
}

function renderFeesCatalog(container, items) {
  if (!container || !items?.length) return;
  if (container.dataset.catalog === "consult") {
    container.innerHTML = items.map((item, index) => renderConsultFeeCard(item, index)).join("");
    return;
  }
  container.innerHTML = items.map((item, index) => renderFeeServiceCard(item, `${container.dataset.catalog}-${index}`)).join("");
}

function bindFeesCatalogToggles() {
  if (bindFeesCatalogToggles.bound) return;
  bindFeesCatalogToggles.bound = true;

  document.addEventListener("click", (event) => {
    const btn = event.target.closest(".pricing-service-toggle");
    if (!btn) return;

    const expanded = btn.getAttribute("aria-expanded") === "true";
    const panel = document.getElementById(btn.getAttribute("aria-controls"));

    if (!expanded) {
      document.querySelectorAll(".pricing-service-toggle[aria-expanded='true']").forEach((openBtn) => {
        if (openBtn === btn) return;
        openBtn.setAttribute("aria-expanded", "false");
        const openPanel = document.getElementById(openBtn.getAttribute("aria-controls"));
        if (openPanel) openPanel.hidden = true;
      });
    }

    btn.setAttribute("aria-expanded", expanded ? "false" : "true");
    if (panel) panel.hidden = expanded;
  });
}

function initFeesCatalog() {
  document.querySelectorAll("[data-fees-catalog]").forEach((container) => {
    const key = container.dataset.feesCatalog;
    const items = FEES_CATALOG[key];
    renderFeesCatalog(container, items);
  });

  bindFeesCatalogToggles();

  if (window.NuviaI18n) window.NuviaI18n.applyTranslations();
}

document.addEventListener("DOMContentLoaded", initFeesCatalog);
window.initFeesCatalog = initFeesCatalog;
