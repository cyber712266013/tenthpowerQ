import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import companyInfo from "../../data/company";

const reasons = [
  { num: "01", title: "خبرة موثوقة", text: "سنوات من العمل الميداني تمنحنا فهمًا عميقًا لمتطلبات السوق المحلية وتحديات التنفيذ الفعلي." },
  { num: "02", title: "جودة لا تقبل المساومة", text: "نلتزم بأعلى معايير الجودة في كل مرحلة من مراحل التنفيذ، من التخطيط حتى التسليم." },
  { num: "03", title: "فريق متخصص", text: "كوادر مؤهلة ومدربة على أحدث أساليب البناء والتشطيب والإدارة الهندسية." },
  { num: "04", title: "التزام بالمواعيد", text: "نقدّر وقت عملائنا ونلتزم بالجداول الزمنية المتفق عليها دون التنازل عن الجودة." },
  { num: "05", title: "شفافية كاملة", text: "علاقتنا مع عملائنا مبنية على الوضوح والمصداقية في التعاملات والتقارير والتكاليف." },
  { num: "06", title: "دعم مستمر", text: "نقف بجانب عملائنا خلال جميع مراحل المشروع وما بعد التسليم بخدمات صيانة متكاملة." },
];

/* Spring "rope" config */
const ROPE = { stiffness: 55, damping: 15, mass: 1.2 };

export default function WhyUsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  /* Sticky heading parallax */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const rawHeadingY = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const headingY = useSpring(rawHeadingY, ROPE);

  return (
    <section id="why-us" ref={sectionRef} className="section bg-[var(--color-primary)] overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* Heading — spring parallax */}
          <motion.div className="lg:col-span-4 lg:sticky lg:top-28" style={{ y: headingY }}>
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="section-number mb-3">05</p>
              <h2 className="text-3xl md:text-4xl font-semibold text-white leading-snug mb-4">
                لماذا<br />
                <span style={{ color: "var(--color-accent)" }}>القوة العاشرة؟</span>
              </h2>
              <div className="divider" />
              <p className="text-white/50 text-sm mt-5 leading-7 max-w-xs">
                نؤمن أن الثقة تُبنى عبر الإنجاز والشفافية، وليس فقط الوعود.
              </p>
            </motion.div>
          </motion.div>

          {/* Grid — spring-bounce per cell */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/10">
            {reasons.map((r, i) => (
              <motion.div
                key={r.num}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  type: "spring",
                  stiffness: 70,
                  damping: 16,
                  mass: 1,
                  delay: i * 0.07,
                }}
                whileHover={{
                  backgroundColor: "rgba(255,255,255,0.04)",
                  transition: { duration: 0.2 },
                }}
                className="bg-[var(--color-primary)] p-6 md:p-7 group cursor-default"
              >
                <p className="text-[var(--color-accent)] text-sm font-semibold mb-4">{r.num}</p>
                <h3 className="font-semibold text-white text-base mb-3 group-hover:text-[var(--color-accent)] transition-colors duration-250">
                  {r.title}
                </h3>
                <p className="text-white/45 text-sm leading-6">{r.text}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
