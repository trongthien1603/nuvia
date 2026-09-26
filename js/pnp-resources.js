const PNP_HUB_PAGE = "pnp.html";

const PNP_PROGRAMS = [
  { id: "aaip", abbr: "AAIP", titleKey: "pnp.ab.title", descKey: "pnp.ab.desc", url: "https://www.alberta.ca/alberta-advantage-immigration-program" },
  { id: "bc", abbr: "BC", titleKey: "pnp.bc.title", descKey: "pnp.bc.desc", url: "https://www.welcomebc.ca/Immigrate-to-B-C/Invitations-to-Apply" },
  { id: "mpnp", abbr: "MPNP", titleKey: "pnp.mb.title", descKey: "pnp.mb.desc", url: "https://immigratemanitoba.com/" },
  { id: "nb", abbr: "NBPNP", titleKey: "pnp.nb.title", descKey: "pnp.nb.desc", url: "https://www.welcomenb.ca/content/wel-bien/en/immigrating_and_working_in_new_brunswick/how_to_immigrate.html" },
  { id: "nl", abbr: "NLPNP", titleKey: "pnp.nl.title", descKey: "pnp.nl.desc", url: "https://www.gov.nl.ca/immigration/immigrating-to-newfoundland-and-labrador/" },
  { id: "ns", abbr: "NSNP", titleKey: "pnp.ns.title", descKey: "pnp.ns.desc", url: "https://novascotiaimmigration.com/", calcHub: false },
  { id: "nt", abbr: "NTNP", titleKey: "pnp.nt.title", descKey: "pnp.nt.desc", url: "https://www.immigratenwt.ca/immigrate-here" },
  { id: "oinp", abbr: "OINP", titleKey: "pnp.on.title", descKey: "pnp.on.desc", url: "https://www.ontario.ca/page/ontario-immigrant-nominee-program-oinp" },
  { id: "pei", abbr: "PEI", titleKey: "pnp.pe.title", descKey: "pnp.pe.desc", url: "https://www.princeedwardisland.ca/en/topic/office-immigration" },
  { id: "sk", abbr: "SINP", titleKey: "pnp.sk.title", descKey: "pnp.sk.desc", url: "https://www.saskatchewan.ca/residents/moving-to-saskatchewan/live-in-saskatchewan/by-immigrating/saskatchewan-immigrant-nominee-program", calcHub: false },
  { id: "ynp", abbr: "YNP", titleKey: "pnp.yt.title", descKey: "pnp.yt.desc", url: "https://yukon.ca/en/immigrate-yukon" },
  { id: "qc", abbr: "QC", titleKey: "pnp.qc.title", descKey: "pnp.qc.desc", url: "https://www.quebec.ca/en/immigration" },
];

function pnpT(key, fallback) {
  return window.NuviaI18n ? window.NuviaI18n.t(key) : fallback;
}

function pnpProgramsForDisplay() {
  const descById = Object.fromEntries(PNP_PROGRAMS.map((p) => [p.id, p.descKey]));
  if (window.PNP_CALCULATOR_PROGRAMS?.length) {
    return window.PNP_CALCULATOR_PROGRAMS.map((p) => ({
      id: p.id,
      abbr: p.abbr,
      titleKey: p.titleKey,
      url: p.officialUrl,
      profile: p.profile,
      descKey: descById[p.id],
    }));
  }
  return PNP_PROGRAMS;
}

function pnpProgramPortalUrl(program) {
  return program.url || program.officialUrl || "#";
}

function pnpOverviewSubtitle(program, lang) {
  if (program.profile?.subtitle && window.pnpProfileText) {
    return window.pnpProfileText(program.profile.subtitle, lang);
  }
  if (program.descKey) return pnpT(program.descKey, "");
  return pnpT("pnp.calc.cardHint", "Draw results & calculator");
}

/** Overview grid: linked cards without action buttons (services PNP section, etc.). */
function renderPnpOverviewGrid(containerId, { external = false } = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const lang = window.NuviaI18n?.getLang?.() || "en";
  const programs = pnpProgramsForDisplay();

  container.innerHTML = programs
    .map((program) => {
      const href = external ? `${PNP_HUB_PAGE}#${program.id}` : `#${program.id}`;
      const navAttr = external ? "" : ` data-pnp-program="${program.id}"`;
      const subtitle = pnpOverviewSubtitle(program, lang);
      return `
    <a href="${href}" class="card service-card"${navAttr}>
      <span class="tool-badge">${program.abbr}</span>
      <h3 data-i18n="${program.titleKey}">${pnpT(program.titleKey, program.abbr)}</h3>
      <p class="pnp-card-subtitle">${subtitle}</p>
    </a>`;
    })
    .join("");

}

/** Province cards with Draws & calculator + Official portal buttons. */
function renderPnpActionCards(containerId, { inHub = false } = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const programs = pnpProgramsForDisplay();

  container.innerHTML = programs
    .map((program) => {
      const calcHref = inHub ? `#${program.id}` : `${PNP_HUB_PAGE}#${program.id}`;
      const calcNav = inHub ? ` data-pnp-program="${program.id}"` : "";
      const portal = pnpProgramPortalUrl(program);
      return `
    <article class="pnp-province-card">
      <span class="tool-badge" aria-hidden="true">${program.abbr}</span>
      <h3 data-i18n="${program.titleKey}">${pnpT(program.titleKey, program.abbr)}</h3>
      <p data-i18n="${program.descKey}">${pnpT(program.descKey, "")}</p>
      <div class="pnp-card-actions">
        <a href="${calcHref}" class="btn btn-primary"${calcNav} data-i18n="pnp.openCalc">Draws & calculator</a>
        <a href="${portal}" class="btn btn-outline" target="_blank" rel="noopener noreferrer" data-i18n="pnp.openPortal">Official portal</a>
      </div>
    </article>
  `;
    })
    .join("");

}

/** @deprecated Use renderPnpActionCards */
function renderPnpCards(containerId) {
  renderPnpActionCards(containerId, { inHub: false });
}

document.addEventListener("DOMContentLoaded", () => {
  const servicesOverview = document.getElementById("services-pnp-overview-grid");
  if (servicesOverview) {
    if (window.enrichPnpCalculatorPrograms) window.enrichPnpCalculatorPrograms();
    renderPnpOverviewGrid("services-pnp-overview-grid", { external: true });
  }
});

window.renderPnpOverviewGrid = renderPnpOverviewGrid;
window.renderPnpActionCards = renderPnpActionCards;
window.renderPnpCards = renderPnpCards;
