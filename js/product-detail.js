/**
 * SILICUTE - Product Detail Page
 * JavaScript Functionality
 */

// DOM Elements
const mainImage = document.getElementById('mainImage');
const thumbnails = document.querySelectorAll('.thumbnail');
const videoThumbs = document.querySelectorAll('.video-thumb');
const qtySelect = document.getElementById('qtySelect');
const qtyMinus = document.getElementById('qtyMinus');
const qtyPlus = document.getElementById('qtyPlus');
const addToCartBtn = document.getElementById('addToCartBtn');
const buyNowBtn = document.getElementById('buyNowBtn');
const giftReceipt = document.getElementById('giftReceipt');
const cartCount = document.querySelector('.cart-count');
const toast = document.getElementById('toast');
const toastMsg = document.querySelector('.toast-msg');
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

let cartItemCount = 0;

// ============================================
// IMAGE GALLERY
// ============================================
thumbnails.forEach(thumb => {
    thumb.addEventListener('click', function() {
        // Remove active class from all
        thumbnails.forEach(t => t.classList.remove('active'));
        // Add active to clicked
        this.classList.add('active');

        // Change main image with fade effect
        const imageSrc = this.getAttribute('data-image');
        const img = mainImage;

        // Fade out
        img.style.opacity = '0';

        setTimeout(() => {
            img.src = imageSrc;
            // Fade in when loaded
            img.onload = () => {
                img.style.opacity = '1';
            };
            // Fallback in case onload doesn't fire
            setTimeout(() => {
                img.style.opacity = '1';
            }, 300);
        }, 300);
    });
});

// ============================================
// VIDEO GALLERY
// ============================================
let currentVideo = null;

videoThumbs.forEach(videoThumb => {
    videoThumb.addEventListener('click', function() {
        const videoSrc = this.getAttribute('data-video');
        
        // Remove play icon from all
        videoThumbs.forEach(v => v.querySelector('.play-icon').style.display = 'flex');
        
        // Hide play icon on current
        this.querySelector('.play-icon').style.display = 'none';
        
        // Create or update video modal
        showVideoModal(videoSrc);
    });
});

function showVideoModal(videoSrc) {
    // Close existing video if playing
    if (currentVideo) {
        currentVideo.pause();
        currentVideo.remove();
    }
    
    // Create video element
    currentVideo = document.createElement('video');
    currentVideo.src = videoSrc;
    currentVideo.controls = true;
    currentVideo.autoplay = true;
    currentVideo.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        max-width: 90%;
        max-height: 90%;
        z-index: 3000;
        border-radius: 12px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.5);
    `;
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        z-index: 2999;
    `;
    
    // Close on overlay click
    overlay.addEventListener('click', () => {
        currentVideo.pause();
        currentVideo.remove();
        overlay.remove();
        currentVideo = null;
        
        // Show all play icons
        videoThumbs.forEach(v => v.querySelector('.play-icon').style.display = 'flex');
    });
    
    document.body.appendChild(overlay);
    document.body.appendChild(currentVideo);
}

// ============================================
// QUANTITY SELECTOR
// ============================================
function updateQuantity(change) {
    const currentIndex = qtySelect.selectedIndex;
    const newIndex = currentIndex + change;
    
    if (newIndex >= 0 && newIndex < qtySelect.options.length) {
        qtySelect.selectedIndex = newIndex;
    }
}

qtyMinus.addEventListener('click', () => updateQuantity(-1));
qtyPlus.addEventListener('click', () => updateQuantity(1));

qtySelect.addEventListener('change', function() {
    console.log('Quantity selected:', this.value);
});

// ============================================
// ADD TO CART
// ============================================
function showToast(message) {
    toastMsg.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

addToCartBtn.addEventListener('click', function() {
    const quantity = parseInt(qtySelect.value) || 1;
    const isGift = giftReceipt.checked;
    
    cartItemCount += quantity;
    cartCount.textContent = cartItemCount;
    
    let message = `${quantity} item${quantity > 1 ? 's' : ''} added to cart!`;
    if (isGift) {
        message += ' Gift receipt included.';
    }
    
    showToast(message);
    
    // Button animation
    const originalContent = this.innerHTML;
    this.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        Added!
    `;
    this.style.background = '#27ae60';
    
    setTimeout(() => {
        this.innerHTML = originalContent;
        this.style.background = '';
    }, 2000);
});

// ============================================
// BUY NOW
// ============================================
buyNowBtn.addEventListener('click', function() {
    const quantity = parseInt(qtySelect.value) || 1;
    const isGift = giftReceipt.checked;
    
    showToast(`Proceeding to checkout with ${quantity} item${quantity > 1 ? 's' : ''}...`);
    
    // Simulate redirect to checkout
    setTimeout(() => {
        console.log('Redirecting to checkout...');
        // window.location.href = 'checkout.html';
    }, 1500);
});

// ============================================
// MOBILE MENU
// ============================================
mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ============================================
// HEADER SCROLL EFFECT
// ============================================
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ============================================
// SIMILAR PRODUCTS CLICK
// ============================================
document.querySelectorAll('.similar-item').forEach(item => {
    item.addEventListener('click', function() {
        const productName = this.querySelector('.similar-name').textContent;
        showToast(`Viewing ${productName}...`);
        // window.location.href = 'product-detail-2.html';
    });
});

// ============================================
// IMAGE ZOOM ON HOVER (Desktop) - DISABLED
// Images ab properly display ho rahi hain without zoom
// ============================================
// if (window.innerWidth > 1024) {
//     const mainImageContainer = document.querySelector('.main-image');
//     mainImageContainer.addEventListener('mousemove', (e) => {
//         const img = mainImageContainer.querySelector('img');
//         const rect = mainImageContainer.getBoundingClientRect();
//         const x = (e.clientX - rect.left) / rect.width;
//         const y = (e.clientY - rect.top) / rect.height;
//         img.style.transformOrigin = `${x * 100}% ${y * 100}%`;
//         img.style.transform = 'scale(1.5)';
//     });
//     mainImageContainer.addEventListener('mouseleave', () => {
//         const img = mainImageContainer.querySelector('img');
//         img.style.transformOrigin = 'center center';
//         img.style.transform = 'scale(1)';
//     });
// }

// ============================================
// KEYBOARD NAVIGATION
// ============================================
document.addEventListener('keydown', (e) => {
    // Close video modal with Escape
    if (e.key === 'Escape' && currentVideo) {
        currentVideo.pause();
        currentVideo.remove();
        currentVideo = null;
        
        videoThumbs.forEach(v => v.querySelector('.play-icon').style.display = 'flex');
    }
});

// ============================================
// SHARE FUNCTIONALITY
// ============================================
async function shareProduct() {
    if (navigator.share) {
        try {
            await navigator.share({
                title: 'Silicute Ceramic Elevated Bowls',
                text: 'Check out this amazing pet product!',
                url: window.location.href
            });
        } catch (err) {
            console.log('Share canceled');
        }
    } else {
        // Copy to clipboard
        navigator.clipboard.writeText(window.location.href);
        showToast('Link copied to clipboard!');
    }
}

// ============================================
// INITIALIZE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Product detail page loaded!');
    
    // Add fade-in animation to main image
    mainImage.style.opacity = '1';
});
