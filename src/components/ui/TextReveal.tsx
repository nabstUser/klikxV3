"use client";

import type React from "react";
import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useMotionValueEvent } from "framer-motion";

interface TextRevealProps {
  text: string | string[];
  className?: string;
  delay?: number;
  staggerChildren?: number;
  once?: boolean;
}

const TextReveal: React.FC<TextRevealProps> = ({
  text,
  className = "",
  delay = 0,
  staggerChildren = 0.1,
  once = false, // Changé à false par défaut pour permettre la réinitialisation
}) => {
  const ref = useRef(null);
  const [shouldResetAnimation, setShouldResetAnimation] = useState(false);
  const [hasTriggeredOnce, setHasTriggeredOnce] = useState(false);
  const [wasAtTop, setWasAtTop] = useState(true);

  // Utiliser useInView avec once=false pour permettre de rejouer l'animation
  const isInView = useInView(ref, { once: false, margin: "-100px 0px -100px 0px" });

  // Suivre le défilement de la page
  const { scrollY } = useScroll();

  // Surveiller la position de défilement et détecter quand l'utilisateur remonte en haut
  // Optimisation: Utiliser requestAnimationFrame pour réduire l'impact des mises à jour d'état
  useMotionValueEvent(scrollY, "change", (latest) => {
    // Si l'utilisateur est proche du haut de la page
    requestAnimationFrame(() => {
      if (latest < 100) {
        setWasAtTop(true);
      } else if (wasAtTop && latest > 300) {
        // L'utilisateur était au top et a commencé à défiler vers le bas
        // On réinitialise l'animation pour qu'elle puisse se rejouer
        setShouldResetAnimation(true);
        setWasAtTop(false);
      }
    });
  });

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

  // Surveiller quand l'élément entre dans la vue
  useEffect(() => {
    if (isInView && !hasTriggeredOnce) {
      setHasTriggeredOnce(true);
    } else if (isInView && shouldResetAnimation) {
      // Réinitialiser le flag d'animation quand l'élément redevient visible
      setShouldResetAnimation(false);
    }
  }, [isInView, hasTriggeredOnce, shouldResetAnimation]);

  // Déterminer l'état d'animation actuel
  const animationState = (isInView && !shouldResetAnimation) ? "visible" : "hidden";

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={animationState}
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
