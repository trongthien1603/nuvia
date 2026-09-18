const SITE_BANNERS_SESSION_KEY = "nuvia-site-banners-shown";

function shouldShowSiteBanners() {
  const nav = performance.getEntriesByType("navigation")[0];
  if (nav?.type === "reload") return true;
  return !sessionStorage.getItem(SITE_BANNERS_SESSION_KEY);
}

function markSiteBannersShown() {
  sessionStorage.setItem(SITE_BANNERS_SESSION_KEY, "1");
}

document.addEventListener("DOMContentLoaded", () => {
  injectFooterCicc();
  const showSiteBanners = shouldShowSiteBanners();
  if (showSiteBanners) {
    initCookieBanner();
    initConsultPopup();
    markSiteBannersShown();
  }
  initFaqAccordion();
  initFeesPageTabs();
  initPricingTierHover();
  initScrollReveal();
  initServicesProgramView();
});

function t(key, fallback) {
  return window.NuviaI18n ? window.NuviaI18n.t(key) : fallback;
}

function injectFooterCicc() {
  const brand = document.querySelector(".site-footer .footer-brand");
  if (!brand || brand.querySelector(".footer-cicc-inline")) return;

  document.querySelectorAll(".site-footer .footer-cicc").forEach((el) => el.remove());

  const block = document.createElement("div");
  block.className = "footer-cicc-inline";
  block.innerHTML = `
    <a href="https://www.college-ic.ca" target="_blank" rel="noopener noreferrer" class="footer-cicc-link">
      <img src="assets/cicc-logo.svg" alt="College of Immigration and Citizenship Consultants (CICC)" width="180" height="50">
    </a>
    <p data-i18n="footer.cicc">${t("footer.cicc", "Licensed RCIC in good standing with CICC. Verify our credentials at college-ic.ca.")}</p>
  `;

  brand.appendChild(block);
  if (window.NuviaI18n) window.NuviaI18n.applyTranslations();
}

function initCookieBanner() {
  const banner = document.createElement("div");
  banner.className = "cookie-banner";
  banner.setAttribute("role", "dialog");
  banner.setAttribute("aria-label", "Cookie consent");
  banner.innerHTML = `
    <div class="cookie-banner-inner container">
      <p data-i18n="cookie.message">${t("cookie.message", "We use cookies to improve your experience on our website. By continuing, you agree to our use of cookies.")}</p>
      <div class="cookie-banner-actions">
        <a href="privacy.html" class="cookie-link" data-i18n="cookie.privacy">${t("cookie.privacy", "Privacy Policy")}</a>
        <button type="button" class="btn btn-primary cookie-accept" data-i18n="cookie.accept">${t("cookie.accept", "Accept")}</button>
      </div>
    </div>
  `;
  document.body.appendChild(banner);

  if (window.NuviaI18n) window.NuviaI18n.applyTranslations();

  banner.querySelector(".cookie-accept").addEventListener("click", () => {
    banner.remove();
  });
}

function initConsultPopup() {
  const overlay = document.createElement("div");
  overlay.className = "consult-overlay";
  overlay.hidden = true;

  const popup = document.createElement("div");
  popup.className = "consult-popup";
  popup.setAttribute("role", "dialog");
  popup.setAttribute("aria-modal", "true");
  popup.setAttribute("aria-labelledby", "consult-popup-title");
  popup.hidden = true;
  popup.innerHTML = `
    <button type="button" class="consult-popup-close" aria-label="Close">&times;</button>
    <h3 id="consult-popup-title" data-i18n="popup.title">${t("popup.title", "Book my free consultation")}</h3>
    <p data-i18n="popup.desc">${t("popup.desc", "Speak with a licensed RCIC about your Canadian immigration options. Your first consultation is free — no obligation.")}</p>
    <a href="contact.html#book" class="btn btn-primary" data-i18n="nav.book">${t("nav.book", "Book my free consultation")}</a>
    <button type="button" class="consult-popup-dismiss" data-i18n="popup.dismiss">${t("popup.dismiss", "Maybe later")}</button>
  `;

  document.body.appendChild(overlay);
  document.body.appendChild(popup);

  if (window.NuviaI18n) window.NuviaI18n.applyTranslations();

  function closePopup() {
    popup.hidden = true;
    overlay.hidden = true;
    document.body.classList.remove("modal-open");
  }

  popup.querySelector(".consult-popup-close").addEventListener("click", closePopup);
  popup.querySelector(".consult-popup-dismiss").addEventListener("click", closePopup);
  overlay.addEventListener("click", closePopup);

  setTimeout(() => {
    popup.hidden = false;
    overlay.hidden = false;
    document.body.classList.add("modal-open");
  }, 1500);
}

