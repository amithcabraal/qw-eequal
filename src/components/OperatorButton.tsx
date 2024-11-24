import React from 'react';

interface OperatorButtonProps {
  operator: string;
  onClick: () => void;
  isSelected?: boolean;
  className?: string;
}

export const OperatorButton: React.FC<OperatorButtonProps> = ({
  operator,
  onClick,
  isSelected = false,
  className = ''
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-12 h-12 rounded-lg flex items-center justify-center
        text-2xl font-bold
        transform transition-all
        hover:scale-105
        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
        dark:focus:ring-offset-dark-bg
        ${isSelected 
          ? 'bg-indigo-600 dark:bg-indigo-700 text-white' 
          : 'bg-gray-100 dark:bg-dark-hover text-indigo-600 dark:text-indigo-400'}
        hover:bg-indigo-500 dark:hover:bg-indigo-600 hover:text-white
        ${className}
      `}
    >
      {operator}
    </button>
  );
};