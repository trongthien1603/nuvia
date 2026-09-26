/** At least 10 program-tailored FAQs per province/territory (Liberty-style depth). */

function pnpFaqText(entry, lang) {
  const l = lang || (window.NuviaI18n?.getLang?.() || "en");
  if (!entry) return { q: "", a: "" };
  return {
    q: entry.q[l] || entry.q.en || "",
    a: entry.a[l] || entry.a.en || "",
  };
}

function faqNote(cfg, key, lang) {
  const raw = cfg[key];
  if (!raw) return "";
  if (typeof raw === "string") return raw;
  return raw[lang] || raw.en || "";
}

function buildProgramFaq(cfg) {
  const { short, full, maxPts, streams, ee } = cfg;
  const streamList = streams.join(", ");
  const quebecAdj = short.includes("Quebec") ? "Quebec’s" : "a provincial/territorial";
  const quebecAdjFr = short.includes("Quebec") ? "du Québec" : "provincial/territorial";
  const quebecAdjVi = short.includes("Quebec") ? "của Quebec" : "cấp tỉnh/vùng lãnh thổ";

  return [
    {
      q: {
        en: `What is the ${full} (${short})?`,
        fr: `Qu'est-ce que ${full} (${short}) ?`,
        vi: `${full} (${short}) là gì?`,
      },
      a: {
        en: `${full} is ${quebecAdj} economic immigration pathway for workers, graduates, and employers who can support local labour market needs. It operates separately from IRCC’s federal programs but often coordinates with Express Entry when a stream is “enhanced.” Active streams commonly include ${streamList}. Always confirm which streams are accepting applications on the official portal before you submit an expression of interest or nomination file.`,
        fr: `${full} est une voie d'immigration économique ${quebecAdjFr} pour travailleurs, diplômés et employeurs. Elle est distincte des programmes fédéraux de l'IRCC mais peut se coordonner avec Entrée express pour les volets « améliorés ». Volets courants : ${streamList}. Vérifiez sur le portail officiel quels volets acceptent les demandes avant de déposer un EOI ou un dossier de nomination.`,
        vi: `${full} là lộ trình di trú kinh tế ${quebecAdjVi} cho lao động, sinh viên tốt nghiệp và employer. Tách khỏi chương trình liên bang IRCC nhưng thường phối hợp Express Entry với luồng “enhanced”. Luồng phổ biến: ${streamList}. Xác nhận luồng đang mở trên cổng chính thức trước khi nộp EOI hoặc hồ sơ đề cử.`,
      },
    },
    {
      q: {
        en: `Which ${short} streams are most common for skilled workers?`,
        fr: `Quels volets ${short} sont les plus courants pour les travailleurs qualifiés ?`,
        vi: `Luồng ${short} nào phổ biến nhất cho lao động skilled?`,
      },
      a: {
        en: `Skilled worker pathways under ${short} usually split between employer-supported nominations, Express Entry-linked invitations, and occupation-targeted draws. ${streamList} appear frequently in public draw reports. Eligibility depends on NOC TEER level, language scores, education, and whether you already work for a supporting employer in the province.`,
        fr: `Les volets travailleur qualifié de ${short} incluent souvent nomination par employeur, invitations liées à Entrée express et tirages par profession. Volets fréquents : ${streamList}. L'admissibilité dépend du TEER, de la langue, des études et de l'emploi provincial.`,
        vi: `Luồng skilled worker ${short} thường gồm đề cử employer, mời liên kết Express Entry và rút theo nghề. ${streamList} hay xuất hiện trong báo cáo rút thăm. Điều kiện phụ thuộc TEER, ngôn ngữ, học vấn và việc làm tại tỉnh.`,
      },
    },
    {
      q: {
        en: `How do ${short} draw rounds and invitation cut-offs work?`,
        fr: `Comment fonctionnent les tirages et seuils ${short} ?`,
        vi: `Rút thăm và ngưỡng mời ${short} hoạt động thế nào?`,
      },
      a: {
        en: `${faqNote(cfg, "drawNote", "en")} ${short} may publish minimum scores, invitation counts, or targeted sectors after each round. Use the draw table on this page as a planning reference only and verify the latest round on the official source.`,
        fr: `${faqNote(cfg, "drawNote", "fr")} ${short} peut publier scores minimum, nombre d'invitations ou secteurs ciblés. Utilisez le tableau des tirages ici comme référence seulement et vérifiez la source officielle.`,
        vi: `${faqNote(cfg, "drawNote", "vi")} ${short} có thể công bố điểm tối thiểu, số lời mời hoặc ngành mục tiêu. Bảng rút thăm trên trang chỉ để tham khảo — xác nhận trên nguồn chính thức.`,
      },
    },
    {
      q: {
        en: `What is the points system used by ${short} (up to ${maxPts} on this page)?`,
        fr: `Quel système de points ${short} utilise-t-il (jusqu'à ${maxPts} sur cette page) ?`,
        vi: `Hệ thống điểm ${short} (tối đa ${maxPts} trên trang này) là gì?`,
      },
      a: {
        en: `${faqNote(cfg, "calcNote", "en")} The official ${short} grid may award points for age, language, education, skilled work, and regional ties. ${maxPts} points on this calculator is a simplified subset for quick estimates.`,
        fr: `${faqNote(cfg, "calcNote", "fr")} La grille officielle ${short} peut inclure âge, langue, études, travail qualifié et liens régionaux. ${maxPts} points ici = sous-ensemble simplifié.`,
        vi: `${faqNote(cfg, "calcNote", "vi")} Lưới chính thức ${short} có thể tính tuổi, ngôn ngữ, học vấn, kinh nghiệm skilled và liên kết vùng. ${maxPts} điểm trên máy tính là tập con đơn giản.`,
      },
    },
    {
      q: {
        en: `Do I need a job offer for ${short}?`,
        fr: `Ai-je besoin d'une offre d'emploi pour ${short} ?`,
        vi: `Tôi có cần job offer cho ${short} không?`,
      },
      a: {
        en: `${faqNote(cfg, "jobNote", "en")} Employer-driven streams typically require a full-time eligible job offer; some Express Entry-linked streams invite candidates already in the federal pool without a new offer.`,
        fr: `${faqNote(cfg, "jobNote", "fr")} Les volets employeur exigent souvent une offre à temps plein admissible; certains volets EE invitent des candidats déjà dans le bassin fédéral.`,
        vi: `${faqNote(cfg, "jobNote", "vi")} Luồng employer thường cần job offer toàn thời gian đủ điều kiện; một số luồng EE mời ứng viên đã có hồ sơ liên bang.`,
      },
    },
    {
      q: {
        en: `How does ${short} relate to Express Entry?`,
        fr: `Quel lien entre ${short} et Entrée express ?`,
        vi: `${short} liên quan Express Entry thế nào?`,
      },
      a: ee
        ? {
            en: `Several ${short} streams are enhanced: a provincial nomination generally adds 600 CRS points and leads to an ITA through Express Entry. Maintain an eligible EE profile and meet provincial and federal requirements.`,
            fr: `Plusieurs volets ${short} sont « améliorés » : une nomination provinciale ajoute en général 600 points CRS et mène à une ITA via Entrée express. Gardez un profil EE admissible.`,
            vi: `Nhiều luồng ${short} là enhanced: đề cử tỉnh thường cộng 600 điểm CRS và dẫn tới ITA qua Express Entry. Duy trì hồ sơ EE đủ điều kiện.`,
          }
        : {
            en: `${short} primarily uses a separate provincial or Quebec selection process rather than Express Entry. Federal medical, security, and admissibility stages still apply after provincial approval.`,
            fr: `${short} utilise surtout une sélection provinciale ou québécoise distincte d'Entrée express. Les étapes fédérales (médical, sécurité) s'appliquent après l'approbation provinciale.`,
            vi: `${short} chủ yếu dùng quy trình chọn tỉnh/Quebec riêng, không qua Express Entry. Giai đoạn y tế, an ninh liên bang vẫn áp dụng sau khi tỉnh duyệt.`,
          },
    },
    {
      q: {
        en: `How often does ${short} hold draws or issue invitations?`,
        fr: `À quelle fréquence ${short} tient-il des tirages ?`,
        vi: `${short} rút thăm bao lâu một lần?`,
      },
      a: {
        en: `Frequency varies by fiscal year and labour market priorities. Some provinces publish draws weekly or monthly; ${short} may pause streams without notice. Review the draw table here after each visit.`,
        fr: `La fréquence varie selon l'année fiscale et les priorités du marché du travail. Certaines provinces publient des tirages chaque semaine ou mois; ${short} peut suspendre des volets sans préavis.`,
        vi: `Tần suất thay đổi theo năm tài chính và ưu tiên thị trường lao động. Một số tỉnh rút hàng tuần/tháng; ${short} có thể tạm dừng luồng không báo trước.`,
      },
    },
    {
      q: {
        en: `Is the ${short} score shown in this calculator official?`,
        fr: `Le score ${short} affiché ici est-il officiel ?`,
        vi: `Điểm ${short} trên máy tính này có chính thức không?`,
      },
      a: {
        en: `No. This tool uses a simplified model. ${short} assessors apply detailed grids and stream-specific rules not replicated here. Cross-check against the official ${short} guide before submitting an EOI or accepting an invitation.`,
        fr: `Non. Cet outil est simplifié. Les évaluateurs ${short} appliquent des grilles détaillées non reproduites ici. Vérifiez le guide officiel avant un EOI ou une invitation.`,
        vi: `Không. Công cụ này đơn giản hóa. Cán bộ ${short} áp dụng lưới chi tiết không mô phỏng đầy đủ. Đối chiếu hướng dẫn chính thức trước khi nộp EOI hoặc nhận lời mời.`,
      },
    },
    {
      q: {
        en: `What documents are usually required after a ${short} invitation?`,
        fr: `Quels documents après une invitation ${short} ?`,
        vi: `Hồ sơ thường cần sau khi được mời ${short}?`,
      },
      a: {
        en: `${faqNote(cfg, "docNote", "en")} Typical files include identity documents, language tests, education credentials, employment references, and proof of funds where required.`,
        fr: `${faqNote(cfg, "docNote", "fr")} Pièces courantes : identité, tests de langue, diplômes, références d'emploi et preuves de fonds si exigées.`,
        vi: `${faqNote(cfg, "docNote", "vi")} Thường gồm giấy tờ tùy thân, test ngôn ngữ, bằng cấp, thư giới thiệu việc làm và chứng minh tài chính nếu cần.`,
      },
    },
    {
      q: {
        en: `How can Nuvia Immigration (RCIC) help with ${short} strategy?`,
        fr: `Comment Nuvia Immigration (RCIC) peut-il aider pour ${short} ?`,
        vi: `Nuvia Immigration (RCIC) hỗ trợ chiến lược ${short} thế nào?`,
      },
      a: {
        en: `An RCIC can match you to the correct ${short} stream, compare enhanced versus base pathways, and align provincial steps with Express Entry or PR timelines. Book a consultation for a full-file review beyond this calculator.`,
        fr: `Un RCIC peut identifier le bon volet ${short}, comparer volets améliorés et de base, et coordonner les étapes provinciales avec Entrée express ou la RP. Réservez une consultation pour un examen complet.`,
        vi: `RCIC có thể chọn đúng luồng ${short}, so sánh enhanced và base, và phối hợp bước tỉnh với Express Entry hoặc PR. Đặt tư vấn để rà soát hồ sơ đầy đủ.`,
      },
    },
  ];
}

