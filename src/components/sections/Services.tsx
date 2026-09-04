import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { services } from "../../data/services";
import type { Service } from "../../data/services";
import EditorialMedia from "../ui/EditorialMedia";

const serviceListItems = [
  {
    id: "s1",
    title: "زجاج سكريت وقواطع مكاتب",
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
    title: "واجهات زجاجية وكارتن وول",
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
    title: "أبواب ونوافذ وديكورات ومقاولات",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
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

  return (
    <section
      id="services"
      className="editorial-section relative bg-[#faf9f5] overflow-hidden py-16 md:py-28"
      aria-label="خدماتنا"
    >
      <div className="container relative">
        <div className="flex flex-row items-center justify-between gap-3 sm:gap-8 lg:gap-14">

          {/* Left Column: Text + 5 Services List with Golden Circular Icons */}
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

            {/* 5 Services List with Circular Outline Icons */}
            <div className="space-y-1.5 sm:space-y-3.5 mb-3 sm:mb-6 md:mb-8">
              {serviceListItems.map((item) => (
                <div key={item.id} className="flex items-center gap-2 sm:gap-3.5 group cursor-default">
                  <div className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full border border-[var(--color-accent)] flex items-center justify-center text-[var(--color-accent)] group-hover:bg-[var(--color-accent)] group-hover:text-white transition-colors duration-200 shrink-0 [&>svg]:w-3 [&>svg]:h-3 sm:[&>svg]:w-4 sm:[&>svg]:h-4 md:[&>svg]:w-[18px] md:[&>svg]:h-[18px]">
                    {item.icon}
                  </div>
                  <span className="text-[9px] sm:text-xs md:text-base font-medium text-[var(--color-primary)] truncate">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>

            {/* Action Link */}
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs md:text-sm font-semibold text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors duration-200 cursor-pointer group whitespace-nowrap"
            >
              <span>عرض جميع الخدمات</span>
              <span className="text-[var(--color-accent)] transition-transform duration-200 group-hover:-translate-x-1">←</span>
            </button>
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
                src="/images/hero-bg.gif"
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
