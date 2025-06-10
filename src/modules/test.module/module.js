document.addEventListener("DOMContentLoaded", function() {
    var lastScrollTop = 0;
    var navbar = document.getElementById("navbar");

    window.addEventListener("scroll", function() {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop) {
            // Défilement vers le bas
            navbar.classList.add("nav-hidden");
        } else {
            // Défilement vers le haut
            navbar.classList.remove("nav-hidden");
        }
        lastScrollTop = scrollTop;
    });
});