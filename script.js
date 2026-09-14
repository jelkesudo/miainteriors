const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

menuToggle?.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
});

mainNav?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
        mainNav.classList.remove('is-open');
        menuToggle?.setAttribute('aria-expanded', 'false');
    });
});

document.querySelectorAll('.service-toggle').forEach((button) => {
    button.addEventListener('click', () => {
        const card = button.closest('.service-card');
        card?.classList.toggle('is-open');
    });
});

document.querySelector('.contact-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Forma je trenutno demo. Poveži je sa Netlify Forms, Formspree ili backendom.');
});
