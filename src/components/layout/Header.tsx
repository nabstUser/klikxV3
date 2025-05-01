"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { smoothScrollTo } from "@/utils/smoothScroll";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const navRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const menuItems = [
    { href: "/#accueil", label: "Accueil", id: "accueil" },
    { href: "/#a-propos", label: "À Propos", id: "a-propos" },
    { href: "/#services", label: "Services", id: "services" },
    { href: "/#processus", label: "Processus", id: "processus" },
    { href: "/#contact", label: "Contact", id: "contact" },
  ];

  // Fonction pour suivre la position de la souris dans la navigation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (navRef.current) {
      const rect = navRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <header className="fixed w-full top-0 z-50 pointer-events-none">
      {/* Navigation centrale sur desktop */}
      <div className="hidden md:flex justify-center pt-6 relative z-10">
        <nav
          ref={navRef}
          className="relative bg-black/30 backdrop-blur-md px-6 py-1.5 rounded-2xl max-w-[650px] w-full overflow-hidden pointer-events-auto"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Effet de lumière qui suit la souris - plus diffus */}
          <div
            className="absolute pointer-events-none transition-opacity duration-300"
            style={{
              left: `${mousePosition.x}px`,
              top: `${mousePosition.y}px`,
              width: "260px",
              height: "260px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0.025) 60%, rgba(255,255,255,0) 80%)",
              transform: "translate(-50%, -50%)",
              opacity: isHovering ? 0.8 : 0,
              mixBlendMode: "screen",
              transition: "opacity 0.4s ease-out",
              filter: "blur(8px)",
            }}
          />

          <ul className="flex items-center justify-between relative z-10">
            {menuItems.map((item) => (
              <li key={item.id} className="relative py-1.5">
                <a
                  href={item.href}
                  className="text-white text-[22px] font-medium relative"
                  onClick={(e) => smoothScrollTo(e, item.id)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Menu mobile personnalisé */}
      <MobileMenu menuItems={menuItems} />
    </header>
  );
};

export default Header;
