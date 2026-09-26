/** Intake / closure banners shown above stream eligibility. */
const PNP_PROGRAM_STATUS = {
  oinp: {
    tone: "closed",
    title: { en: "Several OINP streams paused or closed", fr: "Plusieurs volets OINP suspendus ou fermés", vi: "Một số luồng OINP tạm dừng hoặc đóng" },
    message: {
      en: "Several OINP streams (including Masters/PhD Graduate and some employer-linked categories) close or pause without long notice. Confirm which streams accept new EOIs on the official OINP page before you register or decline a job offer timeline.",
      fr: "Plusieurs volets OINP (dont maîtrise/doctorat) ferment ou suspendent sans préavis. Vérifiez ontario.ca avant de déposer un EOI.",
      vi: "Một số luồng OINP (gồm Masters/PhD và employer) đóng hoặc tạm dừng đột ngột. Xác nhận luồng đang mở trên ontario.ca trước khi đăng ký EOI.",
    },
  },
  ynp: {
    tone: "closed",
    title: { en: "2026 employer EOI windows closed", fr: "Périodes EOI employeur 2026 fermées", vi: "Các đợt EOI employer 2026 đã đóng" },
    message: {
      en: "Yukon’s January and July 2026 employer EOI intake periods are closed. New worker nominations depend on the next announced window and the 282-spot annual allocation—employers submit EOIs, not candidates directly.",
      fr: "Les périodes EOI employeur de janvier et juillet 2026 sont fermées. Quota annuel de 282 nominations.",
      vi: "Đợt EOI employer tháng 1 và 7/2026 đã đóng. Chỉ tiêu 282 đề cử/năm; employer nộp EOI, không phải ứng viên trực tiếp.",
    },
  },
  ns: {
    tone: "warning",
    title: { en: "Invitation-only streams are common", fr: "Volets sur invitation fréquents", vi: "Nhiều luồng chỉ mời (invitation-only)" },
    message: {
      en: "Labour Market Priorities and some NSOI pathways require a letter of interest in your Express Entry account—you cannot self-nominate. Skilled Worker and physician streams have separate employer or licensing rules; confirm which stream is open on novascotiaimmigration.com.",
      fr: "Les priorités marché du travail exigent une lettre d'intérêt dans Entrée express. Vérifiez novascotiaimmigration.com.",
      vi: "Labour Market Priorities cần thư mời trong Express Entry — không tự đề cử. Xác nhận luồng đang mở trên novascotiaimmigration.com.",
    },
  },
  nt: {
    tone: "warning",
    title: { en: "Employer-driven draws only", fr: "Tirages via employeur seulement", vi: "Chỉ rút thăm employer-driven" },
    message: {
      en: "NTNP employer-driven EOIs are submitted by your NWT employer when a draw is scheduled. There is no always-open self-registration like larger provinces.",
      fr: "Les EOI NTNP sont déposés par l'employeur lors d'un tirage prévu.",
      vi: "EOI NTNP do employer nộp khi có đợt rút; không đăng ký mở liên tục như tỉnh lớn.",
    },
  },
};

window.PNP_PROGRAM_STATUS = PNP_PROGRAM_STATUS;
