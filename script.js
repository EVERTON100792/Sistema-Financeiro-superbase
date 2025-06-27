// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTopBtn = document.getElementById('back-to-top');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const filterBtns = document.querySelectorAll('.filter-btn');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxCategory = document.getElementById('lightbox-category');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');

// Global Variables
let currentImageIndex = 0;
let filteredImages = [];
let isLoading = true;

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    // Hide loading screen after content loads
    setTimeout(() => {
        hideLoadingScreen();
    }, 3000);
    
    // Initialize all components
    initializeNavigation();
    initializeScrollEffects();
    initializePortfolio();
    initializeLightbox();
    initializeAnimations();
    initializeBudgetCalculator();
    initializeSocialMedia();
    
    // Update filtered images initially
    updateFilteredImages();
});

// Loading Screen
function hideLoadingScreen() {
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
        loadingScreen.style.display = 'none';
        isLoading = false;
        document.body.style.overflow = 'visible';
        
        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (heroSubtitle) {
            typeWriter(heroSubtitle, heroSubtitle.textContent, 100);
        }
    }, 500);
}

// Navigation
function initializeNavigation() {
    navToggle.addEventListener('click', toggleMobileMenu);
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
            highlightActiveNavLink(link);
        });
    });
    
    window.addEventListener('scroll', handleNavbarScroll);
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

function toggleMobileMenu() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'visible';
}

function closeMobileMenu() {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = 'visible';
}

function handleNavbarScroll() {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    updateActiveNavLink();
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

function highlightActiveNavLink(clickedLink) {
    navLinks.forEach(link => link.classList.remove('active'));
    clickedLink.classList.add('active');
}

// Scroll Effects
function initializeScrollEffects() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const animateElements = document.querySelectorAll('.portfolio-item, .step-item, .value-item, .info-card');
    animateElements.forEach(el => observer.observe(el));
}

// Portfolio
function initializePortfolio() {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            filterPortfolioItems(filter);
            
            updateFilteredImages(filter);
        });
    });
    
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
        });
    });
}

function filterPortfolioItems(filter) {
    portfolioItems.forEach(item => {
        const category = item.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
            item.style.display = 'block';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, 100);
        } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        }
    });
}

function updateFilteredImages(filter = 'all') {
    filteredImages = [];
    portfolioItems.forEach((item, index) => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
            const img = item.querySelector('img');
            const title = item.querySelector('h4').textContent;
            const categoryText = item.querySelector('p').textContent;
            
            filteredImages.push({
                src: img.src,
                alt: img.alt,
                title: title,
                category: categoryText,
                originalIndex: index
            });
        }
    });
}

// Lightbox
function initializeLightbox() {
    portfolioItems.forEach((item, index) => {
        const btn = item.querySelector('.portfolio-btn');
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                openLightbox(item, index);
            });
        }
        
        item.addEventListener('click', () => {
            openLightbox(item, index);
        });
    });
    
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
    lightboxNext.addEventListener('click', () => navigateLightbox(1));
    
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            switch (e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    navigateLightbox(-1);
                    break;
                case 'ArrowRight':
                    navigateLightbox(1);
                    break;
            }
        }
    });
}

function openLightbox(item, index = 0) {
    const img = item.querySelector('img');
    const title = item.querySelector('h4')?.textContent || 'Sem título';
    const category = item.querySelector('p')?.textContent || 'Categoria';
    
    currentImageIndex = filteredImages.findIndex(imgData => imgData.src === img.src);
    if (currentImageIndex === -1) currentImageIndex = 0;
    
    updateLightboxContent();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'visible';
}

function navigateLightbox(direction) {
    currentImageIndex += direction;
    
    if (currentImageIndex >= filteredImages.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = filteredImages.length - 1;
    }
    
    updateLightboxContent();
}

function updateLightboxContent() {
    if (filteredImages.length === 0) return;
    
    const currentImage = filteredImages[currentImageIndex];
    lightboxImage.src = currentImage.src;
    lightboxImage.alt = currentImage.alt;
    lightboxTitle.textContent = currentImage.title;
    lightboxCategory.textContent = currentImage.category;
    
    if (filteredImages.length <= 1) {
        lightboxPrev.style.display = 'none';
        lightboxNext.style.display = 'none';
    } else {
        lightboxPrev.style.display = 'block';
        lightboxNext.style.display = 'block';
    }
}

