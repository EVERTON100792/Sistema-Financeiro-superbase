// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTopBtn = document.getElementById('back-to-top');
const contactForm = document.getElementById('contact-form');
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
    initializeContactForm();
    initializeLightbox();
    initializeAnimations();
    initializeBudgetCalculator();
    
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
    }, 500);
}

// Navigation
function initializeNavigation() {
    // Mobile menu toggle
    navToggle.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
            highlightActiveNavLink(link);
        });
    });
    
    // Scroll event for navbar
    window.addEventListener('scroll', handleNavbarScroll);
    
    // Smooth scroll for navigation links
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
    
    // Scroll indicator in hero
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
    
    // Update active nav link based on scroll position
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
    // Back to top button
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
    
    // Parallax effect for hero background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .step-item, .value-item, .info-card');
    animateElements.forEach(el => observer.observe(el));
}

// Portfolio
function initializePortfolio() {
    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            // Update active filter button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter portfolio items
            filterPortfolioItems(filter);
            
            // Update filtered images for lightbox
            updateFilteredImages(filter);
        });
    });
    
    // Portfolio item hover effects
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

// Contact Form
function initializeContactForm() {
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Form validation
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
    
    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', formatPhoneNumber);
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
        return;
    }
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = contactForm.querySelector('.form-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Success message
        showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Send WhatsApp message (optional)
        sendWhatsAppMessage(data);
    }, 2000);
}

function validateForm() {
    const requiredFields = contactForm.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField({ target: field })) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';
    
    // Clear previous errors
    clearFieldError({ target: field });
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        errorMessage = 'Este campo é obrigatório';
        isValid = false;
    }
    
    // Email validation
    if (fieldName === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            errorMessage = 'Email inválido';
            isValid = false;
        }
    }
    
    // Phone validation
    if (fieldName === 'phone' && value) {
        const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
        if (!phoneRegex.test(value)) {
            errorMessage = 'Telefone inválido. Use o formato: (11) 99999-9999';
            isValid = false;
        }
    }
    
    // Show error if invalid
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    field.style.borderColor = 'var(--accent-red)';
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error message
    const errorElement = document.createElement('span');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.color = 'var(--accent-red)';
    errorElement.style.fontSize = '0.8rem';
    errorElement.style.marginTop = '5px';
    errorElement.style.display = 'block';
    
    field.parentNode.appendChild(errorElement);
}

function clearFieldError(e) {
    const field = e.target;
    field.style.borderColor = 'var(--border-gray)';
    
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

function formatPhoneNumber(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length >= 11) {
        value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (value.length >= 7) {
        value = value.replace(/(\d{2})(\d{4})(\d+)/, '($1) $2-$3');
    } else if (value.length >= 3) {
        value = value.replace(/(\d{2})(\d+)/, '($1) $2');
    }
    
    e.target.value = value;
}

function sendWhatsAppMessage(data) {
    const message = `
Olá! Gostaria de agendar uma consulta no Magrelo Tattoo.

*Nome:* ${data.name}
*Telefone:* ${data.phone}
*Email:* ${data.email}
*Serviço:* ${data.service || 'Não especificado'}
*Orçamento:* ${data.budget || 'Não especificado'}

*Descrição da ideia:*
${data.message}

Aguardo retorno. Obrigado!
    `.trim();
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab after a delay
    setTimeout(() => {
        window.open(whatsappUrl, '_blank');
    }, 1000);
}

// Lightbox
function initializeLightbox() {
    // Open lightbox when clicking portfolio items
    portfolioItems.forEach((item, index) => {
        const btn = item.querySelector('.portfolio-btn');
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                openLightbox(item, index);
            });
        }
        
        // Also open on image click
        item.addEventListener('click', () => {
            openLightbox(item, index);
        });
    });
    
    // Close lightbox
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Navigation
    lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
    lightboxNext.addEventListener('click', () => navigateLightbox(1));
    
    // Keyboard navigation
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
    
    // Find current image index in filtered array
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
    
    // Hide navigation if only one image
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
    // Counter animation for stats
    const statsNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    });
    
    statsNumbers.forEach(num => statsObserver.observe(num));
    
    // Typing effect for hero subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle && !isLoading) {
        setTimeout(() => {
            typeWriter(heroSubtitle, heroSubtitle.textContent, 100);
        }, 1000);
    }
    
    // Stagger animation for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    const servicesObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                servicesObserver.unobserve(entry.target);
            }
        });
    });
    
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        servicesObserver.observe(card);
    });
}

