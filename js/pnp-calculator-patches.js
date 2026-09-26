/** Province-specific calculator grids (Liberty-style adaptations). */

function patchPnpCalculators(program) {
  const profile = program.profile;
  if (!profile) return;

  if (program.id === "oinp") {
    program.maxPoints = 130;
    profile.calcTitle = {
      en: "OINP EOI calculator (130-point OWPS-style grid)",
      fr: "Calculateur EOI OINP (grille OWPS 130 points)",
      vi: "Máy tính EOI OINP (lưới OWPS 130 điểm)",
    };
    profile.scoreSystem = {
      en: "Job region, TEER, wage, experience, education & language",
      fr: "Région, TEER, salaire, expérience, études et langue",
      vi: "Vùng, TEER, lương, kinh nghiệm, học vấn & ngôn ngữ",
    };
    profile.extraFields = {
      onRegion: {
        name: "onRegion",
        label: { en: "Work region (job location)", fr: "Région de travail", vi: "Khu vực làm việc" },
        options: [
          { v: 0, l: "Toronto (0)" },
          { v: 5, l: "Inside GTA outside Toronto (5)" },
          { v: 10, l: "Outside GTA (10)" },
          { v: 15, l: "Northern Ontario (15)" },
        ],
      },
      onTeer: {
        name: "onTeer",
        label: { en: "NOC TEER level", fr: "Niveau TEER", vi: "Cấp TEER" },
        options: [
          { v: 0, l: "TEER 4–5 (0)" },
          { v: 6, l: "TEER 2–3 (6)" },
          { v: 9, l: "TEER 0–1 (9)" },
        ],
      },
      onCategory: {
        name: "onCategory",
        label: { en: "Broad occupational category", fr: "Catégorie professionnelle", vi: "Nhóm nghề" },
        options: [
          { v: 0, l: "Other (0)" },
          { v: 2, l: "Arts / sales / service (2)" },
          { v: 4, l: "Business / admin (4)" },
          { v: 6, l: "STEM (6)" },
          { v: 8, l: "Trades / transport (8)" },
          { v: 10, l: "Health (10)" },
        ],
      },
      onWage: {
        name: "onWage",
        label: { en: "Hourly wage (CAD)", fr: "Salaire horaire (CAD)", vi: "Lương giờ (CAD)" },
        options: [
          { v: 0, l: "Under $20 (0)" },
          { v: 5, l: "$20–24.99 (5)" },
          { v: 8, l: "$25–29.99 (8)" },
          { v: 10, l: "$30–34.99 (10)" },
          { v: 12, l: "$35–39.99 (12)" },
          { v: 15, l: "$40+ (15)" },
        ],
      },
      onExp: {
        name: "onExp",
        label: { en: "Ontario work in job-offer NOC", fr: "Expérience Ontario (NOC offre)", vi: "Kinh nghiệm Ontario (NOC job)" },
        options: [
          { v: 0, l: "None (0)" },
          { v: 8, l: "6–12 months (8)" },
          { v: 14, l: "12–24 months (14)" },
          { v: 18, l: "24+ months (18)" },
        ],
      },
      onEdu: {
        name: "onEdu",
        label: { en: "Highest education", fr: "Plus haut niveau d'études", vi: "Học vấn cao nhất" },
        options: [
          { v: 0, l: "Secondary or less (0)" },
          { v: 5, l: "Post-secondary (5)" },
          { v: 8, l: "Bachelor (8)" },
          { v: 10, l: "Master / MD (10)" },
        ],
      },
      onLang: {
        name: "onLang",
        label: { en: "First official language (CLB)", fr: "Première langue officielle (CLB)", vi: "Ngôn ngữ chính thức (CLB)" },
        options: [
          { v: 0, l: "Below CLB 7 (0)" },
          { v: 10, l: "CLB 7–8 (10)" },
          { v: 15, l: "CLB 9+ (15)" },
        ],
      },
      onBilingual: {
        name: "onBilingual",
        label: { en: "Second official language", fr: "Deuxième langue officielle", vi: "Ngôn ngữ thứ hai" },
        options: [
          { v: 0, l: "Below CLB 6 (0)" },
          { v: 10, l: "CLB 6+ in second language (10)" },
        ],
      },
    };
    profile.fieldGroups = [
      {
        title: { en: "Job offer & occupation", fr: "Offre d'emploi et profession", vi: "Job offer & nghề" },
        fields: ["onRegion", "onTeer", "onCategory", "onWage"],
      },
      {
        title: { en: "Experience, education & language", fr: "Expérience, études et langue", vi: "Kinh nghiệm, học vấn & ngôn ngữ" },
        fields: ["onExp", "onEdu", "onLang", "onBilingual"],
      },
    ];
    program.fields = [];
  }

  if (program.id === "aaip") {
    program.maxPoints = 100;
    profile.calcTitle = {
      en: "AAIP Worker EOI (100-point grid)",
      fr: "EOI travailleur AAIP (100 points)",
      vi: "EOI worker AAIP (100 điểm)",
    };
    profile.extraFields = {
      aaipAge: {
        name: "aaipAge",
        label: { en: "Age", fr: "Âge", vi: "Tuổi" },
        options: [
          { v: 0, l: "Under 18 (0)" },
          { v: 5, l: "18–20 (5)" },
          { v: 10, l: "21–29 (10)" },
          { v: 8, l: "30–44 (8)" },
          { v: 5, l: "45+ (5)" },
        ],
      },
      aaipEdu: {
        name: "aaipEdu",
        label: { en: "Education", fr: "Études", vi: "Học vấn" },
        options: [
          { v: 0, l: "Less than high school (0)" },
          { v: 4, l: "High school (4)" },
          { v: 8, l: "One-year post-secondary (8)" },
          { v: 12, l: "Two-year post-secondary (12)" },
          { v: 15, l: "Bachelor or higher (15)" },
        ],
      },
      aaipLang: {
        name: "aaipLang",
        label: { en: "First official language (CLB/NCLC)", fr: "Première langue officielle", vi: "Ngôn ngữ chính thức thứ nhất" },
        options: [
          { v: 0, l: "Below CLB 4 (0)" },
          { v: 6, l: "CLB 4–5 (6)" },
          { v: 10, l: "CLB 6+ (10)" },
        ],
      },
      aaipLang2: {
        name: "aaipLang2",
        label: { en: "Bilingual bonus (CLB 4+ both languages)", fr: "Bonus bilingue", vi: "Bonus song ngữ" },
        options: [
          { v: 0, l: "Not bilingual (0)" },
          { v: 3, l: "CLB/NCLC 4+ in English & French (3)" },
        ],
      },
      aaipWorkCa: {
        name: "aaipWorkCa",
        label: { en: "Total skilled work experience", fr: "Expérience qualifiée totale", vi: "Kinh nghiệm skilled tổng" },
        options: [
          { v: 0, l: "Under 12 months (0)" },
          { v: 4, l: "12–23 months (4)" },
          { v: 8, l: "24–35 months (8)" },
          { v: 11, l: "36+ months (11)" },
        ],
      },
      aaipWorkAb: {
        name: "aaipWorkAb",
        label: { en: "Alberta work experience", fr: "Expérience en Alberta", vi: "Kinh nghiệm tại Alberta" },
        options: [
          { v: 0, l: "None (0)" },
          { v: 5, l: "6–11 months AB (5)" },
          { v: 10, l: "12+ months AB (10)" },
        ],
      },
      aaipWorkForeign: {
        name: "aaipWorkForeign",
        label: { en: "Foreign skilled work (outside Canada)", fr: "Expérience à l'étranger", vi: "Kinh nghiệm ngoài Canada" },
        options: [
          { v: 0, l: "None counted (0)" },
          { v: 3, l: "12+ months foreign skilled (3)" },
          { v: 5, l: "24+ months foreign skilled (5)" },
        ],
      },
      aaipJob: {
        name: "aaipJob",
        label: { en: "Alberta job offer", fr: "Offre d'emploi Alberta", vi: "Job offer Alberta" },
        options: [
          { v: 0, l: "No eligible offer (0)" },
          { v: 10, l: "Permanent full-time AB offer (10)" },
        ],
      },
      aaipLocation: {
        name: "aaipLocation",
        label: { en: "Job location", fr: "Lieu de l'emploi", vi: "Địa điểm làm việc" },
        options: [
          { v: 0, l: "Calgary or Edmonton CMA (0)" },
          { v: 5, l: "Outside Calgary/Edmonton CMA (5)" },
        ],
      },
      aaipFamily: {
        name: "aaipFamily",
        label: { en: "Family in Alberta (parent, child, or sibling PR/citizen)", fr: "Famille en Alberta", vi: "Gia đình tại Alberta" },
        options: [
          { v: 0, l: "No eligible relative (0)" },
          { v: 8, l: "Eligible relative in Alberta (8)" },
        ],
      },
      aaipTrade: {
        name: "aaipTrade",
        label: { en: "Regulated occupation — Alberta credential", fr: "Profession réglementée — titre AB", vi: "Nghề regulated — chứng chỉ AB" },
        options: [
          { v: 0, l: "Not regulated / no AB certificate (0)" },
          { v: 10, l: "Alberta Qualification Certificate (10)" },
        ],
      },
    };
    profile.fieldGroups = [
      { title: { en: "Human capital", fr: "Capital humain", vi: "Vốn con người" }, fields: ["aaipAge", "aaipEdu", "aaipLang", "aaipLang2"] },
      { title: { en: "Work experience", fr: "Expérience de travail", vi: "Kinh nghiệm làm việc" }, fields: ["aaipWorkCa", "aaipWorkAb", "aaipWorkForeign"] },
      { title: { en: "Alberta job & connections", fr: "Emploi et liens Alberta", vi: "Việc làm & liên kết Alberta" }, fields: ["aaipJob", "aaipLocation", "aaipFamily", "aaipTrade"] },
    ];
    program.fields = [];
  }

  if (program.id === "bc") {
    program.maxPoints = 200;
    profile.calcTitle = { en: "BC PNP SIRS score (200 points)", fr: "Score SIRS BC PNP (200 points)", vi: "Điểm SIRS BC PNP (200 điểm)" };
    profile.extraFields = {
      bcEdu: {
        name: "bcEdu",
        label: { en: "Education", fr: "Études", vi: "Học vấn" },
        options: [
          { v: 0, l: "High school or less (0)" },
          { v: 11, l: "Diploma / certificate (11)" },
          { v: 15, l: "Bachelor (15)" },
          { v: 22, l: "Master (22)" },
          { v: 25, l: "Doctorate (25)" },
        ],
      },
      bcLang1: {
        name: "bcLang1",
        label: { en: "First language (CLB/NCLC)", fr: "Première langue", vi: "Ngôn ngữ thứ nhất" },
        options: [
          { v: 0, l: "Below CLB 4 (0)" },
          { v: 10, l: "CLB 5–6 (10)" },
          { v: 20, l: "CLB 7–8 (20)" },
          { v: 30, l: "CLB 9+ (30)" },
        ],
      },
      bcLang2: {
        name: "bcLang2",
        label: { en: "French bonus (second official language)", fr: "Bonus français", vi: "Bonus tiếng Pháp" },
        options: [
          { v: 0, l: "Below CLB 4 French (0)" },
          { v: 10, l: "CLB 4+ French (10)" },
        ],
      },
      bcWage: {
        name: "bcWage",
        label: { en: "Hourly wage (CAD) — BC job offer", fr: "Salaire horaire (CAD)", vi: "Lương giờ (CAD) — job BC" },
        options: [
          { v: 0, l: "Under $20 (0)" },
          { v: 10, l: "$20–24.99 (10)" },
          { v: 20, l: "$25–29.99 (20)" },
          { v: 30, l: "$30–39.99 (30)" },
          { v: 40, l: "$40–49.99 (40)" },
          { v: 55, l: "$50+ (55 max)" },
        ],
      },
      bcRegion: {
        name: "bcRegion",
        label: { en: "Area of employment", fr: "Zone d'emploi", vi: "Khu vực làm việc" },
        options: [
          { v: 0, l: "Area 1 — Metro Vancouver (0)" },
          { v: 5, l: "Area 2 — Abbotsford, Squamish, etc. (5)" },
          { v: 15, l: "Area 3 — Other BC regions (15)" },
        ],
      },
      bcJob: {
        name: "bcJob",
        label: { en: "BC job offer / skill level", fr: "Offre d'emploi C.-B.", vi: "Job offer BC / skill level" },
        options: [
          { v: 0, l: "No eligible offer (0)" },
          { v: 15, l: "Skilled TEER 0–3 offer (15)" },
          { v: 25, l: "Targeted priority occupation (25)" },
        ],
      },
      bcWork: {
        name: "bcWork",
        label: { en: "Current BC work experience (same employer)", fr: "Expérience actuelle en C.-B.", vi: "Kinh nghiệm đang làm tại BC (cùng employer)" },
        options: [
          { v: 0, l: "Not currently working in BC (0)" },
          { v: 10, l: "6–11 months BC (10)" },
          { v: 20, l: "12+ months BC (20)" },
        ],
      },
      bcRegionalExp: {
        name: "bcRegionalExp",
        label: { en: "Regional experience bonus (Area 2/3)", fr: "Bonus expérience régionale", vi: "Bonus kinh nghiệm vùng (Area 2/3)" },
        options: [
          { v: 0, l: "Less than 12 months outside Area 1 (0)" },
          { v: 10, l: "12+ months employed in Area 2/3 (10)" },
        ],
      },
    };
    profile.fieldGroups = [
      { title: { en: "Education & language", fr: "Études et langue", vi: "Học vấn & ngôn ngữ" }, fields: ["bcEdu", "bcLang1", "bcLang2"] },
      { title: { en: "BC job offer & wage", fr: "Offre et salaire C.-B.", vi: "Job offer & lương BC" }, fields: ["bcJob", "bcWage", "bcRegion"] },
      { title: { en: "Current BC employment", fr: "Emploi actuel en C.-B.", vi: "Việc làm hiện tại tại BC" }, fields: ["bcWork", "bcRegionalExp"] },
    ];
    program.fields = [];
  }

  if (program.id === "mpnp") {
    program.maxPoints = 1000;
    profile.extraFields = {
      mpnpAge: {
        name: "mpnpAge",
        label: { en: "Age", fr: "Âge", vi: "Tuổi" },
        options: [
          { v: 0, l: "Under 21 or 51+ (0)" },
          { v: 75, l: "21–45 (75)" },
          { v: 50, l: "46–50 (50)" },
          { v: 25, l: "51 (25)" },
        ],
      },
      mpnpLang1: {
        name: "mpnpLang1",
        label: { en: "First official language", fr: "Première langue officielle", vi: "Ngôn ngữ chính thức thứ nhất" },
        options: [
          { v: 0, l: "Below CLB 5 (0)" },
          { v: 50, l: "CLB 5 (50)" },
          { v: 125, l: "CLB 7 (125)" },
          { v: 175, l: "CLB 8+ (175)" },
        ],
      },
      mpnpLang2: {
        name: "mpnpLang2",
        label: { en: "Second official language", fr: "Deuxième langue officielle", vi: "Ngôn ngữ chính thức thứ hai" },
        options: [
          { v: 0, l: "Below CLB 5 (0)" },
          { v: 25, l: "CLB 5 (25)" },
          { v: 75, l: "CLB 6 (75)" },
          { v: 125, l: "CLB 7+ (125)" },
        ],
      },
      mpnpWork: {
        name: "mpnpWork",
        label: { en: "Skilled work experience", fr: "Expérience qualifiée", vi: "Kinh nghiệm skilled" },
        options: [
          { v: 0, l: "Under 1 year (0)" },
          { v: 75, l: "1 year (75)" },
          { v: 150, l: "3+ years (150)" },
        ],
      },
      mpnpMbWork: {
        name: "mpnpMbWork",
        label: { en: "Manitoba skilled work (length)", fr: "Expérience qualifiée au Manitoba", vi: "Kinh nghiệm skilled tại Manitoba" },
        options: [
          { v: 0, l: "None (0)" },
          { v: 50, l: "6 months (50)" },
          { v: 100, l: "12 months (100)" },
          { v: 125, l: "24+ months (125)" },
        ],
      },
      mpnpRegional: {
        name: "mpnpRegional",
        label: { en: "Employment outside Winnipeg", fr: "Emploi hors Winnipeg", vi: "Làm việc ngoài Winnipeg" },
        options: [
          { v: 0, l: "Winnipeg only (0)" },
          { v: 50, l: "Job offer / work in regional community (50)" },
        ],
      },
      mpnpRelative: {
        name: "mpnpRelative",
        label: { en: "Close relative in Manitoba", fr: "Proche parent au Manitoba", vi: "Thân nhân close tại Manitoba" },
        options: [
          { v: 0, l: "None (0)" },
          { v: 50, l: "Close relative (50)" },
        ],
      },
      mpnpStudy: {
        name: "mpnpStudy",
        label: { en: "Manitoba education", fr: "Études au Manitoba", vi: "Học tại Manitoba" },
        options: [
          { v: 0, l: "None (0)" },
          { v: 25, l: "1-year program (25)" },
          { v: 50, l: "2+ year program (50)" },
        ],
      },
      mpnpLicensed: {
        name: "mpnpLicensed",
        label: { en: "Fully licensed in regulated occupation (Manitoba)", fr: "Permis complet — profession réglementée MB", vi: "Đủ giấy phép nghề regulated (Manitoba)" },
        options: [
          { v: 0, l: "Not regulated or not yet licensed (0)" },
          { v: 100, l: "Fully licensed to practise in Manitoba (100)" },
        ],
      },
      mpnpOtherProv: {
        name: "mpnpOtherProv",
        penalty: true,
        label: { en: "Previous work or study in another Canadian province", fr: "Travail ou études dans une autre province", vi: "Từng làm/học ở tỉnh Canada khác" },
        options: [
          { v: 0, l: "No prior study/work outside MB (0)" },
          { v: -100, l: "Previous work or study in another province (−100)" },
        ],
      },
      mpnpRisk: {
        name: "mpnpRisk",
        penalty: true,
        label: { en: "Other active provincial PNP EOI/application", fr: "Autre EOI/demande PCP active", vi: "EOI/hồ sơ PNP tỉnh khác đang active" },
        options: [
          { v: 0, l: "None (0)" },
          { v: -100, l: "Active in another province (−100)" },
        ],
      },
      mpnpLicenseGap: {
        name: "mpnpLicenseGap",
        penalty: true,
        label: { en: "Regulated occupation — licensing not yet complete", fr: "Profession réglementée — permis incomplet", vi: "Nghề regulated — chưa đủ giấy phép" },
        options: [
          { v: 0, l: "Licensed or not regulated (0)" },
          { v: -50, l: "Regulated but not fully licensed (−50)" },
        ],
      },
    };
    profile.fieldGroups = [
      { title: { en: "Language & age", fr: "Langue et âge", vi: "Ngôn ngữ & tuổi" }, fields: ["mpnpLang1", "mpnpLang2", "mpnpAge"] },
      { title: { en: "Experience", fr: "Expérience", vi: "Kinh nghiệm" }, fields: ["mpnpWork", "mpnpMbWork"] },
      { title: { en: "Adaptability & Manitoba connection", fr: "Adaptabilité et lien Manitoba", vi: "Adaptability & liên kết Manitoba" }, fields: ["mpnpRegional", "mpnpRelative", "mpnpStudy", "mpnpLicensed"] },
      { title: { en: "Risk & penalty factors", fr: "Facteurs de risque et pénalités", vi: "Rủi ro & phạt điểm" }, fields: ["mpnpOtherProv", "mpnpRisk", "mpnpLicenseGap"], penaltyGroup: true },
    ];
    program.fields = [];
  }

  if (program.id === "nb") {
    program.maxPoints = 100;
    profile.calcTitle = { en: "NBPNP selection grid (100 points)", fr: "Grille NBPNP (100 points)", vi: "Lưới chọn NBPNP (100 điểm)" };
    profile.extraFields = {
      nbAge: {
        name: "nbAge",
        label: { en: "Age", fr: "Âge", vi: "Tuổi" },
        options: [
          { v: 0, l: "Under 22 or 47+ (0)" },
          { v: 5, l: "22–34 (5)" },
          { v: 10, l: "35–44 (10)" },
          { v: 8, l: "45–46 (8)" },
        ],
      },
      nbLang1: {
        name: "nbLang1",
        label: { en: "First official language (max 24)", fr: "Première langue (max 24)", vi: "Ngôn ngữ thứ nhất (tối đa 24)" },
        options: [
          { v: 0, l: "Below CLB 5 (0)" },
          { v: 12, l: "CLB 7 (12)" },
          { v: 18, l: "CLB 8 (18)" },
          { v: 24, l: "CLB 9+ (24)" },
        ],
      },
      nbLang2: {
        name: "nbLang2",
        label: { en: "Second official language (max 4)", fr: "Deuxième langue (max 4)", vi: "Ngôn ngữ thứ hai (tối đa 4)" },
        options: [
          { v: 0, l: "Below CLB 5 (0)" },
          { v: 4, l: "CLB 5+ second language (4)" },
        ],
      },
      nbEdu: {
        name: "nbEdu",
        label: { en: "Education (max 23)", fr: "Études (max 23)", vi: "Học vấn (tối đa 23)" },
        options: [
          { v: 0, l: "Secondary or less (0)" },
          { v: 12, l: "One-year post-secondary (12)" },
          { v: 18, l: "Two-year post-secondary (18)" },
          { v: 23, l: "Bachelor or higher (23)" },
        ],
      },
      nbWork: {
        name: "nbWork",
        label: { en: "Skilled work experience (max 15)", fr: "Expérience qualifiée (max 15)", vi: "Kinh nghiệm skilled (tối đa 15)" },
        options: [
          { v: 0, l: "Under 1 year (0)" },
          { v: 5, l: "1–2 years (5)" },
          { v: 10, l: "3–4 years (10)" },
          { v: 15, l: "5+ years (15)" },
        ],
      },
      nbJob: {
        name: "nbJob",
        label: { en: "Arranged employment in NB", fr: "Emploi garanti au N.-B.", vi: "Arranged employment tại NB" },
        options: [
          { v: 0, l: "No eligible job offer (0)" },
          { v: 10, l: "Permanent NB job offer (10)" },
        ],
      },
      nbAdapt: {
        name: "nbAdapt",
        label: { en: "Adaptability (NB ties, spouse language, etc.)", fr: "Adaptabilité", vi: "Adaptability (liên kết NB, vợ/chồng, v.v.)" },
        options: [
          { v: 0, l: "None (0)" },
          { v: 5, l: "Job offer adaptability (+5) or spouse CLB 4+ (+5)" },
          { v: 10, l: "Previous study/work in NB (+10)" },
        ],
      },
    };
    profile.fieldGroups = [
      { title: { en: "Core selection factors", fr: "Facteurs de sélection", vi: "Yếu tố chọn lọc" }, fields: ["nbAge", "nbLang1", "nbLang2", "nbEdu", "nbWork"] },
      { title: { en: "Employment & adaptability", fr: "Emploi et adaptabilité", vi: "Việc làm & adaptability" }, fields: ["nbJob", "nbAdapt"] },
    ];
    program.fields = [];
  }

  if (program.id === "nt") {
    program.maxPoints = 845;
    profile.quotaNote = {
      en: "The NWT receives a modest annual nomination allocation. Employer-driven EOIs are ranked and drawn when spaces are available—not on a fixed weekly schedule like larger provinces.",
      fr: "Les T.N.-O. ont un quota annuel modeste; les EOI employeur sont classés et tirés lorsque des places existent.",
      vi: "NWT có chỉ tiêu đề cử hàng năm khiêm tốn; EOI employer được xếp hạng và rút khi còn chỗ.",
    };
    profile.calcTitle = {
      en: "NTNP Employer-Driven EOI (845-point grid — simplified)",
      fr: "EOI employeur NTNP (845 points — simplifié)",
      vi: "EOI employer NTNP (845 điểm — đơn giản)",
    };
    profile.extraFields = {
      ntAge: {
        name: "ntAge",
        label: { en: "Age", fr: "Âge", vi: "Tuổi" },
        options: [
          { v: 0, l: "Under 18 (0)" },
          { v: 10, l: "50+ (10)" },
          { v: 30, l: "45–49 (30)" },
          { v: 40, l: "18–20 (40)" },
          { v: 50, l: "21–44 (50)" },
        ],
      },
      ntLang1: {
        name: "ntLang1",
        label: { en: "First language (lowest CLB)", fr: "Première langue (CLB min.)", vi: "Ngôn ngữ thứ nhất (CLB thấp nhất)" },
        options: [
          { v: 0, l: "Below CLB 4 (0)" },
          { v: 48, l: "CLB 4 (48)" },
          { v: 68, l: "CLB 5 (68)" },
          { v: 80, l: "CLB 6 (80)" },
          { v: 88, l: "CLB 7 (88)" },
          { v: 100, l: "CLB 8+ (100)" },
        ],
      },
      ntLang2: {
        name: "ntLang2",
        label: { en: "Second official language", fr: "Deuxième langue officielle", vi: "Ngôn ngữ thứ hai" },
        options: [
          { v: 0, l: "None / below CLB 5 (0)" },
          { v: 25, l: "CLB 5+ second language (25)" },
        ],
      },
      ntJob: {
        name: "ntJob",
        label: { en: "NWT job offer location", fr: "Lieu de l'offre T.N.-O.", vi: "Vị trí job offer NWT" },
        options: [
          { v: 0, l: "No NWT offer (0)" },
          { v: 50, l: "Outside Yellowknife (+50)" },
          { v: 30, l: "Yellowknife area (30)" },
        ],
      },
      ntNwtWork: {
        name: "ntNwtWork",
        label: { en: "NWT work experience (same employer)", fr: "Expérience T.N.-O. (même employeur)", vi: "Kinh nghiệm NWT (cùng employer)" },
        options: [
          { v: 0, l: "None (0)" },
          { v: 50, l: "6–12 months (50)" },
          { v: 75, l: "1–2 years (75)" },
          { v: 100, l: "3+ years (100)" },
        ],
      },
      ntTrade: {
        name: "ntTrade",
        label: { en: "Targeted skilled trade bonus", fr: "Bonus métier ciblé", vi: "Bonus nghề mục tiêu" },
        options: [
          { v: 0, l: "Not a targeted trade (0)" },
          { v: 40, l: "Eligible targeted trade (+40)" },
        ],
      },
      ntEdu: {
        name: "ntEdu",
        label: { en: "Education (max 50)", fr: "Études (max 50)", vi: "Học vấn (tối đa 50)" },
        options: [
          { v: 0, l: "Secondary or less (0)" },
          { v: 20, l: "Post-secondary diploma (20)" },
          { v: 35, l: "Bachelor (35)" },
          { v: 50, l: "Master / PhD (50)" },
        ],
      },
      ntPermit: {
        name: "ntPermit",
        label: { en: "Valid NWT work permit with employer", fr: "Permis de travail T.N.-O. valide", vi: "Work permit NWT hợp lệ với employer" },
        options: [
          { v: 0, l: "No current NWT work permit (0)" },
          { v: 50, l: "Working on valid permit for NWT employer (50)" },
        ],
      },
      ntCommunity: {
        name: "ntCommunity",
        label: { en: "Community / family ties in NWT", fr: "Liens communautaires / familiaux", vi: "Liên kết cộng đồng / gia đình NWT" },
        options: [
          { v: 0, l: "None (0)" },
          { v: 25, l: "Family or community support documented (25)" },
        ],
      },
      ntSpouse: {
        name: "ntSpouse",
        label: { en: "Spouse language & education adaptability", fr: "Adaptabilité conjoint", vi: "Adaptability vợ/chồng (ngôn ngữ & học vấn)" },
        options: [
          { v: 0, l: "No accompanying spouse factors (0)" },
          { v: 15, l: "Spouse CLB 4+ or post-secondary (15)" },
          { v: 30, l: "Spouse CLB 6+ and post-secondary (30)" },
        ],
      },
      ntFr: {
        name: "ntFr",
        label: { en: "French language bonus", fr: "Bonus français", vi: "Bonus tiếng Pháp" },
        options: [
          { v: 0, l: "No French (0)" },
          { v: 25, l: "CLB 5+ French (25)" },
          { v: 40, l: "CLB 7+ French (40)" },
        ],
      },
      ntDriver: {
        name: "ntDriver",
        label: { en: "NWT driver's licence / mobility", fr: "Permis de conduire T.N.-O.", vi: "Bằng lái / di chuyển NWT" },
        options: [
          { v: 0, l: "No NWT licence (0)" },
          { v: 15, l: "Valid NWT driver's licence (15)" },
        ],
      },
      ntRelative: {
        name: "ntRelative",
        label: { en: "Close family in NWT", fr: "Famille proche aux T.N.-O.", vi: "Gia đình close tại NWT" },
        options: [
          { v: 0, l: "None (0)" },
          { v: 20, l: "Close relative residing in NWT (20)" },
        ],
      },
    };
    profile.fieldGroups = [
      { title: { en: "Language & age", fr: "Langue et âge", vi: "Ngôn ngữ & tuổi" }, fields: ["ntAge", "ntLang1", "ntLang2", "ntFr"] },
      { title: { en: "Education", fr: "Études", vi: "Học vấn" }, fields: ["ntEdu"] },
      { title: { en: "NWT job offer & experience", fr: "Offre et expérience T.N.-O.", vi: "Job offer & kinh nghiệm NWT" }, fields: ["ntJob", "ntNwtWork", "ntPermit", "ntTrade", "ntDriver"] },
      { title: { en: "Adaptability", fr: "Adaptabilité", vi: "Adaptability" }, fields: ["ntCommunity", "ntRelative", "ntSpouse"] },
    ];
    program.fields = [];
  }

  if (program.id === "nl") {
    program.maxPoints = 100;
    profile.calcTitle = { en: "NLPNP Express Entry grid (100 points)", fr: "Grille NLPNP Entrée express (100 points)", vi: "Lưới NLPNP Express Entry (100 điểm)" };
    profile.extraFields = {
      nlAge: { name: "nlAge", label: { en: "Age (max 12)", fr: "Âge (max 12)", vi: "Tuổi (tối đa 12)" }, options: [{ v: 0, l: "47+ (0)" }, { v: 8, l: "35–44 (8)" }, { v: 12, l: "22–34 (12)" }] },
      nlLang1: { name: "nlLang1", label: { en: "First language (max 24)", fr: "Première langue (max 24)", vi: "Ngôn ngữ 1 (tối đa 24)" }, options: [{ v: 0, l: "CLB 5 (0)" }, { v: 12, l: "CLB 7 (12)" }, { v: 18, l: "CLB 8 (18)" }, { v: 24, l: "CLB 9+ (24)" }] },
      nlLang2: { name: "nlLang2", label: { en: "Second language (max 4)", fr: "Deuxième langue (max 4)", vi: "Ngôn ngữ 2 (tối đa 4)" }, options: [{ v: 0, l: "Below CLB 5 (0)" }, { v: 4, l: "CLB 5+ (4)" }] },
      nlEdu: { name: "nlEdu", label: { en: "Education (max 23)", fr: "Études (max 23)", vi: "Học vấn (tối đa 23)" }, options: [{ v: 0, l: "Secondary (0)" }, { v: 12, l: "One-year PS (12)" }, { v: 18, l: "Two-year PS (18)" }, { v: 23, l: "Bachelor+ (23)" }] },
      nlWork: { name: "nlWork", label: { en: "Skilled work (max 15)", fr: "Expérience (max 15)", vi: "Kinh nghiệm skilled (tối đa 15)" }, options: [{ v: 0, l: "<1 yr (0)" }, { v: 5, l: "1–2 yrs (5)" }, { v: 10, l: "3–4 yrs (10)" }, { v: 15, l: "5+ yrs (15)" }] },
      nlJob: { name: "nlJob", label: { en: "NL arranged employment", fr: "Emploi garanti NL", vi: "Việc làm sắp xếp tại NL" }, options: [{ v: 0, l: "No offer (0)" }, { v: 10, l: "Permanent NL offer (10)" }] },
      nlAdapt: { name: "nlAdapt", label: { en: "Adaptability", fr: "Adaptabilité", vi: "Adaptability" }, options: [{ v: 0, l: "None (0)" }, { v: 5, l: "Spouse CLB 4+ or job adaptability (5)" }, { v: 10, l: "Previous NL study/work (10)" }] },
      nlSector: {
        name: "nlSector",
        label: { en: "NL priority sector (draw targeting)", fr: "Secteur prioritaire NL", vi: "Ngành ưu tiên NL (rút thăm)" },
        options: [
          { v: 0, l: "Outside priority list (0)" },
          { v: 5, l: "Health, tech, trades, or manufacturing priority (+5)" },
        ],
      },
      nlPs: {
        name: "nlPs",
        label: { en: "Priority Skills NL profile (planning)", fr: "Profil Priority Skills NL", vi: "Hồ sơ Priority Skills NL (ước lượng)" },
        options: [
          { v: 0, l: "Not using Priority Skills pathway (0)" },
          { v: 8, l: "Master+ in priority field + CLB 5+ (8)" },
          { v: 12, l: "Specialized experience in priority NOC (12)" },
        ],
      },
    };
    profile.scoreSystem = {
      en: "Express Entry Skilled Worker uses 67/100; Priority Skills uses occupation lists",
      fr: "EE travailleur qualifié : 67/100; Priority Skills : listes d'occupations",
      vi: "EE Skilled Worker: 67/100; Priority Skills theo danh sách nghề",
    };
    profile.fieldGroups = [
      { title: { en: "Core factors (67+ to qualify)", fr: "Facteurs principaux (67+)", vi: "Yếu tố cốt lõi (67+)" }, fields: ["nlAge", "nlLang1", "nlLang2", "nlEdu", "nlWork"] },
      { title: { en: "Employment & adaptability", fr: "Emploi et adaptabilité", vi: "Việc làm & adaptability" }, fields: ["nlJob", "nlAdapt", "nlSector"] },
      { title: { en: "Priority Skills NL (optional)", fr: "Priority Skills NL (optionnel)", vi: "Priority Skills NL (tùy chọn)" }, fields: ["nlPs"] },
    ];
    program.fields = [];
  }

  if (program.id === "pei") {
    program.maxPoints = 100;
    profile.calcTitle = { en: "PEI EOI score (100 points)", fr: "Score EOI PEI (100 points)", vi: "Điểm EOI PEI (100 điểm)" };
    profile.extraFields = {
      peiAge: { name: "peiAge", label: { en: "Age (max 20)", fr: "Âge (max 20)", vi: "Tuổi (tối đa 20)" }, options: [{ v: 0, l: "Under 21 or 46+ (0)" }, { v: 10, l: "36–45 (10)" }, { v: 20, l: "21–35 (20)" }] },
      peiLang: { name: "peiLang", label: { en: "Language (max 20)", fr: "Langue (max 20)", vi: "Ngôn ngữ (tối đa 20)" }, options: [{ v: 0, l: "CLB 5 (0)" }, { v: 10, l: "CLB 7–8 (10)" }, { v: 20, l: "CLB 9+ (20)" }] },
      peiEdu: { name: "peiEdu", label: { en: "Education (max 15)", fr: "Études (max 15)", vi: "Học vấn (tối đa 15)" }, options: [{ v: 0, l: "Secondary (0)" }, { v: 8, l: "Post-secondary (8)" }, { v: 15, l: "Bachelor+ (15)" }] },
      peiWork: { name: "peiWork", label: { en: "Work experience (max 15)", fr: "Expérience (max 15)", vi: "Kinh nghiệm (tối đa 15)" }, options: [{ v: 0, l: "<2 yrs (0)" }, { v: 8, l: "2–4 yrs (8)" }, { v: 15, l: "5+ yrs (15)" }] },
      peiJob: { name: "peiJob", label: { en: "Employment in PEI (max 15)", fr: "Emploi à PEI (max 15)", vi: "Việc làm PEI (tối đa 15)" }, options: [{ v: 0, l: "No PEI job (0)" }, { v: 10, l: "PEI job offer (10)" }, { v: 15, l: "Working in PEI now (15)" }] },
      peiAdapt: { name: "peiAdapt", label: { en: "Adaptability (max 15)", fr: "Adaptabilité (max 15)", vi: "Adaptability (tối đa 15)" }, options: [{ v: 0, l: "None (0)" }, { v: 5, l: "PEI property 12+ months (5)" }, { v: 10, l: "Spouse CLB 6+ or 3 yrs work (10)" }, { v: 15, l: "PEI graduate or close family (15)" }] },
      peiGrad: {
        name: "peiGrad",
        label: { en: "PEI post-secondary graduate bonus", fr: "Bonus diplômé PEI", vi: "Bonus tốt nghiệp PEI" },
        options: [
          { v: 0, l: "Not a PEI grad (0)" },
          { v: 10, l: "UPEI / Holland College / Collège de l'Île (10)" },
        ],
      },
      peiSector: {
        name: "peiSector",
        label: { en: "2026 draw priority sector", fr: "Secteur prioritaire 2026", vi: "Ngành ưu tiên rút 2026" },
        options: [
          { v: 0, l: "Other sector (0)" },
          { v: 5, l: "Healthcare / childcare (+5)" },
          { v: 5, l: "Trades / manufacturing (+5)" },
        ],
      },
      peiEe: {
        name: "peiEe",
        label: { en: "Express Entry stream factor", fr: "Volet Entrée express", vi: "Luồng Express Entry" },
        options: [
          { v: 0, l: "Labour Impact only (0)" },
          { v: 5, l: "Active EE profile in PEI pool (+5)" },
        ],
      },
    };
    profile.scoreSystem = {
      en: "100-point EOI — monthly draws; min score often not published",
      fr: "EOI 100 points — tirages mensuels; score souvent non publié",
      vi: "EOI 100 điểm — rút hàng tháng; điểm tối thiểu thường không công bố",
    };
    profile.fieldGroups = [
      { title: { en: "PEI EOI factors", fr: "Facteurs EOI PEI", vi: "Yếu tố EOI PEI" }, fields: ["peiAge", "peiLang", "peiEdu", "peiWork"] },
      { title: { en: "Employment & adaptability", fr: "Emploi et adaptabilité", vi: "Việc làm & adaptability" }, fields: ["peiJob", "peiAdapt", "peiGrad", "peiSector", "peiEe"] },
    ];
    program.fields = [];
  }

  if (program.id === "qc") {
    program.maxPoints = 1320;
    profile.calcTitle = { en: "Arrima PSTQ score (1,320-point grid — simplified)", fr: "Score Arrima PSTQ (1 320 points — simplifié)", vi: "Điểm Arrima PSTQ (1.320 — đơn giản)" };
    profile.scoreSystem = { en: "French NCLC 7+ oral strongly recommended for competitive scores", fr: "Français NCLC 7+ oral fortement recommandé", vi: "NCLC 7+ nói tiếng Pháp rất quan trọng" };
    profile.extraFields = {
      qcAge: { name: "qcAge", label: { en: "Age (max 130)", fr: "Âge (max 130)", vi: "Tuổi (tối đa 130)" }, options: [{ v: 0, l: "35+ (0)" }, { v: 50, l: "31–34 (50)" }, { v: 130, l: "18–30 (130)" }] },
      qcFrench: { name: "qcFrench", label: { en: "French oral (NCLC)", fr: "Français oral (NCLC)", vi: "Pháp ngữ nói (NCLC)" }, options: [{ v: 0, l: "Below 7 (0)" }, { v: 120, l: "NCLC 7–8 (120)" }, { v: 180, l: "NCLC 9+ (180)" }] },
      qcEnglish: { name: "qcEnglish", label: { en: "English (CLB)", fr: "Anglais (CLB)", vi: "Tiếng Anh (CLB)" }, options: [{ v: 0, l: "Below 5 (0)" }, { v: 40, l: "CLB 5–7 (40)" }, { v: 80, l: "CLB 8+ (80)" }] },
      qcEdu: { name: "qcEdu", label: { en: "Education (max 104)", fr: "Études (max 104)", vi: "Học vấn (tối đa 104)" }, options: [{ v: 0, l: "Secondary (0)" }, { v: 52, l: "Post-secondary (52)" }, { v: 78, l: "Bachelor (78)" }, { v: 104, l: "Master+ (104)" }] },
      qcWork: { name: "qcWork", label: { en: "Work experience (max 80)", fr: "Expérience (max 80)", vi: "Kinh nghiệm (tối đa 80)" }, options: [{ v: 0, l: "<1 yr (0)" }, { v: 40, l: "1–3 yrs (40)" }, { v: 60, l: "4–5 yrs (60)" }, { v: 80, l: "6+ yrs (80)" }] },
      qcVjo: { name: "qcVjo", label: { en: "Validated job offer (VJO)", fr: "Offre d'emploi validée (VJO)", vi: "Job offer validated (VJO)" }, options: [{ v: 0, l: "No VJO (0)" }, { v: 200, l: "VJO in Montreal area (200)" }, { v: 380, l: "VJO outside CMM (380)" }] },
      qcSpouseFr: { name: "qcSpouseFr", label: { en: "Spouse French", fr: "Français du conjoint", vi: "Tiếng Pháp vợ/chồng" }, options: [{ v: 0, l: "None (0)" }, { v: 20, l: "NCLC 5+ (20)" }, { v: 40, l: "NCLC 7+ (40)" }] },
      qcStream: {
        name: "qcStream",
        label: { en: "PSTQ stream (2026)", fr: "Volet PSTQ (2026)", vi: "Luồng PSTQ (2026)" },
        options: [
          { v: 0, l: "Stream 1 — TEER 0–2 (0 bonus)" },
          { v: 0, l: "Stream 2 — TEER 3–5 (0 bonus)" },
          { v: 15, l: "Stream 3 — regulated profession (+15 planning)" },
          { v: 0, l: "Stream 4 — exceptional talent (non-grid)" },
        ],
      },
      qcStudy: {
        name: "qcStudy",
        label: { en: "Quebec education (max 80)", fr: "Études au Québec (max 80)", vi: "Học tại Quebec (tối đa 80)" },
        options: [
          { v: 0, l: "None (0)" },
          { v: 40, l: "1–2 year Quebec credential (40)" },
          { v: 60, l: "3+ year Quebec credential (60)" },
          { v: 80, l: "Master+ from Quebec (80)" },
        ],
      },
      qcChildren: {
        name: "qcChildren",
        label: { en: "Accompanying children", fr: "Enfants accompagnants", vi: "Con đi cùng" },
        options: [
          { v: 0, l: "None (0)" },
          { v: 8, l: "Each child under 13 (+8 each, max 16)" },
          { v: 16, l: "Two+ children under 13 (+16)" },
        ],
      },
      qcRegulated: {
        name: "qcRegulated",
        label: { en: "Quebec professional order / licensing", fr: "Ordre professionnel / permis", vi: "Order nghề / giấy phép Quebec" },
        options: [
          { v: 0, l: "Not regulated (0)" },
          { v: 50, l: "License in progress — Stream 3 (+50)" },
          { v: 80, l: "Full Quebec license (+80)" },
        ],
      },
    };
    profile.fieldGroups = [
      { title: { en: "PSTQ stream & age", fr: "Volet PSTQ et âge", vi: "Luồng PSTQ & tuổi" }, fields: ["qcStream", "qcAge"] },
      { title: { en: "Language", fr: "Langue", vi: "Ngôn ngữ" }, fields: ["qcFrench", "qcEnglish", "qcSpouseFr"] },
      { title: { en: "Education & experience", fr: "Études et expérience", vi: "Học vấn & kinh nghiệm" }, fields: ["qcEdu", "qcStudy", "qcWork"] },
      { title: { en: "Job offer & family", fr: "Offre d'emploi et famille", vi: "Job offer & gia đình" }, fields: ["qcVjo", "qcChildren"] },
      { title: { en: "Regulated professions (Stream 3)", fr: "Professions réglementées (volet 3)", vi: "Nghề regulated (Stream 3)" }, fields: ["qcRegulated"] },
    ];
    program.fields = [];
  }

  if (program.id === "ns") {
    program.maxPoints = 100;
    profile.calcTitle = { en: "NSNP profile factors (100-point planning grid)", fr: "Facteurs NSNP (100 points — planification)", vi: "Yếu tố NSNP (lưới 100 điểm)" };
    profile.extraFields = {
      nsAge: { name: "nsAge", label: { en: "Age", fr: "Âge", vi: "Tuổi" }, options: [{ v: 0, l: "Outside 22–55 (0)" }, { v: 8, l: "22–39 (8)" }, { v: 5, l: "40–55 (5)" }] },
      nsLang: { name: "nsLang", label: { en: "Language (CLB)", fr: "Langue (CLB)", vi: "Ngôn ngữ (CLB)" }, options: [{ v: 0, l: "CLB 5 (0)" }, { v: 12, l: "CLB 7 (12)" }, { v: 20, l: "CLB 9+ (20)" }] },
      nsEdu: { name: "nsEdu", label: { en: "Education", fr: "Études", vi: "Học vấn" }, options: [{ v: 0, l: "Secondary (0)" }, { v: 8, l: "Post-secondary (8)" }, { v: 15, l: "Bachelor+ (15)" }] },
      nsWork: { name: "nsWork", label: { en: "Skilled work experience", fr: "Expérience qualifiée", vi: "Kinh nghiệm skilled" }, options: [{ v: 0, l: "<1 yr (0)" }, { v: 8, l: "1–3 yrs (8)" }, { v: 15, l: "4+ yrs (15)" }] },
      nsNsWork: { name: "nsNsWork", label: { en: "Nova Scotia work / job offer", fr: "Travail ou offre N.-É.", vi: "Kinh nghiệm / job offer NS" }, options: [{ v: 0, l: "No NS tie (0)" }, { v: 10, l: "6+ months NS work (10)" }, { v: 20, l: "Permanent NS job offer (20)" }] },
      nsPriority: { name: "nsPriority", label: { en: "Priority occupation / sector", fr: "Profession prioritaire", vi: "Nghề/ngành ưu tiên" }, options: [{ v: 0, l: "Not on priority list (0)" }, { v: 15, l: "Listed priority NOC/sector (15)" }] },
      nsSpouse: { name: "nsSpouse", label: { en: "Spouse factors", fr: "Facteurs conjoint", vi: "Yếu tố vợ/chồng" }, options: [{ v: 0, l: "None (0)" }, { v: 5, l: "Spouse CLB 4+ (5)" }, { v: 10, l: "Spouse CLB 6+ or NS work (10)" }] },
    };
    profile.fieldGroups = [
      { title: { en: "Human capital", fr: "Capital humain", vi: "Vốn con người" }, fields: ["nsAge", "nsLang", "nsEdu", "nsWork"] },
      { title: { en: "Nova Scotia connection", fr: "Lien N.-É.", vi: "Liên kết Nova Scotia" }, fields: ["nsNsWork", "nsPriority", "nsSpouse"] },
    ];
    program.fields = [];
  }

  if (program.id === "ynp") {
    program.maxPoints = 103;
    profile.calcTitle = {
      en: "YNP calculator — worker EOI priority (20 pts) + Business Nominee (103 pts)",
      fr: "Calculateur YNP — priorité EOI (20 pts) + affaires (103 pts)",
      vi: "Máy tính YNP — EOI worker (20 điểm) + Business (103 điểm)",
    };
    profile.scoreSystem = {
      en: "Fill worker OR business sections only — employer submits EOI during open intakes",
      fr: "Remplir travailleur OU affaires — EOI par l'employeur",
      vi: "Chỉ điền worker HOẶC business — employer nộp EOI khi intake mở",
    };
    profile.quotaNote = {
      en: "Yukon receives a small annual nomination allocation. Intakes run in windows; employers submit EOIs during active periods — not continuous monthly draws like larger provinces.",
      fr: "Le Yukon reçoit un petit quota annuel. Les employeurs déposent des EOI durant des périodes d'intake.",
      vi: "Yukon có chỉ tiêu đề cử nhỏ hàng năm. Employer nộp EOI trong các đợt intake, không rút thăm liên tục như tỉnh lớn.",
    };
    profile.extraFields = {
      ytWorkerHealth: { name: "ytWorkerHealth", label: { en: "Regulated health care priority", fr: "Priorité santé réglementée", vi: "Ưu tiên y tế regulated" }, options: [{ v: 0, l: "Not health regulated (0)" }, { v: 8, l: "Regulated health role (8)" }] },
      ytWorkerFrench: { name: "ytWorkerFrench", label: { en: "French language priority", fr: "Priorité francophone", vi: "Ưu tiên Pháp ngữ" }, options: [{ v: 0, l: "Below CLB 5 French (0)" }, { v: 6, l: "CLB 5+ French (6)" }] },
      ytWorkerLocal: { name: "ytWorkerLocal", label: { en: "Yukon work history", fr: "Expérience au Yukon", vi: "Lịch sử làm việc Yukon" }, options: [{ v: 0, l: "Less than 1 year in YT (0)" }, { v: 4, l: "1+ year working in Yukon (4)" }] },
      ytWorkerGrad: { name: "ytWorkerGrad", label: { en: "Yukon University graduate", fr: "Diplômé Yukon University", vi: "Tốt nghiệp Yukon University" }, options: [{ v: 0, l: "No (0)" }, { v: 4, l: "YU graduate (4)" }] },
      ytWorkerTeer: {
        name: "ytWorkerTeer",
        label: { en: "Job offer TEER (worker streams)", fr: "TEER de l'offre (volets travailleur)", vi: "TEER job offer (luồng worker)" },
        options: [
          { v: 0, l: "TEER 4–5 Critical Impact (0)" },
          { v: 1, l: "TEER 2–3 Skilled Worker (+1)" },
          { v: 2, l: "TEER 0–1 / YEE (+2)" },
        ],
      },
      ytWorkerOffer: {
        name: "ytWorkerOffer",
        label: { en: "Employer EOI in open intake", fr: "EOI employeur (intake ouvert)", vi: "EOI employer trong intake mở" },
        options: [
          { v: 0, l: "No active employer EOI (0)" },
          { v: 2, l: "Employer submitted EOI in open intake (+2)" },
        ],
      },
      ytInvest: {
        name: "ytInvest",
        label: { en: "Proposed investment (CAD)", fr: "Investissement proposé (CAD)", vi: "Đầu tư đề xuất (CAD)" },
        options: [
          { v: 0, l: "Under $300k (ineligible)" },
          { v: 6, l: "$300k–$400k (6)" },
          { v: 8, l: "$400k–$750k (8)" },
          { v: 12, l: "$750k+ (12)" },
        ],
      },
      ytLiquid: {
        name: "ytLiquid",
        label: { en: "Liquid assets", fr: "Actifs liquides", vi: "Tài sản thanh khoản" },
        options: [
          { v: 0, l: "Under $300k (0)" },
          { v: 6, l: "$300k–$450k (6)" },
          { v: 8, l: "$450k+ (8)" },
        ],
      },
      ytNet: {
        name: "ytNet",
        label: { en: "Personal net worth", fr: "Valeur nette personnelle", vi: "Giá trị ròng cá nhân" },
        options: [
          { v: 0, l: "Under $500k (0)" },
          { v: 6, l: "$500k–$750k (6)" },
          { v: 8, l: "$750k+ (8)" },
        ],
      },
      ytLoc: {
        name: "ytLoc",
        label: { en: "Business location", fr: "Emplacement de l'entreprise", vi: "Địa điểm kinh doanh" },
        options: [
          { v: 0, l: "Whitehorse area (0)" },
          { v: 5, l: "Outside Whitehorse (5)" },
        ],
      },
      ytAge: {
        name: "ytAge",
        label: { en: "Age", fr: "Âge", vi: "Tuổi" },
        options: [
          { v: 0, l: "Under 21 or 55+ (0)" },
          { v: 8, l: "21–34 (8)" },
          { v: 6, l: "35–44 (6)" },
          { v: 4, l: "45–54 (4)" },
        ],
      },
      ytLang: {
        name: "ytLang",
        label: { en: "Language (CLB/NCLC)", fr: "Langue (CLB/NCLC)", vi: "Ngôn ngữ (CLB/NCLC)" },
        options: [
          { v: 0, l: "Below CLB 6 (0)" },
          { v: 8, l: "CLB 6–7 (8)" },
          { v: 12, l: "CLB 8+ (12)" },
        ],
      },
    };
    profile.fieldGroups = [
      { title: { en: "Employer EOI worker priority (max 20 — do not add to business)", fr: "Priorité travailleur EOI (max 20)", vi: "Ưu tiên worker EOI (tối đa 20)" }, fields: ["ytWorkerTeer", "ytWorkerOffer", "ytWorkerHealth", "ytWorkerFrench", "ytWorkerLocal", "ytWorkerGrad"] },
      { title: { en: "Business Nominee (103 points)", fr: "Nommé affaires (103 points)", vi: "Business Nominee (103 điểm)" }, fields: ["ytInvest", "ytLiquid", "ytNet", "ytLoc", "ytAge", "ytLang"] },
    ];
    program.fields = [];
  }

  if (program.id === "sk") {
    program.maxPoints = 110;
    profile.calcTitle = {
      en: "ISW calculator (110 points — EE & OID only)",
      fr: "Calculateur TQI (110 points — EE et OID seulement)",
      vi: "Máy tính ISW (110 điểm — chỉ EE & OID)",
    };
    profile.scoreSystem = {
      en: "Experience, Hard-to-Fill & Entrepreneur routes are not scored here — see Eligibility",
      fr: "Expérience SK, pilote et entrepreneur : non calculés ici — voir Admissibilité",
      vi: "Experience, Hard-to-Fill & Entrepreneur không tính ở đây — xem Eligibility",
    };
    profile.extraFields = {
      skAge: {
        name: "skAge",
        label: { en: "Age (max 12)", fr: "Âge (max 12)", vi: "Tuổi (tối đa 12)" },
        options: [
          { v: 0, l: "Under 18 or 51+ (0)" },
          { v: 8, l: "18–21 (8)" },
          { v: 12, l: "22–34 (12)" },
          { v: 10, l: "35–45 (10)" },
          { v: 8, l: "46–50 (8)" },
        ],
      },
      skEdu: {
        name: "skEdu",
        label: { en: "Education & training (max 23)", fr: "Études et formation (max 23)", vi: "Học vấn & đào tạo (tối đa 23)" },
        options: [
          { v: 0, l: "Secondary or less (0)" },
          { v: 12, l: "Trade certificate (12)" },
          { v: 15, l: "One-year post-secondary (15)" },
          { v: 19, l: "Two-year post-secondary (19)" },
          { v: 23, l: "Bachelor or higher (23)" },
        ],
      },
      skWork: {
        name: "skWork",
        label: { en: "Skilled work experience (max 15)", fr: "Expérience qualifiée (max 15)", vi: "Kinh nghiệm skilled (tối đa 15)" },
        options: [
          { v: 0, l: "Less than 1 year (0)" },
          { v: 5, l: "1–2 years (5)" },
          { v: 10, l: "3–4 years (10)" },
          { v: 15, l: "5+ years (15)" },
        ],
      },
      skLang: {
        name: "skLang",
        label: { en: "Language — CLB/NCLC (max 20)", fr: "Langue — CLB/NCLC (max 20)", vi: "Ngôn ngữ — CLB/NCLC (tối đa 20)" },
        options: [
          { v: 0, l: "Below CLB 4 (0)" },
          { v: 8, l: "CLB 4–6 (8)" },
          { v: 12, l: "CLB 7 (12)" },
          { v: 15, l: "CLB 8 (15)" },
          { v: 20, l: "CLB 9+ (20)" },
        ],
      },
      skJob: {
        name: "skJob",
        label: { en: "Saskatchewan job offer (approved)", fr: "Offre d'emploi SK (approuvée)", vi: "Job offer Saskatchewan (được duyệt)" },
        options: [
          { v: 0, l: "No SK job offer (0)" },
          { v: 20, l: "Eligible permanent SK job offer (20)" },
        ],
      },
      skRelative: {
        name: "skRelative",
        label: { en: "Close relative in Saskatchewan", fr: "Proche parent en Saskatchewan", vi: "Họ hàng close tại Saskatchewan" },
        options: [
          { v: 0, l: "None (0)" },
          { v: 15, l: "Citizen or PR relative in SK (15)" },
        ],
      },
      skSkExp: {
        name: "skSkExp",
        label: { en: "Previous Saskatchewan work or study", fr: "Travail ou études antérieurs en SK", vi: "Từng làm việc hoặc học tại SK" },
        options: [
          { v: 0, l: "None (0)" },
          { v: 15, l: "6+ months skilled SK work or SK credential (15)" },
        ],
      },
      skSubcat: {
        name: "skSubcat",
        label: { en: "Sub-category you are targeting", fr: "Sous-catégorie visée", vi: "Luồng con bạn nhắm tới" },
        options: [
          { v: 0, l: "Express Entry (active EE profile required)" },
          { v: 0, l: "Occupations In-Demand (NOC on OID list)" },
          { v: 0, l: "Hard-to-Fill Skills Pilot (employer pilot)" },
          { v: 0, l: "Saskatchewan Experience (in-province)" },
        ],
      },
    };
    profile.fieldGroups = [
      { title: { en: "Core SINP factors (110 points)", fr: "Facteurs principaux SINP (110 points)", vi: "Yếu tố cốt lõi SINP (110 điểm)" }, fields: ["skAge", "skEdu", "skWork", "skLang"] },
      {
        title: { en: "Saskatchewan connection (max 30 combined — plan carefully)", fr: "Lien Saskatchewan (max 30 combinés)", vi: "Liên kết Saskatchewan (tối đa 30 cộng dồn — lập kế hoạch cẩn thận)" },
        fields: ["skJob", "skRelative", "skSkExp"],
      },
      { title: { en: "Route check (no points — compare to Eligibility)", fr: "Vérification de volet (0 pt — voir Admissibilité)", vi: "Kiểm tra luồng (0 điểm — đối chiếu Eligibility)" }, fields: ["skSubcat"] },
    ];
    profile.quotaNote = {
      en: "SINP publishes separate invitation rounds for Express Entry and Occupations In-Demand with minimum scores. Occupation lists change — confirm your NOC on the official SINP page before you submit an Expression of Interest.",
      fr: "Le SINP publie des tirages distincts EE et OID avec scores minimums. Les listes de professions changent.",
      vi: "SINP công bố các đợt mời EE và OID riêng với điểm tối thiểu. Danh sách nghề thay đổi — xác nhận NOC trên trang SINP trước khi nộp EOI.",
    };
    program.fields = [];
  }
}

window.patchPnpCalculators = patchPnpCalculators;
