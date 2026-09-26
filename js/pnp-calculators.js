function pnpCalcT(key, fallback) {
  return window.NuviaI18n ? window.NuviaI18n.t(key) : fallback;
}

function pnpQuickNavLabel(program) {
  const key = program.provinceKey || program.titleKey;
  return pnpCalcT(key, program.abbr);
}

function pnpQuickNavI18nKey(program) {
  return program.provinceKey || program.titleKey;
}

function renderProgramScoreDisclaimer(program) {
  const lang = window.NuviaI18n?.getLang?.() || "en";
  const side = window.PNP_PROGRAM_SIDEBAR?.[program.id];
  if (!side) return "";
  const disclaimer = window.pnpSidebarText(side.disclaimer, lang);
  return `<p class="pnp-calc-disclaimer pnp-score-disclaimer">${disclaimer}</p>`;
}

function renderProgramCalcGuidance(program) {
  const lang = window.NuviaI18n?.getLang?.() || "en";
  const side = window.PNP_PROGRAM_SIDEBAR?.[program.id];
  if (!side) return "";
  const increase = window.pnpSidebarList(side.increase, lang, { steps: true });
  const afterInvite = window.pnpSidebarList(side.afterInvite, lang, { steps: true });
  return `
    <div class="pnp-calc-below">
      <div class="pnp-guidance-panel">
        <article class="calc-card pnp-guidance-card pnp-guidance-card--score">
          <header class="pnp-guidance-card-head">
            <span class="pnp-guidance-icon pnp-guidance-icon--score" aria-hidden="true"></span>
            <h4>${pnpCalcT("pnp.calc.increaseScore", "How to increase your score")}</h4>
          </header>
          <ol class="pnp-guidance-steps">${increase}</ol>
        </article>
        <article class="calc-card pnp-guidance-card pnp-guidance-card--invite">
          <header class="pnp-guidance-card-head">
            <span class="pnp-guidance-icon pnp-guidance-icon--invite" aria-hidden="true"></span>
            <h4>${pnpCalcT("pnp.calc.afterInvite", "After you receive an invitation")}</h4>
          </header>
          <ol class="pnp-guidance-steps">${afterInvite}</ol>
        </article>
      </div>
    </div>`;
}

function renderProgramStatusBanner(program) {
  const lang = window.NuviaI18n?.getLang?.() || "en";
  const status = window.PNP_PROGRAM_STATUS?.[program.id];
  if (!status) return "";
  const tone = status.tone || "warning";
  const title = status.title ? window.pnpProfileText(status.title, lang) : "";
  const message = status.message ? window.pnpProfileText(status.message, lang) : "";
  return `
    <div class="pnp-program-status pnp-program-status-${tone}" role="status">
      ${title ? `<p class="pnp-program-status-title">${title}</p>` : ""}
      <p>${message}</p>
    </div>`;
}

function renderProgramQuotaNote(program) {
  const lang = window.NuviaI18n?.getLang?.() || "en";
  const note = program.profile?.quotaNote;
  if (!note) return "";
  return `
    <div class="calc-card pnp-quota-callout" role="note">
      <h4>${pnpCalcT("pnp.calc.quotaTitle", "Nomination allocation & intakes")}</h4>
      <p>${window.pnpProfileText(note, lang)}</p>
    </div>`;
}

function renderFieldControl(program, field, { penalty = false } = {}) {
  const lang = window.NuviaI18n?.getLang?.() || "en";
  const label = field.label ? window.pnpProfileText(field.label, lang) : pnpCalcT(field.labelKey, field.labelKey);
  const optionLabel = window.pnpOptionText || ((opt) => opt.l);
  const options = (field.options || [])
    .map((opt) => `<option value="${opt.v}">${optionLabel(opt, lang)}</option>`)
    .join("");
  const isPenalty =
    penalty ||
    field.penalty ||
    (field.options || []).some((opt) => Number(opt.v) < 0);
  return `
    <label class="calc-field ${isPenalty ? "calc-field-penalty" : ""}">
      <span>${label}</span>
      <select name="${field.name}" data-pnp-field data-program="${program.id}">${options}</select>
    </label>`;
}

