import React, { useState } from 'react';
import { myData, serviceData } from '../assets/assets';
import Image from 'next/image';
import { Dialog } from '@headlessui/react';
import GradientText from './GradientText';
import { ArrowRight } from 'lucide-react';

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
    <div id="services" className="w-full px-[12%] py-10 scroll-mt-20">
      <h4 className="dark:text-white text-center mb-4 text-2xl font-Outfit font-semibold text-gray-700">
        What I Offer
      </h4>
      <h2 className="text-center text-5xl font-Outfit mb-6 translate-y-6">
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
          My Services
        </GradientText>
      </h2>
      <p className="text-center max-w-2xl sm:text-lg text-2xl mx-auto pt-12 mb-12 font-Outfit">
        I am an experienced FrontEnd Developer with over a decade of
        professional expertise in the field. Throughout my career, I have had
        the privilege of collaborating with prestigious organizations,
        contributing to their success and growth.
      </p>

      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-16 dark:text-white relative">
          <GradientText
            text="My Services"
            animated={true}
            as="span"
            interactive={true}
            colors="linear-gradient(90deg, #6366f1, #8b5cf6, #d946ef, #6366f1)"
          />
          <div className="absolute w-24 h-1 bg-indigo-600 rounded left-1/2 transform -translate-x-1/2 bottom-0 mt-3"></div>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {serviceData.map((service, index) => (
            <div
              key={index}
              className="hover-card glass overflow-hidden relative rounded-xl p-8 transition-all duration-300 dark:text-white dark:border-gray-700 h-full"
            >
              <div className="flex flex-col h-full">
                <div className="mb-4 text-indigo-600 dark:text-indigo-400">
                  <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center animate-float">
                    <Image
                      src={service.icon}
                      alt={service.title}
                      className="w-8 h-8"
                    />
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 flex-grow">
                  {service.description}
                </p>

                <div className="mt-6 flex items-center">
                  <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                    Learn more
                  </span>
                  <ArrowRight className="w-4 h-4 ml-2 text-indigo-600 dark:text-indigo-400" />
                </div>

                {/* Decorative element */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-indigo-100 dark:bg-indigo-900/20 rounded-full opacity-50 transform rotate-45"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <Dialog
        open={isOpen}
        onClose={closeModal}
        className="fixed inset-0 flex items-center justify-center p-4 backdrop-blur-md bg-darkHover bg-opacity-65"
      >
        <Dialog.Panel className="bg-white dark:bg-darkHover rounded-lg shadow-lg p-6 max-w-md w-full relative">
          <button
            className="absolute top-4 right-4 text-gray-600 dark:text-white text-2xl"
            onClick={closeModal}
          >
            ✖
          </button>
          {selectedService && (
            <>
              <Image
                src={selectedService.icon}
                alt={selectedService.title}
                className="w-16 mx-auto mb-6"
              />
              <h3 className="text-2xl font-bold text-center text-gray-700 dark:text-white mb-4">
                {selectedService.title}
              </h3>
              <p className="text-center text-gray-600 dark:text-white/80 mb-6">
                {selectedService.description}
              </p>
              <ul className="text-sm text-gray-600 dark:text-white/80 space-y-2">
                {selectedService.points?.map((point, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="text-green-500">✅</span> {point}
                  </li>
                ))}
              </ul>
            </>
          )}
        </Dialog.Panel>
      </Dialog>
    </div>
  );
};

export default Services;
