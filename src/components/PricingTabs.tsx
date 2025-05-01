"use client";

import { useState, useEffect } from "react";
import { FoundationArrow } from "@/components/ui/FoundationArrow";

type PlanType = 'basic' | 'premium' | 'deluxe';

interface PricingTabsProps {
  onPlanChange?: (plan: PlanType) => void;
}

export default function PricingTabs({ onPlanChange }: PricingTabsProps) {
  const [activePlan, setActivePlan] = useState<PlanType>('premium');

  // Notifier le parent lorsque le plan change
  useEffect(() => {
    if (onPlanChange) {
      onPlanChange(activePlan);
    }
  }, [activePlan, onPlanChange]);

  const pricingData = {
    basic: {
      price: "CHF 299",
      description: "Rendu standard pour petits espaces",
      revisions: "1",
      details: "standard",
      delivery: "Sous 7 jours"
    },
    premium: {
      price: "CHF 399",
      description: "Rendu détaillé pour appartements T2/T3",
      revisions: "2",
      details: "ipsum",
      delivery: "Sous 5 jours"
    },
    deluxe: {
      price: "CHF 599",
      description: "Rendu haute définition pour grands espaces",
      revisions: "3",
      details: "premium",
      delivery: "Sous 3 jours"
    }
  };

  const currentPlan = pricingData[activePlan];

  return (
    <>
      {/* Pricing Options */}
      <div className="flex flex-wrap md:flex-nowrap gap-2 mb-2 w-full">
        <button
          className={`${activePlan === 'basic' ? 'bg-white text-gray-800' : 'bg-gray-400/80 text-white'} flex-1 py-3 px-2 rounded-md text-center font-medium transition-colors text-sm md:text-base`}
          onClick={() => setActivePlan('basic')}
        >
          BASIC
        </button>
        <button
          className={`${activePlan === 'premium' ? 'bg-white text-gray-800' : 'bg-gray-400/80 text-white'} flex-1 py-3 px-2 rounded-md text-center font-medium transition-colors text-sm md:text-base`}
          onClick={() => setActivePlan('premium')}
        >
          PREMIUM
        </button>
        <button
          className={`${activePlan === 'deluxe' ? 'bg-white text-gray-800' : 'bg-gray-400/80 text-white'} flex-1 py-3 px-2 rounded-md text-center font-medium transition-colors text-sm md:text-base`}
          onClick={() => setActivePlan('deluxe')}
        >
          DELUXE
        </button>
      </div>

      {/* Pricing Details Box */}
      <div className="bg-white text-gray-800 p-4 md:p-8 rounded-md">
        {/* Structure responsive pour les appareils mobiles et desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 md:mb-20">
          <div className="pr-0 md:pr-6">
            <h3 className="text-4xl md:text-6xl font-bold text-gray-900">{currentPlan.price}</h3>
          </div>
          <div className="pl-0 md:pl-6">
            <p className="text-lg">{currentPlan.description}</p>
          </div>
        </div>

        {/* Détails en 1 colonne sur mobile, 2 colonnes sur desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0">
          {/* Colonne gauche */}
          <div className="md:pr-6">
            <div>
              <h4 className="font-bold mb-1 text-gray-700">Révisions</h4>
              <p className="text-gray-800">{currentPlan.revisions}</p>
            </div>

            <div className="w-full h-px bg-gray-300 my-6" />

            <div>
              <h4 className="font-bold mb-1 text-gray-700">Livraison</h4>
              <p className="text-gray-800">{currentPlan.delivery}</p>
            </div>

            {/* Séparateur visible uniquement sur mobile après Livraison avec espace minimal en bas */}
            <div className="w-full h-px bg-gray-300 mt-6 mb-2 md:hidden" />
          </div>

          {/* Colonne droite */}
          <div className="md:pl-6">
            {/* Ajout de marge négative pour rapprocher encore plus du séparateur */}
            <div className="-mt-1 md:mt-0">
              <h4 className="font-bold mb-1 text-gray-700">Lorem</h4>
              <p className="text-gray-600">{currentPlan.details}</p>
            </div>

            {/* Séparateur visible uniquement sur desktop */}
            <div className="w-full h-px bg-gray-300 my-6 hidden md:block" />

            <div className="mt-8 md:mt-0">
              <a
                href="#contact"
                className="bg-[#7790ED] text-white py-3 px-6 flex items-center justify-center w-full rounded-md hover:bg-[#4a48e0] transition-colors group"
              >
                <span>Obtenez votre visuel</span>
                <div className="ml-2">
                  <FoundationArrow darkMode={false} size="small" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