function renderProgramForm(program) {
  const lang = window.NuviaI18n?.getLang?.() || "en";
  const map = program.fieldMap || {};
  const groups = program.fieldGroups || [
    { title: { en: "Your profile", fr: "Votre profil", vi: "Hồ sơ của bạn" }, fields: (program.fields || []).map((f) => f.name) },
  ];

  return groups
    .map((group) => {
      const isPenaltyGroup = group.penaltyGroup || /penalty|risk|pénalité|phạt|rủi ro/i.test(window.pnpProfileText(group.title, lang) || "");
      const fieldsHtml = (group.fields || [])
        .map((name) => {
          const field = map[name];
          return field ? renderFieldControl(program, field, { penalty: isPenaltyGroup }) : "";
        })
        .join("");
      if (!fieldsHtml) return "";
      const title = group.title ? window.pnpProfileText(group.title, lang) : "";
      return `
        <div class="calc-form-section ${groups.length > 1 ? "calc-form-section-accent" : ""} ${isPenaltyGroup ? "calc-form-section-penalty" : ""}">
          ${title ? `<h3 class="calc-form-section-title">${title}</h3>` : ""}
          <div class="calc-form-section-grid">${fieldsHtml}</div>
        </div>`;
    })
    .join("");
}

function renderProgramStreams(program) {
  const lang = window.NuviaI18n?.getLang?.() || "en";
  const eligibility = window.getPnpStreamEligibility?.(program);
  if (!eligibility?.items?.length) return "";
  const intro = window.pnpProfileText(eligibility.intro, lang);
  const streamCount = eligibility.items.length;
  let gridClass = "pnp-stream-grid--auto";
  if (streamCount === 4) gridClass = "pnp-stream-grid--4";
  else if (streamCount === 3) gridClass = "pnp-stream-grid--3";
  else if (streamCount === 2) gridClass = "pnp-stream-grid--2";
  const cards = eligibility.items
    .map((item, index) => {
      const accent = index % 4;
      const bullets = (item.bullets || [])
        .map((b) => `<li>${window.pnpProfileText(b, lang)}</li>`)
        .join("");
      const calcDisclaimer = item.calcDisclaimer
        ? `<p class="pnp-stream-calc-disclaimer">${window.pnpProfileText(item.calcDisclaimer, lang)}</p>`
        : "";
      return `
      <article class="pnp-stream-card pnp-stream-card--accent-${accent}">
        <div class="pnp-stream-card-head">
          <span class="pnp-stream-card-index" aria-hidden="true">${index + 1}</span>
          <h4 class="pnp-stream-card-title">${window.pnpProfileText(item.name, lang)}</h4>
        </div>
        <p class="pnp-stream-card-desc">${window.pnpProfileText(item.desc, lang)}</p>
        ${bullets ? `<ul class="pnp-stream-card-bullets">${bullets}</ul>` : ""}
        ${calcDisclaimer}
      </article>`;
    })
    .join("");
  const title = pnpCalcT("pnp.calc.streamsTitle", "Eligibility");
  return `
    <div class="calc-card pnp-streams-card">
      <div class="pnp-streams-card-head">
        <h3 data-i18n="pnp.calc.streamsTitle">${title || "Eligibility"}</h3>
      </div>
      ${intro ? `<p class="pnp-streams-intro">${intro}</p>` : ""}
      <div class="pnp-stream-grid ${gridClass}">${cards}</div>
    </div>`;
}

