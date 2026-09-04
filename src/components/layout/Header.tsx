import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import companyInfo from "../../data/company";

const navLinks = [
  { label: "الرئيسية", href: "#top" },
  { label: "من نحن", href: "#about" },
  { label: "خدماتنا", href: "#services" },
  { label: "أعمالنا", href: "#projects" },
  { label: "تواصل معنا", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const menuRef = useRef<HTMLDivElement>(null);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section detection via IntersectionObserver
  useEffect(() => {
    const sections = navLinks.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3, rootMargin: "-70px 0px -40% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node))
        setMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  // Prevent scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNavClick = useCallback((href: string) => {
    setMenuOpen(false);
    const id = href.replace("#", "");
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const offset = 72;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  const isActive = (href: string) => activeSection === href.replace("#", "");

  return (
    <>
      <header
        className={[
          "fixed top-0 inset-x-0 z-50 transition-all duration-400",
          scrolled
            ? "bg-white/96 backdrop-blur-md border-b border-[var(--color-border)] shadow-[0_1px_16px_rgba(0,0,0,0.06)]"
            : "bg-transparent",
        ].join(" ")}
      >
        <div className="container">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <button
              onClick={() => handleNavClick("#top")}
              className="flex items-center gap-3 select-none group focus-visible:outline-none"
              aria-label="العودة إلى الأعلى"
            >
              <img
                src="/icons/app_logo_round.webp"
                alt="شعار القوة العاشرة"
                className="w-10 h-10 md:w-11 md:h-11 rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span className={[
                "font-semibold text-sm md:text-base leading-tight transition-colors duration-300 hidden sm:block",
                scrolled ? "text-[var(--color-primary)]" : "text-white",
              ].join(" ")}>
                {companyInfo.nameShort}
              </span>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8" aria-label="التنقل">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={[
                    "text-sm font-medium transition-all duration-200 relative py-1 cursor-pointer",
                    "after:absolute after:bottom-0 after:inset-x-0 after:h-[1.5px]",
                    "after:bg-[var(--color-accent)] after:transition-transform after:duration-250 after:origin-right",
                    isActive(link.href) ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100",
                    isActive(link.href)
                      ? "text-[var(--color-accent)]"
                      : scrolled
                      ? "text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]"
                      : "text-white/85 hover:text-white",
                  ].join(" ")}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Mobile burger */}
            <button
              className="md:hidden flex flex-col gap-[5px] p-2"
              aria-label="فتح القائمة"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((p) => !p)}
            >
              {[0, 1, 2].map((i) => (
                <span key={i} className={[
                  "block h-[1.5px] transition-all duration-300",
                  scrolled ? "bg-[var(--color-primary)]" : "bg-white",
                  i === 0 ? (menuOpen ? "w-6 translate-y-[6.5px] rotate-45" : "w-6") :
                  i === 1 ? (menuOpen ? "w-0 opacity-0" : "w-4") :
                  (menuOpen ? "w-6 -translate-y-[6.5px] -rotate-45" : "w-6"),
                ].join(" ")} />
              ))}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/50 md:hidden"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.nav
              ref={menuRef}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-[var(--color-surface)] shadow-2xl flex flex-col md:hidden"
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Menu top */}
              <div className="flex items-center justify-between p-5 border-b border-[var(--color-border)]">
                <div className="flex items-center gap-3">
                  <img src="/icons/app_logo_round.webp" alt="شعار القوة العاشرة" className="w-9 h-9 rounded-full object-cover" />
                  <span className="font-semibold text-sm text-[var(--color-primary)]">{companyInfo.nameShort}</span>
                </div>
                <button onClick={() => setMenuOpen(false)} className="text-[var(--color-muted)] hover:text-[var(--color-primary)] p-1" aria-label="إغلاق">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M14 4L4 14M4 4l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              {/* Links */}
              <div className="flex-1 py-3 overflow-y-auto">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04 }}
                    onClick={() => handleNavClick(link.href)}
                    className={[
                      "w-full flex items-center px-6 py-4 text-base font-medium border-b border-[var(--color-border)]",
                      "transition-colors duration-150 text-right",
                      isActive(link.href)
                        ? "text-[var(--color-accent)] bg-[var(--color-accent-pale)]"
                        : "text-[var(--color-text)] hover:text-[var(--color-accent)] hover:bg-[var(--color-surface-2)]",
                    ].join(" ")}
                  >
                    {link.label}
                  </motion.button>
                ))}
              </div>

              <div className="p-5 border-t border-[var(--color-border)]">
                <p className="text-xs text-[var(--color-muted)] text-center">مؤسسة القوة العاشرة للمقاولات العامة</p>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
