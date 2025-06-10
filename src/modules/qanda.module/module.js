document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelectorAll('.qanda-item');

  // Fonction pour vérifier si un élément est dans le viewport
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
      rect.bottom >= 0
    );
  }

  // Fonction pour gérer le scroll
  function handleScroll() {
    items.forEach(item => {
      if (isElementInViewport(item)) {
        item.classList.add('visible');
      }
    });
  }

  // Ajouter un délai pour les animations
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Écouter l'événement scroll avec debounce
  window.addEventListener('scroll', debounce(handleScroll, 10));

  // Vérifier les éléments visibles au chargement initial
  handleScroll();

  // Gestion de l'accordéon
  items.forEach(item => {
    const btn = item.querySelector('.qanda-question');
    const answer = item.querySelector('.qanda-answer');
    btn.addEventListener('click', function () {
      // Ferme toutes les autres réponses
      items.forEach(i => {
        if (i !== item && i.classList.contains('open')) {
          i.classList.remove('open');
          // Attend la fin de la transition avant de remettre max-height à 0
          const ans = i.querySelector('.qanda-answer');
          ans.style.maxHeight = null;
        }
      });

      if (item.classList.contains('open')) {
        // Fermer : d'abord enlever le contenu, puis fermer la box
        answer.style.maxHeight = answer.scrollHeight + "px";
        setTimeout(() => {
          item.classList.remove('open');
          answer.style.maxHeight = null;
        }, 10);
      } else {
        // Ouvrir : d'abord ouvrir la box, puis afficher le contenu
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });

    // Pour la transition fluide à la fermeture
    answer.addEventListener('transitionend', function (e) {
      if (!item.classList.contains('open')) {
        answer.style.maxHeight = null;
      }
    });
  });
});
