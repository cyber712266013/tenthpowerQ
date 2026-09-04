import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SectionTitleProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "right" | "center";
}

export default function SectionTitle({
  label,
  title,
  subtitle,
  align = "right",
}: SectionTitleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={align === "center" ? "text-center" : ""}
    >
      {label && (
        <p className="text-xs font-semibold tracking-[0.2em] text-[var(--color-accent)] uppercase mb-3">
          {label}
        </p>
      )}
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-[var(--color-primary)] leading-tight">
        {title}
      </h2>
      {align === "right" ? (
        <div className="divider mt-4" />
      ) : (
        <div className="divider mt-4 mx-auto" />
      )}
      {subtitle && (
        <p className="mt-4 text-[var(--color-text-secondary)] text-base leading-7 max-w-2xl">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
