import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { services } from "../../data/services";
import type { Service } from "../../data/services";
import EditorialMedia from "../ui/EditorialMedia";

const serviceListItems = [
  {
    id: "s1",
    title: "أعمال الزجاج السكريت وقواطع المكاتب",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    ),
  },
  {
    id: "s2",
    title: "الواجهات الزجاجية المعمارية وكارتن وول",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18" />
        <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
        <line x1="9" y1="7" x2="9" y2="7.01" />
        <line x1="15" y1="7" x2="15" y2="7.01" />
        <line x1="9" y1="11" x2="9" y2="11.01" />
        <line x1="15" y1="11" x2="15" y2="11.01" />
        <line x1="9" y1="15" x2="9" y2="15.01" />
        <line x1="15" y1="15" x2="15" y2="15.01" />
      </svg>
    ),
  },
  {
    id: "s3",
    title: "أنظمة وقطاعات ألمنيوم معمارية",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <line x1="12" y1="4" x2="12" y2="20" />
        <line x1="2" y1="12" x2="22" y2="12" />
      </svg>
    ),
  },
  {
    id: "s4",
    title: "تفصيل مطابخ عصرية حديثة",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 15h18" />
        <circle cx="7.5" cy="9" r="1.5" />
        <circle cx="16.5" cy="9" r="1.5" />
        <line x1="9" y1="18" x2="15" y2="18" />
      </svg>
    ),
  },
  {
    id: "s5",
    title: "الديكورات والقواطع المعمارية والمرايا",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    id: "s6",
    title: "الأبواب والنوافذ والأنظمة الذكية",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="20" rx="1" />
        <circle cx="8" cy="12" r="1" />
        <line x1="12" y1="2" x2="12" y2="22" />
      </svg>
    ),
  },
  {
    id: "s7",
    title: "المقاولات العامة والتشطيبات المتكاملة",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 20h20" />
        <path d="M5 20V8l7-5 7 5v12" />
        <rect x="9" y="13" width="6" height="7" />
      </svg>
    ),
  },
  {
    id: "s8",
    title: "أعمال الصيانة والتشغيل الدورية",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    id: "s9",
    title: "واجهات الألمنيوم ومداخل الزجاج التجارية",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18" />
        <path d="M4 21V4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v17" />
        <path d="M9 21v-8a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v8" />
      </svg>
    ),
  },
  {
    id: "s10",
    title: "درابزينات الستانلس ستيل والزجاج السكريت",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20h16" />
        <path d="M4 16l5-4 5-4 6-5" />
        <path d="M9 12v8" />
        <path d="M14 8v12" />
      </svg>
    ),
  },
];

