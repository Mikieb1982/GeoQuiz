'use client';

import React from 'react';
import { Quiz } from '../types'; // Assuming Quiz type is defined
import { Language } from '../types';

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

  const handleQuizFinish = () => {
    // Calculate score, determine if perfect
    const score = 85; // Example score
    const perfect = false; // Example perfect status
    onComplete(quiz.poiId, score, perfect); // Call the onComplete prop from Layout
    onClose(); // Close the modal after completion
  };
  // --- ---

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

        {/* 4. Quiz Content Area */}
        <div className="quiz-content">
           {/* Quiz Title */}
          <h3 className="font-heading text-xl md:text-2xl font-bold text-belzig-gray-900 mb-4">
            {quiz.title[language]} {/* Assuming title exists on quiz object */}
          </h3>

          {/* TODO: Add your actual quiz questions, answers, buttons here */}
          <p className="text-belzig-gray-700 mb-4">
            Question {quiz.questions[0].text[language]} {/* Example access */}
          </p>
          {/* Example Answer Buttons */}
          <div className="space-y-3">
             {quiz.questions[0].options[language].map((option, index) => (
                <button key={index} className="block w-full text-left p-3 bg-belzig-gray-50 hover:bg-belzig-gray-100 rounded-lg border border-belzig-gray-200 transition-colors">
                   {option}
                </button>
             ))}
          </div>

          {/* Example button to simulate finishing */}
          <button
            onClick={handleQuizFinish}
            className="mt-6 w-full bg-belzig-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-belzig-green-700 transition-colors shadow-button"
          >
            {language === 'en' ? 'Submit' : 'Absenden'}
          </button>

        </div>
      </div>
    </div>
  );
};

export default QuizModal;
