import React from 'react';
import { X } from 'lucide-react';

interface HowToPlayProps {
  onClose: () => void;
  onDontShowAgain: () => void;
}

export const HowToPlay: React.FC<HowToPlayProps> = ({ onClose, onDontShowAgain }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-indigo-900">How to Play</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        
        <div className="space-y-4 text-gray-700">
          <p>1. You have different numbers on each side of the balance beam.</p>
          <p>2. Create mathematical expressions by:</p>
          <ul className="list-disc ml-6">
            <li>Selecting a number</li>
            <li>Choosing an operator (+, -, *, /)</li>
            <li>Selecting another number</li>
            <li>Clicking the + button to add your expression</li>
          </ul>
          <p>3. Try to make both sides equal by creating expressions that balance out.</p>
          <p>4. You can remove expressions at any time by clicking the trash icon.</p>
          <p>5. When you're ready, click "Check Balance" to see if you've won!</p>
        </div>

        <div className="mt-8 flex justify-between">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              onChange={onDontShowAgain}
              className="form-checkbox h-5 w-5 text-indigo-600"
            />
            <span className="text-sm text-gray-600">Don't show this again</span>
          </label>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};