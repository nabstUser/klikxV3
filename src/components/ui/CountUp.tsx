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
  duration = 2000,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
  delay = 0
}) => {
  const [count, setCount] = useState(0);
  const [shouldReset, setShouldReset] = useState(false);
  const [hasTriggeredOnce, setHasTriggeredOnce] = useState(false);
  const [wasAtTop, setWasAtTop] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  // Effet pour gérer la position de défilement
  useEffect(() => {
    const handleScroll = () => {
      // Si l'utilisateur est proche du haut de la page
      if (window.scrollY < 100) {
        setWasAtTop(true);
      } else if (wasAtTop && window.scrollY > 300) {
        // L'utilisateur était au top et a commencé à défiler vers le bas
        setShouldReset(true);
        setWasAtTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [wasAtTop]);

  // Effet pour démarrer l'animation quand l'élément est visible
  useEffect(() => {
    if (!isInView) return;

    if (!hasTriggeredOnce) {
      setHasTriggeredOnce(true);
    } else if (shouldReset) {
      // Réinitialiser le compteur pour recommencer l'animation
      setCount(0);
      setShouldReset(false);
    }

    let startTime: number | null = null;
    let animationFrame: number;

    // Début de l'animation après le délai spécifié
    const timer = setTimeout(() => {
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);

        // Fonction d'easing améliorée pour une décélération plus douce
        // Combinaison de cubic et exponential pour une fin plus graduelle
        const easeOutCubicExp = progress === 1
          ? 1
          : 1 - Math.pow(1 - progress, 5) + (Math.sin(progress * Math.PI) * (1 - progress) * 0.2);

        // Calcul de la valeur actuelle en fonction de la progression
        const currentValue = Math.floor(easeOutCubicExp * end);
        setCount(currentValue);

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        } else {
          // Assurons-nous d'arriver exactement à la valeur finale
          setCount(end);
        }
      };

      animationFrame = requestAnimationFrame(animate);

      return () => {
        cancelAnimationFrame(animationFrame);
      };
    }, delay);

    return () => clearTimeout(timer);
  }, [isInView, end, duration, delay, hasTriggeredOnce, shouldReset]);

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
