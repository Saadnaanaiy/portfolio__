'use client';
import { useState } from 'react';
import { assets, toolsData, infoList } from '../assets/assets';
import Image from 'next/image';
import GradientText from './GradientText';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Shield, Server, Cpu } from 'lucide-react';

const About = ({ isDarkMode }) => {
  const [activeCategory, setActiveCategory] = useState('Languages');

  const categories = [
    'Languages',
    'Frameworks',
    'Tools',
    'Databases',
    'Packages',
    'Cloud Services',
    'Automation Tools',
    'Operating Systems',
    'Soft Skills',
  ];

  const filteredTools = toolsData.filter(
    (tool) => tool.category === activeCategory
  );

  const domains = [
    {
      icon: Code2,
      label: 'Full Stack',
      className:
        'border-cyber-cyan/50 bg-cyber-cyan/10 text-cyber-cyan hover:border-cyber-cyan hover:bg-cyber-cyan/25 hover:shadow-[0_0_18px_rgba(6,182,212,0.4)] transition-all duration-300',
    },
    {
      icon: Shield,
      label: 'Cybersecurity',
      className:
        'border-cyber-emerald/50 bg-cyber-emerald/10 text-cyber-emerald hover:border-cyber-emerald hover:bg-cyber-emerald/25 hover:shadow-[0_0_18px_rgba(16,185,129,0.4)] transition-all duration-300',
    },
    {
      icon: Server,
      label: 'System Admin',
      className:
        'border-cyber-amber/50 bg-cyber-amber/10 text-cyber-amber hover:border-cyber-amber hover:bg-cyber-amber/25 hover:shadow-[0_0_18px_rgba(245,158,11,0.4)] transition-all duration-300',
    },
    {
      icon: Cpu,
      label: 'AI',
      className:
        'border-cyber-rose/50 bg-cyber-rose/10 text-cyber-rose hover:border-cyber-rose hover:bg-cyber-rose/25 hover:shadow-[0_0_18px_rgba(244,63,94,0.4)] transition-all duration-300',
    },
  ];

  return (
    <div
      id="about"
      className="w-full px-4 sm:px-6 lg:px-[10%] py-16 scroll-mt-20 bg-slate-50/50 dark:bg-cyber-darker bg-cyber-grid dark:bg-cyber-grid bg-[length:40px_40px]"
    >
      <div className="max-w-6xl mx-auto">
        <p className="text-center mb-2 font-mono text-sm text-cyber-cyan">
          &gt; introduction
        </p>
        <h2 className="text-center text-4xl sm:text-5xl font-bold mb-4">
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
            About Me
          </GradientText>
        </h2>
        <p className="text-center text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-12">
          Full Stack Developer · Cybersecurity & System Administration
          Engineering (3rd year) · Higher School of Technology
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

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
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
              I specialize in technologies such as{' '}
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
              and many others including{' '}
              {toolsData.slice(3, 8).map((tool, index) => (
                <span
                  key={index}
                  className="relative group cursor-pointer font-medium text-slate-800 dark:text-slate-100"
                >
                  <span className="absolute left-1/2 lg:left-0 -translate-x-1/2 lg:translate-x-0 -top-20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex justify-center items-center gap-2 bg-cyber-surface border border-cyber-border text-slate-100 px-4 py-2 rounded-lg shadow-xl z-10 whitespace-nowrap">
                    <Image src={tool.src} alt={tool.title} width={24} height={24} className="object-contain" />
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
                        ? 'bg-cyber-cyan text-cyber-dark dark:bg-cyber-cyan dark:text-cyber-dark'
                        : 'bg-slate-200/80 dark:bg-cyber-surface text-slate-600 dark:text-slate-300 hover:bg-cyber-cyan/20 hover:text-cyber-cyan'
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
