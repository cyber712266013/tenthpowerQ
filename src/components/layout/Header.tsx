import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { label: "الرئيسية", href: "#top" },
  { label: "من نحن", href: "#about" },
  { label: "خدماتنا", href: "#services" },
  { label: "أعمالنا", href: "#projects" },
  { label: "لماذا نحن", href: "#why-us" },
  { label: "تواصل معنا", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const menuRef = useRef<HTMLDivElement>(null);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
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
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  const isActive = (href: string) => activeSection === href.replace("#", "");

  return (
    <>
      <header
        className={[
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-[#faf9f5]/95 backdrop-blur-md border-b border-[var(--color-border)] shadow-[0_2px_15px_rgba(0,0,0,0.03)]"
            : "bg-[#faf9f5]/90 backdrop-blur-sm border-b border-transparent",
        ].join(" ")}
      >
        <div className="container">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Logo on the Right (RTL start) */}
            <button
              onClick={() => handleNavClick("#top")}
              className="flex items-center gap-3 select-none group focus-visible:outline-none cursor-pointer text-right"
              aria-label="العودة إلى الأعلى"
            >
              <img
                src="/icons/app_logo.webp"
                alt="شعار القوة العاشرة"
                className="w-10 h-10 md:w-11 md:h-11 object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="flex flex-col">
                <span className="font-bold text-base md:text-lg text-[var(--color-primary)] leading-none tracking-tight">
                  القوة العاشرة
                </span>
                <span className="text-[10px] md:text-xs text-[var(--color-muted)] tracking-wider mt-1">
                  للمقاولات والتجارة العامة
                </span>
              </div>
            </button>

            {/* Desktop Nav in Center */}
            <nav className="hidden lg:flex items-center gap-8 xl:gap-10" aria-label="التنقل الرئيسي">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={[
                    "text-sm font-medium transition-all duration-200 relative py-1 cursor-pointer",
                    "after:absolute after:bottom-[-2px] after:inset-x-0 after:h-[2px]",
                    "after:bg-[var(--color-accent)] after:transition-transform after:duration-250 after:origin-right",
                    isActive(link.href) ? "after:scale-x-100 font-semibold" : "after:scale-x-0 hover:after:scale-x-100",
                    isActive(link.href)
                      ? "text-[var(--color-primary)]"
                      : "text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]",
                  ].join(" ")}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Left Button "تواصل معنا" on Desktop */}
            <div className="hidden lg:flex items-center">
              <button
                onClick={() => handleNavClick("#contact")}
                className="px-6 py-2.5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-light)] text-white text-xs md:text-sm font-medium rounded-md shadow-xs transition-colors duration-200 cursor-pointer"
              >
                تواصل معنا
              </button>
            </div>

            {/* Mobile burger button */}
            <button
              className="lg:hidden flex flex-col gap-[5px] p-2 text-[var(--color-primary)] cursor-pointer"
              aria-label="فتح القائمة"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((p) => !p)}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={[
                    "block h-[2px] bg-[var(--color-primary)] transition-all duration-300",
                    i === 0 ? (menuOpen ? "w-6 translate-y-[7px] rotate-45" : "w-6") :
                    i === 1 ? (menuOpen ? "w-0 opacity-0" : "w-4") :
                    (menuOpen ? "w-6 -translate-y-[7px] -rotate-45" : "w-6"),
                  ].join(" ")}
                />
              ))}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.nav
              ref={menuRef}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-[#faf9f5] border-l border-[var(--color-border)] shadow-2xl flex flex-col lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between p-6 border-b border-[var(--color-border)]">
                <div className="flex items-center gap-3">
                  <img src="/icons/app_logo.webp" alt="شعار القوة العاشرة" className="w-8 h-8 object-contain" />
                  <span className="font-bold text-sm text-[var(--color-primary)]">القوة العاشرة</span>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-[var(--color-muted)] hover:text-[var(--color-primary)] p-1 cursor-pointer"
                  aria-label="إغلاق"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M14 4L4 14M4 4l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <div className="flex-1 py-4 overflow-y-auto">
                {navLinks.map((link, i) => (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className={[
                      "w-full flex items-center px-6 py-4 text-sm font-medium border-b border-[var(--color-border)]/50",
                      "transition-colors text-right cursor-pointer",
                      isActive(link.href)
                        ? "text-[var(--color-accent)] bg-[var(--color-accent-pale)]"
                        : "text-[var(--color-text)] hover:text-[var(--color-accent)]",
                    ].join(" ")}
                  >
                    {link.label}
                  </button>
                ))}
              </div>

              <div className="p-6 border-t border-[var(--color-border)]">
                <button
                  onClick={() => handleNavClick("#contact")}
                  className="w-full py-3 bg-[var(--color-accent)] text-white text-sm font-medium rounded-md text-center"
                >
                  تواصل معنا
                </button>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
