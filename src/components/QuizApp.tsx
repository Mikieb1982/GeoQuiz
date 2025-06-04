"use client";

// components/QuizApp.js (or a similar path)
import React, { useState } from 'react';
import QuizSelectionView from './QuizSelectionView';
import QuizView from './QuizView'; // Assuming QuizView now takes a questionSet prop
import QuizResultsView from './QuizResultsView';

interface Answer {
    id: string;
    text: string;
}

interface Question {
    id: string;
    text: string;
    answers: Answer[];
    correctAnswerId: string;
    points: number;
    imageUrl?: string;
    imageAlt?: string;
}

interface Quiz {
    id: string;
    title: string;
    description: string;
    icon: string;
    questionSet: Question[];
}

// Mock data for available quizzes (expanded with actual question sets)
// In a real app, this would come from an API, a database, or TypeScript files.
const MOCK_QUIZZES_DATA: Record<string, Quiz> = {
    quiz1: {
        id: 'quiz1',
        title: 'Brandenburg Landmarks',
        description: 'Test your knowledge of famous landmarks in the Brandenburg region.',
        icon: '🗺️',
        questionSet: [
            {
                id: 'q1a',
                text: 'What is the famous palace in Potsdam, a UNESCO World Heritage Site?',
                answers: [ { id: 'a1', text: 'Charlottenburg Palace' }, { id: 'a2', text: 'Sanssouci Palace' }, { id: 'a3', text: 'Rheinsberg Palace' }, { id: 'a4', text: 'Bellevue Palace' }],
                correctAnswerId: 'a2', points: 10,
                imageUrl: 'https://placehold.co/600x300/0ca644/FFFFFF?text=Sanssouci+Palace', imageAlt: 'Sanssouci Palace'
            },
            {
                id: 'q1b',
                text: 'Which town is known for its Spreewald gherkins?',
                answers: [ { id: 'b1', text: 'Lübbenau' }, { id: 'b2', text: 'Cottbus' }, { id: 'b3', text: 'Brandenburg an der Havel' }, { id: 'b4', text: 'Frankfurt (Oder)' }],
                correctAnswerId: 'b1', points: 15
            },
        ]
    },
    quiz2: {
        id: 'quiz2',
        title: 'Bad Belzig History',
        description: 'How well do you know the history of Bad Belzig?',
        icon: '🏰',
        questionSet: [
            {
                id: 'q2a', text: 'What is the name of the medieval castle in Bad Belzig?',
                answers: [ { id: 'c1', text: 'Eisenhardt Castle' }, { id: 'c2', text: 'Wartburg Castle' }, { id: 'c3', text: 'Hohenzollern Castle' }],
                correctAnswerId: 'c1', points: 10,
                imageUrl: 'https://placehold.co/600x300/007BFF/FFFFFF?text=Eisenhardt+Castle', imageAlt: 'Eisenhardt Castle'
            },
            {
                id: 'q2b', text: 'Bad Belzig is located in which German state?',
                answers: [ { id: 'd1', text: 'Saxony' }, { id: 'd2', text: 'Brandenburg' }, { id: 'd3', text: 'Bavaria' }],
                correctAnswerId: 'd2', points: 5
            }
        ]
    },
    // Add more quizzes here if needed
};


const QuizApp: React.FC = () => {
    const [currentView, setCurrentView] = useState<'selection' | 'quiz' | 'results'>('selection');
    const [selectedQuizData, setSelectedQuizData] = useState<Quiz | null>(null);
    const [quizResults, setQuizResults] = useState<{
        finalScore: number;
        totalQuestions: number;
        correctAnswersCount: number;
    }>({
        finalScore: 0,
        totalQuestions: 0,
        correctAnswersCount: 0
    });

    const handleSelectQuiz = (quizId: string) => {
        const quiz = MOCK_QUIZZES_DATA[quizId];
        if (quiz) {
            setSelectedQuizData(quiz);
            setCurrentView('quiz');
        } else {
            console.error("Quiz not found:", quizId);
            // Optionally, handle error like showing a message to the user
        }
    };

    const handleQuizComplete = (finalScore: number, totalQuestions: number, correctAnswersCount: number) => {
        setQuizResults({ finalScore, totalQuestions, correctAnswersCount });
        setCurrentView('results');
    };

    const handlePlayAgain = () => {
        setCurrentView('selection');
        setSelectedQuizData(null); // Clear selected quiz
        setQuizResults({ finalScore: 0, totalQuestions: 0, correctAnswersCount: 0 }); // Reset results
    };

    // This would typically navigate to a home page or the quiz selection screen
    const handleGoHome = () => {
        setCurrentView('selection');
        setSelectedQuizData(null);
    };


    // Render logic based on currentView
    if (currentView === 'selection') {
        // Pass only the necessary info for selection (titles, descriptions, icons)
        const quizzesForSelection: Array<Pick<Quiz, 'id' | 'title' | 'description' | 'icon'>> = Object.values(MOCK_QUIZZES_DATA).map(q => ({
            id: q.id,
            title: q.title,
            description: q.description,
            icon: q.icon
        }));
        return <QuizSelectionView quizzes={quizzesForSelection} onSelectQuiz={handleSelectQuiz} />;
    }

    if (currentView === 'quiz' && selectedQuizData) {
        // Pass the full questionSet of the selected quiz to QuizView
        return (
            <QuizView
                key={selectedQuizData.id} // Add key to force re-mount if quiz changes
                questionSet={selectedQuizData.questionSet}
                quizTitle={selectedQuizData.title} // Pass title for display
                onQuizComplete={handleQuizComplete}
            />
        );
    }

    if (currentView === 'results') {
        return (
            <QuizResultsView
                finalScore={quizResults.finalScore}
                totalQuestions={quizResults.totalQuestions}
                correctAnswersCount={quizResults.correctAnswersCount}
                onPlayAgain={handlePlayAgain}
                onGoHome={handleGoHome} // Or a more specific "Back to Quizzes"
            />
        );
    }

    // Fallback or loading state
    return <div>Loading GeoQuiz App...</div>;
};

export default QuizApp;

// How to use it within AppLayout (e.g., in pages/index.js or a main app page):
/*
import AppLayout from '../components/AppLayout'; // Adjust path
import QuizApp from '../components/QuizApp';     // Adjust path

export default function HomePage() {
  return (
    <AppLayout>
      <QuizApp />
    </AppLayout>
  );
}
*/

// Note: You'll need to adjust QuizSelectionView to accept a 'quizzes' prop
// and QuizView to accept 'questionSet' and 'quizTitle' props, and call
// onQuizComplete with all three arguments (score, totalQuestions, correctAnswers).
