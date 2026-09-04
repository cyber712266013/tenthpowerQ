import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Lightbox from "../ui/Lightbox";
import { Reveal } from "../ui/Animations";

const galleryImages = [
  "/images/hero.png",
  "/images/ChatGPT Image Sep 3, 2026, 01_34_38 AM.png",
  "/images/ChatGPT Image Sep 3, 2026, 01_38_18 AM.png",
  "/images/ChatGPT Image Sep 3, 2026, 01_40_35 AM.png",
  "/images/ChatGPT Image Sep 3, 2026, 01_44_45 AM.png",
].filter(Boolean);

/* ─── Individual image with spring "rope" entrance ─── */
function GalleryImage({ src, index, onClick }: { src: string; index: number; onClick: () => void }) {
  const sizeClass = index % 3 === 0
    ? "w-72 md:w-96 aspect-[3/4]"
    : index % 3 === 1
    ? "w-64 md:w-80 aspect-[4/5]"
    : "w-56 md:w-72 aspect-square";

  return (
    <motion.button
      initial={{ opacity: 0, y: 60, rotate: index % 2 === 0 ? -1.5 : 1.5 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        type: "spring",
        stiffness: 60,
        damping: 14,
        mass: 1.2,
        delay: index * 0.08,
      }}
      whileHover={{
        scale: 1.03,
        rotate: index % 2 === 0 ? 0.5 : -0.5,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      onClick={onClick}
      className={`group shrink-0 overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-500 focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] ${sizeClass}`}
      aria-label={`فتح الصورة ${index + 1}`}
    >
      <motion.img
        src={src}
        alt={`صورة من معرض القوة العاشرة ${index + 1}`}
        className="w-full h-full object-cover"
        loading="lazy"
        decoding="async"
        whileHover={{ scale: 1.08, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }}
      />
    </motion.button>
  );
}

export default function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  function scrollBy(dir: "right" | "left") {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -el.clientWidth * 0.7 : el.clientWidth * 0.7, behavior: "smooth" });
  }

  if (galleryImages.length === 0) return null;

  return (
    <section id="gallery" className="section bg-[var(--color-surface)] overflow-hidden">
      <div className="container mb-6 md:mb-8">
        <div className="flex items-end justify-between gap-4">
          <Reveal>
            <p className="section-number mb-3">04</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-[var(--color-primary)] mb-2">
              معرض الصور
            </h2>
            <div className="divider" />
          </Reveal>

          {/* Desktop arrows */}
          <div className="hidden md:flex items-center gap-2 self-end pb-2">
            <button
              onClick={() => scrollBy("right")}
              className="w-10 h-10 border border-[var(--color-border)] flex items-center justify-center hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-all duration-200"
              aria-label="السابق"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              onClick={() => scrollBy("left")}
              className="w-10 h-10 border border-[var(--color-border)] flex items-center justify-center hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-all duration-200"
              aria-label="التالي"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal rail — spring card entrances */}
      <div
        ref={scrollRef}
        className="h-scroll px-[1.5rem] md:px-[3rem] pb-4 items-end"
      >
        {galleryImages.map((src, i) => (
          <GalleryImage key={i} src={src} index={i} onClick={() => setLightboxIndex(i)} />
        ))}
        <div className="w-6 shrink-0" aria-hidden="true" />
      </div>

      {/* Mobile hint */}
      <motion.div
        className="container mt-5 md:hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-2 text-[var(--color-muted)]">
          <motion.svg
            width="14" height="14" viewBox="0 0 16 16" fill="none"
            animate={{ x: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </motion.svg>
          <span className="text-[10px] tracking-widest uppercase opacity-40">اسحب لرؤية المزيد</span>
        </div>
      </motion.div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={galleryImages}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          altPrefix="معرض القوة العاشرة"
        />
      )}
    </section>
  );
}
