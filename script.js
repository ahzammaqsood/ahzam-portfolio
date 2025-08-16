// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeLoading();
    initializeNavigation();
    initializeThemeToggle();
    initializeMobileMenu();
    initializeScrollEffects();
    initializeAnimations();
    initializeParticles();
    initializeWorkFilters();
    initializeContactForm();
    initializeModals();
    initializeBackToTop();
    initializeSkillBars();
    initializeCounters();
});

// Loading Screen
function initializeLoading() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Hide loading screen after page load
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1000);
    });
}

// Navigation
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            if (document.body.classList.contains('dark-theme')) {
                navbar.style.background = 'rgba(17, 24, 39, 0.98)';
            }
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            if (document.body.classList.contains('dark-theme')) {
                navbar.style.background = 'rgba(17, 24, 39, 0.95)';
            }
        }
    });
    
    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveLink() {
        const scrollPos = window.scrollY + 100;
        
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
    
    window.addEventListener('scroll', updateActiveLink);
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
}

// Theme Toggle
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.className = savedTheme + '-theme';
    
    themeToggle.addEventListener('click', function() {
        if (body.classList.contains('light-theme')) {
            body.className = 'dark-theme';
            localStorage.setItem('theme', 'dark');
        } else {
            body.className = 'light-theme';
            localStorage.setItem('theme', 'light');
        }
        
        // Update navbar background
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            if (body.classList.contains('dark-theme')) {
                navbar.style.background = 'rgba(17, 24, 39, 0.98)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            }
        }
    });
}