function renderDrawsBlock(program) {
  return `
    <div class="calc-card pnp-draw-summary">
      <h3>${pnpCalcT("pnp.calc.drawHistory", "PNP draw history")}</h3>
      <p class="calc-note pnp-draws-status" id="pnp-draws-status-${program.id}" aria-live="polite"></p>
      <div class="table-wrap crs-draws-table-wrap">
        <table class="fees-table crs-draws-table">
          <thead>
            <tr>
              <th>${pnpCalcT("pnp.calc.drawDate", "Date")}</th>
              <th>${pnpCalcT("pnp.calc.stream", "Stream")}</th>
              <th>${pnpCalcT("pnp.calc.minScore", "Min. score")}</th>
              <th>${pnpCalcT("pnp.calc.invites", "Invitations")}</th>
            </tr>
          </thead>
          <tbody id="pnp-draws-body-${program.id}"></tbody>
        </table>
      </div>
      <p class="calc-note pnp-draws-legend">${pnpCalcT("pnp.calc.drawLegend", "Invitations = ITAs issued in that round. Some streams (employer-only or graduate-only) may not publish a minimum score.")}</p>
      <p class="crs-draws-actions pnp-draws-link">
        <a href="${program.drawSourceUrl}" class="text-link" target="_blank" rel="noopener noreferrer">${pnpCalcT("pnp.calc.officialDraws", "Official draw page")}</a>
      </p>
    </div>`;
}

function wirePnpExclusiveFaq(root) {
  root.querySelectorAll(".program-section .pnp-faq-list").forEach((list) => {
    list.querySelectorAll(".pnp-faq-details").forEach((details) => {
      details.addEventListener("toggle", () => {
        if (!details.open) return;
        list.querySelectorAll(".pnp-faq-details").forEach((other) => {
          if (other !== details) other.open = false;
        });
      });
    });
  });
}

function renderProgramFaq(program) {
  const lang = window.NuviaI18n?.getLang?.() || "en";
  const faqList = window.PNP_PROGRAM_FAQ?.[program.id] || window.PNP_CALC_FAQ || [];
  const textFn = window.pnpFaqText;

  return faqList
    .map((entry) => {
      if (entry.qKey && entry.aKey) {
        return `
      <details class="pnp-faq-details">
        <summary>${pnpCalcT(entry.qKey, entry.qKey)}</summary>
        <div class="faq-answer">${pnpCalcT(entry.aKey, entry.aKey)}</div>
      </details>`;
      }
      const { q, a } = textFn ? textFn(entry, lang) : { q: "", a: "" };
      return `
      <details class="pnp-faq-details">
        <summary>${q}</summary>
        <div class="faq-answer">${a}</div>
      </details>`;
    })
    .join("");
}

