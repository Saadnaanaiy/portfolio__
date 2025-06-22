import { useState, useEffect } from 'react';
import Image from 'next/image';
import { workData } from '@/assets/assets';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaGithub,
  FaExternalLinkAlt,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';
import GradientText from './GradientText';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const WorkSection = ({ isDarkMode }) => {
  const [activeProject, setActiveProject] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
    hover: {
      scale: 1.05,
      boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.15)',
      transition: { duration: 0.3 },
    },
  };

  const detailsVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: { duration: 0.5, ease: 'easeInOut' },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
  };

  const handleProjectClick = (index) => {
    setIsLoading(true);
    setTimeout(() => {
      setActiveProject(activeProject === index ? null : index);
      setIsLoading(false);
    }, 300);
  };

  return (
    <div
      id="work"
      className="w-full px-4 md:px-[8%] py-20 scroll-mt-20 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-purple-300 dark:bg-purple-900 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-40 right-10 w-80 h-80 rounded-full bg-blue-300 dark:bg-blue-900 opacity-20 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <h4 className="dark:text-white text-center mb-4 text-2xl font-Outfit font-semibold text-gray-700 animate-fade-in">
          My Projects
        </h4>
        <h2 className="text-center mb-16 text-5xl font-Outfit font-semibold animate-fade-in">
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
            Creative Portfolio
          </GradientText>
        </h2>

        {/* Featured Project Carousel */}
        <div className="mb-20">
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={{ clickable: true }}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            modules={[EffectCoverflow, Pagination, Navigation]}
            className="mySwiper"
          >
            {workData.slice(0, 5).map((project, index) => (
              <SwiperSlide key={index} className="max-w-3xl">
                <div className="relative group cursor-grab overflow-hidden rounded-xl">
                  <div className="relative aspect-video overflow-hidden rounded-xl">
                    <Image
                      src={project.bgImage}
                      alt={project.title}
                      width={1200}
                      height={675}
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform transition-transform duration-500">
                    <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                    <p className="text-sm text-gray-200 mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex space-x-3">
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white/20 backdrop-blur-sm hover:bg-white/30 p-2 rounded-full transition-all duration-300"
                        >
                          <FaGithub className="text-white text-lg" />
                        </a>
                      )}
                      {project.demoLink && (
                        <a
                          href={project.demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white/20 backdrop-blur-sm hover:bg-white/30 p-2 rounded-full transition-all duration-300"
                        >
                          <FaExternalLinkAlt className="text-white text-lg" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div className="swiper-button-prev !text-white after:!text-2xl"></div>
            <div className="swiper-button-next !text-white after:!text-2xl"></div>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default WorkSection;
