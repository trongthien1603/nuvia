document.addEventListener("DOMContentLoaded", () => {

  initNavigation();

  initContactTabs();

  initGoogleCalendarBooking();

  initContactForm();

  initImageSlideshows();

  applySiteConfig();

});



function initImageSlideshows() {
  if (typeof SLIDESHOW_IMAGES === "undefined" || !SLIDESHOW_IMAGES.length) return;

  document.querySelectorAll(".image-slideshow").forEach((slideshow) => {
    if (slideshow.querySelector(".hero-slide")) return;

    SLIDESHOW_IMAGES.forEach((src, i) => {
      const img = document.createElement("img");
      img.className = "hero-slide" + (i === 0 ? " active" : "");
      img.src = src;
      img.alt = "Canada";
      img.width = 800;
      img.height = 600;
      img.loading = i === 0 ? "eager" : "lazy";
      slideshow.appendChild(img);
    });

    const slides = slideshow.querySelectorAll(".hero-slide");
    if (slides.length < 2) return;

    let index = 0;
    setInterval(() => {
      slides[index].classList.remove("active");
      index = (index + 1) % slides.length;
      slides[index].classList.add("active");
    }, 3000);
  });
}



function applySiteConfig() {

  if (typeof SITE_CONFIG === "undefined") return;



  document.querySelectorAll("[data-config='email']").forEach((el) => {

    el.href = "mailto:" + SITE_CONFIG.email;

    el.textContent = SITE_CONFIG.email;

  });

  document.querySelectorAll("[data-config='phone']").forEach((el) => {

    el.href = "tel:" + SITE_CONFIG.phoneTel;

    el.textContent = SITE_CONFIG.phone;

  });

  document.querySelectorAll("[data-config='whatsapp']").forEach((el) => {

    el.href = SITE_CONFIG.whatsappUrl;

  });

  document.querySelectorAll("[data-config='zalo']").forEach((el) => {

    el.href = SITE_CONFIG.zaloUrl;

  });

  document.querySelectorAll("[data-config='license']").forEach((el) => {

    el.textContent = SITE_CONFIG.license;

  });

  document.querySelectorAll("[data-config='location']").forEach((el) => {

    el.textContent = SITE_CONFIG.location;

  });

}



function initNavigation() {

  const toggle = document.querySelector(".nav-toggle");

  const mobileNav = document.querySelector(".nav-mobile");



  if (!toggle || !mobileNav) return;



  toggle.addEventListener("click", () => {

    const expanded = toggle.getAttribute("aria-expanded") === "true";

    toggle.setAttribute("aria-expanded", String(!expanded));

    mobileNav.classList.toggle("open");

  });



  mobileNav.querySelectorAll("a").forEach((link) => {

    link.addEventListener("click", () => {

      toggle.setAttribute("aria-expanded", "false");

      mobileNav.classList.remove("open");

    });

  });

}



function initContactTabs() {

  const tabs = document.querySelectorAll(".contact-tab");

  const panels = document.querySelectorAll(".contact-panel");



  if (!tabs.length) return;



  tabs.forEach((tab) => {

    tab.addEventListener("click", () => {

      const target = tab.dataset.tab;

      tabs.forEach((t) => t.classList.toggle("active", t === tab));

      panels.forEach((p) => p.classList.toggle("active", p.dataset.panel === target));

    });

  });



  if (window.location.hash === "#form") {

    tabs.forEach((t) => t.classList.toggle("active", t.dataset.tab === "form"));

    panels.forEach((p) => p.classList.toggle("active", p.dataset.panel === "form"));

  }

}



function initGoogleCalendarBooking() {

  const frame = document.getElementById("gcal-booking-frame");

  const link = document.getElementById("gcal-booking-link");

  const setup = document.getElementById("gcal-setup-notice");



  if (!frame || typeof SITE_CONFIG === "undefined") return;



  if (SITE_CONFIG.googleCalendarBookingUrl) {

    frame.src = SITE_CONFIG.googleCalendarBookingUrl;

    frame.hidden = false;

    if (link) {

      link.href = SITE_CONFIG.googleCalendarBookingUrl;

      link.hidden = false;

    }

    if (setup) setup.hidden = true;

  } else {

    frame.hidden = true;

    if (setup) setup.hidden = false;

  }

}



