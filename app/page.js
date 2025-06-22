'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { workData } from '@/assets/assets';

// Dynamic imports to avoid hydration issues
const About = dynamic(() => import('@/components/About'), { ssr: false });
const Header = dynamic(() => import('@/components/Header'), { ssr: false });
const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });
const Services = dynamic(() => import('@/components/Services'), { ssr: false });
const WorkSection = dynamic(() => import('@/components/WorkSection'), {
  ssr: false,
});
const Contact = dynamic(() => import('@/components/Contact'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });
const Certifs = dynamic(() => import('@/components/Certifs'), { ssr: false });

// Loading component to avoid server/client hydration mismatch
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

// Client-side only component to fix hydration issues
const ClientOnly = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return children;
};

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Sample projects for showcase
  const projects = workData.map((project, index) => ({
    id: index,
    title: project.title,
    description: project.desc,
    image: project.img,
    technologies: ['React', 'Next.js'],
    demoUrl: project.link,
    githubUrl: project.github,
  }));

  // Mark component as mounted to prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);

    // Client-side only code
    if (typeof window !== 'undefined') {
      // Set initial theme from local storage
      if (
        localStorage.theme === 'dark' ||
        (!('theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
        setIsDarkMode(true);
      } else {
        setIsDarkMode(false);
      }

      // Loading animation
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = '';
    }
  }, [isDarkMode, isMounted]);

  // Prevent hydration errors by only rendering the complete UI when mounted
  if (!isMounted) {
    return null;
  }

  // Loading screen
  if (isLoading) {
    return <Loading isDarkMode={isDarkMode} />;
  }

  return (
    <ClientOnly>
      <div>
        <Suspense fallback={<Loading isDarkMode={isDarkMode} />}>
          <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
          <Header className="mt-25" isDarkMode={isDarkMode} />
          <About isDarkMode={isDarkMode} />
          <Services isDarkMode={isDarkMode} />
          <WorkSection projects={projects} isDarkMode={isDarkMode} />
          <Certifs isDarkMode={isDarkMode} />
          <Contact isDarkMode={isDarkMode} />
          <Footer isDarkMode={isDarkMode} />
        </Suspense>
      </div>
    </ClientOnly>
  );
}
