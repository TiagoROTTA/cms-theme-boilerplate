document.addEventListener('DOMContentLoaded', function() {
    // Sélectionner tous les éléments avec une classe d'animation
    const animatedElements = document.querySelectorAll('.fade-in, .slide-from-top, .slide-from-bottom, .slide-from-left, .slide-from-right');

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
        animatedElements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('visible');
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
}); 