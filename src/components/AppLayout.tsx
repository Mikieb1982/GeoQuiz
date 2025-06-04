// components/AppLayout.js (or a similar path)
import React from 'react';
import Link from 'next/link';

// Props for this component:
// - children: The content to be rendered within the main layout area.
const AppLayout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col font-sans bg-bg-light text-text-dark antialiased">
            {/* Header */}
            <header className="bg-brand-green shadow-md sticky top-0 z-50">
                <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        {/* Logo/Title */}
                        <div className="flex items-center">
                            <Link href="/" className="text-2xl sm:text-3xl font-bold text-text-light hover:opacity-90 transition-opacity">
                                GeoQuiz <span className="text-xl">🌍</span>
                            </Link>
                        </div>

                        {/* Optional Navigation Links (Example) */}
                        {/* <nav className="hidden md:flex space-x-4">
                            <a href="/quizzes" className="text-text-light hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium">
                                All Quizzes
                            </a>
                            <a href="/profile" className="text-text-light hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium">
                                My Profile
                            </a>
                        </nav> */}
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-grow w-full">
                {/*
                  The children prop will render the specific view
                  (e.g., QuizSelectionView, QuizView, QuizResultsView)
                  passed to AppLayout.
                  We add some padding here for the content within the main area.
                */}
                <div className="py-8 sm:py-12">
                    {children}
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-gray-300 py-8 text-center">
                <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-sm">
                        &copy; {new Date().getFullYear()} GeoQuiz by Mikieb1982. All rights reserved.
                    </p>
                    <p className="text-xs mt-1">
                        Powered by React & Tailwind CSS.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default AppLayout;

// How to use it in your main App component (e.g., _app.js or App.js in Next.js):
/*
import AppLayout from './components/AppLayout'; // Adjust path as needed
import './styles/globals.css'; // Assuming your Tailwind styles are imported here

function MyApp({ Component, pageProps }) {
  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  );
}

export default MyApp;
*/
