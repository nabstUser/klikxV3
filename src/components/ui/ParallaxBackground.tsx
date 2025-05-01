"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxBackgroundProps {
  src: string;
  alt?: string;
  className?: string;
  strength?: number; // Contrôle l'intensité de l'effet (1-10)
  direction?: "up" | "down"; // Direction du déplacement
}

export default function ParallaxBackground({
  src,
  alt = "Background Image",
  className = "",
  strength = 5,
  direction = "up",
}: ParallaxBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [elementTop, setElementTop] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);

  const { scrollY } = useScroll();

  // Normaliser la force entre 1 et 10
  const normalizedStrength = Math.max(1, Math.min(10, strength)) / 10;

  // Augmenter le facteur de déplacement pour un effet plus dramatique (300px au lieu de 200px)
  const moveDistance = direction === "up" ? 300 * normalizedStrength : -300 * normalizedStrength;

  // Transformer le défilement vertical en mouvement de parallax avec plus d'amplitude
  const y = useTransform(
    scrollY,
    [elementTop - clientHeight * 1.5, elementTop + clientHeight * 1.5], // Élargir la plage d'effet
    [0, moveDistance]
  );

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const updatePosition = () => {
      const { top } = element.getBoundingClientRect();
      setElementTop(top + window.scrollY);
      setClientHeight(window.innerHeight);
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, { passive: true });

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
    };
  }, []);

  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden ${className}`}>
      <motion.div
        className="w-full h-full"
        style={{
          y,
          backgroundImage: `url(${src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          // Scale plus grande pour éviter les bords vides lors du mouvement
          scale: 1.15,
        }}
        aria-label={alt}
        role="img"
      />
    </div>
  );
}
