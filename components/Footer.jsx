import { assets, myData } from '../assets/assets';
import Image from 'next/image';
import React, { useState } from 'react';

const Footer = ({ isDarkMode }) => {
  return (
    <div>
      {/* Copyright Section */}
      {/* Social Links */}
      <div className=" dark:text-white text-center sm:flex items-center justify-between border-t border-gray-400 mx-[10%] mt-12 py-6">
        <p className="mt-8 dark:text-white text-center text-gray-500 text-sm font-Outfit">
          © {new Date().getFullYear()} Saad Naanaiy. All rights reserved.
        </p>
        <ul className="flex justify-center items-center gap-6 mt-4">
          <li className="dark:text-white flex items-center gap-2">
            <Image
              src={assets.github}
              alt="GitHub"
              className="w-6 h-6 hover:scale-110 transition-transform duration-200"
            />
            <a
              href="https://github.com/Saadnaanaiy"
              target="_blank"
              rel="noopener noreferrer"
              className="dark:hover:text-gray-300 dark:text-white text-sm font-Outfit text-gray-600 hover:text-black transition-colors duration-300"
            >
              GitHub
            </a>
          </li>
          <li className="flex items-center gap-2">
            <Image
              src={assets.linkedin}
              alt="LinkedIn"
              className="w-6 h-6 hover:scale-110 transition-transform duration-200"
            />
            <a
              href="https://www.linkedin.com/in/saad-naanaiy-151a55278/"
              target="_blank"
              rel="noopener noreferrer"
              className="dark:hover:text-gray-300 dark:text-white text-sm font-Outfit text-gray-600 hover:text-black transition-colors duration-300"
            >
              LinkedIn
            </a>
          </li>
          <li className="flex items-center gap-2">
            <Image
              src={assets.gmail}
              alt="Email"
              className="w-6 h-6 hover:scale-110 transition-transform duration-200"
            />
            <a
              href="mailto:saadnaanaiy@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="dark:hover:text-gray-300 dark:text-white text-sm font-Outfit text-gray-600 hover:text-black transition-colors duration-300"
            >
              Email
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
