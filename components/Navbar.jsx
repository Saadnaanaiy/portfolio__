import { assets } from '../assets/assets';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';

const Navbar = ({ isDarkMode, setIsDarkMode }) => {
  const [isScroll, setIsScroll] = useState(true);
  const sideMenuRef = useRef();

  const openMenu = () => {
    sideMenuRef.current.style.transform = 'translateX(1rem)';
  };

  const closeMenu = () => {
    sideMenuRef.current.style.transform = 'translateX(16rem)';
  };

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (scrollY > 50) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    });
  }, []);

  return (
    <div>
      <div className="fixed top-0 right-0 w-11/12 -z-10 translate-y-[-80%] dark:hidden">
        <Image src={assets.header_bg_color} alt="" className="w-full" />
      </div>
      <nav
        className={`w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 flex items-center justify-between z-50 ${
          isScroll
            ? 'bg-white bg-opacity-50 backdrop-blur-lg shadow-sm dark:bg-darkThem dark:shadow-white/20'
            : ''
        }`}
      >
        <a href="#top">
          <h2 className="font-medium text-3xl">
            Saad Naanaiy{' '}
            <span className="text-red-500 font-extrabold text-2xl">.</span>
          </h2>
        </a>
        <ul
          className={`hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-3 ${
            isScroll
              ? ''
              : 'bg-white bg-opacity-50 shadow-sm dark:border dark:border-white/50 dark:bg-transparent'
          }`}
        >
          {[
            { name: 'Home', href: '#top' },
            { name: 'About me', href: '#about' },
            { name: 'Services', href: '#services' },
            { name: 'My Work', href: '#work' },
            { name: 'My Certifications', href: '#certifs' },
            { name: 'Contact Me', href: '#contact' },
          ].map((link, index) => (
            <li key={index} className="relative group">
              <a
                href={link.href}
                className="font-Outfit hover:text-gray-500 duration-300"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4">
          {/* Fixed Dark Mode Toggle Button */}
          <button
            onClick={() => setIsDarkMode((prev) => !prev)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 flex items-center justify-center"
            aria-label="Toggle dark mode"
          >
            <Image
              src={isDarkMode ? assets.sun_icon : assets.moon_icon}
              alt={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              className="w-6 h-6 transition-all duration-300"
              width={24}
              height={24}
            />
          </button>

          <a
            className="dark:border-white/50 hidden lg:flex items-center gap-3 px-10 py-3 border border-gray-500 rounded-full ml-4 dark:bg-darkThem dark:text-white font-medium shadow-lg hover:bg-gray-300 dark:hover:bg-darkHover hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
            href="#contact"
          >
            Contact
            <Image
              className={`w-4 h-4 transition-all duration-300 ${
                isDarkMode ? '' : 'filter invert'
              }`}
              alt="arrow"
              src={assets.arrow_icon}
              width={16}
              height={16}
            />
          </a>

          <button
            onClick={openMenu}
            className="block md:hidden ml-3 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
          >
            <Image
              className="w-6 h-6"
              alt="menu"
              src={isDarkMode ? assets.menu_white : assets.menu_black}
              width={24}
              height={24}
            />
          </button>
        </div>

        {/* Mobile menu */}
        <ul
          ref={sideMenuRef}
          className="flex md:hidden flex-col gap-4 py-20 px-10 fixed -right-0 top-0 bottom-0 w-64 z-50 h-screen bg-gray-100 rounded-lg transition duration-500 dark:bg-darkHover dark:text-white"
          style={{ transform: 'translateX(16rem)' }}
        >
          <div
            onClick={closeMenu}
            className="absolute right-6 top-6 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
          >
            <Image
              src={isDarkMode ? assets.close_white : assets.close_black}
              alt="close menu"
              className="w-5 h-5 cursor-pointer"
              width={20}
              height={20}
            />
          </div>
          <li>
            <a
              className="font-Outfit block py-2 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
              href="#top"
              onClick={closeMenu}
            >
              Home
            </a>
          </li>
          <li>
            <a
              className="font-Outfit block py-2 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
              href="#about"
              onClick={closeMenu}
            >
              About me
            </a>
          </li>
          <li>
            <a
              className="font-Outfit block py-2 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
              href="#services"
              onClick={closeMenu}
            >
              Services
            </a>
          </li>
          <li>
            <a
              className="font-Outfit block py-2 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
              href="#work"
              onClick={closeMenu}
            >
              My Work
            </a>
          </li>
          <li>
            <a
              className="font-Outfit block py-2 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
              href="#certifs"
              onClick={closeMenu}
            >
              My Certifications
            </a>
          </li>
          <li>
            <a
              className="font-Outfit block py-2 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
              href="#contact"
              onClick={closeMenu}
            >
              Contact Me
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
