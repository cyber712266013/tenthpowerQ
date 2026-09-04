import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import companyInfo from "../../data/company";

const SPRING_ROPE = { stiffness: 40, damping: 14, mass: 1.5 };

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] as const },
});

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);

  /* Parallax: image moves up as user scrolls down — "rope" spring */
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const rawImgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const imgY = useSpring(rawImgY, SPRING_ROPE);

  /* Content fades out as we scroll past hero */
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -30]);
  const smoothContentY = useSpring(contentY, { stiffness: 80, damping: 20 });

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      aria-label="قسم الترحيب"
    >
      {/* Static dark background */}
      <div className="absolute inset-0 bg-[var(--color-primary)]" aria-hidden="true" />

      {/* Parallax image — LEFT side on desktop (RTL end), full on mobile */}
      <div className="absolute inset-0 lg:left-0 lg:right-[45%] overflow-hidden" aria-hidden="true">
        <motion.img
          src="/images/hero.png"
          alt="أعمال مؤسسة القوة العاشرة"
          className="w-full h-full object-cover opacity-50 lg:opacity-80"
          style={{ y: imgY, scale: 1.12 }}
          loading="eager"
          fetchPriority="high"
        />
        {/* Gradient fades toward right (text side) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)] via-[var(--color-primary)]/70 to-transparent lg:hidden" />
        <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-transparent via-[var(--color-primary)]/15 to-[var(--color-primary)]" />
        <div className="absolute inset-0 hidden lg:block bg-gradient-to-t from-[var(--color-primary)]/40 via-transparent to-transparent" />
      </div>

      {/* Content — fades up as you scroll past */}
      <motion.div
        className="relative z-10 container pt-28 pb-20 md:pt-36 md:pb-24"
        style={{ opacity: contentOpacity, y: smoothContentY }}
      >
        {/* Text occupies right 65% on desktop */}
        <div className="lg:w-[65%]">

          {/* Logo emblem — spring bounce in */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 18, delay: 0.1 }}
            className="mb-6"
          >
            <img
              src="/icons/app_logo.webp"
              alt="شعار مؤسسة القوة العاشرة"
              className="h-16 md:h-20 w-auto object-contain"
              style={{ filter: "drop-shadow(0 4px 24px rgba(218,165,32,0.3))" }}
            />
          </motion.div>

          {/* Label */}
          <motion.div {...fade(0.2)} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-stone-200 text-xs md:text-sm font-medium mb-5 backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] shadow-xs" />
            <span>مؤسسة القوة العاشرة للمقاولات العامة — جدة</span>
          </motion.div>

          {/* Heading — clear, large, no overlapping */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold text-white leading-[1.3] mb-5 tracking-normal"
          >
            نبني <span style={{ color: "var(--color-accent)" }}>بثقة</span>، ونُنجز <span style={{ color: "var(--color-accent)" }}>بخبرة</span>
          </motion.h1>

          {/* Subtitle / Description */}
          <motion.p {...fade(0.5)} className="text-stone-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-xl mb-9 font-normal">
            شريككم الهندسي الموثوق لتنفيذ المشاريع الإنشائية والمعمارية في المملكة العربية السعودية بمعايير هندسية متقدمة.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-4"
          >
            <motion.button
              onClick={() => scrollTo("services")}
              id="hero-cta-catalog"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-white text-[var(--color-primary)] text-sm md:text-base font-bold hover:bg-[var(--color-accent)] hover:text-white transition-all duration-250 shadow-xl"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 350, damping: 22 }}
            >
              <span>استكشف الكتالوج</span>
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <path d="M8 3v10M3 8l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>

            <motion.button
              onClick={() => scrollTo("contact")}
              id="hero-cta-contact"
              className="inline-flex items-center gap-2 px-8 py-4 text-white text-sm md:text-base font-semibold border-2 border-white/30 hover:border-[var(--color-accent)] hover:bg-white/10 transition-all duration-250"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 350, damping: 22 }}
            >
              <span>تواصل معنا</span>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 inset-x-0 h-px"
        style={{ background: "linear-gradient(90deg, var(--color-accent) 0%, transparent 60%)" }}
        aria-hidden="true"
      />

      {/* Scroll indicator — bounces */}
      <motion.div
        className="absolute bottom-8 right-1/2 translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        aria-hidden="true"
      >
        <span className="text-white/25 text-[9px] tracking-[0.3em] uppercase">scroll</span>
        <motion.div
          className="w-px h-10 bg-white/20"
          animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
        />
        <motion.svg
          width="12" height="12" viewBox="0 0 12 12" fill="none"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        >
          <path d="M2 4l4 4 4-4" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </motion.svg>
      </motion.div>
    </section>
  );
}