function renderProgramSection(program, index) {
  const lang = window.NuviaI18n?.getLang?.() || "en";
  const profile = program.profile;
  const title = pnpCalcT(program.titleKey, program.abbr);
  const subtitle = profile?.subtitle
    ? window.pnpProfileText(profile.subtitle, lang)
    : pnpCalcT("pnp.calc.sectionIntro", "Latest draw snapshot, quick score estimate, and official links.");
  const calcTitle = profile?.calcTitle
    ? window.pnpProfileText(profile.calcTitle, lang)
    : pnpCalcT("pnp.calc.estimate", "Quick eligibility estimate");
  const scoreSystem = profile?.scoreSystem ? window.pnpProfileText(profile.scoreSystem, lang) : "";
  const faqHtml = renderProgramFaq(program);

  return `
    <section class="program-section ${index % 2 ? "bg-light" : ""}" id="${program.id}">
      <div class="container">
        <div class="program-header pnp-program-header">
          <h2 data-i18n="${program.titleKey}">${title}</h2>
          <p class="pnp-program-subtitle">${subtitle}</p>
        </div>
        ${renderProgramStatusBanner(program)}
        <div class="pnp-calc-shell">
          ${renderProgramStreams(program)}
          ${renderProgramQuotaNote(program)}
          <div class="calc-layout pnp-calc-layout">
            <div class="pnp-calc-main">
              <form class="calc-card pnp-calc-form" data-pnp-form="${program.id}" id="pnp-form-${program.id}">
                <h3>${calcTitle}</h3>
                ${scoreSystem ? `<p class="pnp-score-system">${scoreSystem}</p>` : ""}
                <p class="calc-note">${pnpCalcT("pnp.calc.simplified", "Simplified scoring for planning only.")}</p>
                ${renderProgramForm(program)}
                <p class="calc-form-actions">
                  <button type="button" class="btn btn-outline-dark" data-pnp-reset="${program.id}">${pnpCalcT("pnp.calc.reset", "Reset calculator")}</button>
                </p>
              </form>
            </div>
            <div class="pnp-score-aside">
              <aside class="calc-card calc-result-card pnp-result-card">
                <p class="calc-result-label">${pnpCalcT("pnp.calc.yourScore", "Estimated score")}</p>
                <p class="calc-result-score" data-pnp-score="${program.id}">0</p>
                <p class="calc-note">${pnpCalcT("pnp.calc.maxPoints", "Out of")} ${program.maxPoints} ${pnpCalcT("pnp.calc.points", "points")}</p>
                <a href="${program.officialUrl}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">${pnpCalcT("pnp.openPortal", "Official portal")}</a>
                <a href="contact.html#book" class="btn btn-outline-dark">${pnpCalcT("pnp.calc.book", "Schedule consultation")}</a>
              </aside>
              ${renderProgramScoreDisclaimer(program)}
            </div>
          </div>
        </div>
        ${renderProgramCalcGuidance(program)}
        <div class="pnp-draw-pre-faq">${renderDrawsBlock(program)}</div>
        <div class="pnp-faq-section">
          <h3 class="program-faq-title pnp-faq-heading" data-i18n="pnp.calc.faqTitle">${pnpCalcT("pnp.calc.faqTitle", "Frequently asked questions")}</h3>
          <div class="pnp-faq-list">${faqHtml}</div>
        </div>
      </div>
    </section>`;
}

function resetPnpForm(form) {
  form.querySelectorAll("select[data-pnp-field]").forEach((sel) => {
    const zeroOpt = sel.querySelector('option[value="0"]');
    if (zeroOpt) sel.value = "0";
    else sel.selectedIndex = 0;
  });
}

function wirePnpScoreForms(root) {
  root.querySelectorAll("[data-pnp-form]").forEach((form) => {
    const programId = form.dataset.pnpForm;
    const scoreEl = root.querySelector(`[data-pnp-score="${programId}"]`);
    let touched = false;
    const update = () => {
      if (!touched) {
        if (scoreEl) scoreEl.textContent = "0";
        return;
      }
      let sum = 0;
      form.querySelectorAll("select[data-pnp-field]").forEach((sel) => {
        sum += Number(sel.value) || 0;
      });
      if (scoreEl) scoreEl.textContent = String(Math.max(0, sum));
    };
    form.addEventListener("change", () => {
      touched = true;
      update();
    });
    root.querySelector(`[data-pnp-reset="${programId}"]`)?.addEventListener("click", () => {
      touched = false;
      resetPnpForm(form);
      update();
    });
    resetPnpForm(form);
    update();
  });
}

