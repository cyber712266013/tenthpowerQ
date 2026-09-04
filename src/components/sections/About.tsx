import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import companyInfo from "../../data/company";
import { Reveal, StaggerGroup, StaggerItem } from "../ui/Animations";

/* Rope spring config */
const SPRING = { stiffness: 55, damping: 16, mass: 1.1 };

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  /* Parallax for sidebar — moves upward as you scroll down */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const sidebarY = useSpring(rawY, SPRING);

  return (
    <section id="about" ref={sectionRef} className="section bg-[var(--color-surface)] overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* Text — left column */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="section-number mb-3">01</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[var(--color-primary)] mb-2 leading-tight">
                {companyInfo.name}
              </h2>
              <div className="divider" />
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-[var(--color-text-secondary)] leading-8 md:text-lg mt-6 mb-8">
                {companyInfo.description}
              </p>
            </Reveal>

            {/* Stats grid */}
            {companyInfo.stats.some((s) => !s.value.startsWith("[")) && (
              <StaggerGroup stagger={0.07}>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-px border border-[var(--color-border)]">
                  {companyInfo.stats.map((stat, i) => (
                    <StaggerItem key={i}>
                      <div className="p-5 bg-[var(--color-bg)] text-center">
                        <p className="text-2xl md:text-3xl font-semibold text-[var(--color-primary)]">
                          {stat.value}
                        </p>
                        <p className="text-xs text-[var(--color-muted)] mt-1">{stat.label}</p>
                      </div>
                    </StaggerItem>
                  ))}
                </div>
              </StaggerGroup>
            )}

            {/* Official info */}
            <Reveal delay={0.25}>
              <div className="mt-8 border-t border-[var(--color-border)] pt-6 flex flex-wrap gap-6">
                {[
                  { label: "السجل التجاري", value: companyInfo.registrationNumber },
                  { label: "الرقم الموحد", value: companyInfo.unifiedNumber },
                  { label: "الموقع", value: companyInfo.locationFull },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-[10px] tracking-widest text-[var(--color-muted)] uppercase mb-1">{item.label}</p>
                    <p className="text-sm font-medium text-[var(--color-primary)]">{item.value}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Sidebar — spring parallax "rope" effect */}
          <motion.div
            className="lg:col-span-5 space-y-0 divide-y divide-[var(--color-border)] border border-[var(--color-border)]"
            style={{ y: sidebarY }}
          >
            {[
              { title: "رؤيتنا", text: companyInfo.vision },
              { title: "رسالتنا", text: companyInfo.mission },
              ...companyInfo.values.map((v) => ({ title: v.title, text: v.description })),
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="p-6"
              >
                <div className="flex items-start gap-4">
                  <span className="text-[var(--color-accent)] font-semibold text-sm w-7 shrink-0 mt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-semibold text-[var(--color-primary)] text-sm mb-2">{item.title}</h3>
                    <p className="text-[var(--color-text-secondary)] text-sm leading-6">{item.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
