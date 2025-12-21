/**
 * Portfolio - Classe principal
 * Abordagem orientada a objetos com classes ES6
 * Refatorado para estrutura modular sem dependência de ES6 modules
 */

(function() {
    'use strict';

    // Utilitários como objeto estático
    const Utils = {
        debounce(fn, delay = 300) {
            let timeoutId;
            return (...args) => {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => fn.apply(this, args), delay);
            };
        },

        throttle(fn, limit = 16) {
            let lastRun = 0;
            return (...args) => {
                const now = Date.now();
                if (now - lastRun >= limit) {
                    lastRun = now;
                    fn.apply(this, args);
                }
            };
        },

        getScrollPosition() {
            return window.pageYOffset || document.documentElement.scrollTop;
        },

        scrollToElement(element, offset = 80) {
            if (!element) return;
            const elementPosition = element.offsetTop;
            const offsetPosition = elementPosition - offset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        },

        isInViewport(element, threshold = 0.1) {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            return rect.top >= -rect.height * threshold && 
                   rect.bottom <= windowHeight + rect.height * threshold;
        }
    };

    /**
     * Classe principal do Portfolio
     */
    class PortfolioApp {
        constructor() {
            this.currentLang = this.detectLanguage();
            this.modules = {};
            this.isInitialized = false;
        }

        detectLanguage() {
            const saved = localStorage.getItem('portfolio-lang');
            if (saved) return saved;
            
            const browserLang = (navigator.language || navigator.userLanguage).toLowerCase();
            return browserLang.startsWith('en') ? 'en' : 'pt';
        }

        async init() {
            if (this.isInitialized) return;

            // Aguarda DOM
            if (document.readyState === 'loading') {
                await new Promise(resolve => {
                    document.addEventListener('DOMContentLoaded', resolve);
                });
            }

            // Inicializa módulos
            this.modules.preloader = new PreloaderManager();
            this.modules.i18n = new I18nManager(this.currentLang);
            this.modules.navigation = new NavigationManager();
            this.modules.animations = new AnimationManager();
            this.modules.backToTop = new BackToTopManager();

            // Inicializa todos
            Object.values(this.modules).forEach(module => {
                if (module && typeof module.init === 'function') {
                    module.init();
                }
            });

            this.isInitialized = true;
        }

        getModule(name) {
            return this.modules[name];
        }
    }

    /**
     * Gerenciador de Preloader
     */
    class PreloaderManager {
        init() {
            const preloader = document.getElementById('preloader');
            const pageContent = document.querySelectorAll('.page-content');
            
            if (!preloader) return;

            const hidePreloader = () => {
                preloader.classList.add('hidden');
                pageContent.forEach(el => el.classList.add('loaded'));
                setTimeout(() => preloader.style.display = 'none', 500);
            };

            if (document.readyState === 'complete') {
                setTimeout(hidePreloader, 150);
            } else {
                window.addEventListener('load', () => setTimeout(hidePreloader, 300));
            }
        }
    }

    /**
     * Gerenciador de Internacionalização
     */
    class I18nManager {
        constructor(defaultLang) {
            this.currentLang = defaultLang;
            this.translations = typeof translations !== 'undefined' ? translations : {};
        }

        init() {
            this.applyTranslations(this.currentLang);
            this.setupLanguageToggle();
        }

        applyTranslations(lang) {
            if (!this.translations[lang]) return;

            // Aplica em elementos com data-i18n
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                const text = this.translations[lang][key];
                if (text) {
                    if (text.includes('<')) {
                        el.innerHTML = text;
                    } else {
                        el.textContent = text;
                    }
                }
            });

            // Atualiza atributos especiais
            document.querySelectorAll('[data-i18n-title]').forEach(el => {
                const key = el.getAttribute('data-i18n-title');
                const text = this.translations[lang][key];
                if (text) el.setAttribute('title', text);
            });

            document.documentElement.setAttribute('lang', lang === 'pt' ? 'pt-BR' : 'en');
        }

        changeLanguage(newLang) {
            if (!['pt', 'en'].includes(newLang)) return;
            this.currentLang = newLang;
            localStorage.setItem('portfolio-lang', newLang);
            this.applyTranslations(newLang);
            this.updateLanguageButtons();
        }

        updateLanguageButtons() {
            const desktopBtn = document.getElementById('lang-display');
            const mobileBtn = document.getElementById('lang-display-mobile');
            
            if (desktopBtn) {
                desktopBtn.textContent = this.currentLang === 'pt' ? 'EN' : 'PT';
            }
            if (mobileBtn) {
                mobileBtn.textContent = this.currentLang === 'pt' ? 'English' : 'Português';
            }
        }

        setupLanguageToggle() {
            const desktopToggle = document.getElementById('lang-toggle');
            const mobileToggle = document.getElementById('lang-toggle-mobile');

            desktopToggle?.addEventListener('click', () => {
                this.changeLanguage(this.currentLang === 'pt' ? 'en' : 'pt');
            });

            mobileToggle?.addEventListener('click', () => {
                this.changeLanguage(this.currentLang === 'pt' ? 'en' : 'pt');
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu?.classList.contains('active')) {
                    document.getElementById('mobile-menu-btn')?.click();
                }
            });

            this.updateLanguageButtons();
        }
    }

    /**
     * Gerenciador de Navegação
     */
    class NavigationManager {
        constructor() {
            this.activeSection = '';
            this.scrollHandler = Utils.throttle(() => this.updateActiveSection(), 16);
            this.navbarHandler = Utils.throttle(() => this.updateNavbar(), 16);
        }

        init() {
            this.setupSmoothScroll();
            this.setupNavbarScroll();
            this.setupActiveLinks();
            this.setupMobileMenu();
            window.addEventListener('scroll', this.scrollHandler);
        }

        setupSmoothScroll() {
            document.querySelectorAll('a[href^="#"]').forEach(link => {
                link.addEventListener('click', (e) => {
                    const href = link.getAttribute('href');
                    if (href === '#') return;

                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        Utils.scrollToElement(target, 80);
                    }
                });
            });
        }

        setupNavbarScroll() {
            const navbar = document.querySelector('nav');
            if (!navbar) return;
            window.addEventListener('scroll', this.navbarHandler);
        }

        updateNavbar() {
            const navbar = document.querySelector('nav');
            if (!navbar) return;
            
            const scrollY = Utils.getScrollPosition();
            if (scrollY > 100) {
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        }

        setupActiveLinks() {
            const sections = Array.from(document.querySelectorAll('section[id]'));
            const navLinks = Array.from(document.querySelectorAll('nav a[href^="#"]'));
            const mobileLinks = Array.from(document.querySelectorAll('.mobile-menu-link'));

            const updateActive = Utils.debounce(() => {
                const scrollPos = Utils.getScrollPosition() + 150;
                
                const current = sections.find(section => {
                    const top = section.offsetTop;
                    const height = section.clientHeight;
                    return scrollPos >= top && scrollPos < top + height;
                })?.getAttribute('id') || '';

                if (current === this.activeSection) return;
                this.activeSection = current;

                [...navLinks, ...mobileLinks].forEach(link => {
                    const href = link.getAttribute('href').substring(1);
                    link.classList.toggle('active', href === current);
                });
            }, 100);

            window.addEventListener('scroll', updateActive);
        }

        setupMobileMenu() {
            const menuBtn = document.getElementById('mobile-menu-btn');
            const mobileMenu = document.getElementById('mobile-menu');
            const mobileLinks = document.querySelectorAll('.mobile-menu-link');
            const body = document.body;

            if (!menuBtn || !mobileMenu) return;

            const toggleMenu = () => {
                const isOpen = mobileMenu.classList.contains('active');
                if (isOpen) {
                    this.closeMenu(mobileMenu, menuBtn, body);
                } else {
                    this.openMenu(mobileMenu, menuBtn, body);
                }
            };

            menuBtn.addEventListener('click', toggleMenu);
            
            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    this.closeMenu(mobileMenu, menuBtn, body);
                    setTimeout(() => body.classList.remove('menu-open'), 500);
                });
            });

            mobileMenu.addEventListener('click', (e) => {
                if (e.target === mobileMenu) {
                    this.closeMenu(mobileMenu, menuBtn, body);
                }
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                    this.closeMenu(mobileMenu, menuBtn, body);
                }
            });

            // Fecha menu ao redimensionar
            window.addEventListener('resize', Utils.debounce(() => {
                if (window.innerWidth >= 768 && mobileMenu.classList.contains('active')) {
                    this.closeMenu(mobileMenu, menuBtn, body);
                }
            }, 250));
        }

        openMenu(menu, btn, body) {
            menu.classList.remove('hidden');
            setTimeout(() => {
                menu.classList.add('active');
                btn.setAttribute('aria-expanded', 'true');
                body.classList.add('menu-open');
            }, 10);
        }

        closeMenu(menu, btn, body) {
            menu.classList.remove('active');
            btn.setAttribute('aria-expanded', 'false');
            body.classList.remove('menu-open');
            setTimeout(() => {
                if (!menu.classList.contains('active')) {
                    menu.classList.add('hidden');
                }
            }, 300);
        }

        updateActiveSection() {
            // Chamado pelo scroll handler
        }
    }

    /**
     * Gerenciador de Animações
     */
    class AnimationManager {
        init() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            document.querySelectorAll('.fade-in, .slide-in').forEach(el => {
                observer.observe(el);
            });
        }
    }

    /**
     * Gerenciador Back to Top
     */
    class BackToTopManager {
        init() {
            const btn = document.getElementById('back-to-top');
            if (!btn) return;

            const toggleVisibility = Utils.throttle(() => {
                const scrollPos = Utils.getScrollPosition();
                btn.classList.toggle('show', scrollPos > 300);
            }, 100);

            window.addEventListener('scroll', toggleVisibility);

            btn.addEventListener('click', () => {
                Utils.scrollToElement(document.body, 0);
            });
        }
    }

    // Cria e inicializa a aplicação
    const app = new PortfolioApp();
    app.init();

    // Exporta para uso global
    window.Portfolio = app;
    window.PortfolioUtils = Utils;

})();
