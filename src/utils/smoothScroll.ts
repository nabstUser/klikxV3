// Réduit les appels excessifs de fonction pendant le défilement
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>): void => {
    const later = () => {
      timeoutId = null;
      func(...args);
    };

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(later, wait);
  };
}

// Version optimisée de smoothScroll utilisant requestAnimationFrame pour des performances optimales
export const smoothScroll = (target: string, duration = 1000): void => {
  if (typeof window === 'undefined') return;

  const targetElement = document.querySelector(target);
  if (!targetElement) return;

  const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;

  let startTime: number | null = null;

  // Utilisation d'une courbe d'accélération cubique pour un mouvement plus naturel
  const easeOutCubic = (t: number): number => {
    return 1 - Math.pow(1 - t, 3);
  };

  const animateScroll = (currentTime: number): void => {
    if (startTime === null) startTime = currentTime;
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    const easeProgress = easeOutCubic(progress);

    window.scrollTo({
      top: startPosition + distance * easeProgress,
      behavior: 'auto' // On gère nous-mêmes l'animation, pas besoin du comportement 'smooth'
    });

    if (elapsedTime < duration) {
      requestAnimationFrame(animateScroll);
    }
  };

  requestAnimationFrame(animateScroll);
};

// Version optimisée pour le défilement vers un élément
export const scrollToElement = (
  elementId: string,
  offset = 0,
  duration = 800
): void => {
  if (typeof window === 'undefined') return;

  // Utiliser une seule instruction pour sélectionner l'élément (par id ou sélecteur)
  const element = elementId.startsWith('#')
    ? document.querySelector(elementId)
    : document.getElementById(elementId);

  if (!element) return;

  const elementPosition = element.getBoundingClientRect().top + window.scrollY;
  const offsetPosition = elementPosition - offset;

  // Utiliser smoothScroll pour l'animation
  const targetPosition = Math.max(0, offsetPosition);

  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });
};

/**
 * Fonction pour gérer le défilement fluide vers une ancre/section de la page
 * @param e - L'événement du clic
 * @param id - L'identifiant de la section cible (sans le #)
 */
export const smoothScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
  e.preventDefault();

  // Utilisation de la fonction optimisée scrollToElement sans offset
  scrollToElement(id, 0, 800);
};

/**
 * Fonction pour gérer le défilement fluide depuis des liens href
 * @param href - Le lien href avec l'ancre (par exemple "/#section")
 */
export const handleSmoothScroll = (href: string) => {
  // Vérifier si le lien est une ancre sur la page actuelle
  if (href.startsWith('/#')) {
    const id = href.substring(2); // Enlève le '/#' pour obtenir l'id
    const element = document.getElementById(id);

    if (element) {
      scrollToElement(id, 0, 800);
      return true; // Indique que le défilement a été géré
    }
  } else if (href.startsWith('#')) {
    // Pour les ancres simples comme "#section"
    const id = href.substring(1); // Enlève le '#' pour obtenir l'id
    const element = document.getElementById(id);

    if (element) {
      scrollToElement(id, 0, 800);
      return true; // Indique que le défilement a été géré
    }
  }

  return false; // Indique que le lien n'a pas été géré comme un défilement fluide
};
