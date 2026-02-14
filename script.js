/* ========================================
   TashTravel — Interactive JavaScript
   ======================================== */

// === Preloader ===
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
        document.body.style.overflow = 'auto';
        initScrollAnimations();
    }, 1500);
});

// === Navbar Scroll Effect ===
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Active nav link
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (currentScroll >= sectionTop && currentScroll < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });

    // Scroll to top button
    const scrollTop = document.getElementById('scrollTop');
    if (currentScroll > 500) {
        scrollTop.classList.add('visible');
    } else {
        scrollTop.classList.remove('visible');
    }

    lastScroll = currentScroll;
});

// === Scroll to Top ===
document.getElementById('scrollTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// === Mobile Menu ===
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// === Hero Slider ===
const heroSlides = document.querySelectorAll('.hero-slide');
let currentSlide = 0;

function nextHeroSlide() {
    heroSlides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % heroSlides.length;
    heroSlides[currentSlide].classList.add('active');
}

setInterval(nextHeroSlide, 5000);

// === Hero Particles ===
function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDuration = Math.random() * 15 + 10 + 's';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        container.appendChild(particle);
    }
}
createParticles();

// === Counter Animation ===
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.target);
        const duration = 2000;
        const start = 0;
        const startTime = Date.now();

        function updateCounter() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOut * target);
            counter.textContent = current.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        }

        updateCounter();
    });
}

// Observe hero stats
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// === Tour Filters ===
const filterBtns = document.querySelectorAll('.filter-btn');
const tourCards = document.querySelectorAll('.tour-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        tourCards.forEach((card, index) => {
            const categories = card.dataset.category;

            if (filter === 'all' || categories.includes(filter)) {
                card.style.display = 'block';
                card.style.animation = `fadeInUp 0.5s ease ${index * 0.1}s both`;
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// === Wishlist Toggle ===
document.querySelectorAll('.tour-wishlist').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.classList.toggle('liked');
        const icon = btn.querySelector('i');
        if (btn.classList.contains('liked')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            btn.style.transform = 'scale(1.3)';
            setTimeout(() => btn.style.transform = 'scale(1)', 300);
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
        }
    });
});

// === Reviews Slider ===
const reviewsTrack = document.getElementById('reviewsTrack');
const reviewCards = document.querySelectorAll('.review-card');
const prevBtn = document.getElementById('prevReview');
const nextBtn = document.getElementById('nextReview');
const dotsContainer = document.getElementById('reviewsDots');
let currentReview = 0;

// Create dots
reviewCards.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.className = 'dot' + (index === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToReview(index));
    dotsContainer.appendChild(dot);
});

function goToReview(index) {
    currentReview = index;
    reviewsTrack.style.transform = `translateX(-${index * 100}%)`;

    document.querySelectorAll('.reviews-dots .dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

prevBtn.addEventListener('click', () => {
    currentReview = (currentReview - 1 + reviewCards.length) % reviewCards.length;
    goToReview(currentReview);
});

nextBtn.addEventListener('click', () => {
    currentReview = (currentReview + 1) % reviewCards.length;
    goToReview(currentReview);
});

// Auto-play reviews
setInterval(() => {
    currentReview = (currentReview + 1) % reviewCards.length;
    goToReview(currentReview);
}, 6000);

// === Countdown Timer ===
function updateTimer() {
    const deadline = new Date('2026-03-31T23:59:59');
    const now = new Date();
    const diff = deadline - now;

    if (diff <= 0) return;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

updateTimer();
setInterval(updateTimer, 1000);

// === Scroll Reveal Animations ===
function initScrollAnimations() {
    const revealElements = document.querySelectorAll(
        '.dest-card, .tour-card, .feature-card, .about-images, .about-content, ' +
        '.contact-info, .contact-form-wrapper, .section-header, .search-card, ' +
        '.cta-content, .insta-item'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('reveal', 'active');
                }, index * 50);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

// === Contact Form ===
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = contactForm.querySelector('button[type="submit"]');
        const originalHTML = btn.innerHTML;

        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
        btn.disabled = true;
        btn.style.opacity = '0.7';

        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = '';
            btn.style.opacity = '1';
            btn.disabled = false;
            contactForm.reset();

            // Show fullscreen success animation
            showSuccessOverlay();
        }, 1500);
    });
}

// === Search Form ===
// (removed — no search section)

// === Booking Modal ===
const bookingModal = document.getElementById('bookingModal');
const bookingClose = document.getElementById('bookingClose');
const bookingTourName = document.getElementById('bookingTourName');
const bookingForm = document.getElementById('bookingForm');

document.querySelectorAll('.btn-book').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const tourName = btn.dataset.tour || '';
        bookingTourName.textContent = tourName;
        bookingModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

function closeBookingModal() {
    bookingModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

bookingClose.addEventListener('click', closeBookingModal);

bookingModal.addEventListener('click', (e) => {
    if (e.target === bookingModal) closeBookingModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && bookingModal.classList.contains('active')) {
        closeBookingModal();
    }
});

if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = bookingForm.querySelector('button[type="submit"]');
        const originalHTML = btn.innerHTML;

        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
        btn.disabled = true;
        btn.style.opacity = '0.7';

        setTimeout(() => {
            // Close modal
            closeBookingModal();
            bookingForm.reset();
            btn.innerHTML = originalHTML;
            btn.style.background = '';
            btn.disabled = false;
            btn.style.opacity = '1';

            // Show fullscreen success animation
            showSuccessOverlay();
        }, 1500);
    });
}

function showSuccessOverlay() {
    const overlay = document.getElementById('successOverlay');
    const confettiContainer = document.getElementById('successConfetti');
    confettiContainer.innerHTML = '';

    // Create confetti pieces
    const colors = ['#FF6B35', '#FFD700', '#004E89', '#25D366', '#FF3366', '#00C9FF', '#FF8F66'];
    for (let i = 0; i < 80; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = Math.random() * 100 + '%';
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.animationDelay = Math.random() * 0.8 + 's';
        piece.style.animationDuration = (Math.random() * 2 + 2) + 's';
        piece.style.width = (Math.random() * 8 + 4) + 'px';
        piece.style.height = (Math.random() * 14 + 6) + 'px';
        piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        confettiContainer.appendChild(piece);
    }

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }, 4000);
}

// === Smooth Scroll for all anchor links ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// === Parallax Effect on CTA ===
window.addEventListener('scroll', () => {
    const ctaBg = document.querySelector('.cta-bg');
    if (ctaBg) {
        const scrolled = window.scrollY;
        const rate = scrolled * 0.3;
        ctaBg.style.transform = `translateY(${rate}px)`;
    }
});

// === Tilt Effect on Tour Cards (Desktop) ===
if (window.innerWidth > 768) {
    document.querySelectorAll('.tour-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

console.log('🌍 TashTravel — Landing Page Loaded Successfully!');
