/**
 * Fonction pour gérer le défilement fluide vers une ancre/section de la page
 * @param e - L'événement du clic
 * @param id - L'identifiant de la section cible (sans le #)
 */
export const smoothScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
  e.preventDefault();

  const element = document.getElementById(id);

  if (element) {
    // Calculer la position de défilement avec un offset réduit
    // Utiliser un offset plus petit pour arriver plus précisément à la section
    const navOffset = 20; // réduit de 80 à 20
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - navOffset;

    // Défilement fluide
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  }
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
      const navOffset = 20; // réduit de 80 à 20
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      return true; // Indique que le défilement a été géré
    }
  } else if (href.startsWith('#')) {
    // Pour les ancres simples comme "#section"
    const id = href.substring(1); // Enlève le '#' pour obtenir l'id
    const element = document.getElementById(id);

    if (element) {
      const navOffset = 20; // réduit de 80 à 20
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      return true; // Indique que le défilement a été géré
    }
  }

  return false; // Indique que le lien n'a pas été géré comme un défilement fluide
};
