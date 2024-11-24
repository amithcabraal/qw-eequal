import React from 'react';
import { X } from 'lucide-react';

interface BalanceResultProps {
  isBalanced: boolean;
  leftTotal: number;
  rightTotal: number;
  onClose: () => void;
  onGiveUp: () => void;
  onShare: () => void;
}

export const BalanceResult: React.FC<BalanceResultProps> = ({
  isBalanced,
  leftTotal,
  rightTotal,
  onClose,
  onGiveUp,
  onShare,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-dark-card p-8 rounded-xl shadow-2xl max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-indigo-900 dark:text-indigo-400">
            {isBalanced ? 'Perfect Balance!' : 'Not Balanced Yet'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>Left side total: {leftTotal}</p>
          <p>Right side total: {rightTotal}</p>
          
          {isBalanced ? (
            <p className="text-green-600 dark:text-green-400 font-semibold">
              Congratulations! The sides are perfectly balanced!
            </p>
          ) : (
            <p className="text-red-600 dark:text-red-400">
              The difference is {Math.abs(leftTotal - rightTotal)}. Keep trying!
            </p>
          )}
        </div>

        <div className="mt-8 flex justify-end gap-4">
          {!isBalanced && (
            <button
              onClick={onGiveUp}
              className="px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
            >
              Give Up
            </button>
          )}
          {isBalanced && (
            <button
              onClick={onShare}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Share Score
            </button>
          )}
        </div>
      </div>
    </div>
  );
};