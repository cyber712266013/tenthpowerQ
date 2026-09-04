// ===================================================
// بيانات التواصل — عدّل هذا الملف بالبيانات الرسمية
// ===================================================

export interface ContactChannel {
  id: string;
  title: string;
  subtitle: string;
  handle: string;
  url: string;
  type: "whatsapp" | "phone" | "email" | "maps" | "instagram" | "twitter" | "linkedin" | "snapchat" | "tiktok";
  badge: string;
  color: string;
  accentGlow: string;
  ropeLength: number; // rope visual length in px
}

export const contactInfo = {
  // --- البيانات الرسمية ---
  phone: "+966 50 000 0000",
  whatsapp: "966500000000",
  whatsappMessage: "مرحباً، أود الاستفسار عن خدمات ومشاريع مؤسسة القوة العاشرة للمقاولات",
  email: "info@tenth-power.com",
  address: "المملكة العربية السعودية، جدة - حي البلد - الشارع الرئيسي أمام مسجد بشير",
  mapLink: "https://maps.google.com/?q=Jeddah+Saudi+Arabia",

  // روابط التواصل الاجتماعي
  social: {
    instagram: "https://instagram.com/tenthpower_sa",
    twitter: "https://x.com/tenthpower_sa",
    linkedin: "https://linkedin.com/company/tenthpower-sa",
    snapchat: "https://snapchat.com/add/tenthpower_sa",
    tiktok: "https://tiktok.com/@tenthpower_sa",
  },

  whatsappBusinessCatalog: "",
};

export default contactInfo;
