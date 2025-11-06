// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Close mobile menu if open
            const nav = document.querySelector('.nav');
            const hamburger = document.querySelector('.hamburger');
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                hamburger.classList.remove('active');
            }
            
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const nav = document.querySelector('.navbar');
const navControls = document.querySelector('.nav-controls');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        const isActive = hamburger.classList.contains('active');
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        nav.classList.toggle('active');
        
        // Keep nav controls visible on mobile (they're at the bottom now)
        // No need to hide/show them anymore
        
        // Update aria-expanded for accessibility
        hamburger.setAttribute('aria-expanded', !isActive);
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger) {
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
        navMenu.classList.remove('active');
        nav.classList.remove('active');
        
        // Nav controls stay visible (positioned at bottom on mobile)
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (hamburger && navMenu && !hamburger.contains(e.target) && !navMenu.contains(e.target) && !navControls?.contains(e.target)) {
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
        nav.classList.remove('active');
        
        // Nav controls stay visible (positioned at bottom on mobile)
    }
});

// Handle window resize to ensure controls are visible on desktop
window.addEventListener('resize', () => {
    const navControls = document.querySelector('.nav-controls');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    // Close mobile menu if open when resizing to desktop
    if (window.innerWidth > 768) {
        // Close mobile menu if open
        if (hamburger && navMenu && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.querySelector('.navbar')?.classList.remove('active');
        }
    }
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.proposition-card, .palette-card, .strategy-card, .service-card, .portfolio-item, .testimonial-card, .intro-card, .feature-box, .nom-card').forEach(el => {
    observer.observe(el);
});

// Color palette animation
function animateColorPalettes() {
    const colorItems = document.querySelectorAll('.color-item');
    colorItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 200);
    });
}

// Trigger color palette animation when couleurs section is visible
const couleursSection = document.querySelector('.couleurs');
const couleursObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateColorPalettes();
            couleursObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (couleursSection) {
    couleursObserver.observe(couleursSection);
}

// Strategy cards animation
function animateStrategyCards() {
    const strategySections = document.querySelectorAll('.strategy-section');
    strategySections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            section.style.transition = 'all 0.6s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 300);
    });
}

// Trigger strategy animation when strategies section is visible
const strategiesSection = document.querySelector('.strategies');
const strategiesObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStrategyCards();
            strategiesObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (strategiesSection) {
    strategiesObserver.observe(strategiesSection);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// FAQ Toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});

// Add loading animation to cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.proposition-card, .palette-card, .strategy-card, .service-card, .portfolio-item, .testimonial-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Interactive color palette
document.querySelectorAll('.color').forEach(color => {
    color.addEventListener('click', () => {
        const colorValue = color.style.backgroundColor;
        const colorName = getColorName(colorValue);
        
        // Create a temporary tooltip
        const tooltip = document.createElement('div');
        tooltip.textContent = colorName;
        tooltip.style.cssText = `
            position: absolute;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 5px 10px;
            border-radius: 5px;
            font-size: 12px;
            pointer-events: none;
            z-index: 1000;
        `;
        
        document.body.appendChild(tooltip);
        
        // Position tooltip
        const rect = color.getBoundingClientRect();
        tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
        
        // Remove tooltip after 2 seconds
        setTimeout(() => {
            document.body.removeChild(tooltip);
        }, 2000);
    });
});

// Get color name from hex value
function getColorName(hex) {
    const colorMap = {
        'rgb(45, 80, 22)': 'Vert Olive Profond',
        'rgb(139, 69, 19)': 'Terre Cuite',
        'rgb(184, 134, 11)': 'Or Mat',
        'rgb(245, 245, 220)': 'Blanc Cassé',
        'rgb(160, 82, 45)': 'Brun Chaud',
        'rgb(255, 215, 0)': 'Or Premium',
        'rgb(80, 200, 120)': 'Vert Émeraude',
        'rgb(28, 28, 28)': 'Noir Profond',
        'rgb(255, 255, 255)': 'Blanc Pur',
        'rgb(192, 192, 192)': 'Argent'
    };
    
    return colorMap[hex] || 'Couleur personnalisée';
}

// Add hover effects to cards
document.querySelectorAll('.proposition-card, .palette-card, .strategy-card, .portfolio-item, .testimonial-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Portfolio item click effect
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', () => {
        // Add a subtle click animation
        item.style.transform = 'scale(0.98)';
        setTimeout(() => {
            item.style.transform = 'translateY(-10px) scale(1.02)';
        }, 150);
    });
});

