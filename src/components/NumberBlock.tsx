import React from 'react';

interface NumberBlockProps {
  number: number;
  onClick: () => void;
  isSelected?: boolean;
  className?: string;
}

export const NumberBlock: React.FC<NumberBlockProps> = ({ 
  number, 
  onClick,
  isSelected = false,
  className = ''
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        ${isSelected ? 'bg-indigo-700 dark:bg-indigo-800' : 'bg-indigo-600 dark:bg-indigo-700'}
        w-12 h-12 rounded-lg flex items-center justify-center
        text-white font-bold text-xl
        transform transition-all
        hover:scale-105 hover:bg-indigo-700 dark:hover:bg-indigo-800
        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
        dark:focus:ring-offset-dark-bg
        ${className}
      `}
    >
      {number}
    </button>
  );
};