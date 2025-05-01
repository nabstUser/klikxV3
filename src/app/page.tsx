"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import PricingTabs from "@/components/PricingTabs";
import { useState, useEffect, useRef } from "react";
import { FoundationArrow } from "@/components/ui/FoundationArrow";
import { AnimatedIPhone } from "@/components/ui/AnimatedIPhone";
import ScrollReveal from "@/components/ui/ScrollReveal";
import TextReveal from "@/components/ui/TextReveal";
import CountUp from "@/components/ui/CountUp";
import ContactForm from "@/components/ContactForm";
import ParallaxBackground from "@/components/ui/ParallaxBackground";
import Image from "next/image";
import { handleSmoothScroll } from "@/utils/smoothScroll";
import { motion, AnimatePresence } from "framer-motion";

// Composant pour l'image About avec un effet de parallax simple
const AboutImage = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calcul du décalage (mouvement léger)
  const yOffset = scrollY * 0.03;

  return (
    <div className="relative h-[500px] flex items-center justify-center overflow-visible">
      <div
        className="w-full h-full relative"
        style={{
          transform: `translateY(${yOffset}px)`,
          transition: 'transform 0.1s linear',
          willChange: 'transform'
        }}
      >
        <Image
          src="/aboutSection.png"
          alt="Modèle 3D isométrique d'une maison"
          width={600}
          height={400}
          className="object-contain"
          style={{ width: '100%', height: 'auto', maxWidth: '450px', margin: '0 auto' }}
        />
      </div>
    </div>
  );
};