// Testimonial card animation
function animateTestimonials() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateX(0)';
        }, index * 300);
    });
}

// Trigger testimonial animation when section is visible
const testimonialsSection = document.querySelector('.testimonials');
const testimonialsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateTestimonials();
            testimonialsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (testimonialsSection) {
    testimonialsObserver.observe(testimonialsSection);
}

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');

// Show/hide back to top button based on scroll position
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

// Smooth scroll to top when button is clicked
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add click animation to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Test all buttons functionality
function testButtons() {
    const buttons = document.querySelectorAll('.btn');
    console.log(`Found ${buttons.length} buttons on the page`);
    
    buttons.forEach((btn, index) => {
        const href = btn.getAttribute('href');
        const text = btn.textContent.trim();
        console.log(`Button ${index + 1}: "${text}" -> ${href || 'No href'}`);
        
        // Test if button has proper href or onclick
        if (!href && !btn.onclick) {
            console.warn(`Button "${text}" has no href or onclick handler`);
        }
    });
}

// Run button test on page load
document.addEventListener('DOMContentLoaded', () => {
    testButtons();
    initializeSwitches();
});

// Add loading states to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Add loading state for buttons that don't have href
        if (!this.getAttribute('href')) {
            const originalText = this.textContent;
            this.textContent = 'Chargement...';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
            }, 2000);
        }
    });
});

