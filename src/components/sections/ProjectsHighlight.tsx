import { Link } from "react-router-dom";
import SectionTitle from "../ui/SectionTitle";
import ProjectCard from "../ui/ProjectCard";
import { projects } from "../../data/projects";

export default function ProjectsHighlightSection() {
  const featured = projects.filter((p) => p.featured).slice(0, 3);
  const displayed = featured.length > 0 ? featured : projects.slice(0, 3);

  return (
    <section
      className="section"
      style={{ backgroundColor: "var(--color-primary)" }}
      aria-labelledby="projects-highlight-heading"
    >
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-12">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: "var(--color-accent)" }}>
              من أعمالنا
            </p>
            <h2
              id="projects-highlight-heading"
              className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white leading-tight"
            >
              أعمالنا
            </h2>
            <div className="w-12 h-0.5 mt-4" style={{ backgroundColor: "var(--color-accent)" }} />
          </div>
          <Link
            to="/projects"
            className="self-start md:self-auto inline-flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition-colors duration-200"
          >
            جميع الأعمال
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </Link>
        </div>

        {/* Projects Grid */}
        {displayed.length === 0 ? (
          <div
            className="text-center py-20 border border-white/10"
          >
            <p className="text-white/40 text-sm">
              لا توجد مشاريع بعد — أضف مشاريعك في{" "}
              <code className="text-white/60">src/data/projects.ts</code>
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {displayed.map((project, i) => (
              <div key={project.id} className="bg-[var(--color-surface)]">
                <ProjectCard project={project} index={i} size={i === 0 ? "large" : "normal"} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
