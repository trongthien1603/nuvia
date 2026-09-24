const IRCC_PTIME_URL = {
  en: "https://www.canada.ca/content/dam/ircc/documents/json/data-ptime-en.json",
  fr: "https://www.canada.ca/content/dam/ircc/documents/json/data-ptime-fr.json",
};

const IRCC_BACKLOG_URL =
  "https://www.canada.ca/en/immigration-refugees-citizenship/corporate/reports-statistics/statistics-open-data/immigration-stats/application-processing-system.html";

const IRCC_PTIME_OFFICIAL =
  "https://www.canada.ca/en/immigration-refugees-citizenship/services/application/check-processing-times.html";

const IRCC_INVENTORY_OFFICIAL =
  "https://www.canada.ca/en/immigration-refugees-citizenship/corporate/reports-statistics/statistics-open-data/immigration-stats/application-inventory.html";

const IRCC_TREND_HISTORY =
  "https://github.com/aafre/ircc-processing-times/tree/main/scraper/data/history";


const SNAPSHOT_KEY = "nuvia-ircc-ptime-snapshots";

const IRCC_PTIME_BASELINE = {
  date: "September 16, 2026",
  sections: {
    work: {
      lastupdated: "September 16, 2026",
      countries: {
        CA: { value: "109 days", days: 109 },
        US: { value: "3 weeks", days: 21 },
        IN: { value: "10 weeks", days: 70 },
        PH: { value: "7 weeks", days: 49 },
        PK: { value: "8 weeks", days: 56 },
        NG: { value: "10 weeks", days: 70 },
        VN: { value: "5 weeks", days: 35 },
        CN: { value: "4 weeks", days: 28 },
        FR: { value: "3 weeks", days: 21 },
      },
    },
    study: {
      lastupdated: "September 16, 2026",
      countries: {
        CA: { value: "7 weeks", days: 49 },
        US: { value: "6 weeks", days: 42 },
        IN: { value: "5 weeks", days: 35 },
        PH: { value: "5 weeks", days: 35 },
        PK: { value: "7 weeks", days: 49 },
        NG: { value: "9 weeks", days: 63 },
        VN: { value: "4 weeks", days: 28 },
        CN: { value: "4 weeks", days: 28 },
        FR: { value: "4 weeks", days: 28 },
      },
    },
    "visitor-outside-canada": {
      lastupdated: "September 16, 2026",
      countries: {
        US: { value: "18 days", days: 18 },
        IN: { value: "34 days", days: 34 },
        PH: { value: "19 days", days: 19 },
        PK: { value: "76 days", days: 76 },
        NG: { value: "90 days", days: 90 },
        VN: { value: "34 days", days: 34 },
        CN: { value: "35 days", days: 35 },
        FR: { value: "38 days", days: 38 },
      },
    },
    supervisa: {
      lastupdated: "September 16, 2026",
      countries: {
        US: { value: "66 days", days: 66 },
        IN: { value: "69 days", days: 69 },
        PH: { value: "64 days", days: 64 },
        PK: { value: "132 days", days: 132 },
        NG: { value: "44 days", days: 44 },
        VN: { value: "40 days", days: 40 },
        CN: { value: "77 days", days: 77 },
        FR: { value: "110 days", days: 110 },
      },
    },
  },
};

const FEATURED_COUNTRIES = [
  { code: "CA", labelKey: "ptime.country.ca" },
  { code: "US", labelKey: "ptime.country.us" },
  { code: "IN", labelKey: "ptime.country.in" },
  { code: "PH", labelKey: "ptime.country.ph" },
  { code: "PK", labelKey: "ptime.country.pk" },
  { code: "NG", labelKey: "ptime.country.ng" },
  { code: "VN", labelKey: "ptime.country.vn" },
  { code: "CN", labelKey: "ptime.country.cn" },
  { code: "FR", labelKey: "ptime.country.fr" },
];

const PTIME_SECTIONS = [
  {
    key: "work",
    titleKey: "ptime.section.work",
    standardKey: "ptime.standard.work",
    chartColor: "#009f6b",
    trendField: "work",
    trendScope: "ca",
  },
  {
    key: "study",
    titleKey: "ptime.section.study",
    standardKey: "ptime.standard.study",
    chartColor: "#0077b6",
    trendField: "study",
    trendScope: "ca",
  },
  {
    key: "visitor-outside-canada",
    titleKey: "ptime.section.visitor",
    standardKey: "ptime.standard.visitor",
    chartColor: "#e76f51",
    trendField: "visitor",
    trendScope: "median",
  },
  {
    key: "supervisa",
    titleKey: "ptime.section.super",
    standardKey: "ptime.standard.super",
    chartColor: "#8338ec",
    trendField: "supervisa",
    trendScope: "median",
  },
];

const CHART_COUNTRIES = FEATURED_COUNTRIES.map(({ code }) => code);

const SECTION_HISTORY_FIELD = {
  work: "work",
  study: "study",
  "visitor-outside-canada": "visitor",
  supervisa: "supervisa",
};

let bundledBaseline = null;
let countryHistoriesCache = null;

function ptimeT(key, fallback) {
  return window.NuviaI18n ? window.NuviaI18n.t(key) : fallback;
}

function countryFlagImg(code) {
  const iso = code.toLowerCase();
  return `<img class="ptime-flag" src="https://flagcdn.com/24x18/${iso}.png" width="24" height="18" alt="" loading="lazy">`;
}

function ptimeSourceLink(url) {
  return `<a class="ptime-source-link" href="${url}" target="_blank" rel="noopener noreferrer" data-i18n="ptime.officialLink">${ptimeT("ptime.officialLink", "View on IRCC")}</a>`;
}

function sumFormattedNumbers(values) {
  const total = values.reduce((acc, value) => acc + Number(String(value).replace(/,/g, "")), 0);
  return total > 0 ? total.toLocaleString() : "";
}

