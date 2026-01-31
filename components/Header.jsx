import { assets } from '../assets/assets';
import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import GradientText from './GradientText';
import TypewriterComponent from 'typewriter-effect';
import LetterGlitch from './LetterGlitch';
import Link from 'next/link';
import {
  ChevronDown,
  Download,
  Github,
  Linkedin,
  Mail,
  Shield,
} from 'lucide-react';
import ClickSpark from './ClickSpark';

const roles = [
  'Full Stack Developer',
  'Cybersecurity Student',
  'System Administration Engineer',
  'AI Enthusiast',
  'Software Engineer',
  'Frontend & Backend Developer',
];

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;

    // Resize canvas to full window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Regenerate particles on resize
      generateParticles();
    };

    // Generate particles
    const generateParticles = () => {
      particles = [];
      const particleCount = Math.floor(
        (window.innerWidth * window.innerHeight) / 10000,
      );

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.5 + 0.1,
        });
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Draw particle
        ctx.fillStyle = `rgba(6, 182, 212, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Update position
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Connect particles within distance
        connectParticles(p, i);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Draw lines between close particles
    const connectParticles = (p, index) => {
      for (let j = index + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const distance = Math.sqrt(
          Math.pow(p.x - p2.x, 2) + Math.pow(p.y - p2.y, 2),
        );

        if (distance < 100) {
          ctx.strokeStyle = `rgba(99, 102, 241, ${0.2 * (1 - distance / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    };

    // Initial setup
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Prevent hydration errors by only rendering on client
  if (!isMounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};

const Header = ({ isDarkMode }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const roleRef = useRef(null);
  const headerRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  const splitTextIntoLetters = (text) => {
    if (!text) return [];
    return text.split('').map((char, index) => ({
      char,
      delay: index * 0.1,
    }));
  };

  useEffect(() => {
    setIsMounted(true);

    const interval = setInterval(() => {
      setRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    if (roleRef.current) {
      const letters = roleRef.current.querySelectorAll('.letter');
      gsap.fromTo(
        letters,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'back.out(1.7)',
          stagger: 0.1,
        },
      );
    }
  }, [roleIndex, isMounted]);

  useEffect(() => {
    if (!isMounted) return;

    const header = headerRef.current;
    if (!header) return;

    gsap.fromTo(
      header.querySelectorAll('.animate-in'),
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.3,
      },
    );
  }, [isMounted]);

  if (!isMounted) return <div className="min-h-screen"></div>;

  return (
    <header
      ref={headerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      id="home"
    >
      <ParticleBackground />

      <div className="absolute inset-0">
        <ClickSpark
          sparkColor={['#06b6d4', '#10b981', '#0891b2']}
          sparkCount={15}
          enableGlow={true}
          pulseEffect={true}
        />
      </div>

      <div className="container mx-auto px-4 py-12 sm:py-16 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center">
            <div className="mb-5 inline-block animate-in animate-bounce-slow relative">
              <div className="relative mt-8 w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-slate-300 dark:border-cyber-border shadow-xl overflow-hidden">
                <Image
                  src={assets.profile_img}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                  width={128}
                  height={128}
                />
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold mt-4 mb-3 animate-in text-center">
              <GradientText
                colors={
                  isDarkMode
                    ? ['#06b6d4', '#10b981', '#06b6d4', '#0891b2', '#06b6d4']
                    : ['#0f172a', '#06b6d4', '#0f172a', '#10b981', '#0f172a']
                }
                animationSpeed={3}
                showBorder={false}
                className="custom-class"
              >
                Saad Naanaiy
              </GradientText>
            </h1>

            <div
              className={`text-sm md:text-base mb-4 animate-in ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              <span className="font-mono text-cyber-cyan text-xs sm:text-sm">
                {'> '}
              </span>
              <TypewriterComponent
                options={{
                  strings: roles,
                  autoStart: true,
                  loop: true,
                }}
              />
            </div>

            <p
              className={`text-xs sm:text-sm max-w-xl mx-auto mb-6 animate-in leading-relaxed ${
                isDarkMode ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              Higher School of Technology · Full Stack (+2 years) · 3rd year
              Cybersecurity & System Administration Engineering · Building
              secure, scalable systems and modern web experiences.
            </p>

            <div className="flex justify-center gap-2 mb-6 animate-in">
              <Link
                href="https://github.com/Saadnaanaiy"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-300 dark:border-cyber-border bg-white/80 dark:bg-cyber-surface hover:border-cyber-cyan hover:text-cyber-cyan hover:shadow-cyber-glow transition-all"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/saad-naanaiy-151a55278/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-300 dark:border-cyber-border bg-white/80 dark:bg-cyber-surface hover:border-cyber-cyan hover:text-cyber-cyan hover:shadow-cyber-glow transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </Link>
              <Link
                href="https://www.credly.com/users/saad-naanaiy/badges"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-300 dark:border-cyber-border bg-white/80 dark:bg-cyber-surface hover:border-cyber-emerald hover:text-cyber-emerald hover:shadow-cyber-glow-emerald transition-all"
                aria-label="Credly"
              >
                <Shield className="w-4 h-4" />
              </Link>
              <Link
                href="mailto:saadnaanaiy@gmail.com"
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-300 dark:border-cyber-border bg-white/80 dark:bg-cyber-surface hover:border-cyber-cyan hover:text-cyber-cyan hover:shadow-cyber-glow transition-all"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3 mb-10 animate-in">
              <Link
                href="#contact"
                className="px-4 py-2.5 text-sm bg-cyber-cyan hover:bg-cyber-cyanDim text-cyber-dark font-semibold rounded-lg transition-all shadow-cyber-glow hover:shadow-cyber-glow flex items-center justify-center"
              >
                Contact Me
              </Link>
              <a
                href="/saadNaanaiyCV.pdf"
                download="SaadNaanaiy.pdf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download CV"
                className="px-4 py-2.5 text-sm border border-cyber-cyan dark:border-cyber-cyan text-cyber-cyan dark:text-cyber-cyan font-semibold rounded-lg hover:bg-cyber-cyan/10 transition-all flex items-center justify-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                Download CV
              </a>
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
