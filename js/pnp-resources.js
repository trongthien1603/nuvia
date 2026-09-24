const PNP_PROGRAMS = [
  { abbr: "AAIP", titleKey: "pnp.ab.title", descKey: "pnp.ab.desc", url: "https://www.alberta.ca/alberta-advantage-immigration-program" },
  { abbr: "BC", titleKey: "pnp.bc.title", descKey: "pnp.bc.desc", url: "https://www.welcomebc.ca/Immigrate-to-B-C/Invitations-to-Apply" },
  { abbr: "MPNP", titleKey: "pnp.mb.title", descKey: "pnp.mb.desc", url: "https://immigratemanitoba.com/" },
  { abbr: "NBPNP", titleKey: "pnp.nb.title", descKey: "pnp.nb.desc", url: "https://www.welcomenb.ca/content/wel-bien/en/immigrating_and_working_in_new_brunswick/how_to_immigrate.html" },
  { abbr: "NLPNP", titleKey: "pnp.nl.title", descKey: "pnp.nl.desc", url: "https://www.gov.nl.ca/immigration/immigrating-to-newfoundland-and-labrador/" },
  { abbr: "NSNP", titleKey: "pnp.ns.title", descKey: "pnp.ns.desc", url: "https://novascotiaimmigration.com/" },
  { abbr: "NTNP", titleKey: "pnp.nt.title", descKey: "pnp.nt.desc", url: "https://www.immigratenuavut.com/" },
  { abbr: "OINP", titleKey: "pnp.on.title", descKey: "pnp.on.desc", url: "https://www.ontario.ca/page/ontario-immigrant-nominee-program-oinp" },
  { abbr: "PEI", titleKey: "pnp.pe.title", descKey: "pnp.pe.desc", url: "https://www.princeedwardisland.ca/en/topic/pei-provincial-nominee-program" },
  { abbr: "SINP", titleKey: "pnp.sk.title", descKey: "pnp.sk.desc", url: "https://www.saskatchewan.ca/residents/moving-to-saskatchewan/live-in-saskatchewan/by-immigrating/saskatchewan-immigrant-nominee-program" },
  { abbr: "YNP", titleKey: "pnp.yt.title", descKey: "pnp.yt.desc", url: "https://yukon.ca/en/immigrate-yukon" },
  { abbr: "QC", titleKey: "pnp.qc.title", descKey: "pnp.qc.desc", url: "https://www.immigration-quebec.gouv.qc.ca/en/immigration-quebec/arrima.html" },
];

function pnpT(key, fallback) {
  return window.NuviaI18n ? window.NuviaI18n.t(key) : fallback;
}

function renderPnpCards() {
  const container = document.getElementById("pnp-programs-grid");
  if (!container) return;

  container.innerHTML = PNP_PROGRAMS.map(
    (program) => `
    <article class="pnp-province-card">
      <span class="tool-badge" aria-hidden="true">${program.abbr}</span>
      <h3 data-i18n="${program.titleKey}">${pnpT(program.titleKey, program.abbr)}</h3>
      <p data-i18n="${program.descKey}">${pnpT(program.descKey, "")}</p>
      <a href="${program.url}" class="btn btn-primary" target="_blank" rel="noopener noreferrer" data-i18n="pnp.openPortal">Open portal</a>
    </article>
  `
  ).join("");

  if (window.NuviaI18n) window.NuviaI18n.applyTranslations();
}

document.addEventListener("DOMContentLoaded", renderPnpCards);
