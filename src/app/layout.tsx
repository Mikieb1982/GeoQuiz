// src/app/layout.js
// If using TypeScript, change the extension to .tsx and import 'Metadata' type if needed.
// import type { Metadata } from 'next';

import AppLayout from '../components/AppLayout'; // Adjust path as per your project structure
import './globals.css';
import { ThemeProvider } from 'next-themes';

import { Inter, Montserrat } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' });

// Metadata for the page (replaces <Head> from 'next/head' in Pages Router)
// You can export this directly from your layout.tsx or page.tsx files.
export const metadata = {
  title: 'Bad Belzig Abenteuer Geo Quiz - Explore & Learn!',
  description: 'A fun and interactive location-based quiz game to discover Bad Belzig and earn digital badges.',
  // You can add more metadata here like icons, openGraph, etc.
  // icons: {
  //   icon: '/favicon.ico', // Example
  // },
};

/**
 * RootLayout component serves as the main layout for all routes in the application.
 * It includes the <html> and <body> tags.
 * @param {object} props - The properties passed to the component.
 * @param {React.ReactNode} props.children - The child components (pages or nested layouts).
 * @returns {JSX.Element} The root HTML structure wrapping the application.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      {/* The <body> tag should not be manually added here if using AppLayout to provide it,
          or ensure AppLayout doesn't also try to render a body tag.
          Typically, AppLayout would provide the header/main/footer within the body.
          Let's assume AppLayout is structured to be the content *within* the body.
      */}
      <body className="font-sans bg-gradient-to-b from-belzig-gray-50 to-white">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AppLayout>
            {children}
          </AppLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}

