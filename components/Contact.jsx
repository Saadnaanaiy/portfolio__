import { assets } from '@/assets/assets';
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
      className={`w-full mt-10 px-[12%] py-10 scroll-mt-20 bg-no-repeat bg-center bg-[length:90%_auto] ${
        isDarkMode ? '' : "bg-[url('/footer-bg-color.png')]"
      } `}
    >
      <h4 className="dark:text-white text-center mb-4 text-2xl font-Outfit font-semibold text-gray-700">
        Contact Me
      </h4>

      <h2 className="text-center text-5xl font-Outfit animate-fade-in">
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
          Get In Touch
        </GradientText>
      </h2>
      <p className="text-center sm:text-lg text-2xl max-w-2xl mx-auto mt-5 mb-12 font-Outfit">
        I'd love to hear from you! If you have any questions, comments, or
        feedback, please use the form below.
      </p>

      <form onSubmit={onSubmit} action="" className="max-w-2xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 mb-8">
          <input
            className="flex-1 outline-none border-[0.5px] border-gray-400 rounded-md bg-white p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
            type="text"
            required
            placeholder="Enter Your Name.."
            name="name"
          />
          <input
            className="flex-1 outline-none border-[0.5px] border-gray-400 rounded-md bg-white p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
            type="email"
            required
            placeholder="Enter Your Email.."
            name="email"
          />
        </div>
        <textarea
          rows="6"
          className="w-full outline-none border-[0.5px] border-gray-400 rounded-md bg-white p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
          placeholder="Enter Your Message.."
          required
          name="message"
        ></textarea>
        <div className="flex flex-col items-center mt-6">
          <button
            type="submit"
            className="flex w-max gap-2 justify-between items-center bg-white hover:bg-lightHover duration-500 text-black  font-Outfit rounded-full hover:-translate-y-1 py-4 px-10 transition dark:hover:bg-darkHover dark:text-white dark:bg-darkThem dark:border-white border border-black hover:shadow-black  dark:hover:shadow-white"
          >
            Submit Now{' '}
            <Image
              src={
                isDarkMode ? assets.right_arrow_white : assets.right_arrow_bold
              }
              alt=""
              className="w-4"
            />
          </button>
          <p
            className={`mt-4 text-sm font-Outfit transition-all ${
              result === 'Form Submitted Successfully'
                ? 'text-green-500'
                : 'text-red-500'
            }`}
          >
            {result}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Contact;
