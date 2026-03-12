import {
  ChevronDown,
  Download,
  Github,
  Linkedin,
  Mail,
  Shield,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { assets } from "../assets/assets";

const roles = [
  "Cybersecurity Student",
  "Web & App Security",
  "Systems Administration",
  "AI & Security Automation",
  "Secure Full Stack Developer",
  "DevSecOps Learner",
];

const Header = ({ isDarkMode }) => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  return (
    <header
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4"
      id="home"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-cyber-cyan/10 to-transparent" />
        <div className="absolute left-[-8%] top-[18%] h-56 w-56 rounded-full bg-cyber-cyan/10 blur-3xl" />
        <div className="absolute right-[-10%] top-[12%] h-72 w-72 rounded-full bg-cyber-emerald/10 blur-3xl" />
        <div className="absolute bottom-[15%] left-[12%] h-44 w-44 rounded-full bg-cyber-amber/10 blur-3xl" />
        <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(6,182,212,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.07)_1px,transparent_1px)] [background-size:36px_36px]" />
      </div>

      <div className="container mx-auto max-w-5xl py-16 sm:py-20 relative z-10">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyber-cyan/20 bg-white/70 px-4 py-1.5 text-xs font-medium text-cyber-cyan backdrop-blur dark:bg-cyber-surface/80">
            <span className="inline-block h-2 w-2 rounded-full bg-cyber-emerald shadow-[0_0_12px_rgba(16,185,129,0.8)]" />
            Available for secure web and software roles
          </div>

          <div className="mb-6 relative">
            <div className="absolute inset-0 rounded-full bg-cyber-cyan/20 blur-2xl" />
            <div className="relative mt-4 w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-slate-300 dark:border-cyber-border shadow-xl overflow-hidden bg-slate-100 dark:bg-cyber-surface">
              <Image
                src={assets.profile_img}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
                width={128}
                height={128}
              />
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-800 dark:text-white">
            Saad Naanaiy
          </h1>

          <p className="mt-4 text-sm sm:text-base font-mono text-cyber-cyan min-h-7">
            <span className="mr-2">&gt;</span>
            <span
              key={roles[roleIndex]}
              className="inline-block animate-fade-in-fast"
            >
              {roles[roleIndex]}
            </span>
          </p>

          <p
            className={`mt-5 text-sm sm:text-base max-w-2xl leading-relaxed ${
              isDarkMode ? "text-slate-400" : "text-slate-600"
            }`}
          >
            Higher School of Technology · 3rd year Cybersecurity and Systems
            Administration Engineering student focused on secure development,
            web and app security, automation, and practical AI tooling.
          </p>

          <div className="mt-8 flex justify-center gap-2 flex-wrap">
            <Link
              href="https://github.com/Saadnaanaiy"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-300 dark:border-cyber-border bg-white/80 dark:bg-cyber-surface hover:border-cyber-cyan hover:text-cyber-cyan hover:shadow-cyber-glow transition-colors duration-150"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/saad-naanaiy-151a55278/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-300 dark:border-cyber-border bg-white/80 dark:bg-cyber-surface hover:border-cyber-cyan hover:text-cyber-cyan hover:shadow-cyber-glow transition-colors duration-150"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </Link>
            <Link
              href="https://www.credly.com/users/saad-naanaiy/badges"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-300 dark:border-cyber-border bg-white/80 dark:bg-cyber-surface hover:border-cyber-emerald hover:text-cyber-emerald hover:shadow-cyber-glow-emerald transition-colors duration-150"
              aria-label="Credly"
            >
              <Shield className="w-4 h-4" />
            </Link>
            <Link
              href="mailto:saadnaanaiy@gmail.com"
              className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-300 dark:border-cyber-border bg-white/80 dark:bg-cyber-surface hover:border-cyber-cyan hover:text-cyber-cyan hover:shadow-cyber-glow transition-colors duration-150"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </Link>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="#contact"
              className="px-5 py-3 text-sm bg-cyber-cyan hover:bg-cyber-cyanDim text-cyber-dark font-semibold rounded-xl transition-colors duration-150 shadow-cyber-glow hover:shadow-cyber-glow flex items-center justify-center"
            >
              Contact Me
            </Link>
            <a
              href="/saadNaanaiyCV.pdf"
              download="SaadNaanaiy.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download CV"
              className="px-5 py-3 text-sm border border-cyber-cyan dark:border-cyber-cyan text-cyber-cyan dark:text-cyber-cyan font-semibold rounded-xl hover:bg-cyber-cyan/10 transition-colors duration-150 flex items-center justify-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              Download CV
            </a>
          </div>

          <div className="mt-10 grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200/70 dark:border-cyber-border bg-white/80 dark:bg-cyber-surface/80 px-5 py-4 backdrop-blur">
              <p className="text-xs font-mono text-cyber-cyan mb-1">focus</p>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Secure full stack development
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200/70 dark:border-cyber-border bg-white/80 dark:bg-cyber-surface/80 px-5 py-4 backdrop-blur">
              <p className="text-xs font-mono text-cyber-emerald mb-1">stack</p>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                React, Next.js, backend and cloud tooling
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200/70 dark:border-cyber-border bg-white/80 dark:bg-cyber-surface/80 px-5 py-4 backdrop-blur">
              <p className="text-xs font-mono text-cyber-amber mb-1">goal</p>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Fast, resilient, production-grade interfaces
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
        <Link
          href="#about"
          className="flex flex-col items-center text-xs text-cyber-cyan font-medium"
        >
          <span>Scroll</span>
          <ChevronDown className="w-4 h-4 mt-0.5" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