function parseProcessingDays(value) {
  if (!value || typeof value !== "string") return null;
  const normalized = value.toLowerCase();
  if (
    normalized.includes("no processing") ||
    normalized.includes("unavailable") ||
    normalized.includes("not enough") ||
    normalized.includes("aucun délai") ||
    normalized.includes("non disponible")
  ) {
    return null;
  }

  const dayMatch = normalized.match(/(\d+)\s*(?:day|jour|jours)/);
  if (dayMatch) return Number(dayMatch[1]);

  const weekMatch = normalized.match(/(\d+)\s*(?:week|semaine|semaines)/);
  if (weekMatch) return Number(weekMatch[1]) * 7;

  const monthMatch = normalized.match(/(\d+)\s*(?:month|mois)/);
  if (monthMatch) return Number(monthMatch[1]) * 30;

  return null;
}

function loadSnapshots() {
  try {
    return JSON.parse(localStorage.getItem(SNAPSHOT_KEY)) || [];
  } catch {
    return [];
  }
}

function extractCompact(data) {
  const compact = { sections: {} };
  PTIME_SECTIONS.forEach(({ key }) => {
    const block = data[key];
    if (!block) return;
    compact.sections[key] = {
      lastupdated: block.lastupdated || "",
      countries: {},
    };
    FEATURED_COUNTRIES.forEach(({ code }) => {
      const value = block[code];
      if (value) {
        compact.sections[key].countries[code] = {
          value,
          days: parseProcessingDays(value),
        };
      }
    });
  });
  compact.date = data.work?.lastupdated || data.study?.lastupdated || new Date().toISOString().slice(0, 10);
  return compact;
}

function saveSnapshot(compact) {
  const snapshots = loadSnapshots();
  const idx = snapshots.findIndex((s) => s.date === compact.date);
  if (idx >= 0) snapshots[idx] = compact;
  else snapshots.push(compact);
  const trimmed = snapshots.slice(-16);
  localStorage.setItem(SNAPSHOT_KEY, JSON.stringify(trimmed));
  return trimmed;
}

function getBaselineUrl() {
  const script = document.querySelector('script[src*="ircc-processing-times"]');
  if (script?.src) return new URL("ircc-ptime-baseline.json", script.src).href;
  return "js/ircc-ptime-baseline.json";
}

async function loadBundledBaseline() {
  if (bundledBaseline) return bundledBaseline;
  bundledBaseline = IRCC_PTIME_BASELINE;
  try {
    const response = await fetch(getBaselineUrl(), { cache: "no-store" });
    if (response.ok) {
      const fetched = await response.json();
      if (fetched?.date && fetched?.sections) bundledBaseline = fetched;
    }
  } catch {
    /* inline baseline is always available */
  }
  return bundledBaseline;
}

function resolvePreviousSnapshot(existing, currentDate, baseline) {
  const priorRelease = [...existing].reverse().find((snapshot) => snapshot.date && snapshot.date !== currentDate);
  if (priorRelease) return priorRelease;
  const fallback = baseline || IRCC_PTIME_BASELINE;
  if (fallback.date && fallback.date !== currentDate) return fallback;
  return null;
}

