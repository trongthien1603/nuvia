/** Live Express Entry rounds from official IRCC JSON (same source as canada.ca rounds table). */

const IRCC_EE_ROUNDS_JSON = {
  en: "https://www.canada.ca/content/dam/ircc/documents/json/ee_rounds_123_en.json",
  fr: "https://www.canada.ca/content/dam/ircc/documents/json/ee_rounds_123_fr.json",
};

const EE_DRAWS_LIMIT = 10;
const EE_DRAWS_MIN = 5;

function eeDrawsLang() {
  const lang = window.NuviaI18n?.getLang?.() || "en";
  return lang === "fr" ? "fr" : "en";
}

function normalizeIrccRound(round) {
  if (!round) return null;
  const score = round.drawCRS ?? round.drawCutOff;
  return {
    date: round.drawDateFull || round.drawDate || "—",
    program: round.drawName || round.DrawText1 || round.drawText2 || "—",
    score: score != null && score !== "" ? score : "—",
    invites: round.drawSize != null ? round.drawSize : "—",
  };
}

async function fetchLiveExpressEntryDraws(limit = EE_DRAWS_LIMIT) {
  const lang = eeDrawsLang();
  let url = IRCC_EE_ROUNDS_JSON[lang] || IRCC_EE_ROUNDS_JSON.en;
  let response = await fetch(url, { cache: "no-store" });
  if (!response.ok && lang !== "en") {
    url = IRCC_EE_ROUNDS_JSON.en;
    response = await fetch(url, { cache: "no-store" });
  }
  if (!response.ok) throw new Error(`IRCC draws HTTP ${response.status}`);
  const payload = await response.json();
  const rounds = Array.isArray(payload?.rounds) ? payload.rounds : [];
  const cap = Math.min(Math.max(limit, EE_DRAWS_MIN), rounds.length);
  return rounds.slice(0, cap).map(normalizeIrccRound).filter(Boolean);
}

window.NuviaIrccDraws = {
  IRCC_EE_ROUNDS_JSON,
  fetchLiveExpressEntryDraws,
  normalizeIrccRound,
};
