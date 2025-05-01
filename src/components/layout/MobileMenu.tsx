"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { smoothScrollTo } from "@/utils/smoothScroll";

interface MenuItem {
  href: string;
  label: string;
  id: string;
}

interface MobileMenuProps {
  menuItems: MenuItem[];
}

const MobileMenu = ({ menuItems }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Gérer la fermeture du menu avec la touche Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  // Empêcher le défilement du body quand le menu est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Fonction pour gérer le clic sur les éléments du menu
  const handleMenuItemClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();

    // Fermer d'abord le menu
    setIsOpen(false);

    // Puis effectuer le défilement après un court délai
    // Cela permet au menu de se fermer visuellement avant le défilement
    setTimeout(() => {
      smoothScrollTo(e, id);
    }, 300);
  };

  // Fonction pour basculer l'état du menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="md:hidden absolute right-4 top-8 pointer-events-auto">
      {/* Bouton d'ouverture du menu */}
      <button
        className="text-white p-2 rounded-xl bg-black/30 backdrop-blur-md"
        onClick={toggleMenu}
        aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Menu overlay */}
      {isOpen && (
        <>
          {/* Overlay de fond */}
          <div
            className="fixed inset-0 bg-black/80 z-50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)} // Fermer le menu en cliquant sur l'overlay
          />

          {/* Contenu du menu */}
          <div className="fixed inset-y-0 right-0 w-3/4 max-w-sm bg-background p-6 shadow-lg z-50 transform transition-transform duration-300 ease-in-out">
            <button
              className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 focus:outline-none"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Fermer</span>
            </button>

            <nav className="flex flex-col gap-4 mt-8">
              {menuItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className="text-2xl font-medium"
                  onClick={(e) => handleMenuItemClick(e, item.id)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </>
      )}
    </div>
  );
};

export default MobileMenu;
