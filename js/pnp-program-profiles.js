/** Liberty-style copy, streams, and grouped calculator fields per province/territory. */
const PNP_PROGRAM_PROFILES = {
  aaip: {
    pageTitle: { en: "AAIP Draw Results & Calculator", fr: "Tirages et calculateur AAIP", vi: "Kết quả rút thăm & máy tính AAIP" },
    subtitle: {
      en: "Track Alberta EOI draw scores, invitation rounds, and estimate worker stream eligibility points.",
      fr: "Suivez les scores EOI, les tirages et estimez vos points pour les volets travailleurs de l'Alberta.",
      vi: "Theo dõi điểm EOI Alberta, các đợt mời và ước tính điểm các luồng lao động.",
    },
    calcTitle: { en: "AAIP worker eligibility estimate", fr: "Estimation admissibilité travailleur AAIP", vi: "Ước tính đủ điều kiện AAIP" },
    scoreSystem: { en: "Alberta EOI factors (simplified)", fr: "Facteurs EOI Alberta (simplifié)", vi: "Yếu tố EOI Alberta (đơn giản)" },
    streams: [
      { en: "Alberta Opportunity Stream (AOS)", fr: "Alberta Opportunity Stream (AOS)", vi: "Alberta Opportunity Stream (AOS)" },
      { en: "Rural Renewal Stream", fr: "Rural Renewal Stream", vi: "Rural Renewal Stream" },
      { en: "Alberta Express Entry (Tech & priority sectors)", fr: "Entrée express Alberta (tech et secteurs prioritaires)", vi: "Alberta Express Entry (Tech & sector ưu tiên)" },
      { en: "Dedicated Healthcare Pathway", fr: "Volet santé dédié", vi: "Dedicated Healthcare Pathway" },
    ],
    eeLinked: true,
    fieldGroups: [
      {
        title: { en: "Core factors", fr: "Facteurs principaux", vi: "Yếu tố cốt lõi" },
        fields: ["age", "edu", "lang", "work"],
      },
      {
        title: { en: "Alberta connection", fr: "Lien avec l'Alberta", vi: "Liên kết Alberta" },
        fields: ["abJob", "abStudy"],
      },
    ],
    extraFields: {
      abJob: {
        name: "abJob",
        label: { en: "Alberta job offer / work experience", fr: "Offre d'emploi / expérience en Alberta", vi: "Job offer / kinh nghiệm Alberta" },
        options: [
          { v: 0, l: "None (0)" },
          { v: 10, l: "Valid Alberta job offer (10)" },
          { v: 15, l: "12+ months Alberta skilled work (15)" },
        ],
      },
      abStudy: {
        name: "abStudy",
        label: { en: "Alberta education", fr: "Études en Alberta", vi: "Học tập tại Alberta" },
        options: [
          { v: 0, l: "None (0)" },
          { v: 5, l: "1-year credential (5)" },
          { v: 10, l: "2+ year credential (10)" },
        ],
      },
    },
  },
  bc: {
    pageTitle: { en: "BC PNP Draw Results & SIRS Calculator", fr: "Tirages BC PNP et calculateur SIRS", vi: "Rút thăm BC PNP & máy tính SIRS" },
    subtitle: {
      en: "Check British Columbia invitation cut-offs and calculate your Skills Immigration Registration System (SIRS) score out of 200.",
      fr: "Consultez les seuils de la C.-B. et calculez votre score SIRS sur 200 points.",
      vi: "Xem ngưỡng mời BC và tính điểm SIRS (Skills Immigration Registration System) trên 200 điểm.",
    },
    calcTitle: { en: "BC PNP SIRS score (200 points)", fr: "Score SIRS BC PNP (200 points)", vi: "Điểm SIRS BC PNP (200 điểm)" },
    scoreSystem: { en: "SIRS — Skilled Worker / International Graduate", fr: "SIRS — travailleur qualifié / diplômé international", vi: "SIRS — Skilled Worker / International Graduate" },
    streams: [
      { en: "CARE (health, childcare, priority services)", fr: "CARE (santé, garde d'enfants, services prioritaires)", vi: "CARE (y tế, childcare, dịch vụ ưu tiên)" },
      { en: "INNOVATE (tech & high wage impact)", fr: "INNOVATE (tech et salaires élevés)", vi: "INNOVATE (tech & lương cao)" },
      { en: "BUILD (construction trades)", fr: "BUILD (métiers de la construction)", vi: "BUILD (nghề xây dựng)" },
      { en: "International Graduate / ELSS", fr: "Diplômé international / ELSS", vi: "International Graduate / ELSS" },
    ],
    eeLinked: true,
    fieldGroups: [
      {
        title: { en: "Human capital", fr: "Capital humain", vi: "Vốn con người" },
        fields: ["edu", "exp", "langBc"],
      },
      {
        title: { en: "Economic factors (BC job)", fr: "Facteurs économiques (emploi C.-B.)", vi: "Yếu tố kinh tế (việc BC)" },
        fields: ["job", "wage", "region"],
      },
    ],
    extraFields: {
      langBc: {
        name: "langBc",
        label: { en: "Language (CLB/NCLC)", fr: "Langue (NCLC/CLB)", vi: "Ngôn ngữ (CLB/NCLC)" },
        options: [
          { v: 0, l: "Below CLB 4 (0)" },
          { v: 18, l: "CLB 5–6 (18)" },
          { v: 30, l: "CLB 7+ (30)" },
        ],
      },
      region: {
        name: "region",
        label: { en: "Area of employment", fr: "Lieu d'emploi", vi: "Khu vực làm việc" },
        options: [
          { v: 0, l: "Metro Vancouver (0)" },
          { v: 10, l: "Other BC region (10)" },
          { v: 20, l: "Regional pilot / rural (20)" },
        ],
      },
    },
  },
  mpnp: {
    pageTitle: { en: "MPNP Draw Results & Calculator", fr: "Tirages et calculateur MPNP", vi: "Rút thăm & máy tính MPNP" },
    subtitle: {
      en: "Review Manitoba invitation history and estimate your Expression of Interest score on the 1,000-point MPNP grid.",
      fr: "Historique des tirages du Manitoba et estimation EOI sur la grille MPNP de 1 000 points.",
      vi: "Lịch sử mời Manitoba và ước tính EOI trên thang 1.000 điểm MPNP.",
    },
    calcTitle: { en: "MPNP EOI score (1,000 points)", fr: "Score EOI MPNP (1 000 points)", vi: "Điểm EOI MPNP (1.000 điểm)" },
    scoreSystem: { en: "Skilled Workers in Manitoba / Overseas", fr: "Travailleurs qualifiés au Manitoba / à l'étranger", vi: "Skilled Workers in Manitoba / Overseas" },
    streams: [
      { en: "Skilled Workers in Manitoba", fr: "Travailleurs qualifiés au Manitoba", vi: "Skilled Workers in Manitoba" },
      { en: "Skilled Workers Overseas", fr: "Travailleurs qualifiés à l'étranger", vi: "Skilled Workers Overseas" },
      { en: "International Education Stream", fr: "Volet éducation internationale", vi: "International Education Stream" },
      { en: "Business Investor Pathway", fr: "Volet investisseur", vi: "Business Investor Pathway" },
    ],
    eeLinked: true,
    fieldGroups: [
      {
        title: { en: "Language & employability", fr: "Langue et employabilité", vi: "Ngôn ngữ & khả năng việc làm" },
        fields: ["lang", "age"],
      },
      {
        title: { en: "Experience & Manitoba connection", fr: "Expérience et lien Manitoba", vi: "Kinh nghiệm & liên kết Manitoba" },
        fields: ["work", "mbConn"],
      },
      {
        title: { en: "Risk & penalty factors", fr: "Facteurs de risque et pénalités", vi: "Yếu tố rủi ro & phạt điểm" },
        fields: ["mpnpRisk", "mpnpLicense"],
      },
    ],
    extraFields: {
      mbConn: {
        name: "mbConn",
        label: { en: "Close relative / invitation in Manitoba", fr: "Proche parent / invitation au Manitoba", vi: "Thân nhân / lời mời tại Manitoba" },
        options: [
          { v: 0, l: "None (0)" },
          { v: 50, l: "Close relative in MB (50)" },
          { v: 100, l: "Previous study/work in MB (100)" },
        ],
      },
      mpnpRisk: {
        name: "mpnpRisk",
        label: { en: "Other provincial PNP application", fr: "Autre demande PCP", vi: "Hồ sơ PNP tỉnh khác" },
        options: [
          { v: 0, l: "No other active EOI (0)" },
          { v: -100, l: "Active EOI/application in another province (-100)" },
        ],
      },
      mpnpLicense: {
        name: "mpnpLicense",
        label: { en: "Regulated occupation (Manitoba licensing)", fr: "Profession réglementée (permis MB)", vi: "Nghề regulated (giấy phép MB)" },
        options: [
          { v: 0, l: "Not regulated / already licensed (0)" },
          { v: -50, l: "Regulated but license not yet obtained (-50)" },
        ],
      },
    },
  },
  nb: {
    pageTitle: { en: "NBPNP Draw & Stream Guide", fr: "Tirages et volets NBPNP", vi: "Rút thăm & luồng NBPNP" },
    subtitle: {
      en: "Access New Brunswick draw announcements, targeted sectors, and estimate connection-based eligibility factors.",
      fr: "Annonces de tirages, secteurs ciblés et estimation des facteurs NBPNP.",
      vi: "Thông báo rút thăm NB, ngành mục tiêu và ước tính yếu tố liên kết NBPNP.",
    },
    calcTitle: { en: "NBPNP eligibility factors", fr: "Facteurs d'admissibilité NBPNP", vi: "Yếu tố đủ điều kiện NBPNP" },
    scoreSystem: { en: "Express Entry & Employer streams", fr: "Entrée express et volets employeur", vi: "Express Entry & Employer streams" },
    streams: [
      { en: "New Brunswick Express Entry Stream", fr: "Volet Entrée express N.-B.", vi: "New Brunswick Express Entry Stream" },
      { en: "NB Skilled Worker Stream (employer-supported)", fr: "Travailleur qualifié N.-B. (employeur)", vi: "NB Skilled Worker (employer-supported)" },
      { en: "Strategic Initiative (Francophone)", fr: "Initiative stratégique (francophone)", vi: "Strategic Initiative (Francophone)" },
    ],
    eeLinked: true,
    fieldGroups: [{ title: { en: "Your profile", fr: "Votre profil", vi: "Hồ sơ của bạn" }, fields: ["lang", "edu", "nb"] }],
  },
  nl: {
    pageTitle: { en: "NLPNP Selection Draw & Score", fr: "Tirages NLPNP et score", vi: "Rút thăm NLPNP & điểm" },
    subtitle: {
      en: "Monitor Newfoundland & Labrador priority allocations, Priority Skills NL updates, and nomination criteria.",
      fr: "Suivez les priorités T.-N.-L., Priority Skills NL et les critères de nomination.",
      vi: "Theo dõi ưu tiên NL, Priority Skills NL và tiêu chí đề cử.",
    },
    calcTitle: { en: "NLPNP Express Entry grid (100 points)", fr: "Grille NLPNP Entrée express (100 points)", vi: "Lưới NLPNP Express Entry (100 điểm)" },
    scoreSystem: { en: "67+ to qualify — Immigration Accelerator EOI", fr: "67+ pour admissibilité — EOI Immigration Accelerator", vi: "67+ để đủ điều kiện — EOI Immigration Accelerator" },
    streams: [
      { en: "NL Express Entry Skilled Worker", fr: "Entrée express — travailleur qualifié NL", vi: "NL Express Entry Skilled Worker" },
      { en: "Skilled Worker Category", fr: "Catégorie travailleur qualifié", vi: "Skilled Worker Category" },
      { en: "Priority Skills NL", fr: "Priority Skills NL", vi: "Priority Skills NL" },
    ],
    eeLinked: false,
    fieldGroups: [{ title: { en: "Eligibility factors", fr: "Facteurs d'admissibilité", vi: "Yếu tố đủ điều kiện" }, fields: ["lang", "edu", "job"] }],
  },
  nt: {
    pageTitle: { en: "NTNP Draw & Nomination Guide", fr: "Tirages et guide NTNP", vi: "Rút thăm & hướng dẫn NTNP" },
    subtitle: {
      en: "Explore Northwest Territories employer-driven streams, territorial priorities, and candidate scoring basics.",
      fr: "Volets employeur des T.N.-O., priorités territoriales et score simplifié.",
      vi: "Luồng employer-driven NWT, ưu tiên lãnh thổ và chấm điểm cơ bản.",
    },
    calcTitle: { en: "NTNP employer stream estimate", fr: "Estimation volet employeur NTNP", vi: "Ước tính luồng employer NTNP" },
    scoreSystem: { en: "Employer-driven / Francophone streams", fr: "Volets employeur / francophone", vi: "Employer-driven / Francophone" },
    streams: [
      { en: "Express Entry", fr: "Entrée express", vi: "Express Entry" },
      { en: "Skilled Worker", fr: "Travailleur qualifié", vi: "Skilled Worker" },
      { en: "Entry level / semi-skilled", fr: "Niveau entrée / semi-qualifié", vi: "Entry level / semi-skilled" },
      { en: "Business", fr: "Affaires", vi: "Business" },
    ],
    eeLinked: false,
    fieldGroups: [{ title: { en: "Territorial factors", fr: "Facteurs territoriaux", vi: "Yếu tố lãnh thổ" }, fields: ["job", "lang", "ntComm"] }],
    extraFields: {
      ntComm: {
        name: "ntComm",
        label: { en: "Community / retention plan", fr: "Plan communautaire / rétention", vi: "Kế hoạch cộng đồng / ở lại" },
        options: [
          { v: 0, l: "Not demonstrated (0)" },
          { v: 10, l: "Supported settlement plan (10)" },
        ],
      },
    },
  },
  oinp: {
    pageTitle: { en: "OINP Points Calculator & Draws", fr: "Calculateur OINP et tirages", vi: "Máy tính OINP & rút thăm" },
    subtitle: {
      en: "Estimate your Ontario Expression of Interest score across active streams and track recent OINP invitation rounds.",
      fr: "Estimez votre EOI Ontario et suivez les tirages OINP récents.",
      vi: "Ước tính EOI Ontario và theo dõi các đợt mời OINP gần đây.",
    },
    calcTitle: { en: "OINP EOI calculator (130-point OWPS-style grid)", fr: "Calculateur EOI OINP (grille OWPS 130 points)", vi: "Máy tính EOI OINP (lưới OWPS 130 điểm)" },
    scoreSystem: { en: "Foreign Worker 130-pt grid; EE streams use CRS cut-offs", fr: "Travailleur étranger 130 pts; volets EE = seuils CRS", vi: "Foreign Worker 130 điểm; luồng EE theo CRS" },
    streams: [
      { en: "Foreign Worker", fr: "Travailleur étranger", vi: "Foreign Worker" },
      { en: "Human Capital Priorities (EE)", fr: "Priorités capital humain (EE)", vi: "Human Capital Priorities (EE)" },
      { en: "Skilled Trades", fr: "Métiers spécialisés", vi: "Skilled Trades" },
      { en: "Masters / PhD Graduate streams", fr: "Maîtrise / Doctorat", vi: "Masters / PhD Graduate" },
    ],
    eeLinked: true,
    fieldGroups: [
      {
        title: { en: "Job offer & wage", fr: "Offre d'emploi et salaire", vi: "Job offer & lương" },
        fields: ["job", "wage", "onRegion"],
      },
      {
        title: { en: "Profile", fr: "Profil", vi: "Hồ sơ" },
        fields: ["lang", "work"],
      },
    ],
    extraFields: {
      onRegion: {
        name: "onRegion",
        label: { en: "Work location in Ontario", fr: "Lieu de travail en Ontario", vi: "Nơi làm việc tại Ontario" },
        options: [
          { v: 0, l: "GTA / Toronto (0)" },
          { v: 5, l: "Outside GTA (5)" },
          { v: 10, l: "Northern / priority community (10)" },
        ],
      },
    },
  },
  pei: {
    pageTitle: { en: "PEI PNP Draw Results & Calculator", fr: "Tirages PEI PNP et calculateur", vi: "Rút thăm PEI PNP & máy tính" },
    subtitle: {
      en: "Track monthly PEI draw dates, minimum scores, and evaluate your 100-point Expression of Interest score.",
      fr: "Dates de tirages PEI, scores minimums et EOI sur 100 points.",
      vi: "Ngày rút thăm PEI, điểm tối thiểu và EOI 100 điểm.",
    },
    calcTitle: { en: "PEI EOI score (100 points)", fr: "Score EOI PEI (100 points)", vi: "Điểm EOI PEI (100 điểm)" },
    scoreSystem: { en: "Labour & Express Entry categories", fr: "Catégories travail et Entrée express", vi: "Labour & Express Entry" },
    streams: [
      { en: "Express Entry", fr: "Entrée express", vi: "Express Entry" },
      { en: "Labour Impact (Skilled Worker)", fr: "Impact travail (travailleur qualifié)", vi: "Labour Impact (Skilled Worker)" },
      { en: "International Graduate", fr: "Diplômé international", vi: "International Graduate" },
    ],
    eeLinked: true,
    fieldGroups: [
      {
        title: { en: "PEI EOI factors", fr: "Facteurs EOI PEI", vi: "Yếu tố EOI PEI" },
        fields: ["agePei", "lang", "job", "peiWork"],
      },
    ],
    extraFields: {
      agePei: {
        name: "agePei",
        label: { en: "Age", fr: "Âge", vi: "Tuổi" },
        options: [
          { v: 0, l: "Under 21 or 46+ (0)" },
          { v: 15, l: "21–35 (15)" },
          { v: 10, l: "36–45 (10)" },
        ],
      },
      peiWork: {
        name: "peiWork",
        label: { en: "PEI skilled work experience", fr: "Expérience qualifiée à PEI", vi: "Kinh nghiệm tại PEI" },
        options: [
          { v: 0, l: "None (0)" },
          { v: 10, l: "6+ months PEI (10)" },
          { v: 20, l: "12+ months PEI (20)" },
        ],
      },
    },
  },
  qc: {
    pageTitle: { en: "Quebec Arrima Draw & Calculator", fr: "Tirages Arrima et calculateur Québec", vi: "Rút thăm Arrima & máy tính Quebec" },
    subtitle: {
      en: "Check Quebec Arrima invitation trends, Regular Skilled Worker Program rankings, and estimate profile points (French-first system).",
      fr: "Tendances Arrima, programme travailleurs qualifiés et estimation de profil (système axé sur le français).",
      vi: "Xu hướng mời Arrima, RSWP và ước tính điểm hồ sơ (ưu tiên tiếng Pháp).",
    },
    calcTitle: { en: "Arrima PSTQ score (1,320-point grid — simplified)", fr: "Score Arrima PSTQ (1 320 points — simplifié)", vi: "Điểm Arrima PSTQ (1.320 — đơn giản)" },
    scoreSystem: { en: "PSTQ 2026 — four streams on Arrima", fr: "PSTQ 2026 — quatre volets sur Arrima", vi: "PSTQ 2026 — 4 luồng trên Arrima" },
    streams: [
      { en: "1 — Highly qualified (TEER 0–2)", fr: "1 — Hautement qualifiés (TEER 0–2)", vi: "1 — Highly qualified (TEER 0–2)" },
      { en: "2 — Intermediate & manual (TEER 3–5)", fr: "2 — Intermédiaire et manuel (TEER 3–5)", vi: "2 — Intermediate & manual (TEER 3–5)" },
      { en: "3 — Regulated professions", fr: "3 — Professions réglementées", vi: "3 — Regulated professions" },
      { en: "4 — Exceptional talent", fr: "4 — Talent exceptionnel", vi: "4 — Exceptional talent" },
    ],
    eeLinked: false,
    fieldGroups: [
      {
        title: { en: "French & education", fr: "Français et études", vi: "Tiếng Pháp & học vấn" },
        fields: ["lang", "edu", "qcSpouse"],
      },
      {
        title: { en: "Experience", fr: "Expérience", vi: "Kinh nghiệm" },
        fields: ["work", "qcOffer"],
      },
    ],
    extraFields: {
      qcSpouse: {
        name: "qcSpouse",
        label: { en: "Spouse French level", fr: "Français du conjoint", vi: "Tiếng Pháp của vợ/chồng" },
        options: [
          { v: 0, l: "None / A1 (0)" },
          { v: 4, l: "A2–B1 (4)" },
          { v: 8, l: "B2+ (8)" },
        ],
      },
      qcOffer: {
        name: "qcOffer",
        label: { en: "Validated job offer in Quebec", fr: "Offre d'emploi validée au Québec", vi: "Job offer được xác thực tại Quebec" },
        options: [
          { v: 0, l: "No validated offer (0)" },
          { v: 10, l: "Validated offer outside Montreal (10)" },
          { v: 8, l: "Validated offer in Montreal (8)" },
        ],
      },
    },
  },
  ynp: {
    pageTitle: { en: "YNP Draw Results & Eligibility", fr: "Tirages YNP et admissibilité", vi: "Rút thăm YNP & đủ điều kiện" },
    subtitle: {
      en: "Assess Yukon Nominee Program stream rules, employer requirements, and territorial draw updates.",
      fr: "Règles YNP, exigences employeur et tirages territoriaux.",
      vi: "Quy tắc YNP, yêu cầu employer và cập nhật rút thăm Yukon.",
    },
    calcTitle: { en: "YNP calculator — worker EOI priority (20 pts) + Business Nominee (103 pts)", fr: "Calculateur YNP — priorité EOI (20 pts) + affaires (103 pts)", vi: "Máy tính YNP — EOI worker (20 điểm) + Business (103 điểm)" },
    scoreSystem: { en: "Skilled Worker / Critical Impact / Business", fr: "Travailleur qualifié / impact critique / affaires", vi: "Skilled Worker / Critical Impact / Business" },
    streams: [
      { en: "Yukon Express Entry (YEE)", fr: "Entrée express Yukon (YEE)", vi: "Yukon Express Entry (YEE)" },
      { en: "Skilled Worker", fr: "Travailleur qualifié", vi: "Skilled Worker" },
      { en: "Critical Impact Worker", fr: "Travailleur à impact critique", vi: "Critical Impact Worker" },
    ],
    eeLinked: false,
    fieldGroups: [{ title: { en: "Yukon factors", fr: "Facteurs Yukon", vi: "Yếu tố Yukon" }, fields: ["job", "lang", "ytRetain"] }],
    extraFields: {
      ytRetain: {
        name: "ytRetain",
        label: { en: "Intent to live in Yukon", fr: "Intention de demeurer au Yukon", vi: "Ý định sống tại Yukon" },
        options: [
          { v: 0, l: "Not demonstrated (0)" },
          { v: 10, l: "Strong community ties (10)" },
        ],
      },
    },
  },
  ns: {
    pageTitle: { en: "NSNP Draw Results & Calculator", fr: "Tirages NSNP et calculateur", vi: "Rút thăm NSNP & máy tính" },
    subtitle: {
      en: "Follow Nova Scotia Labour Market Priorities, physician streams, and targeted NOC draws with a quick eligibility estimate.",
      fr: "Priorités marché du travail N.-É., volets médecins et tirages NOC ciblés.",
      vi: "Labour Market Priorities NS, luồng bác sĩ và rút thăm NOC mục tiêu.",
    },
    calcTitle: { en: "NSNP profile factors (100-point planning grid)", fr: "Facteurs NSNP (100 points — planification)", vi: "Yếu tố NSNP (lưới 100 điểm)" },
    scoreSystem: { en: "Express Entry & Labour Market Priorities", fr: "Entrée express et priorités marché du travail", vi: "Express Entry & Labour Market Priorities" },
    streams: [
      { en: "Experience (Express Entry)", fr: "Expérience (Entrée express)", vi: "Experience (Express Entry)" },
      { en: "Labour Market Priorities", fr: "Priorités marché du travail", vi: "Labour Market Priorities" },
      { en: "Physician & specialist", fr: "Médecins et spécialistes", vi: "Physician & specialist" },
      { en: "Skilled Worker", fr: "Travailleur qualifié", vi: "Skilled Worker" },
    ],
    eeLinked: true,
    fieldGroups: [{ title: { en: "Nova Scotia factors", fr: "Facteurs N.-É.", vi: "Yếu tố Nova Scotia" }, fields: ["lang", "work", "job", "nsDemand"] }],
    extraFields: {
      nsDemand: {
        name: "nsDemand",
        label: { en: "Occupation in demand / sector priority", fr: "Profession en demande / secteur prioritaire", vi: "Nghề thiếu hụt / ưu tiên ngành" },
        options: [
          { v: 0, l: "Not on priority list (0)" },
          { v: 10, l: "Priority sector / NOC (10)" },
        ],
      },
    },
  },
  sk: {
    pageTitle: { en: "SINP Draw Results & Calculator", fr: "Tirages SINP et calculateur", vi: "Rút thăm SINP & máy tính" },
    subtitle: {
      en: "Draw scores for ISW (Express Entry & Occupations In-Demand). The calculator models the 110-point ISW grid only—Experience and Hard-to-Fill routes are covered under Eligibility.",
      fr: "Tirages TQI (EE et OID). Le calculateur couvre la grille 110 points TQI seulement; Expérience SK et le pilote sont sous Admissibilité.",
      vi: "Điểm rút ISW (EE & OID). Máy tính chỉ mô phỏng lưới 110 điểm ISW; Experience và Hard-to-Fill xem mục Eligibility.",
    },
    calcTitle: { en: "ISW calculator (110 points — EE & OID only)", fr: "Calculateur TQI (110 points — EE et OID seulement)", vi: "Máy tính ISW (110 điểm — chỉ EE & OID)" },
    scoreSystem: { en: "Other SINP categories (Experience, Hard-to-Fill, Entrepreneur) use different rules — not scored here", fr: "Autres catégories SINP : règles distinctes, non calculées ici", vi: "Luồng SINP khác (Experience, Hard-to-Fill, Entrepreneur): quy tắc riêng — không tính ở đây" },
    streams: [
      { en: "ISW — Express Entry", fr: "TQI — Entrée express", vi: "ISW — Express Entry" },
      { en: "ISW — Occupations In-Demand", fr: "TQI — Professions en demande", vi: "ISW — Occupations In-Demand" },
      { en: "Hard-to-Fill Skills Pilot", fr: "Pilote compétences difficiles à combler", vi: "Hard-to-Fill Skills Pilot" },
      { en: "Saskatchewan Experience", fr: "Expérience saskatchewanaise", vi: "Saskatchewan Experience" },
    ],
    eeLinked: true,
    fieldGroups: [
      {
        title: { en: "Education & language", fr: "Études et langue", vi: "Học vấn & ngôn ngữ" },
        fields: ["edu", "lang"],
      },
      {
        title: { en: "Skilled work & Saskatchewan connection", fr: "Travail qualifié et lien Saskatchewan", vi: "Kinh nghiệm & liên kết Saskatchewan" },
        fields: ["work", "skConn"],
      },
    ],
    extraFields: {
      skConn: {
        name: "skConn",
        label: { en: "Connection to Saskatchewan", fr: "Lien avec la Saskatchewan", vi: "Liên kết Saskatchewan" },
        options: [
          { v: 0, l: "None (0)" },
          { v: 15, l: "Job offer in SK (15)" },
          { v: 30, l: "Previous study/work in SK (30)" },
        ],
      },
    },
  },
};

