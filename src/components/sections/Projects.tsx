import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, categories } from "../../data/projects";
import type { Project } from "../../data/projects";
import Lightbox from "../ui/Lightbox";
import EditorialMedia, { parseVideoEmbed } from "../ui/EditorialMedia";

const projectCategories = [
  {
    label: "زجاج سكريت",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    ),
  },
  {
    label: "واجهات معمارية",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18" />
        <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
        <line x1="9" y1="7" x2="9" y2="7.01" />
        <line x1="15" y1="7" x2="15" y2="7.01" />
        <line x1="9" y1="13" x2="9" y2="13.01" />
        <line x1="15" y1="13" x2="15" y2="13.01" />
      </svg>
    ),
  },
  {
    label: "أنظمة ألمنيوم",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <line x1="12" y1="4" x2="12" y2="20" />
        <line x1="2" y1="12" x2="22" y2="12" />
      </svg>
    ),
  },
  {
    label: "مطابخ وديكورات",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 15h18" />
        <circle cx="7.5" cy="9" r="1.5" />
        <circle cx="16.5" cy="9" r="1.5" />
      </svg>
    ),
  },
];

/* ─────────────── Full Projects Gallery Modal ─────────────── */
function AllProjectsModal({ onClose }: { onClose: () => void }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeCategory === "all"
    ? projects
    : projects.filter((p) => p.categorySlug === activeCategory);

  return (
    <>
      <motion.div
        className="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <div className="fixed inset-0 z-[101] overflow-y-auto flex items-center justify-center p-3 sm:p-6 md:p-8">
        <motion.div
          className="relative w-full max-w-5xl bg-[#faf9f5] border border-[var(--color-border)] p-6 sm:p-10 shadow-2xl overflow-hidden my-auto"
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.98 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-6 left-6 w-10 h-10 flex items-center justify-center bg-[var(--color-primary)] text-white hover:bg-[var(--color-accent)] transition-colors cursor-pointer z-10"
            aria-label="إغلاق"
          >
            ✕
          </button>

          {/* Header */}
          <p className="text-xl font-serif text-[var(--color-accent)] mb-2">سجل الأعمال الميدانية</p>
          <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-6">كافة مشاريع القوة العاشرة</h2>

          {/* Filter Bar */}
          <div className="flex items-center gap-2 flex-wrap mb-8 pb-4 border-b border-[var(--color-border)]">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.slug)}
                className={[
                  "px-4 py-1.5 text-xs font-medium rounded-full transition-all cursor-pointer",
                  activeCategory === c.slug
                    ? "bg-[var(--color-primary)] text-white"
                    : "bg-[var(--color-surface-2)] text-[var(--color-muted)] hover:text-[var(--color-primary)]",
                ].join(" ")}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-h-[60vh] overflow-y-auto pr-2">
            {filtered.map((p) => (
              <div
                key={p.id}
                className="group cursor-pointer text-right"
                onClick={() => setSelectedProject(p)}
              >
                <div className="relative aspect-[16/11] overflow-hidden bg-[var(--color-surface-2)] mb-3">
                  <img
                    src={p.coverImage}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 right-3 bg-[var(--color-primary)]/80 backdrop-blur-xs text-white text-[10px] px-2.5 py-1">
                    {p.category}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-[var(--color-primary)] group-hover:text-[var(--color-accent)] transition-colors">
                  {p.title}
                </h3>
                <p className="text-xs text-[var(--color-muted)] mt-1">{p.location || "جدة"} • {p.year}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Single Project Detail Overlay */}
      {selectedProject && (
        <div className="fixed inset-0 z-[102] overflow-y-auto flex items-center justify-center p-3 sm:p-6">
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md" onClick={() => setSelectedProject(null)} />
          <motion.div
            className="relative w-full max-w-4xl bg-[#faf9f5] border border-[var(--color-border)] p-6 sm:p-10 shadow-2xl my-auto z-10 max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 left-6 w-10 h-10 flex items-center justify-center bg-[var(--color-primary)] text-white hover:bg-[var(--color-accent)] transition-colors cursor-pointer"
            >
              ✕
            </button>
            <div className="relative aspect-[16/8] overflow-hidden mb-6 bg-black">
              <img src={selectedProject.coverImage} alt={selectedProject.title} className="w-full h-full object-cover" />
            </div>
            <span className="text-xs text-[var(--color-accent)] font-semibold uppercase">{selectedProject.category}</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-primary)] mt-1 mb-4">{selectedProject.title}</h2>
            <p className="text-[var(--color-text-secondary)] text-sm md:text-base leading-relaxed mb-6 font-light">{selectedProject.description}</p>
            {selectedProject.scope && (
              <div className="border-t border-[var(--color-border)] pt-5 mb-6">
                <h4 className="text-xs font-semibold text-[var(--color-accent)] uppercase mb-3">نطاق العمل:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedProject.scope.map((sc, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] shrink-0" />
                      <span>{sc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {selectedProject.videoUrl && (
              <div className="border-t border-[var(--color-border)] pt-5 mb-6">
                <h4 className="text-xs font-semibold text-[var(--color-accent)] uppercase mb-3">توثيق الفيديو:</h4>
                <div className="aspect-video bg-black overflow-hidden">
                  {parseVideoEmbed(selectedProject.videoUrl).type === "file" ? (
                    <video src={selectedProject.videoUrl} controls autoPlay playsInline className="w-full h-full object-cover" />
                  ) : (
                    <iframe src={parseVideoEmbed(selectedProject.videoUrl).embedUrl} className="w-full h-full border-0" allowFullScreen />
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}

      {lightboxIndex !== null && selectedProject && (
        <Lightbox images={selectedProject.images} initialIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
      )}
    </>
  );
}

export default function ProjectsSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section
      id="projects"
      className="editorial-section relative bg-[#faf9f5] overflow-hidden py-16 md:py-28"
      aria-label="أعمالنا"
    >
      <div className="container relative">
        <div className="flex flex-row items-center justify-between gap-3 sm:gap-8 lg:gap-14">

          {/* Left Column: Tilted Building Photo + Faint Watermark 03 */}
          <div className="w-[48%] sm:w-7/12 relative flex items-center justify-center">
            {/* Giant Faint Watermark 03 on the Left */}
            <div
              className="watermark-num absolute left-[-1rem] sm:left-[-2rem] md:left-[-4rem] top-1/2 -translate-y-1/2 select-none pointer-events-none z-0"
              aria-hidden="true"
            >
              03
            </div>

            {/* Tilted Photo */}
            <motion.div
              className="w-full relative z-10"
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <EditorialMedia
                src="/images/Image4.png"
                alt="مشاريع وأعمال القوة العاشرة"
                tilt={2.5}
                aspectRatio="aspect-[16/11] md:aspect-[16/10]"
                hoverLabel="استعراض تفاصيل الأعمال"
                onClick={() => setModalOpen(true)}
              />
            </motion.div>
          </div>

          {/* Right Column: Narrative + Link + 4 Category Icons */}
          <motion.div
            className="w-[48%] sm:w-5/12 text-right z-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Tag */}
            <p className="text-xs sm:text-lg md:text-2xl font-serif text-[var(--color-accent)] mb-1 sm:mb-2 font-medium">
              أعمالنا
            </p>

            {/* Title */}
            <h2 className="text-sm sm:text-2xl md:text-4xl lg:text-5xl font-bold text-[var(--color-primary)] tracking-tight leading-tight mb-2 sm:mb-4 md:mb-5">
              مشاريع زجاج وألمنيوم نفخر بها
            </h2>

            {/* Description */}
            <p className="text-[var(--color-text-secondary)] text-[9px] sm:text-xs md:text-base leading-relaxed font-light mb-2 sm:mb-4 md:mb-6">
              نماذج حية من أعمالنا المنفذة في واجهات الزجاج السكريت، قطاعات الألمنيوم، المطابخ العصرية، الديكورات والمقاولات العامة.
            </p>

            {/* Action Link */}
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs md:text-sm font-semibold text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors duration-200 cursor-pointer group mb-3 sm:mb-6 md:mb-10 whitespace-nowrap"
            >
              <span>استعراض جميع الأعمال</span>
              <span className="text-[var(--color-accent)] transition-transform duration-200 group-hover:-translate-x-1">←</span>
            </button>

            {/* 4 Category Icons in a Clean Single Row */}
            <div className="grid grid-cols-4 gap-1.5 sm:gap-3 md:gap-4 pt-2 sm:pt-4 md:pt-6 border-t border-[var(--color-border)]/70 text-center">
              {projectCategories.map((cat, i) => (
                <div key={i} className="flex flex-col items-center gap-1 sm:gap-2 group cursor-default">
                  <div className="text-[var(--color-accent)] group-hover:scale-110 transition-transform duration-200 [&>svg]:w-4 [&>svg]:h-4 sm:[&>svg]:w-5 sm:[&>svg]:h-5 md:[&>svg]:w-6 md:[&>svg]:h-6">
                    {cat.icon}
                  </div>
                  <span className="text-[7px] sm:text-[10px] md:text-xs font-medium text-[var(--color-primary)] whitespace-nowrap">
                    {cat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      {/* All Projects Modal */}
      <AnimatePresence>
        {modalOpen && <AllProjectsModal onClose={() => setModalOpen(false)} />}
      </AnimatePresence>
    </section>
  );
}
