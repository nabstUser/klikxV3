"use client";

import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

interface CountUpProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  delay?: number;
}

const CountUp: React.FC<CountUpProps> = ({
  end,
  duration = 1200, // Réduit davantage pour une animation plus rapide
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
  delay = 0
}) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Effet pour démarrer l'animation quand l'élément est visible
  useEffect(() => {
    if (!isInView || hasAnimated) return;

    setHasAnimated(true);

    // Approche plus simple et plus directe pour l'animation
    const startValue = 0;
    const steps = 30; // Nombre d'étapes pour l'animation
    const stepDuration = duration / steps;
    let currentStep = 0;

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        currentStep += 1;

        if (currentStep <= steps) {
          // Calcul linéaire avec légère accélération pour éviter de dépasser
          const progress = currentStep / steps;
          // Fonction d'easing simple qui s'assure de ne jamais dépasser 1
          const easing = Math.min(progress * 1.2, 1);
          // Calculer la valeur actuelle arrondie à l'entier inférieur
          const newValue = Math.floor(startValue + (end - startValue) * easing);
          // S'assurer que la valeur ne dépasse jamais la valeur finale
          const safeValue = Math.min(newValue, end);

          setCount(safeValue);
        } else {
          // Étape finale - s'assurer d'être exactement à la valeur cible
          setCount(end);
          clearInterval(interval);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [isInView, end, duration, delay, hasAnimated]);

  // Formatage du nombre avec des décimales et séparateurs
  const formattedNumber = () => {
    const options = {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    };

    return count.toLocaleString('fr-FR', options);
  };

  return (
    <span ref={ref} className={className}>
      {prefix}{formattedNumber()}{suffix}
    </span>
  );
};

export default CountUp;
