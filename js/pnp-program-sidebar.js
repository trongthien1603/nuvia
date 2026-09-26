/** Per-program disclaimer and sidebar guidance (Liberty-style). */

function pnpSidebarText(block, lang) {
  const l = lang || (window.NuviaI18n?.getLang?.() || "en");
  if (!block) return "";
  if (block[l]) return block[l];
  if (block.en && l !== "en") {
    const mapped = window.PNP_SIDEBAR_GUIDANCE?.[block.en]?.[l];
    if (mapped) return mapped;
    if (window.pnpTranslateGuidanceText) return window.pnpTranslateGuidanceText(block.en, l);
  }
  return block.en || "";
}

function pnpSidebarList(items, lang, { steps = false } = {}) {
  if (steps) {
    return (items || [])
      .map(
        (item, index) =>
          `<li class="pnp-guidance-step"><span class="pnp-guidance-step-marker" aria-hidden="true">${index + 1}</span><span class="pnp-guidance-step-body">${pnpSidebarText(item, lang)}</span></li>`
      )
      .join("");
  }
  return (items || []).map((item) => `<li>${pnpSidebarText(item, lang)}</li>`).join("");
}

/** Trilingual guidance line (en / fr / vi). */
function pnpG(en, fr, vi) {
  return { en, fr, vi };
}

