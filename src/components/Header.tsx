'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  onOpenBadges: () => void;
  badgeCount: number;
}

const Header: React.FC<HeaderProps> = ({ onOpenBadges, badgeCount }) => {
  const { t } = useTranslation();
  
  return (
    <header className="bg-belzig-green-500 text-white shadow-md dark:bg-belzig-green-700">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-heading font-bold">{t('appName')}</h1>

        <div className="flex items-center space-x-3">
          <ThemeToggle />
          <button
            aria-label={t('viewBadges')}
            className="flex items-center space-x-2 bg-belzig-green-600 hover:bg-belzig-green-700 px-3 py-1.5 rounded-full transition-colors"
            onClick={onOpenBadges}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="sr-only">{t('viewBadges')}</span>
            <span>{badgeCount}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