const PNP_FAQ_CONFIG = {
  aaip: {
    short: "AAIP",
    full: "Alberta Advantage Immigration Program",
    maxPts: 100,
    streams: ["Alberta Opportunity Stream", "Accelerated Tech Pathway", "Rural Renewal Stream"],
    ee: true,
    drawNote: "Alberta publishes EOI draw results with minimum scores for some streams.",
    calcNote: "Alberta uses a worker EOI points matrix for ranking in the pool.",
    jobNote: "Many AAIP streams expect Alberta employment or a supporting job offer.",
    docNote: "AAIP may request Alberta employer documents, licensing, and proof of Alberta work history.",
  },
  bc: {
    short: "BC PNP",
    full: "British Columbia Provincial Nominee Program",
    maxPts: 200,
    streams: ["Skilled Worker", "Healthcare Professional", "International Graduate", "Entry Level & Semi-Skilled"],
    ee: true,
    drawNote: "BC PNP publishes Skills Immigration (SIRS) scores with each weekly invitation round.",
    calcNote: "SIRS scores human capital and economic factors up to 200 points for many SI categories.",
    jobNote: "Most Skills Immigration categories require a valid BC job offer unless you qualify as an international graduate.",
    docNote: "BC requires employer forms, job details, and proof you meet NOC and wage requirements.",
  },
  mpnp: {
    short: "MPNP",
    full: "Manitoba Provincial Nominee Program",
    maxPts: 1000,
    streams: ["Skilled Workers in Manitoba", "Skilled Workers Overseas", "International Education Stream"],
    ee: true,
    drawNote: "Manitoba publishes LAA draws with score cut-offs for EOI candidates.",
    calcNote: "MPNP ranks Expression of Interest profiles on a 1,000-point assessment grid.",
    jobNote: "In-province streams often require Manitoba employment; overseas streams use connection factors.",
    docNote: "MPNP may request settlement plans, employer support letters, and Manitoba connection evidence.",
  },
  nb: {
    short: "NBPNP",
    full: "New Brunswick Provincial Nominee Program",
    maxPts: 100,
    streams: ["Express Entry stream", "Skilled Worker with Employer Support", "Occupations in Demand"],
    ee: true,
    drawNote: "New Brunswick announces targeted draws and sector priorities through official channels.",
    calcNote: "NBPNP uses stream-specific criteria rather than one public 100-point grid for every pathway.",
    jobNote: "Employer-supported streams require a genuine NB job offer from an eligible employer.",
    docNote: "NB files typically include employer compliance documents and proof of NB connection.",
  },
  nl: {
    short: "NLPNP",
    full: "Newfoundland and Labrador Provincial Nominee Program",
    maxPts: 100,
    streams: ["Priority Skills NL", "Skilled Worker", "International Graduate"],
    ee: false,
    drawNote: "NLPNP issues targeted invitations for priority occupations and skills categories.",
    calcNote: "NL uses stream criteria and employer support rather than a single published EOI score for all pathways.",
    jobNote: "Employer-led streams require NL job offers; Priority Skills targets in-demand profiles.",
    docNote: "Candidates should prepare licensing, employer registration, and settlement evidence for NL.",
  },
  nt: {
    short: "NTNP",
    full: "Northwest Territories Nominee Program",
    maxPts: 100,
    streams: ["Employer-Driven Stream", "Francophone Stream", "Business Stream"],
    ee: false,
    drawNote: "NWT nominations are often driven by employer demand and community needs.",
    calcNote: "NTNP emphasizes employer support and retention plans over large public score tables.",
    jobNote: "A supported NWT job offer is central to most worker streams.",
    docNote: "NTNP files include employer nomination forms and community settlement documentation.",
  },
  oinp: {
    short: "OINP",
    full: "Ontario Immigrant Nominee Program",
    maxPts: 76,
    streams: ["Foreign Worker", "Human Capital Priorities", "Skilled Trades", "Masters/PhD Graduate"],
    ee: true,
    drawNote: "Ontario publishes EOI draw notices with score ranges for eligible streams.",
    calcNote: "OINP Expression of Interest streams use a 76-point selection grid for ranking.",
    jobNote: "Some OINP streams require Ontario job offers; HCP invites candidates from the EE pool.",
    docNote: "OINP requires employer schedules, job proof, and credentials verified against stream rules.",
  },
  pei: {
    short: "PEI PNP",
    full: "Prince Edward Island Provincial Nominee Program",
    maxPts: 100,
    streams: ["Labour Impact", "Express Entry", "Business Impact"],
    ee: true,
    drawNote: "PEI typically publishes monthly draw results with minimum EOI scores.",
    calcNote: "PEI ranks Expression of Interest profiles on a 100-point labour impact grid.",
    jobNote: "Labour Impact categories usually require a PEI employer job offer.",
    docNote: "PEI requires employer authorization forms and proof of PEI employment or business investment.",
  },
  qc: {
    short: "Quebec",
    full: "Quebec Regular Skilled Worker / Arrima system",
    maxPts: 100,
    streams: ["RSWP (Arrima)", "Quebec Experience Program (PEQ)", "Pilot programs"],
    ee: false,
    drawNote: "Quebec publishes Arrima invitation rounds for Regular Skilled Worker candidates.",
    calcNote: "Quebec selection emphasizes French proficiency, education, and work experience factors.",
    jobNote: "Validated job offers can add points but many candidates are invited through Arrima ranking.",
    docNote: "Quebec requires French tests, education proofs, and CSQ steps before federal PR processing.",
  },
  ynp: {
    short: "YNP",
    full: "Yukon Nominee Program",
    maxPts: 100,
    streams: ["Skilled Worker", "Critical Impact Worker", "Business Nominee"],
    ee: false,
    drawNote: "Yukon nominations follow employer-driven needs and community priorities.",
    calcNote: "YNP focuses on employer support and retention rather than large public score draws.",
    jobNote: "Skilled Worker and Critical Impact streams require Yukon employer support.",
    docNote: "YNP packages include employer attestations and proof of intent to remain in Yukon.",
  },
  ns: {
    short: "NSNP",
    full: "Nova Scotia Nominee Program",
    maxPts: 100,
    streams: ["Experience (Express Entry)", "Labour Market Priorities", "Physician & specialist", "Skilled Worker"],
    ee: true,
    drawNote: "Nova Scotia announces targeted Express Entry draws for specific NOCs or sectors.",
    calcNote: "NSNP uses stream-specific criteria; many draws target Express Entry profiles directly.",
    jobNote: "Some streams require NS employers; others invite EE candidates without a new offer.",
    docNote: "NSNP may request sector-specific licensing and proof of Nova Scotia connection.",
  },
  sk: {
    short: "SINP",
    full: "Saskatchewan Immigrant Nominee Program",
    maxPts: 110,
    streams: [
      "International Skilled Worker — Express Entry",
      "International Skilled Worker — Occupations In-Demand",
      "Hard-to-Fill Skills Pilot",
      "Saskatchewan Experience",
    ],
    ee: true,
    drawNote: "SINP runs separate Express Entry and Occupations In-Demand invitation rounds with published minimum scores (e.g. EE 92 / OID 86 in late 2026).",
    calcNote: "International Skilled Worker EOIs are ranked on Saskatchewan’s 110-point grid (age, education, skilled experience, language, and Saskatchewan connection factors).",
    jobNote: "OID does not require a job offer when your NOC is on the In-Demand list; EE requires an active IRCC profile; Experience streams need in-province work or study.",
    docNote: "SINP may require ECA, language tests, settlement funds, employer documents, and professional licensing for regulated NOCs.",
  },
};

