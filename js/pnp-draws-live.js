/**
 * Provincial draw rows — one table per program from data/pnp-recent-draws.json
 * or program.lastDraw / recentDraws (never shared federal EE rounds).
 */

const PNP_DRAWS_LIMIT = 12;
const PNP_DRAWS_CACHE_VERSION = "v7";

function normalizeDrawRow(row) {
  if (!row) return null;
  let tone = row.tone || "";
  const invitesStr = String(row.invites != null ? row.invites : "").toLowerCase();
  const streamStr = String(row.stream || row.program || "").toLowerCase();
  if (!tone && (invitesStr === "closed" || streamStr.includes("intake period") && invitesStr.includes("closed"))) {
    tone = "closed";
  }
  if (!tone && (invitesStr.includes("target met") || invitesStr.includes("quota met") || streamStr.includes("closed"))) {
    tone = "closed";
  }
  return {
    date: row.date || "—",
    stream: row.stream || row.program || "—",
    minScore: row.minScore != null ? row.minScore : row.score != null ? row.score : "—",
    invites: row.invites != null ? row.invites : "—",
    tone,
  };
}

function drawsFromProgramData(program, limit = PNP_DRAWS_LIMIT) {
  const list = program.recentDraws?.length ? program.recentDraws : program.lastDraw ? [program.lastDraw] : [];
  return list.map(normalizeDrawRow).filter(Boolean).slice(0, limit);
}

async function fetchRecentPnpDraws(program, limit = PNP_DRAWS_LIMIT) {
  const cacheKey = `nuvia-pnp-draws-${PNP_DRAWS_CACHE_VERSION}-${program.id}`;

  let rows = [];

  const embedded = window.PNP_DRAWS_DATA?.[program.id];
  if (Array.isArray(embedded) && embedded.length) {
    rows = embedded.map(normalizeDrawRow).filter(Boolean);
    if (rows.length) {
      sessionStorage.setItem(cacheKey, JSON.stringify(rows.slice(0, limit)));
      return rows.slice(0, limit);
    }
  }

  const cached = sessionStorage.getItem(cacheKey);
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length) return parsed.slice(0, limit);
    } catch (_) {
      sessionStorage.removeItem(cacheKey);
    }
  }

  if (!rows.length) {
    try {
      const dir = window.location.pathname.replace(/[^/]*$/, "");
      const jsonUrl = `${window.location.origin}${dir}data/pnp-recent-draws.json`;
      const res = await fetch(jsonUrl, { cache: "no-store" });
      if (res.ok) {
        const payload = await res.json();
        const fromFile = payload?.[program.id];
        if (Array.isArray(fromFile) && fromFile.length) {
          rows = fromFile.map(normalizeDrawRow).filter(Boolean);
        }
      }
    } catch (_) {
      /* use program snapshot */
    }
  }

  if (!rows.length) {
    rows = drawsFromProgramData(program, limit);
  }

  if (rows.length) {
    sessionStorage.setItem(cacheKey, JSON.stringify(rows.slice(0, limit)));
  }

  return rows.slice(0, limit);
}

/** Clear stale caches from older logic (shared IRCC PNP rows). */
function clearLegacyPnpDrawCaches() {
  const remove = [];
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    if (key && key.startsWith("nuvia-pnp-draws-") && !key.includes(PNP_DRAWS_CACHE_VERSION)) {
      remove.push(key);
    }
  }
  remove.forEach((k) => sessionStorage.removeItem(k));
}

clearLegacyPnpDrawCaches();

window.NuviaPnpDraws = {
  fetchRecentPnpDraws,
  drawsFromProgramData,
  normalizeDrawRow,
};
