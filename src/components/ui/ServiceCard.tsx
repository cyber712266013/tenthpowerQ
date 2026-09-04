import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { Service } from "../../data/services";

interface ServiceCardProps {
  service: Service;
  index?: number;
}

export default function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
      className="border-b border-[var(--color-border)] last:border-b-0"
    >
      <Link
        to={`/services/${service.slug}`}
        className="group flex items-start gap-6 py-7 md:py-8 focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
        aria-label={`خدمة: ${service.title}`}
      >
        {/* Number */}
        <span
          className="shrink-0 text-3xl font-light text-[var(--color-border-dark)] mt-1 w-10 text-center leading-none"
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg text-[var(--color-primary)] group-hover:text-[var(--color-accent)] transition-colors duration-200 mb-1.5">
            {service.title}
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)] leading-6">
            {service.shortDescription}
          </p>
        </div>

        {/* Arrow */}
        <div className="shrink-0 mt-1 w-8 h-8 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-muted)] group-hover:bg-[var(--color-accent)] group-hover:border-[var(--color-accent)] group-hover:text-white transition-all duration-200">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </Link>
    </motion.div>
  );
}
