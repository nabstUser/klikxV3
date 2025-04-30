"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface FoundationArrowProps {
  className?: string;
  darkMode?: boolean;
  size?: 'small' | 'medium' | 'large';
}

/**
 * Un composant de flèche avec animation inspirée du site thefoundation.house
 * La flèche disparaît par le coin supérieur droit et réapparaît par le coin inférieur gauche au survol
 */
export const FoundationArrow = ({
  className,
  darkMode = false,
  size = 'small',
}: FoundationArrowProps) => {
  const arrowSrc = darkMode
    ? "/arrow-foundation.svg"
    : "/arrow-foundation-white.svg";

  const dimension = size === 'small' ? 8 : size === 'medium' ? 12 : 16;

  return (
    <div className={cn("arrow-button-wrapper", `size-${size}`, className)}>
      <div className="arrow-animation-container">
        <img
          src={arrowSrc}
          alt="→"
          className="arrow-main"
          width={dimension}
          height={dimension}
        />
        <img
          src={arrowSrc}
          alt="→"
          className="arrow-secondary"
          width={dimension}
          height={dimension}
        />
      </div>
    </div>
  );
};
