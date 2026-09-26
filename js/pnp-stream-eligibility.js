/** Eligibility section copy per program (streams + bullets). */

const PNP_STREAM_INTROS = {
  aaip: {
    en: "Alberta selects workers through Expression of Interest pools and periodic draws. Each stream below has different job, residence, and employer rules—confirm which streams are accepting registrations today.",
    fr: "L'Alberta sélectionne via des bassins EOI et des tirages. Chaque volet a des règles distinctes.",
    vi: "Alberta chọn ứng viên qua EOI và rút thăm. Mỗi luồng có quy tắc việc làm và employer khác nhau.",
  },
  bc: {
    en: "Look West (2026) groups most skilled draws under CARE, INNOVATE, and BUILD. Your job offer’s sector and wage drive which pillar—and SIRS cut-off—applies (200-point registration).",
    fr: "Look West 2026 : tirages CARE, INNOVATE et BUILD selon secteur et salaire de l'offre (SIRS 200 points).",
    vi: "Look West 2026: rút thăm theo CARE, INNOVATE, BUILD tùy ngành và lương job offer (đăng ký SIRS 200 điểm).",
  },
  mpnp: {
    en: "Manitoba uses a 1,000-point EOI with risk deductions. In-province skilled workers need MB employment; overseas and IES routes use different connection or graduate rules.",
    fr: "EOI 1 000 points avec déductions. Travailleurs au MB : emploi local; autres volets : liens ou diplômes.",
    vi: "EOI 1.000 điểm có khấu trừ rủi ro. Skilled worker trong tỉnh cần việc MB; luồng khác theo liên kết hoặc graduate.",
  },
  nb: {
    en: "New Brunswick uses the INB portal with 100-point grids: 67 points for the Express Entry stream and 60 for employer-supported Skilled Workers. Francophone Strategic Initiative draws use a separate French-proficiency grid.",
    fr: "Le N.-B. utilise le portail INB : 67 points (Entrée express) et 60 (travailleur qualifié employeur).",
    vi: "NB dùng cổng INB: 67 điểm (Express Entry) và 60 (Skilled Worker employer); luồng Pháp ngữ có lưới riêng.",
  },
  nl: {
    en: "Newfoundland & Labrador uses the Immigration Accelerator portal with frequent EOI draws. Express Entry Skilled Worker needs 67/100 on the provincial grid; Skilled Worker and Priority Skills NL use employer or high-skill pathways.",
    fr: "T.-N.-L. utilise le portail Immigration Accelerator avec des tirages EOI fréquents; 67/100 pour Entrée express.",
    vi: "NL dùng cổng Immigration Accelerator, rút EOI thường xuyên; Express Entry Skilled Worker cần 67/100.",
  },
  pei: {
    en: "PEI runs monthly EOI draws (100-point grid). Labour Impact needs a PEI job offer; Express Entry stream needs an active federal profile. International graduates from UPEI, Holland College, or Collège de l’Île are prioritized in 2026 rounds.",
    fr: "PEI : tirages mensuels EOI (100 points); diplômés PEI priorisés.",
    vi: "PEI rút EOI hàng tháng (100 điểm); ưu tiên graduate PEI.",
  },
  qc: {
    en: "Arrima ranks 2026 PSTQ profiles on a 1,320-point grid across four numbered streams (TEER profile, regulated jobs, or exceptional talent). Oral French NCLC 7+ and validated offers outside Montreal weigh heavily.",
    fr: "Arrima : PSTQ 2026, grille 1 320 points, 4 volets numérotés; français oral NCLC 7+ et VJO hors Montréal.",
    vi: "Arrima xếp hạng PSTQ 2026 trên lưới 1.320 điểm, 4 luồng đánh số; NCLC 7+ nói và VJO ngoài Montreal rất quan trọng.",
  },
  oinp: {
    en: "Ontario’s Foreign Worker stream uses a 130-point Expression of Interest grid (region, TEER, wage, experience, education, language). Other streams may use CRS or separate criteria—register only under the stream that matches your job offer.",
    fr: "L'Ontario utilise une grille EOI de 130 points pour le volet travailleur étranger; d'autres volets utilisent le CRS.",
    vi: "Luồng Foreign Worker của Ontario dùng lưới EOI 130 điểm; các luồng khác có thể dùng CRS hoặc tiêu chí riêng.",
  },
  nt: {
    en: "All worker routes are employer-driven (EOI up to 845 points). Draws follow territorial allocation—language, NWT work history, and job offer quality matter most.",
    fr: "Volets employeur (EOI jusqu'à 845 pts); tirages selon quota; langue et lien T.N.-O. essentiels.",
    vi: "Mọi luồng worker do employer dẫn (EOI tới 845 điểm); rút theo chỉ tiêu; ngôn ngữ và liên kết NWT quan trọng.",
  },
  ynp: {
    en: "Yukon worker nominations are employer-led with quota-limited EOI intakes. Skilled Worker and Critical Impact streams rely on employer support letters; the Business Nominee program uses a separate points grid.",
    fr: "Le Yukon est piloté par l'employeur avec des EOI par quota; le volet affaires a sa propre grille.",
    vi: "Yukon do employer dẫn dắt với EOI theo quota; Business Nominee có lưới điểm riêng.",
  },
  ns: {
    en: "NSOI uses different gates: in-province experience, employer job offers, health-authority physician nominations, or invitation-only Express Entry letters when a sector is in shortage. Pick the stream that matches how you are connected to Nova Scotia.",
    fr: "La N.-É. : expérience locale, employeur, santé ou lettres EE sur invitation — choisissez le volet qui correspond à votre profil.",
    vi: "NSOI có các cửa khác nhau: kinh nghiệm trong tỉnh, employer, y tế, hoặc thư mời EE — chọn luồng khớp liên kết của bạn.",
  },
  sk: {
    en: "Below: all major worker categories. The on-page calculator scores only the ISW 110-point grid (used for Express Entry and Occupations In-Demand). Experience and Hard-to-Fill use different criteria.",
    fr: "Ci-dessous : principales catégories travailleur. Le calculateur = grille TQI 110 pts (EE et OID). Expérience SK et pilote : critères distincts.",
    vi: "Dưới đây: các luồng worker chính. Máy tính chỉ chấm lưới ISW 110 điểm (EE & OID). Experience và Hard-to-Fill có tiêu chí khác.",
  },
};

