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
      <div className="flex gap-2 mb-2">
        <button
          className={`${activePlan === 'basic' ? 'bg-white text-gray-800' : 'bg-gray-400/80 text-white'} flex-1 py-3 rounded-md text-center font-medium transition-colors`}
          onClick={() => setActivePlan('basic')}
        >
          BASIC
        </button>
        <button
          className={`${activePlan === 'premium' ? 'bg-white text-gray-800' : 'bg-gray-400/80 text-white'} flex-1 py-3 rounded-md text-center font-medium transition-colors`}
          onClick={() => setActivePlan('premium')}
        >
          PREMIUM
        </button>
        <button
          className={`${activePlan === 'deluxe' ? 'bg-white text-gray-800' : 'bg-gray-400/80 text-white'} flex-1 py-3 rounded-md text-center font-medium transition-colors`}
          onClick={() => setActivePlan('deluxe')}
        >
          DELUXE
        </button>
      </div>

      {/* Pricing Details Box */}
      <div className="bg-white text-gray-800 p-8 rounded-md">
        {/* Utilisons exactement la même structure pour les deux parties */}
        <div className="grid grid-cols-2 mb-20">
          <div className="pr-6">
            <h3 className="text-6xl font-bold text-gray-900">{currentPlan.price}</h3>
          </div>
          <div className="pl-6">
            <p className="text-lg">{currentPlan.description}</p>
          </div>
        </div>

        {/* Détails en 2 colonnes avec espace au centre */}
        <div className="grid grid-cols-2">
          {/* Colonne gauche */}
          <div className="pr-6">
            <div>
              <h4 className="font-bold mb-1 text-gray-700">Révisions</h4>
              <p className="text-gray-800">{currentPlan.revisions}</p>
            </div>

            <div className="w-full h-px bg-gray-300 my-6" />

            <div>
              <h4 className="font-bold mb-1 text-gray-700">Livraison</h4>
              <p className="text-gray-800">{currentPlan.delivery}</p>
            </div>
          </div>

          {/* Colonne droite */}
          <div className="pl-6">
            <div>
              <h4 className="font-bold mb-1 text-gray-700">Lorem</h4>
              <p className="text-gray-600">{currentPlan.details}</p>
            </div>

            <div className="w-full h-px bg-gray-300 my-6" />

            <div>
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