function pnpProfileText(obj, lang) {
  if (!obj) return "";
  const l = lang || (window.NuviaI18n?.getLang?.() || "en");
  return obj[l] || obj.en || "";
}

function rebuildPnpFieldMap(program) {
  const profile = program.profile;
  if (!profile) return;
  const fieldMap = {};
  (program.fields || []).forEach((field) => {
    fieldMap[field.name] = field;
  });
  if (profile.extraFields) {
    Object.values(profile.extraFields).forEach((field) => {
      fieldMap[field.name] = {
        name: field.name,
        label: field.label,
        options: field.options,
        penalty: field.penalty,
      };
    });
  }
  program.fieldMap = fieldMap;
  program.fieldGroups = profile.fieldGroups;
}

function enrichPnpCalculatorPrograms() {
  const programs = window.PNP_CALCULATOR_PROGRAMS || [];
  programs.forEach((program) => {
    const profile = PNP_PROGRAM_PROFILES[program.id];
    if (!profile) return;
    program.profile = profile;
    program.eeLinked = profile.eeLinked;
    if (window.patchPnpCalculators) window.patchPnpCalculators(program);
    rebuildPnpFieldMap(program);
    const embeddedDraws = window.PNP_DRAWS_DATA?.[program.id];
    if (Array.isArray(embeddedDraws) && embeddedDraws.length) {
      program.recentDraws = embeddedDraws;
    }
  });
}

window.PNP_PROGRAM_PROFILES = PNP_PROGRAM_PROFILES;
window.pnpProfileText = pnpProfileText;
window.enrichPnpCalculatorPrograms = enrichPnpCalculatorPrograms;
