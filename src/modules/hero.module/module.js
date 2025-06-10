
function animatePercentage(obj, end, duration) {
    let start = 0;
    let startTime = null;
    const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const value = Math.floor(progress * (end - start) + start);

        obj.innerHTML = '+' + value + '%';

        if (value < end) {
            window.requestAnimationFrame(step);
        } else {
            obj.innerHTML = '+' + end + '%'; // Assure que la valeur finale est correctement affichée
        }
    };
    window.requestAnimationFrame(step);
}

document.addEventListener('DOMContentLoaded', function() {
    const percentages = document.querySelectorAll('.percentage');
    percentages.forEach(function(per) {
        const finalValue = parseInt(per.innerText.replace(/\D/g, ''), 10); // Extrait les chiffres
        animatePercentage(per, finalValue, 2000); // 3000 ms pour l'animation
    });
});
