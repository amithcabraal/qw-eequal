import React from 'react';

interface BalanceBeamProps {
  leftWeight: number;
  rightWeight: number;
}

export const BalanceBeam: React.FC<BalanceBeamProps> = ({ leftWeight, rightWeight }) => {
  const getRotation = () => {
    if (leftWeight === rightWeight) return 'rotate-0';
    return leftWeight > rightWeight ? '-rotate-12' : 'rotate-12';
  };

  return (
    <div className="relative">
      <div className="flex justify-center items-center">
        <div 
          className="w-96 h-4 bg-gray-800 dark:bg-gray-700 rounded-full transition-transform duration-500 transform-gpu origin-center"
          style={{ transform: `${getRotation()}` }} 
        />
        <div className="absolute left-1/2 top-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 bg-gray-900 dark:bg-gray-600 rounded-full" />
      </div>
    </div>
  );
};