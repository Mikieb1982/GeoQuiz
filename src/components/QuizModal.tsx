'use client';

import React from 'react';
import { Language, Quiz } from '../types';
import { pois } from '../data/pois';
import QuizComponent from './QuizComponent';

interface QuizModalProps {
  quiz: Quiz | null;
  language: Language;
  isOpen: boolean;
  onClose: () => void;
  onComplete: (poiId: string, score: number, perfect: boolean) => void;
}

const QuizModal: React.FC<QuizModalProps> = ({
  quiz,
  language,
  isOpen,
  onClose,
  onComplete
}) => {

  // If the modal isn't open or there's no quiz data, render nothing
  if (!isOpen || !quiz) {
    return null;
  }

  const handleQuizFinish = (score: number, perfect: boolean) => {
    onComplete(quiz.poiId, score, perfect);
    onClose();
  };

  return (
    // 1. Full screen overlay: fixed position, covers everything, high z-index
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 transition-opacity duration-300">
       {/* Use Tailwind's z-50 or higher. Leaflet map panes are typically below 500. */}

      {/* 2. Modal Content Box: positioned relative, background, padding, rounded, shadow */}
      <div className="bg-white rounded-xl shadow-card p-6 md:p-8 w-full max-w-lg relative transform transition-all duration-300 scale-100">
        {/* Added max-w-lg for better width control */}

        {/* 3. Close Button: positioned absolute top-right corner */}
        <button
          onClick={onClose} // Call the onClose function passed from Layout
          className="absolute top-3 right-3 text-belzig-gray-400 hover:text-belzig-gray-600 transition-colors"
          aria-label={language === 'en' ? 'Close quiz' : 'Quiz schließen'}
        >
          {/* Simple X icon SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="quiz-content">
          <h3 className="font-heading text-xl md:text-2xl font-bold text-belzig-gray-900 mb-4">
            {pois.find(p => p.id === quiz.poiId)?.names[language] ?? ''}
          </h3>
          <QuizComponent
            quiz={quiz}
            language={language}
            onComplete={handleQuizFinish}
            onClose={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default QuizModal;
