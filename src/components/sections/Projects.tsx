import { useState, useMemo } from "react";
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

/* ─────────────── Reusable Project Detail Modal ─────────────── */
function ProjectDetailModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // دمج الصورة الرئيسية والصور الإضافية مع إزالة أي تكرار
  const allImages = useMemo(() => {
    const list = [project.coverImage, ...(project.images || [])].filter(Boolean);
    return Array.from(new Set(list));
  }, [project]);

  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const currentImage = allImages[activeImageIndex] || project.coverImage;

  return (
    <>
      <div className="fixed inset-0 z-[102] overflow-y-auto flex items-center justify-center p-3 sm:p-6">
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md" onClick={onClose} />
        <motion.div
          className="relative w-full max-w-4xl bg-[#faf9f5] border border-[var(--color-border)] p-6 sm:p-10 shadow-2xl my-auto z-10 max-h-[90vh] overflow-y-auto"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
        >
          {/* زر الإغلاق */}
          <button
            onClick={onClose}
            className="absolute top-6 left-6 w-10 h-10 flex items-center justify-center bg-[var(--color-primary)] text-white hover:bg-[var(--color-accent)] transition-colors cursor-pointer z-10 shadow-md"
            aria-label="إغلاق"
          >
            ✕
          </button>

          {/* الصورة الرئيسية الفعالة مع إمكانية التكبير */}
          <div
            onClick={() => setLightboxIndex(activeImageIndex)}
            className="relative aspect-[16/8] overflow-hidden mb-4 bg-black group cursor-pointer border border-[var(--color-border)]"
            title="انقر لتكبير الصورة وعرض الألبوم كاملاً"
          >
            <img
              src={currentImage}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Hover overlay with zoom prompt */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4 sm:p-5">
              <span className="inline-flex items-center gap-2 bg-black/70 backdrop-blur-md text-white text-xs sm:text-sm font-medium px-3.5 py-1.5 rounded-full border border-white/20">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
                <span>انقر للتكبير والتصفح الكامل</span>
              </span>
              {allImages.length > 1 && (
                <span className="bg-black/70 backdrop-blur-md text-white/90 text-xs px-3 py-1.5 rounded-full border border-white/20 font-sans">
                  {activeImageIndex + 1} / {allImages.length}
                </span>
              )}
            </div>
          </div>

          {/* شريط مصغرات الصور الإضافية السريع أسفل الصورة الرئيسية مباشرة */}
          {allImages.length > 1 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-[var(--color-accent)] uppercase">
                  ألبوم صور المشروع ({allImages.length})
                </span>
                <span className="text-[11px] text-[var(--color-muted)]">
                  اختر صورة للعرض المباشر أو انقر مرتين للتكبير
                </span>
              </div>
              <div className="flex gap-2.5 overflow-x-auto pb-2">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    onDoubleClick={() => setLightboxIndex(idx)}
                    className={`relative flex-shrink-0 w-20 sm:w-24 aspect-[4/3] rounded overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                      activeImageIndex === idx
                        ? "border-[var(--color-accent)] ring-2 ring-[var(--color-accent)]/30 scale-102"
                        : "border-[var(--color-border)] opacity-70 hover:opacity-100 hover:border-[var(--color-muted)]"
                    }`}
                    title={`صورة ${idx + 1}`}
                  >
                    <img
                      src={img}
                      alt={`${project.title} ${idx + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    {idx === 0 && (
                      <span className="absolute bottom-0 right-0 left-0 bg-black/65 text-white text-[8px] py-0.5 text-center font-sans">
                        الرئيسية
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* تفاصيل المشروع */}
          <span className="text-xs text-[var(--color-accent)] font-semibold uppercase">{project.category}</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-primary)] mt-1 mb-4">{project.title}</h2>
          <p className="text-[var(--color-text-secondary)] text-sm md:text-base leading-relaxed mb-6 font-light">{project.description}</p>

          {/* نطاق العمل */}
          {project.scope && (
            <div className="border-t border-[var(--color-border)] pt-5 mb-6">
              <h4 className="text-xs font-semibold text-[var(--color-accent)] uppercase mb-3">نطاق العمل:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {project.scope.map((sc, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] shrink-0" />
                    <span>{sc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* قسم استعراض الصور الإضافية والتوثيق الميداني بالتفصيل */}
          {allImages.length > 1 && (
            <div className="border-t border-[var(--color-border)] pt-5 mb-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-semibold text-[var(--color-accent)] uppercase">
                    الصور الإضافية والتوثيق الميداني:
                  </h4>
                  <span className="bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-[10px] px-2 py-0.5 rounded-full font-medium font-sans">
                    {allImages.length} صور موثقة
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setLightboxIndex(activeImageIndex)}
                  className="inline-flex items-center gap-1.5 text-xs text-[var(--color-accent)] hover:text-[var(--color-primary)] transition-colors cursor-pointer font-medium"
                >
                  <span>عرض ملء الشاشة</span>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {allImages.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setActiveImageIndex(idx);
                      setLightboxIndex(idx);
                    }}
                    className={`group relative aspect-[4/3] rounded overflow-hidden border cursor-pointer transition-all duration-300 ${
                      activeImageIndex === idx
                        ? "border-[var(--color-accent)] shadow-md ring-2 ring-[var(--color-accent)]/30"
                        : "border-[var(--color-border)] hover:border-[var(--color-accent)]/70 hover:shadow-sm"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${project.title} - صورة ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/75 backdrop-blur-xs text-white text-[10px] px-2.5 py-1 rounded flex items-center gap-1">
                        <span>تكبير</span>
                        <span>⤢</span>
                      </span>
                    </div>
                    {idx === 0 ? (
                      <span className="absolute top-2 right-2 bg-black/70 backdrop-blur-xs text-white text-[9px] px-2 py-0.5 rounded font-sans">
                        الصورة الرئيسية
                      </span>
                    ) : (
                      <span className="absolute top-2 right-2 bg-black/60 backdrop-blur-xs text-white text-[9px] px-2 py-0.5 rounded font-sans">
                        صورة إضافية #{idx}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* توثيق الفيديو */}
          {project.videoUrl && (
            <div className="border-t border-[var(--color-border)] pt-5 mb-6">
              <h4 className="text-xs font-semibold text-[var(--color-accent)] uppercase mb-3">
                توثيق الفيديو:
              </h4>

              <div className="aspect-video bg-black overflow-hidden">
                {parseVideoEmbed(project.videoUrl).type === "file" ? (
                  <video
                    src={project.videoUrl}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <iframe
                    src={parseVideoEmbed(project.videoUrl).embedUrl}
                    className="w-full h-full border-0"
                    allowFullScreen
                  />
                )}
              </div>
            </div>
          )}

          {/* Bottom Action — داخل نافذة تفاصيل العمل */}
          <div className="border-t border-[var(--color-border)] pt-5 mt-2 flex justify-end">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors duration-200 cursor-pointer group"
            >
              <span>العودة إلى جميع الأعمال</span>

              <span className="text-[var(--color-accent)] transition-transform duration-200 group-hover:-translate-x-1">
                ←
              </span>
            </button>
          </div>
        </motion.div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={allImages}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          altPrefix={project.title}
        />
      )}
    </>
  );
}

/* ─────────────── Full Projects Gallery Modal ─────────────── */
function AllProjectsModal({ onClose }: { onClose: () => void }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
                <p className="text-xs text-[var(--color-muted)] mt-1">{p.location || "الرياض"} • {p.year}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Single Project Detail Overlay within Full Gallery */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </>
  );
}

// Helper to randomly pick 2 unique projects
function getTwoRandomProjects(items: Project[]): [Project | undefined, Project | undefined] {
  if (!items || items.length === 0) return [undefined, undefined];
  if (items.length === 1) return [items[0], undefined];

  const firstIndex = Math.floor(Math.random() * items.length);
  let secondIndex = Math.floor(Math.random() * (items.length - 1));
  if (secondIndex >= firstIndex) {
    secondIndex += 1;
  }
  return [items[firstIndex], items[secondIndex]];
}

export default function ProjectsSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // اختيار مشروعين عشوائيين مختلفين عند تحميل الصفحة
  const [[work1, work2]] = useState<[Project | undefined, Project | undefined]>(() =>
    getTwoRandomProjects(projects)
  );

  return (
    <section
      id="projects"
      className="editorial-section relative bg-[#faf9f5] overflow-hidden py-8 sm:py-12 md:py-16"
      aria-label="أعمالنا"
    >
      <div className="container relative">

        {/* Section Header */}
        <div className="text-right mb-10 md:mb-14">
          <p className="text-lg sm:text-2xl font-serif text-[var(--color-accent)] font-medium mb-2">أعمالنا</p>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[var(--color-primary)] tracking-tight leading-tight">
            مشاريع زجاج وألمنيوم نفخر بها
          </h2>
        </div>

        {/* Work 1: Image LEFT — Text RIGHT */}
        {work1 && (
          <motion.div
            className="flex flex-row-reverse items-stretch gap-4 sm:gap-8 md:gap-12 mb-12 md:mb-24"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Image */}
            <div className="w-[52%] sm:w-1/2 lg:w-7/12 flex items-center">
              <div className="w-full">
                <EditorialMedia
                  src={work1.coverImage || work1.images?.[0]}
                  videoUrl={work1.videoUrl}
                  alt={work1.title}
                  tilt={2.5}
                  aspectRatio="aspect-[4/3] sm:aspect-[16/11] md:aspect-[16/10]"
                  hoverLabel="استعراض تفاصيل العمل"
                  onClick={() => setSelectedProject(work1)}
                />
              </div>
            </div>

            {/* Text beside image */}
            <div className="w-[48%] sm:w-1/2 lg:w-5/12 text-right self-stretch flex flex-col justify-between py-1 sm:py-3 md:py-6">
              {/* Top: Category & Title */}
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-block text-[10px] sm:text-xs md:text-sm font-semibold text-[var(--color-accent)] uppercase tracking-wider bg-[var(--color-accent)]/10 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full">
                    {work1.category}
                  </span>
                  {work1.year && (
                    <span className="text-[10px] sm:text-xs text-[var(--color-muted)] font-medium">
                      {work1.year}
                    </span>
                  )}
                  {work1.location && (
                    <>
                      <span className="text-[10px] sm:text-xs text-[var(--color-muted)]">•</span>
                      <span className="text-[10px] sm:text-xs text-[var(--color-muted)]">
                        {work1.location}
                      </span>
                    </>
                  )}
                </div>

                <h3 className="text-base sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--color-primary)] leading-snug sm:leading-tight tracking-tight">
                  {work1.title}
                </h3>
              </div>

              {/* Middle: Rich Description & Scope Highlights */}
              <div className="my-auto py-2 sm:py-4 space-y-2.5 sm:space-y-3.5">
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-[var(--color-text-secondary)] leading-relaxed sm:leading-loose font-light">
                  {work1.description || work1.shortDescription}
                </p>

                {work1.scope && work1.scope.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                    {work1.scope.slice(0, 3).map((item, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs text-[var(--color-text-secondary)] bg-white/90 border border-[var(--color-border)] px-2.5 py-1 rounded-md shadow-2xs"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] shrink-0" />
                        <span className="line-clamp-1">{item}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom: Action CTA */}
              <div className="pt-2">
                <button
                  onClick={() => setSelectedProject(work1)}
                  className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-[var(--color-primary)] hover:bg-[var(--color-accent)] text-white text-xs sm:text-sm font-semibold rounded-md transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer group"
                >
                  <span>استعراض تفاصيل العمل</span>
                  <span className="text-[var(--color-accent)] group-hover:text-white transition-all duration-300 group-hover:-translate-x-1.5">
                    ←
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Work 2: Image RIGHT — Text LEFT */}
        {work2 && (
          <motion.div
            className="flex flex-row items-stretch gap-4 sm:gap-8 md:gap-12 mb-12 md:mb-24"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Image */}
            <div className="w-[52%] sm:w-1/2 lg:w-7/12 flex items-center">
              <div className="w-full">
                <EditorialMedia
                  src={work2.coverImage || work2.images?.[0]}
                  videoUrl={work2.videoUrl}
                  alt={work2.title}
                  tilt={-2.0}
                  aspectRatio="aspect-[4/3] sm:aspect-[16/11] md:aspect-[16/10]"
                  hoverLabel="استعراض تفاصيل العمل"
                  onClick={() => setSelectedProject(work2)}
                />
              </div>
            </div>

            {/* Text beside image */}
            <div className="w-[48%] sm:w-1/2 lg:w-5/12 text-right self-stretch flex flex-col justify-between py-1 sm:py-3 md:py-6">
              {/* Top: Category & Title */}
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-block text-[10px] sm:text-xs md:text-sm font-semibold text-[var(--color-accent)] uppercase tracking-wider bg-[var(--color-accent)]/10 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full">
                    {work2.category}
                  </span>
                  {work2.year && (
                    <span className="text-[10px] sm:text-xs text-[var(--color-muted)] font-medium">
                      {work2.year}
                    </span>
                  )}
                  {work2.location && (
                    <>
                      <span className="text-[10px] sm:text-xs text-[var(--color-muted)]">•</span>
                      <span className="text-[10px] sm:text-xs text-[var(--color-muted)]">
                        {work2.location}
                      </span>
                    </>
                  )}
                </div>

                <h3 className="text-base sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--color-primary)] leading-snug sm:leading-tight tracking-tight">
                  {work2.title}
                </h3>
              </div>

              {/* Middle: Rich Description & Scope Highlights */}
              <div className="my-auto py-2 sm:py-4 space-y-2.5 sm:space-y-3.5">
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-[var(--color-text-secondary)] leading-relaxed sm:leading-loose font-light">
                  {work2.description || work2.shortDescription}
                </p>

                {work2.scope && work2.scope.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                    {work2.scope.slice(0, 3).map((item, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs text-[var(--color-text-secondary)] bg-white/90 border border-[var(--color-border)] px-2.5 py-1 rounded-md shadow-2xs"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] shrink-0" />
                        <span className="line-clamp-1">{item}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom: Action CTA */}
              <div className="pt-2">
                <button
                  onClick={() => setSelectedProject(work2)}
                  className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-[var(--color-primary)] hover:bg-[var(--color-accent)] text-white text-xs sm:text-sm font-semibold rounded-md transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer group"
                >
                  <span>استعراض تفاصيل العمل</span>
                  <span className="text-[var(--color-accent)] group-hover:text-white transition-all duration-300 group-hover:-translate-x-1.5">
                    ←
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Bottom: Category Icons + "View All" Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-[var(--color-border)]/80">
          {/* Category Icons */}
          <div className="grid grid-cols-4 gap-4 sm:gap-6">
            {projectCategories.map((cat, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5 group cursor-default">
                <div className="text-[var(--color-accent)] group-hover:scale-110 transition-transform duration-200 [&>svg]:w-5 [&>svg]:h-5 md:[&>svg]:w-6 md:[&>svg]:h-6">
                  {cat.icon}
                </div>
                <span className="text-[10px] md:text-xs font-medium text-[var(--color-primary)] whitespace-nowrap">
                  {cat.label}
                </span>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-7 py-3 border border-[var(--color-accent)] text-[var(--color-primary)] hover:bg-[var(--color-accent)] hover:text-white text-sm font-medium transition-all duration-200 cursor-pointer"
          >
            <span>استعراض جميع الأعمال</span>
            <span>←</span>
          </button>
        </div>

      </div>

      {/* Single Project Detail Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>

      {/* All Projects Modal */}
      <AnimatePresence>
        {modalOpen && <AllProjectsModal onClose={() => setModalOpen(false)} />}
      </AnimatePresence>
    </section>
  );
}
