import { assets } from '../assets/assets';
import Image from 'next/image';
import React, { useState } from 'react';
import GradientText from './GradientText';

const Contact = ({ isDarkMode }) => {
  const [result, setResult] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult('Sending....');
    const formData = new FormData(event.target);

    formData.append('access_key', '5ce9da21-c6ea-48e2-be3a-afbe78eb8efc');

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult('Form Submitted Successfully');
      event.target.reset();
    } else {
      console.log('Error', data);
      setResult(data.message);
    }
  };

  return (
    <div
      id="contact"
      className="w-full px-4 sm:px-6 lg:px-[10%] py-16 scroll-mt-20 bg-slate-50/50 dark:bg-cyber-darker bg-cyber-grid dark:bg-cyber-grid bg-[length:40px_40px]"
    >
      <div className="max-w-2xl mx-auto">
        <p className="text-center mb-2 font-mono text-sm text-cyber-cyan">
          &gt; contact
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
            Get In Touch
          </GradientText>
        </h2>
        <p className="text-center text-slate-600 dark:text-slate-400 max-w-lg mx-auto mb-10">
          Questions, collaboration, or feedback? Use the form below or reach
          out via email.
        </p>

        <form onSubmit={onSubmit} action="" className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              className="w-full outline-none border border-slate-300 dark:border-cyber-border rounded-lg bg-white dark:bg-cyber-surface p-3.5 text-slate-800 dark:text-slate-100 placeholder:text-slate-500 focus:border-cyber-cyan focus:ring-2 focus:ring-cyber-cyan/20 transition-all"
              type="text"
              required
              placeholder="Your name"
              name="name"
            />
            <input
              className="w-full outline-none border border-slate-300 dark:border-cyber-border rounded-lg bg-white dark:bg-cyber-surface p-3.5 text-slate-800 dark:text-slate-100 placeholder:text-slate-500 focus:border-cyber-cyan focus:ring-2 focus:ring-cyber-cyan/20 transition-all"
              type="email"
              required
              placeholder="Your email"
              name="email"
            />
          </div>
          <textarea
            rows={5}
            className="w-full outline-none border border-slate-300 dark:border-cyber-border rounded-lg bg-white dark:bg-cyber-surface p-3.5 text-slate-800 dark:text-slate-100 placeholder:text-slate-500 focus:border-cyber-cyan focus:ring-2 focus:ring-cyber-cyan/20 transition-all resize-none"
            placeholder="Your message"
            required
            name="message"
          />
          <div className="flex flex-col items-center gap-3">
            <button
              type="submit"
              className="flex items-center gap-2 px-8 py-3.5 rounded-lg bg-cyber-cyan text-cyber-dark font-semibold hover:bg-cyber-cyanDim transition-all shadow-cyber-glow disabled:opacity-70"
            >
              Send message
              <Image
                src={
                  isDarkMode ? assets.right_arrow_white : assets.right_arrow_bold
                }
                alt=""
                className="w-4 h-4"
                width={16}
                height={16}
              />
            </button>
            <p
              className={`text-sm font-medium ${
                result === 'Form Submitted Successfully'
                  ? 'text-cyber-emerald'
                  : result
                  ? 'text-cyber-rose'
                  : 'text-slate-500'
              }`}
            >
              {result}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
