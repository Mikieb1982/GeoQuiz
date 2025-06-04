// components/QuizView.js (or a similar path)
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import AnswerOption from './AnswerOption'; // Assuming AnswerOption.js is in the same folder or correct path

// Helper function to shuffle answers (optional, but good for quizzes)
const shuffleArray = (array) => {
    if (!array) return [];
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
};

const QuizView = ({
    questionSet = [], // Expect an array of question objects
    quizTitle = "Quiz",  // Optional title for the quiz
    onQuizComplete      // Callback: (finalScore, totalQuestions, correctAnswersCount) => void
}) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentScore, setCurrentScore] = useState(0);
    const [correctAnswersThisQuiz, setCorrectAnswersThisQuiz] = useState(0);

    const questionData = questionSet[currentQuestionIndex];

    const [selectedAnswerId, setSelectedAnswerId] = useState(null);
    const [answersChecked, setAnswersChecked] = useState(false);
    const [shuffledAnswers, setShuffledAnswers] = useState([]);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [isCorrect, setIsCorrect] = useState(null);

    useEffect(() => {
        // Reset state when questionSet changes (i.e., new quiz starts)
        setCurrentQuestionIndex(0);
        setCurrentScore(0);
        setCorrectAnswersThisQuiz(0);
        setSelectedAnswerId(null);
        setAnswersChecked(false);
        setFeedbackMessage('');
        setIsCorrect(null);
    }, [questionSet]); // Dependency on questionSet to reset for a new quiz

    useEffect(() => {
        // This effect runs when questionData (derived from currentQuestionIndex or questionSet) changes
        if (questionData && questionData.answers) {
            setShuffledAnswers(shuffleArray([...questionData.answers]));
        }
        // Reset for the new question, but not score or overall quiz progress
        setSelectedAnswerId(null);
        setAnswersChecked(false);
        setFeedbackMessage('');
        setIsCorrect(null);
    }, [questionData]); // Dependency on the current question's data

    const handleSelectAnswer = (answerId) => {
        if (!answersChecked) {
            setSelectedAnswerId(answerId);
            setFeedbackMessage('');
        }
    };

    const handleSubmitAnswer = () => {
        if (selectedAnswerId === null) {
            setFeedbackMessage('Please select an answer first!');
            setIsCorrect(null);
            return;
        }

        setAnswersChecked(true);
        const correct = selectedAnswerId === questionData.correctAnswerId;
        setIsCorrect(correct);

        if (correct) {
            const pointsEarned = questionData.points || 0;
            setCurrentScore(prevScore => prevScore + pointsEarned);
            setCorrectAnswersThisQuiz(prevCount => prevCount + 1);
            setFeedbackMessage(`Correct! You earned ${pointsEarned} points.`);
        } else {
            setFeedbackMessage('Incorrect. Better luck next time!');
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questionSet.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        } else {
            if (onQuizComplete) {
                onQuizComplete(currentScore, questionSet.length, correctAnswersThisQuiz);
            }
        }
    };

    if (!questionSet || questionSet.length === 0) {
         return (
            <div className="w-full max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-2xl text-center">
                <p className="text-xl text-text-dark">No questions loaded for this quiz.</p>
            </div>
        );
    }

    if (!questionData) {
        // This case should ideally be handled by the onQuizComplete logic
        // or if questionSet is empty initially.
        return (
            <div className="w-full max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-2xl text-center">
                <p className="text-xl text-text-dark">Loading question or quiz finished!</p>
            </div>
        );
    }

    const progressPercentage = questionSet.length > 0 ? ((currentQuestionIndex + 1) / questionSet.length) * 100 : 0;

    return (
        <div className="w-full max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-2xl">
            <header className="mb-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-brand-blue mb-2 text-center">{quizTitle}</h1>
                <div className="flex justify-between text-sm text-text-muted mb-1">
                    <span>Question {currentQuestionIndex + 1} of {questionSet.length}</span>
                    <span className="font-semibold text-brand-green">Score: {currentScore}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div
                        className="bg-brand-green h-2.5 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>
            </header>

            <h2 className="text-xl sm:text-2xl font-semibold text-text-dark mb-6 mt-8"> {/* Added mt-8 for spacing */}
                {questionData.text}
            </h2>

            {questionData.imageUrl && (
                <div className="mb-6 rounded-lg overflow-hidden shadow">
                    <Image
                        src={questionData.imageUrl}
                        alt={questionData.imageAlt || 'Quiz image'}
                        width={800}
                        height={320}
                        className="w-full h-auto object-cover max-h-80"
                    />
                </div>
            )}

            <div className="space-y-3 sm:space-y-4 mb-8">
                {shuffledAnswers.map((answer) => (
                    <AnswerOption
                        key={answer.id}
                        answerText={answer.text}
                        onSelectAnswer={() => handleSelectAnswer(answer.id)}
                        isSelected={selectedAnswerId === answer.id}
                        isCorrect={answer.id === questionData.correctAnswerId}
                        isChecked={answersChecked}
                    />
                ))}
            </div>

            {feedbackMessage && (
                <div
                    className={`p-4 mb-6 rounded-md text-sm font-medium shadow
                        ${isCorrect === true ? 'bg-green-100 border-l-4 border-brand-green text-green-700' : ''}
                        ${isCorrect === false ? 'bg-orange-100 border-l-4 border-brand-orange text-orange-700' : ''}
                        ${isCorrect === null && feedbackMessage === 'Please select an answer first!' ? 'bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700' : ''}
                    `}
                    role="alert"
                >
                    {feedbackMessage}
                </div>
            )}

            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
                {!answersChecked ? (
                    <button
                        onClick={handleSubmitAnswer}
                        disabled={selectedAnswerId === null}
                        className="w-full custom-btn-primary disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none"
                    >
                        Submit Answer
                    </button>
                ) : (
                    <button
                        onClick={handleNextQuestion}
                        className="w-full custom-btn-green-outline"
                    >
                        {currentQuestionIndex < questionSet.length - 1 ? 'Next Question' : 'Show Results'}
                    </button>
                )}
            </div>
        </div>
    );
};

// Ensure AnswerOption component is defined as previously discussed
// const AnswerOption = ({ answerText, onSelectAnswer, isSelected, isCorrect, isChecked }) => { ... };

// Ensure custom button classes are defined in your global CSS / Tailwind config
// .custom-btn-primary { ... }
// .custom-btn-green-outline { ... }

export default QuizView;
