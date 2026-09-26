/** Shared PNP copy helpers — option labels, field localization, language refresh hook. */

function pnpTranslateOptionHeuristic(enLabel, lang) {
  if (!enLabel || lang === "en") return enLabel || "";
  let s = enLabel;

  const frRules = [
    [/^None \((\d+)\)$/i, "Aucun ($1)"],
    [/^No \((\d+)\)$/i, "Non ($1)"],
    [/^Not bilingual \((\d+)\)$/i, "Non bilingue ($1)"],
    [/^Under /i, "Moins de "],
    [/\bmonths\b/gi, "mois"],
    [/\bmonth\b/gi, "mois"],
    [/\byears\b/gi, "ans"],
    [/\bHigh school\b/gi, "Secondaire"],
    [/\bpost-secondary\b/gi, "postsecondaire"],
    [/\bBachelor\b/gi, "Baccalauréat"],
    [/\bMaster\b/gi, "Maîtrise"],
    [/\bDoctorate\b/gi, "Doctorat"],
    [/\bBelow CLB /i, "Sous CLB "],
    [/\bCLB /g, "CLB "],
    [/\bSkilled work\b/gi, "Travail qualifié"],
    [/\bjob offer\b/gi, "offre d'emploi"],
    [/\bNone counted\b/gi, "Aucun compté"],
    [/\bPermanent full-time\b/gi, "Temps plein permanent"],
    [/\bOutside /i, "À l'extérieur de "],
    [/\bNorthern Ontario\b/gi, "Nord de l'Ontario"],
    [/\bInside GTA\b/gi, "Dans la RGT"],
    [/\bToronto\b/gi, "Toronto"],
    [/\bineligible\b/gi, "non admissible"],
    [/\bEmployer\b/gi, "Employeur"],
    [/\bYes \(/i, "Oui ("],
    [/\bNo eligible\b/gi, "Aucun admissible"],
  ];
  const viRules = [
    [/^None \((\d+)\)$/i, "Không ($1)"],
    [/^No \((\d+)\)$/i, "Không ($1)"],
    [/^Not bilingual \((\d+)\)$/i, "Không song ngữ ($1)"],
    [/^Under /i, "Dưới "],
    [/\bmonths\b/gi, "tháng"],
    [/\bmonth\b/gi, "tháng"],
    [/\byears\b/gi, "năm"],
    [/\bHigh school\b/gi, "Trung học"],
    [/\bpost-secondary\b/gi, "sau trung học"],
    [/\bBachelor\b/gi, "Cử nhân"],
    [/\bMaster\b/gi, "Thạc sĩ"],
    [/\bDoctorate\b/gi, "Tiến sĩ"],
    [/\bBelow CLB /i, "Dưới CLB "],
    [/\bSkilled work\b/gi, "Kinh nghiệm skilled"],
    [/\bjob offer\b/gi, "job offer"],
    [/\bPermanent full-time\b/gi, "Toàn thời gian permanent"],
    [/\bOutside /i, "Ngoài "],
    [/\bineligible\b/gi, "không đủ điều kiện"],
    [/\bEmployer\b/gi, "Employer"],
    [/\bYes \(/i, "Có ("],
  ];

  const rules = lang === "fr" ? frRules : lang === "vi" ? viRules : [];
  rules.forEach(([re, rep]) => {
    s = s.replace(re, rep);
  });
  return s;
}

function pnpOptionText(opt, lang) {
  if (!opt) return "";
  const l = lang || (window.NuviaI18n?.getLang?.() || "en");
  if (opt.l && typeof opt.l === "object") {
    return opt.l[l] || opt.l.en || "";
  }
  const en = String(opt.l ?? "");
  if (l === "en") return en;
  const map = window.PNP_OPTION_LABELS?.[en];
  if (map?.[l]) return map[l];
  return pnpTranslateOptionHeuristic(en, l);
}

function pnpTranslateGuidanceText(en, lang) {
  if (!en || lang === "en") return en || "";
  const hit = window.PNP_SIDEBAR_GUIDANCE?.[en]?.[lang];
  if (hit) return hit;
  if (lang === "fr") {
    return en
      .replace(/\bImprove\b/gi, "Améliorez")
      .replace(/\bMaintain\b/gi, "Maintenez")
      .replace(/\bSubmit\b/gi, "Soumettez")
      .replace(/\bBook a consultation\b/gi, "Réservez une consultation")
      .replace(/\bExpress Entry\b/gi, "Entrée express")
      .replace(/\blanguage scores\b/gi, "scores de langue")
      .replace(/\bjob offer\b/gi, "offre d'emploi")
      .replace(/\bemployer\b/gi, "employeur");
  }
  if (lang === "vi") {
    return en
      .replace(/\bImprove\b/gi, "Nâng")
      .replace(/\bMaintain\b/gi, "Duy trì")
      .replace(/\bSubmit\b/gi, "Nộp")
      .replace(/\bBook a consultation\b/gi, "Đặt tư vấn")
      .replace(/\bExpress Entry\b/gi, "Express Entry")
      .replace(/\blanguage scores\b/gi, "điểm ngôn ngữ")
      .replace(/\bjob offer\b/gi, "job offer")
      .replace(/\bemployer\b/gi, "employer");
  }
  return en;
}

window.PNP_OPTION_LABELS = window.PNP_OPTION_LABELS || {};
window.PNP_SIDEBAR_GUIDANCE = window.PNP_SIDEBAR_GUIDANCE || {};
window.pnpOptionText = pnpOptionText;
window.pnpTranslateOptionHeuristic = pnpTranslateOptionHeuristic;
window.pnpTranslateGuidanceText = pnpTranslateGuidanceText;