// Initialize Control Buttons
function initializeSwitches() {
    // Language Button
    const languageButton = document.getElementById('language-button');
    const languageIcon = document.getElementById('language-icon');
    const languageLabel = document.getElementById('language-label');
    const themeButton = document.getElementById('theme-button');
    const themeIcon = document.getElementById('theme-icon');
    
    // Load saved preferences
    const savedLanguage = localStorage.getItem('language') || 'fr';
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Set initial states
    if (savedLanguage === 'ar') {
        if (languageLabel) languageLabel.textContent = 'AR';
        if (languageIcon) languageIcon.classList.remove('fa-language');
        if (languageIcon) languageIcon.classList.add('fa-globe');
        setTimeout(() => switchToArabic(), 100);
    } else {
        if (languageLabel) languageLabel.textContent = 'FR';
    }
    
    if (savedTheme === 'dark') {
        if (themeIcon) {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
        switchToDarkMode();
    }
    
    // Language button event listener
    if (languageButton) {
        languageButton.addEventListener('click', function() {
            const currentLanguage = localStorage.getItem('language') || 'fr';
            if (currentLanguage === 'fr') {
                switchToArabic();
                localStorage.setItem('language', 'ar');
                if (languageLabel) languageLabel.textContent = 'AR';
                if (languageIcon) {
                    languageIcon.classList.remove('fa-language');
                    languageIcon.classList.add('fa-globe');
                }
            } else {
                switchToFrench();
                localStorage.setItem('language', 'fr');
                if (languageLabel) languageLabel.textContent = 'FR';
                if (languageIcon) {
                    languageIcon.classList.remove('fa-globe');
                    languageIcon.classList.add('fa-language');
                }
            }
        });
    }
    
    // Theme button event listener
    if (themeButton) {
        themeButton.addEventListener('click', function() {
            const currentTheme = localStorage.getItem('theme') || 'light';
            if (currentTheme === 'light') {
                switchToDarkMode();
                localStorage.setItem('theme', 'dark');
                if (themeIcon) {
                    themeIcon.classList.remove('fa-sun');
                    themeIcon.classList.add('fa-moon');
                }
            } else {
                switchToLightMode();
                localStorage.setItem('theme', 'light');
                if (themeIcon) {
                    themeIcon.classList.remove('fa-moon');
                    themeIcon.classList.add('fa-sun');
                }
            }
        });
    }
}

// Language switching functions
function switchToArabic() {
    document.body.classList.add('arabic-mode');
    document.body.setAttribute('dir', 'rtl');
    
    // Fix any HTML rendering issues
    fixTitleDisplay();
    
    // Update navigation labels
    const navLinks = document.querySelectorAll('.nav-link');
    const arabicLabels = {
        'Accueil': 'الرئيسية',
        'Noms Commerciaux': 'الأسماء التجارية',
        'Propositions': 'الاقتراحات',
        'Identité Visuelle': 'الهوية البصرية',
        'Stratégies': 'الاستراتيجيات',
        'Services': 'الخدمات',
        'Portfolio': 'الأعمال',
        'Estimation': 'التقدير',
        'Contact': 'اتصل بنا'
    };
    
    navLinks.forEach(link => {
        const text = link.textContent.trim();
        if (arabicLabels[text]) {
            link.textContent = arabicLabels[text];
        }
    });
    
    // Update hero section
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroDescription = document.querySelector('.hero-description');
    
    if (heroTitle) {
        heroTitle.innerHTML = `
            <span class="title-main">الأسماء التجارية</span>
            <span class="title-decoration"></span>
            <span class="title-sub-wrapper">
                <span class="title-sub">المميزة</span>
            </span>
        `;
    }
    
    if (heroSubtitle) {
        heroSubtitle.textContent = 'لماركة زيت الزيتون التونسية';
    }
    
    if (heroDescription) {
        heroDescription.textContent = 'اكتشف 10 اقتراحات لأسماء تجارية أصيلة و لا تُنسى لإنشاء هوية علامة تجارية قوية ومميزة في السوق المميز';
    }
    
    // Update section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    const arabicSectionTitles = {
        'Nos Services': 'خدماتنا',
        'Prêt à Lancer Votre Projet ?': 'هل أنت مستعد لإطلاق مشروعك؟',
        'Estimation de Projet': 'تقدير المشروع',
        'Propositions de Noms Commerciaux': 'اقتراحات الأسماء التجارية'
    };
    
    sectionTitles.forEach(title => {
        const text = title.textContent.trim();
        if (arabicSectionTitles[text]) {
            title.textContent = arabicSectionTitles[text];
        }
    });
    
    // Update section subtitles
    const sectionSubtitles = document.querySelectorAll('.section-subtitle');
    const arabicSectionSubtitles = {
        'Deux approches stratégiques distinctes pour votre projet d\'huile d\'olive': 'نهجان استراتيجيان متميزان لمشروع زيت الزيتون الخاص بك',
        'Identités visuelles distinctes pour chaque marque': 'هويات بصرية متميزة لكل علامة تجارية',
        'Un accompagnement complet de A à Z pour votre projet de marque': 'مرافقة شاملة من الألف إلى الياء لمشروع علامتك التجارية',
        'Contactez-nous pour une consultation personnalisée': 'تواصل معنا للحصول على استشارة شخصية',
        'Un investissement transparent pour votre succès': 'استثمار شفاف لنجاحك',
        'Des noms authentiques et mémorables pour votre marque d\'huile d\'olive premium': 'أسماء أصيلة و لا تُنسى لعلامتك التجارية لزيت الزيتون المميز'
    };
    
    // Update portfolio descriptions
    const portfolioDescriptions = document.querySelectorAll('.portfolio-content p');
    const arabicPortfolioDescriptions = {
        'Design authentique avec matériaux naturels et motifs traditionnels marocains': 'تصميم أصيل بمواد طبيعية وزخارف تقليدية مغربية',
        'Identité sophistiquée avec design moderne pour le marché international': 'هوية متطورة بتصميم عصري للسوق الدولي',
        'Plateforme digitale moderne avec interface utilisateur intuitive': 'منصة رقمية حديثة بواجهة مستخدم بديهية'
    };
    
    sectionSubtitles.forEach(subtitle => {
        const text = subtitle.textContent.trim();
        if (arabicSectionSubtitles[text]) {
            subtitle.textContent = arabicSectionSubtitles[text];
        }
    });
    
    portfolioDescriptions.forEach(description => {
        const text = description.textContent.trim();
        if (arabicPortfolioDescriptions[text]) {
            description.textContent = arabicPortfolioDescriptions[text];
        }
    });
    
    // Update buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        const text = btn.textContent.trim();
        const arabicButtonTexts = {
            'Découvrir les Propositions': 'اكتشف الاقتراحات',
            'Explorer les Couleurs': 'استكشف الألوان',
            'En Savoir Plus': 'اعرف المزيد',
            'Découvrir': 'اكتشف',
            'Voir plus': 'شاهد المزيد',
            'Découvrir maintenant': 'اكتشف الآن',
            'تواصل معنا': 'تواصل معنا'
        };
        
        if (arabicButtonTexts[text]) {
            btn.textContent = arabicButtonTexts[text];
        }
    });
    
    // Update introduction texts
    const introTexts = document.querySelectorAll('.propositions-intro p, .services-intro p, .contact-intro p');
    const arabicIntroTexts = {
        'Nous vous proposons deux concepts de marques complémentaires, chacun adapté à un segment de marché spécifique. Ces approches vous permettent de maximiser votre potentiel commercial en ciblant différents types de consommateurs.': 'نقدم لك مفهومين للعلامات التجارية المكملة، كل منهما مناسب لقطاع سوق محدد. هذه النهج تتيح لك تعظيم إمكاناتك التجارية من خلال استهداف أنواع مختلفة من المستهلكين.',
        'Notre expertise couvre tous les aspects du développement de marque, de la conception créative à la mise sur le marché. Nous vous accompagnons à chaque étape pour garantir le succès de votre projet.': 'خبرتنا تغطي جميع جوانب تطوير العلامة التجارية، من التصميم الإبداعي إلى طرحها في السوق. نرافقك في كل خطوة لضمان نجاح مشروعك.',
        'Nous sommes là pour vous accompagner dans la création de votre marque d\'huile d\'olive. Contactez-nous dès aujourd\'hui pour discuter de vos besoins et découvrir comment nous pouvons vous aider à réussir.': 'نحن هنا لمرافقتك في إنشاء علامتك التجارية لزيت الزيتون. تواصل معنا اليوم لمناقشة احتياجاتك واكتشاف كيف يمكننا مساعدتك على النجاح.'
    };
    
    // Update feature texts
    const featureTexts = document.querySelectorAll('.feature span');
    const arabicFeatureTexts = {
        'Marché local & familial': 'السوق المحلي والعائلي',
        'Approche personnalisée': 'نهج شخصي',
        'Produits artisanaux': 'منتجات حرفية',
        'Design épuré': 'تصميم أنيق',
        'Marché international': 'السوق الدولي',
        'Innovation & luxe': 'الابتكار والفخامة',
        'Produits premium': 'منتجات فاخرة',
        'Design exotique': 'تصميم غريب'
    };
    
    introTexts.forEach(intro => {
        const text = intro.textContent.trim();
        if (arabicIntroTexts[text]) {
            intro.textContent = arabicIntroTexts[text];
        }
    });
    
    featureTexts.forEach(feature => {
        const text = feature.textContent.trim();
        if (arabicFeatureTexts[text]) {
            feature.textContent = arabicFeatureTexts[text];
        }
    });
}

