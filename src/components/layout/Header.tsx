"use client";

import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState, useRef } from "react";

const Header = () => {
  const navRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const menuItems = [
    { href: "/#accueil", label: "Accueil" },
    { href: "/#a-propos", label: "À Propos" },
    { href: "/#services", label: "Services" },
    { href: "/#processus", label: "Processus" },
    { href: "/#contact", label: "Contact" },
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
            {menuItems.map((item, index) => (
              <li key={index} className="relative py-1.5">
                <a
                  href={item.href}
                  className="text-white text-[22px] font-medium relative"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Menu mobile */}
      <div className="md:hidden absolute right-4 top-8 pointer-events-auto">
        <Sheet>
          <SheetTrigger asChild>
            <button className="text-white p-2 rounded-xl bg-black/30 backdrop-blur-md">
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col gap-4 mt-8">
              {menuItems.map((item, index) => (
                <a key={index} href={item.href} className="text-2xl font-medium">
                  {item.label}
                </a>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
