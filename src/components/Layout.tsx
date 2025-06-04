'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic'; // Make sure dynamic is imported
import { useTranslation } from 'react-i18next';
import { Language } from '../types';
import Header from './Header'; // Your Header component
import Footer from './Footer'; // Your Footer component
import QuizModal from './QuizModal';
import BadgeModal from './BadgeModal';
import BadgeCollection from './BadgeCollection';
import { useQuizManager } from './QuizManager';
import { useBadgeManager } from './BadgeManager';
import { useProximityDetection } from './ProximityDetector';
import { quizzes } from '../data/quizzes';
import '../i18n/i18n';

// Your dynamic Map import should look something like this:
const Map = dynamic(
  () => import('./Map'),
  {
    ssr: false,
    loading: () => <div className="h-[70vh] w-full flex items-center justify-center bg-belzig-gray-100"><p>Loading map...</p></div>
  }
);

const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  // --- Your existing state and hooks ---
  const [language, setLanguage] = useState<Language>('en');
  const { t, i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  const {
    activePoi,
    showQuiz,
    activateQuiz,
    closeQuiz,
    handleQuizComplete,
    completedQuizzes
  } = useQuizManager();

  const {
    earnedBadges,
    awardBadge,
    newBadge,
    showBadgeModal,
    closeBadgeModal,
    showBadgeCollection,
    openBadgeCollection,
    closeBadgeCollection
  } = useBadgeManager();

  const { poisInRange } = useProximityDetection();
  // --- End of your existing state and hooks ---

  // --- Your existing functions ---
  const onQuizComplete = (poiId: string, score: number, perfect: boolean) => {
    handleQuizComplete(poiId, score, perfect);
    if (perfect) {
      awardBadge(poiId);
    }
  };

  const activeQuiz = activePoi
    ? quizzes.find(quiz => quiz.poiId === activePoi.id) || null
    : null;
  // --- End of your existing functions ---

  return (
    // Apply base font, background, and font smoothing
    <div className="flex flex-col min-h-screen bg-belzig-gray-50 font-sans antialiased">
      {/* Pass props to Header */}
      <Header onOpenBadges={openBadgeCollection} badgeCount={earnedBadges.length} />

      <main className="flex-grow">
        {/* Container with padding */}
        <div className="container mx-auto px-4 py-6 md:py-8">

          {/* Map Container with styling */}
          <div className="mb-6 md:mb-8 rounded-xl overflow-hidden shadow-card">
             <Map
               language={language}
               onPoiClick={(poi) => {
                 const isInRange = poisInRange.some(p => p.id === poi.id);
                 if (isInRange) {
                   activateQuiz(poi);
                 }
               }}
             />
          </div>

          {/* Content Card styling */}
          <div className="bg-white rounded-xl shadow-card p-6 md:p-8">
            {/* Heading styling */}
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-belzig-gray-900 mb-4">
              {t('appName')}
            </h2>
            {/* Paragraph styling */}
            <p className="text-belzig-gray-700 leading-relaxed mb-6">
              {language === 'en'
                ? 'Explore Bad Belzig and discover its fascinating locations! Visit points of interest, answer quiz questions, and collect badges.'
                : 'Erkunde Bad Belzig und entdecke seine faszinierenden Orte! Besuche Sehenswürdigkeiten, beantworte Quizfragen und sammle Abzeichen.'}
            </p>

            {/* Stats Section styling */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {/* Stat Box styling */}
              <div className="bg-belzig-green-50 p-4 rounded-lg border border-belzig-green-200">
                <h3 className="font-semibold text-belzig-green-800 mb-1">
                  {language === 'en' ? 'Completed Quizzes' : 'Abgeschlossene Quizze'}
                </h3>
                <p className="text-2xl font-bold text-belzig-green-700">
                  {completedQuizzes.length} / {quizzes.length} {/* Use dynamic total */}
                </p>
              </div>
              {/* Stat Box styling */}
              <div className="bg-belzig-green-50 p-4 rounded-lg border border-belzig-green-200">
                <h3 className="font-semibold text-belzig-green-800 mb-1">
                  {language === 'en' ? 'Earned Badges' : 'Verdiente Abzeichen'}
                </h3>
                <p className="text-2xl font-bold text-belzig-green-700">
                  {earnedBadges.length} / {quizzes.length} {/* Use dynamic total */}
                </p>
              </div>
            </div>

            {/* Badge Preview styling */}
            {earnedBadges.length > 0 && (
              <div className="mt-6 md:mt-8"> {/* Added top margin */}
                <h3 className="font-semibold text-belzig-gray-800 mb-3"> {/* Adjusted color/margin */}
                  {language === 'en' ? 'Recent Badges' : 'Neueste Abzeichen'}
                </h3>
                 {/* Add padding/container for scrolling if needed */}
                <div className="flex space-x-3 overflow-x-auto pb-2"> {/* Adjusted spacing */}
                  {earnedBadges.slice(-3).map(badgeId => (
                    <Image
                      key={badgeId}
                      src={`/badges/${badgeId.replace('badge-', '')}.svg`}
                      alt={`${badgeId} badge`}
                      width={64}
                      height={64}
                      className="w-16 h-16 flex-shrink-0"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Render children passed to Layout (if any) */}
            {children}
          </div>
        </div>
      </main>

      {/* Pass props to Footer */}
      <Footer
        currentLanguage={language}
        onLanguageChange={setLanguage}
      />

      {/* --- Your existing Modals --- */}
      {/* Ensure Modals also use consistent styling from your theme */}
      <QuizModal
        quiz={activeQuiz}
        language={language}
        isOpen={showQuiz}
        onClose={closeQuiz}
        onComplete={onQuizComplete}
      />

      <BadgeModal
        badge={newBadge}
        language={language}
        isOpen={showBadgeModal}
        onClose={closeBadgeModal}
      />

      {/* Ensure BadgeCollection overlay/modal has styling */}
      {showBadgeCollection && (
         // Example overlay styling
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 transition-opacity duration-300">
          <BadgeCollection // Pass props
            language={language}
            earnedBadges={earnedBadges}
            onClose={closeBadgeCollection}
          />
        </div>
      )}
       {/* --- End of your existing Modals --- */}
    </div>
  );
};

export default Layout;
