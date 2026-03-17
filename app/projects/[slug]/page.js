import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowLeft, FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { workData } from "../../../assets/assets";

export function generateStaticParams() {
  return workData.map((project) => ({ slug: project.slug }));
}

const getProjectBySlug = (slug) =>
  workData.find((project) => project.slug === slug);

export default async function ProjectDetailsPage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const mainPoints = Array.isArray(project.highlights)
    ? project.highlights
    : (project.content || "")
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.startsWith("-") || line.startsWith("•"))
        .map((line) => line.replace(/^[-•]\s*/, ""));

  const stackTags = Array.isArray(project.stack)
    ? project.stack
    : project.description
        .split("·")
        .map((tag) => tag.trim())
        .filter(Boolean);

  const tags = project.description
    .split("·")
    .map((tag) => tag.trim())
    .filter(Boolean);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-cyber-dark px-4 sm:px-6 lg:px-[8%] py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 dark:border-cyber-border px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:border-cyber-cyan hover:text-cyber-cyan transition-colors"
          >
            <FaArrowLeft className="text-xs" />
            Back to Projects
          </Link>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-cyber-border bg-white/90 dark:bg-cyber-surface/85 backdrop-blur overflow-hidden">
          <div className="p-5 sm:p-8 border-b border-slate-200 dark:border-cyber-border">
            <span className="inline-flex items-center rounded-md border border-cyber-cyan/35 bg-cyber-cyan/10 px-2.5 py-1 text-xs text-cyber-cyan mb-3">
              {project.sectionLabel || project.section}
            </span>
            <h1 className="text-2xl sm:text-4xl font-bold text-slate-800 dark:text-white mb-3">
              {project.title}
            </h1>
            <p className="text-slate-600 dark:text-slate-300 max-w-4xl">
              {project.content || project.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 rounded-md border border-slate-300 dark:border-cyber-border bg-slate-100 dark:bg-cyber-dark/70 text-slate-700 dark:text-slate-200"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {project.demoLink ? (
                <a
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-cyber-cyan text-cyber-dark px-4 py-2 text-sm font-semibold hover:bg-cyber-cyanDim transition-colors"
                >
                  <FaExternalLinkAlt className="text-xs" />
                  Demo
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-lg bg-slate-200 dark:bg-cyber-dark/70 text-slate-500 dark:text-slate-400 px-4 py-2 text-sm font-medium">
                  Demo coming soon
                </span>
              )}

              {project.githubLink ? (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-300 dark:border-cyber-border px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:border-cyber-cyan hover:text-cyber-cyan transition-colors"
                >
                  <FaGithub className="text-sm" />
                  Source Code
                </a>
              ) : null}
            </div>
          </div>

          <div className="p-5 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-4">
              Main Points
            </h2>

            {mainPoints.length > 0 ? (
              <ul className="space-y-2 mb-8">
                {mainPoints.map((point) => (
                  <li
                    key={point}
                    className="text-slate-700 dark:text-slate-200 flex items-start gap-2"
                  >
                    <span className="text-cyber-cyan mt-1">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-600 dark:text-slate-300 mb-8">
                Main implementation points will be added soon.
              </p>
            )}

            <h3 className="text-lg sm:text-xl font-semibold text-slate-800 dark:text-slate-100 mb-3">
              Stack Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {stackTags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 rounded-md border border-cyber-cyan/35 bg-cyber-cyan/10 text-cyber-cyan"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