/* ─────────────── Full Services Detail Modal ─────────────── */
function AllServicesModal({ onClose }: { onClose: () => void }) {
  return (
    <>
      <motion.div
        className="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <div className="fixed inset-0 z-[101] overflow-y-auto flex items-center justify-center p-4 sm:p-8">
        <motion.div
          className="relative w-full max-w-4xl bg-[#faf9f5] border border-[var(--color-border)] p-6 sm:p-10 shadow-2xl overflow-hidden my-auto"
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.98 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-6 left-6 w-10 h-10 flex items-center justify-center bg-[var(--color-primary)] text-white hover:bg-[var(--color-accent)] transition-colors cursor-pointer"
            aria-label="إغلاق النافذة"
          >
            ✕
          </button>

          <p className="text-xl font-serif text-[var(--color-accent)] mb-2">دليل الخدمات الشامل</p>
          <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-6">كافة خدمات القوة العاشرة</h2>

          <div className="space-y-6 divide-y divide-[var(--color-border)] max-h-[65vh] overflow-y-auto pr-2">
            {services.map((s) => (
              <div key={s.id} className="pt-6 first:pt-0">
                <h3 className="text-lg font-bold text-[var(--color-primary)] mb-2 flex items-center gap-2">
                  <span className="text-[var(--color-accent)] font-semibold">0{s.order}</span>
                  <span>{s.title}</span>
                </h3>
                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-3">{s.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {s.scope.map((sc, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[var(--color-muted)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] shrink-0" />
                      <span>{sc}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default function ServicesSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(2);

  const displayedServices = serviceListItems.slice(0, visibleCount);

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + 2, serviceListItems.length));
  };

  return (
    <section
      id="services"
      className="editorial-section relative bg-[#faf9f5] overflow-hidden py-16 md:py-28"
      aria-label="خدماتنا"
    >
      <div className="container relative">
        <div className="flex flex-row items-center justify-between gap-3 sm:gap-8 lg:gap-14">
          
          {/* Left Column: Text + Services List + Show More Button */}
          <motion.div
            className="w-[48%] sm:w-5/12 text-right z-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Tag */}
            <p className="text-xs sm:text-lg md:text-2xl font-serif text-[var(--color-accent)] mb-1 sm:mb-2 font-medium">
              خدماتنا
            </p>

            {/* Title */}
            <h2 className="text-sm sm:text-2xl md:text-4xl lg:text-5xl font-bold text-[var(--color-primary)] tracking-tight leading-tight mb-2 sm:mb-4 md:mb-5">
              حلول الزجاج، الألمنيوم والديكور المتكاملة
            </h2>

            {/* Description */}
            <p className="text-[var(--color-text-secondary)] text-[9px] sm:text-xs md:text-base leading-relaxed font-light mb-3 sm:mb-6 md:mb-8">
              نقدم حلولاً متكاملة في أعمال الزجاج السكريت، الواجهات المعمارية، قطاعات الألمنيوم، تفصيل المطابخ، الأبواب والنوافذ والمقاولات العامة والصيانة بأعلى معايير الإتقان.
            </p>

            {/* Services List: Initially 2 services, reveals +2 each click with smooth animation */}
            <div className="space-y-1.5 sm:space-y-3.5 mb-3 sm:mb-6">
              <AnimatePresence initial={false}>
                {displayedServices.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx >= visibleCount - 2 ? 0.05 : 0 }}
                    className="flex items-center gap-2 sm:gap-3.5 group cursor-default"
                  >
                    <div className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full border border-[var(--color-accent)] flex items-center justify-center text-[var(--color-accent)] group-hover:bg-[var(--color-accent)] group-hover:text-white transition-colors duration-200 shrink-0 [&>svg]:w-3 [&>svg]:h-3 sm:[&>svg]:w-4 sm:[&>svg]:h-4 md:[&>svg]:w-[18px] md:[&>svg]:h-[18px]">
                      {item.icon}
                    </div>
                    <span className="text-[9px] sm:text-xs md:text-base font-medium text-[var(--color-primary)] truncate">
                      {item.title}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Actions: "المزيد" button (adds 2 services per click and auto-hides when complete) + "دليل الخدمات الشامل" link */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 pt-1">
              {visibleCount < serviceListItems.length && (
                <button
                  type="button"
                  onClick={handleShowMore}
                  className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 sm:px-3.5 sm:py-1.5 border border-[var(--color-accent)] text-[var(--color-primary)] hover:bg-[var(--color-accent)] hover:text-white text-[9px] sm:text-xs md:text-sm font-semibold transition-all duration-200 cursor-pointer group"
                  aria-label="عرض المزيد من الخدمات"
                >
                  <span>المزيد</span>
                  <span className="text-[var(--color-accent)] group-hover:text-white transition-transform duration-200 group-hover:translate-y-0.5 text-xs sm:text-sm font-bold">
                    +
                  </span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs md:text-sm font-semibold text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors duration-200 cursor-pointer group whitespace-nowrap"
              >
                <span>دليل الخدمات الشامل</span>
                <span className="text-[var(--color-accent)] transition-transform duration-200 group-hover:-translate-x-1">←</span>
              </button>
            </div>
          </motion.div>

          {/* Right Column: Large Tilted Construction Image + Faint Watermark 02 */}
          <div className="w-[48%] sm:w-7/12 relative flex items-center justify-center">
            {/* Faint Giant Watermark 02 in Background */}
            <div
              className="watermark-num absolute right-[-1rem] sm:right-[-2rem] md:right-[-4rem] top-1/2 -translate-y-1/2 select-none pointer-events-none z-0"
              aria-hidden="true"
            >
              02
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
                src="/images/hero.png"
                alt="تنفيذ أعمال الإنشاءات والمقاولات"
                tilt={-2.5}
                aspectRatio="aspect-[16/11] md:aspect-[16/10]"
                hoverLabel="استكشف نطاق الخدمات"
                onClick={() => setModalOpen(true)}
              />
            </motion.div>
          </div>

        </div>
      </div>

      {/* Services Detail Modal */}
      <AnimatePresence>
        {modalOpen && <AllServicesModal onClose={() => setModalOpen(false)} />}
      </AnimatePresence>
    </section>
  );
}
