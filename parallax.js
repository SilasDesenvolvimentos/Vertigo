// ========================================
// PARALLAX
// ========================================

window.addEventListener("scroll", () => {
    const scroll = window.scrollY;

    document.body.style.backgroundPositionY = `${scroll * 0.5}px`;

    parallaxes.forEach(element => {
        const speed = 0.3;
        element.style.transform = `translateY(${scroll * speed}px)`;
    });
});

const parallaxes = document.querySelectorAll(".parallax");