function formatReleaseDisplayDate(isoDate) {
  if (!isoDate) return "";
  const parsed = new Date(`${isoDate}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) return isoDate;
  return parsed.toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" });
}

/** IRCC JSON lastupdated string → YYYY-MM-DD */
function parseIrccLastUpdated(displayDate) {
  if (!displayDate || typeof displayDate !== "string") return null;
  const parsed = Date.parse(displayDate.trim());
  if (Number.isNaN(parsed)) return null;
  return new Date(parsed).toISOString().slice(0, 10);
}

function historyEntriesWithField(history, field) {
  if (!Array.isArray(history) || !field) return [];
  return [...history]
    .filter((entry) => entry[field] != null && entry.date)
    .sort((a, b) => a.date.localeCompare(b.date));
}

/** One snapshot per ~IRCC weekly release (daily scrapes collapsed to ≥6-day gaps). */
function pickWeeklySnapshots(history, field) {
  const sorted = historyEntriesWithField(history, field);
  if (!sorted.length) return [];

  const weeks = [];
  let lastPicked = null;

  sorted.forEach((entry) => {
    if (!lastPicked) {
      weeks.push(entry);
      lastPicked = entry.date;
      return;
    }
    const diffDays = (new Date(`${entry.date}T12:00:00`) - new Date(`${lastPicked}T12:00:00`)) / 86400000;
    if (diffDays >= 6) {
      weeks.push(entry);
      lastPicked = entry.date;
    }
  });

  const latest = sorted[sorted.length - 1];
  if (weeks[weeks.length - 1]?.date !== latest.date) weeks.push(latest);
  return weeks;
}

function historyValueOnOrBefore(history, field, targetIso) {
  if (!targetIso) return null;
  const sorted = historyEntriesWithField(history, field).filter((entry) => entry.date <= targetIso);
  if (!sorted.length) return null;
  const days = Number(sorted[sorted.length - 1][field]);
  return Number.isNaN(days) ? null : days;
}

function referenceCountryForSection(sectionKey) {
  return sectionKey === "work" || sectionKey === "study" ? "CA" : "US";
}

/** Prior weekly IRCC release date (ISO), anchored to live lastupdated from Canada.ca JSON. */
function getPreviousIrccReleaseIso(histories, sectionKey, field, currentReleaseIso) {
  const refCode = referenceCountryForSection(sectionKey);
  const weekly = pickWeeklySnapshots(histories[refCode] || [], field);
  if (weekly.length < 2) return null;

  let anchorIdx = weekly.length - 1;
  if (currentReleaseIso) {
    anchorIdx = -1;
    for (let i = weekly.length - 1; i >= 0; i -= 1) {
      if (weekly[i].date <= currentReleaseIso) {
        anchorIdx = i;
        break;
      }
    }
    if (anchorIdx < 0) return null;
  }

  if (anchorIdx < 1) return null;
  const previousIso = weekly[anchorIdx - 1].date;
  if (currentReleaseIso && previousIso >= currentReleaseIso) return null;
  return previousIso;
}

function median(values) {
  const nums = values.filter((v) => v != null && !Number.isNaN(v)).sort((a, b) => a - b);
  if (!nums.length) return null;
  const mid = Math.floor(nums.length / 2);
  return nums.length % 2 ? nums[mid] : Math.round((nums[mid - 1] + nums[mid]) / 2);
}

async function loadAllCountryHistories() {
  if (countryHistoriesCache) return countryHistoriesCache;

  const entries = await Promise.all(
    FEATURED_COUNTRIES.map(async ({ code }) => [code, await fetchTrendHistory(code)])
  );
  countryHistoriesCache = Object.fromEntries(entries);
  return countryHistoriesCache;
}

function buildHistoryPreviousSnapshot(histories, sectionKey, currentReleaseIso) {
  const field = SECTION_HISTORY_FIELD[sectionKey];
  if (!field) return null;

  const previousIso = getPreviousIrccReleaseIso(histories, sectionKey, field, currentReleaseIso);
  if (!previousIso) return null;

  const countries = {};
  FEATURED_COUNTRIES.forEach(({ code }) => {
    const prevDays = historyValueOnOrBefore(histories[code] || [], field, previousIso);
    if (prevDays != null) countries[code] = { days: prevDays };
  });

  if (!Object.keys(countries).length) return null;

  return {
    date: formatReleaseDisplayDate(previousIso),
    isoDate: previousIso,
    sections: {
      [sectionKey]: { countries },
    },
  };
}

function formatDelta(currentDays, previousDays) {
  if (currentDays == null || previousDays == null) return "";
  const diff = currentDays - previousDays;
  if (diff === 0) {
    return `<span class="ptime-delta unchanged">(${ptimeT("ptime.delta.unchanged", "Unchanged")})</span>`;
  }
  if (Math.abs(diff) >= 7 && Math.abs(diff) % 7 === 0) {
    const weeks = diff / 7;
    const cls = weeks > 0 ? "up" : "down";
    const sign = weeks > 0 ? "+" : "-";
    return `<span class="ptime-delta ${cls}">(${sign}${Math.abs(weeks)}wk)</span>`;
  }
  const cls = diff > 0 ? "up" : "down";
  const sign = diff > 0 ? "+" : "";
  return `<span class="ptime-delta ${cls}">(${sign}${diff}d)</span>`;
}

function sectionInsight(rows) {
  const withDays = rows.filter((row) => row.days !== null);
  if (!withDays.length) return ptimeT("ptime.insight.default", "Weekly IRCC estimates by country.");

  const sorted = [...withDays].sort((a, b) => a.days - b.days);
  const fastest = sorted[0];
  const slowest = sorted[sorted.length - 1];

  if (fastest.code === slowest.code) {
    return ptimeT("ptime.insight.single", "Processing times are consistent across listed countries.");
  }

  return ptimeT("ptime.insight.range", "Fastest: {fast} ({fastTime}) · Slowest: {slow} ({slowTime})")
    .replace("{fast}", ptimeT(fastest.labelKey, fastest.code))
    .replace("{fastTime}", fastest.value)
    .replace("{slow}", ptimeT(slowest.labelKey, slowest.code))
    .replace("{slowTime}", slowest.value);
}

function renderPtimeSection(sectionKey, data, titleKey, standardKey, histories) {
  const block = data[sectionKey];
  if (!block) return "";

  const updated = block.lastupdated || "";
  const currentReleaseIso = parseIrccLastUpdated(updated);
  const field = SECTION_HISTORY_FIELD[sectionKey];
  const previousSnapshot = buildHistoryPreviousSnapshot(histories, sectionKey, currentReleaseIso);
  const prevSection = previousSnapshot?.sections?.[sectionKey]?.countries || {};

  const rows = FEATURED_COUNTRIES.map(({ code, labelKey }) => {
    const value = block[code] || ptimeT("ptime.unavailable", "No processing time available");
    const days = parseProcessingDays(value);
    const prevDays = field ? prevSection[code]?.days ?? null : null;
    const delta = formatDelta(days, prevDays);
    const label = ptimeT(labelKey, code);
    return { code, labelKey, label, value, days, delta };
  });

  const maxDays = Math.max(...rows.map((row) => row.days || 0), 1);
  const listItems = rows
    .map(({ code, labelKey, label, value, days, delta }) => {
      const width = days ? Math.max(8, Math.round((days / maxDays) * 100)) : 0;
      return `
        <li class="ptime-row">
          <div class="ptime-row-head">
            <span class="ptime-country">${countryFlagImg(code)}<span data-i18n="${labelKey}">${label}</span></span>
            <span class="ptime-value">${value}${delta ? ` ${delta}` : ""}</span>
          </div>
          ${
            days
              ? `<div class="ptime-bar-track" aria-hidden="true"><span class="ptime-bar-fill" style="width:${width}%"></span></div>`
              : ""
          }
        </li>`;
    })
    .join("");

  const insight = sectionInsight(rows);
  const compareNote = previousSnapshot
    ? `<p class="ptime-compare-note">${ptimeT("ptime.delta.compareNote", "Compared to previous IRCC release")} (${previousSnapshot.date})</p>`
    : `<p class="ptime-compare-note" data-i18n="ptime.delta.firstVisit">Weekly change indicators appear after IRCC publishes a new release.</p>`;

  return `
    <article class="ptime-card">
      <header class="ptime-card-header">
        <h2 data-i18n="${titleKey}">${ptimeT(titleKey, sectionKey)}</h2>
        ${updated ? `<p class="ptime-updated"><span data-i18n="ptime.updated">Last IRCC update:</span> ${updated}</p>` : ""}
        <p class="ptime-insight">${insight}</p>
        ${compareNote}
      </header>
      <ul class="ptime-list">${listItems}</ul>
      <p class="ptime-standard" data-i18n="${standardKey}">${ptimeT(standardKey, "")}</p>
      <footer class="ptime-card-source">${ptimeSourceLink(IRCC_PTIME_OFFICIAL)}</footer>
    </article>
  `;
}

/** Prefer this many monthly points when the archive has enough history (scraper began ~Apr 2026). */
const TREND_CHART_TARGET_MONTHS = 9;
const TREND_CHART_MONTHS = 24;
const TREND_CHART_MIN_POINTS = 2;

function monthKeyFromIso(isoDate) {
  return isoDate?.slice(0, 7) || "";
}

/** Latest scrape date in each calendar month, merged across histories for a field. */
function monthlyAnchorDates(histories, field, maxMonths = TREND_CHART_MONTHS) {
  const byMonth = new Map();
  const historyList =
    field === "work" || field === "study"
      ? [histories?.CA]
      : Object.values(histories || {});

  historyList.forEach((history) => {
    historyEntriesWithField(history || [], field).forEach((entry) => {
      const key = monthKeyFromIso(entry.date);
      if (!key) return;
      const prev = byMonth.get(key);
      if (!prev || entry.date > prev) byMonth.set(key, entry.date);
    });
  });

  return [...byMonth.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-maxMonths)
    .map(([, isoDate]) => isoDate);
}

function primaryHistoryForField(histories, field) {
  if (field === "work" || field === "study") return histories?.CA || [];
  return histories?.US || histories?.IN || histories?.CA || [];
}

/** ~Monthly spacing when calendar months are fewer than the target (short archive). */
function intervalTrendPoints(histories, field, resolveDays, targetCount = TREND_CHART_TARGET_MONTHS) {
  const sorted = historyEntriesWithField(primaryHistoryForField(histories, field), field);
  if (sorted.length < TREND_CHART_MIN_POINTS) return [];

  const picked = [sorted[sorted.length - 1]];
  let idx = sorted.length - 1;

  while (picked.length < targetCount && idx > 0) {
    const cutoff = new Date(`${picked[0].date}T12:00:00`);
    cutoff.setDate(cutoff.getDate() - 28);
    const cutIso = cutoff.toISOString().slice(0, 10);
    while (idx > 0 && sorted[idx].date >= cutIso) idx -= 1;
    if (idx < 0) break;
    if (sorted[idx].date === picked[0].date) break;
    picked.unshift(sorted[idx]);
  }

  return picked
    .map((entry) => {
      const days = resolveDays(entry.date);
      return days != null ? { date: entry.date, days } : null;
    })
    .filter(Boolean);
}

function pointsFromMonthlyAnchors(histories, field, resolveDays) {
  const monthly = monthlyAnchorDates(histories, field, TREND_CHART_MONTHS)
    .map((date) => {
      const days = resolveDays(date);
      return days != null ? { date, days } : null;
    })
    .filter(Boolean);

  if (monthly.length >= TREND_CHART_TARGET_MONTHS) {
    return monthly.slice(-TREND_CHART_MONTHS);
  }

  const interval = intervalTrendPoints(histories, field, resolveDays, TREND_CHART_TARGET_MONTHS);
  return interval.length > monthly.length ? interval : monthly;
}

function formatTrendMonthLabel(isoDate) {
  if (!isoDate) return "";
  const parsed = new Date(`${isoDate}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) return isoDate.slice(0, 7);
  return parsed.toLocaleDateString("en-CA", { month: "short", year: "2-digit" });
}