function pnpStreamBlurb(en, fr, vi) {
  return { en, fr, vi };
}

const PNP_STREAM_BLURBS = {
  aaip: [
    pnpStreamBlurb(
      "Temporary workers in Alberta with eligible employers; EOI ranking and draw cut-offs apply.",
      "Travailleurs temporaires en Alberta avec employeurs admissibles; classement EOI et seuils de tirage.",
      "Lao động tạm thời tại Alberta với employer đủ điều kiện; xếp hạng EOI và ngưỡng rút thăm."
    ),
    pnpStreamBlurb(
      "Tech employers in eligible sectors; faster pathway when criteria met.",
      "Employeurs tech dans secteurs admissibles; voie accélérée si critères remplis.",
      "Employer công nghệ trong ngành đủ điều kiện; lộ trình nhanh hơn khi đạt tiêu chí."
    ),
    pnpStreamBlurb(
      "Community-driven rural projects with employer and settlement requirements.",
      "Projets ruraux communautaires avec exigences employeur et établissement.",
      "Dự án nông thôn cộng đồng với yêu cầu employer và định cư."
    ),
    pnpStreamBlurb(
      "Seasonal sector stream when announced; check AAIP news for openings.",
      "Volet sectoriel saisonnier annoncé; suivez les nouvelles AAIP.",
      "Luồng ngành theo mùa khi được công bố; theo dõi tin AAIP."
    ),
  ],
  bc: [
    pnpStreamBlurb(
      "Skilled job offer in BC; SIRS registration and weekly tech/general draws.",
      "Offre d'emploi qualifiée en C.-B.; inscription SIRS et tirages tech/généraux.",
      "Job offer skilled tại BC; đăng ký SIRS và rút tech/tổng hàng tuần."
    ),
    pnpStreamBlurb(
      "Healthcare roles with BC employment and category-specific criteria.",
      "Santé avec emploi en C.-B. et critères par catégorie.",
      "Y tế với việc làm BC và tiêu chí theo category."
    ),
    pnpStreamBlurb(
      "Recent eligible credentials from BC post-secondary institutions.",
      "Diplômes récents admissibles d'établissements postsecondaires de C.-B.",
      "Bằng cấp gần đây từ cơ sở sau trung học BC đủ điều kiện."
    ),
    pnpStreamBlurb(
      "Specific regions/NOCs for semi-skilled pathways—limited categories.",
      "Régions/NOC précis pour voies semi-qualifiées — catégories limitées.",
      "Vùng/NOC cụ thể cho luồng bán skilled — danh mục hạn chế."
    ),
  ],
  mpnp: [
    pnpStreamBlurb(
      "Must usually work for a Manitoba employer in an eligible skilled occupation.",
      "Travail habituel pour un employeur du Manitoba dans un métier qualifié admissible.",
      "Thường phải làm cho employer Manitoba trong nghề skilled đủ điều kiện."
    ),
    pnpStreamBlurb(
      "Connection to Manitoba through family, previous study/work, or invitation.",
      "Lien avec le Manitoba : famille, études/travail antérieurs ou invitation.",
      "Liên kết Manitoba qua gia đình, học/làm trước đây hoặc lời mời."
    ),
    pnpStreamBlurb(
      "Graduates from Manitoba institutions meeting stream rules.",
      "Diplômés d'établissements manitobains respectant les règles du volet.",
      "Sinh viên tốt nghiệp cơ sở Manitoba đáp ứng quy tắc luồng."
    ),
    pnpStreamBlurb(
      "For experienced business owners/investors—separate criteria and net worth tests.",
      "Propriétaires/investisseurs expérimentés — critères et valeur nette distincts.",
      "Chủ doanh nghiệp/nhà đầu tư — tiêu chí và kiểm tra tài sản riêng."
    ),
  ],
  nb: [
    pnpStreamBlurb(
      "Active Express Entry profile plus NB connection or targeted sector fit.",
      "Profil Entrée express actif plus lien N.-B. ou secteur ciblé.",
      "Hồ sơ Express Entry active và liên kết NB hoặc ngành mục tiêu."
    ),
    pnpStreamBlurb(
      "Full-time permanent job offer from a NB employer willing to support nomination.",
      "Offre permanente à temps plein d'un employeur N.-B. prêt à soutenir la nomination.",
      "Job offer permanent toàn thời gian từ employer NB hỗ trợ đề cử."
    ),
    pnpStreamBlurb(
      "Occupations aligned with NB labour market priorities when draws are announced.",
      "Professions alignées sur les priorités du marché du travail N.-B. lors des tirages.",
      "Nghề khớp ưu tiên thị trường lao động NB khi có rút thăm."
    ),
  ],
  nl: [
    pnpStreamBlurb(
      "High-demand skills and education profiles without employer for some rounds.",
      "Compétences et diplômes très demandés sans employeur pour certains tirages.",
      "Kỹ năng/học vấn thiếu hụt — một số đợt không cần employer."
    ),
    pnpStreamBlurb(
      "NL employer job offer and provincial support package.",
      "Offre d'emploi NL et dossier de soutien provincial.",
      "Job offer employer NL và gói hỗ trợ tỉnh."
    ),
    pnpStreamBlurb(
      "Recent graduation from eligible NL institutions with job offer where required.",
      "Diplôme récent d'établissements NL admissibles avec offre si exigée.",
      "Tốt nghiệp gần đây từ cơ sở NL đủ điều kiện; job offer nếu yêu cầu."
    ),
  ],
  nt: [
    pnpStreamBlurb(
      "Employer in NWT supports nomination for skilled NOC positions.",
      "Employeur des T.N.-O. soutient la nomination pour NOC qualifiés.",
      "Employer NWT hỗ trợ đề cử cho NOC skilled."
    ),
    pnpStreamBlurb(
      "French language and Francophone community ties may be required.",
      "Français et liens avec une communauté francophone peuvent être requis.",
      "Có thể yêu cầu tiếng Pháp và liên kết cộng đồng Pháp ngữ."
    ),
    pnpStreamBlurb(
      "For entrepreneurs purchasing or establishing businesses in NWT.",
      "Entrepreneurs achetant ou créant une entreprise dans les T.N.-O.",
      "Doanh nhân mua hoặc thành lập doanh nghiệp tại NWT."
    ),
  ],
  oinp: [
    pnpStreamBlurb(
      "Job offer in skilled NOC with employer compliance and wage thresholds.",
      "Offre dans NOC qualifié, conformité employeur et seuils salariaux.",
      "Job offer NOC skilled, employer tuân thủ và ngưỡng lương."
    ),
    pnpStreamBlurb(
      "Invitation to apply from OINP while in the Express Entry pool.",
      "Invitation OINP depuis le bassin Entrée express.",
      "Lời mời OINP khi đang trong pool Express Entry."
    ),
    pnpStreamBlurb(
      "Work experience in eligible skilled trades in Ontario.",
      "Expérience en métiers qualifiés admissibles en Ontario.",
      "Kinh nghiệm nghề skilled đủ điều kiện tại Ontario."
    ),
    pnpStreamBlurb(
      "Recent masters or PhD from eligible Ontario universities (when open).",
      "Maîtrise/doctorat récents d'universités ontariennes admissibles (si ouvert).",
      "Thạc sĩ/tiến sĩ gần đây từ trường Ontario đủ điều kiện (khi mở)."
    ),
  ],
  pei: [
    pnpStreamBlurb(
      "PEI employer job offer and labour market need demonstration.",
      "Offre employeur PEI et démonstration de besoin du marché du travail.",
      "Job offer employer PEI và chứng minh nhu cầu thị trường lao động."
    ),
    pnpStreamBlurb(
      "Active Express Entry profile with PEI EOI registration.",
      "Profil Entrée express actif avec inscription EOI PEI.",
      "Hồ sơ Express Entry active và đăng ký EOI PEI."
    ),
    pnpStreamBlurb(
      "Investment and business operation criteria for entrepreneurs.",
      "Critères d'investissement et d'exploitation pour entrepreneurs.",
      "Tiêu chí đầu tư và vận hành kinh doanh cho entrepreneur."
    ),
  ],
  qc: [
    pnpStreamBlurb(
      "Arrima ranking for skilled workers; French and education heavily weighted.",
      "Classement Arrima travailleurs qualifiés; français et études très pondérés.",
      "Xếp hạng Arrima cho skilled worker; tiếng Pháp và học vấn trọng số cao."
    ),
    pnpStreamBlurb(
      "Quebec graduates and workers with advanced intermediate French.",
      "Diplômés québécois et travailleurs avec français intermédiaire avancé.",
      "Sinh viên tốt nghiệp Quebec và lao động có tiếng Pháp trung cấp cao."
    ),
    pnpStreamBlurb(
      "Time-limited pilots for specific sectors—verify current status.",
      "Pilotes limités dans le temps — vérifiez le statut actuel.",
      "Pilot theo thời hạn cho ngành cụ thể — xác nhận trạng thái hiện tại."
    ),
  ],
  ynp: [
    pnpStreamBlurb(
      "Skilled occupation with Yukon employer support letter.",
      "Métier qualifié avec lettre de soutien d'un employeur du Yukon.",
      "Nghề skilled với thư hỗ trợ employer Yukon."
    ),
    pnpStreamBlurb(
      "Semi-skilled roles in designated sectors with employer sponsorship.",
      "Emplois semi-qualifiés dans secteurs désignés avec parrainage employeur.",
      "Vai trò bán skilled trong ngành chỉ định với employer sponsor."
    ),
    pnpStreamBlurb(
      "Business ownership or investment meeting YNP business criteria.",
      "Propriété ou investissement répondant aux critères affaires YNP.",
      "Sở hữu/đầu tư đáp ứng tiêu chí business YNP."
    ),
  ],
  ns: [
    pnpStreamBlurb(
      "Paid skilled work in Nova Scotia with an active federal Express Entry profile.",
      "Travail qualifié rémunéré en N.-É. avec profil Entrée express actif.",
      "Làm skilled có lương tại Nova Scotia với hồ sơ Express Entry active."
    ),
    pnpStreamBlurb(
      "Invitation-only: NSOI letter of interest in your EE account for a named sector/NOC.",
      "Sur invitation : lettre d'intérêt NSOI dans votre compte EE pour secteur/NOC.",
      "Chỉ mời: thư quan tâm NSOI trong tài khoản EE cho sector/NOC."
    ),
    pnpStreamBlurb(
      "Licensed doctors with NS health authority job offer and return-of-service commitment.",
      "Médecins autorisés avec offre autorité santé N.-É. et engagement de service.",
      "Bác sĩ có giấy phép với job offer y tế NS và cam kết phục vụ."
    ),
    pnpStreamBlurb(
      "Permanent NS employer job offer with recruitment and settlement documentation.",
      "Offre permanente employeur N.-É. avec dossiers recrutement et établissement.",
      "Job offer permanent employer NS kèm hồ sơ tuyển dụng và định cư."
    ),
  ],
  sk: [
    pnpStreamBlurb(
      "Express Entry profile required; SINP 110-point grid and OID/EE draws.",
      "Profil Entrée express requis; grille 110 points TQI et tirages OID/EE.",
      "Cần hồ sơ Express Entry; lưới 110 điểm SINP và rút OID/EE."
    ),
    pnpStreamBlurb(
      "No job offer if NOC on in-demand list and experience criteria met.",
      "Sans offre si NOC sur liste en demande et expérience suffisante.",
      "Không cần job offer nếu NOC trong danh sách in-demand và đủ kinh nghiệm."
    ),
    pnpStreamBlurb(
      "Employer-driven pilot for hard-to-fill roles in participating communities.",
      "Pilote employeur pour postes difficiles à combler dans communautés participantes.",
      "Pilot employer cho vị trí khó tuyển tại cộng đồng tham gia."
    ),
  ],
};

