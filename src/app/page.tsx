// src/app/page.js
// If using TypeScript, change the extension to .tsx.

import QuizApp from '../components/QuizApp'; // Adjust path as per your project structure

/**
 * HomePage component is the main entry point page for the application.
 * It renders the primary QuizApp controller.
 * @returns {JSX.Element} The QuizApp component.
 */
export default function HomePage() {
  // This page will display the QuizApp component,
  // which handles the quiz selection, active quiz, and results views.
  // The AppLayout (with header/footer) is already applied by src/app/layout.js.
  return (
    <main> {/* It's good practice for page components to return a <main> or semantic element */}
      <QuizApp />
    </main>
  );
}