function switchToFrench() {
    document.body.classList.remove('arabic-mode');
    document.body.setAttribute('dir', 'ltr');
    
    // Fix any HTML rendering issues
    fixTitleDisplay();
    
    // Update navigation labels
    const navLinks = document.querySelectorAll('.nav-link');
    const frenchLabels = {
        'الرئيسية': 'Accueil',
        'الأسماء التجارية': 'Noms Commerciaux',
        'الاقتراحات': 'Propositions',
        'الهوية البصرية': 'Identité Visuelle',
        'الاستراتيجيات': 'Stratégies',
        'الخدمات': 'Services',
        'الأعمال': 'Portfolio',
        'التقدير': 'Estimation',
        'اتصل بنا': 'Contact'
    };
    
    navLinks.forEach(link => {
        const text = link.textContent.trim();
        if (frenchLabels[text]) {
            link.textContent = frenchLabels[text];
        }
    });
    
    // Update hero section
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroDescription = document.querySelector('.hero-description');
    
    if (heroTitle) {
        heroTitle.innerHTML = `
            <span class="title-main">Noms Commerciaux</span>
            <span class="title-decoration"></span>
            <span class="title-sub-wrapper">
                <span class="title-sub">Premium</span>
            </span>
        `;
    }
    
    if (heroSubtitle) {
        heroSubtitle.textContent = 'Pour Votre Marque d\'Huile d\'Olive Tunisienne';
    }
    
    if (heroDescription) {
        heroDescription.textContent = 'Découvrez 10 propositions de noms commerciaux authentiques et mémorables pour créer une identité de marque forte et distinctive sur le marché premium';
    }
    
    // Update section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    const frenchSectionTitles = {
        'خدماتنا': 'Nos Services',
        'هل أنت مستعد لإطلاق مشروعك؟': 'Prêt à Lancer Votre Projet ?'
    };
    
    sectionTitles.forEach(title => {
        const text = title.textContent.trim();
        if (frenchSectionTitles[text]) {
            title.textContent = frenchSectionTitles[text];
        }
    });
    
    // Update section subtitles
    const sectionSubtitles = document.querySelectorAll('.section-subtitle');
    const frenchSectionSubtitles = {
        'مرافقة شاملة من الألف إلى الياء لمشروع علامتك التجارية': 'Un accompagnement complet de A à Z pour votre projet de marque',
        'تواصل معنا للحصول على استشارة شخصية': 'Contactez-nous pour une consultation personnalisée'
    };
    
    // Update portfolio descriptions
    const portfolioDescriptions = document.querySelectorAll('.portfolio-content p');
    const frenchPortfolioDescriptions = {
        'تصميم أصيل بمواد طبيعية وزخارف تقليدية مغربية': 'Design authentique avec matériaux naturels et motifs traditionnels marocains',
        'هوية متطورة بتصميم عصري للسوق الدولي': 'Identité sophistiquée avec design moderne pour le marché international',
        'منصة رقمية حديثة بواجهة مستخدم بديهية': 'Plateforme digitale moderne avec interface utilisateur intuitive'
    };
    
    sectionSubtitles.forEach(subtitle => {
        const text = subtitle.textContent.trim();
        if (frenchSectionSubtitles[text]) {
            subtitle.textContent = frenchSectionSubtitles[text];
        }
    });
    
    portfolioDescriptions.forEach(description => {
        const text = description.textContent.trim();
        if (frenchPortfolioDescriptions[text]) {
            description.textContent = frenchPortfolioDescriptions[text];
        }
    });
    
    // Update buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        const text = btn.textContent.trim();
        const frenchButtonTexts = {
            'اكتشف الاقتراحات': 'Découvrir les Propositions',
            'استكشف الألوان': 'Explorer les Couleurs',
            'اعرف المزيد': 'En Savoir Plus',
            'اكتشف': 'Découvrir',
            'شاهد المزيد': 'Voir plus',
            'اكتشف الآن': 'Découvrir maintenant',
            'تواصل معنا': 'تواصل معنا'
        };
        
        if (frenchButtonTexts[text]) {
            btn.textContent = frenchButtonTexts[text];
        }
    });
    
    // Update introduction texts
    const introTexts = document.querySelectorAll('.propositions-intro p, .services-intro p, .contact-intro p');
    const frenchIntroTexts = {
        'نقدم لك مفهومين للعلامات التجارية المكملة، كل منهما مناسب لقطاع سوق محدد. هذه النهج تتيح لك تعظيم إمكاناتك التجارية من خلال استهداف أنواع مختلفة من المستهلكين.': 'Nous vous proposons deux concepts de marques complémentaires, chacun adapté à un segment de marché spécifique. Ces approches vous permettent de maximiser votre potentiel commercial en ciblant différents types de consommateurs.',
        'خبرتنا تغطي جميع جوانب تطوير العلامة التجارية، من التصميم الإبداعي إلى طرحها في السوق. نرافقك في كل خطوة لضمان نجاح مشروعك.': 'Notre expertise couvre tous les aspects du développement de marque, de la conception créative à la mise sur le marché. Nous vous accompagnons à chaque étape pour garantir le succès de votre projet.',
        'نحن هنا لمرافقتك في إنشاء علامتك التجارية لزيت الزيتون. تواصل معنا اليوم لمناقشة احتياجاتك واكتشاف كيف يمكننا مساعدتك على النجاح.': 'Nous sommes là pour vous accompagner dans la création de votre marque d\'huile d\'olive. Contactez-nous dès aujourd\'hui pour discuter de vos besoins et découvrir comment nous pouvons vous aider à réussir.'
    };
    
    // Update feature texts
    const featureTexts = document.querySelectorAll('.feature span');
    const frenchFeatureTexts = {
        'السوق المحلي والعائلي': 'Marché local & familial',
        'نهج شخصي': 'Approche personnalisée',
        'منتجات حرفية': 'Produits artisanaux',
        'تصميم أنيق': 'Design épuré',
        'السوق الدولي': 'Marché international',
        'الابتكار والفخامة': 'Innovation & luxe',
        'منتجات فاخرة': 'Produits premium',
        'تصميم غريب': 'Design exotique'
    };
    
    introTexts.forEach(intro => {
        const text = intro.textContent.trim();
        if (frenchIntroTexts[text]) {
            intro.textContent = frenchIntroTexts[text];
        }
    });
    
    featureTexts.forEach(feature => {
        const text = feature.textContent.trim();
        if (frenchFeatureTexts[text]) {
            feature.textContent = frenchFeatureTexts[text];
        }
    });
}