function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/\D/g, ''));
    const duration = 2000;
    const increment = target / (duration / 50);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = element.textContent.replace(/\d+/, target);
            clearInterval(timer);
        } else {
            element.textContent = element.textContent.replace(/\d+/, Math.floor(current));
        }
    }, 50);
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
    const calculatorResult = document.getElementById('calculator-result');
    
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
    
    // Validate all fields are selected
    if (!style.value || !size.value || !complexity.value || !bodyArea.value || !colors.value) {
        showNotification('Por favor, preencha todos os campos para calcular o orçamento.', 'warning');
        return;
    }
    
    // Get base price from style
    const basePrice = getBasePrice(style.value);
    
    // Get time estimate from size
    const timeRange = getTimeRange(size.value);
    
    // Get multipliers
    const styleMultiplier = parseFloat(style.selectedOptions[0].dataset.multiplier) || 1;
    const complexityMultiplier = parseFloat(complexity.selectedOptions[0].dataset.multiplier) || 1;
    const areaMultiplier = parseFloat(bodyArea.selectedOptions[0].dataset.multiplier) || 1;
    const colorMultiplier = parseFloat(colors.selectedOptions[0].dataset.multiplier) || 1;
    
    // Calculate final price
    const totalMultiplier = styleMultiplier * complexityMultiplier * areaMultiplier * colorMultiplier;
    const hourlyRate = basePrice * totalMultiplier;
    
    const minPrice = Math.round(hourlyRate * timeRange.min);
    const maxPrice = Math.round(hourlyRate * timeRange.max);
    
    // Update result display
    document.getElementById('price-min').textContent = `R$ ${minPrice.toLocaleString()}`;
    document.getElementById('price-max').textContent = `R$ ${maxPrice.toLocaleString()}`;
    document.getElementById('time-estimate').textContent = `${timeRange.min}-${timeRange.max}h`;
    document.getElementById('hourly-rate').textContent = `R$ ${Math.round(hourlyRate)}`;
    
    // Show result with animation
    resultDiv.style.display = 'block';
    setTimeout(() => {
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
    
    showNotification('Orçamento calculado com sucesso!', 'success');
}

function getBasePrice(style) {
    const basePrices = {
        'traditional': 200,
        'realistic': 400,
        'minimal': 150,
        'geometric': 250,
        'watercolor': 300,
        'lettering': 180
    };
    return basePrices[style] || 200;
}

function getTimeRange(size) {
    const timeRanges = {
        'small': { min: 1, max: 2 },
        'medium': { min: 2, max: 4 },
        'large': { min: 4, max: 6 },
        'xlarge': { min: 6, max: 8 }
    };
    return timeRanges[size] || { min: 1, max: 2 };
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 10001;
        background: ${type === 'success' ? 'var(--accent-gold)' : type === 'error' ? 'var(--accent-red)' : 'var(--secondary-black)'};
        color: ${type === 'success' ? 'var(--primary-black)' : 'var(--text-white)'};
        padding: 15px 20px;
        border-radius: var(--border-radius);
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
        border: 1px solid ${type === 'success' ? 'var(--accent-gold)' : type === 'error' ? 'var(--accent-red)' : 'var(--border-gray)'};
    `;
    
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        gap: 15px;
    `;
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    const autoRemove = setTimeout(() => {
        removeNotification(notification);
    }, 5000);
    
    // Manual close
    closeBtn.addEventListener('click', () => {
        clearTimeout(autoRemove);
        removeNotification(notification);
    });
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 300);
}

// Utility Functions
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Error Handling
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    // You could send error reports to a logging service here
});

// Performance Monitoring
window.addEventListener('load', () => {
    // Performance metrics
    const loadTime = performance.now();
    console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
    
    // Report Core Web Vitals
    if ('web-vital' in window) {
        // Implementation would depend on web-vitals library
    }
});

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when you have a service worker file
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}

// Export functions for external use
window.MagreloTattoo = {
    openLightbox,
    closeLightbox,
    showNotification,
    toggleMobileMenu
};