async function fetchTrendHistory(countryCode) {
  const url = `https://raw.githubusercontent.com/aafre/ircc-processing-times/main/scraper/data/history/${countryCode}.json`;
  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) return [];
    return await response.json();
  } catch {
    return [];
  }
}

function buildMedianTrendPoints(histories, field) {
  return pointsFromMonthlyAnchors(histories, field, (date) => {
    const values = FEATURED_COUNTRIES.map(({ code }) =>
      historyValueOnOrBefore(histories[code] || [], field, date)
    );
    return median(values);
  });
}

async function buildTrendSeries(histories) {
  const series = PTIME_SECTIONS.map((section) => {
    const field = section.trendField;
    let points;
    if (section.trendScope === "median") {
      points = buildMedianTrendPoints(histories, field);
    } else {
      points = pointsFromMonthlyAnchors(histories, field, (date) =>
        historyValueOnOrBefore(histories.CA || [], field, date)
      );
    }
    return { ...section, points };
  }).filter((item) => item.points.length >= TREND_CHART_MIN_POINTS);

  return series;
}

function releaseIsoBySection(data) {
  const map = {};
  PTIME_SECTIONS.forEach(({ key }) => {
    map[key] = parseIrccLastUpdated(data[key]?.lastupdated || "");
  });
  return map;
}

function previousTrendDays(histories, section, currentReleaseIso) {
  const { key, trendField, trendScope } = section;
  const previousIso = getPreviousIrccReleaseIso(histories, key, trendField, currentReleaseIso);
  if (!previousIso) return null;
  if (trendScope === "median") {
    return median(
      FEATURED_COUNTRIES.map(({ code }) => historyValueOnOrBefore(histories[code] || [], trendField, previousIso))
    );
  }
  const refCode = referenceCountryForSection(key);
  return historyValueOnOrBefore(histories[refCode] || [], trendField, previousIso);
}

