import React, { useEffect, useRef } from 'react';

const GradientText = ({
  children,
  text,
  className = '',
  colors = ['#40ffaa', '#4079ff', '#40ffaa', '#4079ff', '#40ffaa'], // Default colors
  animationSpeed = 8, // Default animation speed in seconds
  showBorder = false, // Default overlay visibility
  animated = true,
  as = 'span',
  interactive = false,
}) => {
  const textRef = useRef(null);
  const Element = as;
  const content = text || children;

  // Handle interaction effects if enabled
  useEffect(() => {
    if (interactive && textRef.current && typeof window !== 'undefined') {
      const chars = textRef.current.querySelectorAll('.char');

      chars.forEach((char) => {
        char.addEventListener('mouseenter', () => {
          if (window.gsap) {
            window.gsap.to(char, {
              y: -5,
              scale: 1.2,
              color: '#6366f1',
              duration: 0.3,
              ease: 'power2.out',
            });
          }
        });

        char.addEventListener('mouseleave', () => {
          if (window.gsap) {
            window.gsap.to(char, {
              y: 0,
              scale: 1,
              color: '',
              duration: 0.3,
              ease: 'power2.in',
            });
          }
        });
      });

      return () => {
        chars.forEach((char) => {
          char.removeEventListener('mouseenter', () => {});
          char.removeEventListener('mouseleave', () => {});
        });
      };
    }
  }, [interactive]);

  // Process colors to handle both array and string formats
  let backgroundImage;
  if (typeof colors === 'string') {
    backgroundImage = colors; // Use as is if it's already a CSS string
  } else if (Array.isArray(colors)) {
    backgroundImage = `linear-gradient(to right, ${colors.join(', ')})`;
  } else {
    backgroundImage =
      'linear-gradient(to right, #6366f1, #8b5cf6, #d946ef, #6366f1)'; // Default fallback
  }

  // Create styles based on props
  const gradientStyle = {
    backgroundImage,
    animationDuration: `${animationSpeed}s`,
  };

  // Split text into individual characters if interactive
  const renderContent = () => {
    if (interactive && typeof content === 'string') {
      return content.split('').map((char, index) => (
        <span key={index} className="char relative inline-block">
          {char === ' ' ? '\u00A0' : char}
        </span>
      ));
    }
    return content;
  };

  // Support both old and new APIs
  if (showBorder !== undefined || animationSpeed !== 8) {
    // Legacy style (original component)
    return (
      <div className={`animated-gradient-text ${className}`}>
        {showBorder && (
          <div className="gradient-overlay" style={gradientStyle}></div>
        )}
        <Element className="text-content" style={gradientStyle}>
          {renderContent()}
        </Element>
      </div>
    );
  } else {
    // New style (enhanced component) - uses css classes from globals.css
    const gradientClass = animated ? 'gradient-text' : '';
    const customStyle =
      typeof colors === 'string'
        ? {
            background: colors,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            backgroundSize: '300% 100%',
            ...(animated && { animation: 'gradientBG 6s ease infinite' }),
          }
        : gradientStyle;

    return (
      <Element
        ref={textRef}
        className={`${gradientClass} ${className} inline-block`}
        style={customStyle}
      >
        {renderContent()}
      </Element>
    );
  }
};

export default GradientText;