// Fix title display issues
function fixTitleDisplay() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        // Clean up any malformed HTML
        const isArabic = document.body.classList.contains('arabic-mode');
        if (isArabic) {
            heroTitle.innerHTML = `
                <span class="title-main">الأسماء التجارية</span>
                <span class="title-decoration"></span>
                <span class="title-sub-wrapper">
                    <span class="title-sub">المميزة</span>
                </span>
            `;
        } else {
            heroTitle.innerHTML = `
                <span class="title-main">Noms Commerciaux</span>
                <span class="title-decoration"></span>
                <span class="title-sub-wrapper">
                    <span class="title-sub">Premium</span>
                </span>
            `;
        }
    }
}

// Theme switching functions
function switchToDarkMode() {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.body.classList.add('dark-mode');
}

function switchToLightMode() {
    document.documentElement.setAttribute('data-theme', 'light');
    document.body.classList.remove('dark-mode');
}

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Lazy loading for images (if any are added later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Typing effect removed - it was causing HTML to be displayed as text
// The title now displays correctly with proper HTML structure

// Add scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #2D5016, #B8860B);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize scroll progress
createScrollProgress();

// Estimation table row animations
function animateEstimationTable() {
    const tableRows = document.querySelectorAll('.estimation-table tbody tr');
    tableRows.forEach((row, index) => {
        row.style.opacity = '0';
        row.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            row.style.transition = 'all 0.5s ease';
            row.style.opacity = '1';
            row.style.transform = 'translateX(0)';
        }, index * 100);
    });
}

