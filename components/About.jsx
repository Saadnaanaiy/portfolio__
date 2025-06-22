import { assets, toolsData, infoList } from '@/assets/assets';
import Image from 'next/image';
import GradientText from './GradientText';

const About = ({ isDarkMode }) => {
  return (
    <div id="about" className="w-full px-[12%] py-10 scroll-mt-20">
      <h4 className="dark:text-white text-center mb-4 text-2xl font-Outfit font-semibold text-gray-700">
        Introduction
      </h4>

      <h2 className="about-title text-center text-5xl font-Outfit">
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
          About Me
        </GradientText>
      </h2>

      <div className="flex w-full flex-col lg:flex-row items-center gap-20 my-20 relative">
        <div className="about-image w-64 sm:w-80 rounded-3xl max-w-none transition-transform duration-300 relative">
          <Image
            src={assets.profile_img}
            alt="user"
            className="w-full rounded-3xl"
            width={400}
            height={400}
          />
        </div>

        <div className="flex-1">
          <div className="flex-1 space-y-4 text-center lg:text-left">
            <p className="text-md sm:text-lg lg:text-xl text-gray-700 dark:text-white">
              I specialize in technologies such as{' '}
              {toolsData.slice(0, 3).map((tool, index) => (
                <span
                  key={index}
                  className="relative group cursor-pointer text-gray-700 dark:text-white"
                >
                  <span className="absolute left-1/2 transform -translate-x-1/2 -top-20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex justify-center items-center gap-2 bg-gray-800 dark:text-white dark:bg-darkHover text-white pl-8 px-8 py-2 rounded-lg shadow-md w-38">
                    <Image
                      src={tool.src}
                      alt={tool.title || `Tool ${index}`}
                      width={30}
                      height={30}
                      className="w-6 h-6"
                    />
                    {tool.title || `Tool ${index}`}
                  </span>
                  <span className="relative">
                    {tool.title || `Tool ${index}`},{' '}
                  </span>
                </span>
              ))}
              , and many other technologies like{' '}
              {toolsData.slice(3, 10).map((tool, index) => (
                <span
                  key={index}
                  className="relative group cursor-pointer text-gray-700 dark:text-white"
                >
                  <span className="absolute left-1/2 transform -translate-x-1/2 -top-20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex justify-center items-center gap-2 bg-gray-800 dark:text-white dark:bg-darkHover  text-white pl-8 px-8 py-2 rounded-lg shadow-md w-38">
                    <Image
                      src={tool.src}
                      alt={tool.title || `Tool ${index}`}
                      width={80}
                      height={80}
                      className="w-6 h-6"
                    />
                    {tool.title || `Tool ${index}`}
                  </span>
                  <span className="relative">
                    {tool.title || `Tool ${index}`}, {'  '}
                  </span>
                </span>
              ))}
              .
            </p>

            <ul className="pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-2xl mx-auto">
              {infoList.map(({ icon, iconDark, title, description }, index) => (
                <li
                  className="about-list-item border-[0.5px] border-gray-400 rounded-xl p-6 cursor-pointer hover:bg-lightHover hover:-translate-y-1 duration-500 hover:shadow-black dark:border-white dark:hover:shadow-white dark:hover:bg-darkHover/50 dark:text-white"
                  key={index}
                >
                  <Image
                    className="w-7 mt-3 mx-auto"
                    src={isDarkMode ? iconDark : icon}
                    alt={title}
                    width={20} // Set width for icons
                    height={20} // Set height for icons
                  />
                  <h3 className="dark:text-white my-4 text-center font-semibold text-gray-700">
                    {title}
                  </h3>
                  <p className="dark:text-white text-center text-gray-600 text-sm">
                    {description}
                  </p>
                </li>
              ))}
            </ul>

            <h4 className="my-6 text-gray-700 font-Outfit dark:text-white text-xl">
              Tools I Use
            </h4>

            <ul className="flex items-center justify-center gap-6 sm:gap-8 flex-wrap">
              {toolsData.map((tool, index) => (
                <li
                  className="dark:hover:shadow-white dark:border flex items-center justify-center w-12 sm:w-14 aspect-square border-2 border-gray-200 rounded-lg cursor-pointer hover:-translate-y-1 duration-500 hover:shadow-black"
                  key={index}
                >
                  <Image
                    src={tool.src}
                    alt={tool.alt || `Tool ${index}`} // Use alt if available
                    width={44} // Set a fixed width for tool icons
                    height={40} // Set a fixed height for tool icons
                    className="w-10 sm:w-10"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
