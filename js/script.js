/**
 * SILICUTE - Premium Pet Comfort Products
 * Professional JavaScript Functionality
 */

// DOM Elements
const header = document.getElementById('header');
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const cartBtn = document.querySelector('.cart-btn');
const cartCount = document.querySelector('.cart-count');
const newsletterForm = document.getElementById('newsletterForm');
const emailInput = document.getElementById('emailInput');
const toast = document.getElementById('toast');
const toastMsg = document.querySelector('.toast-msg');

let cartItemCount = 0;

// ============================================
// HEADER SCROLL EFFECT
// ============================================
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ============================================
// MOBILE MENU
// ============================================
mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close menu on outside click
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ============================================
// ACTIVE NAV LINK
// ============================================
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (navLink && scrollY > sectionTop && scrollY <= sectionTop + section.offsetHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLink.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// NEWSLETTER FORM
// ============================================
newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = emailInput.value.trim();
    
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showToast('Thanks for subscribing! 🎉');
        emailInput.value = '';
    } else {
        showToast('Please enter a valid email');
    }
});

// ============================================
// TOAST NOTIFICATION
// ============================================
function showToast(message) {
    toastMsg.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
const observerOptions = { threshold: 0.1 };

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate elements on scroll
document.querySelectorAll('.product-card, .testimonial-card, .feature-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s, transform 0.6s';
    scrollObserver.observe(el);
});

// ============================================
// CART FUNCTIONALITY (Demo)
// ============================================
document.querySelectorAll('.add-to-cart, .btn-add-cart').forEach(btn => {
    btn.addEventListener('click', function() {
        cartItemCount++;
        cartCount.textContent = cartItemCount;
        showToast('Added to cart! ✓');
        
        // Button animation
        const originalText = this.innerHTML;
        this.innerHTML = 'Added! ✓';
        this.style.background = 'var(--success)';
        
        setTimeout(() => {
            this.innerHTML = originalText;
            this.style.background = '';
        }, 2000);
    });
});

// ============================================
// PRODUCT CARD CLICK
// ============================================
document.querySelectorAll('.product-card-link').forEach(link => {
    link.addEventListener('click', function(e) {
        // Let the link navigate normally
        console.log('Navigating to product...');
    });
});

// ============================================
// KEYBOARD NAVIGATION
// ============================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ============================================
// LAZY LOADING IMAGES
// ============================================
const lazyImages = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// ============================================
// INITIALIZE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🐾 Silicute website loaded!');
    highlightNavLink();
    
    // Add loaded class for animations
    document.body.classList.add('loaded');
});

// ============================================
// PERFORMANCE - DEBOUNCE
// ============================================
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

const debouncedScroll = debounce(() => {
    highlightNavLink();
}, 10);

window.addEventListener('scroll', debouncedScroll);