// Trigger estimation table animation when section is visible
const estimationSection = document.querySelector('.estimation');
if (estimationSection) {
    const estimationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateEstimationTable();
                estimationObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    estimationObserver.observe(estimationSection);
}

// Add hover effect to table rows with category highlighting
document.querySelectorAll('.category-row, .detail-row').forEach(row => {
    const category = row.getAttribute('data-category');
    
    row.addEventListener('mouseenter', () => {
        // Highlight all rows in the same category
        document.querySelectorAll(`[data-category="${category}"]`).forEach(relatedRow => {
            relatedRow.style.backgroundColor = 'var(--tazmourt-light)';
        });
    });
    
    row.addEventListener('mouseleave', () => {
        // Reset background colors
        document.querySelectorAll(`[data-category="${category}"]`).forEach(relatedRow => {
            if (relatedRow.classList.contains('category-row')) {
                relatedRow.style.backgroundColor = 'var(--gray-50)';
            } else {
                relatedRow.style.backgroundColor = 'var(--white)';
            }
        });
    });
});

// Add number counting animation for total
function animateTotalValue() {
    const totalValueElement = document.querySelector('.total-value');
    if (!totalValueElement) return;
    
    const finalValue = 6900.00;
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = finalValue / steps;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= finalValue) {
            current = finalValue;
            clearInterval(timer);
        }
        totalValueElement.textContent = current.toLocaleString('fr-FR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).replace('.', ',');
    }, duration / steps);
}

// Trigger total animation when estimation section is visible
if (estimationSection) {
    const totalObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    animateTotalValue();
                }, 500);
                totalObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    totalObserver.observe(estimationSection);
}