function renderPnpDrawRows(programId, rows) {
  const tbody = document.getElementById(`pnp-draws-body-${programId}`);
  const status = document.getElementById(`pnp-draws-status-${programId}`);
  if (!tbody) return;
  if (!rows.length) {
    tbody.innerHTML = `<tr><td colspan="4">${pnpCalcT("pnp.calc.drawsEmpty", "No draw rows available.")}</td></tr>`;
    if (status) status.textContent = "";
    return;
  }
  tbody.innerHTML = rows
    .map((row, index) => {
      const classes = [];
      if (index === 0 && row.tone !== "closed") classes.push("pnp-draw-latest");
      if (row.tone === "closed" || row.tone === "quota") classes.push("pnp-draw-closed");
      const cls = classes.join(" ");
      return `<tr${cls ? ` class="${cls}"` : ""}><td>${row.date}</td><td>${row.stream}</td><td>${row.minScore}</td><td>${row.invites}</td></tr>`;
    })
    .join("");
  if (status) {
    status.textContent =
      rows.length >= 5
        ? pnpCalcT("pnp.calc.drawsLive", "Showing recent rounds — confirm on the official portal.")
        : pnpCalcT("pnp.calc.drawNote", "Confirm on the official portal before decisions.");
  }
}

async function loadPnpDrawTable(program) {
  const tbody = document.getElementById(`pnp-draws-body-${program.id}`);
  if (!tbody) return;
  tbody.innerHTML = `<tr><td colspan="4">${pnpCalcT("pnp.calc.drawsLoading", "Loading recent draws…")}</td></tr>`;
  try {
    const fetcher = window.NuviaPnpDraws?.fetchRecentPnpDraws;
    const rows = fetcher ? await fetcher(program, 12) : [];
    renderPnpDrawRows(program.id, rows);
  } catch (_) {
    const fallback = window.NuviaPnpDraws?.drawsFromProgramData?.(program, 10) || [];
    renderPnpDrawRows(program.id, fallback);
  }
}

function initPnpProgramView() {
  if (window.enrichPnpCalculatorPrograms) window.enrichPnpCalculatorPrograms();
  const programs = window.PNP_CALCULATOR_PROGRAMS || [];
  const overview = document.getElementById("pnp-overview");
  const detail = document.getElementById("pnp-program-detail");
  const picker = document.getElementById("pnp-province-picker");
  const quickNav = document.getElementById("pnp-quick-nav");
  const sectionsRoot = document.getElementById("pnp-program-sections");
  const backBtn = document.getElementById("pnp-back-btn");

  if (!programs.length || !overview || !detail || !picker || !quickNav || !sectionsRoot) return;

  if (window.renderPnpActionCards) {
    window.renderPnpActionCards("pnp-province-picker", { inHub: true });
  }

  quickNav.innerHTML = programs
    .map(
      (program) =>
        `<a href="#${program.id}" data-pnp-program="${program.id}" data-i18n="${pnpQuickNavI18nKey(program)}">${pnpQuickNavLabel(program)}</a>`
      )
      .join("");

  sectionsRoot.innerHTML = programs.map((program, index) => renderProgramSection(program, index)).join("");

  wirePnpScoreForms(detail);
  wirePnpExclusiveFaq(sectionsRoot);

  const programIds = programs.map((p) => p.id);

  function setOverviewView() {
    document.body.classList.add("pnp-overview-view");
    document.body.classList.remove("pnp-program-view");
    overview.hidden = false;
    detail.hidden = true;
  }

  function setProgramView(id, { updateHash = true, scroll = true } = {}) {
    if (!programIds.includes(id)) {
      setOverviewView();
      return;
    }

    document.body.classList.add("pnp-program-view");
    document.body.classList.remove("pnp-overview-view");
    overview.hidden = true;
    detail.hidden = false;

    sectionsRoot.querySelectorAll(".program-section").forEach((section) => {
      section.classList.toggle("is-active", section.id === id);
    });

    quickNav.querySelectorAll("a[data-pnp-program]").forEach((link) => {
      link.classList.toggle("is-active", link.dataset.pnpProgram === id);
    });

    if (updateHash) {
      const nextHash = `#${id}`;
      if (location.hash !== nextHash) {
        history.pushState(null, "", `${location.pathname}${location.search}${nextHash}`);
      }
    }

    const activeProgram = programs.find((p) => p.id === id);
    if (activeProgram) loadPnpDrawTable(activeProgram);

    if (scroll) {
      window.requestAnimationFrame(() => {
        const header = document.querySelector(".site-header");
        const nav = document.querySelector("#pnp-program-detail .program-quick-nav");
        const offset = (header?.offsetHeight || 72) + (nav?.offsetHeight || 0) + 16;
        const target = document.getElementById(id);
        if (!target) return;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      });
    }
  }

  function syncFromHash() {
    const id = location.hash.replace("#", "");
    if (id && programIds.includes(id)) {
      setProgramView(id, { updateHash: false, scroll: false });
      return;
    }
    setOverviewView();
  }

  window.__pnpNavigate = { setProgramView, programIds: programIds.slice() };
  if (!window.__pnpNavClickBound) {
    window.__pnpNavClickBound = true;
    document.addEventListener("click", (event) => {
      const nav = window.__pnpNavigate;
      if (!nav || !document.getElementById("pnp-program-sections")) return;
      const el = event.target.closest("[data-pnp-program]");
      if (!el) return;
      const id = el.dataset.pnpProgram;
      if (!id || !nav.programIds.includes(id)) return;
      event.preventDefault();
      nav.setProgramView(id);
    });
  }

  backBtn?.addEventListener("click", () => {
    history.pushState(null, "", `${location.pathname}${location.search}`);
    setOverviewView();
    window.scrollTo({ top: overview.offsetTop - 80, behavior: "smooth" });
  });

  window.addEventListener("hashchange", syncFromHash);
  window.addEventListener("popstate", syncFromHash);
  syncFromHash();

  if (window.NuviaI18n) {
    detail.querySelectorAll(".faq-question[data-i18n], .faq-answer[data-i18n]").forEach((el) => el.removeAttribute("data-i18n"));
    window.NuviaI18n.applyStaticTranslations(window.NuviaI18n.getLang());
  }
}

