/**
 * Shared animation utilities for the catalog
 * - ScrollReveal: text/content fade-up with stagger
 * - ParallaxImage: spring-based elastic parallax on scroll
 * - SpringCard: spring entrance for cards
 */

import {
  useRef,
  type ReactNode,
  type CSSProperties,
} from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";

/* ─── Easing ─── */
export const ease = [0.22, 1, 0.36, 1] as const;
export const easeSoft = [0.16, 1, 0.3, 1] as const;

/* ─── Spring config: low stiffness = "rope" feel ─── */
const SPRING_ROPE = { stiffness: 60, damping: 18, mass: 1.2 };
const SPRING_SMOOTH = { stiffness: 120, damping: 22, mass: 0.8 };

/* ═══════════════════════════════════════════════════
   1. ScrollReveal — fade-up for any content
═══════════════════════════════════════════════════ */
interface RevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
  once?: boolean;
}

export function Reveal({
  children,
  delay = 0,
  duration = 0.65,
  y = 32,
  className,
  style,
  once = true,
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration, delay, ease }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   2. StaggerGroup — children animate in sequence
═══════════════════════════════════════════════════ */
interface StaggerProps {
  children: ReactNode;
  stagger?: number;
  className?: string;
  once?: boolean;
}

const staggerVariants = (stagger: number) => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger } },
});

const itemVariant = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease },
  },
};

export function StaggerGroup({ children, stagger = 0.09, className, once = true }: StaggerProps) {
  return (
    <motion.div
      variants={staggerVariants(stagger)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-60px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={itemVariant} className={className}>
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   3. ParallaxImage — spring "rope" scroll effect
   The image lags behind scroll like hanging on a spring
═══════════════════════════════════════════════════ */
interface ParallaxProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  /** How many px to shift vertically relative to scroll progress (0-1) */
  strength?: number;
  imgClassName?: string;
  loading?: "eager" | "lazy";
}

export function ParallaxImage({
  src,
  alt,
  className,
  containerClassName,
  strength = 60,
  imgClassName = "w-full h-full object-cover",
  loading = "lazy",
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Raw transform: maps scroll 0→1 to -strength → +strength
  const rawY = useTransform(scrollYProgress, [0, 1], [-strength, strength]);

  // Spring with "rope" physics — low stiffness, slight mass
  const y = useSpring(rawY, SPRING_ROPE);

  return (
    <div ref={ref} className={`overflow-hidden ${containerClassName ?? ""}`}>
      <motion.img
        src={src}
        alt={alt}
        className={imgClassName}
        style={{ y, scale: 1.08 }} // slight scale-up so parallax doesn't show white edges
        loading={loading}
        decoding="async"
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   4. SpringCard — card that bounces in on scroll
═══════════════════════════════════════════════════ */
interface SpringCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
  as?: "div" | "button" | "article";
}

export function SpringCard({
  children,
  delay = 0,
  className,
  style,
  onClick,
  as = "div",
}: SpringCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const inViewDiv = useInView(divRef, { once: true, margin: "-50px" });
  const inViewBtn = useInView(btnRef, { once: true, margin: "-50px" });

  const inView = as === "button" ? inViewBtn : inViewDiv;

  const springTransition = {
    delay,
    type: "spring" as const,
    ...SPRING_SMOOTH,
  };

  const animProps = {
    initial: { opacity: 0, y: 40, scale: 0.96 },
    animate: inView ? { opacity: 1, y: 0, scale: 1, transition: springTransition } : {},
    className,
    style,
    onClick,
  };

  if (as === "button") {
    return <motion.button ref={btnRef} {...animProps}>{children}</motion.button>;
  }
  return <motion.div ref={divRef} {...animProps}>{children}</motion.div>;
}

/* ═══════════════════════════════════════════════════
   5. SectionLabel — animated numbered section header
═══════════════════════════════════════════════════ */
interface SectionLabelProps {
  number: string;
  title: string;
  subtitle?: string;
  light?: boolean;
  delay?: number;
}

export function SectionLabel({ number, title, subtitle, light, delay = 0 }: SectionLabelProps) {
  return (
    <Reveal delay={delay}>
      <p className="section-number mb-3" style={light ? { color: "var(--color-accent)" } : {}}>
        {number}
      </p>
      <h2
        className={`text-3xl md:text-4xl font-semibold mb-2 leading-tight ${
          light ? "text-white" : "text-[var(--color-primary)]"
        }`}
      >
        {title}
      </h2>
      <div className="divider" />
      {subtitle && (
        <p
          className={`text-sm mt-4 max-w-md leading-7 ${
            light ? "text-white/50" : "text-[var(--color-muted)]"
          }`}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}

/* ═══════════════════════════════════════════════════
   6. FloatOnHover — subtle float effect on hover
═══════════════════════════════════════════════════ */
export function FloatOnHover({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
    >
      {children}
    </motion.div>
  );
}
