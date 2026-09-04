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
  phone: "+966532438253",
  whatsapp: "966532438253",
  whatsappMessage: "مرحباً، أود الاستفسار عن خدمات ومشاريع مؤسسة القوة العاشرة للمقاولات",
  email: "zjajskryt78@gmail.com",
  address: "المملكة العربية السعودية، الرياض",
  mapLink: "https://maps.google.com/?q=Jeddah+Saudi+Arabia",

  // روابط التواصل الاجتماعي
  social: {
    instagram: "https://www.instagram.com/ZJJ4021",
    snapchat: "https://www.snapchat.com/add/zjjskryt24?share_id=dOfCOthKqmw&locale=ar-AE",
    tiktok: "https://www.tiktok.com/@user0532438253?_t=ZS-8zOaCY7q4xg&_r=1",
  },

  whatsappBusinessCatalog: "",
};

export default contactInfo;