function renderTrendChartFromSeries(series, histories, sectionReleaseIsos) {
  const container = document.getElementById("ptime-trends-chart");
  const note = document.getElementById("ptime-trends-note");
  if (!container) return;

  if (!series.length) {
    container.innerHTML = `<p class="ptime-chart-empty" data-i18n="ptime.chart.empty">${ptimeT(
      "ptime.chart.empty",
      "Trend lines appear when IRCC history data is available. Check your connection and reload."
    )}</p>`;
    if (note) note.textContent = "";
    return;
  }

  const width = 720;
  const height = 280;
  const pad = { top: 24, right: 24, bottom: 48, left: 48 };
  const innerW = width - pad.left - pad.right;
  const innerH = height - pad.top - pad.bottom;

  const dateSet = new Set();
  series.forEach(({ points }) => points.forEach((point) => dateSet.add(point.date)));
  const dates = [...dateSet].sort();

  const allDays = series.flatMap(({ points }) => points.map((point) => point.days));
  const maxY = Math.max(...allDays, 30);
  const minY = 0;

  const xScale = (date) => {
    const idx = dates.indexOf(date);
    return pad.left + (idx / Math.max(dates.length - 1, 1)) * innerW;
  };
  const yScale = (days) => pad.top + innerH - ((days - minY) / (maxY - minY || 1)) * innerH;

  const lines = series
    .map(({ chartColor, points }) => {
      const linePoints = points.map((point) => `${xScale(point.date)},${yScale(point.days)}`);
      if (linePoints.length < 2) return "";
      return `<polyline class="ptime-chart-line" points="${linePoints.join(" ")}" fill="none" stroke="${chartColor}" stroke-width="2.5" />`;
    })
    .join("");

  const xLabelStep = dates.length > 14 ? 2 : 1;
  const xLabels = dates
    .map((date, idx) => {
      if (idx % xLabelStep !== 0 && idx !== dates.length - 1) return "";
      const short = formatTrendMonthLabel(date);
      return `<text x="${xScale(date)}" y="${height - 12}" text-anchor="middle" font-size="10" fill="#666">${short}</text>`;
    })
    .join("");

  const yTicks = [0, Math.round(maxY / 2), maxY]
    .map((tick) => {
      const y = yScale(tick);
      return `
        <line x1="${pad.left}" y1="${y}" x2="${width - pad.right}" y2="${y}" stroke="#e5e7eb" stroke-width="1" />
        <text x="${pad.left - 8}" y="${y + 4}" text-anchor="end" font-size="10" fill="#666">${tick}d</text>`;
    })
    .join("");

  container.innerHTML = `
    <svg class="ptime-chart-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${ptimeT("ptime.chart.title", "Processing time trends")}">
      ${yTicks}
      ${lines}
      ${xLabels}
    </svg>
    <div class="ptime-chart-legend">
      ${series
        .map((section) => {
          const { titleKey, chartColor, trendScope, points } = section;
          const scopeLabel =
            trendScope === "median"
              ? ptimeT("ptime.chart.scope.median", "median of listed countries")
              : ptimeT("ptime.chart.scope.ca", "in Canada");
          const latestDays = points[points.length - 1]?.days;
          const prevDays = previousTrendDays(histories || {}, section, sectionReleaseIsos?.[section.key]);
          const delta = formatDelta(latestDays, prevDays);
          return `<span><i style="background:${chartColor}"></i><span data-i18n="${titleKey}">${ptimeT(titleKey, titleKey)}</span> · ${scopeLabel}${delta ? ` ${delta}` : ""}</span>`;
        })
        .join("")}
    </div>`;

  if (note) {
    const irccLink = `<a href="${IRCC_PTIME_OFFICIAL}" target="_blank" rel="noopener noreferrer">${ptimeT("ptime.chart.sourceIrcc", "IRCC processing times")}</a>`;
    const historyLink = `<a href="${IRCC_TREND_HISTORY}" target="_blank" rel="noopener noreferrer">${ptimeT("ptime.chart.sourceHistory", "weekly history archive")}</a>`;
    note.innerHTML = `${ptimeT(
      "ptime.chart.note",
      "Processing days over time (calendar month-end when enough history exists; otherwise ~monthly intervals). Work and study: in Canada; visitor and super visa: median of listed countries."
    )} ${ptimeT("ptime.chart.noteSources", "Data:")} ${irccLink} · ${historyLink}`;
  }
}

function renderPercentLineChart(container, chartConfig, pointsByKey) {
  if (!container || !chartConfig?.series?.length) return;

  const series = chartConfig.series
    .map(({ labelKey, color, pointsKey }) => ({
      labelKey,
      color,
      points: pointsByKey?.[pointsKey] || [],
    }))
    .filter((item) => item.points.length >= 2);

  if (!series.length) return;

  const width = 720;
  const height = 280;
  const pad = { top: 24, right: 24, bottom: 48, left: 48 };
  const innerW = width - pad.left - pad.right;
  const innerH = height - pad.top - pad.bottom;

  const labelSet = new Set();
  series.forEach(({ points }) => points.forEach((point) => labelSet.add(point.label)));
  const labels = [...labelSet];

  const maxY = Math.min(
    100,
    Math.max(...series.flatMap(({ points }) => points.map((point) => point.value)), 10)
  );
  const minY = 0;

  const xScale = (label) => {
    const idx = labels.indexOf(label);
    return pad.left + (idx / Math.max(labels.length - 1, 1)) * innerW;
  };
  const yScale = (value) => pad.top + innerH - ((value - minY) / (maxY - minY || 1)) * innerH;

  const lines = series
    .map(({ color, points }) => {
      const linePoints = points.map((point) => `${xScale(point.label)},${yScale(point.value)}`);
      if (linePoints.length < 2) return "";
      return `<polyline class="ptime-chart-line" points="${linePoints.join(" ")}" fill="none" stroke="${color}" stroke-width="2.5" />`;
    })
    .join("");

  const xLabels = labels
    .map((label, idx) => {
      if (labels.length > 8 && idx % 2 !== 0 && idx !== labels.length - 1) return "";
      return `<text x="${xScale(label)}" y="${height - 12}" text-anchor="middle" font-size="10" fill="#666">${label}</text>`;
    })
    .join("");

  const yTicks = [0, Math.round(maxY / 2), maxY]
    .map((tick) => {
      const y = yScale(tick);
      return `
        <line x1="${pad.left}" y1="${y}" x2="${width - pad.right}" y2="${y}" stroke="#e5e7eb" stroke-width="1" />
        <text x="${pad.left - 8}" y="${y + 4}" text-anchor="end" font-size="10" fill="#666">${tick}%</text>`;
    })
    .join("");

  container.innerHTML = `
    <h3 data-i18n="${chartConfig.titleKey}">${ptimeT(chartConfig.titleKey, chartConfig.titleKey)}</h3>
    <svg class="ptime-chart-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${ptimeT(chartConfig.titleKey, "Backlog trend chart")}">
      ${yTicks}
      ${lines}
      ${xLabels}
    </svg>
    <div class="ptime-chart-legend">
      ${series
        .map(
          ({ labelKey, color }) =>
            `<span><i style="background:${color}"></i><span data-i18n="${labelKey}">${ptimeT(labelKey, labelKey)}</span></span>`
        )
        .join("")}
    </div>`;
}

