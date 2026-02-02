'use client';

import { useEffect, useState } from 'react';
import { workData } from '../assets/assets';
import { AnimatePresence, motion } from 'framer-motion';
import { FaShieldAlt, FaSkullCrossbones, FaVirus } from 'react-icons/fa';
import { GiWorms } from 'react-icons/gi';
import About from '../components/About';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Services from '../components/Services';
import WorkSection from '../components/WorkSection';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Certifs from '../components/Certifs';
import CyberBinaryBackground from '../components/CyberBinaryBackground';

const LOADING_ITEMS = [
  {
    id: 'virus',
    label: 'Virus detected',
    Icon: FaVirus,
    colorClass: 'text-cyber-rose',
    bgClass: 'bg-cyber-rose/10',
    ringClass: 'ring-cyber-rose/30',
    glowClass: 'shadow-[0_0_28px_rgba(244,63,94,0.35)]',
  },
  {
    id: 'trojan',
    label: 'Trojan activity',
    Icon: FaSkullCrossbones,
    colorClass: 'text-cyber-amber',
    bgClass: 'bg-cyber-amber/10',
    ringClass: 'ring-cyber-amber/30',
    glowClass: 'shadow-[0_0_28px_rgba(245,158,11,0.35)]',
  },
  {
    id: 'worm',
    label: 'Worm propagation',
    Icon: GiWorms,
    colorClass: 'text-cyber-emerald',
    bgClass: 'bg-cyber-emerald/10',
    ringClass: 'ring-cyber-emerald/30',
    glowClass: 'shadow-[0_0_28px_rgba(16,185,129,0.35)]',
  },
  {
    id: 'defender',
    label: 'Defender online',
    Icon: FaShieldAlt,
    colorClass: 'text-cyber-cyan',
    bgClass: 'bg-cyber-cyan/10',
    ringClass: 'ring-cyber-cyan/30',
    glowClass: 'shadow-cyber-glow',
  },
];

const Loading = ({ isDarkMode }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % LOADING_ITEMS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const active = LOADING_ITEMS[activeIndex];

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-cyber-grid bg-[length:40px_40px] ${
        isDarkMode ? 'bg-cyber-dark' : 'bg-slate-50'
      }`}
    >
      <div className="relative flex flex-col items-center">
        <div className="relative w-28 h-28 mb-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 10, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.92 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className={`w-28 h-28 rounded-2xl ring-2 ${active.ringClass} ${active.bgClass} ${active.glowClass} flex items-center justify-center`}
              aria-label={active.label}
            >
              <motion.div
                animate={{ rotate: [0, -2, 2, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                className={`${active.colorClass} text-5xl`}
              >
                <active.Icon />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="text-3xl font-bold tracking-wider text-cyber-cyan font-mono">
          <span className="inline-block animate-bounce-slow">S</span>
          <span className="inline-block animate-bounce-slow animation-delay-200">N</span>
        </div>

        <div className={`mt-4 text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          <span className="font-mono">
            <span className="text-cyber-cyan">{'>'} </span>
            <span className={active.colorClass}>{active.label}</span>
            <span className="ml-2 inline-block animate-pulse">loading…</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  const projects = workData.map((project, index) => ({
    id: index,
    title: project.title,
    description: project.desc,
    image: project.img,
    technologies: ['React', 'Next.js'],
    demoUrl: project.link,
    githubUrl: project.github,
  }));

  useEffect(() => {
    setIsMounted(true);

    if (typeof window !== 'undefined') {
      // Always start in light mode, regardless of previous preference
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');

      // Don't read from localStorage - always default to light

      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const root = document.documentElement;
    root.classList.add('theme-transition');
    const transitionTimer = setTimeout(() => {
      root.classList.remove('theme-transition');
    }, 450);

    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      root.classList.remove('dark');
      localStorage.theme = 'light'; // Store light preference explicitly
    }

    return () => {
      clearTimeout(transitionTimer);
      root.classList.remove('theme-transition');
    };
  }, [isDarkMode, isMounted]);

  if (!isMounted || isLoading) {
    return <Loading isDarkMode={isDarkMode} />;
  }

  return (
    <div className="relative min-h-screen">
      <CyberBinaryBackground isDarkMode={isDarkMode} />
      <div className="relative z-10">
        <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <Header className="mt-25" isDarkMode={isDarkMode} />
        <About isDarkMode={isDarkMode} />
        <Services isDarkMode={isDarkMode} />
        <WorkSection projects={projects} isDarkMode={isDarkMode} />
        <Certifs isDarkMode={isDarkMode} />
        <Contact isDarkMode={isDarkMode} />
        <Footer isDarkMode={isDarkMode} />
      </div>
    </div>
  );
}