// Animations
function initializeAnimations() {
    const statsNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });
    
    statsNumbers.forEach(num => statsObserver.observe(num));
    
    const serviceCards = document.querySelectorAll('.service-card');
    const servicesObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        servicesObserver.observe(card);
    });
}

function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/\D/g, ''));
    const duration = 2000;
    if (isNaN(target)) return;
    
    let start = 0;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = element.textContent.replace(/[\d,]+/, target.toLocaleString());
            clearInterval(timer);
        } else {
            element.textContent = element.textContent.replace(/[\d,]+/, Math.floor(start).toLocaleString());
        }
    }, stepTime);
}

function typeWriter(element, text, speed) {
    element.textContent = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Budget Calculator
function initializeBudgetCalculator() {
    const calculateBtn = document.getElementById('calculate-budget');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateBudget);
    }
}

function calculateBudget() {
    const style = document.getElementById('tattoo-style');
    const size = document.getElementById('tattoo-size');
    const complexity = document.getElementById('complexity');
    const bodyArea = document.getElementById('body-area');
    const colors = document.getElementById('colors');
    const resultDiv = document.getElementById('calculator-result');
    
    if (!style.value || !size.value || !complexity.value || !bodyArea.value || !colors.value) {
        showNotification('Por favor, preencha todos os campos para calcular o orçamento.', 'warning');
        return;
    }
    
    const basePrice = getBasePrice(style.value);
    const timeRange = getTimeRange(size.value);
    
    const styleMultiplier = parseFloat(style.selectedOptions[0].dataset.multiplier) || 1;
    const complexityMultiplier = parseFloat(complexity.selectedOptions[0].dataset.multiplier) || 1;
    const areaMultiplier = parseFloat(bodyArea.selectedOptions[0].dataset.multiplier) || 1;
    const colorMultiplier = parseFloat(colors.selectedOptions[0].dataset.multiplier) || 1;
    
    const totalMultiplier = styleMultiplier * complexityMultiplier * areaMultiplier * colorMultiplier;
    const hourlyRate = basePrice * totalMultiplier;
    
    const minPrice = Math.round(hourlyRate * timeRange.min);
    const maxPrice = Math.round(hourlyRate * timeRange.max);
    
    document.getElementById('price-min').textContent = `R$ ${minPrice.toLocaleString()}`;
    document.getElementById('price-max').textContent = `R$ ${maxPrice.toLocaleString()}`;
    document.getElementById('time-estimate').textContent = `${timeRange.min}-${timeRange.max}h`;
    document.getElementById('hourly-rate').textContent = `R$ ${Math.round(hourlyRate)}`;
    
    resultDiv.style.display = 'block';
    setTimeout(() => {
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
    
    showNotification('Orçamento estimado com sucesso!', 'success');
}

function getBasePrice(style) {
    const basePrices = {
        'traditional': 200, 'realistic': 400, 'minimal': 150,
        'geometric': 250, 'watercolor': 300, 'lettering': 180
    };
    return basePrices[style] || 200;
}

function getTimeRange(size) {
    const timeRanges = {
        'small': { min: 1, max: 2 }, 'medium': { min: 2, max: 4 },
        'large': { min: 4, max: 6 }, 'xlarge': { min: 6, max: 8 }
    };
    return timeRanges[size] || { min: 1, max: 2 };
}

// Notification System
function showNotification(message, type = 'info') {
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    const iconClass = type === 'success' ? 'fa-check-circle' : (type === 'error' || type === 'warning' ? 'fa-exclamation-circle' : 'fa-info-circle');
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${iconClass}"></i>
            <span>${message}</span>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        </div>`;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    const autoRemove = setTimeout(() => {
        removeNotification(notification);
    }, 5000);
    
    notification.querySelector('.notification-close').addEventListener('click', () => {
        clearTimeout(autoRemove);
        removeNotification(notification);
    });
}

function removeNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 300);
}

// Social Media Links
function initializeSocialMedia() {
    // A correção principal foi feita diretamente no HTML com `target="_blank"`.
    // Esta função pode ser usada para futuras manipulações se necessário.
    document.querySelectorAll('.social-link').forEach(link => {
        link.setAttribute('rel', 'noopener noreferrer'); // Boa prática de segurança
    });
}
