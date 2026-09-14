import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lightbox from "../ui/Lightbox";
import EditorialMedia from "../ui/EditorialMedia";

export interface VisualWorkItem {
  id: string;
  src: string;
  videoUrl?: string;
  tilt: number;
  aspect?: string;
  alignment: "right" | "left";
}

const allVisualWorks: VisualWorkItem[] = [
  {
    id: "w1",
    src: "/images/twenty-five-commercial-center-facade-1.png",
    tilt: -2.2,
    alignment: "right",
  },
  {
    id: "w2",
    src: "/images/image5.png",
    tilt: 2.0,
    alignment: "left",
  },
  {
    id: "w3",
    src: "/images/curved-glass-panoramic-elevator-villa-1.png",
    tilt: -1.8,
    alignment: "right",
  },
  {
    id: "w4",
    src: "/images/Image4.png",
    tilt: 2.2,
    alignment: "left",
  },
  {
    id: "w5",
    src: "/images/twenty-five-commercial-center-facade-2.png",
    tilt: -2.0,
    alignment: "right",
  },
  {
    id: "w6",
    src: "/images/curved-glass-panoramic-elevator-villa-2.png",
    tilt: 1.8,
    alignment: "left",
  },
  {
    id: "w7",
    src: "/images/cake-by-mamola-curved-showcase.png",
    tilt: -2.1,
    alignment: "right",
  },
  {
    id: "w8",
    src: "/images/curved-glass-refrigerated-showcase.png",
    tilt: 2.3,
    alignment: "left",
  },
  {
    id: "w9",
    src: "/images/curved-glass-showcases-pair.png",
    tilt: -1.9,
    alignment: "right",
  },
  {
    id: "w10",
    src: "/images/bakery-pastry-glass-display-counter.jpg",
    tilt: 2.1,
    alignment: "left",
  },
  {
    id: "w11",
    src: "/images/commercial-bakery-stainless-steel-counters.jpg",
    tilt: -2.0,
    alignment: "right",
  },
  {
    id: "w12",
    src: "/images/luxury-polished-meeting-table.png",
    tilt: 1.8,
    alignment: "left",
  },
  {
    id: "w13",
    src: "/images/luxury-polished-meeting-table-2.jpg",
    tilt: -2.2,
    alignment: "right",
  },
  {
    id: "w14",
    src: "/images/decorative-backlit-mirror.jpg",
    tilt: 1.9,
    alignment: "left",
  },
  {
    id: "w15",
    src: "/images/hero.png",
    tilt: -2.0,
    alignment: "right",
  },
  {
    id: "w16",
    src: "/images/about.png",
    tilt: 1.7,
    alignment: "left",
  },
  {
    id: "w17",
    src: "/images/services/al-quwwa-al-ashira-aluminum-jeddah-2024.jpg",
    tilt: -2.1,
    alignment: "right",
  },
  {
    id: "w18",
    src: "/images/services/al-quwwa-al-ashira-stainless-steel-khobar-2023.jpg",
    tilt: 2.0,
    alignment: "left",
  },
  {
    id: "w19",
    src: "/images/services/building.jpg",
    tilt: -1.8,
    alignment: "right",
  },
  {
    id: "w20",
    src: "/images/services/finishing.jpg",
    tilt: 2.2,
    alignment: "left",
  },
  {
    id: "w21",
    src: "/images/services/maintenance.jpg",
    tilt: -2.0,
    alignment: "right",
  },
  {
    id: "w22",
    src: "/images/services/renovation.jpg",
    tilt: 1.9,
    alignment: "left",
  },
  {
    id: "w23",
    src: "/images/al-quwwa-al-ashira-diverse-projects-riyadh-2025-14.jpeg",
    tilt: -2.1,
    alignment: "right",
  },
  {
    id: "w24",
    src: "/images/al-quwwa-al-ashira-diverse-projects-riyadh-2025-18.jpeg",
    tilt: 2.0,
    alignment: "left",
  },
  {
    id: "w25",
    src: "/images/al-quwwa-al-ashira-diverse-projects-riyadh-2025-20.jpeg",
    tilt: -1.9,
    alignment: "right",
  },
  {
    id: "w26",
    src: "/images/al-quwwa-al-ashira-diverse-projects-riyadh-2025-22.jpeg",
    tilt: 1.8,
    alignment: "left",
  },
  {
    id: "w27",
    src: "/images/IMG-20251020-WA0017.jpg",
    tilt: -2.2,
    alignment: "right",
  },
  {
    id: "w28",
    src: "/images/IMG-20251020-WA0018.jpg",
    tilt: 2.0,
    alignment: "left",
  },
  {
    id: "w29",
    src: "/images/hero-bg.gif",
    tilt: -2.1,
    alignment: "right",
  },
];

export default function GallerySection() {
  const [expanded, setExpanded] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const initialCount = 9;
  const displayedWorks = expanded ? allVisualWorks : allVisualWorks.slice(0, initialCount);

  const allImages = allVisualWorks.map((w) => w.src);

  return (
    <section
      id="gallery"
      className="editorial-section bg-[#faf9f5] overflow-hidden py-8 sm:py-12 md:py-16"
      aria-label="معرض صور الأعمال"
    >
      <div className="container">
        {/* Minimal Section Tag */}
        <div className="text-center max-w-xl mx-auto mb-16 md:mb-20">
          <p className="text-xl sm:text-2xl font-serif text-[var(--color-accent)] mb-2 font-medium">
            معرض الأعمال
          </p>
          <div className="w-12 h-px bg-[var(--color-accent)]/50 mx-auto" />
        </div>

        {/* Alternating Pure Visual Layout (NO TEXT beside images/videos) */}
        <div className="space-y-20 md:space-y-28">
          {displayedWorks.map((item, index) => {
            const isLeaningRight = item.alignment === "right";

            return (
              <motion.div
                key={item.id}
                className="w-full flex"
                style={{
                  justifyContent: isLeaningRight ? "flex-start" : "flex-end",
                }}
                initial={{ opacity: 0, y: 45 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Large Architectural Frame without text beside it */}
                <div className="w-full sm:w-11/12 lg:w-9/12 xl:w-8/12">
                  <EditorialMedia
                    src={item.src}
                    videoUrl={item.videoUrl}
                    alt={`عمل من مشاريع القوة العاشرة ${index + 1}`}
                    tilt={item.tilt}
                    aspectRatio="aspect-[16/10] md:aspect-[16/9]"
                    hoverLabel="انقر للتكبير والمشاهدة"
                    onClick={() => setLightboxIndex(index)}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* "عرض المزيد" Button */}
        <div className="text-center mt-16 md:mt-24">
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="inline-flex items-center gap-3 px-10 py-4 border border-[var(--color-accent)] text-[var(--color-primary)] hover:bg-[var(--color-accent)] hover:text-white rounded-md text-sm font-medium transition-all duration-200 cursor-pointer shadow-xs"
          >
            <span>{expanded ? "عرض أقل" : "عرض المزيد من الأعمال"}</span>
            <motion.span
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-[var(--color-accent)] group-hover:text-white"
            >
              ↓
            </motion.span>
          </button>
        </div>
      </div>

      {/* Lightbox for full-res image viewing */}
      {lightboxIndex !== null && (
        <Lightbox
          images={allImages}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          altPrefix="أعمال القوة العاشرة"
        />
      )}
    </section>
  );
}
