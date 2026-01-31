'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { myData, credlyBadges } from '../assets/assets';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, ExternalLink, Award, ChevronRight, Lock } from 'lucide-react';
import GradientText from './GradientText';

const CREDLY_PROFILE_URL = 'https://www.credly.com/users/saad-naanaiy/badges';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const Certifs = ({ isDarkMode }) => {
  const [selectedCertif, setSelectedCertif] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const openCertificate = (certif) => {
    setSelectedCertif(certif);
    setIsOpen(true);
  };

  const closeCertificate = () => {
    setIsOpen(false);
    setTimeout(() => setSelectedCertif(null), 300);
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') closeCertificate();
    };
    if (isOpen) document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  return (
    <section
      id="certifs"
      className="relative w-full mx-auto px-4 sm:px-6 lg:px-[10%] py-20 scroll-mt-20 overflow-hidden bg-slate-50/50 dark:bg-cyber-darker bg-cyber-grid dark:bg-cyber-grid bg-[length:40px_40px]"
    >
      {/* Decorative corner accents */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-cyber-cyan/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-cyber-emerald/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyber-cyan/10 dark:bg-cyber-cyan/20 text-cyber-cyan font-mono text-xs font-medium mb-4">
            <Lock className="w-3.5 h-3.5" />
            credentials
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <GradientText
              colors={
                isDarkMode
                  ? ['#06b6d4', '#10b981', '#06b6d4', '#0891b2']
                  : ['#0f172a', '#06b6d4', '#0f172a', '#10b981']
              }
              animationSpeed={3}
              showBorder={false}
              className="custom-class"
            >
              Certifications & Badges
            </GradientText>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            Verified professional certificates and Credly badges in Full Stack, Cybersecurity, and IT.
          </p>
        </motion.div>

        {/* Credly – premium card */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <a
            href={CREDLY_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col sm:flex-row items-center gap-6 sm:gap-8 p-6 sm:p-8 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-cyber-border bg-white/90 dark:bg-cyber-surface/90 shadow-xl hover:shadow-2xl hover:shadow-cyber-emerald/10 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyber-emerald/5 via-transparent to-cyber-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyber-emerald to-cyber-cyan rounded-r-full" />
            <div className="relative flex-shrink-0 w-20 h-20 rounded-2xl bg-gradient-to-br from-cyber-emerald/20 to-cyber-cyan/20 dark:from-cyber-emerald/30 dark:to-cyber-cyan/30 flex items-center justify-center ring-2 ring-cyber-emerald/30">
              <Shield className="w-10 h-10 text-cyber-emerald" />
            </div>
            <div className="relative flex-1 text-center sm:text-left">
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-1">
                All badges on Credly
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                View verified credentials and industry-recognized badges.
              </p>
              <span className="inline-flex items-center gap-2 text-cyber-emerald font-semibold text-sm group-hover:gap-3 transition-all">
                Open Credly profile
                <ExternalLink className="w-4 h-4" />
              </span>
            </div>
            <div className="relative hidden sm:flex w-12 h-12 rounded-xl bg-slate-100 dark:bg-cyber-dark items-center justify-center group-hover:bg-cyber-emerald/20 transition-colors">
              <ChevronRight className="w-6 h-6 text-slate-400 group-hover:text-cyber-emerald transition-colors" />
            </div>
          </a>

          {credlyBadges && credlyBadges.length > 0 && (
            <div className="mt-8">
              <h4 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-4 flex items-center gap-2">
                <Award className="w-4 h-4 text-cyber-emerald" />
                Featured badges
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {credlyBadges.map((badge, index) => (
                  <a
                    key={index}
                    href={badge.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center p-5 rounded-2xl border border-slate-200 dark:border-cyber-border bg-white dark:bg-cyber-surface hover:border-cyber-emerald/50 hover:shadow-lg hover:shadow-cyber-emerald/10 hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden mb-3 bg-slate-50 dark:bg-cyber-dark flex items-center justify-center ring-1 ring-slate-200/50 dark:ring-cyber-border">
                      <Image src={badge.img} alt={badge.title} width={64} height={64} className="w-full h-full object-contain" />
                    </div>
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300 text-center line-clamp-2 group-hover:text-cyber-emerald transition-colors">
                      {badge.title}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Certificates – advanced card grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={containerVariants}
          className="mb-4"
        >
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
            <Award className="w-5 h-5 text-cyber-cyan" />
            Course & professional certificates
          </h3>
        </motion.div>
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 sm:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={containerVariants}
        >
          {myData.map((certif, index) => (
            <motion.button
              key={index}
              type="button"
              variants={itemVariants}
              onClick={() => openCertificate(certif)}
              className="group relative text-left rounded-2xl overflow-hidden border border-slate-200/80 dark:border-cyber-border bg-white dark:bg-cyber-surface shadow-lg hover:shadow-xl hover:shadow-cyber-cyan/10 hover:border-cyber-cyan/40 hover:-translate-y-2 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyber-cyan focus-visible:ring-offset-2 dark:focus-visible:ring-offset-cyber-dark"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />
              <div className="aspect-[4/3] relative bg-slate-100 dark:bg-cyber-dark overflow-hidden">
                <Image
                  src={certif.img}
                  alt={certif.text}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 flex items-end p-4">
                  <span className="text-white text-sm font-medium line-clamp-2 drop-shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    {certif.text}
                  </span>
                </div>
              </div>
              <div className="p-4 border-t border-slate-100 dark:border-cyber-border">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-100 line-clamp-2 group-hover:text-cyber-cyan transition-colors">
                  {certif.text}
                </p>
                <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mt-1.5 group-hover:text-cyber-cyan transition-colors">
                  View certificate
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Certificate modal – advanced design */}
      <AnimatePresence>
        {isOpen && selectedCertif && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCertificate}
          >
            <motion.div
              className="bg-white dark:bg-cyber-surface rounded-2xl overflow-hidden w-full max-w-4xl max-h-[90vh] relative border border-slate-200/50 dark:border-cyber-border shadow-2xl"
              initial={{ opacity: 0, scale: 0.96, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 24 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyber-cyan via-cyber-emerald to-cyber-cyan" />
              <button
                className="absolute top-4 right-4 z-10 p-2.5 rounded-xl bg-slate-100 dark:bg-cyber-dark text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-cyber-border transition-colors"
                onClick={closeCertificate}
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="relative w-full h-[45vh] sm:h-[52vh] bg-slate-100 dark:bg-cyber-dark flex items-center justify-center p-6">
                <Image
                  src={selectedCertif.img}
                  alt={selectedCertif.text}
                  fill
                  className="object-contain p-4"
                />
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyber-emerald text-cyber-dark text-xs font-semibold shadow-lg">
                  <Shield className="w-3.5 h-3.5" />
                  Verified
                </div>
              </div>
              <div className="p-6 sm:p-8 border-t border-slate-100 dark:border-cyber-border">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2 pr-10">
                  {selectedCertif.text}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
                  Professional certification validating skills in this domain.
                </p>
                <a
                  href={selectedCertif.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyber-cyan text-cyber-dark font-semibold hover:bg-cyber-cyanDim transition-colors shadow-lg hover:shadow-cyber-glow"
                >
                  View full certificate
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certifs;
