import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { services } from "../../data/services";
import type { Service } from "../../data/services";
import { Reveal } from "../ui/Animations";

function ServiceModal({ service, onClose }: { service: Service; onClose: () => void }) {
  // Prevent scroll behind modal
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const hasImage = service.coverImage && !service.coverImage.includes("[أضف");

  return (
    <AnimatePresence>
      <motion.div
        className="modal-backdrop"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`تفاصيل خدمة ${service.title}`}
      />

      <motion.div
        className="fixed inset-x-0 bottom-0 md:inset-x-auto md:inset-0 md:flex md:items-center md:justify-center z-[101] p-0 md:p-6"
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 32 }}
      >
        <div
          className="relative w-full md:max-w-3xl bg-[var(--color-surface)] overflow-y-auto max-h-[92dvh] md:max-h-[85vh] md:rounded-sm shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 z-10 w-9 h-9 flex items-center justify-center bg-[var(--color-primary)] text-white hover:bg-[var(--color-accent)] transition-colors"
            aria-label="إغلاق"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M13 1L1 13M1 1l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Image */}
          <div className="aspect-[16/7] w-full overflow-hidden bg-[var(--color-surface-2)]">
            {hasImage ? (
              <img src={service.coverImage} alt={service.title} className="w-full h-full object-cover" />
            ) : (
              <div className="img-placeholder w-full h-full flex-col gap-2">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75" className="opacity-30">
                  <rect x="3" y="3" width="18" height="18" rx="1"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>
                </svg>
                <span className="text-xs opacity-40">أضف صورة الخدمة</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 lg:p-10">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <p className="section-number mb-2">خدمة {String(service.order).padStart(2, "0")}</p>
                <h2 className="text-2xl md:text-3xl font-semibold text-[var(--color-primary)]">{service.title}</h2>
              </div>
            </div>

            <div className="w-8 h-px bg-[var(--color-accent)] mb-6" />

            <p className="text-[var(--color-text-secondary)] leading-8 mb-8">{service.description}</p>

            {/* Scope */}
            <div className="border-t border-[var(--color-border)] pt-6">
              <p className="text-xs tracking-widest text-[var(--color-muted)] uppercase mb-5">نطاق الخدمة</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.scope.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0 bg-[var(--color-accent)]" />
                    <span className="text-sm text-[var(--color-text-secondary)] leading-6">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="mt-8 pt-6 border-t border-[var(--color-border)]">
              <button
                onClick={() => {
                  onClose();
                  setTimeout(() => {
                    const el = document.getElementById("contact");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }, 350);
                }}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[var(--color-primary)] text-white text-sm font-medium hover:bg-[var(--color-accent)] transition-colors"
              >
                تواصل لطلب هذه الخدمة
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function ServicesSection() {
  const [selected, setSelected] = useState<Service | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  function handleCardClick(service: Service) {
    setSelected(service);
  }

  return (
    <section id="services" className="section bg-[var(--color-primary)] overflow-hidden pb-8 md:pb-12">
      <div className="container mb-6 md:mb-8">
        <Reveal>
          <p className="section-number mb-3">02</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-2">خدماتنا</h2>
          <div className="divider" />
          <p className="text-white/50 text-sm max-w-md mt-3">
            نقدم باقة متكاملة من خدمات المقاولات بمعايير عالية الجودة.
          </p>
        </Reveal>
      </div>


      {/* Services Display: Horizontal scroll on mobile / 3-column luxury card grid on desktop */}
      <div className="container">
        {/* Mobile: horizontal scroll */}
        <div
          ref={scrollRef}
          className="flex md:hidden h-scroll pb-4 -mx-4 px-4 gap-4"
        >
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} onClick={() => handleCardClick(service)} dark />
          ))}
          {/* trailing space */}
          <div className="w-4 shrink-0" aria-hidden="true" />
        </div>

        {/* Desktop: 3-column luxury visual grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} onClick={() => handleCardClick(service)} dark isGrid />
          ))}
        </div>
      </div>


      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <ServiceModal service={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

function ServiceCard({ service, index, onClick, dark, isGrid }: {
  service: Service; index: number; onClick: () => void; dark?: boolean; isGrid?: boolean;
}) {
  const hasImage = service.coverImage && !service.coverImage.includes("[أضف");
  return (
    <motion.button
      initial={{ opacity: 0, y: 50, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        type: "spring",
        stiffness: 65,
        damping: 16,
        mass: 1.1,
        delay: index * 0.09,
      }}
      whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
      onClick={onClick}
      className={[
        "flex flex-col text-right rounded-none overflow-hidden group cursor-pointer text-start",
        isGrid ? "w-full" : "shrink-0 w-72",
        "border border-white/10 hover:border-[var(--color-accent)] transition-all duration-300 shadow-lg hover:shadow-[0_12px_30px_rgba(0,0,0,0.35)]",
        dark ? "bg-[var(--color-primary-light)]" : "bg-[var(--color-surface)]",
      ].join(" ")}
      aria-label={`عرض تفاصيل خدمة ${service.title}`}
    >
      {/* Image */}
      <div className="aspect-[4/3] w-full overflow-hidden">
        {hasImage ? (
          <img src={service.coverImage} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        ) : (
          <div className="img-placeholder w-full h-full" style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "none" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.75">
              <rect x="3" y="3" width="18" height="18" rx="1"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>
            </svg>
          </div>
        )}
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <p className="text-[var(--color-accent)] text-[10px] tracking-widest uppercase mb-2">
          {String(service.order).padStart(2, "0")}
        </p>
        <h3 className="font-semibold text-white text-base mb-2 leading-snug">{service.title}</h3>
        <p className="text-white/45 text-xs leading-5 flex-1">{service.shortDescription}</p>
        <p className="mt-4 text-[var(--color-accent)] text-xs tracking-wide flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          تفاصيل أكثر
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <path d="M2 6h8M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </p>
      </div>
    </motion.button>
  );
}

function ServiceRow({ service, index, onClick }: {
  service: Service; index: number; onClick: () => void;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ type: "spring", stiffness: 80, damping: 18, delay: index * 0.07 }}
      onClick={onClick}
      className="w-full text-right group py-7 flex items-center justify-between gap-6 hover:bg-white/[0.02] transition-colors px-0 cursor-pointer"
      aria-label={`عرض تفاصيل ${service.title}`}
    >

      <div className="flex items-center gap-8 flex-1 min-w-0">
        <span className="text-[var(--color-accent)] text-sm font-medium w-8 shrink-0">
          {String(service.order).padStart(2, "0")}
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white text-lg md:text-xl group-hover:text-[var(--color-accent)] transition-colors duration-200">
            {service.title}
          </h3>
          <p className="text-white/40 text-sm mt-1 leading-5 truncate max-w-md">{service.shortDescription}</p>
        </div>
      </div>

      <div className="flex items-center gap-6 shrink-0">
        {/* Scope preview */}
        <div className="hidden lg:flex gap-2 flex-wrap max-w-xs">
          {service.scope.slice(0, 2).map((s, i) => (
            <span key={i} className="text-[10px] text-white/30 border border-white/10 px-2 py-0.5">
              {s}
            </span>
          ))}
        </div>
        {/* Arrow */}
        <div className="w-9 h-9 border border-white/15 flex items-center justify-center group-hover:border-[var(--color-accent)] group-hover:bg-[var(--color-accent)] transition-all duration-200">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="group-hover:text-white text-white/50 transition-colors">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </motion.button>
  );
}