function getStreamEligibility(program) {
  const id = program.id;
  const profile = program.profile || {};
  const intro = PNP_STREAM_INTROS[id] || { en: "", fr: "", vi: "" };
  const blurbs = PNP_STREAM_BLURBS[id] || [];
  const detailRows = window.PNP_STREAM_ITEM_DETAILS?.[id] || [];
  const streams = profile.streams || [];
  const items = streams.map((name, index) => {
    const detail = detailRows[index];
    if (detail) {
      return {
        name,
        desc: detail.desc,
        bullets: detail.bullets || [],
        calcDisclaimer: detail.calcDisclaimer || null,
      };
    }
    const fallback = {
      en: "See the official program guide for occupation, language, and job-offer rules.",
      fr: "Consultez le guide officiel pour NOC, langue et offre d'emploi.",
      vi: "Xem hướng dẫn chính thức về NOC, ngôn ngữ và job offer.",
    };
    const blurb = blurbs[index];
    const desc =
      blurb && typeof blurb === "object" && blurb.en
        ? blurb
        : {
            en: typeof blurb === "string" ? blurb : fallback.en,
            fr: typeof blurb === "string" ? blurb : fallback.fr,
            vi: typeof blurb === "string" ? blurb : fallback.vi,
          };
    return {
      name,
      desc,
      bullets: [],
    };
  });
  return { intro, items };
}

window.getPnpStreamEligibility = getStreamEligibility;
