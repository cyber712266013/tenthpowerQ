# القوة العاشرة — الكتالوج الإلكتروني

**كتالوج إلكتروني مؤسسي احترافي لمؤسسة القوة العاشرة للمقاولات العامة**

---

## تشغيل المشروع محلياً

```bash
# تثبيت الحزم
npm install

# تشغيل بيئة التطوير
npm run dev
```

افتح المتصفح على: `http://localhost:5173`

---

## بناء المشروع للنشر

```bash
npm run build
```

ستجد ملفات الموقع النهائية في مجلد `dist/`.

للمعاينة المحلية قبل النشر:
```bash
npm run preview
```

---

## إضافة مشروع جديد

افتح الملف: `src/data/projects.ts`

انسخ أحد الكائنات الموجودة وعدّل قيمه:

```ts
{
  id: "p7",                          // رقم فريد
  slug: "project-name",              // رابط URL (بالإنجليزية فقط، بدون مسافات)
  title: "اسم المشروع",
  category: "مباني",                 // التصنيف بالعربي
  categorySlug: "building",          // التصنيف بالإنجليزي (من categories)
  location: "جدة",
  year: "2024",
  shortDescription: "وصف قصير",
  description: "وصف تفصيلي للمشروع...",
  scope: ["نطاق عمل 1", "نطاق عمل 2"],
  coverImage: "/images/projects/p7/cover.jpg",   // ضع الصورة في public/
  images: [
    "/images/projects/p7/01.jpg",
    "/images/projects/p7/02.jpg",
  ],
  featured: true,                    // true = يظهر في الصفحة الرئيسية
}
```

**مكان الصور:** ضع صور المشروع في `public/images/projects/p7/`

---

## إضافة خدمة جديدة

افتح الملف: `src/data/services.ts`

أضف كائناً جديداً:

```ts
{
  id: "s7",
  slug: "service-name",               // رابط URL
  title: "اسم الخدمة",
  shortDescription: "وصف قصير",
  description: "وصف تفصيلي...",
  coverImage: "/images/services/new-service.jpg",
  scope: ["نطاق 1", "نطاق 2"],
  order: 7,                           // ترتيب الظهور
}
```

---

## تغيير معلومات المؤسسة

**الملف:** `src/data/company.ts`

يمكنك تعديل:
- `name` — الاسم الرسمي
- `tagline` — الشعار النصي
- `description` — وصف المؤسسة
- `stats` — الإحصائيات (أضف الأرقام الحقيقية)
- `vision`, `mission`, `values` — الرؤية والرسالة والقيم

---

## تغيير بيانات التواصل

**الملف:** `src/data/contact.ts`

```ts
export const contactInfo = {
  phone: "966512345678",        // رقم الهاتف بدون +
  whatsapp: "966512345678",     // رقم واتساب بدون +
  email: "info@example.com",
  address: "جدة، حي البلد...",
  // ...
}
```

> ⚠️ بمجرد تعبئة هذه القيم، تظهر أزرار التواصل تلقائياً في كل الصفحات.

---

## تغيير الشعار

1. ضع ملف الشعار في: `public/logo.svg` أو `public/logo.png`
2. افتح الملف: `src/components/layout/Header.tsx`
3. ابحث عن المقطع الذي يعرض "١٠" واستبدله بـ:

```tsx
<img src="/logo.svg" alt="شعار القوة العاشرة" className="h-10 w-auto" />
```

كرر الخطوة في: `src/components/layout/Footer.tsx`

---

## تغيير صور المشاريع والخدمات

ضع الصور في مجلد `public/` واتبع البنية التالية:

```
public/
├── images/
│   ├── hero.jpg                        # صورة Hero الرئيسية
│   ├── projects/
│   │   ├── p1/
│   │   │   ├── cover.jpg               # صورة غلاف المشروع
│   │   │   ├── 01.jpg
│   │   │   └── 02.jpg
│   │   └── p2/
│   │       └── ...
│   └── services/
│       ├── building.jpg
│       └── finishing.jpg
└── og-image.jpg                        # صورة Preview لوسائل التواصل
```

---

## نشر الموقع

### Vercel (موصى به)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# ثم ارفع مجلد dist/ إلى Netlify
```

### استضافة عادية (cPanel)

```bash
npm run build
# ارفع محتويات dist/ إلى مجلد public_html
```

> ⚠️ **مهم:** عند النشر على استضافة عادية، تأكد من إعداد Redirect لجميع الروابط إلى `index.html` لدعم React Router.
>
> أنشئ ملف `.htaccess` في المجلد الجذر:
> ```apache
> <IfModule mod_rewrite.c>
>   RewriteEngine On
>   RewriteBase /
>   RewriteRule ^index\.html$ - [L]
>   RewriteCond %{REQUEST_FILENAME} !-f
>   RewriteCond %{REQUEST_FILENAME} !-d
>   RewriteRule . /index.html [L]
> </IfModule>
> ```

---

## هيكل المشروع

```
src/
├── components/
│   ├── layout/        # Header, Footer, Layout
│   ├── sections/      # Hero, About, Services, WhyUs, Contact, ProjectsHighlight
│   └── ui/            # ProjectCard, ServiceCard, Lightbox, SectionTitle, WhatsAppButton
├── data/
│   ├── company.ts     # ← بيانات المؤسسة
│   ├── services.ts    # ← الخدمات
│   ├── projects.ts    # ← المشاريع
│   └── contact.ts     # ← التواصل
└── pages/             # Home, About, Services, Projects, Contact, NotFound
```

---

## الدعم التقني

- **React 18** + TypeScript
- **Vite 8** (بناء سريع)
- **Tailwind CSS v4**
- **Framer Motion** (animations)
- **React Router v6**
- **react-helmet-async** (SEO)
- RTL بالكامل
- Lazy Loading للصور
- Lightbox لمعرض الصور
- نموذج تواصل مدمج مع واتساب
- 404 مخصصة
- Mobile First Responsive