function refreshPnpPageForLang() {
  const sectionsRoot = document.getElementById("pnp-program-sections");
  const detail = document.getElementById("pnp-program-detail");
  const picker = document.getElementById("pnp-province-picker");
  const quickNav = document.getElementById("pnp-quick-nav");
  if (!sectionsRoot || !detail) return;

  if (window.enrichPnpCalculatorPrograms) window.enrichPnpCalculatorPrograms();
  const programs = window.PNP_CALCULATOR_PROGRAMS || [];
  const activeId = location.hash.replace("#", "");

  if (picker && window.renderPnpActionCards) {
    window.renderPnpActionCards("pnp-province-picker", { inHub: true });
  }

  if (quickNav) {
    quickNav.innerHTML = programs
      .map(
        (program) =>
          `<a href="#${program.id}" data-pnp-program="${program.id}" data-i18n="${pnpQuickNavI18nKey(program)}">${pnpQuickNavLabel(program)}</a>`
      )
      .join("");
  }

  sectionsRoot.innerHTML = programs.map((program, index) => renderProgramSection(program, index)).join("");
  wirePnpScoreForms(detail);
  wirePnpExclusiveFaq(sectionsRoot);

  sectionsRoot.querySelectorAll(".program-section").forEach((section) => {
    section.classList.toggle("is-active", activeId && section.id === activeId);
  });
  quickNav?.querySelectorAll("a[data-pnp-program]").forEach((link) => {
    link.classList.toggle("is-active", activeId && link.dataset.pnpProgram === activeId);
  });

  const activeProgram = programs.find((p) => p.id === activeId);
  if (activeProgram) loadPnpDrawTable(activeProgram);

  if (window.NuviaI18n) {
    detail.querySelectorAll(".faq-question[data-i18n], .faq-answer[data-i18n]").forEach((el) => el.removeAttribute("data-i18n"));
    window.NuviaI18n.applyStaticTranslations(window.NuviaI18n.getLang());
  }
}

window.refreshPnpPageForLang = refreshPnpPageForLang;

document.addEventListener("DOMContentLoaded", initPnpProgramView);
