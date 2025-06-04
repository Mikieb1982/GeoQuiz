// src/components/AnswerOption.tsx
import React from 'react';

interface AnswerOptionProps {
  answerText: string;
  onSelectAnswer: () => void;
  isSelected: boolean;
  isCorrect: boolean;
  isChecked: boolean; // True if the quiz has been submitted and answers are revealed
}

const AnswerOption: React.FC<AnswerOptionProps> = ({
  answerText,
  onSelectAnswer,
  isSelected,
  isCorrect,
  isChecked,
}) => {
  // Base classes for all states
  let buttonClasses = `
    w-full text-left p-3 sm:p-4 rounded-lg border-2 transition-all duration-150 ease-in-out
    font-medium text-text-dark text-sm sm:text-base
    focus:outline-none focus:ring-2 focus:ring-opacity-50
  `;

  if (isChecked) {
    // Styles after the answer has been submitted/checked
    if (isCorrect) {
      buttonClasses += ' bg-green-100 border-brand-green text-green-700 ring-brand-green font-semibold shadow-md';
      // Optionally add an icon for correct answer
      // answerText = `✓ ${answerText}`;
    } else if (isSelected && !isCorrect) {
      buttonClasses += ' bg-orange-100 border-brand-orange text-orange-700 ring-brand-orange line-through opacity-90 shadow-md';
      // Optionally add an icon for incorrect answer
      // answerText = `✗ ${answerText}`;
    } else {
      // Not selected and not correct (other incorrect options)
      buttonClasses += ' bg-gray-100 border-gray-300 text-gray-500 opacity-70 cursor-not-allowed';
    }
  } else {
    // Styles before the answer has been submitted/checked
    if (isSelected) {
      buttonClasses += ' bg-brand-blue border-brand-blue text-white ring-brand-blue shadow-md';
    } else {
      buttonClasses += ' bg-white border-border-light hover:border-brand-blue hover:bg-blue-50 focus:border-brand-blue ring-brand-blue';
    }
  }

  return (
    <button
      onClick={onSelectAnswer}
      className={buttonClasses.trim().replace(/\s+/g, ' ')} // Clean up whitespace
      aria-pressed={isSelected}
      // Disable button if answers are checked and this option wasn't selected (unless it's the correct one, for review)
      disabled={isChecked && !isCorrect && !isSelected}
    >
      {answerText}
    </button>
  );
};

export default AnswerOption;
