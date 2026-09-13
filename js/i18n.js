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
    const l = lang || getLang();
    const entry = TRANSLATIONS[key];
    if (!entry) return key;
    return entry[l] || entry.en || key;
  }

  function applyTranslations(lang) {
    const l = lang || getLang();

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = t(el.dataset.i18n, l);
    });

    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      el.innerHTML = t(el.dataset.i18nHtml, l);
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      el.placeholder = t(el.dataset.i18nPlaceholder, l);
    });

    document.querySelectorAll("[data-i18n-title]").forEach((el) => {
      el.title = t(el.dataset.i18nTitle, l);
    });

    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === l);
      btn.setAttribute("aria-pressed", String(btn.dataset.lang === l));
    });

    document.querySelectorAll("option[data-i18n]").forEach((opt) => {
      opt.textContent = t(opt.dataset.i18n, l);
    });

    document.title = t(document.body.dataset.pageTitle || "meta.defaultTitle", l);
  }

  function initLangSwitcher() {
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        setLang(btn.dataset.lang);
        applyTranslations(btn.dataset.lang);
      });
    });
  }

  window.NuviaI18n = { getLang, setLang, t, applyTranslations };

  document.addEventListener("DOMContentLoaded", () => {
    setLang(getLang());
    applyTranslations();
    initLangSwitcher();
  });
})();
