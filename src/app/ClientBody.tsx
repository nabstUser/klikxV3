"use client";

import { useEffect } from "react";
import { handleSmoothScroll } from "@/utils/smoothScroll";

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
