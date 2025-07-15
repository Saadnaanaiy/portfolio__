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
  Twitter,
} from 'lucide-react';
import ClickSpark from './ClickSpark';

const roles = [
  'Full Stack Developer',
  'Frontend Developer',
  'Backend Developer',
  'UX/UI Designer',
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
        ctx.fillStyle = `rgba(99, 102, 241, ${p.opacity})`;
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
          sparkColor={['#6366f1', '#8b5cf6', '#d946ef']}
          sparkCount={15}
          enableGlow={true}
          pulseEffect={true}
        />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <div className="mb-8 inline-block animate-in animate-float relative">
              <div className="mt-16 w-64 h-64 sm:w-80 sm:h-80 rounded-full  border-gray-400 dark:border-white shadow-lg">
                <Image
                  src={assets.profile_img}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                  width={400}
                  height={400}
                />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-purple-500 opacity-60"></div>
              <div className="absolute -bottom-1 -left-1 w-4 h-4 rounded-full bg-indigo-300 opacity-60"></div>
            </div>

            <h1 className="text-5xl font-bold mt-6 mb-4 animate-in text-center">
              <GradientText
                colors={
                  isDarkMode
                    ? ['#ff5c8d', '#7a4bff', '#ff5c8d', '#7a4bff', '#ff5c8d'] // Vibrant colors for dark mode
                    : ['#000000', '#808080', '#000000', '#808080', '#000000'] // Black and gray for light mode
                }
                animationSpeed={3}
                showBorder={false}
                className="custom-class"
              >
                Saad naanaiy
              </GradientText>
            </h1>

            <div
              className={`text-xl md:text-2xl mb-6 animate-in ${
                isDarkMode ? 'text-white' : 'text-gray-700'
              }`}
            >
              I'm a{' '}
              <span
                className={`font-semibold ${
                  isDarkMode ? 'text-indigo-400' : 'text-indigo-600'
                }`}
              >
                <TypewriterComponent
                  options={{
                    strings: [
                      'Frontend Developer',
                      'UI/UX Designer',
                      'Web Developer',
                      'React Expert',
                    ],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </span>
            </div>

            <p
              className={`text-md sm:text-lg max-w-2xl mx-auto mb-8 animate-in ${
                isDarkMode ? 'text-white' : 'text-gray-700'
              }`}
            >
              Crafting beautiful digital experiences with modern technologies. I
              specialize in creating responsive, user-friendly interfaces that
              make an impact.
            </p>

            <div className="flex justify-center space-x-4 mb-10 animate-in">
              <Link
                href="https://github.com"
                target="_blank"
                className="w-12 h-12 aspect-square flex items-center justify-center transition-all duration-500 border-[0.5px] border-gray-400 dark:border-white rounded-lg hover:-translate-y-1 hover:bg-lightHover dark:hover:bg-darkHover/50 dark:hover:shadow-white hover:shadow-black"
              >
                <Github
                  className={`w-5 h-5 ${
                    isDarkMode ? 'text-white' : 'text-gray-700'
                  }`}
                />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                className="w-12 h-12 aspect-square flex items-center justify-center transition-all duration-500 border-[0.5px] border-gray-400 dark:border-white rounded-lg hover:-translate-y-1 hover:bg-lightHover dark:hover:bg-darkHover/50 dark:hover:shadow-white hover:shadow-black"
              >
                <Linkedin
                  className={`w-5 h-5 ${
                    isDarkMode ? 'text-white' : 'text-gray-700'
                  }`}
                />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                className="w-12 h-12 aspect-square flex items-center justify-center transition-all duration-500 border-[0.5px] border-gray-400 dark:border-white rounded-lg hover:-translate-y-1 hover:bg-lightHover dark:hover:bg-darkHover/50 dark:hover:shadow-white hover:shadow-black"
              >
                <Twitter
                  className={`w-5 h-5 ${
                    isDarkMode ? 'text-white' : 'text-gray-700'
                  }`}
                />
              </Link>
              <Link
                href="mailto:youremail@example.com"
                className="w-12 h-12 aspect-square flex items-center justify-center transition-all duration-500 border-[0.5px] border-gray-400 dark:border-white rounded-lg hover:-translate-y-1 hover:bg-lightHover dark:hover:bg-darkHover/50 dark:hover:shadow-white hover:shadow-black"
              >
                <Mail
                  className={`w-5 h-5 ${
                    isDarkMode ? 'text-white' : 'text-gray-700'
                  }`}
                />
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16 animate-in">
              <Link
                href="#contact"
                className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1 flex items-center justify-center duration-500"
              >
                Contact Me
              </Link>
              <a
                href="/saadNaanaiyCV.pdf"
                download="SaadNaanaiy.pdf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download CV as PDF"
                className={`px-8 py-3 border-[0.5px] border-gray-400 dark:border-white ${
                  isDarkMode
                    ? 'text-white hover:bg-darkHover/50 hover:shadow-white'
                    : 'text-gray-700 hover:bg-lightHover hover:shadow-black'
                } font-medium rounded-lg transition-all duration-500 hover:-translate-y-1 flex items-center justify-center`}
              >
                <Download className="w-4 h-4 mr-2" />
                Download CV
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Link
          href="#about"
          className={`flex flex-col items-center text-sm ${
            isDarkMode ? 'text-white' : 'text-gray-700'
          }`}
        >
          <span>Scroll Down</span>
          <ChevronDown className="w-6 h-6 mt-1" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
