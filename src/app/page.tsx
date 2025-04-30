"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import PricingTabs from "@/components/PricingTabs";
import { useState } from "react";
import { FoundationArrow } from "@/components/ui/FoundationArrow";

export default function Home() {
  const [activePlan, setActivePlan] = useState('premium');

  // Fonction pour gérer les changements de plan
  const handlePlanChange = (plan) => {
    setActivePlan(plan);
  };

  // Retourne l'URL de l'image d'arrière-plan en fonction du plan actif
  const getBackgroundImageForPlan = () => {
    switch (activePlan) {
      case 'basic':
        return "/servicesBasic.png";
      case 'premium':
        return "/servicesPremium.png";
      case 'deluxe':
        return "/servicesDeluxe.png";
      default:
        return "/servicesPremium.png";
    }
  };
  return (
    <>
      <Header />

      {/* Hero Section */}
      <section
        id="accueil"
        className="relative w-full min-h-screen overflow-hidden text-lg"
        style={{
          backgroundImage: "url(/heroSection.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#475569",
        }}
      >
        {/* Navigation et logo en haut - masqués sur les écrans medium et plus grands */}
        <div className="absolute w-full top-0 left-0 right-0 pt-6 px-8 z-40 md:hidden">
          <div className="flex justify-between items-center">
            <div>
              <a href="/" className="inline-flex items-center gap-3">
                <img src="/logoKlikx.svg" alt="Klikx" className="h-10" />
                <span className="text-white text-2xl font-bold">Klikx</span>
              </a>
            </div>
            <div className="md:hidden">
              {/* Pas de contenu ici car le bouton hamburger est dans le Header */}
            </div>
          </div>
        </div>

        {/* Logo à gauche et boutons à droite sur desktop - alignés avec la barre de nav */}
        <div className="hidden md:flex justify-between items-center absolute w-full top-0 left-0 right-0 pt-6 px-8 z-40">
          <div>
            <a href="/" className="inline-flex items-center gap-3">
              <img src="/logoKlikx.svg" alt="Klikx" className="h-10" />
              <span className="text-white text-2xl font-bold">Klikx</span>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="bg-white text-gray-800 px-6 py-2.5 rounded-full font-medium text-base flex items-center group"
            >
              <span>Contact</span>
              <div className="ml-3">
                <FoundationArrow darkMode={true} size="small" />
              </div>
            </a>
            <a
              href="#services"
              className="bg-gray-800 text-white px-6 py-2.5 rounded-full font-medium text-base flex items-center group"
            >
              <span>Devis</span>
              <div className="ml-3">
                <FoundationArrow darkMode={false} size="small" />
              </div>
            </a>
          </div>
        </div>

        <div className="container relative z-10 mx-auto px-8 pt-40 pb-24 h-full grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-6 flex flex-col justify-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter text-white mb-8 leading-[1.1]">
              VOS VISUELS,<br />
              VOTRE<br />
              MEILLEUR<br />
              ARGUMENT
            </h1>
          </div>

          <div className="col-span-12 lg:col-span-6 flex justify-center items-center">
            <div className="relative w-full max-w-[400px]">
              <div className="relative">
                {/* Effet de flou de fond (comme la nav) */}
                <div
                  className="absolute -z-10 backdrop-blur-md bg-black/15"
                  style={{
                    top: '0%',
                    left: '1%',
                    right: '1%',
                    bottom: '0%',
                    borderRadius: '56px'
                  }}
                ></div>
                {/* iPhone principal au premier plan */}
                <img
                  src="/iphoneKlikx.svg"
                  alt="iPhone Klikx"
                  className="w-full h-auto relative z-10"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 z-20">
          <a href="#services" className="bg-[#7790ED] py-5 px-8 inline-flex items-center group">
            <span className="text-white font-medium text-xl">Votre devis gratuit</span>
            <div className="ml-3">
              <FoundationArrow darkMode={false} size="medium" />
            </div>
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="a-propos" className="py-24 bg-white text-lg">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-12 gap-8 items-center">
            <div className="col-span-12 lg:col-span-7">
              <div className="pr-0 lg:pr-12">
                <div className="mb-16">
                  <div className="text-3xl md:text-4xl lg:text-5xl font-normal text-gray-900 leading-relaxed">
                    Que vous soyez propriétaire Airbnb ou gestionnaire de conciergerie, <span className="font-bold">Klikx</span> vous offre des <span className="font-bold">visuels 3D réalistes et percutants</span>, conçus pour <span className="font-bold">valoriser vos espaces, attirer plus de voyageurs et maximiser vos réservations</span> — avec simplicité et efficacité.
                  </div>
                </div>
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Des visuels sur-mesure, des opportunités sans limite.
                  </h3>
                </div>
                <div className="mb-16">
                  <p className="text-lg text-gray-600">
                    Chez Klikx, nous combinons expertise en modélisation 3D et sens du design pour transformer vos
                    annonces en véritables aimants à réservations.
                  </p>
                </div>
                <div className="mb-16">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-8">
                    <div className="flex flex-col">
                      <div className="border-t border-gray-300 w-full mb-1"></div>
                      <div className="flex items-start">
                        <div className="w-10 flex-shrink-0">
                          <span className="text-gray-400 text-sm font-light inline-block">01 —</span>
                        </div>
                        <span className="font-bold text-gray-900">Visuels 3D réalistes, livrés rapidement</span>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="border-t border-gray-300 w-full mb-1"></div>
                      <div className="flex items-start">
                        <div className="w-10 flex-shrink-0">
                          <span className="text-gray-400 text-sm font-light inline-block">03 —</span>
                        </div>
                        <span className="font-bold text-gray-900">Solutions pour propriétaires et conciergeries</span>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="border-t border-gray-300 w-full mb-1"></div>
                      <div className="flex items-start">
                        <div className="w-10 flex-shrink-0">
                          <span className="text-gray-400 text-sm font-light inline-block">02 —</span>
                        </div>
                        <span className="font-bold text-gray-900">Rendus adaptés à chaque type de bien</span>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="border-t border-gray-300 w-full mb-1"></div>
                      <div className="flex items-start">
                        <div className="w-10 flex-shrink-0">
                          <span className="text-gray-400 text-sm font-light inline-block">04 —</span>
                        </div>
                        <span className="font-bold text-gray-900">Pensé pour booster vos performances</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <a
                    href="#services"
                    className="bg-gray-200 text-gray-800 inline-flex items-center py-3 px-6 cursor-pointer rounded-md group"
                  >
                    <span className="font-medium">Devis</span>
                    <div className="ml-2">
                      <FoundationArrow darkMode={true} size="small" />
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-5">
              <div className="w-full relative">
                <img
                  src="/aboutSection.png"
                  alt="Modèle 3D isométrique d'une maison"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white text-lg">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:grid-rows-[repeat(7,1fr)] md:h-[700px]">
            <div className="md:row-span-3 md:col-start-1 md:row-start-1">
              <div className="bg-[#7790ED] rounded-md h-full flex flex-col justify-between p-8">
                <p className="text-[5.5rem] leading-none font-bold text-white">+35%</p>
                <div>
                  <div className="w-full h-[1px] bg-white opacity-30 mb-2"></div>
                  <p className="text-sm text-white opacity-90">Augmentation des réservations</p>
                </div>
              </div>
            </div>
            <div className="md:row-span-3 md:col-start-1 md:row-start-4">
              <div className="bg-[#212121] rounded-md h-full flex flex-col justify-between p-8">
                <p className="text-[5.5rem] leading-none font-bold text-white">60+</p>
                <div>
                  <div className="w-full h-[1px] bg-white opacity-30 mb-2"></div>
                  <p className="text-sm text-white opacity-90">Propriétés valorisées</p>
                </div>
              </div>
            </div>
            <div className="md:row-span-3 md:col-start-2 md:row-start-2">
              <div className="bg-[#292621] rounded-md h-full flex flex-col justify-between p-8">
                <p className="text-[7rem] leading-none font-bold text-white">98%</p>
                <div>
                  <div className="w-full h-[1px] bg-white opacity-30 mb-2"></div>
                  <p className="text-sm text-white opacity-90">Taux de satisfaction client</p>
                </div>
              </div>
            </div>
            <div className="md:row-span-3 md:col-start-2 md:row-start-5">
              <div className="bg-[#ADADAD] rounded-md h-full flex flex-col justify-between p-8">
                <p className="text-[5.5rem] leading-none font-bold text-white">45+</p>
                <div>
                  <div className="w-full h-[1px] bg-white opacity-30 mb-2"></div>
                  <p className="text-sm text-white opacity-90">Modèles 3D réalisés</p>
                </div>
              </div>
            </div>
            <div className="md:row-span-3 md:col-start-3 md:row-start-3">
              <div className="bg-[#F5EDE2] rounded-md h-full flex flex-col justify-between p-8">
                <p className="text-[7rem] leading-none font-bold text-[#212121]">72H</p>
                <div className="mt-auto">
                  <div className="w-full h-[1px] bg-[#212121] opacity-20 mb-2"></div>
                  <p className="text-sm text-[#212121] opacity-70">Délai moyen de livraison</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="h-screen flex flex-col text-white text-lg relative"
        style={{
          backgroundImage: `url(${getBackgroundImageForPlan()})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#291F1D",
          transition: "background-image 0.5s ease-in-out",
        }}
      >
        <div className="container mx-auto px-4 flex-1 flex flex-col relative z-10">
          <div className="grid grid-cols-12 gap-x-16 h-full">
            <div className="col-span-12 lg:col-span-5 flex flex-col h-full">
              <div className="pt-16">
                <h2 className="text-8xl font-bold leading-none">NOS<br />SERVICES</h2>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-7 flex flex-col h-full">
              <div className="mt-auto pb-16 w-full">
                <p className="text-lg mb-8 w-full">
                  Le forfait dépend de la taille de votre appartement et du niveau de détail souhaité. Après réception de vos plans ou photos, nous vous guidons vers l'option la plus adaptée.
                </p>
                <PricingTabs onPlanChange={handlePlanChange} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="processus" className="py-20 bg-white text-lg">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-6">
              <h2 className="text-7xl sm:text-8xl font-bold mb-12 text-[#1c1c1c]">PROCESSUS</h2>
              <div className="hidden lg:block h-96"></div>
              <div className="space-y-8 mt-auto">
                <div>
                  <div className="flex mb-8">
                    <div className="w-36 flex-shrink-0">
                      <div className="text-gray-400 text-xl font-light">01</div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#1c1c1c] mb-2">Envoi des Plans & Définition des Besoins</h3>
                      <p className="text-gray-600">
                        Vous nous transmettez les plans, photos et vos attentes spécifiques. Nous analysons votre bien pour proposer la meilleure approche visuelle.
                      </p>
                    </div>
                  </div>
                  <div className="h-[0.5px] bg-gray-200"></div>
                </div>
                <div>
                  <div className="flex mb-8">
                    <div className="w-36 flex-shrink-0">
                      <div className="text-gray-400 text-xl font-light">02</div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#1c1c1c] mb-2">Proposition Personnalisée & Validation</h3>
                      <p className="text-gray-600">
                        Nous recommandons le forfait adapté à votre projet avec un devis clair, un calendrier. Validation rapide pour lancer la modélisation.
                      </p>
                    </div>
                  </div>
                  <div className="h-[0.5px] bg-gray-200"></div>
                </div>
                <div>
                  <div className="flex mb-8">
                    <div className="w-36 flex-shrink-0">
                      <div className="text-gray-400 text-xl font-light">03</div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#1c1c1c] mb-2">Création du Modèle 3D & Affinage</h3>
                      <p className="text-gray-600">
                        Nous réalisons la modélisation isométrique détaillée. Vous recevez un premier rendu pour demander des ajustements selon votre forfait.
                      </p>
                    </div>
                  </div>
                  <div className="h-[0.5px] bg-gray-200"></div>
                </div>
                <div>
                  <div className="flex mb-8">
                    <div className="w-36 flex-shrink-0">
                      <div className="text-gray-400 text-xl font-light">04</div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#1c1c1c] mb-2">Livraison Finale Prête à l'Emploi</h3>
                      <p className="text-gray-600">
                        Vous recevez votre visuel 3D haute résolution, optimisé pour vos annonces Airbnb ou vos supports de communication.
                      </p>
                    </div>
                  </div>
                  <div className="h-[0.5px] bg-gray-200"></div>
                </div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-6">
              <div className="relative h-full">
                <img
                  src="/processSection.jpg"
                  alt="Modèle 3D de maison"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <a href="#contact" className="bg-[#7790ED] p-10 text-white w-[400px] block cursor-pointer relative group">
                    <div className="flex flex-col">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-2xl font-medium leading-tight">Commandez</div>
                          <div className="text-4xl font-bold leading-tight text-[#292621]">Votre Modèle 3D</div>
                        </div>
                        <div className="mt-1 ml-4" style={{ color: '#292621' }}>
                          <div style={{ transform: 'scale(1.5)' }}>
                            <FoundationArrow darkMode={true} size="large" />
                          </div>
                        </div>
                      </div>
                      <div className="mt-20 space-y-1">
                        <div className="text-xl">Boostez vos annonces</div>
                        <div className="text-xl font-medium">Maintenant</div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="temoignages" className="py-20 bg-white text-lg">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-normal text-[#1c1c1c]">CE QUE DISENT</h2>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-[#1c1c1c] mb-6">NOS CLIENTS</h2>
            <p className="text-base sm:text-lg text-[#1c1c1c]">
              Découvrez les témoignages de propriétaires et gestionnaires qui ont valorisé<br className="hidden md:block" />
              leurs annonces avec nos modèles 3D isométriques
            </p>
          </div>
          <div className="mt-12">
            <div>
              <div className="flex flex-col md:flex-row py-6">
                <div className="md:w-1/4 mb-4 md:mb-0">
                  <p className="font-bold text-xl">Sarah J.</p>
                  <p className="text-gray-500 text-lg">Superhôte Airbnb</p>
                </div>
                <div className="md:w-3/4">
                  <p className="text-xl font-normal">
                    Les modèles 3D isométriques de Klikx ont complètement transformé nos
                    annonces Airbnb. Nous avons constaté une augmentation de 30% des
                    demandes de réservation depuis leur ajout à nos photos de propriété.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="flex flex-col md:flex-row py-6 border-t border-gray-200">
                <div className="md:w-1/4 mb-4 md:mb-0">
                  <p className="font-bold text-xl">Michael T.</p>
                  <p className="text-gray-500 text-lg">PDG, Urban Stay Properties</p>
                </div>
                <div className="md:w-3/4">
                  <p className="text-xl font-normal">
                    En tant qu'entreprise de gestion immobilière, nous avions besoin d'un
                    moyen de présenter plusieurs propriétés de manière cohérente. Klikx a
                    livré des modèles isométriques impressionnants que nos clients adorent et
                    qui ont considérablement amélioré nos résultats marketing.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="flex flex-col md:flex-row py-6 border-t border-gray-200">
                <div className="md:w-1/4 mb-4 md:mb-0">
                  <p className="font-bold text-xl">Rebecca L.</p>
                  <p className="text-gray-500 text-lg">Propriétaire de location saisonnière</p>
                </div>
                <div className="md:w-3/4">
                  <p className="text-xl font-normal">
                    Les modèles 3D isométriques de Klikx ont complètement transformé nos
                    annonces Airbnb. Nous avons constaté une augmentation de 30% des
                    demandes de réservation depuis leur ajout à nos photos de propriété.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="flex flex-col md:flex-row py-6 border-t border-gray-200">
                <div className="md:w-1/4 mb-4 md:mb-0">
                  <p className="font-bold text-xl">David K.</p>
                  <p className="text-gray-500 text-lg">Investisseur immobilier</p>
                </div>
                <div className="md:w-3/4">
                  <p className="text-xl font-normal">
                    Le service client de Klikx est aussi impressionnant que leurs modèles 3D.
                    Ils ont été réactifs, ont effectué toutes les révisions demandées
                    rapidement et ont livré avant la date prévue.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 flex justify-center">
            <a href="#contact" className="bg-[#7790ED] text-white px-8 py-4 inline-flex items-center text-lg group">
              <span className="font-medium">Rejoindre nos clients satisfaits</span>
              <div className="ml-2">
                <FoundationArrow darkMode={false} size="small" />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="min-h-screen relative overflow-hidden text-lg flex items-center"
        style={{
          backgroundImage: "url(/contactSection.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-4 z-10">
          <div className="grid grid-cols-12">
            {/* 5 colonnes vides pour l'image */}
            <div className="col-span-5"></div>

            {/* 7 colonnes pour le contenu */}
            <div className="col-span-12 md:col-span-7">
              <div className="w-full">
                <h1 className="text-6xl md:text-7xl font-bold text-white mb-16">
                  PARLONS DE<br />VOTRE PROJET
                </h1>

                <div className="flex flex-wrap gap-4 items-center mb-12">
                  <a
                    href="mailto:contact@klikx.agency"
                    className="inline-flex items-center bg-white/20 text-white px-4 py-2 rounded-full transition-colors group"
                  >
                    <span>contact@klikx.agency</span>
                    <div className="ml-2">
                      <FoundationArrow darkMode={false} size="small" />
                    </div>
                  </a>

                  <a
                    href="tel:+41795232242"
                    className="bg-white/20 text-white px-4 py-2 rounded-full transition-colors"
                  >
                    +41 79 523 22 42
                  </a>
                </div>

                <div className="w-full h-px bg-white/20 mb-6" />

                <h2 className="text-2xl font-medium text-white mb-6">
                  Contactez-nous maintenant
                </h2>

                <div className="w-full h-px bg-white/20 mb-8" />

                <div className="space-y-8">
                  <p className="text-white/80 mb-6">
                    Vos informations
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="Nom"
                        className="w-full bg-transparent border-b border-white/20 text-white placeholder-white/50 pb-2 focus:outline-none focus:border-white transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="Prénom"
                        className="w-full bg-transparent border-b border-white/20 text-white placeholder-white/50 pb-2 focus:outline-none focus:border-white transition-colors"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <input
                        type="email"
                        placeholder="Email"
                        className="w-full bg-transparent border-b border-white/20 text-white placeholder-white/50 pb-2 focus:outline-none focus:border-white transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end mt-12">
                    <button
                      className="bg-white text-black py-3 px-6 rounded-full font-medium flex items-center justify-center group transition-all"
                    >
                      <span>Commencer</span>
                      <div className="ml-2">
                        <FoundationArrow darkMode={true} size="small" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
