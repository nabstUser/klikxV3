"use client";

import type React from "react";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useMotionValueEvent } from "framer-motion";

interface TextRevealProps {
  text: string | string[];
  className?: string;
  delay?: number;
  staggerChildren?: number;
  loadingComplete?: boolean;
}

const TextReveal: React.FC<TextRevealProps> = ({
  text,
  className = "",
  delay = 0,
  staggerChildren = 0.1,
  loadingComplete = true, // Par défaut, considérer le chargement comme terminé
}) => {
  const ref = useRef(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [hasAnimatedOnce, setHasAnimatedOnce] = useState(false);
  const [shouldResetAnimation, setShouldResetAnimation] = useState(false);

  // Observer quand l'élément est visible
  const isInView = useInView(ref, { once: false, margin: "-100px 0px -100px 0px" });

  // Suivre le défilement de la page
  const { scrollY } = useScroll();

  // Préparer les lignes de texte
  const lines = Array.isArray(text) ? text : text.split("\n");

  // Variantes d'animation pour le conteneur
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren,
        delayChildren: delay,
      },
    },
  };

  // Variantes d'animation pour chaque ligne
  const lineVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1], // easeOutCubic pour un effet plus naturel
      },
    },
  };

  // Réinitialiser l'animation lorsque l'utilisateur revient en haut de la page
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest < 50) {
      // Près du haut de la page, réinitialiser les animations pour qu'elles puissent se rejouer
      if (hasAnimatedOnce) {
        setShouldResetAnimation(true);
        setShouldAnimate(false);
      }
    }
  });

  // Gérer le déclenchement de l'animation
  useEffect(() => {
    // Au chargement initial
    if (loadingComplete && !hasAnimatedOnce && !shouldAnimate) {
      // Ajouter un délai pour l'animation initiale
      const timer = setTimeout(() => {
        setShouldAnimate(true);
        setHasAnimatedOnce(true);
      }, 300);

      return () => clearTimeout(timer);
    }

    // Lors du défilement (après le chargement initial)
    if (isInView && hasAnimatedOnce && shouldResetAnimation) {
      setShouldAnimate(true);
      setShouldResetAnimation(false);
    }

    // Si élément entre dans la vue pour la première fois après chargement
    if (isInView && !shouldAnimate && hasAnimatedOnce) {
      setShouldAnimate(true);
    }
  }, [loadingComplete, isInView, hasAnimatedOnce, shouldResetAnimation, shouldAnimate]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={shouldAnimate ? "visible" : "hidden"}
      variants={containerVariants}
      className={className}
    >
      {lines.map((line, index) => (
        <div key={index} className="overflow-hidden">
          <motion.div
            variants={lineVariants}
            className="h-full"
          >
            {line}
          </motion.div>
        </div>
      ))}
    </motion.div>
  );
};

export default TextReveal;
