(function () {

  const STORAGE_KEY = "nuvia-lang";



  function getLang() {

    return localStorage.getItem(STORAGE_KEY) || "en";

  }



  function setLang(lang) {

    localStorage.setItem(STORAGE_KEY, lang);

    document.documentElement.lang = lang === "fr" ? "fr-CA" : lang === "vi" ? "vi" : "en-CA";

  }



  function t(key, lang) {

    if (!key) return "";

    const l = lang || getLang();

    const dict = typeof window.TRANSLATIONS !== "undefined" ? window.TRANSLATIONS : typeof TRANSLATIONS !== "undefined" ? TRANSLATIONS : null;

    const entry = dict ? dict[key] : null;

    if (!entry) return key;

    return entry[l] || entry.en || key;

  }



  let lastAppliedLang = null;

  let refreshDepth = 0;



  function hasNestedI18n(el) {

    return !!el.querySelector("[data-i18n], [data-i18n-html]");

  }



  function applyStaticTranslations(l) {

    document.querySelectorAll("[data-i18n-html]").forEach((el) => {

      const key = el.getAttribute("data-i18n-html");

      if (!key) return;

      try {

        el.innerHTML = t(key, l);

      } catch (_) {

        /* skip */

      }

    });



    document.querySelectorAll("[data-i18n]").forEach((el) => {

      if (hasNestedI18n(el)) return;

      const key = el.getAttribute("data-i18n");

      if (!key) return;

      try {

        el.textContent = t(key, l);

      } catch (_) {

        /* skip */

      }

    });



    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {

      const key = el.getAttribute("data-i18n-placeholder");

      if (key) {

        try {

          el.placeholder = t(key, l);

        } catch (_) {

          /* skip */

        }

      }

    });



    document.querySelectorAll("[data-i18n-title]").forEach((el) => {

      const key = el.getAttribute("data-i18n-title");

      if (key) {

        try {

          const text = t(key, l);

          el.title = text;

          if (el.hasAttribute("aria-label")) el.setAttribute("aria-label", text);

        } catch (_) {

          /* skip */

        }

      }

    });



    document.querySelectorAll(".lang-btn").forEach((btn) => {

      btn.classList.toggle("active", btn.dataset.lang === l);

      btn.setAttribute("aria-pressed", String(btn.dataset.lang === l));

    });



    document.querySelectorAll("option[data-i18n]").forEach((opt) => {

      const key = opt.getAttribute("data-i18n");

      if (key) {

        try {

          opt.textContent = t(key, l);

        } catch (_) {

          /* skip */

        }

      }

    });

  }



  function runDynamicRefresh(name, fn) {

    try {

      fn();

    } catch (err) {

      console.warn(`[NuviaI18n] ${name} failed during language refresh`, err);

    }

  }



  function refreshDynamicContent(l) {

    if (refreshDepth > 0) return;

    refreshDepth += 1;

    try {

      if (typeof window.refreshPnpPageForLang === "function") {

        runDynamicRefresh("refreshPnpPageForLang", () => window.refreshPnpPageForLang(l));

      }

      if (typeof window.refreshCrsCalculatorForLang === "function") {

        runDynamicRefresh("refreshCrsCalculatorForLang", () => window.refreshCrsCalculatorForLang(l));

      }

      if (document.querySelector("[data-fees-catalog]") && typeof window.initFeesCatalog === "function") {

        runDynamicRefresh("initFeesCatalog", () => window.initFeesCatalog());

      }

      if (document.getElementById("ircc-ptime-root") && typeof window.loadIrccProcessingTimes === "function") {

        runDynamicRefresh("loadIrccProcessingTimes", () => window.loadIrccProcessingTimes());

      }

      if (document.getElementById("services-pnp-overview-grid") && typeof window.renderPnpOverviewGrid === "function") {

        runDynamicRefresh("renderPnpOverviewGrid", () => {

          if (typeof window.enrichPnpCalculatorPrograms === "function") window.enrichPnpCalculatorPrograms();

          window.renderPnpOverviewGrid("services-pnp-overview-grid", { external: true });

        });

      }

      document.dispatchEvent(new CustomEvent("nuvia:lang-changed", { detail: { lang: l } }));

    } finally {

      refreshDepth -= 1;

    }

  }



  function applyTranslations(lang) {

    const l = lang || getLang();

    const explicitSwitch = typeof lang === "string" && lang.length > 0;

    const langChanged = lastAppliedLang !== null && lastAppliedLang !== l;



    applyStaticTranslations(l);



    if (explicitSwitch || langChanged) {

      refreshDynamicContent(l);

      applyStaticTranslations(l);

    }



    document.title = t(document.body?.dataset?.pageTitle || "meta.defaultTitle", l);



    if (window.NuviaProcessRoadmap?.relayout) {

      window.NuviaProcessRoadmap.relayout();

    }



    lastAppliedLang = l;

  }



  function initLangSwitcher() {

    if (document.documentElement.dataset.nuviaLangBound === "1") return;

    document.documentElement.dataset.nuviaLangBound = "1";



    document.addEventListener("click", (event) => {

      const btn = event.target.closest(".lang-btn[data-lang]");

      if (!btn) return;

      event.preventDefault();

      const next = btn.dataset.lang;

      if (!next || next === getLang()) return;

      setLang(next);

      applyTranslations(next);

    });

  }



  function boot() {

    const stored = getLang();

    setLang(stored);

    applyTranslations(stored);

    initLangSwitcher();

  }



  window.NuviaI18n = { getLang, setLang, t, applyTranslations, applyStaticTranslations, refreshDynamicContent };



  if (document.readyState === "loading") {

    document.addEventListener("DOMContentLoaded", boot);

  } else {

    boot();

  }

})();


