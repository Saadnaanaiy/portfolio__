import React from 'react';

const LetterGlitch = ({
  className = '',
  fontSize = '48px',
  fontWeight = 'bold',
}) => {
  return (
    <div className={className}>
      <span
        style={{
          fontSize,
          fontWeight,
          color: '#6366f1',
          display: 'inline-block',
        }}
      >
        Saad Naanaiy
      </span>
    </div>
  );
};

export default LetterGlitch;
