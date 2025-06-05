'use client';

import React from 'react';
import { Language } from '../types';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';

interface FooterProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

const Footer: React.FC<FooterProps> = ({ currentLanguage, onLanguageChange }) => {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-belzig-green-500 text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">&copy; {new Date().getFullYear()} {t('appName')}</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <LanguageSwitcher 
              currentLanguage={currentLanguage} 
              onLanguageChange={onLanguageChange} 
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
