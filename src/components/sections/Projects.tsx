import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, categories } from "../../data/projects";
import type { Project } from "../../data/projects";
import Lightbox from "../ui/Lightbox";
import { Reveal } from "../ui/Animations";


/* ─────────────── Project Viewer Modal ─────────────── */
function ProjectViewer({ project, onClose }: { project: Project; onClose: () => void }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape" && lightboxIndex === null) onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose, lightboxIndex]);

  const hasCover = project.coverImage && !project.coverImage.includes("[أضف");
  const hasImages = project.images.some((i) => !i.includes("[أضف"));
  const realImages = project.images.filter((i) => !i.includes("[أضف"));

  function scrollToContact() {
    onClose();
    setTimeout(() => {
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 400);
  }

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="modal-backdrop"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <motion.div
        className="fixed inset-0 z-[101] flex items-end md:items-center justify-center p-0 md:p-6"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative w-full md:max-w-4xl bg-[var(--color-bg)] overflow-y-auto max-h-[96dvh] md:max-h-[90vh] md:rounded-sm shadow-2xl"
          initial={{ y: 80, scale: 0.97 }}
          animate={{ y: 0, scale: 1 }}
          exit={{ y: 80, scale: 0.97 }}
          transition={{ type: "spring", stiffness: 320, damping: 36 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 z-20 w-10 h-10 flex items-center justify-center bg-[var(--color-primary)] text-white hover:bg-[var(--color-accent)] transition-colors"
            aria-label="إغلاق"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M13 1L1 13M1 1l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Hero image */}
          <div className="relative aspect-[16/8] w-full overflow-hidden bg-[var(--color-primary)]">
            {hasCover ? (
              <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover" loading="eager" />
            ) : (
              <div className="img-placeholder w-full h-full flex-col gap-2" style={{ backgroundColor: "rgba(26,26,26,0.95)", border: "none" }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.75">
                  <rect x="3" y="3" width="18" height="18" rx="1"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>
                </svg>
                <span className="text-white/20 text-xs">أضف صورة الغلاف</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/70 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 right-6 left-6">
              <span className="text-[10px] text-white/40 tracking-widest uppercase">{project.category}</span>
              <h2 className="text-2xl md:text-3xl font-semibold text-white mt-1 leading-snug">{project.title}</h2>
              <div className="flex items-center gap-5 mt-2 text-white/40 text-xs">
                {project.location && <span>{project.location}</span>}
                {project.year && <span>{project.year}</span>}
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 md:p-8 lg:p-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {/* Main description */}
              <div className="md:col-span-2">
                <h3 className="text-sm font-semibold text-[var(--color-primary)] tracking-wide uppercase mb-4">نبذة عن المشروع</h3>
                <div className="w-6 h-px bg-[var(--color-accent)] mb-5" />
                <p className="text-[var(--color-text-secondary)] leading-8 text-sm">{project.description}</p>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-5">
                  <p className="text-[10px] tracking-widest text-[var(--color-muted)] uppercase mb-4">بيانات المشروع</p>
                  <div className="space-y-3">
                    {[
                      { k: "النوع", v: project.category },
                      { k: "الموقع", v: project.location },
                      { k: "السنة", v: project.year },
                    ].filter((x) => x.v && !x.v.startsWith("[")).map((x) => (
                      <div key={x.k} className="flex flex-col pb-3 border-b border-[var(--color-border)] last:border-0 last:pb-0">
                        <span className="text-[10px] text-[var(--color-muted)] uppercase tracking-wide">{x.k}</span>
                        <span className="text-sm font-medium text-[var(--color-primary)] mt-0.5">{x.v}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {project.scope.some((s) => !s.startsWith("[")) && (
                  <div>
                    <p className="text-[10px] tracking-widest text-[var(--color-muted)] uppercase mb-4">نطاق العمل</p>
                    <ul className="space-y-2">
                      {project.scope.filter((s) => !s.startsWith("[")).map((s, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="mt-2 w-1 h-1 rounded-full shrink-0 bg-[var(--color-accent)]" />
                          <span className="text-xs text-[var(--color-text-secondary)] leading-5">{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Image gallery */}
            {hasImages && (
              <div className="mt-10 pt-8 border-t border-[var(--color-border)]">
                <h3 className="text-sm font-semibold text-[var(--color-primary)] tracking-wide uppercase mb-5">معرض الصور</h3>
                <div className="flex h-scroll gap-3 pb-2">
                  {realImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setLightboxIndex(i)}
                      className="shrink-0 w-44 md:w-56 aspect-[3/2] overflow-hidden group focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
                      aria-label={`فتح الصورة ${i + 1}`}
                    >
                      <img src={img} alt={`صورة ${i + 1} - ${project.title}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Video */}
            {project.videoUrl && (
              <div className="mt-8 pt-8 border-t border-[var(--color-border)]">
                <h3 className="text-sm font-semibold text-[var(--color-primary)] tracking-wide uppercase mb-5">فيديو المشروع</h3>
                <div className="aspect-video overflow-hidden bg-[var(--color-primary)]">
                  <iframe src={project.videoUrl} title={`فيديو ${project.title}`} className="w-full h-full" allowFullScreen />
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="mt-8 pt-6 border-t border-[var(--color-border)] flex items-center gap-4 flex-wrap">
              <button
                onClick={scrollToContact}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[var(--color-primary)] text-white text-sm font-medium hover:bg-[var(--color-accent)] transition-colors"
              >
                أريد مشروعًا مشابهًا
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button onClick={onClose} className="text-sm text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors">
                ← العودة
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox images={realImages} initialIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} altPrefix={project.title} />
      )}
    </>
  );
}

/* ─────────────── Project Card ─────────────── */
function ProjectCard({ project, index, onClick }: {
  project: Project; index: number; onClick: () => void;
}) {
  const hasCover = project.coverImage && !project.coverImage.includes("[أضف");
  return (
    <motion.button
      initial={{ opacity: 0, y: 60, scale: 0.93 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        type: "spring",
        stiffness: 60,
        damping: 15,
        mass: 1.2,
        delay: index * 0.09,
      }}
      whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 22 } }}
      onClick={onClick}
      className="group text-right shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-2"
      style={{ width: "clamp(260px, 80vw, 340px)" }}
      aria-label={`عرض مشروع ${project.title}`}
    >

      {/* Image */}
      <div className="relative aspect-[3/4] w-full overflow-hidden mb-4 bg-[var(--color-surface-2)]">
        {hasCover ? (
          <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
        ) : (
          <div className="img-placeholder w-full h-full flex-col gap-2">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75" className="opacity-20">
              <rect x="3" y="3" width="18" height="18" rx="1"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>
            </svg>
            <span className="text-xs opacity-30">لا توجد صورة</span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[var(--color-primary)]/0 group-hover:bg-[var(--color-primary)]/50 transition-all duration-500 flex items-center justify-center">
          <span className="text-white text-xs tracking-widest uppercase border border-white/50 px-4 py-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            عرض التفاصيل
          </span>
        </div>

        {/* Category tag */}
        <div className="absolute top-3 right-3">
          <span className="bg-[var(--color-primary)]/80 text-white text-[10px] px-2.5 py-1 tracking-wide backdrop-blur-sm">
            {project.category}
          </span>
        </div>

        {/* Gold accent */}
        <div className="absolute bottom-0 inset-x-0 h-0.5 bg-[var(--color-accent)] scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-500" />
      </div>

      {/* Info */}
      <div className="px-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-[var(--color-primary)] text-base leading-snug group-hover:text-[var(--color-accent)] transition-colors">
            {project.title}
          </h3>
        </div>
        <div className="flex items-center gap-3 text-[var(--color-muted)] text-xs">
          {project.location && <span>{project.location}</span>}
          {project.location && project.year && <span className="w-px h-3 bg-[var(--color-border-dark)]" />}
          {project.year && <span>{project.year}</span>}
        </div>
      </div>
    </motion.button>
  );
}

/* ─────────────── Projects Section ─────────────── */
export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selected, setSelected] = useState<Project | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const filtered = activeCategory === "all"
    ? projects
    : projects.filter((p) => p.categorySlug === activeCategory);

  // Arrow scroll
  const scrollBy = useCallback((dir: "right" | "left") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.75;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  }, []);

  return (
    <section id="projects" className="section bg-[var(--color-bg)] overflow-hidden pt-4 md:pt-6 pb-8 md:pb-10">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 md:mb-8">
          <Reveal>
            <p className="section-number mb-2">03</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-[var(--color-primary)] mb-2">أعمالنا</h2>
            <div className="divider" />
          </Reveal>

          {/* Category filter */}
          <motion.div
            className="flex items-center gap-1 overflow-x-auto pb-1"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.slug)}
                className={[
                  "shrink-0 px-4 py-1.5 text-xs font-medium tracking-wide transition-all duration-200",
                  activeCategory === cat.slug
                    ? "bg-[var(--color-primary)] text-white"
                    : "text-[var(--color-muted)] hover:text-[var(--color-primary)] border border-[var(--color-border)] hover:border-[var(--color-primary)]",
                ].join(" ")}
                aria-pressed={activeCategory === cat.slug}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>
        </div>

      </div>

      {/* Arrow: prev */}
      <div className="relative">
        <button
          onClick={() => scrollBy("right")}
          className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 bg-[var(--color-surface)] border border-[var(--color-border)] items-center justify-center hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-all duration-200 shadow-md"
          aria-label="السابق"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <button
          onClick={() => scrollBy("left")}
          className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 bg-[var(--color-surface)] border border-[var(--color-border)] items-center justify-center hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-all duration-200 shadow-md"
          aria-label="التالي"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>

        {/* Horizontal scroll */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            ref={scrollRef}
            className="h-scroll px-[1.5rem] md:px-[3rem] cursor-grab active:cursor-grabbing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {filtered.length === 0 ? (
              <div className="flex items-center justify-center w-full min-h-[400px]">
                <p className="text-[var(--color-muted)] text-sm">لا توجد مشاريع في هذا التصنيف بعد.</p>
              </div>
            ) : (
              filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} onClick={() => setSelected(project)} />
              ))
            )}
            <div className="w-6 shrink-0" aria-hidden="true" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Scroll hint for mobile */}
      <div className="container mt-6 md:hidden">
        <div className="flex items-center gap-2 text-[var(--color-muted)]">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="opacity-50">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-[10px] tracking-widest uppercase opacity-50">اسحب لاستعراض المزيد</span>
        </div>
      </div>

      {/* Project Viewer */}
      <AnimatePresence>
        {selected && (
          <ProjectViewer project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
