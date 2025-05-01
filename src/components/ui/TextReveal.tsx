"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

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
  once = true,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-100px 0px -100px 0px" });

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

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
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
