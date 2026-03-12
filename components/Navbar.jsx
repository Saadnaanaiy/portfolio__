import { ArrowRight, Menu, Moon, Shield, Sun, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const navLinks = [
  { name: "Home", href: "#top" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Work", href: "#work" },
  { name: "Certifications", href: "#certifs" },
  { name: "Contact", href: "#contact" },
];

const Navbar = ({ isDarkMode, toggleTheme }) => {
  const [isScroll, setIsScroll] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const sideMenuRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const updateScrollState = () => {
      setIsScroll(window.scrollY > 24);
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(updateScrollState);
    };

    updateScrollState();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <nav
        className={`w-full fixed px-4 sm:px-6 lg:px-8 xl:px-[8%] py-3 flex items-center justify-between z-50 transition-all duration-200 ${
          isScroll
            ? "bg-slate-50/90 dark:bg-cyber-dark/95 backdrop-blur-xl border-b border-slate-200/50 dark:border-cyber-border/50 shadow-lg shadow-black/5"
            : "bg-transparent"
        }`}
      >
        <a
          href="#top"
          className="flex items-center gap-2 group"
          aria-label="Home"
        >
          <span className="font-mono text-xs text-cyber-cyan dark:text-cyber-cyan font-medium hidden sm:inline">
            &gt;
          </span>
          <h2 className="font-semibold text-xl sm:text-2xl text-slate-800 dark:text-slate-100 group-hover:text-cyber-cyan dark:group-hover:text-cyber-cyan transition-colors">
            Saad Naanaiy
          </h2>
          <span className="text-cyber-cyan font-mono font-bold">_</span>
        </a>

        <ul className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-cyber-cyan dark:hover:text-cyber-cyan hover:bg-cyber-cyan/10 dark:hover:bg-cyber-cyan/10 transition-colors duration-150"
              >
                {link.name}
              </a>
            </li>
          ))}
          <li className="ml-2">
            <a
              href="https://www.credly.com/users/saad-naanaiy/badges#credly"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-cyber-emerald dark:text-cyber-emerald hover:bg-cyber-emerald/10 transition-colors duration-150"
              title="Credly badges"
            >
              <Shield className="w-4 h-4" />
              Credly
            </a>
          </li>
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-cyber-surface transition-colors duration-150"
            aria-label="Toggle theme"
            type="button"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
          <a
            href="#contact"
            className="hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-lg bg-cyber-cyan dark:bg-cyber-cyan text-cyber-dark font-semibold text-sm hover:bg-cyber-cyanDim dark:hover:bg-cyber-cyanDim transition-colors duration-150 shadow-cyber-glow"
          >
            Contact
            <ArrowRight className="w-4 h-4" />
          </a>
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-cyber-surface"
            aria-label="Open menu"
            type="button"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        ref={sideMenuRef}
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-200 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
        <div
          className={`absolute top-0 right-0 w-full max-w-xs h-full bg-slate-50 dark:bg-cyber-surface border-l border-slate-200 dark:border-cyber-border shadow-2xl transition-transform duration-200 ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-cyber-border">
            <span className="font-mono text-cyber-cyan">&gt; menu</span>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-cyber-dark"
              aria-label="Close menu"
              type="button"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <ul className="p-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 px-4 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-cyber-cyan/10 hover:text-cyber-cyan font-medium"
                >
                  {link.name}
                </a>
              </li>
            ))}
            <li>
              <a
                href="https://www.credly.com/users/saad-naanaiy/badges"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 py-3 px-4 rounded-lg text-cyber-emerald hover:bg-cyber-emerald/10 font-medium"
              >
                <Shield className="w-4 h-4" />
                Credly Badges
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
