"use client";

import { useEffect } from "react";
import { handleSmoothScroll } from "@/utils/smoothScroll";

// Ajouter cette fonction pour améliorer le SEO
export function SeoMetaTags() {
  return (
    <>
      {/* Balises meta supplémentaires pour le SEO */}
      <meta name="author" content="Klikx" />
      <meta name="keywords" content="3D, modélisation, Airbnb, conciergerie, rendus 3D, visualisation, intérieur, photographie 3D, Lausanne, Suisse, immobilier" />
      <meta name="geo.region" content="CH-VD" />
      <meta name="geo.placename" content="Lausanne" />
      <meta name="geo.position" content="46.5196;6.6323" />
      <meta name="ICBM" content="46.5196, 6.6323" />

      {/* Balises pour l'accessibilité */}
      <meta name="theme-color" content="#7790ED" />
    </>
  );
}

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  // Remove any extension-added classes during hydration
  useEffect(() => {
    // This runs only on the client after hydration
    document.body.className = "antialiased";

    // Gérer le scroll initial si l'URL contient un hash
    if (window.location.hash) {
      // Attendre un court instant pour que le DOM soit complètement chargé
      setTimeout(() => {
        handleSmoothScroll(window.location.hash);
      }, 500);
    }
  }, []);

  return <div className="antialiased">{children}</div>;
}