/** French / Vietnamese program-specific FAQ note lines (English stays in PNP_FAQ_CONFIG). */
const PNP_FAQ_NOTES_I18N = {
  aaip: {
    drawNote: { fr: "L'Alberta publie des résultats EOI avec scores minimum pour certains volets.", vi: "Alberta công bố kết quả EOI kèm điểm tối thiểu cho một số luồng." },
    calcNote: { fr: "L'Alberta utilise une matrice EOI pour classer les candidats.", vi: "Alberta dùng ma trận EOI để xếp hạng hồ sơ." },
    jobNote: { fr: "Plusieurs volets AAIP exigent un emploi ou une offre en Alberta.", vi: "Nhiều luồng AAIP cần việc làm hoặc job offer tại Alberta." },
    docNote: { fr: "L'AAIP peut exiger documents employeur, permis et preuves de travail en Alberta.", vi: "AAIP có thể yêu cầu hồ sơ employer, giấy phép và chứng minh làm việc tại Alberta." },
  },
  bc: {
    drawNote: { fr: "La C.-B. publie les scores SIRS à chaque ronde d'invitation.", vi: "BC công bố điểm SIRS mỗi đợt mời." },
    calcNote: { fr: "Le SIRS évalue capital humain et facteurs économiques jusqu'à 200 points.", vi: "SIRS chấm vốn con người và yếu tố kinh tế tới 200 điểm." },
    jobNote: { fr: "La plupart des catégories Skills Immigration exigent une offre en C.-B.", vi: "Hầu hết Skills Immigration cần job offer BC." },
    docNote: { fr: "La C.-B. exige formulaires employeur, détails du poste et conformité NOC/salaire.", vi: "BC yêu cầu form employer, chi tiết job và NOC/lương." },
  },
  mpnp: {
    drawNote: { fr: "Le Manitoba publie des tirages LAA avec seuils EOI.", vi: "Manitoba công bố rút LAA kèm ngưỡng EOI." },
    calcNote: { fr: "Le MPNP classe les EOI sur une grille de 1 000 points.", vi: "MPNP xếp hạng EOI trên lưới 1.000 điểm." },
    jobNote: { fr: "Les volets au Manitoba exigent souvent un emploi local.", vi: "Luồng trong Manitoba thường cần việc làm tại tỉnh." },
    docNote: { fr: "Le MPNP peut demander plan d'établissement et lettres employeur.", vi: "MPNP có thể yêu cầu kế hoạch định cư và thư employer." },
  },
  nb: {
    drawNote: { fr: "Le N.-B. annonce des tirages ciblés et priorités sectorielles.", vi: "NB thông báo rút mục tiêu và ưu tiên ngành." },
    calcNote: { fr: "Le NBPNP utilise des critères par volet plutôt qu'une seule grille publique.", vi: "NBPNP dùng tiêu chí theo luồng thay vì một lưới công khai." },
    jobNote: { fr: "Les volets employeur exigent une offre NB d'un employeur admissible.", vi: "Luồng employer cần job offer NB từ employer đủ điều kiện." },
    docNote: { fr: "Dossiers NB : conformité employeur et preuve de lien avec le N.-B.", vi: "Hồ sơ NB: tuân thủ employer và liên kết tỉnh." },
  },
  nl: {
    drawNote: { fr: "Le NLPNP invite des professions prioritaires et profils ciblés.", vi: "NLPNP mời nghề ưu tiên và hồ sơ mục tiêu." },
    calcNote: { fr: "T.-N.-L. privilégie critères de volet et soutien employeur.", vi: "NL ưu tiên tiêu chí luồng và hỗ trợ employer." },
    jobNote: { fr: "Volets employeur : offre NL; Priority Skills pour profils demandés.", vi: "Luồng employer cần offer NL; Priority Skills cho hồ sơ thiếu hụt." },
    docNote: { fr: "Préparez permis, enregistrement employeur et preuves d'établissement NL.", vi: "Chuẩn bị giấy phép, đăng ký employer và định cư NL." },
  },
  nt: {
    drawNote: { fr: "Les T.N.-O. orientent les nominations selon demande employeur.", vi: "NWT đề cử theo nhu cầu employer." },
    calcNote: { fr: "Le NTNP met l'accent sur employeur et plans de rétention.", vi: "NTNP nhấn employer và kế hoạch giữ chân." },
    jobNote: { fr: "Une offre d'emploi soutenue au NWT est centrale.", vi: "Job offer được hỗ trợ tại NWT là trọng tâm." },
    docNote: { fr: "Dossiers NTNP : formulaires employeur et établissement communautaire.", vi: "Hồ sơ NTNP: form employer và định cư cộng đồng." },
  },
  oinp: {
    drawNote: { fr: "L'Ontario publie des avis EOI avec plages de scores.", vi: "Ontario công bố EOI kèm khoảng điểm." },
    calcNote: { fr: "Les volets EOI OINP utilisent une grille de sélection de 76 points.", vi: "Luồng EOI OINP dùng lưới chọn 76 điểm." },
    jobNote: { fr: "Certains volets exigent une offre ontarienne; HCP invite depuis le bassin EE.", vi: "Một số luồng cần job Ontario; HCP mời từ pool EE." },
    docNote: { fr: "OINP exige annexes employeur, preuve d'emploi et diplômes.", vi: "OINP yêu cầu phụ lục employer, chứng minh việc làm và bằng cấp." },
  },
  pei: {
    drawNote: { fr: "PEI publie généralement des tirages mensuels avec scores EOI minimum.", vi: "PEI thường công bố rút hàng tháng kèm điểm EOI tối thiểu." },
    calcNote: { fr: "PEI classe les EOI sur une grille Labour Impact de 100 points.", vi: "PEI xếp EOI trên lưới Labour Impact 100 điểm." },
    jobNote: { fr: "Labour Impact exige en général une offre employeur PEI.", vi: "Labour Impact thường cần job offer employer PEI." },
    docNote: { fr: "PEI exige autorisation employeur et preuve d'emploi ou investissement.", vi: "PEI yêu cầu form employer và chứng minh việc làm/đầu tư." },
  },
  qc: {
    drawNote: { fr: "Le Québec publie des rondes d'invitation Arrima pour travailleurs qualifiés.", vi: "Quebec công bố vòng mời Arrima cho skilled worker." },
    calcNote: { fr: "La sélection québécoise valorise le français, l'éducation et l'expérience.", vi: "Quebec ưu tiên tiếng Pháp, học vấn và kinh nghiệm." },
    jobNote: { fr: "Une offre validée peut ajouter des points; invitations via Arrima.", vi: "VJO được xác nhận có thể cộng điểm; mời qua Arrima." },
    docNote: { fr: "Tests de français, diplômes et étapes CSQ avant la RP fédérale.", vi: "Test Pháp ngữ, bằng cấp và bước CSQ trước PR liên bang." },
  },
  ynp: {
    drawNote: { fr: "Le Yukon suit les besoins employeurs et priorités communautaires.", vi: "Yukon theo nhu cầu employer và ưu tiên cộng đồng." },
    calcNote: { fr: "Le YNP met l'accent sur employeur et rétention plutôt que grands tirages.", vi: "YNP nhấn employer và ở lại hơn rút điểm lớn." },
    jobNote: { fr: "Skilled Worker et Critical Impact exigent soutien employeur.", vi: "Skilled Worker và Critical Impact cần hỗ trợ employer." },
    docNote: { fr: "Dossiers YNP : attestations employeur et intention de demeurer.", vi: "Hồ sơ YNP: xác nhận employer và ý định ở Yukon." },
  },
  ns: {
    drawNote: { fr: "La N.-É. annonce des tirages EE ciblés par NOC ou secteur.", vi: "NS thông báo rút EE theo NOC hoặc ngành." },
    calcNote: { fr: "Le NSNP utilise des critères par volet; nombreuses invitations EE directes.", vi: "NSNP theo tiêu chí từng luồng; nhiều mời EE trực tiếp." },
    jobNote: { fr: "Certains volets exigent employeurs NS; d'autres invitent sans nouvelle offre.", vi: "Một số luồng cần employer NS; luồng khác mời không cần offer mới." },
    docNote: { fr: "Le NSNP peut exiger permis sectoriels et lien avec la N.-É.", vi: "NSNP có thể yêu cầu giấy phép ngành và liên kết NS." },
  },
  sk: {
    drawNote: { fr: "Le SINP tient des rondes EE et OID avec scores minimum publiés.", vi: "SINP rút EE và OID kèm điểm tối thiểu." },
    calcNote: { fr: "Les EOI TQI sont classés sur la grille de 110 points de la Saskatchewan.", vi: "EOI ISW xếp trên lưới 110 điểm Saskatchewan." },
    jobNote: { fr: "OID sans offre si NOC en demande; EE exige profil IRCC actif.", vi: "OID không cần offer nếu NOC in-demand; EE cần hồ sơ IRCC active." },
    docNote: { fr: "Le SINP peut exiger ECA, tests de langue, fonds et permis réglementés.", vi: "SINP có thể yêu cầu ECA, test ngôn ngữ, quỹ và giấy phép nghề." },
  },
};

function normalizeFaqNotes(cfg, id) {
  ["drawNote", "calcNote", "jobNote", "docNote"].forEach((key) => {
    const en = cfg[key];
    if (typeof en !== "string") return;
    const extra = PNP_FAQ_NOTES_I18N[id]?.[key] || {};
    cfg[key] = { en, fr: extra.fr || en, vi: extra.vi || en };
  });
}

const PNP_PROGRAM_FAQ = {};
Object.entries(PNP_FAQ_CONFIG).forEach(([id, cfg]) => {
  normalizeFaqNotes(cfg, id);
  PNP_PROGRAM_FAQ[id] = buildProgramFaq(cfg);
});

window.PNP_PROGRAM_FAQ = PNP_PROGRAM_FAQ;
window.pnpFaqText = pnpFaqText;
