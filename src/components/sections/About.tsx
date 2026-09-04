import { motion } from "framer-motion";
import EditorialMedia from "../ui/EditorialMedia";

const stats = [
  { value: "100%", label: "رضا العملاء" },
  { value: "+30", label: "كادر متخصص" },
  { value: "+10", label: "سنوات خبرة" },
  { value: "+50", label: "مشروع مكتمل" },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="editorial-section bg-[#faf9f5] overflow-hidden pt-12 md:pt-20 pb-20 md:pb-28"
      aria-label="من نحن"
    >
      <div className="container">
        <div className="flex flex-row items-center justify-between gap-3 sm:gap-8 lg:gap-16">
          
          {/* Left: Tilted Reception Image + Decorative Dot Matrix */}
          <div className="w-[48%] sm:w-1/2 relative">
            {/* Decorative Dot Matrix in Bottom-Left */}
            <div
              className="absolute -bottom-3 -left-3 sm:-bottom-6 sm:-left-6 w-16 h-16 sm:w-28 sm:h-28 md:w-36 md:h-36 dot-pattern opacity-80 pointer-events-none z-0"
              aria-hidden="true"
            />

            <motion.div
              className="relative z-10"
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <EditorialMedia
                src="/images/about.png"
                alt="قواطع زجاج سكريت وأنظمة ألمنيوم من تنفيذ القوة العاشرة"
                tilt={2.5}
                aspectRatio="aspect-[16/11] md:aspect-[16/10]"
                hoverLabel="خبرة متميزة في الزجاج والألمنيوم"
              />
            </motion.div>
          </div>

          {/* Right: Narrative & Statistics */}
          <motion.div
            className="w-[48%] sm:w-1/2 text-right"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Tag */}
            <p className="text-xs sm:text-lg md:text-2xl font-serif text-[var(--color-accent)] mb-1 sm:mb-2 font-medium">
              من نحن
            </p>

            {/* Title */}
            <h2 className="text-sm sm:text-2xl md:text-4xl lg:text-5xl font-bold text-[var(--color-primary)] tracking-tight leading-tight mb-2 sm:mb-4 md:mb-6">
              إتقان هندسي في الزجاج والألمنيوم والديكور
            </h2>

            {/* Description */}
            <p className="text-[var(--color-text-secondary)] text-[9px] sm:text-xs md:text-base leading-relaxed font-light mb-3 sm:mb-6 md:mb-8">
              مؤسسة القوة العاشرة رائدة في تنفيذ حلول الزجاج السكريت والواجهات المعمارية، وقطاعات الألمنيوم، وتفصيل المطابخ العصرية، والأبواب والنوافذ والديكورات الداخلية والمقاولات العامة، مع الحرص على أعلى درجات الأمان والجمالية.
            </p>

            {/* 4 Statistics in a Clean Single Horizontal Row */}
            <div className="grid grid-cols-4 gap-1 sm:gap-3 md:gap-6 pt-2 sm:pt-4 border-t border-[var(--color-border)]/60">
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-xs sm:text-xl md:text-3xl lg:text-4xl font-bold text-[var(--color-primary)] tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-[7px] sm:text-[9px] md:text-xs text-[var(--color-muted)] font-light mt-0.5 sm:mt-1 whitespace-nowrap">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
