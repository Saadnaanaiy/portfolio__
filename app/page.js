'use client';

import { useEffect, useState } from 'react';
import { workData } from '../assets/assets';
import About from '../components/About';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Services from '../components/Services';
import WorkSection from '../components/WorkSection';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Certifs from '../components/Certifs';

const Loading = ({ isDarkMode }) => (
  <div
    className={`fixed inset-0 flex items-center justify-center ${
      isDarkMode ? 'bg-gray-900' : 'bg-slate-50'
    }`}
  >
    <div className="relative flex flex-col items-center">
      <div className="w-24 h-24 mb-6">
        <svg
          className="animate-spin-slow"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={isDarkMode ? '#6366f1' : '#4f46e5'}
            strokeWidth="8"
            strokeDasharray="283"
            strokeDashoffset="200"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div
        className={`text-3xl font-bold tracking-wider ${
          isDarkMode ? 'text-white' : 'text-indigo-600'
        }`}
      >
        <span className="inline-block animate-bounce-slow">S</span>
        <span className="inline-block animate-bounce-slow animation-delay-200">
          N
        </span>
      </div>
      <div
        className={`mt-4 text-sm ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}
      >
        <span className="inline-block animate-pulse">
          Loading Experience...
        </span>
      </div>
    </div>
  </div>
);

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
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light'; // Store light preference explicitly
    }
  }, [isDarkMode, isMounted]);

  if (!isMounted || isLoading) {
    return <Loading isDarkMode={isDarkMode} />;
  }

  return (
    <div>
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <Header className="mt-25" isDarkMode={isDarkMode} />
      <About isDarkMode={isDarkMode} />
      <Services isDarkMode={isDarkMode} />
      <WorkSection projects={projects} isDarkMode={isDarkMode} />
      <Certifs isDarkMode={isDarkMode} />
      <Contact isDarkMode={isDarkMode} />
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}
