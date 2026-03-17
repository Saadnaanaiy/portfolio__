import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaExternalLinkAlt,
  FaGithub,
} from "react-icons/fa";
import { workData } from "../assets/assets";
import GradientText from "./GradientText";

const WorkSection = ({ isDarkMode }) => {
  const [activeFilter, setActiveFilter] = useState("all");
  const dragRef = useRef(null);
  const isPointerDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollStartRef = useRef(0);
  const router = useRouter();

  const filters = [
    { id: "all", label: "All" },
    { id: "cloud", label: "Cloud" },
    { id: "devops", label: "DevOps" },
    { id: "devsecops", label: "DevSecOps" },
    { id: "dev", label: "Dev" },
    { id: "ai", label: "AI" },
    { id: "cybersecurity", label: "Cybersecurity / SOC / SIEM" },
  ];

  const visibleProjects =
    activeFilter === "all"
      ? workData
      : workData.filter((project) => project.section === activeFilter);

  const getMainPoints = (project) => {
    if (Array.isArray(project.highlights) && project.highlights.length > 0) {
      return project.highlights.slice(0, 3);
    }

    return (project.content || "")
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.startsWith("-") || line.startsWith("•"))
      .map((line) => line.replace(/^[-•]\s*/, ""))
      .slice(0, 3);
  };

  const scrollProjects = (direction) => {
    if (!dragRef.current) {
      return;
    }

    const amount = direction === "left" ? -360 : 360;
    dragRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  const handlePointerDown = (event) => {
    if (!dragRef.current) {
      return;
    }

    isPointerDownRef.current = true;
    startXRef.current = event.pageX - dragRef.current.offsetLeft;
    scrollStartRef.current = dragRef.current.scrollLeft;
  };

  const handlePointerMove = (event) => {
    if (!dragRef.current || !isPointerDownRef.current) {
      return;
    }

    event.preventDefault();
    const x = event.pageX - dragRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.2;
    dragRef.current.scrollLeft = scrollStartRef.current - walk;
  };

  const stopPointerDrag = () => {
    isPointerDownRef.current = false;
  };

  return (
    <div
      id="work"
      className="w-full px-4 md:px-[8%] py-20 scroll-mt-20 relative overflow-hidden bg-white dark:bg-cyber-dark"
    >
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-cyber-cyan/10 dark:bg-cyber-cyan/5 blur-3xl" />
        <div className="absolute bottom-40 right-10 w-80 h-80 rounded-full bg-cyber-emerald/10 dark:bg-cyber-emerald/5 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        <p className="text-center mb-2 font-mono text-sm text-cyber-cyan">
          &gt; projects
        </p>
        <h2 className="text-center mb-12 text-4xl sm:text-5xl font-bold animate-fade-in">
          <GradientText
            colors={
              isDarkMode
                ? ["#06b6d4", "#10b981", "#06b6d4", "#0891b2"]
                : ["#0f172a", "#06b6d4", "#0f172a", "#10b981"]
            }
            animationSpeed={3}
            showBorder={false}
            className="custom-class"
          >
            Security & Development Projects
          </GradientText>
        </h2>

        <div className="rounded-2xl border border-slate-200 dark:border-cyber-border bg-slate-50/70 dark:bg-cyber-surface/70 p-4 sm:p-6 backdrop-blur">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg sm:text-xl font-semibold text-slate-800 dark:text-slate-100">
              Drag & Pull Project Board
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-cyber-cyan">
                drag horizontally to explore
              </span>
              <button
                onClick={() => scrollProjects("left")}
                className="h-8 w-8 inline-flex items-center justify-center rounded-lg border border-slate-300 dark:border-cyber-border text-slate-600 dark:text-slate-200 hover:border-cyber-cyan hover:text-cyber-cyan transition-colors"
                aria-label="Scroll projects left"
              >
                <FaChevronLeft className="text-sm" />
              </button>
              <button
                onClick={() => scrollProjects("right")}
                className="h-8 w-8 inline-flex items-center justify-center rounded-lg border border-slate-300 dark:border-cyber-border text-slate-600 dark:text-slate-200 hover:border-cyber-cyan hover:text-cyber-cyan transition-colors"
                aria-label="Scroll projects right"
              >
                <FaChevronRight className="text-sm" />
              </button>
            </div>
          </div>

          <div className="mb-4 flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  activeFilter === filter.id
                    ? "bg-cyber-cyan text-cyber-dark"
                    : "bg-white/70 dark:bg-cyber-dark/60 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-cyber-border hover:border-cyber-cyan/50 hover:text-cyber-cyan"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div
            ref={dragRef}
            className="overflow-x-auto hide-scrollbar cursor-grab active:cursor-grabbing"
            onMouseDown={handlePointerDown}
            onMouseMove={handlePointerMove}
            onMouseUp={stopPointerDrag}
            onMouseLeave={stopPointerDrag}
          >
            <div className="flex gap-4 pb-2 min-w-max">
              {visibleProjects.map((project, index) => {
                const techTags = project.description
                  .split("·")
                  .map((tag) => tag.trim())
                  .filter(Boolean);
                const mainPoints = getMainPoints(project);

                return (
                  <motion.article
                    key={`${project.title}-${index}`}
                    whileHover={{ y: -6 }}
                    onClick={() => router.push(`/projects/${project.slug}`)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        router.push(`/projects/${project.slug}`);
                      }
                    }}
                    className="min-w-[290px] sm:min-w-[330px] max-w-[330px] rounded-xl border border-slate-200 dark:border-cyber-border bg-white/90 dark:bg-cyber-dark/80 overflow-hidden shadow-sm hover:shadow-cyber-card transition-all"
                  >
                    <div className="p-4 sm:p-5">
                      <div className="mb-2">
                        <span className="text-[11px] uppercase tracking-wide px-2 py-1 rounded-md border border-cyber-cyan/35 bg-cyber-cyan/10 text-cyber-cyan">
                          {project.sectionLabel || project.section}
                        </span>
                      </div>

                      <h4 className="text-base sm:text-lg font-semibold text-slate-800 dark:text-white mb-2 line-clamp-2">
                        {project.title}
                      </h4>

                      <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 mb-3">
                        {project.content || project.description}
                      </p>

                      {mainPoints.length > 0 ? (
                        <ul className="mb-3 space-y-1.5">
                          {mainPoints.map((point) => (
                            <li
                              key={`${project.title}-${point}`}
                              className="text-xs text-slate-600 dark:text-slate-300"
                            >
                              <span className="text-cyber-cyan mr-1">•</span>
                              {point}
                            </li>
                          ))}
                        </ul>
                      ) : null}

                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {techTags.map((tag) => (
                          <span
                            key={`${project.title}-${tag}`}
                            className="text-[11px] px-2 py-1 rounded-md border border-cyber-cyan/30 bg-cyber-cyan/10 text-cyber-cyan"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        {project.githubLink ? (
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(event) => event.stopPropagation()}
                            className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-cyber-border hover:border-cyber-cyan hover:text-cyber-cyan transition-colors"
                          >
                            <FaGithub className="text-sm" />
                            Code
                          </a>
                        ) : null}

                        {project.demoLink ? (
                          <a
                            href={project.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(event) => event.stopPropagation()}
                            className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-cyber-border hover:border-cyber-emerald hover:text-cyber-emerald transition-colors"
                          >
                            <FaExternalLinkAlt className="text-[11px]" />
                            Demo
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>

            {visibleProjects.length === 0 ? (
              <p className="text-sm text-slate-500 dark:text-slate-400 py-6">
                No projects available in this section yet.
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkSection;
