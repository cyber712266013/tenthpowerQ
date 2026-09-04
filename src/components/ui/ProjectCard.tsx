import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { Project } from "../../data/projects";

interface ProjectCardProps {
  project: Project;
  index?: number;
  size?: "normal" | "large";
}

export default function ProjectCard({
  project,
  index = 0,
  size = "normal",
}: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07, ease: "easeOut" }}
    >
      <Link
        to={`/projects/${project.slug}`}
        className="group block overflow-hidden bg-[var(--color-surface)] focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
        aria-label={`مشروع: ${project.title}`}
      >
        {/* Image */}
        <div
          className={[
            "overflow-hidden relative",
            size === "large" ? "aspect-[16/10]" : "aspect-[4/3]",
          ].join(" ")}
        >
          {project.coverImage && !project.coverImage.includes("[أضف") ? (
            <img
              src={project.coverImage}
              alt={`صورة مشروع ${project.title}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="img-placeholder w-full h-full flex-col gap-2">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="opacity-40"
              >
                <rect x="3" y="3" width="18" height="18" rx="1" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="m21 15-5-5L5 21" />
              </svg>
              <span className="opacity-40 text-xs">صورة المشروع</span>
            </div>
          )}
          {/* Category tag */}
          <div className="absolute top-3 right-3">
            <span className="bg-white/90 backdrop-blur-sm text-[var(--color-primary)] text-xs font-medium px-2.5 py-1 rounded-sm">
              {project.category}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="pt-4 pb-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-base text-[var(--color-primary)] leading-snug group-hover:text-[var(--color-accent)] transition-colors duration-200">
              {project.title}
            </h3>
            <svg
              className="shrink-0 mt-0.5 text-[var(--color-muted)] transition-transform duration-200 group-hover:-translate-x-1 rtl:group-hover:translate-x-1"
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex items-center gap-3 mt-2 text-xs text-[var(--color-muted)]">
            {project.location && (
              <span className="flex items-center gap-1">
                <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 1a5 5 0 00-5 5c0 3.25 5 9 5 9s5-5.75 5-9a5 5 0 00-5-5zm0 7a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
                {project.location}
              </span>
            )}
            {project.year && (
              <span>{project.year}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
