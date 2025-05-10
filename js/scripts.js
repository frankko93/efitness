/*
 * Main JavaScript file for eFitness
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('eFitness site loaded');
    
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('nav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.classList.toggle('active');
            
            // Prevenir scroll cuando el menú está abierto
            if (mainNav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mainNav && mainNav.classList.contains('active')) {
            if (!event.target.closest('nav') && !event.target.closest('.mobile-menu-toggle')) {
                mainNav.classList.remove('active');
                if (mobileMenuToggle) {
                    mobileMenuToggle.classList.remove('active');
                }
                document.body.style.overflow = '';
            }
        }
    });
    
    // Cerrar menú al hacer clic en enlaces de navegación
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Language switcher - Corregido
    const langEs = document.getElementById('lang-es');
    const langEn = document.getElementById('lang-en');
    const langEsMobile = document.getElementById('lang-es-mobile');
    const langEnMobile = document.getElementById('lang-en-mobile');

    // Inicializar el estado - Español por defecto
    setLanguage('es');
    
    // Eventos de cambio de idioma - Desktop
    if (langEs && langEn) {
        langEs.addEventListener('click', function(e) {
            e.preventDefault();
            setLanguage('es');
        });

        langEn.addEventListener('click', function(e) {
            e.preventDefault();
            setLanguage('en');
        });
    }
    
    // Eventos de cambio de idioma - Mobile
    if (langEsMobile && langEnMobile) {
        langEsMobile.addEventListener('click', function(e) {
            e.preventDefault();
            setLanguage('es');
        });

        langEnMobile.addEventListener('click', function(e) {
            e.preventDefault();
            setLanguage('en');
        });
    }
    
    // Función para cambiar el idioma
    function setLanguage(lang) {
        console.log('Changing language to:', lang);
        
        // Actualizar clases activas en los botones - Desktop
        if (langEs && langEn) {
            if (lang === 'es') {
                langEs.classList.add('active');
                langEn.classList.remove('active');
            } else {
                langEs.classList.remove('active');
                langEn.classList.add('active');
            }
        }
        
        // Actualizar clases activas en los botones - Mobile
        if (langEsMobile && langEnMobile) {
            if (lang === 'es') {
                langEsMobile.classList.add('active');
                langEnMobile.classList.remove('active');
            } else {
                langEsMobile.classList.remove('active');
                langEnMobile.classList.add('active');
            }
        }
        
        // Mostrar/ocultar elementos según el idioma
        document.querySelectorAll('.lang-content').forEach(el => {
            const id = el.id || '';
            
            if (id.endsWith(`-${lang}`)) {
                el.style.display = 'block';
            } else if (id.endsWith('-es') || id.endsWith('-en')) {
                el.style.display = 'none';
            }
        });
        
        // Actualizar título de la página
        if (lang === 'es') {
            document.title = 'eFitness';
        } else {
            document.title = 'eFitness - English';
        }
        
        // Guardar preferencia en localStorage para mantenerla entre páginas
        localStorage.setItem('language', lang);
        
        // Cerrar menú móvil si está abierto
        if (mainNav && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            if (mobileMenuToggle) {
                mobileMenuToggle.classList.remove('active');
            }
            document.body.style.overflow = '';
        }
    }
    
    // Cargar idioma guardado, si existe
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
        setLanguage(savedLanguage);
    }
}); 