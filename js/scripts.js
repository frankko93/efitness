/*
 * Main JavaScript file for eFitness
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('eFitness site loaded');
    
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav a');
    
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

    // Función para detectar la sección activa
    function setActiveSection() {
        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('nav ul li a');
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const offset = 100; // Ajuste para el header fijo
            
            if (rect.top <= offset && rect.bottom >= offset) {
                const currentId = section.getAttribute('id');
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${currentId}` || 
                        (currentId === 'hero' && item.getAttribute('href') === 'index.html')) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    // Detectar sección activa al hacer scroll
    window.addEventListener('scroll', setActiveSection);
    
    // Detectar sección activa al cargar la página
    setActiveSection();

    // Detectar si es dispositivo móvil
    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    // Manejar el video de fondo
    function handleBackgroundVideo() {
        const videoBackground = document.querySelector('.video-background');
        const video = videoBackground.querySelector('video');
        
        if (isMobileDevice()) {
            // En dispositivos móviles, ocultar el video y mostrar la imagen
            if (video) {
                video.style.display = 'none';
            }
            videoBackground.style.backgroundImage = "url('assets/img/gym-back.jpg')";
        } else {
            // En desktop, mostrar el video
            if (video) {
                video.style.display = 'block';
            }
        }
    }

    // Ejecutar al cargar la página
    handleBackgroundVideo();
}); 