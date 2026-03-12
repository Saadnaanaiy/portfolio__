"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { workData } from "../assets/assets";
import About from "../components/About";
import Certifs from "../components/Certifs";
import Contact from "../components/Contact";
import CyberBinaryBackground from "../components/CyberBinaryBackground";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Services from "../components/Services";
import WorkSection from "../components/WorkSection";

const STORAGE_KEY = "portfolio-theme";
const DARK_THEME_COLOR = "#0a0e17";
const LIGHT_THEME_COLOR = "#f8fafc";

const getPreferredTheme = () => {
  if (typeof window === "undefined") {
    return false;
  }

  const savedTheme = window.localStorage.getItem(STORAGE_KEY);

  if (savedTheme === "dark") {
    return true;
  }

  if (savedTheme === "light") {
    return false;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const themeTimerRef = useRef(null);

  const projects = useMemo(
    () =>
      workData.map((project, index) => ({
        id: index,
        title: project.title,
        description: project.desc,
        image: project.img,
        technologies: ["React", "Next.js"],
        demoUrl: project.link,
        githubUrl: project.github,
      })),
    [],
  );

  const applyTheme = (nextIsDarkMode) => {
    if (typeof document === "undefined") {
      return;
    }

    const root = document.documentElement;
    const metaTheme = document.querySelector('meta[name="theme-color"]');

    root.classList.add("theme-animate");
    root.classList.toggle("dark", nextIsDarkMode);
    root.style.colorScheme = nextIsDarkMode ? "dark" : "light";
    root.dataset.themeReady = "true";

    if (metaTheme) {
      metaTheme.setAttribute(
        "content",
        nextIsDarkMode ? DARK_THEME_COLOR : LIGHT_THEME_COLOR,
      );
    }

    window.localStorage.setItem(STORAGE_KEY, nextIsDarkMode ? "dark" : "light");

    window.clearTimeout(themeTimerRef.current);
    themeTimerRef.current = window.setTimeout(() => {
      root.classList.remove("theme-animate");
    }, 180);
  };

  const toggleTheme = () => {
    const nextIsDarkMode = !isDarkMode;
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (
      !reduceMotion &&
      typeof document !== "undefined" &&
      typeof document.startViewTransition === "function"
    ) {
      document.startViewTransition(() => {
        applyTheme(nextIsDarkMode);
        setIsDarkMode(nextIsDarkMode);
      });
      return;
    }

    applyTheme(nextIsDarkMode);
    setIsDarkMode(nextIsDarkMode);
  };

  useEffect(() => {
    setIsMounted(true);

    const currentTheme = getPreferredTheme();
    setIsDarkMode(currentTheme);
    applyTheme(currentTheme);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = (event) => {
      const storedTheme = window.localStorage.getItem(STORAGE_KEY);
      if (storedTheme === "dark" || storedTheme === "light") {
        return;
      }

      setIsDarkMode(event.matches);
      applyTheme(event.matches);
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
      window.clearTimeout(themeTimerRef.current);
    };
  }, []);

  if (!isMounted) {
    return <div className="min-h-screen bg-slate-50 dark:bg-cyber-dark" />;
  }

  return (
    <div className="relative min-h-screen">
      <CyberBinaryBackground isDarkMode={isDarkMode} />
      <div className="relative z-10">
        <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
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
