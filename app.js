if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Smooth scrolling without adding # to the URL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId !== '#') {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Burger menu
const burgerBtn = document.getElementById('burger-btn');
const mobileMenu = document.getElementById('mobile-menu');
const burgerIcon = document.getElementById('burger-icon');
const closeIcon = document.getElementById('close-icon');
const mobileLinks = document.querySelectorAll('.mobile-nav-link');

function toggleMenu() {
    const isExpanded = burgerBtn.getAttribute('aria-expanded') === 'true';

    mobileMenu.classList.toggle('hidden');
    burgerIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');

    burgerBtn.setAttribute('aria-expanded', !isExpanded);
}

if (burgerBtn && mobileMenu) {
    burgerBtn.addEventListener('click', toggleMenu);
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (!mobileMenu.classList.contains('hidden')) {
                toggleMenu();
            }
        });
    });
}

// Booking modal window
const reserveBtn = document.getElementById('reserve-btn');
const bookingModal = document.getElementById('booking-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const confirmModalBtn = document.getElementById('confirm-modal-btn');
const modalBackdrop = document.getElementById('modal-backdrop');

function openModal() {
    bookingModal.classList.remove('hidden');
    bookingModal.classList.add('flex');
    document.body.classList.add('overflow-hidden');
}

function closeModal() {
    bookingModal.classList.add('hidden');
    bookingModal.classList.remove('flex');
    document.body.classList.remove('overflow-hidden');
}

if (reserveBtn && bookingModal) {
    reserveBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);
    confirmModalBtn.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !bookingModal.classList.contains('hidden')) {
            closeModal();
        }
    });
}

// Automatic coffee shop status switcher (7:30 AM – 9:00 PM)
function updateStoreStatus() {
    const now = new Date();
    const currentHour = now.getHours() + now.getMinutes() / 60;
    const isOpen = currentHour >= 7.5 && currentHour < 21.0;

    const textHeader = document.getElementById('status-text-header');
    const textMobile = document.getElementById('status-text-mobile');
    const textModal = document.getElementById('status-text-modal');

    const badgeHeader = document.getElementById('status-badge-header');
    const badgeMobile = document.getElementById('status-badge-mobile');
    const badgeModal = document.getElementById('status-badge-modal');

    const pingHeader = document.getElementById('status-ping-header');
    const pingMobile = document.getElementById('status-ping-mobile');

    const dotHeader = document.getElementById('status-dot-header');
    const dotMobile = document.getElementById('status-dot-mobile');
    const dotModal = document.getElementById('status-dot-modal');

    if (!isOpen) {
        if (textHeader) textHeader.textContent = 'Closed · Opens at 7:30 AM';
        if (textMobile) textMobile.textContent = 'Closed · Opens at 7:30 AM';
        if (textModal) textModal.textContent = 'Closed now';

        if (pingHeader) pingHeader.style.display = 'none';
        if (pingMobile) pingMobile.style.display = 'none';

        [badgeHeader, badgeMobile].forEach(el => {
            if (el) {
                el.className = el.className
                    .replaceAll('emerald-500/10', 'amber-500/10')
                    .replaceAll('emerald-500/25', 'amber-500/20')
                    .replaceAll('text-emerald-400', 'text-amber-400');
            }
        });

        if (badgeModal) {
            badgeModal.className = badgeModal.className
                .replaceAll('emerald-500/10', 'amber-500/10')
                .replaceAll('emerald-500/20', 'amber-500/20')
                .replaceAll('text-emerald-400', 'text-amber-400');
        }

        [dotHeader, dotMobile, dotModal].forEach(dot => {
            if (dot) {
                dot.className = dot.className
                    .replaceAll('bg-emerald-500', 'bg-amber-500')
                    .replaceAll('bg-emerald-400', 'bg-amber-400');
            }
        });
    } else {
        if (pingHeader) pingHeader.style.display = '';
        if (pingMobile) pingMobile.style.display = '';
    }
}

updateStoreStatus();

const backToTopBtn = document.getElementById('back-to-top');

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
            backToTopBtn.classList.add('opacity-100', 'translate-y-0');
        } else {
            backToTopBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
            backToTopBtn.classList.remove('opacity-100', 'translate-y-0');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Interactive menu category filter
const filterBtns = document.querySelectorAll('.menu-filter-btn');
const menuCards = document.querySelectorAll('.menu-card');

if (filterBtns.length > 0 && menuCards.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterValue = btn.getAttribute('data-filter');

            filterBtns.forEach(b => {
                b.classList.remove('bg-orange-600', 'text-stone-950', 'shadow-md', 'shadow-orange-600/20', 'font-semibold');
                b.classList.add('bg-stone-900/60', 'border', 'border-stone-800', 'text-stone-400', 'font-medium');
            });

            btn.classList.remove('bg-stone-900/60', 'border', 'border-stone-800', 'text-stone-400', 'font-medium');
            btn.classList.add('bg-orange-600', 'text-stone-950', 'shadow-md', 'shadow-orange-600/20', 'font-semibold');

            menuCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// Processing the newsletter subscription form
const newsletterForm = document.getElementById('newsletter-form');
const newsletterEmail = document.getElementById('newsletter-email');
const newsletterToast = document.getElementById('newsletter-toast');
let toastTimer = null;

if (newsletterForm && newsletterToast) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();

        newsletterEmail.value = '';

        newsletterToast.classList.remove('opacity-0', 'pointer-events-none', '-translate-y-4');
        newsletterToast.classList.add('opacity-100', 'translate-y-0');

        if (toastTimer) clearTimeout(toastTimer);

        toastTimer = setTimeout(() => {
            newsletterToast.classList.add('opacity-0', 'pointer-events-none', '-translate-y-4');
            newsletterToast.classList.remove('opacity-100', 'translate-y-0');
        }, 4000);
    });
}