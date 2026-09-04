import { motion } from "framer-motion";
import EditorialMedia from "../ui/EditorialMedia";

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

export default function HeroSection() {
  return (
    <section
      id="top"
      className="relative flex items-center bg-[#faf9f5] pt-22 pb-6 sm:pt-24 sm:pb-12 md:pt-28 md:pb-16 overflow-hidden"
      aria-label="القسم الرئيسي"
    >
      <div className="container relative">
        <div className="flex flex-row items-center justify-between gap-3 sm:gap-8 lg:gap-14">

         

          {/* Right Side: Editorial Narrative & CTA Buttons */}
          <motion.div
            className="w-[48%] sm:w-5/12 text-right"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Title */}
            <h1 className="text-base sm:text-3xl md:text-5xl lg:text-6xl font-bold text-[var(--color-primary)] tracking-tight leading-tight mb-1 sm:mb-3">
              القوة العاشرة
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-xl md:text-2xl lg:text-3xl font-medium text-[var(--color-accent)] mb-2 sm:mb-4 md:mb-6">
              رواد الزجاج السكريت، الواجهات والألمنيوم
            </p>

            {/* Description */}
            <p className="text-[var(--color-text-secondary)] text-[9px] sm:text-xs md:text-base leading-relaxed font-light mb-3 sm:mb-6 md:mb-8">
              متخصصون في تنفيذ واجهات الزجاج السكريت، أنظمة الألمنيوم الفاخرة، تفصيل المطابخ العصرية، الديكورات المعمارية والمقاولات العامة والصيانة بأعلى معايير الإتقان والجودة.
            </p>

            {/* Two Action Buttons */}
            <div className="flex items-center gap-1.5 sm:gap-4 flex-nowrap sm:flex-wrap">
              <button
                onClick={() => scrollTo("projects")}
                className="px-2.5 py-1.5 sm:px-6 sm:py-3 md:px-8 md:py-3.5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-light)] text-white text-[9px] sm:text-xs md:text-sm font-medium rounded-sm sm:rounded-md shadow-xs transition-all duration-200 cursor-pointer whitespace-nowrap"
              >
                استكشف أعمالنا
              </button>

              <button
                onClick={() => scrollTo("contact")}
                className="px-2.5 py-1.5 sm:px-6 sm:py-3 md:px-8 md:py-3.5 border border-[var(--color-accent)] text-[var(--color-primary)] hover:bg-[var(--color-accent)]/10 text-[9px] sm:text-xs md:text-sm font-medium rounded-sm sm:rounded-md transition-all duration-200 cursor-pointer whitespace-nowrap"
              >
                تواصل معنا
              </button>
            </div>
          </motion.div>

           {/* Left Side: Vertical Counter Indicator + Tilted Architectural Image */}
          <div className="w-[48%] sm:w-7/12 flex items-center gap-2 sm:gap-6 md:gap-10">
            {/* Vertical Counter Indicator (01 - 05) */}
            <div className="flex flex-col items-center gap-1.5 sm:gap-4 text-[9px] sm:text-xs font-light text-[var(--color-muted)] select-none shrink-0">
              <span className="font-medium text-[var(--color-primary)] text-[10px] sm:text-sm">01</span>
              <span className="w-px h-8 sm:h-16 bg-[var(--color-border-dark)]" />
              <span className="text-[var(--color-muted)] text-[9px] sm:text-xs">05</span>
            </div>

            {/* Tilted Photo Frame */}
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <EditorialMedia
                src="/images/Image4.png"
                alt="مؤسسة القوة العاشرة للمقاولات والتجارة العامة"
                tilt={-3}
                aspectRatio="aspect-[16/11] md:aspect-[16/10]"
                hoverLabel="استكشف مشاريعنا"
                onClick={() => scrollTo("projects")}
                priority
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
