/** Per-stream eligibility copy (descriptions + bullet facts — no generic placeholders). */

const PNP_STREAM_ITEM_DETAILS = {
  aaip: [
    {
      desc: {
        en: "In-province workers on eligible permits with a full-time Alberta job in an eligible TEER occupation matching experience.",
        fr: "Travailleurs au Alberta avec permis admissible et emploi à temps plein dans une profession TEER admissible.",
        vi: "Lao động trong Alberta với permit hợp lệ và việc full-time TEER phù hợp kinh nghiệm.",
      },
      bullets: [
        { en: "Language: typically CLB 4+ (CLB 5 for TEER 0–1).", fr: "Langue : généralement CLB 4+ (CLB 5 pour TEER 0–1).", vi: "Ngôn ngữ: thường CLB 4+ (CLB 5 cho TEER 0–1)." },
        { en: "Must hold valid temporary resident status authorized to work in Alberta.", fr: "Statut de résident temporaire autorisé à travailler en Alberta.", vi: "Phải có status tạm trú được phép làm việc tại Alberta." },
        { en: "EOI grid is 100 points; recent AOS cut-offs often mid-50s to high-50s.", fr: "Grille EOI 100 points; seuils AOS récents souvent 50–60.", vi: "Lưới EOI 100 điểm; ngưỡng AOS gần đây thường 50–60." },
      ],
    },
    {
      desc: {
        en: "Job offer in a designated rural community plus an official community Endorsement Letter.",
        fr: "Offre d'emploi en communauté rurale désignée et lettre d'endossement officielle.",
        vi: "Job offer ở cộng đồng nông thôn được chỉ định và thư Endorsement chính thức.",
      },
      bullets: [
        { en: "Endorsement adds bonus points on the worker EOI grid.", fr: "L'endossement ajoute des points bonus à la grille EOI.", vi: "Endorsement cộng điểm bonus trên lưới EOI." },
        { en: "Full-time permanent job outside Calgary/Edmonton CMAs is typical.", fr: "Emploi permanent à temps plein hors CMA Calgary/Edmonton.", vi: "Việc permanent full-time thường ngoài vùng Calgary/Edmonton." },
        { en: "Recent draws issued triple-digit ITAs with scores near low-50s EOI.", fr: "Tirages récents : centaines d'ITA, scores EOI ~50.", vi: "Rút thăm gần đây: hàng trăm ITA, điểm EOI ~50." },
      ],
    },
    {
      desc: {
        en: "Active Express Entry profile (CRS 300+) used for targeted Tech, Healthcare, Agriculture, and Construction draws.",
        fr: "Profil Entrée express actif (CRS 300+) pour tirages Tech, santé, agriculture, construction.",
        vi: "Hồ sơ Express Entry (CRS 300+) cho rút thăm Tech, y tế, nông nghiệp, xây dựng.",
      },
      bullets: [
        { en: "Accelerated Tech Pathway: eligible tech NOC with Alberta job offer.", fr: "Voie tech accélérée : NOC tech admissible avec offre en Alberta.", vi: "Accelerated Tech: NOC tech với job offer Alberta." },
        { en: "Dedicated Healthcare and Priority Sector draws use separate EOI/CRS cut-offs.", fr: "Santé et secteurs prioritaires : seuils EOI/CRS distincts.", vi: "Healthcare và sector priority: ngưỡng EOI/CRS riêng." },
        { en: "Not the same 100-point in-province grid as AOS alone.", fr: "Grille différente de l'AOS « base ».", vi: "Khác lưới 100 điểm AOS in-province thuần." },
      ],
    },
    {
      desc: {
        en: "Dedicated Healthcare Pathway (Express Entry or non-EE) for priority medical occupations when a draw is announced.",
        fr: "Volet santé dédié (EE ou non) pour professions médicales prioritaires.",
        vi: "Dedicated Healthcare cho nghề y tế ưu tiên khi có đợt rút thăm.",
      },
      bullets: [
        { en: "Recent rounds near 60 EOI with ~50–60 ITAs per draw.", fr: "Tirages récents ~60 EOI, ~50–60 ITA.", vi: "Đợt gần đây ~60 EOI, ~50–60 ITA." },
        { en: "Must meet stream-specific NOC and licensing where regulated.", fr: "NOC et permis professionnels selon le volet.", vi: "Đáp ứng NOC và giấy phép nghề nếu regulated." },
        { en: "Tourism & Hospitality opens only when AAIP posts intake.", fr: "Tourisme/hôtellerie ouvert seulement lors d'intakes annoncés.", vi: "Tourism & Hospitality chỉ mở khi AAIP thông báo intake." },
      ],
    },
  ],
  bc: [
    {
      desc: {
        en: "Targeted SIRS draws for healthcare, veterinary care, and Early Childhood Educators (ECE).",
        fr: "Tirages SIRS ciblés : santé, vétérinaire et ECE.",
        vi: "Rút thăm SIRS mục tiêu y tế, thú y và ECE.",
      },
      bullets: [
        { en: "Recent ECE draws near 99–102 SIRS; healthcare priority draws near 76–84.", fr: "ECE ~99–102 SIRS; santé ~76–84.", vi: "ECE ~99–102 SIRS; healthcare ~76–84." },
        { en: "Valid full-time BC job offer in a targeted NOC is required to register.", fr: "Offre d'emploi BC temps plein dans un NOC ciblé requise.", vi: "Cần job offer BC full-time trong NOC mục tiêu." },
        { en: "TRHSI (rural/remote health support) may use lower cut-offs when active.", fr: "TRHSI peut avoir des seuils plus bas lorsqu'actif.", vi: "TRHSI có thể có ngưỡng thấp hơn khi mở." },
      ],
    },
    {
      desc: {
        en: "Tech and high economic-impact roles; many draws need strong SIRS or roughly $55+/hr on the job offer.",
        fr: "Tech et fort impact économique; SIRS élevé ou ~55 $+/h souvent requis.",
        vi: "Tech và vai trò tác động kinh tế cao; thường cần SIRS mạnh hoặc ~$55+/giờ.",
      },
      bullets: [
        { en: "High Economic Impact draws often 132+ SIRS or qualifying high hourly wage.", fr: "Impact économique : souvent 132+ SIRS ou salaire horaire élevé.", vi: "High Economic Impact: thường 132+ SIRS hoặc lương giờ cao." },
        { en: "Tech occupations remain priority under Look West strategy.", fr: "Professions tech prioritaires (Look West).", vi: "Nghề tech vẫn ưu tiên theo Look West." },
        { en: "SIRS does not award age points (unlike federal CRS).", fr: "Le SIRS n'attribue pas de points d'âge.", vi: "SIRS không cộng điểm tuổi (khác CRS liên bang)." },
      ],
    },
    {
      desc: {
        en: "Construction trades and infrastructure occupations with frequent dedicated draws.",
        fr: "Métiers de la construction et infrastructures — tirages dédiés fréquents.",
        vi: "Nghề xây dựng và hạ tầng — rút thăm riêng thường xuyên.",
      },
      bullets: [
        { en: "Recent construction draws near 88–94 SIRS with 100+ ITAs.", fr: "Construction récente ~88–94 SIRS, 100+ ITA.", vi: "Xây dựng gần đây ~88–94 SIRS, 100+ ITA." },
        { en: "Certification or BC-recognized trade credential strengthens eligibility.", fr: "Certification ou titre reconnu en C.-B. renforce l'admissibilité.", vi: "Chứng chỉ nghề được BC công nhận giúp đủ điều kiện." },
        { en: "Job offer wage and region (Area 2/3) heavily affect SIRS total.", fr: "Salaire et région (zones 2/3) pèsent fortement dans le SIRS.", vi: "Lương và vùng (Area 2/3) ảnh hưởng lớn điểm SIRS." },
      ],
    },
    {
      desc: {
        en: "Legacy semi-skilled pathways (tourism/hospitality TEER 4–5) — verify current BC PNP category before registering.",
        fr: "Voies semi-qualifiées (TEER 4–5) — vérifiez la catégorie actuelle avant inscription.",
        vi: "Luồng bán kỹ năng (TEER 4–5) — kiểm tra category BC PNP hiện hành trước khi đăng ký.",
      },
      bullets: [
        { en: "Historically required 9 months full-time with same BC employer.", fr: "Historiquement 9 mois à temps plein chez le même employeur.", vi: "Trước đây cần 9 tháng full-time cùng employer BC." },
        { en: "2026 structure favours the three Look West pillars over legacy ELSS.", fr: "2026 privilégie les trois piliers Look West.", vi: "2026 ưu tiên ba trụ Look West hơn ELSS cũ." },
        { en: "International Graduate stream uses BC credential + job offer rules.", fr: "Diplômé international : diplôme BC + règles d'offre.", vi: "International Graduate: bằng BC + quy tắc job offer." },
      ],
    },
  ],
  nt: [
    {
      desc: {
        en: "Active IRCC Express Entry profile plus permanent TEER 0–3 job offer from an eligible NWT employer.",
        fr: "Profil EE actif + offre permanente TEER 0–3 d'un employeur admissible.",
        vi: "Hồ sơ Express Entry IRCC + job offer permanent TEER 0–3 từ employer NWT đủ điều kiện.",
      },
      bullets: [
        { en: "Nomination adds 600 CRS points after provincial approval.", fr: "La nomination ajoute 600 points CRS.", vi: "Đề cử cộng 600 điểm CRS sau khi tỉnh duyệt." },
        { en: "Employer submits the EOI in the NTNP portal naming you.", fr: "L'employeur dépose l'EOI au portail NTNP.", vi: "Employer nộp EOI trên cổng NTNP với tên bạn." },
        { en: "June 2026 draw example: 40 ITAs under this pathway.", fr: "Ex. juin 2026 : 40 ITA pour ce volet.", vi: "Ví dụ 06/2026: 40 ITA cho luồng này." },
      ],
    },
    {
      desc: {
        en: "TEER 0–3 job offer and at least 6 months already worked in that NWT role (no Express Entry required).",
        fr: "Offre TEER 0–3 et 6 mois minimum déjà travaillés aux T.N.-O. (sans EE).",
        vi: "Job TEER 0–3 và đã làm tối thiểu 6 tháng tại NWT (không bắt buộc Express Entry).",
      },
      bullets: [
        { en: "Does not require Express Entry (base PNP route).", fr: "N'exige pas Entrée express.", vi: "Không bắt buộc Express Entry." },
        { en: "Language typically CLB 4+ minimum; EE stream higher.", fr: "Langue : CLB 4+ min.; plus élevé pour EE.", vi: "Ngôn ngữ tối thiểu CLB 4+; EE cao hơn." },
        { en: "June 2026 draw example: 20 ITAs — Skilled Worker.", fr: "Ex. juin 2026 : 20 ITA travailleurs qualifiés.", vi: "Ví dụ 06/2026: 20 ITA Skilled Worker." },
      ],
    },
    {
      desc: {
        en: "TEER 4–5 shortage roles with 6 months NWT experience in the same position.",
        fr: "TEER 4–5 en pénurie; 6 mois d'expérience aux T.N.-O. dans le poste.",
        vi: "Nghề TEER 4–5 thiếu hụt; 6 tháng kinh nghiệm NWT cùng vị trí.",
      },
      bullets: [
        { en: "CLB 4 minimum in English or French.", fr: "CLB 4 minimum en anglais ou français.", vi: "Tối thiểu CLB 4 tiếng Anh hoặc Pháp." },
        { en: "Employer-driven EOI grid up to 845 points ranks candidates.", fr: "Grille EOI employeur jusqu'à 845 points.", vi: "Lưới EOI employer tới 845 điểm." },
        { en: "June 2026 draw example: 19 ITAs — Entry Level.", fr: "Ex. juin 2026 : 19 ITA niveau entrée.", vi: "Ví dụ 06/2026: 19 ITA Entry Level." },
      ],
    },
    {
      desc: {
        en: "Investment and personal net-worth thresholds; exploratory visit required before applying.",
        fr: "Seuils d'investissement et de valeur nette; visite exploratoire obligatoire.",
        vi: "Ngưỡng đầu tư và giá trị ròng; cần chuyến thăm khảo sát trước khi nộp.",
      },
      bullets: [
        { en: "Investment from $150k outside Yellowknife / $300k in Yellowknife area.", fr: "Investissement 150 k$ hors Yellowknife / 300 k$ à Yellowknife.", vi: "Đầu tư từ $150k ngoài Yellowknife / $300k khu Yellowknife." },
        { en: "Separate from employer-driven worker EOIs and draw tables.", fr: "Distinct des EOI travailleurs employeur.", vi: "Tách khỏi EOI lao động employer-driven." },
        { en: "No job offer — business establishment or purchase model.", fr: "Pas d'offre d'emploi — modèle d'entreprise.", vi: "Không job offer — mô hình kinh doanh." },
      ],
    },
  ],
  nb: [
    {
      desc: {
        en: "Active Express Entry profile, 67/100 on the NB selection grid, and live/work in NB or study in a PGWP-eligible NB program.",
        fr: "Profil EE actif, 67/100 sur la grille NB, vivre/travailler ou étudier au N.-B.",
        vi: "Express Entry active, 67/100 lưới NB, đang sống/làm việc hoặc học PGWP-eligible tại NB.",
      },
      bullets: [
        { en: "July 2026 draw: 115 ITAs at 67-point minimum.", fr: "Juillet 2026 : 115 ITA, minimum 67 points.", vi: "07/2026: 115 ITA, tối thiểu 67 điểm." },
        { en: "Language up to 28 points — CLB 9+ maximizes first official language.", fr: "Langue jusqu'à 28 points — CLB 9+ maximise.", vi: "Ngôn ngữ tới 28 điểm — CLB 9+ tối đa hóa." },
        { en: "Submit EOI through the INB portal to enter draw pools.", fr: "Déposer un EOI via le portail INB.", vi: "Nộp EOI qua cổng INB." },
      ],
    },
    {
      desc: {
        en: "Permanent full-time job offer from an eligible NB employer; minimum 60/100 on the skilled worker grid.",
        fr: "Offre permanente d'un employeur admissible; minimum 60/100.",
        vi: "Job offer permanent từ employer NB; tối thiểu 60/100.",
      },
      bullets: [
        { en: "July 2026 draw: 209 ITAs at 60-point minimum.", fr: "Juillet 2026 : 209 ITA, minimum 60 points.", vi: "07/2026: 209 ITA, tối thiểu 60 điểm." },
        { en: "Arranged employment adds 10 points + adaptability bonus.", fr: "Emploi arrangé : 10 points + adaptabilité.", vi: "Arranged employment +10 điểm + adaptability." },
        { en: "Employer completes NBPNP-004 support documentation.", fr: "Employeur : formulaire NBPNP-004.", vi: "Employer hoàn thành NBPNP-004." },
      ],
    },
    {
      desc: {
        en: "Strategic Initiative — French-speaking workers (NCLC 5+ French) for francophone economic development.",
        fr: "Initiative stratégique — francophones NCLC 5+ pour le développement économique.",
        vi: "Strategic Initiative — lao động Pháp ngữ NCLC 5+ phát triển kinh tế.",
      },
      bullets: [
        { en: "July 2026 francophone draw: 254 invitations (separate grid).", fr: "Juillet 2026 francophone : 254 invitations.", vi: "07/2026 Pháp ngữ: 254 lời mời." },
        { en: "Job offer encouraged; targeted recruitment missions may apply.", fr: "Offre d'emploi encouragée; missions ciblées possibles.", vi: "Khuyến khích job offer; có thể có mission tuyển dụng." },
        { en: "Atlantic Immigration Program (AIP) may run parallel employer-led rounds.", fr: "PAI Atlantique peut avoir des rondes employeur parallèles.", vi: "AIP có thể có đợt employer song song." },
      ],
    },
  ],
  mpnp: [
    {
      desc: {
        en: "In-province skilled employment with a supporting Manitoba employer in an eligible NOC.",
        fr: "Emploi qualifié au Manitoba avec employeur admissible (NOC admissible).",
        vi: "Làm skilled tại Manitoba với employer hỗ trợ, NOC đủ điều kiện.",
      },
      bullets: [
        { en: "1,000-point EOI; recent in-province cut-offs often 800+.", fr: "EOI 1 000 points; seuils récents souvent 800+.", vi: "EOI 1.000 điểm; ngưỡng trong tỉnh gần đây thường 800+." },
        { en: "Permanent full-time job; in-demand NOC lists apply when posted.", fr: "Emploi permanent; listes en demande selon avis.", vi: "Việc permanent full-time; danh sách nghề thiếu hụt khi có thông báo." },
        { en: "Language, tenure in MB, and regional work boost adaptability.", fr: "Langue, ancienneté MB et région : adaptabilité.", vi: "Ngôn ngữ, thời gian làm MB và vùng cộng adaptability." },
      ],
    },
    {
      desc: {
        en: "Overseas candidates with Strategic Recruitment Initiative approval or close Manitoba ties.",
        fr: "À l'étranger : invitation SRI ou liens étroits au Manitoba.",
        vi: "Ở nước ngoài: có SRI hoặc liên kết chặt với Manitoba.",
      },
      bullets: [
        { en: "SRI invite or qualifying family/study/work connection typically required.", fr: "SRI ou lien famille/études/travail requis.", vi: "Thường cần SRI hoặc liên kết gia đình/học/làm MB." },
        { en: "Draw scores often lower than the in-province skilled worker stream.", fr: "Seuils souvent plus bas qu'in-province.", vi: "Điểm rút thường thấp hơn luồng trong tỉnh." },
        { en: "Active EOI elsewhere: −100 on the MPNP grid.", fr: "EOI actif ailleurs : −100.", vi: "EOI active tỉnh khác: −100." },
      ],
    },
    {
      desc: {
        en: "Eligible Manitoba graduates meeting International Education Stream rules.",
        fr: "Diplômés admissibles au Manitoba (IES).",
        vi: "Tốt nghiệp Manitoba đủ điều kiện (IES).",
      },
      bullets: [
        { en: "Some intakes are graduate-only with no public EOI cut-off.", fr: "Intakes diplômés sans seuil EOI public.", vi: "Một số đợt chỉ graduate, không công bố ngưỡng EOI." },
        { en: "Field-related job may be required by credential level.", fr: "Emploi lié au domaine selon diplôme.", vi: "Có thể cần việc đúng ngành theo bằng cấp." },
        { en: "See MPNP IES for current NOC lists.", fr: "Listes NOC sur la page IES.", vi: "Danh sách NOC trên trang IES MPNP." },
      ],
    },
    {
      desc: {
        en: "Experienced owners/investors — separate net worth, visit, and business plan rules.",
        fr: "Propriétaires/investisseurs — valeur nette, visite et plan distincts.",
        vi: "Chủ/doanh nhân — quy tắc giá trị ròng, thăm khảo sát và kế hoạch riêng.",
      },
      bullets: [
        { en: "Outside the 1,000-point skilled worker EOI grid.", fr: "Hors grille EOI 1 000 points.", vi: "Ngoài lưới EOI skilled worker 1.000 điểm." },
        { en: "Invitation-only after exploratory visit and deposit steps.", fr: "Sur invitation après visite et dépôt.", vi: "Chỉ mời sau thăm khảo sát và đặt cọc." },
        { en: "Draw tables may list business nominations without EOI scores.", fr: "Tirages affaires sans score EOI.", vi: "Bảng rút có thể ghi business không kèm điểm EOI." },
      ],
    },
  ],
  oinp: [
    {
      desc: { en: "Valid job offer in skilled TEER 0–3 with employer compliance, wage thresholds, and 130-point worker EOI where applicable.", fr: "Offre d'emploi TEER 0–3, conformité employeur et EOI 130 points.", vi: "Job offer TEER 0–3, employer tuân thủ và EOI 130 điểm nếu áp dụng." },
      bullets: [
        { en: "OWPS-style grid: region, TEER, wage, experience, education, language.", fr: "Grille OWPS : région, TEER, salaire, expérience, études, langue.", vi: "Lưới OWPS: vùng, TEER, lương, kinh nghiệm, học vấn, ngôn ngữ." },
        { en: "Intake can close without notice — verify stream status before EOI.", fr: "Intake peut fermer sans préavis.", vi: "Intake có thể đóng đột ngột — kiểm tra trước khi EOI." },
        { en: "Northern/outside-GTA job locations score higher on the grid.", fr: "Emploi hors GTA / nord : plus de points.", vi: "Việc ngoài GTA/vùng Bắc được điểm cao hơn." },
      ],
    },
    {
      desc: { en: "Must be in the federal Express Entry pool; OINP issues targeted invitations (Human Capital Priorities, French-speaking, etc.).", fr: "Profil Entrée express requis; invitations ciblées OINP.", vi: "Cần hồ sơ Express Entry; OINP mời theo đợt (Human Capital, tiếng Pháp, v.v.)." },
      bullets: [
        { en: "Recent draws use CRS or stream-specific EOI cut-offs (not the 130-pt OWPS alone).", fr: "Seuils CRS ou EOI selon le volet.", vi: "Ngưỡng CRS hoặc EOI theo từng luồng." },
        { en: "600 provincial nomination points apply after nomination certificate.", fr: "+600 points CRS après nomination.", vi: "+600 điểm CRS sau chứng nhận đề cử." },
        { en: "Job offer may or may not be required depending on stream.", fr: "Offre d'emploi selon le volet.", vi: "Job offer tùy luồng." },
      ],
    },
    {
      desc: { en: "Minimum ~1 year eligible skilled trades experience in Ontario; separate draw history from general worker grid.", fr: "≈1 an d'expérience en métiers spécialisés en Ontario.", vi: "Khoảng 1 năm kinh nghiệm nghề tại Ontario." },
      bullets: [
        { en: "Active EE profile typically required for EE-linked skilled trades draws.", fr: "Profil EE souvent requis.", vi: "Thường cần hồ sơ EE cho rút thăm Skilled Trades." },
        { en: "Certificate of qualification may strengthen eligibility.", fr: "Certificat de qualification utile.", vi: "Chứng chỉ nghề giúp đủ điều kiện." },
        { en: "Confirm NOC trade list when stream is open.", fr: "Liste NOC métiers lorsque ouvert.", vi: "Xác nhận danh sách NOC khi luồng mở." },
      ],
    },
    {
      desc: { en: "Masters/PhD from eligible Ontario institutions — often limited intakes; may be closed when quota is met.", fr: "Maîtrise/doctorat — intakes limités, souvent fermés.", vi: "Thạc sĩ/Tiến sĩ — intake hạn chế, thường đóng khi hết quota." },
      bullets: [
        { en: "No job offer required when stream is open to graduates.", fr: "Sans offre d'emploi lorsque ouvert.", vi: "Không cần job offer khi luồng mở cho graduate." },
        { en: "Must apply within qualifying period after graduation.", fr: "Délai après diplôme.", vi: "Nộp trong thời hạn sau tốt nghiệp." },
        { en: "Check OINP graduate stream page for current open/closed status.", fr: "Statut ouvert/fermé sur ontario.ca.", vi: "Xem trang graduate OINP về trạng thái mở/đóng." },
      ],
    },
  ],
  nl: [
    {
      desc: { en: "Active Express Entry profile and minimum 67/100 on the NL selection grid via Immigration Accelerator.", fr: "Entrée express + 67/100 sur la grille NL.", vi: "Express Entry + tối thiểu 67/100 lưới NL qua Immigration Accelerator." },
      bullets: [
        { en: "NL job offer OR priority-sector profile (health, tech, engineering).", fr: "Offre NL ou secteur prioritaire.", vi: "Job offer NL hoặc ngành ưu tiên (y tế, tech, kỹ sư)." },
        { en: "September 2026 draw example: 61 NLPNP ITAs at 67+ points.", fr: "Ex. sept. 2026 : 61 ITA, 67+ points.", vi: "Ví dụ 09/2026: 61 ITA, 67+ điểm." },
        { en: "EOI valid 12 months in the Accelerator portal.", fr: "EOI valide 12 mois.", vi: "EOI hiệu lực 12 tháng trên cổng Accelerator." },
      ],
    },
    {
      desc: { en: "Permanent full-time job offer from an eligible NL employer; licensing for regulated roles.", fr: "Offre permanente d'un employeur admissible.", vi: "Job offer permanent từ employer NL; giấy phép nghề regulated." },
      bullets: [
        { en: "Targeted at trades, manufacturing, and healthcare shortages.", fr: "Métiers, fabrication, santé.", vi: "Nghề thủ công, sản xuất, y tế thiếu hụt." },
        { en: "Employer-driven — job offer quality is central.", fr: "Piloté par l'employeur.", vi: "Employer-driven — job offer là trọng tâm." },
        { en: "Draws often bundle Skilled Worker with other NLPNP pathways.", fr: "Tirages groupés NLPNP.", vi: "Rút thăm thường gộp Skilled Worker với luồng NLPNP khác." },
      ],
    },
    {
      desc: { en: "Highly educated profiles in Priority Skills NL (tech, health, engineering) — job offer not always required.", fr: "Priority Skills NL — offre parfois non requise.", vi: "Priority Skills NL — có thể không cần job offer." },
      bullets: [
        { en: "Strong language (CLB 5+) and specialized education/experience.", fr: "Langue CLB 5+ et formation spécialisée.", vi: "Ngôn ngữ CLB 5+ và học vấn/kinh nghiệm chuyên sâu." },
        { en: "Must align with NL priority occupation lists when draws run.", fr: "Professions prioritaires NL.", vi: "Phải khớp danh sách nghề ưu tiên NL." },
        { en: "Different from Express Entry 67-point grid weighting.", fr: "Grille différente du volet EE.", vi: "Khác trọng số lưới 67 điểm EE." },
      ],
    },
  ],
  pei: [
    {
      desc: { en: "Active EE profile (FSW, CEC, or FST) registered in PEI’s EOI pool; sector targeting common.", fr: "Profil EE actif dans le bassin EOI PEI.", vi: "Hồ sơ EE active trong pool EOI PEI; thường nhắm theo ngành." },
      bullets: [
        { en: "Without PEI job offer, experience in high-demand NOCs is usually required.", fr: "Sans offre PEI, expérience en NOC en demande.", vi: "Không job offer PEI thì thường cần kinh nghiệm NOC thiếu hụt." },
        { en: "Monthly draws; min score often not published — sector matters.", fr: "Tirages mensuels; score souvent non publié.", vi: "Rút hàng tháng; điểm tối thiểu thường không công bố." },
        { en: "EOI profile expires after 6 months (re-submit if not invited).", fr: "EOI expire après 6 mois.", vi: "EOI hết hạn sau 6 tháng." },
      ],
    },
    {
      desc: { en: "Permanent full-time PEI employer job offer in TEER 0–3 with 2+ years skilled experience.", fr: "Offre PEI TEER 0–3 + 2 ans d'expérience.", vi: "Job offer PEI TEER 0–3 và 2+ năm kinh nghiệm skilled." },
      bullets: [
        { en: "September 2026 draw: 195 ITAs (healthcare, trades, manufacturing, PEI grads).", fr: "Sept. 2026 : 195 ITA.", vi: "09/2026: 195 ITA." },
        { en: "Settlement funds and legal status requirements apply.", fr: "Fonds d'établissement et statut légal.", vi: "Vốn định cư và status hợp pháp." },
        { en: "Critical Worker stream (TEER 4–5) uses separate employer rules.", fr: "Critical Worker TEER 4–5 — règles distinctes.", vi: "Critical Worker TEER 4–5 — quy tắc riêng." },
      ],
    },
    {
      desc: { en: "Graduate from publicly funded PEI institution (UPEI, Holland College, Collège de l’Île) with PGWP and field-related job offer.", fr: "Diplômé PEI + PTPD + offre liée au domaine.", vi: "Tốt nghiệp PEI + PGWP + job offer đúng ngành." },
      bullets: [
        { en: "PEI international graduates prioritized in most 2026 draws.", fr: "Diplômés internationaux priorisés.", vi: "Sinh viên quốc tế tốt nghiệp PEI được ưu tiên." },
        { en: "Job must be full-time permanent with eligible employer.", fr: "Emploi permanent temps plein.", vi: "Việc permanent full-time với employer đủ điều kiện." },
        { en: "Business Impact stream uses separate entrepreneur criteria.", fr: "Volet affaires distinct.", vi: "Business Impact có tiêu chí entrepreneur riêng." },
      ],
    },
  ],
  qc: [
    {
      desc: { en: "Highly qualified and specialized workers in TEER 0–2 occupations declared in Arrima.", fr: "Travailleurs hautement qualifiés TEER 0–2 déclarés dans Arrima.", vi: "Lao động highly qualified TEER 0–2 khai báo trên Arrima." },
      bullets: [
        { en: "Occupation must match an eligible TEER 0–2 profile for the stream when MIFI opens an extraction.", fr: "Profession TEER 0–2 admissible pour l'extraction annoncée.", vi: "Nghề phải thuộc TEER 0–2 đủ điều kiện khi MIFI mở đợt rút." },
        { en: "French: plan for oral NCLC 7+ (and other skills per MIFI rules) — PSTQ selections are French-first.", fr: "Français : viser NCLC 7+ à l'oral (PSTQ axé sur le français).", vi: "Pháp ngữ: hướng tới NCLC 7+ nói (PSTQ ưu tiên tiếng Pháp)." },
        { en: "Skilled work experience and education must support the occupation you declare; ECA or Québec equivalency when required.", fr: "Expérience et études cohérentes avec la profession; équivalence si exigée.", vi: "Kinh nghiệm và học vấn phải khớp nghề khai báo; ECA/tương đương Quebec nếu cần." },
        { en: "When an extraction requires it, the job offer must be validated by MIFI (VJO) and match the declared role and work location rules.", fr: "Si exigé : offre validée par le MIFI (VJO) conforme au poste déclaré.", vi: "Nếu đợt rút yêu cầu: job offer phải được MIFI xác thực (VJO) và khớp vị trí khai báo." },
      ],
    },
    {
      desc: { en: "Intermediate and manual occupations in TEER 3–5 sectors MIFI targets in extractions.", fr: "Professions intermédiaires et manuelles TEER 3–5 selon extractions MIFI.", vi: "Nghề trung cấp và thủ công TEER 3–5 theo đợt rút MIFI." },
      bullets: [
        { en: "NOC/TEER and sector must fit stream 2 lists for the announced extraction (e.g. manufacturing, trades, food processing).", fr: "NOC/TEER et secteur sur les listes du volet 2 de l'extraction.", vi: "NOC/TEER và ngành phải nằm danh sách luồng 2 của đợt rút." },
        { en: "French proficiency is heavily weighted; oral NCLC 7+ is the practical planning target.", fr: "Français fortement pondéré; NCLC 7+ oral recommandé.", vi: "Pháp ngữ trọng số cao; thực tế nên hướng NCLC 7+ nói." },
        { en: "Relevant skilled experience in the occupation; training or diplomas may be required for the NOC.", fr: "Expérience pertinente; formation peut être exigée.", vi: "Kinh nghiệm skilled liên quan; có thể cần đào tạo/chứng chỉ theo NOC." },
        { en: "Intent to live and work in Québec; meet admissibility and settlement requirements if invited.", fr: "Intention de s'établir au Québec; admissibilité si invité.", vi: "Cam kết định cư và làm việc tại Québec; đủ điều kiện nhập cư nếu được mời." },
      ],
    },
    {
      desc: { en: "Regulated professions where Québec professional orders govern practice (health, engineering, etc.).", fr: "Professions réglementées sous ordre professionnel québécois.", vi: "Nghề regulated do order nghề Quebec quản lý." },
      bullets: [
        { en: "Eligible membership or licensing pathway with the relevant Québec professional order.", fr: "Admissibilité ou parcours de permis auprès de l'ordre compétent.", vi: "Đủ điều kiện hoặc lộ trình cấp phép với order nghề Quebec." },
        { en: "Job offer or practice plan in the regulated field when the extraction requires it.", fr: "Offre ou plan de pratique dans le domaine réglementé si exigé.", vi: "Job offer hoặc kế hoạch hành nghề khi đợt rút yêu cầu." },
        { en: "French and credentials assessed on Arrima like other PSTQ streams; order may impose extra language or exam steps.", fr: "Français et diplômes sur Arrima; l'ordre peut exiger examens.", vi: "Pháp ngữ và bằng cấp trên Arrima; order có thể thêm thi/ngôn ngữ." },
        { en: "Licensing in progress may be accepted if MIFI and the order rules allow for that extraction.", fr: "Permis en cours parfois accepté selon règles MIFI/ordre.", vi: "Giấy phép đang xử lý có thể được chấp nhận nếu MIFI và order cho phép." },
      ],
    },
    {
      desc: { en: "Exceptional talent in research, arts, culture, or high-level sport with international recognition.", fr: "Talent exceptionnel (recherche, arts, culture, sport) reconnu internationalement.", vi: "Tài năng đặc biệt nghiên cứu, nghệ thuật, văn hóa hoặc thể thao có công nhận quốc tế." },
      bullets: [
        { en: "Documented international standing (awards, major contracts, publications, rankings, or equivalent proof).", fr: "Reconnaissance internationale documentée (prix, contrats, publications).", vi: "Công nhận quốc tế có chứng từ (giải, hợp đồng, công bố, xếp hạng…)." },
        { en: "Project or role in Québec aligned with your field of excellence when MIFI runs a stream 4 extraction.", fr: "Projet ou rôle au Québec lié au domaine d'excellence.", vi: "Dự án hoặc vai trò tại Quebec gắn lĩnh vực xuất sắc khi MIFI rút luồng 4." },
        { en: "Criteria and documents are set per extraction — not the standard TEER occupation list alone.", fr: "Critères fixés par extraction; pas seulement listes TEER.", vi: "Tiêu chí theo từng đợt rút — không chỉ danh sách TEER chuẩn." },
        { en: "Check MIFI notices for open stream 4 intakes; invitations are infrequent.", fr: "Surveiller avis MIFI pour intakes volet 4.", vi: "Theo dõi thông báo MIFI cho intake luồng 4; ít đợt mời." },
      ],
    },
  ],
  ynp: [
    {
      desc: { en: "Active Express Entry profile plus permanent Yukon employer job offer (TEER 0–3).", fr: "Entrée express + offre employeur Yukon.", vi: "Express Entry + job offer permanent employer Yukon (TEER 0–3)." },
      bullets: [
        { en: "Employer submits EOI during Jan/July intake windows only.", fr: "EOI employeur janvier/juillet seulement.", vi: "Employer nộp EOI chỉ đợt Jan/July." },
        { en: "2026 allocation: 282 total nominations.", fr: "Quota 2026 : 282 nominations.", vi: "Chỉ tiêu 2026: 282 đề cử." },
        { en: "Priority: regulated health, French, Yukon University grads, 1+ yr local work.", fr: "Priorité : santé, français, diplômés YU.", vi: "Ưu tiên: y tế regulated, Pháp ngữ, tốt nghiệp YU, 1+ năm làm tại Yukon." },
      ],
    },
    {
      desc: { en: "Year-round skilled job offer (TEER 0–3) with 12+ months related experience.", fr: "Offre qualifiée TEER 0–3 + 12 mois d'expérience.", vi: "Job TEER 0–3 và 12+ tháng kinh nghiệm liên quan." },
      bullets: [
        { en: "No EE profile required (base nomination path).", fr: "Sans profil EE.", vi: "Không bắt buộc hồ sơ EE." },
        { en: "Language: CLB 6 (TEER 0–1), CLB 5 (TEER 2–3) typical.", fr: "CLB selon TEER.", vi: "CLB theo TEER." },
        { en: "Community Pilot ended — use Skilled Worker / Critical Impact only.", fr: "Community Pilot terminé.", vi: "Community Pilot đã kết thúc." },
      ],
    },
    {
      desc: { en: "Critical Impact Worker — TEER 4–5 with Yukon employer; 6+ months experience in role.", fr: "Critical Impact TEER 4–5.", vi: "Critical Impact Worker — TEER 4–5, 6+ tháng kinh nghiệm." },
      bullets: [
        { en: "Minimum CLB 4 language typical.", fr: "CLB 4 minimum.", vi: "Thường tối thiểu CLB 4." },
        { en: "Employer-driven EOI priority grid (20-point employer scoring).", fr: "Grille priorité EOI employeur (20 points).", vi: "Lưới ưu tiên EOI employer (20 điểm)." },
        { en: "Business Nominee uses separate 103-point entrepreneur grid.", fr: "Nommé affaires : grille 103 points.", vi: "Business Nominee: lưới 103 điểm riêng." },
      ],
    },
  ],
  ns: [
    {
      desc: {
        en: "At least one year of paid, skilled work in Nova Scotia while holding an active Express Entry profile.",
        fr: "Au moins un an de travail qualifié rémunéré en N.-É. avec profil Entrée express actif.",
        vi: "Ít nhất một năm làm skilled có lương tại Nova Scotia và hồ sơ Express Entry đang hoạt động.",
      },
      bullets: [
        { en: "Work must be TEER 0–3 (or stream-listed NOC) and legally authorized in NS.", fr: "Travail TEER 0–3 (ou NOC du volet), statut légal en N.-É.", vi: "Việc TEER 0–3 (hoặc NOC trong luồng), status hợp pháp tại NS." },
        { en: "Language and adaptability rules match the NS Experience category on NSOI.", fr: "Langue et adaptabilité selon la catégorie Expérience NSOI.", vi: "Ngôn ngữ và adaptability theo category Experience trên NSOI." },
        { en: "After nomination, complete NS and federal stages before EE profile expires.", fr: "Après nomination : étapes N.-É. et fédérales avant expiration EE.", vi: "Sau đề cử: hoàn tất bước NS và liên bang trước khi EE hết hạn." },
      ],
    },
    {
      desc: {
        en: "You cannot apply proactively — NSOI selects profiles from the Express Entry pool when a sector is in shortage.",
        fr: "Pas de demande proactive — NSOI sélectionne dans le bassin EE selon pénuries sectorielles.",
        vi: "Không tự nộp — NSOI chọn hồ sơ trong pool Express Entry khi thiếu hụt theo ngành.",
      },
      bullets: [
        { en: "A Nova Scotia Letter of Interest must appear in your EE account for that LMP round.", fr: "Lettre d'intérêt N.-É. requise dans votre compte EE.", vi: "Phải có thư Letter of Interest của NS trong tài khoản EE." },
        { en: "Each announcement lists eligible NOCs, language, and experience — you must match that notice.", fr: "Chaque avis fixe NOC, langue et expérience admissibles.", vi: "Mỗi thông báo nêu NOC, ngôn ngữ, kinh nghiệm — phải khớp đúng thông báo." },
        { en: "Respond within the deadline in the letter; cut-offs and ITAs are in Recent draws.", fr: "Répondre avant l'échéance; seuils et ITA dans Tirages récents.", vi: "Phản hồi trước hạn trong thư; ngưỡng và ITA xem Recent draws." },
      ],
    },
    {
      desc: {
        en: "International medical graduates or specialists recruited to fill NS health system vacancies.",
        fr: "Diplômés médicaux internationaux ou spécialistes recrutés pour postes vacants en N.-É.",
        vi: "Bác sĩ/quy chuyên khoa quốc tế được tuyển vào vị trí trống hệ y tế NS.",
      },
      bullets: [
        { en: "Signed return-of-service or employment agreement with NS Health or an approved authority.", fr: "Entente de service ou d'emploi avec Santé N.-É. ou autorité approuvée.", vi: "Thỏa thuận return-of-service hoặc employment với NS Health hoặc cơ quan được duyệt." },
        { en: "Eligible medical licence or licensure pathway recognized in Nova Scotia.", fr: "Permis médical admissible ou parcours de licence reconnu.", vi: "Giấy phép hành nghề hoặc lộ trình cấp phép được NS công nhận." },
        { en: "Not the same entry rules as Experience or LMP — health stream documentation applies.", fr: "Règles distinctes d'Expérience ou LMP — dossier santé.", vi: "Khác luồng Experience/LMP — hồ sơ theo quy trình y tế." },
      ],
    },
    {
      desc: {
        en: "Permanent, full-time job from a Nova Scotia employer when the Skilled Worker category is accepting applications.",
        fr: "Emploi permanent à temps plein d'un employeur N.-É. lorsque la catégorie est ouverte.",
        vi: "Việc permanent full-time từ employer NS khi category Skilled Worker đang nhận hồ sơ.",
      },
      bullets: [
        { en: "Employer completes NSNP employer forms and shows genuine recruitment efforts.", fr: "Employeur : formulaires NSNP et efforts de recrutement.", vi: "Employer nộp form NSNP và chứng minh tuyển dụng thật." },
        { en: "Occupation TEER and wage must meet NSOI skilled worker criteria for your NOC.", fr: "TEER et salaire selon critères NSOI pour votre NOC.", vi: "TEER và lương đáp ứng tiêu chí Skilled Worker NSOI cho NOC của bạn." },
        { en: "Occupations in Demand and essential-worker sub-routes may add in-province experience rules.", fr: "Sous-volets « en demande » ou essentiels : règles d'expérience locales.", vi: "Luồng Occupations in Demand/essential worker có thể thêm quy tắc kinh nghiệm trong tỉnh." },
      ],
    },
  ],
  sk: [
    {
      desc: {
        en: "Active Express Entry profile; ranked on the 110-point ISW grid with EE-only invitation rounds.",
        fr: "Profil EE actif; grille ISW 110 points et tirages EE distincts.",
        vi: "Hồ sơ Express Entry active; lưới ISW 110 điểm và các đợt mời chỉ EE.",
      },
      bullets: [
        { en: "Sept 2026 example: min. 92, 145 ITAs.", fr: "Ex. sept. 2026 : min. 92, 145 ITA.", vi: "Ví dụ 09/2026: tối thiểu 92, 145 ITA." },
        { en: "TEER 0–3 NOC typical; meet SINP and IRCC minimums.", fr: "NOC TEER 0–3 typique; critères SINP et IRCC.", vi: "Thường NOC TEER 0–3; đáp ứng tối thiểu SINP và IRCC." },
        { en: "Accept provincial nomination in EE for +600 CRS.", fr: "Accepter la nomination dans EE : +600 CRS.", vi: "Chấp nhận đề cử trong EE: +600 CRS." },
      ],
    },
    {
      desc: {
        en: "No job offer when your NOC is on the live In-Demand list and skilled experience criteria are met.",
        fr: "Sans offre si NOC sur la liste en demande et expérience requise.",
        vi: "Không cần job offer nếu NOC trong danh sách In-Demand và đủ kinh nghiệm skilled.",
      },
      bullets: [
        { en: "Same 110-point grid; OID occupation list and cut-offs differ from EE.", fr: "Même grille 110 pts; listes et seuils OID ≠ EE.", vi: "Cùng lưới 110 điểm; danh sách và ngưỡng OID khác EE." },
        { en: "Confirm NOC on the official OID list before EOI.", fr: "Confirmer le NOC sur la liste OID officielle.", vi: "Xác nhận NOC trên danh sách OID trước EOI." },
        { en: "Settlement funds and regulated-occupation licensing still required.", fr: "Fonds d'établissement et permis si réglementé.", vi: "Vẫn cần vốn định cư và giấy phép nghề regulated." },
      ],
    },
    {
      calcDisclaimer: {
        en: "Hard-to-Fill Skills Pilot nominations are employer-driven and assessed against pilot and community criteria on saskatchewan.ca—not the International Skilled Worker 110-point points grid.",
        fr: "Le pilote compétences difficiles à combler est évalué selon les critères du pilote et de la communauté (saskatchewan.ca), pas la grille TQI de 110 points.",
        vi: "Hard-to-Fill Skills Pilot do employer đánh giá theo tiêu chí pilot/cộng đồng trên saskatchewan.ca — không dùng lưới 110 điểm International Skilled Worker.",
      },
      desc: {
        en: "Employer-led pilot for TEER 4–5 roles in participating communities.",
        fr: "Pilote employeur TEER 4–5 dans des communautés participantes.",
        vi: "Pilot do employer cho TEER 4–5 tại cộng đồng tham gia.",
      },
      bullets: [
        { en: "Permanent full-time offer from an approved pilot employer.", fr: "Offre permanente d'un employeur du pilote.", vi: "Job offer permanent từ employer pilot được duyệt." },
        { en: "Smaller targeted draws — watch SINP announcements.", fr: "Tirages ciblés plus petits.", vi: "Rút thăm mục tiêu, quy mô nhỏ — theo dõi SINP." },
      ],
    },
    {
      calcDisclaimer: {
        en: "Saskatchewan Experience is a separate SINP category: sub-streams (existing worker, graduate, hospitality, long-haul truck driver, etc.) have their own work-hour, job-offer, and licensing rules—no 110-point ISW assessment.",
        fr: "Expérience saskatchewanaise : catégorie distincte avec sous-volets (travailleur, diplômé, hôtellerie, camionneur, etc.) et règles propres—sans grille TQI de 110 points.",
        vi: "Saskatchewan Experience là category SINP riêng: các luồng con (worker, graduate, hospitality, tài xế đường dài…) có quy tắc giờ làm/job offer/giấy phép riêng — không dùng chấm 110 điểm ISW.",
      },
      desc: {
        en: "Already in Saskatchewan with qualifying work history or a recent eligible credential.",
        fr: "Déjà en Saskatchewan : travail ou diplôme admissible.",
        vi: "Đang ở Saskatchewan với lịch sử làm việc hoặc bằng cấp đủ điều kiện.",
      },
      bullets: [
        { en: "Skilled Worker: typically 6+ months with a SK employer.", fr: "Travailleur qualifié : ~6+ mois employeur SK.", vi: "Skilled Worker: thường 6+ tháng với employer SK." },
        { en: "Student: eligible SK credential plus field-related job offer.", fr: "Étudiant : diplôme SK + offre liée.", vi: "Student: bằng SK + job offer đúng ngành." },
        { en: "Hospitality and long-haul truck driver routes have extra hour/licensing rules.", fr: "Hôtellerie et camionneurs : règles d'heures.", vi: "Hospitality và tài xế đường dài: quy tắc giờ/giấy phép riêng." },
      ],
    },
  ],
};

window.PNP_STREAM_ITEM_DETAILS = PNP_STREAM_ITEM_DETAILS;
