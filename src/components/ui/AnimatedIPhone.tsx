import type React from 'react';
import { useEffect, useState, useRef } from 'react';

interface AnimatedIPhoneProps {
  className?: string;
  initialDelay?: number; // Délai initial avant de démarrer l'animation (en ms)
  loadingComplete?: boolean; // Indicateur que le chargement est terminé
}

export const AnimatedIPhone: React.FC<AnimatedIPhoneProps> = ({
  className,
  initialDelay = 800, // Délai par défaut après le chargement
  loadingComplete = false // Par défaut, considère que le chargement n'est pas terminé
}) => {
  // État pour les statistiques principales
  const [mainAmount, setMainAmount] = useState(0);
  const [previousAmount, setPreviousAmount] = useState(0);
  const [previousPercentage, setPreviousPercentage] = useState(0);
  const [currentAmount, setCurrentAmount] = useState(0);
  const [currentPercentage, setCurrentPercentage] = useState(0);

  // État pour les statistiques du bas
  const [prixMoyen, setPrixMoyen] = useState(0);
  const [tauxOccupation, setTauxOccupation] = useState(0);
  const [avisClient, setAvisClient] = useState(0);
  const [revenus, setRevenus] = useState(0);

  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [showGlow, setShowGlow] = useState(false);
  const [animateBottomStats, setAnimateBottomStats] = useState(false);

  // Pour l'animation du tracé du graphique
  const [graphProgress, setGraphProgress] = useState(0);

  // États pour contrôler les animations séquentielles
  const [titleVisible, setTitleVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [bottomTextVisible, setBottomTextVisible] = useState(false);

  // État pour contrôler l'animation en boucle du graphique
  const [loopCount, setLoopCount] = useState(0);

  const svgRef = useRef<SVGSVGElement | null>(null);

  // Utiliser une valeur fixe pour la longueur du chemin au lieu d'essayer de la calculer dynamiquement
  // car la méthode getTotalLength() pourrait ne pas être disponible immédiatement
  const graphPathLength = 1000; // Une valeur approximative qui fonctionne bien pour ce graphique

  // Format number with apostrophe as thousand separator
  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
  };

  // Animation effect in sequence: title -> stats -> bottomText
  useEffect(() => {
    // On ne déclenche l'animation que si loadingComplete est true
    if (!loadingComplete) return;

    // Une fois que le chargement est terminé, démarrer l'animation après un court délai
    setTimeout(() => {
      // Animer les différentes parties dans l'ordre
      const titleDelay = 300; // Délai avant d'afficher le titre (était 500ms)
      const statsDelay = 300; // Délai réduit avant d'animer les stats après le titre (était 500ms)
      const bottomTextDelay = 1200; // Délai augmenté avant d'animer le texte du bas après les stats (était 800ms)

      // Montrer le titre après un court délai
      setTimeout(() => {
        setTitleVisible(true);
      }, titleDelay);

      // Lancer l'animation des stats après le titre
      setTimeout(() => {
        setStatsVisible(true);
        animateStats();
      }, titleDelay + statsDelay);

      // Afficher le texte du bas à la fin avec un délai plus long
      setTimeout(() => {
        setBottomTextVisible(true);
        // Déclencher l'animation des stats du bas
        setAnimateBottomStats(true);
      }, titleDelay + statsDelay + bottomTextDelay);

    }, initialDelay); // Utiliser le délai initial avant de démarrer la séquence complète
  }, [loadingComplete, initialDelay]);

  // Fonction pour animer les statistiques
  const animateStats = () => {
    // Forcer une réinitialisation complète
    setGraphProgress(0);

    // Démarrer l'animation après un délai très court
    setTimeout(() => {
      // Target values for main stats
      const targetMainAmount = 93958;
      const targetPreviousAmount = 67860;
      const targetPreviousPercentage = 3;
      const targetCurrentAmount = 93958;
      const targetCurrentPercentage = 37;

      // Target values for bottom stats
      const targetPrixMoyen = 290;
      const targetTauxOccupation = 87;
      const targetAvisClient = 4.8;
      const targetRevenus = 6850;

      const duration = 1200; // Animation plus rapide (était 2000ms)
      const framesPerSecond = 60;
      const totalFrames = duration / 1000 * framesPerSecond;
      let frame = 0;

      const animate = () => {
        frame++;
        const progress = Math.min(frame / totalFrames, 1);
        // Synchronisation plus naturelle : la ligne bleue va suivre une courbe légèrement différente
        const easeProgress = 1 - (1 - progress) ** 3; // Cubic ease-out

        // Animate main stats
        setMainAmount(Math.round(targetMainAmount * easeProgress));
        setPreviousAmount(Math.round(targetPreviousAmount * easeProgress));
        setPreviousPercentage(Math.round(targetPreviousPercentage * easeProgress));
        setCurrentAmount(Math.round(targetCurrentAmount * easeProgress));
        setCurrentPercentage(Math.round(targetCurrentPercentage * easeProgress));

        // Animate graph progress - avec une logique spéciale pour la fin
        setGraphProgress(progress >= 0.95 ? 1 : progress * 0.95); // Force à 1 quand on est près de la fin

        if (frame < totalFrames) {
          requestAnimationFrame(animate);
        } else {
          // Force graphProgress à 1 à la fin pour s'assurer que la ligne est complète
          setGraphProgress(1);

          // Main animation is complete
          setIsAnimationComplete(true);

          // Add a slight delay before showing the glow effect
          setTimeout(() => {
            setShowGlow(true);
            // Ne pas activer immédiatement les stats du bas - c'est géré par l'useEffect initial avec le délai augmenté
            // setAnimateBottomStats(true); <- Ligne commentée

            // Mettre en place la boucle d'animation
            scheduleGraphReanimation();
          }, 500);
        }
      };

      // Start stats animation
      animate();
    }, 50);
  };

  // Fonction pour programmer la réanimation du graphique
  const scheduleGraphReanimation = () => {
    // Attendre entre 10 et 15 secondes avant de relancer l'animation
    const delay = Math.random() * 5000 + 10000; // Entre 10000ms et 15000ms

    setTimeout(() => {
      // Séquence de disparition dans l'ordre inverse
      fadeOutAndReanimate();
    }, delay);
  };

  // Nouvelle fonction pour faire disparaître les éléments dans l'ordre inverse
  const fadeOutAndReanimate = () => {
    // D'abord faire disparaître le texte du bas
    setBottomTextVisible(false);
    // Désactiver l'animation des stats du bas pour pouvoir la relancer plus tard
    setAnimateBottomStats(false);

    // Puis faire disparaître les stats après un délai
    setTimeout(() => {
      setStatsVisible(false);

      // Enfin faire disparaître le titre et réinitialiser tout
      setTimeout(() => {
        setTitleVisible(false);

        // Après la disparition complète, réinitialiser et redémarrer l'animation
        setTimeout(() => {
          // Réinitialiser tous les états
          setGraphProgress(0);
          setMainAmount(0);
          setPreviousAmount(0);
          setPreviousPercentage(0);
          setCurrentAmount(0);
          setCurrentPercentage(0);

          // Réinitialiser explicitement les stats du bas
          setPrixMoyen(0);
          setTauxOccupation(0);
          setAvisClient(0);
          setRevenus(0);

          // Relancer toute la séquence d'animation
          // Même timing que dans le useEffect initial
          const titleDelay = 300;
          const statsDelay = 300;
          const bottomTextDelay = 1200; // Délai augmenté ici aussi

          // Montrer le titre après un court délai
          setTimeout(() => {
            setTitleVisible(true);
          }, titleDelay);

          // Lancer l'animation des stats après le titre
          setTimeout(() => {
            setStatsVisible(true);
            animateStats();
          }, titleDelay + statsDelay);

          // Afficher le texte du bas à la fin
          setTimeout(() => {
            setBottomTextVisible(true);

            // IMPORTANT: Réactiver l'animation des stats du bas
            setAnimateBottomStats(true);
          }, titleDelay + statsDelay + bottomTextDelay);

        }, 500); // Attendre que tout soit invisible
      }, 300);
    }, 300);
  };

  // Fonction pour réanimer le graphique
  const reanimateGraph = () => {
    // Note: Cette fonction n'est plus utilisée directement, tout passe par fadeOutAndReanimate
    // Elle reste au cas où on voudrait l'utiliser à nouveau

    // Réinitialiser le graphique
    setGraphProgress(0);

    // Animer à nouveau les statistiques principales lors de la réanimation
    setMainAmount(0);
    setPreviousAmount(0);
    setPreviousPercentage(0);
    setCurrentAmount(0);
    setCurrentPercentage(0);

    // Réinitialiser aussi les stats du bas
    setPrixMoyen(0);
    setTauxOccupation(0);
    setAvisClient(0);
    setRevenus(0);

    // Animation complète des valeurs
    const targetMainAmount = 93958;
    const targetPreviousAmount = 67860;
    const targetPreviousPercentage = 3;
    const targetCurrentAmount = 93958;
    const targetCurrentPercentage = 37;

    const duration = 1000; // Animation plus rapide (était 2000ms)
    const framesPerSecond = 60;
    const totalFrames = duration / 1000 * framesPerSecond;
    let frame = 0;

    const animateGraph = () => {
      frame++;
      const progress = Math.min(frame / totalFrames, 1);
      const easeProgress = 1 - (1 - progress) ** 3; // Cubic ease-out

      // Animer à la fois le graphique ET les statistiques
      setGraphProgress(easeProgress);
      setMainAmount(Math.round(targetMainAmount * easeProgress));
      setPreviousAmount(Math.round(targetPreviousAmount * easeProgress));
      setPreviousPercentage(Math.round(targetPreviousPercentage * easeProgress));
      setCurrentAmount(Math.round(targetCurrentAmount * easeProgress));
      setCurrentPercentage(Math.round(targetCurrentPercentage * easeProgress));

      if (frame < totalFrames) {
        requestAnimationFrame(animateGraph);
      } else {
        // Compter le nombre de fois que l'animation s'est relancée
        setLoopCount(count => count + 1);

        // Planifier la prochaine animation
        scheduleGraphReanimation();
      }
    };

    // Démarrer l'animation
    animateGraph();
  };

  // Animation for bottom stats (only starts after main stats are done)
  useEffect(() => {
    if (!animateBottomStats) return;

    // Target values for bottom stats
    const targetPrixMoyen = 290;
    const targetTauxOccupation = 87;
    const targetAvisClient = 4.8;
    const targetRevenus = 6850;

    const duration = 800; // Animation plus rapide (était 1500ms)
    const framesPerSecond = 60;
    const totalFrames = duration / 1000 * framesPerSecond;
    let frame = 0;

    const animateBottomText = () => {
      frame++;
      const progress = Math.min(frame / totalFrames, 1);
      const easeProgress = 1 - (1 - progress) ** 3; // Cubic ease-out

      // Animate bottom stats with different timing to create a sequential effect
      setPrixMoyen(Math.round(targetPrixMoyen * easeProgress));

      // Slightly delayed animations for subsequent values
      if (progress > 0.1) {
        setTauxOccupation(Math.round(targetTauxOccupation * (progress - 0.1) / 0.9));
      }

      if (progress > 0.2) {
        // For decimal values like 4.8, we need to handle them differently
        const avisProgress = (progress - 0.2) / 0.8;
        setAvisClient(Math.round(targetAvisClient * avisProgress * 10) / 10);
      }

      if (progress > 0.3) {
        setRevenus(Math.round(targetRevenus * (progress - 0.3) / 0.7));
      }

      if (frame < totalFrames) {
        requestAnimationFrame(animateBottomText);
      } else {
        // Animation terminée - mais on maintient la valeur à true pour que les stats restent visibles
        // Nous ne désactivons pas animateBottomStats ici
      }
    };

    const timer = setTimeout(() => {
      animateBottomText();
    }, 200);

    return () => clearTimeout(timer);
  }, [animateBottomStats]);

  // Nouvelle boucle d'animation qui se déclenche périodiquement, même sans interaction utilisateur
  useEffect(() => {
    // Démarrer la boucle automatique seulement une fois l'animation principale terminée
    if (!isAnimationComplete) return;

    // Créer un intervalle qui anime périodiquement le graphique
    const autoLoopInterval = setInterval(() => {
      // Relancer l'animation si elle n'est pas déjà en cours de réinitialisation
      // (quand tous les éléments sont visibles et l'animation est complète)
      if (graphProgress >= 0.99 && titleVisible && statsVisible && bottomTextVisible) {
        // Désactiver cette fonctionnalité car on utilise scheduleGraphReanimation
        // fadeOutAndReanimate();
      }
    }, 30000); // Vérifier toutes les 30 secondes (augmenté de 10s à 30s)

    return () => clearInterval(autoLoopInterval);
  }, [isAnimationComplete, graphProgress, titleVisible, statsVisible, bottomTextVisible]);

  return (
    <div className="relative">
      {/* Optional glow effect around the iPhone when animation completes */}
      {showGlow && (
        <div
          className="absolute inset-0 z-0 transition-opacity duration-1000 opacity-70"
          style={{
            background: 'radial-gradient(circle, rgba(119, 144, 237, 0.3) 0%, rgba(119, 144, 237, 0) 70%)',
            filter: 'blur(15px)',
            transform: 'scale(1.1)',
            animation: 'pulse-glow 3s infinite alternate ease-in-out',
          }}
        />
      )}
      <svg
        ref={svgRef}
        className={className}
        id="Calque_2"
        data-name="Calque 2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 317 648.59"
        style={{ position: "relative", zIndex: 1 }}
      >
        <defs>
          <style>
            {`
            .cls-1 {
              letter-spacing: -.03em;
            }

            .cls-2 {
              font-size: 13px;
            }

            .cls-2, .cls-6, .cls-11, .cls-10 {
              font-family: KumbhSans-Regular, 'Kumbh Sans', system-ui, sans-serif;
            }

            .cls-2, .cls-3, .cls-4, .cls-5, .cls-6, .cls-7, .cls-8, .cls-9, .cls-10 {
              fill: #fff;
            }

            .cls-12 {
              letter-spacing: 0em;
            }

            .cls-13 {
              letter-spacing: 0em;
            }

            .cls-14 {
              letter-spacing: -.01em;
            }

            .cls-15 {
              letter-spacing: -.01em;
            }

            .cls-16 {
              letter-spacing: -.04em;
            }

            .cls-4 {
              font-size: 17.82px;
            }

            .cls-4, .cls-7 {
              font-family: KumbhSans-Medium, 'Kumbh Sans', system-ui, sans-serif;
              font-weight: 500;
            }

            .cls-17, .cls-18 {
              stroke: #fff;
            }

            .cls-17, .cls-18, .cls-19 {
              fill: none;
              stroke-miterlimit: 10;
            }

            .cls-5 {
              fill-rule: evenodd;
            }

            .cls-6, .cls-11 {
              font-size: 15.92px;
            }

            .cls-20 {
              letter-spacing: 0em;
            }

            .cls-7 {
              font-size: 20px;
            }

            .cls-21 {
              fill: #2ecf8f;
            }

            .cls-18 {
              stroke-linecap: round;
            }

            .cls-22 {
              letter-spacing: -.03em;
            }

            .cls-19 {
              stroke: #7790ed;
              stroke-width: 2px;
            }

            .cls-23 {
              letter-spacing: 0em;
            }

            .cls-8 {
              opacity: .25;
            }

            .cls-8, .cls-24 {
              isolation: isolate;
            }

            .cls-25 {
              fill: #cfedd9;
            }

            .cls-26 {
              letter-spacing: 0em;
            }

            .cls-11 {
              fill: #292621;
            }

            .cls-27 {
              letter-spacing: 0em;
            }

            .cls-28 {
              letter-spacing: -.01em;
            }

            .cls-29 {
              letter-spacing: -.01em;
            }

            .cls-9 {
              font-family: KumbhSans-SemiBold, 'Kumbh Sans', system-ui, sans-serif;
              font-size: 30.02px;
              font-weight: 600;
            }

            .cls-30 {
              letter-spacing: 0em;
            }

            .cls-31 {
              letter-spacing: -.06em;
            }

            .cls-32 {
              letter-spacing: -.03em;
            }

            .cls-33 {
              letter-spacing: -.01em;
            }

            .cls-34 {
              letter-spacing: -.01em;
            }

            .cls-35 {
              letter-spacing: 0em;
            }

            .cls-24 {
              fill: #d8d8d8;
              opacity: .45;
            }

            .cls-10 {
              font-size: 15.89px;
            }

            .stat-number {
              transition: all 0.2s ease;
            }

            @keyframes pulse {
              0% { opacity: 0.9; }
              50% { opacity: 1; }
              100% { opacity: 0.9; }
            }

            @keyframes pulse-arrow {
              0% { transform: translateY(0) scale(1); }
              50% { transform: translateY(-3px) scale(1.08); }
              100% { transform: translateY(0) scale(1); }
            }

            @keyframes pulse-glow {
              0% { opacity: 0.3; transform: scale(1.1); }
              100% { opacity: 0.8; transform: scale(1.18); }
            }

            /* Suppression de la classe number-animation-complete pour éviter le clignotement */
            /* .number-animation-complete {
              animation: pulse 1.5s infinite;
            } */

            .arrow-animation {
              animation: pulse-arrow 1.2s infinite ease-in-out;
              transform-origin: center;
              transform-box: fill-box;
            }

            .circle-animation {
              animation: pulse 2s infinite alternate;
            }

            /* Ajout d'une transition douce pour la réinitialisation des stats */
            .stat-number {
              transition: color 0.2s, opacity 0.3s;
            }
            .stat-number.reinit {
              opacity: 0.3;
              color: #bfc8e6;
              transition: color 0.2s, opacity 0.3s;
            }
            `}
          </style>
        </defs>
        <g id="iphoneOutline">
          <path className="cls-5" d="M266.47,1.5H50.53C24.85,1.5,4.03,22.32,4.03,48v552.59c0,25.68,20.82,46.5,46.5,46.5h215.94c25.68,0,46.5-20.82,46.5-46.5V48c0-25.68-20.82-46.5-46.5-46.5ZM50.53,0C24.02,0,2.53,21.49,2.53,48v552.59c0,26.51,21.49,48,48,48h215.94c26.51,0,48-21.49,48-48V48c0-26.51-21.49-48-48-48H50.53Z"/>
          <path className="cls-5" d="M182.63,19.16h-48.26c-5.02,0-9.09,4.07-9.09,9.09s4.07,9.09,9.09,9.09h48.26c5.02,0,9.1-4.07,9.1-9.09s-4.07-9.09-9.1-9.09ZM134.37,17.66c-5.85,0-10.59,4.74-10.59,10.59s4.74,10.59,10.59,10.59h48.26c5.85,0,10.6-4.74,10.6-10.59s-4.74-10.59-10.6-10.59h-48.26Z"/>
          <path className="cls-3" d="M0,110.65h3.53v23.54H0v-23.54Z"/>
          <path className="cls-3" d="M0,154.2h3.53v42.38H0v-42.38Z"/>
          <path className="cls-3" d="M0,214.24h3.53v42.38H0v-42.38h0Z"/>
          <path className="cls-3" d="M313.47,188.34h3.53v64.74h-3.53v-64.74Z"/>
        </g>
        <g id="title" style={{ opacity: titleVisible ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}>
          <text className="cls-4" transform="translate(28.63 89.19)"><tspan x="0" y="0">28 Rue des Archi</tspan><tspan className="cls-15" x="139.76" y="0">v</tspan><tspan className="cls-30" x="149.58" y="0">es</tspan></text>
          <text className="cls-6" transform="translate(28.63 108.07)"><tspan className="cls-1" x="0" y="0">7</tspan><tspan className="cls-26" x="7.83" y="0">50</tspan><tspan className="cls-22" x="25.79" y="0">0</tspan><tspan x="34.47" y="0">3 </tspan><tspan className="cls-34" x="47.05" y="0">P</tspan><tspan x="56.84" y="0">aris</tspan></text>
          <circle id="infoBcg" className="cls-8" cx="273.05" cy="91.09" r="16.1"/>
          <circle id="klikxBcg" className="cls-8" cx="236.06" cy="91.09" r="16.1"/>
          <g id="infosIcon">
            <circle className="cls-17" cx="273.05" cy="91.09" r="8.2"/>
            <path className="cls-3" d="M272.96,87.46c-.19,0-.35-.07-.48-.2s-.2-.3-.2-.49.07-.35.2-.49c.13-.13.29-.2.48-.2s.36.07.49.2.2.29.2.49-.07.35-.2.49-.3.2-.49.2ZM273.59,95.36h-1.25v-6.12h1.25v6.12Z"/>
          </g>
          <g id="klikx">
            <path className="cls-3" d="M244.27,99.29h-16.41v-16.41h16.41v16.41ZM228.58,98.57h14.97v-14.97h-14.97v14.97Z"/>
            <polygon className="cls-3" points="238.75 96.22 237.73 96.22 235.45 93.48 234.22 94.79 233.37 94.79 233.37 85.96 234.16 85.96 234.16 93.91 234.8 93.13 237.39 90.39 238.36 90.39 236 92.9 238.75 96.22"/>
          </g>
        </g>

        <g id="stats" style={{ opacity: statsVisible ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}>
          <rect id="statsBgc" className="cls-24" x="9.72" y="133.5" width="297.11" height="219.45" rx="3.55" ry="3.55"/>

          {/* Graph du haut - version ultra simplifiée, exactement comme la ligne verticale */}
          <line
            className="cls-17"
            x1="158.28"
            y1="220"
            x2="158.28"
            y2={220-30}
            style={{
              stroke: "#7790ED",
              fill: "none",
              strokeWidth: "2px",
              strokeMiterlimit: "10"
            }}
          />

          {/* SOLUTION AMÉLIORÉE POUR LA LIGNE BLEUE
               - On utilise uniquement un chemin animé avec un clipPath
               - Pas de tracé gris en fond
          */}

          {/* Chemin animé qui se dessine progressivement avec clip-path */}
          <svg width="100%" height="100%" viewBox="0 0 317 648.59" style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}>
            <defs>
              <clipPath id="graphClip">
                {/* Version simplifiée qui couvre tout le SVG quand graphProgress = 1 */}
                <rect
                  x="0"
                  y="0"
                  width={graphProgress >= 0.99 ? 500 : 317 * graphProgress}
                  height="648.59"
                />
              </clipPath>
            </defs>

            {/* Le chemin de la ligne bleue */}
            <path
              id="statsGraph"
              d="M159.07,200.03c.73-1.09,1.78-2.75,2.85-4.9,1.01-2.04,1.3-3.04,1.94-3.08,1.51-.09,2.02,5.47,4.44,5.81,1.2.17,2.34-1.02,3.76-2.51,2.44-2.55,2.22-4.05,3.87-4.78,2.17-.96,4.79.64,5.24.91,2.11,1.29,2.79,3.09,4.33,6.15,2.95,5.89,5.08,10.14,7.06,10.03.35-.02,1.23-.21,3.3-4.78,2.38-5.24,2.51-7.8,4.78-14.01.24-.64.92-2.29,2.28-5.58,3.25-7.85,3.95-9.11,5.01-9.23,2.43-.26,3.94,5.73,5.92,5.35,1.46-.28,1.6-3.71,4.44-11.05,1.31-3.38,1.97-4.43,2.73-4.44,1.88-.02,2.44,6.3,5.13,6.61,1.75.2,2.28-2.39,4.78-2.62,2.51-.23,3.22,2.27,6.04,2.39,2.97.13,3.53-2.58,5.92-2.39,3.53.27,3.49,6.26,8.32,7.97,2.89,1.02,4-.72,7.41.68,3.08,1.27,3.51,3.26,5.24,3.08,2.69-.29,2.83-5.18,5.7-5.81,2.81-.62,4.54,3.67,7.29,3.65,2.16-.02,5.18-2.69,8.77-14.92"
              style={{
                stroke: "#7790ED",
                fill: "none",
                strokeWidth: "2px",
                strokeMiterlimit: "10"
              }}
              clipPath="url(#graphClip)"
            />
          </svg>

          <g id="greenAugment">
            <circle
              className={`cls-21 ${isAnimationComplete ? 'circle-animation' : ''}`}
              cx="38.31"
              cy="298.23"
              r="9.23"
            />
            <line className="cls-18" x1="38.31" y1="294.36" x2="38.31" y2="302.56"/>
            <polyline
              className={`cls-18 ${isAnimationComplete ? 'arrow-animation' : ''}`}
              points="34.47 298.2 38.31 294.36 42.15 298.2"
            />
          </g>
          <g id="greenAugment-2" data-name="greenAugment">
            <circle
              className={`cls-21 ${isAnimationComplete ? 'circle-animation' : ''}`}
              cx="196.66"
              cy="298.23"
              r="9.23"
            />
            <line className="cls-18" x1="196.66" y1="294.36" x2="196.66" y2="302.56"/>
            <polyline
              className={`cls-18 ${isAnimationComplete ? 'arrow-animation' : ''}`}
              points="192.82 298.2 196.66 294.36 200.5 298.2"
            />
          </g>
          <text className="cls-6" transform="translate(28.63 171.99)"><tspan x="0" y="0">Gain a</tspan><tspan className="cls-12" x="47.19" y="0">c</tspan><tspan x="55.37" y="0">tuelle</tspan></text>

          {/* Main amount - Animated */}
          <text className="cls-9" transform="translate(28.63 213.55)">
            <tspan
              x="0"
              y="0"
              className={`stat-number${mainAmount === 0 && graphProgress === 0 ? ' reinit' : ''}`}
            >
              {`${formatNumber(mainAmount)} €`}
            </tspan>
          </text>

          <text className="cls-10" transform="translate(28.63 256.08)"><tspan x="0" y="0">Précede</tspan><tspan className="cls-27" x="61.51" y="0">n</tspan><tspan x="70.87" y="0">t</tspan></text>

          {/* Previous amount - Animated */}
          <text className="cls-7" transform="translate(28.63 280.43)">
            <tspan
              className={`cls-28 stat-number${previousAmount === 0 && graphProgress === 0 ? ' reinit' : ''}`}
              x="0"
              y="0"
            >
              {`${formatNumber(previousAmount)} €`}
            </tspan>
          </text>

          {/* Previous percentage - Animated */}
          <text className="cls-2" transform="translate(52.08 302.74)">
            <tspan
              x="0"
              y="0"
              className={`stat-number${previousPercentage === 0 && graphProgress === 0 ? ' reinit' : ''}`}
            >
              {`${previousPercentage} %`}
            </tspan>
          </text>

          <text className="cls-10" transform="translate(186.59 256.08)"><tspan x="0" y="0">A</tspan><tspan className="cls-35" x="11.73" y="0">c</tspan><tspan x="19.89" y="0">tuelleme</tspan><tspan className="cls-27" x="84.77" y="0">n</tspan><tspan x="94.13" y="0">t</tspan></text>

          {/* Current amount - Animated */}
          <text className="cls-7" transform="translate(186.59 280.43)">
            <tspan
              x="0"
              y="0"
              className={`stat-number${currentAmount === 0 && graphProgress === 0 ? ' reinit' : ''}`}
            >
              {`${formatNumber(currentAmount)} €`}
            </tspan>
          </text>

          {/* Current percentage - Animated */}
          <text className="cls-2" transform="translate(210.04 302.74)">
            <tspan
              className={`cls-28 stat-number${currentPercentage === 0 && graphProgress === 0 ? ' reinit' : ''}`}
              x="0"
              y="0"
            >
              {`${currentPercentage} %`}
            </tspan>
          </text>

          {/* Ligne verticale animée de bas en haut */}
          <line
            className="cls-17"
            x1="158.28"
            y1="320.45"
            x2="158.28"
            y2={320.45 - (320.45 - 248.26) * graphProgress}
            style={{
              transition: "none",
              stroke: "#fff",
              fill: "none",
              strokeMiterlimit: "10"
            }}
          />
        </g>

        <g id="bottomTexte" style={{ opacity: bottomTextVisible ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}>
          <path className="cls-25" d="M251.51,372.28h25.93c6.68,0,12.1,5.42,12.1,12.1h0c0,6.68-5.42,12.1-12.1,12.1h-25.93c-6.68,0-12.1-5.42-12.1-12.1h0c0-6.68,5.42-12.1,12.1-12.1h0Z"/>
          <text className="cls-6" transform="translate(28.63 390.94)"><tspan className="cls-1" x="0" y="0">S</tspan><tspan className="cls-20" x="8.83" y="0">t</tspan><tspan className="cls-33" x="14.9" y="0">a</tspan><tspan x="23.19" y="0">tus</tspan></text>
          <text className="cls-6" transform="translate(28.63 422.56)"><tspan x="0" y="0">Obje</tspan><tspan className="cls-23" x="36.35" y="0">c</tspan><tspan className="cls-14" x="44.52" y="0">t</tspan><tspan x="50.51" y="0">if</tspan></text>
          <text className="cls-6" transform="translate(186.68 422.56)"><tspan className="cls-20" x="0" y="0">C</tspan><tspan className="cls-13" x="11.72" y="0">ourte durée</tspan></text>
          <text className="cls-6" transform="translate(28.63 451.42)"><tspan className="cls-16" x="0" y="0">T</tspan><tspan x="8.71" y="0">ype</tspan></text>
          <text className="cls-6" transform="translate(256.26 451.42)"><tspan className="cls-32" x="0" y="0">L</tspan><tspan className="cls-13" x="8.47" y="0">o</tspan><tspan className="cls-33" x="17.77" y="0">f</tspan><tspan className="cls-26" x="23.94" y="0">t</tspan></text>
          <text className="cls-6" transform="translate(28.63 481.02)"><tspan x="0" y="0">Prix m</tspan><tspan className="cls-33" x="46.93" y="0">o</tspan><tspan x="55.99" y="0">yen</tspan></text>

          {/* Valeurs animées simples - alignées à droite */}
          <text className="cls-6" transform="translate(246.2 481.02)">
            <tspan x="40" y="0" textAnchor="end">{`${prixMoyen} €`}</tspan>
          </text>

          <text className="cls-6" transform="translate(28.63 510.25)"><tspan className="cls-31" x="0" y="0">T</tspan><tspan x="8.47" y="0">aux d</tspan><tspan className="cls-33" x="48.94" y="0">'</tspan><tspan className="cls-13" x="52.84" y="0">occup</tspan><tspan className="cls-33" x="98.15" y="0">at</tspan><tspan x="112.43" y="0">ion</tspan></text>

          <text className="cls-6" transform="translate(255.89 510.25)">
            <tspan x="30" y="0" textAnchor="end">{`${tauxOccupation}%`}</tspan>
          </text>

          <text className="cls-6" transform="translate(28.63 539.71)"><tspan className="cls-1" x="0" y="0">A</tspan><tspan className="cls-26" x="11.29" y="0">vis clie</tspan><tspan className="cls-20" x="59.46" y="0">n</tspan><tspan x="68.84" y="0">t</tspan></text>

          <text className="cls-6" transform="translate(263.8 539.71)">
            <tspan x="20" y="0" textAnchor="end">{avisClient.toFixed(1)}</tspan>
          </text>

          <text className="cls-6" transform="translate(28.63 568.02)"><tspan className="cls-23" x="0" y="0">R</tspan><tspan className="cls-33" x="10.14" y="0">ev</tspan><tspan className="cls-26" x="27.67" y="0">e</tspan><tspan className="cls-23" x="36.73" y="0">n</tspan><tspan x="46.18" y="0">us</tspan></text>

          <text className="cls-6" transform="translate(233.76 568.02)">
            <tspan x="50" y="0" textAnchor="end">{`${formatNumber(revenus)} €`}</tspan>
          </text>

          <text className="cls-11" transform="translate(246.51 390.29)"><tspan x="0" y="0">A</tspan><tspan className="cls-12" x="11.76" y="0">c</tspan><tspan className="cls-33" x="19.93" y="0">t</tspan><tspan x="25.91" y="0">if</tspan></text>
        </g>
      </svg>
    </div>
  );
};
