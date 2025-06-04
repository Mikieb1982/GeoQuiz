// components/QuizResultsView.js (or a similar path)
import React from 'react';

// Props for this component:
// - finalScore: The total score achieved by the user.
// - totalQuestions: The total number of questions in the quiz.
// - correctAnswersCount: The number of questions the user answered correctly.
// - onPlayAgain: A function to call when the "Play Again" button is clicked.
// - onGoHome: A function to call when the "Return to Home" button is clicked (optional).

const QuizResultsView = ({
    finalScore = 0,
    totalQuestions = 0,
    correctAnswersCount = 0,
    onPlayAgain,
    onGoHome
}) => {

    const percentageScore = totalQuestions > 0 ? Math.round((correctAnswersCount / totalQuestions) * 100) : 0;

    let performanceMessage = "";
    if (totalQuestions > 0) {
        if (percentageScore >= 80) {
            performanceMessage = "Excellent work! You really know your stuff!";
        } else if (percentageScore >= 60) {
            performanceMessage = "Good job! A solid performance.";
        } else if (percentageScore >= 40) {
            performanceMessage = "Not bad! Keep practicing to improve.";
        } else {
            performanceMessage = "Keep learning and try again! You&#39;ll get there.";
        }
    }


    return (
        <div className="w-full max-w-xl mx-auto bg-white p-6 sm:p-10 rounded-xl shadow-2xl text-center">
            <header className="mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-brand-green mb-3">
                    Quiz Complete!
                </h1>
                <p className="text-lg text-text-muted">Here are your results:</p>
            </header>

            <section className="mb-10">
                <div className="mb-6">
                    <p className="text-xl text-text-dark mb-1">Your Final Score:</p>
                    <p className="text-6xl font-bold text-brand-blue">{finalScore}</p>
                </div>

                <div className="text-md sm:text-lg text-text-dark space-y-2">
                    <p>
                        You answered <span className="font-semibold text-brand-green">{correctAnswersCount}</span> out of
                        <span className="font-semibold text-brand-green"> {totalQuestions}</span> questions correctly.
                    </p>
                    <p>
                        That&#39;s <span className="font-semibold text-brand-blue">{percentageScore}%</span>!
                    </p>
                    {performanceMessage && (
                        <p className="mt-4 pt-4 border-t border-border-light text-text-muted italic">
                            {performanceMessage}
                        </p>
                    )}
                </div>
            </section>

            {/* Action Buttons */}
            <footer className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
                {onPlayAgain && (
                    <button
                        onClick={onPlayAgain}
                        className="w-full custom-btn-primary" // Defined in your global styles
                    >
                        Play Again
                    </button>
                )}
                {onGoHome && (
                     <button
                        onClick={onGoHome}
                        className="w-full custom-btn-green-outline" // Defined in your global styles
                    >
                        Back to Quizzes
                    </button>
                )}
            </footer>
        </div>
    );
};

// Ensure custom button classes are defined in your global CSS / Tailwind config
// .custom-btn-primary { ... }
// .custom-btn-green-outline { ... }

export default QuizResultsView;
