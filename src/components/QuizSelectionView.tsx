// components/QuizSelectionView.js (or a similar path)
import React from 'react';
import { useTranslation } from 'react-i18next';

export interface QuizInfo {
    id: string;
    title: string;
    description: string;
    icon: string;
}

export interface QuizSelectionViewProps {
    quizzes?: QuizInfo[];
    onSelectQuiz: (quizId: string) => void;
}

// Props for this component:
// - quizzes: An array of quiz objects, each with id, title, description, icon.
// - onSelectQuiz: A function that takes the quizId and initiates the selected quiz.

const QuizSelectionView: React.FC<QuizSelectionViewProps> = ({ quizzes = [], onSelectQuiz }) => {
    const { t } = useTranslation();
    if (!quizzes || quizzes.length === 0) {
        return (
            <div className="w-full max-w-3xl mx-auto p-6 sm:p-10 text-center">
                <h1 className="text-3xl sm:text-4xl font-bold text-brand-green mb-3">
                    {t('welcomeTitle')}
                </h1>
                <p className="text-lg text-text-muted mb-6">
                    No quizzes available at the moment. Please check back later.
                </p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-3xl mx-auto p-6 sm:p-10">
            <header className="mb-10 text-center">
                <h1 className="text-4xl sm:text-5xl font-bold text-brand-green mb-3">
                    {t('welcomeTitle')}
                </h1>
                <p className="text-lg text-text-muted">
                    {t('welcomeSubtitle')}
                </p>
            </header>

            <div className="space-y-6">
                {quizzes.map((quiz) => (
                    <button
                        key={quiz.id}
                        onClick={() => onSelectQuiz(quiz.id)}
                        className="w-full flex items-center bg-white p-6 rounded-xl shadow-lg hover:shadow-xl focus:shadow-xl transition-shadow duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-opacity-60"
                        aria-label={`Start quiz: ${quiz.title}`}
                    >
                        <div className="text-4xl mr-5 hidden sm:block">{quiz.icon || '❓'}</div> {/* Default icon */}
                        <div className="text-left flex-grow"> {/* Added flex-grow here */}
                            <h2 className="text-xl sm:text-2xl font-semibold text-brand-blue mb-1">
                                {quiz.title}
                            </h2>
                            <p className="text-sm sm:text-base text-text-dark">
                                {quiz.description}
                            </p>
                        </div>
                        <div className="ml-auto pl-4 text-2xl text-brand-green hidden sm:block self-center"> {/* Added self-center */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        </div>
                    </button>
                ))}
            </div>

            <footer className="mt-12 pt-8 border-t border-border-light text-center">
                <p className="text-sm text-text-muted">
                    Select a quiz to begin. Good luck!
                </p>
            </footer>
        </div>
    );
};

export default QuizSelectionView;