export default function Home() {
  const [activePlan, setActivePlan] = useState('premium');
  const [loading, setLoading] = useState(true);

  // Fonction pour initialiser les liens smooth scroll
  useEffect(() => {
    // Handler pour tous les liens internes
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');

      if (anchor?.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const href = anchor.getAttribute('href') || '';
        handleSmoothScroll(href);
      }
      // Pour les liens Next.js avec /#hash
      if (anchor?.getAttribute('href')?.startsWith('/#')) {
        e.preventDefault();
        const href = anchor.getAttribute('href')?.replace(/^\//, '') || '';
        handleSmoothScroll(href.startsWith('#') ? href : `#${href}`);
      }
    };

    // Ajout de l'écouteur d'événement
    document.addEventListener('click', handleLinkClick);

    // Préchargement des images
    const preloadImages = async () => {
      try {
        const imagesToPreload = [
          '/heroSection.jpg',
          '/aboutSection.png',
          '/servicesBasic.png',
          '/servicesPremium.png',
          '/servicesDeluxe.png',
          '/processSection.jpg',
          '/contactSection.jpg',
          '/logoKlikx.svg'
        ];

        const preloadPromises = imagesToPreload.map(src => {
          return new Promise<void>((resolve, reject) => {
            const img = new window.Image();
            img.src = src;
            img.onload = () => resolve();
            img.onerror = () => reject();
          });
        });

        await Promise.all(preloadPromises);
        setTimeout(() => {
          setLoading(false);
          document.body.style.overflow = '';
        }, 3000);
      } catch (error) {
        console.error('Erreur lors du préchargement des images:', error);
        setTimeout(() => {
          setLoading(false);
          document.body.style.overflow = '';
        }, 3000);
      }
    };

    // Empêcher le défilement pendant le chargement
    document.body.style.overflow = 'hidden';

    // Lancer le préchargement
    preloadImages();

    // Nettoyage
    return () => {
      document.removeEventListener('click', handleLinkClick);
    };
  }, []);

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
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-[#1c1c1c]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
          >
            <div className="w-full max-w-md px-4 relative">
              {/* Logo et texte Klikx */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="mb-16 flex flex-col items-center"
              >
                <img
                  src="/logoKlikx.svg"
                  alt="Klikx Logo"
                  className="h-16 w-auto mb-2"
                />
                <div className="text-white text-2xl font-bold">Klikx</div>
              </motion.div>

              {/* Loading text */}
              <motion.div
                className="mb-4 text-white text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <p className="text-lg font-medium tracking-wider">
                  CHARGEMENT
                </p>
              </motion.div>

              {/* Progress bar container */}
              <div className="w-full h-[2px] bg-white/20">
                <motion.div
                  className="h-full bg-[#7790ED]"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3, ease: "easeInOut" }}
                />
              </div>

              {/* Suppression du carré bleu décoratif et du texte sous la barre */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Header />

      {/* Hero Section */}
      <section
        id="accueil"
        className="relative w-full min-h-screen overflow-hidden text-lg"
        style={{ backgroundColor: "#475569", position: "relative" }}
      >
        {/* Parallax background - augmenter la force pour un effet plus prononcé */}
        <div className="absolute inset-0 overflow-hidden" style={{ top: "-120px", bottom: "-100px", left: "-20px", right: "-20px" }}>
          <ParallaxBackground src="/heroSection.jpg" strength={10} direction="up" />
        </div>

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
            <TextReveal
              text={["VOS VISUELS,", "VOTRE", "MEILLEUR", "ARGUMENT"]}
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter text-white mb-8 leading-[1.1]"
              delay={0.5}
              loadingComplete={!loading}
            />
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
                {/* iPhone animé au premier plan */}
                <AnimatedIPhone
                  className="w-full h-auto relative z-10"
                  initialDelay={800}
                  loadingComplete={!loading}
                  aria-label="Visualisation de statistiques Airbnb montrant l'augmentation des réservations de 37% grâce à Klikx"
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
                    <ScrollReveal>
                      Que vous soyez propriétaire Airbnb ou gestionnaire de conciergerie, <span className="font-bold">Klikx</span> vous offre des <span className="font-bold">visuels 3D réalistes et percutants</span>, conçus pour <span className="font-bold">valoriser vos espaces, attirer plus de voyageurs et maximiser vos réservations</span> — avec simplicité et efficacité.
                    </ScrollReveal>
                  </div>
                </div>
                <div className="mb-8">
                  <ScrollReveal delay={0.3}>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Des visuels sur-mesure, des opportunités sans limite.
                    </h3>
                  </ScrollReveal>
                </div>
                <div className="mb-16">
                  <ScrollReveal delay={0.4}>
                    <p className="text-lg text-gray-600">
                      Chez Klikx, nous combinons expertise en modélisation 3D et sens du design pour transformer vos
                      annonces en véritables aimants à réservations.
                    </p>
                  </ScrollReveal>
                </div>
                <div className="mb-16">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-8">
                    <ScrollReveal delay={0.1}>
                      <div className="flex flex-col">
                        <div className="border-t border-gray-300 w-full mb-1"></div>
                        <div className="flex items-start">
                          <div className="w-10 flex-shrink-0">
                            <span className="text-gray-400 text-sm font-light inline-block">01 —</span>
                          </div>
                          <span className="font-bold text-gray-900">Visuels 3D réalistes, livrés rapidement</span>
                        </div>
                      </div>
                    </ScrollReveal>
                    <ScrollReveal delay={0.2}>
                      <div className="flex flex-col">
                        <div className="border-t border-gray-300 w-full mb-1"></div>
                        <div className="flex items-start">
                          <div className="w-10 flex-shrink-0">
                            <span className="text-gray-400 text-sm font-light inline-block">03 —</span>
                          </div>
                          <span className="font-bold text-gray-900">Solutions pour propriétaires et conciergeries</span>
                        </div>
                      </div>
                    </ScrollReveal>
                    <ScrollReveal delay={0.3}>
                      <div className="flex flex-col">
                        <div className="border-t border-gray-300 w-full mb-1"></div>
                        <div className="flex items-start">
                          <div className="w-10 flex-shrink-0">
                            <span className="text-gray-400 text-sm font-light inline-block">02 —</span>
                          </div>
                          <span className="font-bold text-gray-900">Rendus adaptés à chaque type de bien</span>
                        </div>
                      </div>
                    </ScrollReveal>
                    <ScrollReveal delay={0.4}>
                      <div className="flex flex-col">
                        <div className="border-t border-gray-300 w-full mb-1"></div>
                        <div className="flex items-start">
                          <div className="w-10 flex-shrink-0">
                            <span className="text-gray-400 text-sm font-light inline-block">04 —</span>
                          </div>
                          <span className="font-bold text-gray-900">Pensé pour booster vos performances</span>
                        </div>
                      </div>
                    </ScrollReveal>
                  </div>
                </div>
                <div>
                  <ScrollReveal delay={0.5}>
                    <a
                      href="#services"
                      className="bg-gray-200 text-gray-800 inline-flex items-center py-3 px-6 cursor-pointer rounded-md group"
                    >
                      <span className="font-medium">Devis</span>
                      <div className="ml-2">
                        <FoundationArrow darkMode={true} size="small" />
                      </div>
                    </a>
                  </ScrollReveal>
                </div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-5">
              <div className="w-full relative">
                <AboutImage />
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
              <ScrollReveal className="h-full">
                <div className="bg-[#7790ED] rounded-md h-full flex flex-col justify-between p-8">
                  <p className="text-[7rem] leading-none font-bold text-white">
                    <CountUp end={35} prefix="+" suffix="%" duration={2500} />
                  </p>
                  <div>
                    <div className="w-full h-[1px] bg-white opacity-30 mb-2"></div>
                    <p className="text-sm text-white opacity-90">Augmentation des réservations</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
            <div className="md:row-span-3 md:col-start-1 md:row-start-4">
              <ScrollReveal className="h-full" delay={0.2}>
                <div className="bg-[#212121] rounded-md h-full flex flex-col justify-between p-8">
                  <p className="text-[7rem] leading-none font-bold text-white">
                    <CountUp end={60} suffix="+" duration={2700} />
                  </p>
                  <div>
                    <div className="w-full h-[1px] bg-white opacity-30 mb-2"></div>
                    <p className="text-sm text-white opacity-90">Propriétés valorisées</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
            <div className="md:row-span-3 md:col-start-2 md:row-start-2">
              <ScrollReveal className="h-full" delay={0.3}>
                <div className="bg-[#292621] rounded-md h-full flex flex-col justify-between p-8">
                  <p className="text-[7rem] leading-none font-bold text-white">
                    <CountUp end={98} suffix="%" duration={2900} />
                  </p>
                  <div>
                    <div className="w-full h-[1px] bg-white opacity-30 mb-2"></div>
                    <p className="text-sm text-white opacity-90">Taux de satisfaction client</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
            <div className="md:row-span-3 md:col-start-2 md:row-start-5">
              <ScrollReveal className="h-full" delay={0.4}>
                <div className="bg-[#ADADAD] rounded-md h-full flex flex-col justify-between p-8">
                  <p className="text-[7rem] leading-none font-bold text-white">
                    <CountUp end={45} suffix="+" duration={2800} />
                  </p>
                  <div>
                    <div className="w-full h-[1px] bg-white opacity-30 mb-2"></div>
                    <p className="text-sm text-white opacity-90">Modèles 3D réalisés</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
            <div className="md:row-span-3 md:col-start-3 md:row-start-3">
              <ScrollReveal className="h-full" delay={0.5}>
                <div className="bg-[#F5EDE2] rounded-md h-full flex flex-col justify-between p-8">
                  <p className="text-[7rem] leading-none font-bold text-[#212121]">
                    <CountUp end={72} suffix="H" duration={2200} />
                  </p>
                  <div className="mt-auto">
                    <div className="w-full h-[1px] bg-[#212121] opacity-20 mb-2"></div>
                    <p className="text-sm text-[#212121] opacity-70">Délai moyen de livraison</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="min-h-screen flex flex-col text-white text-lg relative pb-8"
        style={{
          backgroundImage: `url(${getBackgroundImageForPlan()})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#291F1D",
          transition: "background-image 0.5s ease-in-out",
        }}
      >
        <div className="container mx-auto px-4 flex-1 flex flex-col justify-between relative z-10 py-12 md:py-16">
          {/* Titre en haut */}
          <div className="grid grid-cols-12 gap-4 md:gap-x-16 mb-8 md:mb-0">
            <div className="col-span-12 lg:col-span-5">
              <TextReveal
                text={["NOS", "SERVICES"]}
                className="text-6xl md:text-7xl lg:text-8xl font-bold leading-none"
                delay={0.2}
              />
            </div>
          </div>

          {/* Contenu en bas - le bloc que vous souhaitez aligner en bas */}
          <div className="grid grid-cols-12 gap-4 md:gap-x-16 mt-8 lg:mt-auto">
            <div className="col-span-5 lg:block hidden">
              {/* Colonne vide pour maintenir l'alignement avec le titre */}
            </div>
            <div className="col-span-12 lg:col-span-7 mt-auto">
              <ScrollReveal delay={0.3} direction="up">
                <p className="text-base md:text-lg mb-6 md:mb-8 w-full">
                  Le forfait dépend de la taille de votre appartement et du niveau de détail souhaité. Après réception de vos plans ou photos, nous vous guidons vers l'option la plus adaptée.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.4} direction="up">
                <PricingTabs onPlanChange={handlePlanChange} />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="processus" className="py-20 bg-white text-lg">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-6">
              <TextReveal
                text="PROCESSUS"
                className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl font-bold mb-12 text-[#1c1c1c]"
                delay={0.2}
              />
              <div className="hidden lg:block h-96"></div>
              <div className="space-y-8 mt-auto">
                <div>
                  <div className="flex mb-8">
                    <div className="w-12 sm:w-20 md:w-36 flex-shrink-0">
                      <div className="text-gray-400 text-xl font-light">01</div>
                    </div>
                    <div className="flex-1">
                      <ScrollReveal delay={0.2}>
                        <h3 className="text-xl font-bold text-[#1c1c1c] mb-2">Envoi des Plans & Définition des Besoins</h3>
                        <p className="text-gray-600">
                          Vous nous transmettez les plans, photos et vos attentes spécifiques. Nous analysons votre bien pour proposer la meilleure approche visuelle.
                        </p>
                      </ScrollReveal>
                    </div>
                  </div>
                  <div className="h-[0.5px] bg-gray-200"></div>
                </div>
                <div>
                  <div className="flex mb-8">
                    <div className="w-12 sm:w-20 md:w-36 flex-shrink-0">
                      <div className="text-gray-400 text-xl font-light">02</div>
                    </div>
                    <div className="flex-1">
                      <ScrollReveal delay={0.3}>
                        <h3 className="text-xl font-bold text-[#1c1c1c] mb-2">Proposition Personnalisée & Validation</h3>
                        <p className="text-gray-600">
                          Nous recommandons le forfait adapté à votre projet avec un devis clair, un calendrier. Validation rapide pour lancer la modélisation.
                        </p>
                      </ScrollReveal>
                    </div>
                  </div>
                  <div className="h-[0.5px] bg-gray-200"></div>
                </div>
                <div>
                  <div className="flex mb-8">
                    <div className="w-12 sm:w-20 md:w-36 flex-shrink-0">
                      <div className="text-gray-400 text-xl font-light">03</div>
                    </div>
                    <div className="flex-1">
                      <ScrollReveal delay={0.4}>
                        <h3 className="text-xl font-bold text-[#1c1c1c] mb-2">Création du Modèle 3D & Affinage</h3>
                        <p className="text-gray-600">
                          Nous réalisons la modélisation isométrique détaillée. Vous recevez un premier rendu pour demander des ajustements selon votre forfait.
                        </p>
                      </ScrollReveal>
                    </div>
                  </div>
                  <div className="h-[0.5px] bg-gray-200"></div>
                </div>
                <div>
                  <div className="flex mb-8">
                    <div className="w-12 sm:w-20 md:w-36 flex-shrink-0">
                      <div className="text-gray-400 text-xl font-light">04</div>
                    </div>
                    <div className="flex-1">
                      <ScrollReveal delay={0.5}>
                        <h3 className="text-xl font-bold text-[#1c1c1c] mb-2">Livraison Finale Prête à l'Emploi</h3>
                        <p className="text-gray-600">
                          Vous recevez votre visuel 3D haute résolution, optimisé pour vos annonces Airbnb ou vos supports de communication.
                        </p>
                      </ScrollReveal>
                    </div>
                  </div>
                  <div className="h-[0.5px] bg-gray-200"></div>
                </div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-6">
              <div className="relative h-full">
                {/* Parallax effect for process section image - ajuster pour un effet plus visible */}
                <div className="relative h-full" style={{ minHeight: "500px", overflow: "hidden" }}>
                  <ParallaxBackground
                    src="/processSection.jpg"
                    strength={8}
                    direction="up"
                    className="scale-[1.4]"
                  />
                  <div className="absolute inset-0 flex items-center justify-center z-20">
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
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="temoignages" className="py-20 bg-white text-lg">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <TextReveal
              text="CE QUE DISENT"
              className="text-5xl sm:text-6xl md:text-7xl font-normal text-[#1c1c1c]"
              delay={0.2}
            />
            <TextReveal
              text="NOS CLIENTS"
              className="text-5xl sm:text-6xl md:text-7xl font-bold text-[#1c1c1c] mb-6"
              delay={0.3}
            />
            <ScrollReveal delay={0.4}>
              <p className="text-base sm:text-lg text-[#1c1c1c]">
                Découvrez les témoignages de propriétaires et gestionnaires qui ont valorisé<br className="hidden md:block" />
                leurs annonces avec nos modèles 3D isométriques
              </p>
            </ScrollReveal>
          </div>
          <div className="mt-12">
            <div>
              <div className="flex flex-col md:flex-row py-6">
                <div className="md:w-1/4 mb-4 md:mb-0">
                  <ScrollReveal delay={0.1}>
                    <p className="font-bold text-xl">Sarah J.</p>
                    <p className="text-gray-500 text-lg">Superhôte Airbnb</p>
                  </ScrollReveal>
                </div>
                <div className="md:w-3/4">
                  <ScrollReveal delay={0.2}>
                    <p className="text-xl font-normal">
                      Les modèles 3D isométriques de Klikx ont complètement transformé nos
                      annonces Airbnb. Nous avons constaté une augmentation de 30% des
                      demandes de réservation depuis leur ajout à nos photos de propriété.
                    </p>
                  </ScrollReveal>
                </div>
              </div>
            </div>
            <div>
              <div className="flex flex-col md:flex-row py-6 border-t border-gray-200">
                <div className="md:w-1/4 mb-4 md:mb-0">
                  <ScrollReveal delay={0.1}>
                    <p className="font-bold text-xl">Michael T.</p>
                    <p className="text-gray-500 text-lg">PDG, Urban Stay Properties</p>
                  </ScrollReveal>
                </div>
                <div className="md:w-3/4">
                  <ScrollReveal delay={0.2}>
                    <p className="text-xl font-normal">
                      En tant qu'entreprise de gestion immobilière, nous avions besoin d'un
                      moyen de présenter plusieurs propriétés de manière cohérente. Klikx a
                      livré des modèles isométriques impressionnants que nos clients adorent et
                      qui ont considérablement amélioré nos résultats marketing.
                    </p>
                  </ScrollReveal>
                </div>
              </div>
            </div>
            <div>
              <div className="flex flex-col md:flex-row py-6 border-t border-gray-200">
                <div className="md:w-1/4 mb-4 md:mb-0">
                  <ScrollReveal delay={0.1}>
                    <p className="font-bold text-xl">Rebecca L.</p>
                    <p className="text-gray-500 text-lg">Propriétaire de location saisonnière</p>
                  </ScrollReveal>
                </div>
                <div className="md:w-3/4">
                  <ScrollReveal delay={0.2}>
                    <p className="text-xl font-normal">
                      Les modèles 3D isométriques de Klikx ont complètement transformé nos
                      annonces Airbnb. Nous avons constaté une augmentation de 30% des
                      demandes de réservation depuis leur ajout à nos photos de propriété.
                    </p>
                  </ScrollReveal>
                </div>
              </div>
            </div>
            <div>
              <div className="flex flex-col md:flex-row py-6 border-t border-gray-200">
                <div className="md:w-1/4 mb-4 md:mb-0">
                  <ScrollReveal delay={0.1}>
                    <p className="font-bold text-xl">David K.</p>
                    <p className="text-gray-500 text-lg">Investisseur immobilier</p>
                  </ScrollReveal>
                </div>
                <div className="md:w-3/4">
                  <ScrollReveal delay={0.2}>
                    <p className="text-xl font-normal">
                      Le service client de Klikx est aussi impressionnant que leurs modèles 3D.
                      Ils ont été réactifs, ont effectué toutes les révisions demandées
                      rapidement et ont livré avant la date prévue.
                    </p>
                  </ScrollReveal>
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
        className="min-h-screen relative overflow-hidden text-lg flex items-center py-40"
        style={{ backgroundColor: "#333" }}
      >
        {/* Conteneur de l'image avec position absolue modifiée pour commencer encore plus haut */}
        <div className="absolute inset-0" style={{ top: "-200px", bottom: "-20px", left: 0, right: 0 }}>
          <ParallaxBackground
            src="/contactSection.jpg"
            strength={9}
            direction="up"
            className="z-0 scale-[1.2]"
          />
        </div>

        <div className="container mx-auto px-4 z-10">
          <div className="grid grid-cols-12">
            {/* 5 colonnes vides pour l'image */}
            <div className="col-span-5"></div>

            {/* 7 colonnes pour le contenu */}
            <div className="col-span-12 md:col-span-7">
              <div className="w-full">
                <TextReveal
                  text={["PARLONS DE", "VOTRE PROJET"]}
                  className="text-6xl md:text-7xl font-bold text-white mb-16"
                  delay={0.2}
                />

                <ScrollReveal delay={0.3}>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center mb-16 space-y-2 sm:space-y-0 sm:space-x-2">
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
                      className="inline-flex items-center bg-white/20 text-white px-4 py-2 rounded-full transition-colors mt-2 sm:mt-0"
                    >
                      +41 79 523 22 42
                    </a>
                  </div>
                </ScrollReveal>

                <div className="w-full h-px bg-white/20 mb-8" />

                <ScrollReveal delay={0.5}>
                  <h2 className="text-2xl font-medium text-white mb-8">
                    Contactez-nous maintenant
                  </h2>
                </ScrollReveal>

                <div className="w-full h-px bg-white/20 mb-12" />

                <div className="space-y-12">
                  <ScrollReveal delay={0.6}>
                    <p className="text-white/80 mb-8">
                      Vos informations
                    </p>
                  </ScrollReveal>

                  <ScrollReveal delay={0.7}>
                    <ContactForm />
                  </ScrollReveal>
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
