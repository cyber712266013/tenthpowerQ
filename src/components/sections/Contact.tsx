import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import contactInfo, { type ContactChannel } from "../../data/contact";
import { Reveal } from "../ui/Animations";

interface SuspendedChannel {
  id: string;
  title: string;
  subtitle: string;
  handle: string;
  url: string;
  type: ContactChannel["type"];
  color: string;
  accentGlow: string;
  ropeLength: number;
  duration: number;
  delay: number;
  swingAngle: number;
}

// Suspended platform channels with physical pendulum swaying parameters
const channels: SuspendedChannel[] = [
  {
    id: "whatsapp",
    title: "واتساب",
    subtitle: "محادثة فورية",
    handle: contactInfo.whatsapp,
    url: `https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(contactInfo.whatsappMessage)}`,
    type: "whatsapp",
    color: "#25D366",
    accentGlow: "rgba(37, 211, 102, 0.45)",
    ropeLength: 70,
    duration: 2.5,
    delay: -0.4,
    swingAngle: 6.5,
  },
  {
    id: "phone",
    title: "اتصال هاتفي",
    subtitle: "مكالمة مباشرة",
    handle: contactInfo.phone,
    url: `tel:${contactInfo.phone}`,
    type: "phone",
    color: "#D4AF37",
    accentGlow: "rgba(212, 175, 55, 0.45)",
    ropeLength: 85,
    duration: 2.9,
    delay: -1.3,
    swingAngle: 5.8,
  },
  {
    id: "instagram",
    title: "إنستغرام",
    subtitle: "معارض حية وتوثيق",
    handle: "@tenthpower_sa",
    url: contactInfo.social.instagram,
    type: "instagram",
    color: "#E1306C",
    accentGlow: "rgba(225, 48, 108, 0.45)",
    ropeLength: 75,
    duration: 2.4,
    delay: -1.9,
    swingAngle: 7.2,
  },
  {
    id: "email",
    title: "البريد الإلكتروني",
    subtitle: "عروض الأسعار والمناقصات",
    handle: contactInfo.email,
    url: `mailto:${contactInfo.email}`,
    type: "email",
    color: "#E6C687",
    accentGlow: "rgba(230, 198, 135, 0.45)",
    ropeLength: 82,
    duration: 2.8,
    delay: -0.8,
    swingAngle: 6.0,
  },
  {
    id: "maps",
    title: "المقر الرئيسي",
    subtitle: "جدة - البلد",
    handle: "خرائط Google",
    url: contactInfo.mapLink,
    type: "maps",
    color: "#EA4335",
    accentGlow: "rgba(234, 67, 53, 0.45)",
    ropeLength: 70,
    duration: 2.6,
    delay: -2.2,
    swingAngle: 6.6,
  },
 
];