const PNP_PROGRAM_SIDEBAR = {
  aaip: {
    disclaimer: {
      en: "Alberta EOI scores on this page are a simplified planning estimate only. AAIP may change stream criteria, occupation lists, and draw thresholds without notice. A nomination does not guarantee permanent residence approval by IRCC.",
      fr: "Les scores EOI affichés sont une estimation simplifiée seulement. L'AAIP peut modifier critères et seuils sans préavis.",
      vi: "Điểm EOI trên trang này chỉ là ước tính đơn giản. AAIP có thể thay đổi tiêu chí và ngưỡng rút thăm mà không báo trước.",
    },
    increase: [
      pnpG(
        "Improve CLB/NCLC scores in English or French and keep tests valid for AAIP and IRCC stages.",
        "Améliorez les scores CLB/NCLC en anglais ou en français et gardez des tests valides pour l'AAIP et l'IRCC.",
        "Nâng điểm CLB/NCLC tiếng Anh hoặc Pháp và giữ kết quả thi còn hiệu lực cho AAIP và IRCC."
      ),
      pnpG(
        "Gain skilled Alberta work experience or a compliant job offer in an eligible occupation.",
        "Acquérez de l'expérience qualifiée en Alberta ou une offre d'emploi conforme dans un métier admissible.",
        "Có kinh nghiệm làm việc skilled tại Alberta hoặc job offer hợp lệ trong nghề đủ điều kiện."
      ),
      pnpG(
        "Complete post-secondary credentials related to your NOC and obtain licensing if regulated.",
        "Obtenez des études postsecondaires liées à votre CNP et la licence requise si le métier est réglementé.",
        "Hoàn thành bằng sau phổ thông liên quan NOC và xin giấy phép hành nghề nếu nghề được quản lý."
      ),
      pnpG(
        "Monitor AAIP news for Accelerated Tech or Rural streams that match your profile.",
        "Suivez les nouvelles AAIP pour les volets Tech accéléré ou Rural qui correspondent à votre profil.",
        "Theo dõi tin AAIP về luồng Accelerated Tech hoặc Rural phù hợp hồ sơ của bạn."
      ),
    ],
    afterInvite: [
      pnpG(
        "Submit the AAIP application within the deadline stated in your notification letter.",
        "Soumettez la demande AAIP avant la date limite indiquée dans votre lettre de notification.",
        "Nộp hồ sơ AAIP trong thời hạn ghi trong thư mời."
      ),
      pnpG(
        "Upload employer documents, licensing, and proof of Alberta employment if required.",
        "Téléversez les documents employeur, licences et preuves d'emploi en Alberta si exigé.",
        "Tải lên giấy tờ employer, giấy phép nghề và chứng minh việc làm tại Alberta nếu được yêu cầu."
      ),
      pnpG(
        "If enhanced, accept the nomination in Express Entry and wait for IRCC to issue an ITA.",
        "Si volet amélioré, acceptez la nomination dans Entrée express et attendez l'invitation de l'IRCC.",
        "Nếu luồng enhanced, chấp nhận đề cử trong Express Entry và chờ IRCC rút thăm ITA."
      ),
      pnpG(
        "Book a consultation if you need help coordinating provincial and federal PR steps.",
        "Prenez rendez-vous si vous avez besoin d'aide pour coordonner les étapes provinciales et fédérales.",
        "Đặt tư vấn nếu cần hỗ trợ phối hợp các bước đề cử tỉnh và PR liên bang."
      ),
    ],
  },
  bc: {
    disclaimer: {
      en: "SIRS scores here approximate BC Skills Immigration factors out of 200. BC PNP uses category-specific registrations and may exclude ineligible NOCs or wages. Registration does not equal nomination.",
      fr: "Le score SIRS est une approximation sur 200 points. L'inscription ne garantit pas une nomination.",
      vi: "Điểm SIRS ở đây ước tính trên 200 điểm. Đăng ký không đồng nghĩa với đề cử.",
    },
    increase: [
      pnpG(
        "Target jobs outside Metro Vancouver when regional points apply to your category.",
        "Visez des emplois hors Metro Vancouver lorsque des points régionaux s'appliquent à votre catégorie.",
        "Chọn việc ngoài Metro Vancouver khi điểm vùng áp dụng cho diện của bạn."
      ),
      pnpG(
        "Secure a skilled BC job offer at or above the wage threshold for your region and NOC.",
        "Obtenez une offre qualifiée en C.-B. au salaire minimum requis pour votre région et CNP.",
        "Có job offer skilled tại BC đạt mức lương tối thiểu theo vùng và NOC."
      ),
      pnpG(
        "Maximize language points with CLB 7+ (or higher for some healthcare categories).",
        "Maximisez les points de langue avec CLB 7+ (ou plus pour certaines catégories santé).",
        "Tối đa điểm ngôn ngữ với CLB 7+ (hoặc cao hơn với một số diện y tế)."
      ),
      pnpG(
        "Gain additional skilled experience directly related to the BC job offer.",
        "Accumulez de l'expérience qualifiée directement liée à l'offre d'emploi en C.-B.",
        "Thêm kinh nghiệm skilled trực tiếp liên quan job offer tại BC."
      ),
    ],
    afterInvite: [
      pnpG(
        "Apply to BC PNP within 30 days of invitation (confirm current deadline on WelcomeBC).",
        "Postulez au BC PNP dans les 30 jours suivant l'invitation (vérifiez la date sur WelcomeBC).",
        "Nộp BC PNP trong 30 ngày sau lời mời (xác nhận hạn trên WelcomeBC)."
      ),
      pnpG(
        "Provide employer forms, job details, and proof you meet category requirements.",
        "Fournissez les formulaires employeur, détails du poste et preuves d'admissibilité à la catégorie.",
        "Cung cấp form employer, chi tiết công việc và chứng minh đủ điều kiện diện."
      ),
      pnpG(
        "After provincial approval, complete the federal PR stage if applicable to your stream.",
        "Après approbation provinciale, complétez l'étape fédérale de RP si applicable à votre volet.",
        "Sau khi tỉnh duyệt, hoàn tất giai đoạn PR liên bang nếu luồng của bạn yêu cầu."
      ),
      pnpG(
        "Keep your IRCC profile updated if you are EE-linked.",
        "Maintenez votre profil IRCC à jour si vous êtes lié à Entrée express.",
        "Cập nhật hồ sơ IRCC nếu bạn liên kết Express Entry."
      ),
    ],
  },
  mpnp: {
    disclaimer: {
      en: "MPNP uses a 1,000-point EOI grid with deductions for risk factors (e.g., other provincial applications). This calculator includes sample penalties only—official ranking may differ. An LAA is not a nomination.",
      fr: "Le MPNP utilise une grille de 1 000 points avec déductions. Cette page inclut des pénalités d'exemple seulement.",
      vi: "MPNP dùng lưới 1.000 điểm có khấu trừ rủi ro. Máy tính này chỉ mô phỏng phần phạt — thứ hạng chính thức có thể khác.",
    },
    increase: [
      pnpG(
        "Raise CLB scores—language is heavily weighted on the MPNP grid.",
        "Augmentez les CLB — la langue compte beaucoup dans la grille MPNP.",
        "Nâng CLB — ngôn ngữ chiếm trọng số lớn trên lưới MPNP."
      ),
      pnpG(
        "Build Manitoba skilled work experience or a strong connection (study, family, invitation).",
        "Développez une expérience qualifiée au Manitoba ou un lien fort (études, famille, invitation).",
        "Xây kinh nghiệm skilled tại Manitoba hoặc liên kết mạnh (du học, gia đình, lời mời)."
      ),
      pnpG(
        "Avoid parallel active applications to other provinces that trigger risk deductions.",
        "Évitez les demandes actives parallèles dans d'autres provinces qui entraînent des déductions.",
        "Tránh nộp song song tích cực ở tỉnh khác để không bị trừ điểm rủi ro."
      ),
      pnpG(
        "Ensure your NOC and employment history align with Manitoba in-demand lists.",
        "Assurez-vous que votre CNP et historique d'emploi correspondent aux listes en demande au Manitoba.",
        "Đảm bảo NOC và lịch sử việc làm khớp danh sách nghề thiếu hụt Manitoba."
      ),
    ],
    afterInvite: [
      pnpG(
        "Submit the complete MPNP application before the LAA expiry date.",
        "Soumettez la demande MPNP complète avant l'expiration de la LAA.",
        "Nộp hồ sơ MPNP đầy đủ trước khi LAA hết hạn."
      ),
      pnpG(
        "Provide employer support letters, settlement plan, and funds if requested.",
        "Fournissez lettres employeur, plan d'établissement et preuves de fonds si demandé.",
        "Cung cấp thư hỗ trợ employer, kế hoạch định cư và chứng minh tài chính nếu được yêu cầu."
      ),
      pnpG(
        "For Skilled Workers in Manitoba, maintain eligible employment during processing.",
        "Pour Travailleurs qualifiés au Manitoba, conservez un emploi admissible pendant le traitement.",
        "Với Skilled Workers in Manitoba, duy trì việc làm đủ điều kiện trong khi xử lý."
      ),
      pnpG(
        "After nomination, follow IRCC instructions for enhanced or base PR pathways.",
        "Après nomination, suivez les instructions IRCC pour les voies RP améliorées ou de base.",
        "Sau đề cử, làm theo hướng dẫn IRCC cho luồng enhanced hoặc base PR."
      ),
    ],
  },
  nb: {
    disclaimer: {
      en: "NBPNP criteria vary by stream and targeted sector announcements. This estimate does not replace NB’s eligibility review or job-offer validation.",
      fr: "Les critères NBPNP varient selon le volet. Cette estimation ne remplace pas l'examen officiel.",
      vi: "Tiêu chí NBPNP thay đổi theo luồng. Ước tính này không thay thế đánh giá chính thức.",
    },
    increase: [
      pnpG(
        "Strengthen ties to New Brunswick through job offers, prior study, or community connections.",
        "Renforcez vos liens avec le Nouveau-Brunswick via emploi, études antérieures ou liens communautaires.",
        "Củng cố liên kết với New Brunswick qua job offer, du học trước đó hoặc cộng đồng."
      ),
      pnpG(
        "Improve language scores to CLB 7+ for competitive Express Entry-linked draws.",
        "Améliorez la langue à CLB 7+ pour les tirages compétitifs liés à Entrée express.",
        "Nâng ngôn ngữ lên CLB 7+ cho các đợt rút liên kết Express Entry cạnh tranh."
      ),
      pnpG(
        "Target occupations featured in NB targeted-sector announcements.",
        "Visez les professions des secteurs ciblés annoncés par le NB.",
        "Nhắm nghề trong các thông báo sector mục tiêu của NB."
      ),
    ],
    afterInvite: [
      pnpG(
        "File the NBPNP application with all employer and identity documents promptly.",
        "Déposez la demande NBPNP avec tous les documents employeur et d'identité sans tarder.",
        "Nộp NBPNP kèm đủ giấy tờ employer và nhân thân kịp thời."
      ),
      pnpG(
        "If Express Entry-linked, update your EE profile once nominated.",
        "Si lié à Entrée express, mettez à jour votre profil EE après nomination.",
        "Nếu liên kết Express Entry, cập nhật hồ sơ EE sau khi được đề cử."
      ),
      pnpG(
        "Respond quickly to NB provincial requests for additional evidence.",
        "Répondez rapidement aux demandes de preuves supplémentaires du NB.",
        "Phản hồi nhanh yêu cầu bổ sung chứng cứ từ tỉnh NB."
      ),
    ],
  },
  nl: {
    disclaimer: {
      en: "NLPNP often uses employer-led and occupation-targeted selection rather than public score cut-offs. This tool is indicative only.",
      fr: "Le NLPNP privilégie souvent les volets employeur et métiers ciblés.",
      vi: "NLPNP thường chọn theo employer và nghề mục tiêu thay vì công bố điểm cắt.",
    },
    increase: [
      pnpG(
        "Secure a skilled NL job offer from a willing, eligible employer.",
        "Obtenez une offre qualifiée à T.-N.-L. d'un employeur admissible et volontaire.",
        "Có job offer skilled tại NL từ employer đủ điều kiện và sẵn sàng hỗ trợ."
      ),
      pnpG(
        "Check Priority Skills NL lists for high-demand profiles.",
        "Consultez les listes Priority Skills NL pour les profils en forte demande.",
        "Xem danh sách Priority Skills NL cho hồ sơ nghề hot."
      ),
      pnpG(
        "Improve English/French scores to meet stream minimums.",
        "Améliorez l'anglais/le français pour atteindre les minimums du volet.",
        "Nâng điểm Anh/Pháp đạt mức tối thiểu của luồng."
      ),
    ],
    afterInvite: [
      pnpG(
        "Complete NLPNP forms and employer nomination packages on time.",
        "Complétez les formulaires NLPNP et dossiers employeur dans les délais.",
        "Hoàn thành form NLPNP và bộ hồ sơ employer đúng hạn."
      ),
      pnpG(
        "Provide licensing for regulated occupations in Newfoundland & Labrador.",
        "Fournissez les licences pour les métiers réglementés à T.-N.-L.",
        "Cung cấp giấy phép nghề được quản lý tại Newfoundland & Labrador."
      ),
      pnpG(
        "Prepare for federal PR processing after provincial nomination.",
        "Préparez le traitement fédéral de RP après la nomination provinciale.",
        "Chuẩn bị giai đoạn PR liên bang sau đề cử tỉnh."
      ),
    ],
  },
  nt: {
    disclaimer: {
      en: "NTNP is employer-driven with small annual allocations. Job offer genuineness and community retention plans are critical.",
      fr: "Le NTNP est axé sur l'employeur avec de petits quotas annuels.",
      vi: "NTNP theo employer với chỉ tiêu nhỏ hàng năm.",
    },
    increase: [
      pnpG(
        "Obtain a supported job offer from an NT employer in an eligible NOC.",
        "Obtenez une offre appuyée d'un employeur des T.N.-O. dans un CNP admissible.",
        "Có job offer được employer NT hỗ trợ trong NOC đủ điều kiện."
      ),
      pnpG(
        "Demonstrate language ability and settlement intent in the Northwest Territories.",
        "Démontrez la langue et l'intention de vous établir dans les Territoires du Nord-Ouest.",
        "Chứng minh năng lực ngôn ngữ và ý định định cư tại Northwest Territories."
      ),
      pnpG(
        "Work with employers familiar with NTNP compliance requirements.",
        "Collaborez avec des employeurs connaissant les exigences de conformité NTNP.",
        "Làm việc với employer am hiểu yêu cầu tuân thủ NTNP."
      ),
    ],
    afterInvite: [
      pnpG(
        "Submit employer-driven nomination forms before deadlines.",
        "Soumettez les formulaires de nomination employeur avant les échéances.",
        "Nộp form đề cử theo employer trước deadline."
      ),
      pnpG(
        "Maintain employment terms stated in the offer during assessment.",
        "Maintenez les conditions d'emploi de l'offre pendant l'évaluation.",
        "Duy trì điều kiện việc làm như trong offer trong khi đánh giá."
      ),
      pnpG(
        "Complete medical, police, and federal admissibility steps after nomination.",
        "Complétez examens médicaux, casier et admissibilité fédérale après nomination.",
        "Hoàn tất khám sức khỏe, lý lịch và admissibility liên bang sau đề cử."
      ),
    ],
  },
  oinp: {
    disclaimer: {
      en: "OINP EOI scores max at 76 for many streams; draws are stream-specific. Ontario may pause registrations without notice. This is not an OINP registration.",
      fr: "Les scores EOI OINP (max. 76) varient selon le volet. Ceci n'est pas une inscription OINP.",
      vi: "Điểm EOI OINP (tối đa 76) theo từng luồng. Đây không phải đăng ký OINP.",
    },
    increase: [
      pnpG(
        "Increase job-offer and wage points with above-median Ontario earnings where eligible.",
        "Augmentez les points d'offre et salaire avec des revenus au-dessus de la médiane ontarienne si admissible.",
        "Tăng điểm job offer và lương với mức thu nhập trên trung vị Ontario nếu đủ điều kiện."
      ),
      pnpG(
        "Gain Ontario skilled work experience in the same NOC as your offer.",
        "Acquérez de l'expérience qualifiée en Ontario dans le même CNP que votre offre.",
        "Có kinh nghiệm skilled tại Ontario cùng NOC với job offer."
      ),
      pnpG(
        "Target northern or outside-GTA roles when regional points apply.",
        "Visez le nord ou hors RGT lorsque des points régionaux s'appliquent.",
        "Chọn việc vùng Bắc hoặc ngoài GTA khi có điểm vùng."
      ),
      pnpG(
        "Keep CLB 7+ for competitive Human Capital and Skilled Trades draws.",
        "Maintenez CLB 7+ pour les tirages Capital humain et Métiers qualifiés.",
        "Giữ CLB 7+ cho các đợt rút Human Capital và Skilled Trades."
      ),
    ],
    afterInvite: [
      pnpG(
        "Apply to OINP within the invitation window stated in your notification.",
        "Postulez à l'OINP dans le délai indiqué dans votre notification.",
        "Nộp OINP trong thời hạn ghi trong thư mời."
      ),
      pnpG(
        "Upload employer documents and proof of legal status in Canada if required.",
        "Téléversez documents employeur et preuve de statut légal au Canada si exigé.",
        "Tải giấy tờ employer và chứng minh tư cách hợp pháp tại Canada nếu cần."
      ),
      pnpG(
        "For EE-linked streams, accept the nomination in IRCC’s system after approval.",
        "Pour volets liés EE, acceptez la nomination dans le système IRCC après approbation.",
        "Với luồng liên kết EE, chấp nhận đề cử trên hệ thống IRCC sau khi duyệt."
      ),
    ],
  },
  pei: {
    disclaimer: {
      en: "PEI uses a 100-point EOI for Labour Impact categories. Monthly draws can shift quickly—verify scores on the official PEI portal.",
      fr: "PEI utilise un EOI de 100 points. Vérifiez les tirages mensuels sur le portail officiel.",
      vi: "PEI dùng EOI 100 điểm. Xác nhận rút thăm hàng tháng trên cổng chính thức.",
    },
    increase: [
      pnpG(
        "Obtain a PEI job offer from an eligible employer in a supported sector.",
        "Obtenez une offre à l'Î.-P.-É. d'un employeur admissible dans un secteur soutenu.",
        "Có job offer tại PEI từ employer đủ điều kiện trong sector được hỗ trợ."
      ),
      pnpG(
        "Improve language scores and gain PEI work experience where possible.",
        "Améliorez la langue et l'expérience de travail à l'Î.-P.-É. si possible.",
        "Nâng điểm ngôn ngữ và kinh nghiệm làm việc tại PEI nếu có thể."
      ),
      pnpG(
        "Align age and education factors with PEI’s published EOI grid.",
        "Alignez âge et scolarité sur la grille EOI publiée par l'Î.-P.-É.",
        "Căn tuổi và học vấn theo lưới EOI PEI công bố."
      ),
    ],
    afterInvite: [
      pnpG(
        "Submit the PEI PNP application before the invitation expires.",
        "Soumettez la demande PEI PNP avant expiration de l'invitation.",
        "Nộp PEI PNP trước khi lời mời hết hạn."
      ),
      pnpG(
        "Provide employer authorization and settlement information.",
        "Fournissez l'autorisation employeur et les renseignements d'établissement.",
        "Cung cấp ủy quyền employer và thông tin định cư."
      ),
      pnpG(
        "Update Express Entry if you applied under the PEI EE category.",
        "Mettez à jour Entrée express si vous avez postulé sous la catégorie EE de l'Î.-P.-É.",
        "Cập nhật Express Entry nếu bạn nộp diện EE của PEI."
      ),
    ],
  },
  qc: {
    disclaimer: {
      en: "Quebec selection is French-first and uses Arrima/RSWP rules distinct from other PNPs. This simplified score is not a CSQ calculation.",
      fr: "La sélection du Québec est axée sur le français et Arrima — ce score n'est pas un calcul CSQ.",
      vi: "Quebec ưu tiên tiếng Pháp và Arrima — điểm này không phải tính CSQ chính thức.",
    },
    increase: [
      pnpG(
        "Improve French proficiency (TEF/TCF) — it drives most Quebec selection factors.",
        "Améliorez le français (TEF/TCF) — il pèse lourd dans la sélection québécoise.",
        "Nâng tiếng Pháp (TEF/TCF) — yếu tố chính trong tuyển chọn Quebec."
      ),
      pnpG(
        "Obtain a validated job offer outside Montréal when possible for additional points.",
        "Obtenez une offre validée hors Montréal si possible pour des points supplémentaires.",
        "Có job offer được xác thực ngoài Montréal nếu có thể để cộng điểm."
      ),
      pnpG(
        "Ensure education credentials are recognized for Quebec’s grid.",
        "Assurez-vous que vos diplômes sont reconnus pour la grille du Québec.",
        "Đảm bảo bằng cấp được công nhận theo lưới Quebec."
      ),
    ],
    afterInvite: [
      pnpG(
        "Complete Arrima or PEQ steps within the invitation deadline.",
        "Complétez Arrima ou PEQ dans le délai d'invitation.",
        "Hoàn tất bước Arrima hoặc PEQ trong hạn lời mời."
      ),
      pnpG(
        "Gather CSQ-required documents and French test results.",
        "Rassemblez les documents CSQ et résultats de tests de français.",
        "Thu thập hồ sơ CSQ và kết quả thi tiếng Pháp."
      ),
      pnpG(
        "After CSQ, prepare the federal permanent residence application to IRCC.",
        "Après le CSQ, préparez la demande fédérale de RP à l'IRCC.",
        "Sau CSQ, chuẩn bị hồ sơ thường trú liên bang gửi IRCC."
      ),
    ],
  },
  ynp: {
    disclaimer: {
      en: "Yukon nominations require strong employer support and demonstrated intent to remain. Streams are small and criteria are employer-led.",
      fr: "Le YNP exige un fort soutien employeur et l'intention de demeurer au Yukon.",
      vi: "YNP cần employer hỗ trợ mạnh và chứng minh ý định ở lại Yukon.",
    },
    increase: [
      pnpG(
        "Secure a Yukon employer willing to complete YNP employer requirements.",
        "Obtenez un employeur au Yukon prêt à remplir les exigences YNP.",
        "Có employer Yukon sẵn sàng hoàn thành yêu cầu YNP."
      ),
      pnpG(
        "Show community ties and realistic settlement plans.",
        "Démontrez des liens communautaires et un plan d'établissement réaliste.",
        "Chứng minh liên kết cộng đồng và kế hoạch định cư thực tế."
      ),
      pnpG(
        "Meet language minimums for Skilled Worker or Critical Impact streams.",
        "Atteignez les minimums de langue pour Travailleur qualifié ou Impact critique.",
        "Đạt mức ngôn ngữ tối thiểu cho Skilled Worker hoặc Critical Impact."
      ),
    ],
    afterInvite: [
      pnpG(
        "File the YNP nomination package with employer attestations promptly.",
        "Déposez le dossier YNP avec attestations employeur sans tarder.",
        "Nộp bộ đề cử YNP kèm xác nhận employer kịp thời."
      ),
      pnpG(
        "Maintain job duties and wages as described in the support letter.",
        "Maintenez fonctions et salaire comme dans la lettre de soutien.",
        "Duy trì công việc và lương như thư hỗ trợ employer."
      ),
      pnpG(
        "Proceed to federal PR once Yukon issues the nomination certificate.",
        "Passez à la RP fédérale une fois le certificat de nomination du Yukon émis.",
        "Chuyển sang PR liên bang khi Yukon cấp chứng nhận đề cử."
      ),
    ],
  },
  ns: {
    disclaimer: {
      en: "NSNP draws are often targeted to specific NOCs or Express Entry profiles without public scores. Eligibility is stream-specific.",
      fr: "Les tirages NSNP ciblent souvent des NOC ou profils EE précis.",
      vi: "Rút thăm NSNP thường nhắm NOC hoặc hồ sơ EE cụ thể.",
    },
    increase: [
      pnpG(
        "Maintain an active Express Entry profile if applying to EE-linked NS draws.",
        "Maintenez un profil Entrée express actif pour les tirages NS liés à EE.",
        "Duy trì hồ sơ Express Entry active nếu tham gia rút NS liên kết EE."
      ),
      pnpG(
        "Gain Nova Scotia skilled experience or job offers in priority sectors.",
        "Acquérez expérience qualifiée ou offres en N.-É. dans les secteurs prioritaires.",
        "Có kinh nghiệm skilled hoặc job offer tại Nova Scotia trong sector ưu tiên."
      ),
      pnpG(
        "Improve language scores to exceed stream minimums.",
        "Améliorez la langue au-delà des minimums du volet.",
        "Nâng điểm ngôn ngữ vượt mức tối thiểu của luồng."
      ),
    ],
    afterInvite: [
      pnpG(
        "Submit NSNP applications within provincial deadlines.",
        "Soumettez les demandes NSNP dans les délais provinciaux.",
        "Nộp NSNP trong hạn tỉnh bang."
      ),
      pnpG(
        "Provide employer documents for skilled worker streams.",
        "Fournissez les documents employeur pour les volets travailleurs qualifiés.",
        "Cung cấp giấy tờ employer cho luồng skilled worker."
      ),
      pnpG(
        "Accept EE nominations in IRCC when instructed for enhanced streams.",
        "Acceptez la nomination EE dans IRCC lorsque requis pour les volets améliorés.",
        "Chấp nhận đề cử EE trên IRCC theo hướng dẫn với luồng enhanced."
      ),
    ],
  },
  sk: {
    disclaimer: {
      en: "This SINP calculator models the International Skilled Worker 110-point grid only. Express Entry and Occupations In-Demand use separate occupation lists and draw cut-offs; Saskatchewan Experience and Hard-to-Fill Skills Pilot use different criteria. Connection factors are capped at 30 points combined on the official grid—do not assume you can add every connection field at full value.",
      fr: "Ce calculateur modélise la grille TQI de 110 points seulement. EE et OID ont des listes et seuils distincts; Expérience SK et le pilote ont d'autres critères. Les liens SK sont plafonnés à 30 points combinés.",
      vi: "Máy tính này mô phỏng lưới International Skilled Worker 110 điểm. EE và OID có danh sách nghề và ngưỡng rút riêng; Saskatchewan Experience và Hard-to-Fill có tiêu chí khác. Yếu tố liên kết SK chính thức giới hạn 30 điểm cộng dồn.",
    },
    increase: [
      pnpG(
        "Raise CLB/NCLC — language is worth up to 20 points on the SINP ISW grid.",
        "Augmentez CLB/NCLC — la langue vaut jusqu'à 20 points sur la grille TQI SINP.",
        "Nâng CLB/NCLC — ngôn ngữ tối đa 20 điểm trên lưới SINP ISW."
      ),
      pnpG(
        "Claim up to 30 combined connection points (SK job offer, close relative, prior SK work/study).",
        "Réclamez jusqu'à 30 points de liens combinés (offre SK, proche parent, travail/études SK).",
        "Nhận tối đa 30 điểm liên kết (job offer SK, họ hàng gần, làm việc/du học SK)."
      ),
      pnpG(
        "For OID, confirm your NOC is on the current In-Demand list before creating an EOI.",
        "Pour OID, vérifiez que votre CNP est sur la liste In-Demand avant de créer un EOI.",
        "Với OID, xác nhận NOC nằm trong danh sách In-Demand trước khi tạo EOI."
      ),
      pnpG(
        "For EE sub-category, keep an active Express Entry profile and meet SINP + IRCC minimums.",
        "Pour la sous-catégorie EE, gardez un profil Entrée express actif et respectez les minimums SINP et IRCC.",
        "Với nhánh EE, duy trì hồ sơ Express Entry và đạt tối thiểu SINP + IRCC."
      ),
    ],
    afterInvite: [
      pnpG(
        "Submit the SINP application before the invitation expiry date in your SINP account.",
        "Soumettez la demande SINP avant l'expiration de l'invitation dans votre compte SINP.",
        "Nộp SINP trước ngày hết hạn lời mời trong tài khoản SINP."
      ),
      pnpG(
        "Upload education assessments, language tests, licensing (if regulated), and settlement funds proof.",
        "Téléversez évaluations des diplômes, tests de langue, licences (si réglementé) et preuves de fonds.",
        "Tải đánh giá bằng cấp, thi ngôn ngữ, giấy phép nghề (nếu có) và chứng minh tài chính."
      ),
      pnpG(
        "EE sub-category: accept the provincial nomination in IRCC Express Entry for +600 CRS, then apply for PR when invited.",
        "Sous-catégorie EE : acceptez la nomination dans Entrée express pour +600 CRS, puis demandez la RP après ITA.",
        "Nhánh EE: chấp nhận đề cử trên Express Entry (+600 CRS), nộp PR khi được ITA."
      ),
      pnpG(
        "OID/base applicants: file the federal permanent residence application after SINP nomination approval.",
        "Demandeurs OID/base : déposez la demande fédérale de RP après approbation SINP.",
        "OID/base: nộp PR liên bang sau khi SINP duyệt đề cử."
      ),
    ],
  },
};

window.PNP_PROGRAM_SIDEBAR = PNP_PROGRAM_SIDEBAR;
window.pnpSidebarText = pnpSidebarText;
window.pnpSidebarList = pnpSidebarList;
