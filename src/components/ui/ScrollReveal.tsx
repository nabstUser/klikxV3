"use client";

import type React from "react";
import { useRef, type ReactNode } from "react"
import { motion, useInView } from "framer-motion";

interface ScrollRevealProps {
  children: ReactNode;
  width?: "fit-content" | "100%";
  height?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
  duration?: number;
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
  margin = "-100px 0px -100px 0px"
}) => {
  const ref = useRef(null);

  // Utiliser useInView avec once=true pour que l'animation ne se déclenche qu'une fois
  const isInView = useInView(ref, { once: true, margin });

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

  return (
    <motion.div
      ref={ref}
      initial={getInitialPosition()}
      animate={isInView ? getAnimatePosition() : getInitialPosition()}
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
