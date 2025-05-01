"use client";

import type React from "react";
import { useRef, useEffect, useState, type ReactNode } from "react"
import { motion, useInView, useScroll, useMotionValueEvent } from "framer-motion";

interface ScrollRevealProps {
  children: ReactNode;
  width?: "fit-content" | "100%";
  height?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
  duration?: number;
  once?: boolean;
  margin?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  width = "100%",
  height,
  delay = 0,
  direction = "up",
  className = "",
  duration = 0.5,
  once = false, // Changé à false par défaut pour permettre la réinitialisation
  margin = "-100px 0px -100px 0px"
}) => {
  const ref = useRef(null);
  const [shouldResetAnimation, setShouldResetAnimation] = useState(false);
  const [hasTriggeredOnce, setHasTriggeredOnce] = useState(false);
  const [wasAtTop, setWasAtTop] = useState(true);

  // Utiliser useInView avec once=false pour permettre de rejouer l'animation
  const isInView = useInView(ref, { once: false, margin });

  // Suivre le défilement de la page
  const { scrollY } = useScroll();

  // Surveiller la position de défilement et détecter quand l'utilisateur remonte en haut
  useMotionValueEvent(scrollY, "change", (latest) => {
    // Si l'utilisateur est proche du haut de la page
    if (latest < 100) {
      setWasAtTop(true);
    } else if (wasAtTop && latest > 300) {
      // L'utilisateur était au top et a commencé à défiler vers le bas
      // On réinitialise l'animation pour qu'elle puisse se rejouer
      setShouldResetAnimation(true);
      setWasAtTop(false);
    }
  });

  // Déterminer la position initiale en fonction de la direction
  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: 50, opacity: 0 };
      case "down":
        return { y: -50, opacity: 0 };
      case "left":
        return { x: 50, opacity: 0 };
      case "right":
        return { x: -50, opacity: 0 };
      default:
        return { y: 50, opacity: 0 };
    }
  };

  // Animation quand l'élément est en vue
  const getAnimatePosition = () => {
    switch (direction) {
      case "up":
      case "down":
        return { y: 0, opacity: 1 };
      case "left":
      case "right":
        return { x: 0, opacity: 1 };
      default:
        return { y: 0, opacity: 1 };
    }
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
  const currentAnimation = isInView && !shouldResetAnimation
    ? getAnimatePosition()
    : getInitialPosition();

  return (
    <motion.div
      ref={ref}
      initial={getInitialPosition()}
      animate={currentAnimation}
      transition={{
        duration,
        delay,
        ease: [0.215, 0.61, 0.355, 1] // easeOutCubic
      }}
      className={className}
      style={{ width, height: height || "100%" }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
