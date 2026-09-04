import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import contactInfo, { type ContactChannel } from "../../data/contact";
import { Reveal } from "../ui/Animations";

// قائمة قنوات التواصل المعلقة بحبال فاخرة
const channels: (ContactChannel & {
  category: "direct" | "social";
  duration: number;
  delay: number;
  initialRotate: number;
})[] = [
  {
    id: "whatsapp",
    title: "واتساب المبيعات والمشاريع",
    subtitle: "محادثة فورية مع المهندس المختص",
    handle: contactInfo.whatsapp,
    url: `https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(contactInfo.whatsappMessage)}`,
    type: "whatsapp",
    badge: "متاح الآن • رد فوري",
    color: "#25D366",
    accentGlow: "rgba(37, 211, 102, 0.25)",
    ropeLength: 75,
    category: "direct",
    duration: 4.8,
    delay: 0,
    initialRotate: -1.3,
  },
  {
    id: "phone",
    title: "الاتصال المباشر",
    subtitle: "خدمة العملاء والاستشارات الفنية",
    handle: contactInfo.phone,
    url: `tel:${contactInfo.phone}`,
    type: "phone",
    badge: "أوقات الدوام الرسمي",
    color: "#D4AF37",
    accentGlow: "rgba(212, 175, 55, 0.25)",
    ropeLength: 85,
    category: "direct",
    duration: 5.2,
    delay: 0.3,
    initialRotate: 1.2,
  },
  {
    id: "email",
    title: "البريد الإلكتروني الرسمي",
    subtitle: "استقبال عروض الأسعار والمناقصات",
    handle: contactInfo.email,
    url: `mailto:${contactInfo.email}`,
    type: "email",
    badge: "مراسلات رسمية",
    color: "#E6C687",
    accentGlow: "rgba(230, 198, 135, 0.25)",
    ropeLength: 70,
    category: "direct",
    duration: 4.6,
    delay: 0.6,
    initialRotate: -1.1,
  },
  {
    id: "maps",
    title: "المقر الرئيسي (جدة)",
    subtitle: "حي البلد - أمام مسجد بشير",
    handle: "عرض الموقع على الخريطة",
    url: contactInfo.mapLink,
    type: "maps",
    badge: "المقر الميداني",
    color: "#EA4335",
    accentGlow: "rgba(234, 67, 53, 0.25)",
    ropeLength: 80,
    category: "direct",
    duration: 5.0,
    delay: 0.2,
    initialRotate: 1.4,
  },
  {
    id: "instagram",
    title: "إنستغرام المشاريع",
    subtitle: "معارض حية وتوثيق للأعمال الفاخرة",
    handle: "@tenthpower_sa",
    url: contactInfo.social.instagram,
    type: "instagram",
    badge: "معرض الصور",
    color: "#E1306C",
    accentGlow: "rgba(225, 48, 108, 0.25)",
    ropeLength: 85,
    category: "social",
    duration: 4.9,
    delay: 0.4,
    initialRotate: -1.2,
  },
  {
    id: "linkedin",
    title: "لينكد إن (LinkedIn)",
    subtitle: "الشراكات المؤسسية والمشاريع الكبرى",
    handle: "Tenth Power Contracting",
    url: contactInfo.social.linkedin,
    type: "linkedin",
    badge: "أعمال مؤسسية",
    color: "#0A66C2",
    accentGlow: "rgba(10, 102, 194, 0.25)",
    ropeLength: 75,
    category: "social",
    duration: 5.4,
    delay: 0.7,
    initialRotate: 1.1,
  },
  {
    id: "twitter",
    title: "منصة إكس (Twitter)",
    subtitle: "أحدث المستجدات والبيانات الرسمية",
    handle: "@tenthpower_sa",
    url: contactInfo.social.twitter,
    type: "twitter",
    badge: "الأخبار الرسمية",
    color: "#111111",
    accentGlow: "rgba(0, 0, 0, 0.15)",
    ropeLength: 80,
    category: "social",
    duration: 4.7,
    delay: 0.1,
    initialRotate: -1.3,
  },
  {
    id: "snapchat",
    title: "سناب شات الميداني",
    subtitle: "تغطيات حية ويوميات من مواقع العمل",
    handle: "tenthpower_sa",
    url: contactInfo.social.snapchat,
    type: "snapchat",
    badge: "تغطيات حية",
    color: "#FFFC00",
    accentGlow: "rgba(255, 252, 0, 0.25)",
    ropeLength: 85,
    category: "social",
    duration: 5.1,
    delay: 0.5,
    initialRotate: 1.3,
  },
  {
    id: "tiktok",
    title: "تيك توك الإنشائي",
    subtitle: "فيديوهات مراحل البناء والتشطيب",
    handle: "@tenthpower_sa",
    url: contactInfo.social.tiktok,
    type: "tiktok",
    badge: "فيديوهات قصيرة",
    color: "#00F2FE",
    accentGlow: "rgba(0, 242, 254, 0.25)",
    ropeLength: 75,
    category: "social",
    duration: 4.8,
    delay: 0.8,
    initialRotate: -1.1,
  },
];

