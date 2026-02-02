import React, { useState } from 'react';
import { serviceData } from '../assets/assets';
import Image from 'next/image';
import { Dialog } from '@headlessui/react';
import GradientText from './GradientText';
import { ArrowRight, X } from 'lucide-react';

const Services = ({ isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const openModal = (service) => {
    setSelectedService(service);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedService(null);
  };

  return (
    <div
      id="services"
      className="w-full px-4 sm:px-6 lg:px-[10%] py-16 scroll-mt-20 bg-white dark:bg-cyber-dark"
    >
      <div className="max-w-6xl mx-auto">
        <p className="text-center mb-2 font-mono text-sm text-cyber-cyan">
          &gt; what I offer
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
            My Services
          </GradientText>
        </h2>
        <p className="text-center text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-14">
          Cybersecurity-first building: web & application security, systems administration,
          secure development, and AI-driven automation.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceData.map((service, index) => (
            <div
              key={index}
              onClick={() => openModal(service)}
              className="group relative rounded-xl border border-slate-200 dark:border-cyber-border bg-slate-50/50 dark:bg-cyber-surface p-6 h-full transition-all duration-300 hover:border-cyber-cyan/50 hover:shadow-cyber-glow cursor-pointer"
            >
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <div className="w-14 h-14 rounded-xl bg-cyber-cyan/10 dark:bg-cyber-cyan/20 flex items-center justify-center text-cyber-cyan group-hover:bg-cyber-cyan/20 transition-colors">
                    <Image
                      src={service.icon}
                      alt={service.title}
                      className="w-8 h-8 object-contain"
                      width={32}
                      height={32}
                    />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">
                  {service.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm flex-grow line-clamp-3">
                  {service.description}
                </p>
                <div className="mt-4 flex items-center text-cyber-cyan text-sm font-medium">
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog
        open={isOpen}
        onClose={closeModal}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      >
        <Dialog.Panel className="bg-white dark:bg-cyber-surface border border-slate-200 dark:border-cyber-border rounded-xl shadow-2xl p-6 max-w-md w-full relative">
          <button
            className="absolute top-4 right-4 p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-cyber-dark"
            onClick={closeModal}
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          {selectedService && (
            <>
              <div className="w-16 h-16 rounded-xl bg-cyber-cyan/10 flex items-center justify-center mx-auto mb-4">
                <Image
                  src={selectedService.icon}
                  alt={selectedService.title}
                  width={36}
                  height={36}
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-center text-slate-800 dark:text-slate-100 mb-3">
                {selectedService.title}
              </h3>
              <p className="text-center text-slate-600 dark:text-slate-400 text-sm">
                {selectedService.description}
              </p>
              {selectedService.points?.length > 0 && (
                <ul className="mt-4 text-sm text-slate-600 dark:text-slate-400 space-y-2">
                  {selectedService.points.map((point, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-cyber-emerald">✓</span> {point}
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </Dialog.Panel>
      </Dialog>
    </div>
  );
};

export default Services;