function initFaqAccordion() {
  document.querySelectorAll(".faq-item").forEach((item) => {
    const btn = item.querySelector(".faq-question");
    const panel = item.querySelector(".faq-answer");
    if (!btn || !panel) return;

    btn.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      item.closest(".faq-list, .faq-grid")?.querySelectorAll(".faq-item.open").forEach((openItem) => {
        openItem.classList.remove("open");
        openItem.querySelector(".faq-question")?.setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        item.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });
}

function initFeesPageTabs() {
  const tabs = document.querySelectorAll(".fees-tab");
  const panels = document.querySelectorAll(".fees-tab-panel");
  if (!tabs.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.feesTab;
      tabs.forEach((t) => t.classList.toggle("active", t === tab));
      panels.forEach((p) => p.classList.toggle("active", p.dataset.feesPanel === target));
    });
  });
}

function initScrollReveal() {
  const items = document.querySelectorAll(".reveal-on-scroll");
  if (!items.length) return;

  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  items.forEach((el) => observer.observe(el));
}

function initServicesProgramView() {
  const overview = document.getElementById("services-overview");
  const detail = document.getElementById("services-program-detail");
  if (!overview || !detail) return;

  const programs = Array.from(detail.querySelectorAll(".program-section[id]"));
  const programIds = programs.map((section) => section.id);
  const quickNav = detail.querySelector(".program-quick-nav");
  const backBtn = detail.querySelector(".program-back-btn");

  function setOverviewView() {
    document.body.classList.add("services-overview-view");
    document.body.classList.remove("services-program-view");
    overview.hidden = false;
    detail.hidden = true;
  }

  function setProgramView(id, { updateHash = true, scroll = true } = {}) {
    if (!programIds.includes(id)) {
      setOverviewView();
      return;
    }

    document.body.classList.add("services-program-view");
    document.body.classList.remove("services-overview-view");
    overview.hidden = true;
    detail.hidden = false;

    programs.forEach((section) => {
      section.classList.toggle("is-active", section.id === id);
    });

    quickNav?.querySelectorAll("a[data-program]").forEach((link) => {
      link.classList.toggle("is-active", link.dataset.program === id);
    });

    if (updateHash) {
      const nextHash = `#${id}`;
      if (location.hash !== nextHash) {
        history.pushState(null, "", `${location.pathname}${location.search}${nextHash}`);
      }
    }

    if (scroll) {
      window.requestAnimationFrame(() => {
        const header = document.querySelector(".site-header");
        const offset = (header?.offsetHeight || 72) + (quickNav?.offsetHeight || 0) + 16;
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

  document.querySelectorAll("a[data-program]").forEach((el) => {
    el.addEventListener("click", (event) => {
      const id = el.dataset.program;
      if (!id || !programIds.includes(id)) return;
      event.preventDefault();
      setProgramView(id);
    });
  });

  backBtn?.addEventListener("click", () => {
    history.pushState(null, "", `${location.pathname}${location.search}`);
    setOverviewView();
    window.scrollTo({ top: overview.offsetTop - 80, behavior: "smooth" });
  });

  window.addEventListener("hashchange", syncFromHash);
  window.addEventListener("popstate", syncFromHash);
  syncFromHash();
}

function initPricingTierHover() {
  const tiers = document.querySelectorAll(".pricing-tier[data-tier]");
  if (!tiers.length) return;

  const clearHighlight = () => {
    document.body.classList.remove("highlight-tier-review", "highlight-tier-guided", "highlight-tier-full");
    tiers.forEach((tier) => tier.classList.remove("is-active"));
  };

  tiers.forEach((tier) => {
    const key = tier.dataset.tier;
    tier.addEventListener("mouseenter", () => {
      clearHighlight();
      tier.classList.add("is-active");
      document.body.classList.add(`highlight-tier-${key}`);
    });
    tier.addEventListener("focusin", () => {
      clearHighlight();
      tier.classList.add("is-active");
      document.body.classList.add(`highlight-tier-${key}`);
    });
    tier.addEventListener("mouseleave", clearHighlight);
    tier.addEventListener("focusout", clearHighlight);
  });
}