function averageBacklogSeries(keys, pointsByKey) {
  const template = pointsByKey[keys[0]] || [];
  return template.map(({ label }) => {
    let sum = 0;
    let count = 0;
    keys.forEach((key) => {
      const match = (pointsByKey[key] || []).find((point) => point.label === label);
      if (match) {
        sum += match.value;
        count += 1;
      }
    });
    return { label, value: count ? Math.round(sum / count) : 0 };
  });
}

function enrichBacklogTrendPoints(points) {
  if (!points) return points;
  return {
    ...points,
    tempResidenceAvg: averageBacklogSeries(["study", "work", "trv"], points),
    permResidenceAvg: averageBacklogSeries(["federalHighSkilled", "pnp", "spouse"], points),
  };
}

function renderBacklogTrendCharts(report) {
  const root = document.getElementById("ptime-inventory-trends");
  if (!root || !report?.backlogTrendCharts?.length || !report.backlogTrendPoints) return;

  const trendPoints = enrichBacklogTrendPoints(report.backlogTrendPoints);

  root.innerHTML = report.backlogTrendCharts
    .map((chartConfig, index) => `<div class="ptime-chart-card ptime-backlog-trend-card" id="ptime-backlog-trend-${index}"></div>`)
    .join("");

  report.backlogTrendCharts.forEach((chartConfig, index) => {
    const container = document.getElementById(`ptime-backlog-trend-${index}`);
    renderPercentLineChart(container, chartConfig, trendPoints);
  });

  const footnote = document.createElement("p");
  footnote.className = "ptime-chart-footnote ptime-inventory-trend-source";
  footnote.textContent = ptimeT("ptime.inventory.trendSource", "Backlog % trends from IRCC monthly inventory reports.");
  root.appendChild(footnote);
}

function renderCountryCompareChart(data) {
  const container = document.getElementById("ptime-country-chart");
  if (!container) return;

  const sectionKey = "work";
  const block = data[sectionKey];
  if (!block) return;

  const rows = CHART_COUNTRIES.map((code) => {
    const value = block[code] || "";
    const days = parseProcessingDays(value);
    const country = FEATURED_COUNTRIES.find((c) => c.code === code);
    return { code, labelKey: country?.labelKey || code, days, value };
  }).filter((r) => r.days != null);

  if (!rows.length) return;

  const maxDays = Math.max(...rows.map((r) => r.days));
  container.innerHTML = `
    <h3 data-i18n="ptime.chart.countryTitle">${ptimeT("ptime.chart.countryTitle", "Work Permits — current wait by country")}</h3>
    <p class="ptime-chart-desc" data-i18n="ptime.chart.countryDesc">${ptimeT(
      "ptime.chart.countryDesc",
      "Live IRCC work permit wait by country of application (refreshes on each page load)."
    )}</p>
    <ul class="ptime-country-bars">
      ${rows
        .map(({ code, labelKey, days, value }) => {
          const width = Math.max(8, Math.round((days / maxDays) * 100));
          return `
          <li>
            <span class="ptime-country-bar-label">${countryFlagImg(code)}<span data-i18n="${labelKey}">${ptimeT(labelKey, code)}</span></span>
            <div class="ptime-bar-track"><span class="ptime-bar-fill" style="width:${width}%"></span></div>
            <span class="ptime-country-bar-value">${value}</span>
          </li>`;
        })
        .join("")}
    </ul>
    <p class="ptime-chart-source">${ptimeSourceLink(IRCC_PTIME_OFFICIAL)}</p>`;
}

function parseBacklogMetrics(blockHtml) {
  if (!blockHtml) return null;
  const finalized = blockHtml.match(/Finalized[\s\S]*?<div class="h2 mt-0 mb-2">([\d,]+)<\/div>/i)?.[1] || "";
  const pending = blockHtml.match(/Applications not yet finalized[\s\S]*?<span class="h4 mt-0 mb-2">([\d,]+)<\/span>/i)?.[1] || "";
  if (!finalized && !pending) return null;
  return { finalized, pending };
}

function parseSectionInventory(html, summaryTitle) {
  const match = html.match(new RegExp(`<summary>${summaryTitle}<\\/summary>([\\s\\S]*?)<\\/details>`, "i"));
  if (!match) return null;

  const block = match[1];
  const dataAsOf = block.match(/Data as of\s*([^<]+)/i)?.[1]?.trim() || "";
  const finalizedValues = [...block.matchAll(/Finalized[\s\S]*?<div class="h2 mt-0 mb-2">([\d,]+)<\/div>/gi)].map(
    (entry) => entry[1]
  );
  const pendingValues = [
    ...block.matchAll(/Applications not yet finalized[\s\S]*?<span class="h4 mt-0 mb-2">([\d,]+)<\/span>/gi),
  ].map((entry) => entry[1]);

  return {
    dataAsOf,
    finalized: sumFormattedNumbers(finalizedValues),
    pending: sumFormattedNumbers(pendingValues),
  };
}