// Animate nom cards on scroll
function animateNomCards() {
    const nomCards = document.querySelectorAll('.nom-card');
    nomCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) scale(0.9)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
        }, index * 150);
    });
}

// Trigger nom cards animation when section is visible
const nomsSection = document.querySelector('.noms-commerciaux');
if (nomsSection) {
    const nomsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNomCards();
                nomsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    nomsObserver.observe(nomsSection);
}

// Add click effect to nom cards
document.querySelectorAll('.nom-card').forEach(card => {
    card.addEventListener('click', function() {
        // Add a subtle pulse effect
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });
});

// Add smooth reveal animation for sections
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    section.classList.add('reveal');
    revealObserver.observe(section);
});

// Add reveal animation CSS
const revealStyle = document.createElement('style');
revealStyle.textContent = `
    .reveal {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.8s ease;
    }
    
    .revealed {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(revealStyle);

// Contact Form Handling
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const btnText = submitButton.querySelector('.btn-text');
    const btnLoader = submitButton.querySelector('.btn-loader');
    const formSuccess = document.getElementById('form-success');
    const formError = document.getElementById('form-error');
    
    // Real-time validation
    function validateField(field, errorElement) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'Ce champ est obligatoire';
        } else if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Veuillez entrer une adresse email valide';
            }
        } else if (field === messageInput && value.length < 10) {
            isValid = false;
            errorMessage = 'Le message doit contenir au moins 10 caractères';
        }
        
        if (!isValid) {
            field.style.borderColor = '#ff6b6b';
            if (errorElement) {
                errorElement.textContent = errorMessage;
                errorElement.style.display = 'block';
            }
        } else {
            field.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            if (errorElement) {
                errorElement.style.display = 'none';
            }
        }
        
        return isValid;
    }
    
    // Add event listeners for real-time validation
    nameInput.addEventListener('blur', () => {
        validateField(nameInput, document.getElementById('name-error'));
    });
    
    emailInput.addEventListener('blur', () => {
        validateField(emailInput, document.getElementById('email-error'));
    });
    
    messageInput.addEventListener('blur', () => {
        validateField(messageInput, document.getElementById('message-error'));
    });
    
    // Form submission
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Hide previous messages
        formSuccess.style.display = 'none';
        formError.style.display = 'none';
        
        // Validate all required fields
        const isNameValid = validateField(nameInput, document.getElementById('name-error'));
        const isEmailValid = validateField(emailInput, document.getElementById('email-error'));
        const isMessageValid = validateField(messageInput, document.getElementById('message-error'));
        
        if (!isNameValid || !isEmailValid || !isMessageValid) {
            formError.style.display = 'flex';
            formError.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            return;
        }
        
        // Show loading state
        submitButton.disabled = true;
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline-flex';
        
        // Prepare form data
        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            phone: document.getElementById('phone').value.trim(),
            brand: document.getElementById('brand').value,
            message: messageInput.value.trim()
        };
        
        try {
            // Option 1: Use EmailJS (requires EmailJS account)
            // You'll need to add EmailJS script and configure it
            // For now, we'll use a simple mailto link as fallback
            
            // Option 2: Use Formspree or similar service
            // const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(formData)
            // });
            
            // Option 3: Simple mailto fallback (for now)
            const subject = encodeURIComponent(`Contact depuis le site - ${formData.brand ? formData.brand : 'Général'}`);
            const body = encodeURIComponent(`
Nom: ${formData.name}
Email: ${formData.email}
Téléphone: ${formData.phone || 'Non fourni'}
Marque d'intérêt: ${formData.brand || 'Non spécifiée'}

Message:
${formData.message}
            `);
            
            // Simulate API call (replace with actual API)
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // For now, open mailto as fallback
            // In production, replace this with actual API call
            window.location.href = `mailto:younsialaeddine@gmail.com?subject=${subject}&body=${body}`;
            
            // Show success message
            formSuccess.style.display = 'flex';
            contactForm.reset();
            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            // Reset button state
            submitButton.disabled = false;
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
            
        } catch (error) {
            console.error('Form submission error:', error);
            formError.style.display = 'flex';
            formError.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            // Reset button state
            submitButton.disabled = false;
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
        }
    });
});