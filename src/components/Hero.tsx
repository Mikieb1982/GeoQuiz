'use client';

import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';

/**
 * Hero component showcasing Bad Belzig with a call to action.
 */
export default function Hero() {
  const { t } = useTranslation();
  return (
    <div className="relative h-64 sm:h-80 md:h-96 mb-8">
      <Image
        src="/bad-belzig-hero.png"
        alt="Bad Belzig"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-belzig-green-700/60 to-belzig-green-900/80 flex flex-col items-center justify-center text-center text-white px-4">
        <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-2 drop-shadow-md">
          Explore Bad Belzig
        </h2>
        <p className="text-lg sm:text-xl max-w-xl drop-shadow-md">
          {t('heroIntro', {
            appName: t('appName'),
          })}
        </p>
        <Button className="mt-4" size="lg">
          {t('getStarted')}
        </Button>
      </div>
    </div>
  );
}