export default function ContactSection() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  function copyToClipboard(text: string, label: string) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setToastMessage(`تم نسخ ${label} بنجاح ✓`);
      setTimeout(() => setToastMessage(null), 2500);
    }
  }

  return (
    <section
      id="contact"
      className="section relative overflow-hidden bg-white text-[var(--color-primary)] border-t border-[var(--color-border)]"
      style={{
        backgroundImage: `
          radial-gradient(ellipse at 50% 0%, rgba(212, 175, 55, 0.08) 0%, transparent 60%),
          linear-gradient(180deg, #ffffff 0%, #fafaf8 100%)
        `,
      }}
    >
      {/* Decorative subtle architectural dots */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #8b6914 1px, transparent 0)`,
          backgroundSize: "28px 28px",
        }}
      />

      <div className="container relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-6 md:mb-8">
          <Reveal>
            <p className="section-number mb-2 text-[var(--color-accent)]">06</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--color-primary)] mb-3">
              تواصل معنا
            </h2>
            <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent mx-auto mb-3" />
            <p className="text-[var(--color-muted)] text-sm md:text-base leading-relaxed">
              اختر وسيلتك المفضلة للتواصل مع فريقنا الهندسي أو متابعة تغطيات مشاريعنا الحية عبر كافة المنصات.
            </p>
            <div className="inline-flex items-center gap-2 mt-2.5 px-3.5 py-1.5 rounded-full bg-[#fbf8f0] border border-[#e8ddc2] text-[var(--color-accent)] text-xs font-medium">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>اسحب البطاقات المعلقة بالماوس أو انقر عليها للفتح المباشر</span>
            </div>
          </Reveal>
        </div>

        {/* Suspended Hanging Cards Grid with Gallery Wall Mounts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-6 pt-2">
          {channels.map((channel, index) => (
            <HangingCard
              key={channel.id}
              channel={channel}
              index={index}
              onCopy={copyToClipboard}
            />
          ))}
        </div>

        {/* Bottom Headquarters Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 md:mt-10 p-6 md:p-8 rounded-none border border-[var(--color-border)] bg-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_12px_35px_rgba(0,0,0,0.06)] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-1.5 h-full bg-[var(--color-accent)]" />
          <div className="flex items-center gap-4 text-right">
            <div className="w-12 h-12 rounded-full bg-[#fdfbf6] border border-[var(--color-accent)]/40 flex items-center justify-center shrink-0 text-[var(--color-accent)] shadow-sm">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div>
              <p className="text-[11px] text-[var(--color-accent)] uppercase tracking-wider font-semibold">
                المقر الرئيسي والمكتب الهندسي
              </p>
              <p className="text-sm md:text-base text-[var(--color-primary)] font-medium mt-0.5">
                {contactInfo.address}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={contactInfo.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-[var(--color-primary)] text-white text-xs md:text-sm font-medium hover:bg-[var(--color-accent)] transition-colors duration-200 flex items-center gap-2 active:scale-95 shadow-md"
            >
              <span>فتح في خرائط Google</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Copy Toast Feedback */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#1e1e1e] text-white border border-[var(--color-accent)] px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 text-sm font-medium"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// =========================================================================
// المكون المعلق بالحبال وحركته الفيزيائية الفخمة (Hanging Plaque with Physics)
// =========================================================================
function HangingCard({
  channel,
  index,
  onCopy,
}: {
  channel: (typeof channels)[0];
  index: number;
  onCopy: (text: string, label: string) => void;
}) {
  return (
    <div className="flex flex-col items-center">
      {/* 1. Architectural Brass Wall Standoff Peg (مسمار التثبيت الجداري المذهب الفاخر) */}
      <div className="relative flex flex-col items-center z-20">
        {/* Outer Brass Rosette Flange */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#e6c687] via-[#b8891a] to-[#4a3403] p-[1.5px] shadow-[0_4px_12px_rgba(139,105,20,0.28)] flex items-center justify-center">
          {/* Inner Machined Brass Plate */}
          <div className="w-full h-full rounded-full bg-gradient-to-br from-[#fff7d6] via-[#d4af37] to-[#7a5808] flex items-center justify-center shadow-inner">
            {/* Center Fixing Bolt Head */}
            <div className="w-2.5 h-2.5 rounded-full bg-[#3d2a02] border border-[#d4af37]/80 shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]" />
          </div>
        </div>
        {/* Heavy-Duty Solid Brass Hook Ring */}
        <div className="w-5 h-5 -mt-2 rounded-b-full border-[2.5px] border-[#d4af37] bg-[#fbf9f4] shadow-xs flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-[#8b6914]" />
        </div>
      </div>

      {/* 2. Physics-based Swinging Container (الحبل واللوحة المعلقة مع حركة التأرجح) */}
      <motion.div
        className="w-full flex flex-col items-center"
        initial={{ y: -60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{
          type: "spring",
          stiffness: 75,
          damping: 15,
          mass: 1.1,
          delay: index * 0.07,
        }}
      >
        <motion.div
          className="w-full flex flex-col items-center cursor-grab active:cursor-grabbing select-none"
          style={{
            transformOrigin: "top center", // ارتكاز التأرجح من مسمار الحائط كحبل حقيقي
          }}
          animate={{
            rotate: [channel.initialRotate, -channel.initialRotate, channel.initialRotate],
          }}
          transition={{
            rotate: {
              duration: channel.duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: channel.delay,
            },
          }}
          drag="x"
          dragConstraints={{ left: -30, right: 30 }}
          dragElastic={0.2}
          whileDrag={{ scale: 1.02 }}
          whileHover={{
            scale: 1.015,
            transition: { type: "spring", stiffness: 350, damping: 20 },
          }}
        >
          {/* Realistic High-Definition Braided Cord (حبال مجدولة ذهبية واضحة وبارزة) */}
          <div className="relative flex items-center justify-center">
            <svg
              width="56"
              height={channel.ropeLength}
              className="overflow-visible"
              style={{ filter: "drop-shadow(2px 6px 8px rgba(0,0,0,0.18))" }}
            >
              <defs>
                {/* Metallic Golden Rope Gradient */}
                <linearGradient id={`goldRopeGrad-${channel.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#634503" />
                  <stop offset="25%" stopColor="#b8891a" />
                  <stop offset="50%" stopColor="#fae98f" />
                  <stop offset="75%" stopColor="#d4af37" />
                  <stop offset="100%" stopColor="#4a3302" />
                </linearGradient>

                {/* Braided Spiral Texture Pattern */}
                <pattern
                  id={`spiralBraid-${channel.id}`}
                  width="10"
                  height="12"
                  patternUnits="userSpaceOnUse"
                  patternTransform="rotate(35)"
                >
                  <line x1="0" y1="0" x2="0" y2="12" stroke="#2e1f02" strokeWidth="2.5" />
                  <line x1="5" y1="0" x2="5" y2="12" stroke="#fff4b8" strokeWidth="2" />
                  <line x1="2" y1="0" x2="2" y2="12" stroke="#b8891a" strokeWidth="1.5" />
                </pattern>
              </defs>

              {/* Left Twisted Rope */}
              <rect
                x="15"
                y="0"
                width="5"
                height={channel.ropeLength}
                rx="2.5"
                fill={`url(#goldRopeGrad-${channel.id})`}
              />
              <rect
                x="15"
                y="0"
                width="5"
                height={channel.ropeLength}
                rx="2.5"
                fill={`url(#spiralBraid-${channel.id})`}
                opacity="0.85"
              />

              {/* Right Twisted Rope */}
              <rect
                x="36"
                y="0"
                width="5"
                height={channel.ropeLength}
                rx="2.5"
                fill={`url(#goldRopeGrad-${channel.id})`}
              />
              <rect
                x="36"
                y="0"
                width="5"
                height={channel.ropeLength}
                rx="2.5"
                fill={`url(#spiralBraid-${channel.id})`}
                opacity="0.85"
              />

              {/* Polished Brass Rope Clamp / Spacer (كلبس ذهبي يجمع الحبلين) */}
              <rect
                x="12"
                y={channel.ropeLength * 0.45}
                width="32"
                height="6"
                rx="2"
                fill="#d4af37"
                stroke="#664603"
                strokeWidth="1"
              />
              <circle cx="28" cy={channel.ropeLength * 0.45 + 3} r="1.5" fill="#3d2a02" />
            </svg>
          </div>

          {/* Solid Brass Eyelet Rings on top of Plaque (حلقات وصل البطاقة المعدنية) */}
          <div className="flex gap-6 -mb-1 z-10">
            <div className="w-4 h-4 rounded-full border-[2.5px] border-[#d4af37] bg-[#fbf9f4] shadow-xs flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#8b6914]" />
            </div>
            <div className="w-4 h-4 rounded-full border-[2.5px] border-[#d4af37] bg-[#fbf9f4] shadow-xs flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#8b6914]" />
            </div>
          </div>

        {/* 3. The Hanging Luxury Plaque / Card (اللوحة الفاخرة المعلقة) */}
        <div
          className="w-full relative group rounded-none overflow-hidden transition-all duration-300 bg-white border border-[#e5dfcf] hover:border-[var(--color-accent)] shadow-[0_12px_28px_rgba(0,0,0,0.07)] hover:shadow-[0_20px_45px_rgba(139,105,20,0.16)]"
        >
          {/* Subtle Ambient Glow from Platform */}
          <div
            className="absolute -top-12 -left-12 w-32 h-32 rounded-full pointer-events-none blur-3xl opacity-10 group-hover:opacity-25 transition-opacity duration-500"
            style={{ backgroundColor: channel.color }}
          />

          {/* Top Gold Accent Line */}
          <div className="h-[2.5px] w-full bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />

          {/* Card Content */}
          <div className="p-5 flex flex-col justify-between min-h-[190px]">
            {/* Top Row: Icon & Status Badge */}
            <div className="flex items-start justify-between gap-3 mb-4">
              {/* Platform Glowing Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-[#e8dfc8] bg-[#fbf9f4] shadow-sm transition-transform duration-300 group-hover:scale-110"
                style={{
                  boxShadow: `0 4px 14px ${channel.accentGlow}`,
                }}
              >
                <ChannelIcon type={channel.type} color={channel.color} />
              </div>

              {/* Status Pill */}
              <span className="text-[10px] font-medium px-2.5 py-1 rounded-full border border-[#ebe3cf] bg-[#fbf9f2] text-[var(--color-accent)] flex items-center gap-1.5 shadow-xs">
                <span
                  className="w-1.5 h-1.5 rounded-full shadow-xs"
                  style={{ backgroundColor: channel.color }}
                />
                {channel.badge}
              </span>
            </div>

            {/* Middle Row: Titles */}
            <div>
              <h3 className="text-base font-bold text-[var(--color-primary)] group-hover:text-[var(--color-accent)] transition-colors duration-200">
                {channel.title}
              </h3>
              <p className="text-xs text-[var(--color-muted)] mt-1 line-clamp-1">
                {channel.subtitle}
              </p>
              <p className="text-[11px] font-mono text-[var(--color-accent)] font-medium mt-1" dir="ltr">
                {channel.handle}
              </p>
            </div>

            {/* Bottom Row: Action Links */}
            <div className="mt-4 pt-3 border-t border-[var(--color-border)]/60 flex items-center justify-between gap-2">
              <a
                href={channel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 px-3 text-xs font-semibold text-center rounded-none bg-[var(--color-surface-2)] text-[var(--color-primary)] hover:bg-[var(--color-accent)] hover:text-white transition-all duration-200 border border-[var(--color-border)] hover:border-transparent flex items-center justify-center gap-1.5 active:scale-95 shadow-xs"
              >
                <span>فتح الرابط</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                </svg>
              </a>

              {/* Copy quick button */}
              <button
                type="button"
                onClick={() => onCopy(channel.handle, channel.title)}
                title="نسخ المعرف / الرقم"
                className="p-2 text-[var(--color-muted)] hover:text-[var(--color-primary)] bg-[var(--color-surface-2)] hover:bg-[#edece6] border border-[var(--color-border)] transition-colors"
                aria-label={`نسخ ${channel.title}`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                </svg>
              </button>
            </div>
          </div>

          {/* Bottom Gold Accent Corner */}
          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-[var(--color-accent)]/60 pointer-events-none" />
        </div>
      </motion.div>
      </motion.div>
    </div>
  );
}

// =========================================================================
// SVG Platform Icons (أيقونات المنصات فائقة الدقة)
// =========================================================================
function ChannelIcon({ type, color }: { type: ContactChannel["type"]; color: string }) {
  switch (type) {
    case "whatsapp":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={color}>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      );
    case "phone":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
          <path
            d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.7 11.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012.62 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.6a16 16 0 006.29 6.29l.97-.97a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "email":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      );
    case "maps":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );
    case "instagram":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2.5" />
        </svg>
      );
    case "linkedin":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill={color}>
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.46c-.92 0-1.66.74-1.66 1.66 0 .92.74 1.67 1.66 1.67.92 0 1.66-.75 1.66-1.67 0-.92-.74-1.66-1.66-1.66z" />
        </svg>
      );
    case "twitter":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill={color}>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "snapchat":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill={color}>
          <path d="M12.005 2c-3.792 0-5.698 2.534-5.698 4.793 0 .748.163 1.832.348 2.454.123.413-.024.577-.282.721-.433.242-1.256.495-1.748.972-.405.393-.418.96-.036 1.341.696.697 1.764.717 2.476 1.382.417.391.24 1.056-.05 1.55-.42.716-1.42 1.503-2.196 2.012-.34.223-.52.564-.47.962.062.484.455.772.932.772.33 0 .73-.133 1.25-.427.755-.426 1.72-.516 2.584-.047.88.478 1.93.928 2.89.928s2.01-.45 2.89-.928c.864-.469 1.829-.379 2.584.047.52.294.92.427 1.25.427.477 0 .87-.288.932-.772.05-.398-.13-.739-.47-.962-.776-.509-1.776-1.296-2.196-2.012-.29-.494-.467-1.159-.05-1.55.712-.665 1.78-.685 2.476-1.382.382-.381.369-.948-.036-1.341-.492-.477-1.315-.73-1.748-.972-.258-.144-.405-.308-.282-.721.185-.622.348-1.706.348-2.454C17.703 4.534 15.797 2 12.005 2z" />
        </svg>
      );
    case "tiktok":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill={color}>
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
        </svg>
      );
    default:
      return null;
  }
}