// Mobile Menu
function initializeMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    mobileMenuToggle.addEventListener('click', function() {
        mobileMenuToggle.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('active');
        document.body.style.overflow = mobileMenuOverlay.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile menu when clicking overlay
    mobileMenuOverlay.addEventListener('click', function(e) {
        if (e.target === mobileMenuOverlay) {
            closeMobileMenu();
        }
    });
    
    // Close mobile menu when clicking nav links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    function closeMobileMenu() {
        mobileMenuToggle.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Make closeMobileMenu globally accessible
    window.closeMobileMenu = closeMobileMenu;
}

// Scroll Effects
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.service-card, .work-item, .stat-item, .timeline-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Animations
function initializeAnimations() {
    // Add staggered animation delays
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    const workItems = document.querySelectorAll('.work-item');
    workItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
}

// Particles Background
function initializeParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 1 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'rgba(59, 130, 246, 0.3)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${Math.random() * 3 + 2}s ease-in-out infinite alternate`;
        
        particlesContainer.appendChild(particle);
    }
    
    // Add floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% { transform: translateY(0px) translateX(0px); opacity: 0.7; }
            100% { transform: translateY(-20px) translateX(10px); opacity: 0.3; }
        }
    `;
    document.head.appendChild(style);
}

// Work Filters
function initializeWorkFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const workItems = document.querySelectorAll('.work-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter work items
            workItems.forEach(item => {
                const category = item.dataset.category;
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Contact Form
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!data.name || !data.email || !data.message) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        if (!isValidEmail(data.email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 2000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Animate out and remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 4000);
    }
}

// Modals
function initializeModals() {
    const modal = document.getElementById('project-modal');
    const modalClose = document.querySelector('.modal-close');
    const modalBody = document.getElementById('modal-body');
    
    // Project data
    const projectData = {
        kapray: {
            title: 'KaprayOfficial E-commerce Platform',
            image: 'ecommerce-bg',
            description: 'A comprehensive e-commerce solution built for KaprayOfficial, a leading fashion retailer in Pakistan. The platform features modern design, seamless user experience, and robust backend functionality.',
            challenge: 'The client needed a complete e-commerce solution that could handle high traffic, provide excellent user experience, and integrate with local payment gateways in Pakistan.',
            solution: 'Developed a full-stack e-commerce platform using React for the frontend and Node.js for the backend. Implemented features like product catalog, shopping cart, user authentication, order management, and payment integration.',
            results: [
                '300% increase in online sales',
                '50% reduction in cart abandonment',
                '40% improvement in page load speed',
                '95% customer satisfaction rating'
            ],
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'AWS'],
            duration: '3 months',
            role: 'Full-Stack Developer & Digital Marketing Strategist'
        },
        marketing: {
            title: 'Digital Marketing Campaign',
            image: 'marketing-bg',
            description: 'A comprehensive digital marketing campaign that transformed a local business\'s online presence and drove significant growth in brand awareness and sales.',
            challenge: 'The client had minimal online presence and was struggling to reach their target audience effectively. They needed a complete digital marketing overhaul.',
            solution: 'Implemented a multi-channel digital marketing strategy including SEO optimization, social media marketing, Google Ads campaigns, and content marketing. Created engaging content and optimized all digital touchpoints.',
            results: [
                '300% increase in brand visibility',
                '250% growth in website traffic',
                '180% increase in lead generation',
                '400% ROI on marketing spend'
            ],
            technologies: ['Google Ads', 'Facebook Ads', 'SEO Tools', 'Analytics', 'Content Management'],
            duration: '6 months',
            role: 'Digital Marketing Strategist'
        },
        taskapp: {
            title: 'Task Management Mobile App',
            image: 'webapp-bg',
            description: 'A cross-platform mobile application designed for team collaboration and project management. Features real-time updates, task tracking, and team communication tools.',
            challenge: 'Teams needed a mobile-first solution for project management that could work offline and sync across devices with real-time collaboration features.',
            solution: 'Built a React Native application with Firebase backend for real-time data synchronization. Implemented features like task creation, assignment, progress tracking, team chat, and push notifications.',
            results: [
                '90% improvement in team productivity',
                '60% reduction in project delays',
                '85% user adoption rate',
                '4.8/5 app store rating'
            ],
            technologies: ['React Native', 'Firebase', 'Redux', 'Push Notifications', 'Offline Storage'],
            duration: '4 months',
            role: 'Mobile App Developer'
        },
        restaurant: {
            title: 'Restaurant Ordering System',
            image: 'restaurant-bg',
            description: 'An online food ordering platform that connects local restaurants with customers, featuring menu management, order tracking, and delivery integration.',
            challenge: 'Local restaurants needed a digital solution to manage online orders, track deliveries, and provide customers with a seamless ordering experience.',
            solution: 'Developed a comprehensive web application using Vue.js and Laravel. Integrated payment gateways, real-time order tracking, inventory management, and delivery partner APIs.',
            results: [
                '200% increase in online orders',
                '35% reduction in order errors',
                '45% improvement in delivery time',
                '92% customer satisfaction'
            ],
            technologies: ['Vue.js', 'Laravel', 'MySQL', 'Payment Gateway', 'Maps API'],
            duration: '2.5 months',
            role: 'Full-Stack Developer'
        },
        portfolio: {
            title: 'Professional Portfolio Website',
            image: 'portfolio-bg',
            description: 'A modern, responsive portfolio website showcasing advanced web development skills with smooth animations, dark mode, and optimized performance.',
            challenge: 'Create a portfolio that stands out from the competition while demonstrating technical skills and providing excellent user experience across all devices.',
            solution: 'Built a custom portfolio using modern HTML5, CSS3, and JavaScript with advanced animations, responsive design, and performance optimizations. Implemented dark/light mode toggle and accessibility features.',
            results: [
                '95+ Lighthouse performance score',
                '100% mobile responsiveness',
                '50% increase in client inquiries',
                'WCAG 2.1 AA accessibility compliance'
            ],
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'GSAP', 'Intersection Observer'],
            duration: '1 month',
            role: 'Frontend Developer & Designer'
        },
        seo: {
            title: 'SEO Optimization Project',
            image: 'seo-bg',
            description: 'A comprehensive SEO strategy implementation that dramatically improved a local business website\'s search engine rankings and organic traffic.',
            challenge: 'The client\'s website had poor search engine visibility, slow loading times, and was not ranking for relevant keywords in their industry.',
            solution: 'Conducted comprehensive SEO audit, implemented technical SEO improvements, optimized on-page content, built high-quality backlinks, and created content strategy aligned with search intent.',
            results: [
                '250% increase in organic traffic',
                '180% improvement in keyword rankings',
                '65% increase in conversion rate',
                'Page 1 rankings for 15+ target keywords'
            ],
            technologies: ['Technical SEO', 'Content Strategy', 'Link Building', 'Analytics', 'Keyword Research'],
            duration: '4 months',
            role: 'SEO Specialist & Content Strategist'
        }
    };
    
    // Make openProjectModal globally accessible
    window.openProjectModal = function(projectId) {
        const project = projectData[projectId];
        if (!project) return;
        
        modalBody.innerHTML = `
            <div class="modal-project">
                <div class="modal-header">
                    <div class="modal-project-image ${project.image}">
                        <div class="modal-project-overlay">
                            <h2>${project.title}</h2>
                        </div>
                    </div>
                </div>
                <div class="modal-content-body">
                    <div class="project-info">
                        <div class="project-meta">
                            <div class="meta-item">
                                <strong>Duration:</strong> ${project.duration}
                            </div>
                            <div class="meta-item">
                                <strong>Role:</strong> ${project.role}
                            </div>
                        </div>
                        
                        <div class="project-section">
                            <h3>Project Overview</h3>
                            <p>${project.description}</p>
                        </div>
                        
                        <div class="project-section">
                            <h3>Challenge</h3>
                            <p>${project.challenge}</p>
                        </div>
                        
                        <div class="project-section">
                            <h3>Solution</h3>
                            <p>${project.solution}</p>
                        </div>
                        
                        <div class="project-section">
                            <h3>Results</h3>
                            <ul class="results-list">
                                ${project.results.map(result => `<li>${result}</li>`).join('')}
                            </ul>
                        </div>
                        
                        <div class="project-section">
                            <h3>Technologies Used</h3>
                            <div class="tech-tags">
                                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    };
    
    // Close modal
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
    
    // Add modal styles
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .modal-project-image {
            height: 300px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            border-radius: 20px 20px 0 0;
        }
        
        .modal-project-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.6);
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 20px 20px 0 0;
        }
        
        .modal-project-overlay h2 {
            color: white;
            font-size: 2rem;
            font-weight: 700;
            text-align: center;
            padding: 0 20px;
        }
        
        .modal-content-body {
            padding: 40px;
        }
        
        .project-meta {
            display: flex;
            gap: 30px;
            margin-bottom: 30px;
            padding: 20px;
            background: var(--bg-secondary);
            border-radius: 10px;
        }
        
        .meta-item {
            color: var(--text-secondary);
        }
        
        .meta-item strong {
            color: var(--text-primary);
        }
        
        .project-section {
            margin-bottom: 30px;
        }
        
        .project-section h3 {
            font-size: 1.3rem;
            font-weight: 700;
            margin-bottom: 15px;
            color: var(--primary-color);
        }
        
        .project-section p {
            color: var(--text-secondary);
            line-height: 1.7;
        }
        
        .results-list {
            list-style: none;
            padding: 0;
        }
        
        .results-list li {
            color: var(--text-secondary);
            padding: 8px 0;
            padding-left: 25px;
            position: relative;
        }
        
        .results-list li::before {
            content: '✓';
            position: absolute;
            left: 0;
            color: var(--primary-color);
            font-weight: bold;
        }
        
        .tech-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }
        
        .tech-tag {
            background: var(--bg-tertiary);
            color: var(--text-secondary);
            padding: 8px 15px;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 500;
        }
        
        @media (max-width: 768px) {
            .modal-content-body {
                padding: 20px;
            }
            
            .project-meta {
                flex-direction: column;
                gap: 15px;
            }
        }
    `;
    document.head.appendChild(modalStyles);
}

// Back to Top Button
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Skill Bars Animation
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.dataset.width;
                entry.target.style.width = width;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Counter Animation
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.count);
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
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

// Performance Optimization
function initializePerformanceOptimizations() {
    // Lazy load images when they come into view
    const images = document.querySelectorAll('img[data-src]');
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
    
    images.forEach(img => imageObserver.observe(img));
    
    // Preload critical resources
    const preloadLinks = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
    ];
    
    preloadLinks.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        document.head.appendChild(link);
    });
}

// Initialize performance optimizations
initializePerformanceOptimizations();

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
});

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

document.addEventListener("DOMContentLoaded", function () {
  new Typed("#typed-text", {
    strings: [
      "<span class='white'>Hi, I'm Ahzam Maqsood",
      "<span class='blue'>Digital Marketer</span>",
      "<span class='yellow'>Full-Stack Developer</span>"
    ],
    typeSpeed: 70,
    backSpeed: 40,
    backDelay: 1500,
    loop: true,
    showCursor: true,
    cursorChar: "|",
    contentType: "html"  // zaroori hai taake <span> colors render ho
  });
});