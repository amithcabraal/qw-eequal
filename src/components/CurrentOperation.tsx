import React from 'react';

interface CurrentOperationProps {
  number1: number | null;
  number2: number | null;
  operator: string | null;
  children?: React.ReactNode;
}

export const CurrentOperation: React.FC<CurrentOperationProps> = ({
  number1,
  number2,
  operator,
  children
}) => {
  return (
    <div className="h-14 flex items-center gap-2 text-2xl font-bold text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-dark-hover px-4 py-2 rounded-lg relative">
      <div className="flex-1 flex items-center gap-2">
        {number1 ? (
          <>
            <span>{number1}</span>
            {operator && <span className="text-indigo-500 dark:text-indigo-300">{operator}</span>}
            {number2 && <span>{number2}</span>}
          </>
        ) : (
          <span className="text-gray-400 dark:text-gray-600 text-base">Select numbers and operator</span>
        )}
      </div>
      {children}
    </div>
  );
};