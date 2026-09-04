// ===================================================
// بيانات المشاريع — عدّل هذا الملف بمشاريعك الحقيقية
// ===================================================

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  location: string;
  year: string;
  shortDescription: string;
  description: string;
  scope: string[];
  coverImage: string;
  images: string[];
  videoUrl?: string;
  featured: boolean;
}

export interface Category {
  id: string;
  slug: string;
  label: string;
}

export const categories: Category[] = [
  { id: "all", slug: "all", label: "جميع الأعمال" },
  { id: "building", slug: "building", label: "مباني" },
  { id: "finishing", slug: "finishing", label: "تشطيبات" },
  { id: "infrastructure", slug: "infrastructure", label: "بنية تحتية" },
  { id: "renovation", slug: "renovation", label: "ترميم" },
];

export const projects: Project[] = [
  {
    id: "p1",
    slug: "commercial-building-jeddah",
    title: "مبنى تجاري — جدة",
    category: "مباني",
    categorySlug: "building",
    location: "جدة",
    year: "2024",
    shortDescription: "تنفيذ مبنى تجاري متعدد الأدوار بمواصفات عالية في قلب جدة.",
    description:
      "مشروع إنشاء مبنى تجاري متعدد الأدوار في منطقة حيوية بجدة. تضمّن المشروع أعمال الحفر والأساسات والهيكل الإنشائي الكامل، وصولاً إلى التشطيبات الداخلية والخارجية والواجهات الزجاجية الحديثة. تم تنفيذ المشروع بأعلى معايير الجودة مع الالتزام التام بالجدول الزمني المتفق عليه.",
    scope: [
      "أعمال الحفر والأساسات",
      "الهيكل الإنشائي الكامل",
      "التشطيبات الداخلية والخارجية",
      "الأعمال الكهربائية والصحية",
      "الواجهات الزجاجية الحديثة",
    ],
    coverImage: "/images/ChatGPT Image Sep 3, 2026, 01_34_38 AM.png",
    images: [
      "/images/ChatGPT Image Sep 3, 2026, 01_34_38 AM.png",
      "/images/ChatGPT Image Sep 3, 2026, 01_38_18 AM.png",
      "/images/hero.png",
    ],
    featured: true,
  },
  {
    id: "p2",
    slug: "residential-finishing",
    title: "تشطيبات فيلا سكنية",
    category: "تشطيبات",
    categorySlug: "finishing",
    location: "جدة، حي الروضة",
    year: "2024",
    shortDescription: "تشطيبات فاخرة لفيلا سكنية شاملة الجبس والدهانات والأرضيات.",
    description:
      "تنفيذ أعمال تشطيبات شاملة لفيلا سكنية فاخرة، تضمّنت أعمال الجبس بالكامل، والدهانات الداخلية والخارجية، وتركيب الأرضيات والسيراميك، وتصميم وتركيب الأسقف الجبسية المعلقة. حرصنا على أن تعكس التشطيبات مستوى راقياً يتناسب مع توقعات العميل وطبيعة المبنى.",
    scope: [
      "أعمال الجبس الداخلي والخارجي",
      "الدهانات بأصناف عالية الجودة",
      "أرضيات السيراميك والرخام",
      "أسقف جبسية معلقة بتصاميم مخصصة",
      "أعمال الديكور الداخلي",
    ],
    coverImage: "/images/ChatGPT Image Sep 3, 2026, 01_38_18 AM.png",
    images: [
      "/images/ChatGPT Image Sep 3, 2026, 01_38_18 AM.png",
      "/images/ChatGPT Image Sep 3, 2026, 01_40_35 AM.png",
    ],
    featured: true,
  },
  {
    id: "p3",
    slug: "road-infrastructure",
    title: "مشروع بنية تحتية وطرق",
    category: "بنية تحتية",
    categorySlug: "infrastructure",
    location: "جدة",
    year: "2023",
    shortDescription: "تنفيذ شبكة طرق داخلية وبنية تحتية لمجمع سكني.",
    description:
      "تولّت مؤسسة القوة العاشرة تنفيذ مشروع شبكة الطرق الداخلية والبنية التحتية الكاملة لمجمع سكني، شمل تمهيد الأراضي وإنشاء الطرق الإسفلتية وشبكات الصرف الصحي والأرصفة والإنارة العامة. نُفِّذ المشروع وفق معايير أمانة جدة والمواصفات الحكومية المعتمدة.",
    scope: [
      "تمهيد الأراضي والحفريات",
      "إنشاء الطرق الإسفلتية",
      "شبكات الصرف الصحي",
      "الأرصفة والمسارات",
      "شبكة الإنارة الخارجية",
    ],
    coverImage: "/images/ChatGPT Image Sep 3, 2026, 01_40_35 AM.png",
    images: [
      "/images/ChatGPT Image Sep 3, 2026, 01_40_35 AM.png",
      "/images/hero.png",
    ],
    featured: false,
  },
  {
    id: "p4",
    slug: "building-renovation",
    title: "ترميم وتجديد مبنى تجاري",
    category: "ترميم",
    categorySlug: "renovation",
    location: "جدة، البلد",
    year: "2023",
    shortDescription: "ترميم شامل لمبنى تجاري قديم وتحديث واجهاته وداخله بالكامل.",
    description:
      "تنفيذ مشروع ترميم وتجديد شامل لمبنى تجاري ذي طابع تراثي في منطقة البلد، شمل إصلاح الشروخ الهيكلية وتجديد التشطيبات الداخلية والخارجية بالكامل، وتحديث المنظومات الكهربائية والصحية، وإعادة تصميم الواجهة لتتوافق مع الهوية المعمارية للمنطقة مع لمسة عصرية.",
    scope: [
      "تقييم الحالة الإنشائية",
      "إصلاح الشروخ والتلف الهيكلي",
      "تجديد التشطيبات الداخلية والخارجية",
      "تحديث المنظومات الكهربائية والصحية",
      "تجديد الواجهة الخارجية",
    ],
    coverImage: "/images/ChatGPT Image Sep 3, 2026, 01_44_45 AM.png",
    images: [
      "/images/ChatGPT Image Sep 3, 2026, 01_44_45 AM.png",
      "/images/ChatGPT Image Sep 3, 2026, 01_34_38 AM.png",
    ],
    featured: true,
  },
  {
    id: "p5",
    slug: "mixed-use-building",
    title: "مبنى متعدد الاستخدامات",
    category: "مباني",
    categorySlug: "building",
    location: "جدة",
    year: "2024",
    shortDescription: "إنشاء مبنى سكني تجاري من الأساس حتى التسليم.",
    description:
      "مشروع إنشاء مبنى متعدد الاستخدامات يجمع بين الاستخدامات التجارية في الأدوار الأرضية والسكنية في الأدوار العلوية. تمّ تنفيذ المشروع بالكامل من مرحلة الأساسات إلى التسليم النهائي، مع الاهتمام بكل تفصيل من تفاصيل البناء والتشطيبات.",
    scope: [
      "الأساسات والهيكل الإنشائي",
      "أعمال البناء والردم",
      "التشطيبات الداخلية والخارجية",
      "المصعد والمنظومات الميكانيكية",
      "الأعمال الكهربائية والصحية",
    ],
    coverImage: "/images/hero.png",
    images: [
      "/images/hero.png",
      "/images/ChatGPT Image Sep 3, 2026, 01_44_45 AM.png",
      "/images/ChatGPT Image Sep 3, 2026, 01_40_35 AM.png",
    ],
    featured: true,
  },
  {
    id: "p6",
    slug: "luxury-finishing",
    title: "تشطيبات فاخرة — مجمع سكني",
    category: "تشطيبات",
    categorySlug: "finishing",
    location: "جدة، حي الشاطئ",
    year: "2024",
    shortDescription: "أعمال تشطيب متكاملة لمجمع سكني فاخر.",
    description:
      "تنفيذ أعمال التشطيبات الكاملة لمجمع سكني فاخر يضم عدة وحدات، شملت الدهانات والجبس والأرضيات وأعمال الألمنيوم والزجاج والأسقف المعلقة. تميّز المشروع باستخدام مواد عالية الجودة وتفاصيل دقيقة تليق بمستوى المشروع.",
    scope: [
      "جبس صناعي وزخرفي",
      "دهانات داخلية بمواد ممتازة",
      "أرضيات رخام وسيراميك",
      "أسقف معلقة بتصاميم معمارية",
      "أعمال الألمنيوم والزجاج",
    ],
    coverImage: "/images/ChatGPT Image Sep 3, 2026, 01_38_18 AM.png",
    images: [
      "/images/ChatGPT Image Sep 3, 2026, 01_38_18 AM.png",
      "/images/ChatGPT Image Sep 3, 2026, 01_34_38 AM.png",
      "/images/ChatGPT Image Sep 3, 2026, 01_44_45 AM.png",
    ],
    featured: false,
  },
];

export default projects;
