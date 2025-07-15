import React, { useState, useCallback, useRef, useEffect } from 'react';
import Image from 'next/image';
import { myData } from '../assets/assets';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const Particles = dynamic(() => import('react-tsparticles'), { ssr: false });
import { loadSlim } from 'tsparticles-slim';
import GradientText from './GradientText';

const Certifs = ({ isDarkMode }) => {
  const [selectedCertif, setSelectedCertif] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const [angle, setAngle] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [autoPreview, setAutoPreview] = useState(true);

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const openCertificate = (certif) => {
    setSelectedCertif(certif);
    setIsOpen(true);
    setAutoPreview(false);
    setHighlightIndex(-1);
  };

  const closeCertificate = () => {
    setIsOpen(false);
    setTimeout(() => setSelectedCertif(null), 300);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setAngle(menuOpen ? 0 : 360);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
        setAngle(0);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  // Auto-preview logic
  useEffect(() => {
    if (!autoPreview || !menuOpen) return;

    const interval = setInterval(() => {
      setHighlightIndex((prev) => (prev + 1) % myData.length);
    }, 4000); // Every 4s

    return () => clearInterval(interval);
  }, [autoPreview, menuOpen]);

  return (
    <div
      id="certifs"
      className="relative w-full mx-auto px-6 py-12 min-h-[600px]"
    >
      {/* Particles Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          particles: {
            number: { value: 80, density: { enable: true, area: 800 } },
            size: { value: 1.5 },
            move: { enable: true, speed: 0.6 },
            opacity: { value: 0.5 },
            shape: { type: 'circle' },
          },
          background: { color: 'transparent' },
        }}
        className="absolute top-0 left-0 w-full h-full -z-10"
      />

      <h4 className="dark:text-white text-center mb-4 text-2xl font-Outfit font-semibold text-gray-700">
        Certifications
      </h4>
      <h2 className="dark:text-white text-center text-5xl font-Outfit">
        <GradientText
          colors={
            isDarkMode
              ? ['#ff5c8d', '#7a4bff', '#ff5c8d', '#7a4bff', '#ff5c8d']
              : ['#000000', '#808080', '#000000', '#808080', '#000000']
          }
          animationSpeed={3}
          showBorder={false}
          className="custom-class"
        >
          My Professional Certificates
        </GradientText>
      </h2>
      <p className="dark:text-gray-300 text-center max-w-4xl mx-auto mt-5 mb-12 font-Outfit text-lg text-gray-600">
        Click on the circle menu below to explore my professional certifications
        and achievements.
      </p>

      {/* Circular Menu */}
      <div
        className="flex justify-center items-center my-20 mt-64 relative"
        ref={menuRef}
      >
        {/* Central Button */}
        <motion.button
          className={`w-28 h-28 rounded-full flex items-center justify-center z-20 shadow-lg border-2 border-black ${
            isDarkMode
              ? 'bg-indigo-600 text-white hover:bg-indigo-700'
              : 'bg-indigo-500 text-white hover:bg-indigo-600'
          }`}
          onClick={toggleMenu}
          whileTap={{ scale: 0.95 }}
          animate={{
            rotate: angle,
            y: [0, -10, 0],
          }}
          transition={{
            rotate: { duration: 0.5, type: 'spring' },
            y: {
              duration: 1.5,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
            },
          }}
        >
          <span className="text-2xl font-bold">Certifs</span>
        </motion.button>

        {/* Circular Items */}
        <AnimatePresence>
          {menuOpen &&
            myData.map((certif, index) => {
              const itemAngle = (index * 360) / myData.length;
              const radians = itemAngle * (Math.PI / 180);
              const radius = 200;
              const x = Math.cos(radians) * radius;
              const y = Math.sin(radians) * radius;
              const isHighlighted = index === highlightIndex;

              return (
                <motion.div
                  key={index}
                  className={`absolute w-24 h-24 rounded-full overflow-hidden cursor-pointer shadow-md border-2 border-black dark:border-gray-700 m-16 ${
                    isHighlighted ? 'ring-4 ring-yellow-400 z-30 scale-110' : ''
                  }`}
                  initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                  animate={{
                    opacity: 1,
                    x: x,
                    y: y,
                    scale: 1,
                    transition: {
                      delay: index * 0.05,
                      type: 'spring',
                      stiffness: 260,
                      damping: 20,
                    },
                  }}
                  exit={{
                    opacity: 0,
                    x: 0,
                    y: 0,
                    scale: 0,
                    transition: {
                      duration: 0.3,
                      delay: (myData.length - index) * 0.03,
                    },
                  }}
                  whileHover={{ scale: 1.15, zIndex: 40 }}
                  onClick={() => openCertificate(certif)}
                >
                  <Image
                    src={certif.img}
                    alt={certif.text}
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-sm font-medium text-center px-2">
                      {certif.text.length > 25
                        ? certif.text.substring(0, 25) + '...'
                        : certif.text}
                    </span>
                  </div>
                </motion.div>
              );
            })}
        </AnimatePresence>
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {isOpen && selectedCertif && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCertificate}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden w-full max-w-5xl max-h-[90vh] relative border-2 border-black"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 z-10 bg-white dark:bg-gray-700 rounded-full p-2 shadow-md border border-black"
                onClick={closeCertificate}
              >
                <X className="w-5 h-5 text-gray-700 dark:text-white" />
              </button>

              <div className="relative w-full h-[60vh]">
                <Image
                  src={selectedCertif.img}
                  alt={selectedCertif.text}
                  layout="fill"
                  objectFit="contain"
                  className="p-2"
                />
                <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full border border-black">
                  Verified
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                  {selectedCertif.text}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  This certification validates my expertise and professional
                  skills in this area.
                </p>
                <div className="flex justify-end">
                  <button
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300 border border-black"
                    onClick={() => window.open(selectedCertif.pdf, '_blank')}
                  >
                    View Full Certificate
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Certifs;
