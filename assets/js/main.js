/**
 * Portfolio Wesley Gomes - Main JavaScript
 * Funcionalidades interativas do portfólio
 */

(function() {
    'use strict';

    // Inicialização quando o DOM estiver pronto
    document.addEventListener('DOMContentLoaded', function() {
        initPreloader();
        initI18n();
        initSmoothScroll();
        initNavbarScroll();
        initAnimationsOnScroll();
        initActiveNavLinks();
        initMobileMenu();
        initBackToTop();
        initExternalLinksLoading();
    });

    /**
     * Inicializa o pre-loader
     */
    function initPreloader() {
        const preloader = document.getElementById('preloader');
        const pageContent = document.querySelectorAll('.page-content');
        
        if (!preloader) return;

        function hidePreloader() {
            // Esconde o pre-loader
            preloader.classList.add('hidden');
            
            // Mostra o conteúdo com fade-in
            pageContent.forEach(function(element) {
                element.classList.add('loaded');
            });
            
            // Remove o pre-loader do DOM após a animação
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 500);
        }

        // Verifica se a página já está carregada (cache ou muito rápido)
        if (document.readyState === 'complete') {
            // Pequeno delay para mostrar a animação mesmo em cache
            setTimeout(hidePreloader, 150);
        } else {
            // Aguarda o carregamento completo da página
            window.addEventListener('load', function() {
                // Pequeno delay para garantir que tudo está carregado
                setTimeout(hidePreloader, 300);
            });
        }
    }

    /**
     * Inicializa o sistema de i18n (internacionalização)
     */
    function initI18n() {
        // Verifica se o objeto translations existe
        if (typeof translations === 'undefined') {
            console.warn('Translations não encontrado. Carregue o arquivo translations.js primeiro.');
            return;
        }

        // Detecta idioma preferido do usuário
        // Prioridade: 1) localStorage, 2) Idioma do navegador, 3) Português (padrão)
        const savedLang = localStorage.getItem('portfolio-lang');
        const browserLang = navigator.language || navigator.userLanguage;
        
        // Se tem idioma salvo, usa ele. Senão, detecta do navegador ou usa PT como padrão
        let defaultLang = 'pt'; // Padrão: Português
        if (savedLang) {
            defaultLang = savedLang;
        } else if (browserLang && browserLang.toLowerCase().startsWith('en')) {
            defaultLang = 'en';
        }
        
        // Define idioma atual
        let currentLang = defaultLang;

        /**
         * Aplica traduções aos elementos
         */
        function applyTranslations(lang) {
            const elements = document.querySelectorAll('[data-i18n]');
            
            elements.forEach(element => {
                const key = element.getAttribute('data-i18n');
                
                if (translations[lang] && translations[lang][key]) {
                    let text = translations[lang][key];
                    
                    // Se a tradução contém HTML (tags), usa innerHTML
                    // Caso contrário, usa textContent para evitar problemas de segurança
                    if (text.includes('<') && text.includes('>')) {
                        element.innerHTML = text;
                    } else {
                        element.textContent = text;
                    }
                }
            });

            // Atualiza atributos especiais (title, aria-label)
            const titleElements = document.querySelectorAll('[data-i18n-title]');
            titleElements.forEach(element => {
                const key = element.getAttribute('data-i18n-title');
                if (translations[lang] && translations[lang][key]) {
                    element.setAttribute('title', translations[lang][key]);
                }
            });

            // Atualiza o atributo lang do HTML
            document.documentElement.setAttribute('lang', lang === 'pt' ? 'pt-BR' : 'en');
        }

        /**
         * Atualiza os botões de idioma
         */
        function updateLangButtons(lang) {
            const langDisplay = document.getElementById('lang-display');
            const langDisplayMobile = document.getElementById('lang-display-mobile');
            
            if (langDisplay) {
                langDisplay.textContent = lang === 'pt' ? 'EN' : 'PT';
            }
            
            if (langDisplayMobile) {
                langDisplayMobile.textContent = lang === 'pt' ? 'English' : 'Português';
            }
        }

        /**
         * Troca o idioma
         */
        function changeLanguage(newLang) {
            if (newLang !== 'pt' && newLang !== 'en') return;
            
            currentLang = newLang;
            localStorage.setItem('portfolio-lang', newLang);
            applyTranslations(newLang);
            updateLangButtons(newLang);
        }

        // Botões de troca de idioma
        const langToggle = document.getElementById('lang-toggle');
        const langToggleMobile = document.getElementById('lang-toggle-mobile');

        if (langToggle) {
            langToggle.addEventListener('click', function() {
                const newLang = currentLang === 'pt' ? 'en' : 'pt';
                changeLanguage(newLang);
            });
        }

        if (langToggleMobile) {
            langToggleMobile.addEventListener('click', function() {
                const newLang = currentLang === 'pt' ? 'en' : 'pt';
                changeLanguage(newLang);
                
                // Fecha o menu mobile após trocar idioma
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    const menuBtn = document.getElementById('mobile-menu-btn');
                    if (menuBtn) {
                        menuBtn.click();
                    }
                }
            });
        }

        // Aplica traduções iniciais
        applyTranslations(currentLang);
        updateLangButtons(currentLang);

        // Exporta função para uso global se necessário
        window.Portfolio = window.Portfolio || {};
        window.Portfolio.changeLanguage = changeLanguage;
        window.Portfolio.getCurrentLang = () => currentLang;
    }

    /**
     * Configura scroll suave para links de navegação
     */
    function initSmoothScroll() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Ignora links vazios
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const offsetTop = target.offsetTop - 80; // Altura da navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /**
     * Adiciona efeito de transparência na navbar ao fazer scroll
     */
    function initNavbarScroll() {
        const navbar = document.querySelector('nav');
        if (!navbar) return;

        window.addEventListener('scroll', throttle(function() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        }, 16)); // ~60fps (16ms)
    }

    /**
     * Anima elementos quando entram na viewport
     */
    function initAnimationsOnScroll() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observa elementos com classes de animação
        const animatedElements = document.querySelectorAll('.fade-in, .slide-in');
        animatedElements.forEach(el => observer.observe(el));
    }

    /**
     * Destaca link de navegação ativo baseado na seção visível
     */
    function initActiveNavLinks() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        const mobileLinks = document.querySelectorAll('.mobile-menu-link');

        if (sections.length === 0 || (navLinks.length === 0 && mobileLinks.length === 0)) return;

        window.addEventListener('scroll', debounce(function() {
            let current = '';
            const scrollPosition = window.pageYOffset + 150;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            // Destaca links do menu desktop
            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href').substring(1);
                if (href === current) {
                    link.classList.add('active');
                }
            });

            // Destaca links do menu mobile
            mobileLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href').substring(1);
                if (href === current) {
                    link.classList.add('active');
                }
            });
        }, 100));
    }

    /**
     * Inicializa o menu mobile
     */
    function initMobileMenu() {
        const menuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileLinks = document.querySelectorAll('.mobile-menu-link');
        const body = document.body;

        if (!menuBtn || !mobileMenu) return;

        // Toggle do menu ao clicar no botão
        menuBtn.addEventListener('click', function() {
            const isOpen = mobileMenu.classList.contains('active');
            
            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        // Fechar menu ao clicar em um link
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                closeMobileMenu();
                
                // Aguarda a animação de scroll antes de remover o bloqueio
                setTimeout(() => {
                    body.classList.remove('menu-open');
                }, 500);
            });
        });

        // Fechar menu ao clicar fora (no overlay)
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                closeMobileMenu();
            }
        });

        // Fechar menu ao pressionar ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });

        function openMobileMenu() {
            mobileMenu.classList.remove('hidden');
            // Pequeno delay para garantir que a transição funcione
            setTimeout(() => {
                mobileMenu.classList.add('active');
                menuBtn.setAttribute('aria-expanded', 'true');
                body.classList.add('menu-open');
            }, 10);
        }

        function closeMobileMenu() {
            mobileMenu.classList.remove('active');
            menuBtn.setAttribute('aria-expanded', 'false');
            body.classList.remove('menu-open');
            
            // Esconde o menu após a animação
            setTimeout(() => {
                if (!mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.add('hidden');
                }
            }, 300);
        }

        // Fechar menu ao redimensionar para desktop
        window.addEventListener('resize', debounce(function() {
            if (window.innerWidth >= 768 && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        }, 250));
    }

    /**
     * Inicializa o botão "Voltar ao Topo"
     */
    function initBackToTop() {
        const backToTopBtn = document.getElementById('back-to-top');
        if (!backToTopBtn) return;

        // Mostra/esconde o botão baseado na posição do scroll
        window.addEventListener('scroll', throttle(function() {
            const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollPosition > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }, 100));

        // Scroll suave ao topo ao clicar no botão
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /**
     * Adiciona loading states aos links externos
     */
    function initExternalLinksLoading() {
        const externalLinks = document.querySelectorAll('a[target="_blank"]');
        
        externalLinks.forEach(link => {
            link.addEventListener('click', function() {
                // Adiciona classe de loading
                this.classList.add('loading');
                
                // Remove o loading após um tempo (caso a página não abra imediatamente)
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 1000);
            });
        });
    }

    /**
     * Utilitário para debounce de funções
     * Executa a função apenas após parar de chamar por X milissegundos
     */
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

    /**
     * Utilitário para throttle de funções
     * Executa a função no máximo uma vez a cada X milissegundos
     * Ideal para eventos de scroll e resize
     */
    function throttle(func, limit) {
        let inThrottle;
        return function executedFunction(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => {
                    inThrottle = false;
                }, limit);
            }
        };
    }

    // Exporta funções úteis para uso global se necessário
    window.Portfolio = {
        debounce: debounce,
        throttle: throttle
    };

})();

