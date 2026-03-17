"use client";
import { AnimatePresence, motion } from "framer-motion";
import {
  BrainCircuit,
  CloudCog,
  Code2,
  Cpu,
  Network,
  Server,
  ServerCog,
  Shield,
  Sparkles,
  TerminalSquare,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { assets, infoList, toolsData } from "../assets/assets";

const About = ({ isDarkMode }) => {
  const [activeCategory, setActiveCategory] = useState("Languages");
  const [activeTrack, setActiveTrack] = useState("cyber");

  const categories = [
    "Languages",
    "Frameworks",
    "Tools",
    "Databases",
    "Packages",
    "Cloud Services",
    "Automation Tools",
    "Bash scripting",
    "Terminal-Based Editors",
    "Operating Systems",
    "Soft Skills",
    "Python Data & Scientific Computing Stack",
  ];

  const filteredTools = toolsData.filter(
    (tool) => tool.category === activeCategory,
  );

  const skillTracks = [
    {
      id: "cyber",
      title: "Cybersecurity",
      subtitle: "Defense, detection and secure architecture",
      icon: Shield,
      accent: "from-cyber-emerald/30 to-cyber-cyan/20",
      badgeClass:
        "border-cyber-emerald/50 bg-cyber-emerald/10 text-cyber-emerald",
      skills: [
        "SOC / SIEM",
        "IDS / IPS",
        "Firewall",
        "Database hardening",
        "Spring Security",
        "API Security",
      ],
    },
    {
      id: "systems",
      title: "Systems & Administration",
      subtitle: "Reliable environments and secure access",
      icon: ServerCog,
      accent: "from-cyber-amber/30 to-cyber-cyan/15",
      badgeClass: "border-cyber-amber/50 bg-cyber-amber/10 text-cyber-amber",
      skills: ["Linux", "Windows & Windows Server", "SSH", "Virtualization"],
    },
    {
      id: "network",
      title: "Networks",
      subtitle: "Secure connectivity and segmentation",
      icon: Network,
      accent: "from-cyber-cyan/35 to-cyber-blue/20",
      badgeClass: "border-cyber-cyan/50 bg-cyber-cyan/10 text-cyber-cyan",
      skills: ["IPv4 / IPv6", "VPN", "HTTP / HTTPS", "VLAN"],
    },
    {
      id: "cloud",
      title: "Cloud & DevOps",
      subtitle: "Automated infrastructure and modern delivery",
      icon: CloudCog,
      accent: "from-cyber-blue/30 to-cyber-emerald/20",
      badgeClass: "border-cyber-blue/50 bg-cyber-blue/10 text-cyber-blue",
      skills: [
        "Cloud Computing",
        "Docker",
        "Terraform",
        "Ansible",
        "CI/CD",
        "DevOps & DevSecOps",
        "Infrastructure as Code (IaC)",
        "Git / GitHub",
      ],
    },
    {
      id: "dev",
      title: "Programming & Development",
      subtitle: "Backend, frontend and mobile craftsmanship",
      icon: Code2,
      accent: "from-cyber-rose/30 to-cyber-cyan/15",
      badgeClass: "border-cyber-rose/50 bg-cyber-rose/10 text-cyber-rose",
      skills: ["Java / Spring Boot", "Node.js & Express.js", "Flutter & Dart"],
    },
    {
      id: "automation",
      title: "Automation & Scripting",
      subtitle: "Automation-first workflow design",
      icon: TerminalSquare,
      accent: "from-cyber-amber/30 to-cyber-rose/20",
      badgeClass: "border-cyber-amber/50 bg-cyber-amber/10 text-cyber-amber",
      skills: ["Bash scripting", "Automation"],
    },
    {
      id: "ai",
      title: "Artificial Intelligence",
      subtitle: "Applied AI in security and engineering workflow",
      icon: BrainCircuit,
      accent: "from-cyber-rose/25 to-cyber-blue/20",
      badgeClass: "border-cyber-rose/50 bg-cyber-rose/10 text-cyber-rose",
      skills: ["AI in cybersecurity workflows"],
    },
  ];

  const selectedTrack =
    skillTracks.find((track) => track.id === activeTrack) ?? skillTracks[0];
  const totalSkills = skillTracks.reduce(
    (acc, track) => acc + track.skills.length,
    0,
  );

  const domains = [
    {
      icon: Code2,
      label: "Full Stack",
      className:
        "border-cyber-cyan/50 bg-cyber-cyan/10 text-cyber-cyan hover:border-cyber-cyan hover:bg-cyber-cyan/25 hover:shadow-[0_0_18px_rgba(6,182,212,0.4)] transition-all duration-300",
    },
    {
      icon: Shield,
      label: "Cybersecurity",
      className:
        "border-cyber-emerald/50 bg-cyber-emerald/10 text-cyber-emerald hover:border-cyber-emerald hover:bg-cyber-emerald/25 hover:shadow-[0_0_18px_rgba(16,185,129,0.4)] transition-all duration-300",
    },
    {
      icon: Server,
      label: "System Admin",
      className:
        "border-cyber-amber/50 bg-cyber-amber/10 text-cyber-amber hover:border-cyber-amber hover:bg-cyber-amber/25 hover:shadow-[0_0_18px_rgba(245,158,11,0.4)] transition-all duration-300",
    },
    {
      icon: Cpu,
      label: "AI",
      className:
        "border-cyber-rose/50 bg-cyber-rose/10 text-cyber-rose hover:border-cyber-rose hover:bg-cyber-rose/25 hover:shadow-[0_0_18px_rgba(244,63,94,0.4)] transition-all duration-300",
    },
  ];

  return (
    <div
      id="about"
      className="relative w-full overflow-hidden px-4 sm:px-6 lg:px-[10%] py-16 scroll-mt-20 bg-slate-50/60 dark:bg-cyber-darker bg-cyber-grid dark:bg-cyber-grid bg-[length:40px_40px]"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 left-[8%] h-56 w-56 rounded-full bg-cyber-cyan/10 blur-3xl" />
        <div className="absolute top-[20%] right-[5%] h-64 w-64 rounded-full bg-cyber-emerald/10 blur-3xl" />
        <div className="absolute -bottom-16 left-[38%] h-72 w-72 rounded-full bg-cyber-blue/10 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto">
        <p className="relative z-10 text-center mb-2 font-mono text-sm text-cyber-cyan">
          &gt; introduction
        </p>
        <h2 className="relative z-10 text-center text-4xl sm:text-5xl font-bold mb-4 text-slate-800 dark:text-white">
          About Me
        </h2>
        <p className="relative z-10 text-center text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-12">
          Cybersecurity Student · Web & Application Security · Systems
          Administration · AI (3rd year) · Higher School of Technology
        </p>

        {/* Domain pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {domains.map(({ icon: Icon, label, className }) => (
            <span
              key={label}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border font-medium text-sm cursor-default ${className}`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </span>
          ))}
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="flex-shrink-0">
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-2xl overflow-hidden border-2 border-cyber-cyan/30 dark:border-cyber-cyan/50 shadow-cyber-card">
              <Image
                src={assets.profile_img}
                alt="Saad Naanaiy"
                className="w-full h-full object-cover"
                width={320}
                height={320}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark/60 to-transparent" />
            </div>
          </div>

          <div className="flex-1 space-y-6 text-center lg:text-left">
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
              I focus on secure-by-design development, systems administration,
              and web/app security while building with technologies such as{" "}
              {toolsData.slice(0, 3).map((tool, index) => (
                <span
                  key={index}
                  className="relative group cursor-pointer font-medium text-slate-800 dark:text-slate-100"
                >
                  <span className="absolute left-1/2 lg:left-0 -translate-x-1/2 lg:translate-x-0 -top-20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex justify-center items-center gap-2 bg-cyber-surface dark:bg-cyber-surface border border-cyber-border text-slate-100 px-4 py-2 rounded-lg shadow-xl z-10 whitespace-nowrap">
                    <Image
                      src={tool.src}
                      alt={tool.title}
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                    {tool.title}
                  </span>
                  <span className="relative">{tool.title}, </span>
                </span>
              ))}
              and many others including{" "}
              {toolsData.slice(3, 8).map((tool, index) => (
                <span
                  key={index}
                  className="relative group cursor-pointer font-medium text-slate-800 dark:text-slate-100"
                >
                  <span className="absolute left-1/2 lg:left-0 -translate-x-1/2 lg:translate-x-0 -top-20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex justify-center items-center gap-2 bg-cyber-surface border border-cyber-border text-slate-100 px-4 py-2 rounded-lg shadow-xl z-10 whitespace-nowrap">
                    <Image
                      src={tool.src}
                      alt={tool.title}
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                    {tool.title}
                  </span>
                  <span className="relative">{tool.title}, </span>
                </span>
              ))}
              .
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {infoList.map(({ icon, iconDark, title, description }, index) => (
                <li
                  key={index}
                  className="border border-slate-200 dark:border-cyber-border rounded-xl p-5 hover:border-cyber-cyan/50 dark:hover:border-cyber-cyan/50 hover:shadow-cyber-card transition-all duration-300 bg-white/80 dark:bg-cyber-surface/80"
                >
                  <Image
                    className="w-8 h-8 mx-auto sm:mx-0 mb-3"
                    src={isDarkMode ? iconDark : icon}
                    alt={title}
                    width={32}
                    height={32}
                  />
                  <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-1">
                    {title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {description}
                  </p>
                </li>
              ))}
            </ul>

            <div>
              <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3">
                Tools & stack
              </h4>
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-4">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      activeCategory === category
                        ? "bg-cyber-cyan text-cyber-dark dark:bg-cyber-cyan dark:text-cyber-dark"
                        : "bg-slate-200/80 dark:bg-cyber-surface text-slate-600 dark:text-slate-300 hover:bg-cyber-cyan/20 hover:text-cyber-cyan"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                <AnimatePresence>
                  {filteredTools.map((tool, index) => (
                    <motion.div
                      key={tool.title + index}
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 12 }}
                      transition={{ duration: 0.3, delay: index * 0.03 }}
                      className="bg-white dark:bg-cyber-surface border border-slate-200 dark:border-cyber-border rounded-lg p-3 flex flex-col items-center justify-center hover:border-cyber-cyan/50 hover:shadow-cyber-glow transition-all"
                    >
                      <div className="w-10 h-10 flex items-center justify-center mb-2">
                        <Image
                          src={tool.src}
                          alt={tool.title}
                          width={28}
                          height={28}
                          className="object-contain"
                        />
                      </div>
                      <span className="text-xs font-medium text-slate-700 dark:text-slate-300 text-center leading-tight">
                        {tool.title}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-6 w-full max-w-2xl xl:max-w-3xl mx-auto rounded-2xl border border-slate-200/80 dark:border-cyber-border bg-white/80 dark:bg-cyber-surface/80 backdrop-blur p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-cyber-cyan" />
                  Skills Matrix
                </h4>
                <div className="inline-flex items-center gap-2 rounded-lg border border-cyber-cyan/40 bg-cyber-cyan/10 px-3 py-1 text-xs text-cyber-cyan">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyber-emerald" />
                  {skillTracks.length} tracks · {totalSkills}+ skills
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-[230px_1fr]">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2">
                  {skillTracks.map((track) => {
                    const Icon = track.icon;
                    const isActive = activeTrack === track.id;

                    return (
                      <button
                        key={track.id}
                        onClick={() => setActiveTrack(track.id)}
                        className={`group rounded-xl border px-3 py-3 text-left transition-all duration-300 ${
                          isActive
                            ? "border-cyber-cyan/60 bg-cyber-cyan/15 shadow-cyber-glow"
                            : "border-slate-200 dark:border-cyber-border bg-white/60 dark:bg-cyber-dark/40 hover:border-cyber-cyan/40 hover:bg-cyber-cyan/10"
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-md bg-slate-100 dark:bg-cyber-surface text-cyber-cyan group-hover:scale-110 transition-transform">
                            <Icon className="h-3.5 w-3.5" />
                          </span>
                          <div>
                            <p className="text-[13px] font-semibold text-slate-800 dark:text-slate-100 leading-tight">
                              {track.title}
                            </p>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                              {track.skills.length} skills
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedTrack.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className={`relative overflow-hidden rounded-xl border border-slate-200 dark:border-cyber-border bg-gradient-to-br ${selectedTrack.accent} p-[1px]`}
                  >
                    <div className="h-full rounded-[11px] bg-white/90 dark:bg-cyber-dark/85 backdrop-blur px-4 py-4 sm:px-5 sm:py-5">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span
                          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${selectedTrack.badgeClass}`}
                        >
                          <selectedTrack.icon className="h-3.5 w-3.5" />
                          {selectedTrack.title}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {selectedTrack.subtitle}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {selectedTrack.skills.map((skill, skillIndex) => (
                          <motion.div
                            key={skill}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.2,
                              delay: skillIndex * 0.03,
                            }}
                            className="group rounded-lg border border-slate-200/80 dark:border-cyber-border bg-slate-50/80 dark:bg-cyber-surface/70 px-3 py-2.5 hover:border-cyber-cyan/40 hover:shadow-cyber-card transition-all"
                          >
                            <p className="text-sm text-slate-700 dark:text-slate-200 font-medium leading-snug flex items-center gap-2">
                              <span className="h-1.5 w-1.5 rounded-full bg-cyber-cyan shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
                              {skill}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