export default function ContactSection() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  return (
    <section
      id="contact"
      className="relative overflow-hidden text-black rounded-t-3xl md:rounded-t-[3.5rem] pt-8 pb-10 sm:pt-14 sm:pb-16 md:pt-20 md:pb-20 mt-6 sm:mt-10 md:mt-16 border-t border-black shadow-2xl"
    >
      <div className="container relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 md:mb-16 px-2">
          <Reveal>
            <p className="text-xs sm:text-lg md:text-2xl font-serif text-[var(--color-accent)] mb-1 sm:mb-2 font-medium">
              تواصل معنا
            </p>
            <h2 className="text-base sm:text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-black mb-2 sm:mb-3">
              يسعدنا التعاون معك في مشروعك القادم
            </h2>
            <div className="w-10 sm:w-16 h-[1.5px] sm:h-[2px] bg-[var(--color-accent)] mx-auto mb-2 sm:mb-4" />
            <p className="text-black/60 text-[10px] sm:text-xs md:text-base leading-relaxed font-light">
              انقر على أيقونة المنصة للتواصل المباشر.
            </p>
          </Reveal>
        </div>

        {/* Suspended Platform Icons Row — Continuous Ambient Physics Sway */}
        <div className="flex flex-wrap sm:flex-nowrap items-start justify-center gap-2 sm:gap-5 md:gap-8 lg:gap-12 pb-6 sm:pb-8 overflow-x-auto max-w-full px-2">
          {channels.map((channel, index) => (
            <HangingPlatformIcon key={channel.id} channel={channel} index={index} />
          ))}
        </div>

        {/* Bottom Headquarters Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 sm:mt-12 md:mt-16 p-3 sm:p-6 md:p-8 rounded-xl border border-black/10 bg-white/[0.03] backdrop-blur-md flex flex-row items-center justify-between gap-3 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-1 sm:w-1.5 h-full bg-[var(--color-accent)]" />
          <div className="flex items-center gap-2.5 sm:gap-4 text-right">
            <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-black/10 border border-[var(--color-accent)]/40 flex items-center justify-center shrink-0 text-[var(--color-accent)] shadow-sm [&>svg]:w-4 [&>svg]:h-4 sm:[&>svg]:w-[22px] sm:[&>svg]:h-[22px]">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div>
              <p className="text-[9px] sm:text-[11px] text-[var(--color-accent)] uppercase tracking-wider font-semibold">
                المقر الرئيسي والمكتب الهندسي
              </p>
              <p className="text-[10px] sm:text-sm md:text-base text-black/90 font-medium mt-0.5">
                {contactInfo.address}
              </p>
            </div>
          </div>

         {/*  <div className="flex items-center gap-2 shrink-0">
            <a
              href={contactInfo.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 sm:px-6 sm:py-2.5 bg-[var(--color-accent)] text-white text-[9px] sm:text-xs md:text-sm font-medium hover:bg-[var(--color-accent-light)] transition-colors duration-200 flex items-center gap-1.5 rounded-sm sm:rounded-md shadow-md whitespace-nowrap"
            >
            <span>خرائط Google</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
              </svg>*
            </a>
          </div>*/} 
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
// Suspended Platform Icon Charm with Continuous Physics Pendulum Movement
// =========================================================================
function HangingPlatformIcon({
  channel,
}: {
  channel: (typeof channels)[0];
  index: number;
}) {
  return (
    <div className="flex flex-col items-center select-none relative group">
      {/* 1. Architectural Brass Wall Standoff Rivet / Bolt (Fixed Anchor) */}
      <div className="relative flex flex-col items-center z-20">
        <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-[#e6c687] via-[#b8891a] to-[#4a3403] p-[1px] sm:p-[1.5px] shadow-[0_3px_10px_rgba(212,175,55,0.35)] flex items-center justify-center">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-[#fff7d6] via-[#d4af37] to-[#7a5808] flex items-center justify-center shadow-inner">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#3d2a02] border border-[#d4af37]/80" />
          </div>
        </div>
        {/* Brass Hook Ring */}
        <div className="w-3 h-3 sm:w-4 sm:h-4 -mt-1 sm:-mt-1.5 rounded-b-full border-[1.5px] sm:border-[2px] border-[#d4af37] bg-[#181817] flex items-center justify-center shadow-xs">
          <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-[#d4af37]" />
        </div>
      </div>

      {/* 2. Physics-based Pendulum Assembly — CONTINUOUS AMBIENT SWING */}
      <div
        className="flex flex-col items-center charm-hanging-pendulum cursor-pointer"
        style={{
          transformOrigin: "50% 0px",
          animationDuration: `${channel.duration}s`,
          animationDelay: `${channel.delay}s`,
          ["--swing-max" as string]: `${channel.swingAngle}deg`,
        }}
      >
        {/* Dual Golden Wire Rope Cords */}
        <div
          className="flex justify-between w-2.5 sm:w-3.5 relative pointer-events-none"
          style={{ height: `${channel.ropeLength}px` }}
        >
          <div className="w-[1px] sm:w-[1.5px] h-full bg-gradient-to-b from-[#d4af37] via-[#b8891a] to-[#a07d4c] opacity-85" />
          <div className="w-[1px] sm:w-[1.5px] h-full bg-gradient-to-b from-[#d4af37] via-[#b8891a] to-[#a07d4c] opacity-85" />
        </div>

        {/* Hanging Icon Medallion Ring Attachment */}
        <div className="w-3 h-2 sm:w-4 sm:h-3 rounded-t-full border-t-[1.5px] sm:border-t-2 border-x-[1.5px] sm:border-x-2 border-[#d4af37] -mb-[1px] z-10 opacity-90 pointer-events-none" />

        {/* 3. The Pure Platform Icon Button (Suspended Charm) */}
        <a
          href={channel.url}
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-11 h-11 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-xl sm:rounded-2xl bg-white flex items-center justify-center shadow-xl border border-white/40 cursor-pointer overflow-hidden group/icon transition-all duration-300 hover:scale-115 hover:-translate-y-1"
          style={{
            boxShadow: `0 8px 24px -4px ${channel.accentGlow}, 0 4px 10px rgba(0,0,0,0.4)`,
          }}
          aria-label={`فتح ${channel.title}`}
        >
          {/* Subtle glossy overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/45 via-transparent to-black/5 pointer-events-none" />

          {/* SVG Platform Icon */}
          <div className="relative z-10 transition-transform duration-300 group-hover/icon:scale-110 scale-75 sm:scale-100">
            <ChannelIcon type={channel.type} color={channel.color} />
          </div>

          {/* Golden bottom accent line on hover */}
          <div
            className="absolute bottom-0 inset-x-0 h-0.5 sm:h-1 scale-x-0 group-hover/icon:scale-x-100 transition-transform duration-300"
            style={{ backgroundColor: channel.color }}
          />
        </a>

        {/* 4. Platform Title under Icon */}
        <span className="text-[8px] sm:text-xs font-medium text-white/75 group-hover:text-white transition-colors duration-200 mt-1.5 sm:mt-2.5 tracking-wide whitespace-nowrap pointer-events-none">
          {channel.title}
        </span>
      </div>
    </div>
  );
}

// =========================================================================
// SVG Platform Icons (أيقونات المنصات فائقة الدقة والوضوح)
// =========================================================================
function ChannelIcon({ type, color }: { type: ContactChannel["type"]; color: string }) {
  switch (type) {
    case "whatsapp":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill={color}>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      );
    case "phone":
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
          <path
            d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.7 11.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012.62 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.6a16 16 0 006.29 6.29l.97-.97a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "email":
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      );
    case "maps":
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );
    case "instagram":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2.5" />
        </svg>
      );

    default:
      return null;
  }
}
