import { motion } from "framer-motion";
import EditorialMedia from "../ui/EditorialMedia";

const reasons = [
  {
    title: "زجاج سكريت معتمد",
    text: "زجاج معالج حرارياً بمقاومة فائقة للصدمات والأمان الكامل.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    title: "قطاعات ألمنيوم عازلة",
    text: "عزل حراري وصوتي ممتاز مع دهانات مقاومة للرطوبة والعوامل الجوية.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <line x1="12" y1="4" x2="12" y2="20" />
      </svg>
    ),
  },
  {
    title: "دقة التصنيع والتركيب",
    text: "أحدث معدات CNC وفريق فني متمرس لتنفيذ أدق التفاصيل الهندسية.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: "ضمان شامل وصيانة",
    text: "ضمان موثق على جودة المواد والتركيبات مع خدمة صيانة سريعة.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
      </svg>
    ),
  },
];

export default function WhyUsSection() {
  return (
    <section
      id="why-us"
      className="editorial-section relative bg-[#faf9f5] overflow-hidden py-8 sm:py-12 md:py-16"
      aria-label="لماذا نحن"
    >
      <div className="container relative">
        <div className="flex flex-row items-center justify-between gap-3 sm:gap-8 lg:gap-14">

          {/* Left Column: Tag + Title + 2x2 Grid of Features */}
          <motion.div
            className="w-[50%] sm:w-6/12 text-right z-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Tag */}
            <p className="text-xs sm:text-lg md:text-2xl font-serif text-[var(--color-accent)] mb-1 sm:mb-2 font-medium">
              لماذا نحن
            </p>

            {/* Title */}
            <h2 className="text-sm sm:text-2xl md:text-4xl lg:text-5xl font-bold text-[var(--color-primary)] tracking-tight leading-tight mb-2 sm:mb-4 md:mb-8">
              دقة في التصنيع.. وثقة في التنفيذ
            </h2>

            {/* 2x2 Features Grid */}
            <div className="grid grid-cols-2 gap-2 sm:gap-4 md:gap-8">
              {reasons.map((r, i) => (
                <div key={i} className="flex items-start gap-1.5 sm:gap-3 md:gap-4 text-right">
                  <div className="w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full border border-[var(--color-accent)] flex items-center justify-center text-[var(--color-accent)] shrink-0 mt-0.5 [&>svg]:w-3 [&>svg]:h-3 sm:[&>svg]:w-4 sm:[&>svg]:h-4 md:[&>svg]:w-[22px] md:[&>svg]:h-[22px]">
                    {r.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-[9px] sm:text-xs md:text-base text-[var(--color-primary)] mb-0.5 sm:mb-1.5 leading-tight">
                      {r.title}
                    </h3>
                    <p className="text-[7px] sm:text-[10px] md:text-sm text-[var(--color-text-secondary)] leading-snug sm:leading-relaxed font-light">
                      {r.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Tilted Office Photo + Faint Watermark 04 */}
          <div className="w-[46%] sm:w-6/12 relative flex items-center justify-center">
            {/* Faint Giant Watermark 04 */}
            <div
              className="watermark-num absolute right-[-1rem] sm:right-[-2rem] md:right-[-4rem] top-1/2 -translate-y-1/2 select-none pointer-events-none z-0"
              aria-hidden="true"
            >
              04
            </div>

            {/* Tilted Photo */}
            <motion.div
              className="w-full relative z-10"
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <EditorialMedia
                src="/images/Image1.png"
                alt="معايير الجودة والالتزام في القوة العاشرة"
                tilt={-2}
                aspectRatio="aspect-[16/11] md:aspect-[16/10]"
                hoverLabel="قيمنا المؤسسية"
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