function parseBacklogSection(html) {
  const trMatch = html.match(/<summary>Temporary residence<\/summary>([\s\S]*?)<\/details>/i);
  const trSection = trMatch ? trMatch[1] : "";
  const tr = parseSectionInventory(html, "Temporary residence");
  const pr = parseSectionInventory(html, "Permanent residence");
  const citizenship = parseSectionInventory(html, "Citizenship");

  const studyMatch = trSection.match(/<summary>Study permits<\/summary>([\s\S]*?)<\/details>/i);
  const workMatch = trSection.match(/<summary>Work permits<\/summary>([\s\S]*?)<\/details>/i);
  const visitorMatch = trSection.match(/<summary>Visitor visas<\/summary>([\s\S]*?)<\/details>/i);

  const pendingTotal = sumFormattedNumbers(
    [tr?.pending, pr?.pending, citizenship?.pending].filter(Boolean)
  );

  return {
    dataAsOf: tr?.dataAsOf || pr?.dataAsOf || citizenship?.dataAsOf || "",
    tr,
    pr,
    citizenship,
    pendingTotal,
    study: parseBacklogMetrics(studyMatch?.[1]),
    work: parseBacklogMetrics(workMatch?.[1]),
    visitor: parseBacklogMetrics(visitorMatch?.[1]),
  };
}

function renderBacklogBreakdown(stats) {
  const breakdown = document.getElementById("ptime-backlog-breakdown");
  const grid = document.getElementById("ptime-backlog-breakdown-grid");
  if (!breakdown || !grid) return;

  const items = [
    { key: "study", titleKey: "ptime.backlog.dash.study", data: stats.study },
    { key: "work", titleKey: "ptime.backlog.dash.work", data: stats.work },
    { key: "visitor", titleKey: "ptime.backlog.dash.visitor", data: stats.visitor },
  ].filter((item) => item.data?.finalized || item.data?.pending);

  if (!items.length) {
    breakdown.hidden = true;
    return;
  }

  grid.innerHTML = items
    .map(
      ({ titleKey, data }) => `
      <article class="ptime-dash-mini">
        <span class="ptime-dash-mini-title" data-i18n="${titleKey}">${ptimeT(titleKey, titleKey)}</span>
        <div class="ptime-dash-mini-row">
          <span data-i18n="ptime.backlog.dash.finalizedShort">${ptimeT("ptime.backlog.dash.finalizedShort", "Finalized")}</span>
          <strong>${data.finalized || "—"}</strong>
        </div>
        <div class="ptime-dash-mini-row">
          <span data-i18n="ptime.backlog.dash.pendingShort">${ptimeT("ptime.backlog.dash.pendingShort", "Pending")}</span>
          <strong>${data.pending || "—"}</strong>
        </div>
      </article>`
    )
    .join("");
  breakdown.hidden = false;
}

function formatInventoryNumber(value) {
  if (value == null || value === "") return "—";
  if (typeof value === "string") return value;
  return Number(value).toLocaleString("en-CA");
}

function formatDeltaPercent(value) {
  if (value == null) return "—";
  const sign = value > 0 ? "+" : "";
  return `${sign}${value}%`;
}

function renderCategoryInventory(prefix, data, reportCategory) {
  const pendingEl = document.getElementById(`ptime-inventory-${prefix}-pending`);
  const finalizedEl = document.getElementById(`ptime-inventory-${prefix}-finalized`);
  const metaEl = document.getElementById(`ptime-inventory-${prefix}-meta`);
  if (!data && !reportCategory) return;

  if (pendingEl && data?.pending) pendingEl.textContent = data.pending;
  if (finalizedEl) {
    finalizedEl.textContent = `${ptimeT("ptime.inventory.finalizedYtd", "Finalized YTD")}: ${data?.finalized || "—"}`;
  }
  if (metaEl && reportCategory?.backlogPercent != null) {
    metaEl.textContent = `${reportCategory.backlogPercent}% ${ptimeT("ptime.inventory.backlogLabel", "in backlog")}`;
    metaEl.hidden = false;
  } else if (metaEl) {
    metaEl.hidden = true;
  }
}

function renderInventoryReport(report) {
  if (!report) return;

  const overview = document.getElementById("ptime-inventory-overview");
  const withinEl = document.getElementById("ptime-inventory-within");
  const backlogEl = document.getElementById("ptime-inventory-backlog");
  const monthlyDateEl = document.getElementById("ptime-inventory-monthly-date");

  if (monthlyDateEl && report.asOfDate) {
    monthlyDateEl.textContent = `${ptimeT("ptime.inventory.monthlyReport", "Service-standard & backlog % metrics from IRCC monthly report:")} ${report.asOfDate}`;
    monthlyDateEl.hidden = false;
  }

  if (report.overview && withinEl && backlogEl) {
    withinEl.textContent = formatInventoryNumber(report.overview.withinServiceStandards);
    backlogEl.textContent = formatInventoryNumber(report.overview.inBacklog);
    if (overview) overview.hidden = false;
  }

  renderBacklogTrendCharts(report);

  const tableWrap = document.getElementById("ptime-pr-backlog-table");
  const tableBody = document.getElementById("ptime-pr-backlog-body");
  if (tableWrap && tableBody && report.prBacklogStatus?.length) {
    tableBody.innerHTML = report.prBacklogStatus
      .map(
        (row) => `
        <tr>
          <td data-i18n="${row.programKey}">${ptimeT(row.programKey, row.program)}</td>
          <td>${row.backlogPercent}%</td>
          <td class="ptime-delta ${row.vsMonth > 0 ? "ptime-delta-up" : row.vsMonth < 0 ? "ptime-delta-down" : ""}">${formatDeltaPercent(row.vsMonth)}</td>
          <td class="ptime-delta ${row.vsYear > 0 ? "ptime-delta-up" : row.vsYear < 0 ? "ptime-delta-down" : ""}">${formatDeltaPercent(row.vsYear)}</td>
        </tr>`
      )
      .join("");
    tableWrap.hidden = false;
  }

  const highlightsWrap = document.getElementById("ptime-inventory-highlights");
  const highlightsGrid = document.getElementById("ptime-highlights-grid");
  if (highlightsWrap && highlightsGrid && report.highlights?.length) {
    highlightsGrid.innerHTML = report.highlights
      .map(
        (item) => `
        <article class="ptime-highlight-card">
          <span class="ptime-highlight-value">${item.value}</span>
          <span class="ptime-highlight-label" data-i18n="${item.labelKey}">${ptimeT(item.labelKey, item.labelKey)}</span>
        </article>`
      )
      .join("");
    highlightsWrap.hidden = false;
  }
}

