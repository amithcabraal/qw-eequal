import React from 'react';
import { Menu as MenuIcon, HelpCircle, Share2, RefreshCw, Shield, Mail } from 'lucide-react';

interface MenuProps {
  onShowHowToPlay: () => void;
  onNewGame: () => void;
  onShare: () => void;
}

export const Menu: React.FC<MenuProps> = ({ onShowHowToPlay, onNewGame, onShare }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const menuItems = [
    { icon: HelpCircle, label: 'How to Play', onClick: onShowHowToPlay },
    { icon: Share2, label: 'Share Game', onClick: onShare },
    { icon: RefreshCw, label: 'New Game', onClick: onNewGame },
    { icon: Shield, label: 'Privacy', onClick: () => window.open('/privacy', '_blank') },
    { icon: Mail, label: 'Contact Us', onClick: () => window.open('/contact', '_blank') },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-indigo-100 transition-colors"
      >
        <MenuIcon className="w-6 h-6 text-indigo-600" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white shadow-lg z-50">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  item.onClick();
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-indigo-50 first:rounded-t-lg last:rounded-b-lg"
              >
                <item.icon size={18} />
                {item.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};