import { assets } from '../assets/assets';
import Image from 'next/image';
import React from 'react';
import { Github, Linkedin, Mail, Shield } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();
  const links = [
    {
      href: 'https://github.com/Saadnaanaiy',
      label: 'GitHub',
      icon: Github,
    },
    {
      href: 'https://www.linkedin.com/in/saad-naanaiy-151a55278/',
      label: 'LinkedIn',
      icon: Linkedin,
    },
    {
      href: 'https://www.credly.com/users/saad-naanaiy/badges',
      label: 'Credly',
      icon: Shield,
    },
    {
      href: 'mailto:saadnaanaiy@gmail.com',
      label: 'Email',
      icon: Mail,
    },
  ];

  return (
    <footer className="w-full px-4 sm:px-6 lg:px-[10%] py-8 bg-cyber-dark border-t border-cyber-border">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="text-slate-400 text-sm font-medium">
          © {year} Saad Naanaiy · Full Stack · Cybersecurity · System Admin · AI
        </p>
        <ul className="flex items-center gap-6">
          {links.map(({ href, label, icon: Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-400 hover:text-cyber-cyan transition-colors text-sm font-medium"
                aria-label={label}
              >
                <Icon className="w-5 h-5" />
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