function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function clearContactFormValidation(form) {
  form.querySelectorAll(".field-error").forEach((el) => {
    el.textContent = "";
    el.classList.remove("visible");
  });
  form.querySelectorAll(".input-invalid").forEach((el) => {
    el.classList.remove("input-invalid");
  });
}

function showFieldError(form, fieldName, message) {
  const input = form.elements[fieldName];
  const errorEl = form.querySelector(`[data-error-for="${fieldName}"]`);
  if (input) input.classList.add("input-invalid");
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.classList.add("visible");
  }
}

function validateContactForm(form) {
  clearContactFormValidation(form);

  const t = (key, fallback) =>
    window.NuviaI18n ? window.NuviaI18n.t(key) : fallback;

  let valid = true;
  let firstInvalid = null;

  const name = form.name.value.trim();
  if (!name) {
    showFieldError(
      form,
      "name",
      t("contact.form.validation.nameRequired", "Please enter your full name.")
    );
    valid = false;
    firstInvalid = firstInvalid || form.name;
  }

  const email = form.email.value.trim();
  if (!email) {
    showFieldError(
      form,
      "email",
      t("contact.form.validation.emailRequired", "Please enter your email address.")
    );
    valid = false;
    firstInvalid = firstInvalid || form.email;
  } else if (!isValidEmail(email)) {
    showFieldError(
      form,
      "email",
      t(
        "contact.form.validation.emailInvalid",
        "Please enter a valid email address (e.g. name@example.com)."
      )
    );
    valid = false;
    firstInvalid = firstInvalid || form.email;
  }

  const message = form.message.value.trim();
  if (!message) {
    showFieldError(
      form,
      "message",
      t("contact.form.validation.messageRequired", "Please tell us how we can help.")
    );
    valid = false;
    firstInvalid = firstInvalid || form.message;
  }

  if (firstInvalid) {
    firstInvalid.focus();
  }

  return valid;
}

async function initContactForm() {

  const form = document.getElementById("contact-form");

  if (!form) return;

  ["name", "email", "message"].forEach((fieldName) => {
    const input = form.elements[fieldName];
    if (!input) return;
    input.addEventListener("input", () => {
      input.classList.remove("input-invalid");
      const errorEl = form.querySelector(`[data-error-for="${fieldName}"]`);
      if (errorEl) {
        errorEl.textContent = "";
        errorEl.classList.remove("visible");
      }
    });
  });

  form.addEventListener("submit", async (e) => {

    e.preventDefault();



    const success = document.querySelector(".form-success");

    const error = document.querySelector(".form-error");

    const submitBtn = form.querySelector('button[type="submit"]');

    const lang = window.NuviaI18n ? window.NuviaI18n.getLang() : "en";



    if (success) success.classList.remove("visible");

    if (error) error.classList.remove("visible");

    if (!validateContactForm(form)) {
      return;
    }

    const payload = {

      name: form.name.value.trim(),

      email: form.email.value.trim(),

      phone: form.phone.value.trim(),

      service: form.service.value,

      message: form.message.value.trim(),

      language: lang,

    };



    if (!SITE_CONFIG.googleScriptUrl) {

      if (error) {

        error.textContent = window.NuviaI18n

          ? window.NuviaI18n.t("contact.form.notConfigured")

          : "Form storage is being configured. Please book online or email us directly.";

        error.classList.add("visible");

      }

      return;

    }



    const submitLabelKey = submitBtn.dataset.i18n;

    submitBtn.disabled = true;

    submitBtn.textContent = window.NuviaI18n

      ? window.NuviaI18n.t("contact.form.sending")

      : "Sending...";



    try {
      const formData = new URLSearchParams();
      Object.entries(payload).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // GAS no-cors POST may never resolve in the browser even when the row is saved.
      await Promise.race([
        fetch(SITE_CONFIG.googleScriptUrl, {
          method: "POST",
          mode: "no-cors",
          body: formData,
        }),
        new Promise((resolve) => setTimeout(resolve, 2500)),
      ]);

      if (success) success.classList.add("visible");
      form.reset();
      clearContactFormValidation(form);
      if (success) success.scrollIntoView({ behavior: "smooth", block: "nearest" });
    } catch {
      if (error) {
        error.textContent = window.NuviaI18n
          ? window.NuviaI18n.t("contact.form.error")
          : "Unable to send your message. Please email us directly.";
        error.classList.add("visible");
      }
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent =
        submitLabelKey && window.NuviaI18n
          ? window.NuviaI18n.t(submitLabelKey)
          : "Send Message";
    }

  });

}


