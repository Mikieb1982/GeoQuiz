import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export interface ConfettiProps {
  trigger: boolean;
}

/**
 * Confetti animation that plays when `trigger` becomes true.
 */
export default function Confetti({ trigger }: ConfettiProps) {
  useEffect(() => {
    if (trigger) {
      // Simple burst animation
      confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [trigger]);

  return null;
}
