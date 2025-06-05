'use client';

import Image from 'next/image';

/**
 * Hero component showcasing Bad Belzig with a call to action.
 */
export default function Hero() {
  return (
    <div className="relative h-64 sm:h-80 md:h-96 mb-8">
      <Image
        src="/bad-belzig-hero.png"
        alt="Bad Belzig"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-belzig-green-900/50 flex flex-col items-center justify-center text-center text-white px-4">
        <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-2 drop-shadow-md">
          Explore Bad Belzig
        </h2>
        <p className="text-lg sm:text-xl max-w-xl drop-shadow-md">
          Start your adventure and discover local landmarks with our GeoQuiz.
        </p>
      </div>
    </div>
  );
}