function getInventoryReport() {
  return typeof IRCC_INVENTORY_REPORT !== "undefined" ? IRCC_INVENTORY_REPORT : null;
}

async function loadInventoryReport() {
  let report = getInventoryReport();
  try {
    const response = await fetch("js/ircc-inventory-report.json", { cache: "no-store" });
    if (response.ok) {
      const fetched = await response.json();
      report = { ...report, ...fetched, backlogTrendPoints: report?.backlogTrendPoints || fetched.backlogTrendPoints };
    }
  } catch {
    /* use embedded data */
  }
  if (report) renderInventoryReport(report);
  return report;
}

function renderBacklogStats(stats, ptimeLastUpdated, inventoryReport) {
  const totalEl = document.getElementById("ptime-inventory-total");
  const asOfDateEl = document.getElementById("ptime-backlog-asof-date");

  if (asOfDateEl && stats.dataAsOf) {
    asOfDateEl.textContent = `${ptimeT("ptime.backlog.liveAsOf", "Live pending & finalized as of")} ${stats.dataAsOf}`;
  }

  if (totalEl && stats.pendingTotal) {
    totalEl.textContent = stats.pendingTotal;
  }

  const totalFinalizedEl = document.getElementById("ptime-inventory-total-finalized");
  if (totalFinalizedEl) {
    const totalFinalized = sumFormattedNumbers(
      [stats.tr?.finalized, stats.pr?.finalized, stats.citizenship?.finalized].filter(Boolean)
    );
    totalFinalizedEl.textContent = `${ptimeT("ptime.inventory.finalizedYtd", "Finalized YTD")}: ${totalFinalized || "—"}`;
  }

  renderCategoryInventory("tr", stats.tr, inventoryReport?.categories?.temporaryResidence);
  renderCategoryInventory("pr", stats.pr, inventoryReport?.categories?.permanentResidence);
  renderCategoryInventory("cit", stats.citizenship, inventoryReport?.categories?.citizenship);

  renderBacklogBreakdown(stats);
}

async function loadBacklogStats(ptimeLastUpdated, inventoryReport) {
  try {
    const response = await fetch(IRCC_BACKLOG_URL, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const html = await response.text();
    const stats = parseBacklogSection(html);
    renderBacklogStats(stats, ptimeLastUpdated, inventoryReport);
  } catch {
    /* keep fallback copy in HTML */
  }
}

async function loadIrccProcessingTimes() {
  const root = document.getElementById("ircc-ptime-root");
  const status = document.getElementById("ircc-ptime-status");
  if (!root) return;

  const lang = window.NuviaI18n?.getLang?.() || "en";
  const url = IRCC_PTIME_URL[lang] || IRCC_PTIME_URL.en;

  if (status) {
    status.textContent = ptimeT("ptime.loading", "Loading official IRCC processing times…");
  }

  try {
    const [response, histories] = await Promise.all([fetch(url, { cache: "no-store" }), loadAllCountryHistories()]);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();

    const compact = extractCompact(data);
    saveSnapshot(compact);

    root.innerHTML = PTIME_SECTIONS.map(({ key, titleKey, standardKey }) =>
      renderPtimeSection(key, data, titleKey, standardKey, histories)
    ).join("");

    renderCountryCompareChart(data);

    const trendSeries = await buildTrendSeries(histories);
    renderTrendChartFromSeries(trendSeries, histories, releaseIsoBySection(data));

    const latest = data.work?.lastupdated || data.study?.lastupdated || "";
    const inventoryReport = await loadInventoryReport();
    await loadBacklogStats(latest, inventoryReport);

    if (status) {
      status.innerHTML = latest
        ? `${ptimeT("ptime.official", "Official IRCC data")} · ${latest} · <a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/application/check-processing-times.html" target="_blank" rel="noopener noreferrer" data-i18n="ptime.officialLink">View on IRCC</a>`
        : ptimeT("ptime.loaded", "Official IRCC data loaded.");
    }

    if (window.NuviaI18n) window.NuviaI18n.applyTranslations();
  } catch (error) {
    if (status) {
      status.innerHTML = `${ptimeT("ptime.error", "Unable to load live data.")} <a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/application/check-processing-times.html" target="_blank" rel="noopener noreferrer" data-i18n="ptime.officialLink">View on IRCC</a>`;
    }
    root.innerHTML = `<p class="ptime-fallback" data-i18n="ptime.fallback">${ptimeT(
      "ptime.fallback",
      "Visit the official IRCC processing times tool for the latest estimates."
    )}</p>`;
    if (window.NuviaI18n) window.NuviaI18n.applyTranslations();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const embeddedReport = getInventoryReport();
  if (embeddedReport) renderInventoryReport(embeddedReport);
  loadIrccProcessingTimes();
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      countryHistoriesCache = null;
      window.setTimeout(loadIrccProcessingTimes, 50);
    });
  });
});

window.loadIrccProcessingTimes = loadIrccProcessingTimes;
window.IRCC_BACKLOG_URL = IRCC_BACKLOG_URL;
