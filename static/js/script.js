// Configuração do EmailJS
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // Substitua pela sua chave pública do EmailJS
})();

// ===== HERO CAROUSEL =====
document.addEventListener('DOMContentLoaded', function() {
    // Carrossel do Hero
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    let currentSlide = 0;
    let slideInterval;

    // Função para mostrar slide específico
    function showSlide(index) {
        // Remove active de todos os slides e dots
        carouselSlides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Adiciona active ao slide e dot atual
        carouselSlides[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentSlide = index;
    }

    // Função para próximo slide
    function nextSlide() {
        const next = (currentSlide + 1) % carouselSlides.length;
        showSlide(next);
    }

    // Função para slide anterior
    function prevSlide() {
        const prev = (currentSlide - 1 + carouselSlides.length) % carouselSlides.length;
        showSlide(prev);
    }

    // Função para iniciar carrossel automático
    function startCarousel() {
        slideInterval = setInterval(nextSlide, 5000); // Muda a cada 5 segundos
    }

    // Função para parar carrossel automático
    function stopCarousel() {
        clearInterval(slideInterval);
    }

    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopCarousel();
            startCarousel();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopCarousel();
            startCarousel();
        });
    }

    // Event listeners para os dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            stopCarousel();
            startCarousel();
        });
    });

    // Pausar carrossel quando hover
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', stopCarousel);
        heroSection.addEventListener('mouseleave', startCarousel);
    }

    // Iniciar carrossel
    if (carouselSlides.length > 0) {
        startCarousel();
    }

    // Featured Treatments Animation
    const treatmentCards = document.querySelectorAll('.treatment-card');
    const floatingElements = document.querySelectorAll('.floating-element');

    // Intersection Observer para animar cards quando entram na tela
    const treatmentsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Aplicar animação inicial aos cards
    treatmentCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        treatmentsObserver.observe(card);
    });

    // Animação dos elementos flutuantes
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 2}s`;
    });

    // Products Expand/Collapse Functionality
    const showMoreBtn = document.getElementById('showMoreProducts');
    const extraProducts = document.getElementById('extraProducts');
    const btnText = document.getElementById('btnText');
    const btnIcon = document.getElementById('btnIcon');
    let isExpanded = false;

    if (showMoreBtn && extraProducts) {
        showMoreBtn.addEventListener('click', () => {
            if (!isExpanded) {
                // Mostrar produtos extras
                extraProducts.style.display = 'grid';
                btnText.textContent = 'Ver Menos Produtos';
                btnIcon.className = 'fas fa-arrow-up';
                isExpanded = true;
                
                // Scroll suave para os novos produtos
                setTimeout(() => {
                    extraProducts.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }, 300);
            } else {
                // Ocultar produtos extras
                extraProducts.style.display = 'none';
                btnText.textContent = 'Ver Todos os Produtos';
                btnIcon.className = 'fas fa-arrow-right';
                isExpanded = false;
            }
        });
    }

    // Services Sidebar Functionality
    const showMoreServicesBtn = document.getElementById('showMoreServices');
    const servicesSidebar = document.getElementById('servicesSidebar');
    const sidebarClose = document.getElementById('sidebarClose');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const serviceSearch = document.getElementById('serviceSearch');

    // Abrir sidebar
    if (showMoreServicesBtn && servicesSidebar) {
        showMoreServicesBtn.addEventListener('click', () => {
            servicesSidebar.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevenir scroll do body
        });
    }

    // Fechar sidebar
    function closeSidebar() {
        servicesSidebar.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restaurar scroll do body
        serviceSearch.value = ''; // Limpar busca
        filterServices(''); // Mostrar todos os serviços
    }

    if (sidebarClose) {
        sidebarClose.addEventListener('click', closeSidebar);
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeSidebar);
    }

    // Fechar sidebar com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && servicesSidebar.classList.contains('active')) {
            closeSidebar();
        }
    });

    // Funcionalidade de busca
    if (serviceSearch) {
        serviceSearch.addEventListener('input', (e) => {
            filterServices(e.target.value);
        });
    }

    // Função para filtrar serviços
    function filterServices(searchTerm) {
        const serviceItems = document.querySelectorAll('.service-item-compact');
        const searchLower = searchTerm.toLowerCase();

        serviceItems.forEach(item => {
            const serviceName = item.textContent.toLowerCase();
            if (serviceName.includes(searchLower)) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });

        // Ocultar categorias vazias
        const categories = document.querySelectorAll('.service-category-compact');
        categories.forEach(category => {
            const visibleItems = category.querySelectorAll('.service-item-compact:not(.hidden)');
            if (visibleItems.length === 0) {
                category.style.display = 'none';
            } else {
                category.style.display = 'block';
            }
        });
    }

    // Adicionar funcionalidade de clique nos itens de serviço do sidebar
    const serviceItemsSidebar = document.querySelectorAll('.service-item-compact');
    serviceItemsSidebar.forEach(item => {
        item.addEventListener('click', () => {
            const serviceName = item.getAttribute('data-service');
            const whatsappMessage = `Olá! Gostaria de saber mais sobre o tratamento: ${serviceName}`;
            const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(whatsappMessage)}`;
            window.open(whatsappUrl, '_blank');
        });
    });
});

// ===== HERO SECTION INTERACTIVE EFFECTS =====
document.addEventListener('DOMContentLoaded', function() {
    // Parallax Effect
    const parallaxElements = document.querySelectorAll('.parallax-bg, .floating-circle');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    });

    // Mouse Movement Effect
    const heroSection = document.querySelector('.hero');
    const floatingElements = document.querySelectorAll('.floating-circle');
    
    heroSection.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        const xPos = (clientX / innerWidth) * 100;
        const yPos = (clientY / innerHeight) * 100;
        
        floatingElements.forEach((element, index) => {
            const speed = (index + 1) * 0.5;
            const x = (xPos - 50) * speed;
            const y = (yPos - 50) * speed;
            
            element.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // Intersection Observer for Animations
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

    // Observe showcase items
    const showcaseItems = document.querySelectorAll('.showcase-item');
    showcaseItems.forEach(item => {
        observer.observe(item);
    });

    // Counter Animation for Stats
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalNumber = target.textContent;
                const isPercentage = finalNumber.includes('%');
                const isPlus = finalNumber.includes('+');
                const number = parseInt(finalNumber.replace(/[^\d]/g, ''));
                
                animateCounter(target, 0, number, 2000, isPercentage, isPlus);
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Button Hover Effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Image Frame 3D Effect
    const imageFrame = document.querySelector('.image-frame');
    if (imageFrame) {
        imageFrame.addEventListener('mousemove', (e) => {
            const rect = imageFrame.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            imageFrame.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
        
        imageFrame.addEventListener('mouseleave', () => {
            imageFrame.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    }

    // Scroll Indicator Click
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const nextSection = document.querySelector('#produtos');
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Typing Effect for Title
    const titleLines = document.querySelectorAll('.title-line');
    titleLines.forEach((line, index) => {
        const text = line.textContent;
        line.textContent = '';
        line.style.opacity = '1';
        
        setTimeout(() => {
            typeWriter(line, text, 50);
        }, index * 200);
    });
});

// Helper Functions
function animateCounter(element, start, end, duration, isPercentage = false, isPlus = false) {
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(progress * (end - start) + start);
        let displayText = current.toString();
        
        if (isPercentage) displayText += '%';
        if (isPlus) displayText += '+';
        
        element.textContent = displayText;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

function typeWriter(element, text, speed) {
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

// Smooth reveal animation for elements
function addRevealAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: revealUp 0.8s ease forwards;
        }
        
        @keyframes revealUp {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize reveal animations
addRevealAnimation();

// Menu Mobile
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu mobile
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Fechar menu ao clicar fora dele
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Scroll suave para seções
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header transparente no scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {

    } else {

    }
});

// Animação de entrada dos elementos
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

// Observar elementos para animação
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.product-card, .service-card, .feature, .contact-item, .value-card, .timeline-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Animar estatísticas quando entrarem na viewport
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    animateCounter(stat, target, 2000);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// Contador animado para estatísticas (se necessário)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Lazy loading para imagens
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
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
    
    images.forEach(img => imageObserver.observe(img));
});

// Validação de formulário (se adicionar formulário no futuro)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// Função para enviar email (se implementar formulário)
function sendEmail(formData) {
    const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        phone: formData.phone
    };
    
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(function(response) {
            console.log('Email enviado com sucesso!', response.status, response.text);
            showNotification('Mensagem enviada com sucesso!', 'success');
        }, function(error) {
            console.log('Erro ao enviar email:', error);
            showNotification('Erro ao enviar mensagem. Tente novamente.', 'error');
        });
}

// Sistema de notificações
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Estilos da notificação
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Cores baseadas no tipo
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        info: '#17a2b8',
        warning: '#ffc107'
    };
    
    notification.style.backgroundColor = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover após 5 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Parallax suave para o hero
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Botão de voltar ao topo
function createBackToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'back-to-top';
    button.setAttribute('aria-label', 'Voltar ao topo');
    
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--accent-color);
        color: white;
        border: none;
        cursor: pointer;
        font-size: 18px;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    button.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Efeito hover
    button.addEventListener('mouseenter', function() {
        this.style.background = '#d4a5a8'; // Versão mais escura do accent-color
        this.style.transform = 'scale(1.1)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.background = 'var(--accent-color)';
        this.style.transform = 'scale(1)';
    });
    
    document.body.appendChild(button);
    
    // Mostrar/ocultar botão baseado no scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
}

// Inicializar botão de voltar ao topo
document.addEventListener('DOMContentLoaded', createBackToTopButton);

// ===== CONTROLE DE ELEMENTOS DECORATIVOS =====
document.addEventListener('DOMContentLoaded', function() {
    const productsSection = document.querySelector('.products');
    const aboutSection = document.querySelector('.about');
    
    // Intersection Observer para ativar elementos decorativos
    const decorativesObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Adicionar classe 'active' para mostrar elementos decorativos
                entry.target.classList.add('active');
            } else {
                // Remover classe 'active' para ocultar elementos decorativos
                entry.target.classList.remove('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
    });
    
    // Observar apenas as seções de produtos e sobre
    if (productsSection) {
        decorativesObserver.observe(productsSection);
    }
    
    if (aboutSection) {
        decorativesObserver.observe(aboutSection);
    }
});

// Newsletter Form
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            const button = this.querySelector('.newsletter-btn');
            const originalText = button.innerHTML;
            
            // Validação básica de email
            if (!isValidEmail(email)) {
                showNotification('Por favor, insira um e-mail válido.', 'error');
                return;
            }
            
            // Simular envio
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            button.disabled = true;
            
            setTimeout(() => {
                showNotification('Obrigada por se inscrever! Você receberá nossas novidades em breve.', 'success');
                this.reset();
                button.innerHTML = originalText;
                button.disabled = false;
            }, 2000);
        });
    }
});

// Validação de email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Products Carousel
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('productsCarousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('carouselDots');
    
    if (!carousel || !prevBtn || !nextBtn || !dotsContainer) return;
    
    const slides = carousel.querySelectorAll('.product-slide');
    const totalSlides = slides.length;
    let currentSlide = 0;
    let slidesToShow = 3; // Desktop
    let slideWidth = 100 / slidesToShow;
    
    // Ajustar slides visíveis baseado no tamanho da tela
    function updateSlidesToShow() {
        if (window.innerWidth <= 480) {
            slidesToShow = 1;
        } else if (window.innerWidth <= 768) {
            slidesToShow = 2;
        } else {
            slidesToShow = 3;
        }
        slideWidth = 100 / slidesToShow;
        updateCarousel();
    }
    
    // Criar dots
    function createDots() {
        dotsContainer.innerHTML = '';
        const totalDots = Math.ceil(totalSlides / slidesToShow);
        
        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('div');
            dot.className = 'carousel-dot';
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }
    
    // Atualizar carrossel
    function updateCarousel() {
        const translateX = -currentSlide * slideWidth;
        carousel.style.transform = `translateX(${translateX}%)`;
        
        // Atualizar dots
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === Math.floor(currentSlide / slidesToShow));
        });
        
        // Atualizar botões
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide >= totalSlides - slidesToShow;
    }
    
    // Ir para slide específico
    function goToSlide(slideIndex) {
        currentSlide = slideIndex * slidesToShow;
        updateCarousel();
    }
    
    // Próximo slide
    function nextSlide() {
        if (currentSlide < totalSlides - slidesToShow) {
            currentSlide += slidesToShow;
            updateCarousel();
        }
    }
    
    // Slide anterior
    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide -= slidesToShow;
            updateCarousel();
        }
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Auto-play (opcional)
    let autoPlayInterval;
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            if (currentSlide >= totalSlides - slidesToShow) {
                currentSlide = 0;
            } else {
                currentSlide += slidesToShow;
            }
            updateCarousel();
        }, 5000);
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    // Pausar auto-play ao hover
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
    
    // Touch/swipe support
    let startX = 0;
    let isDragging = false;
    
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        stopAutoPlay();
    });
    
    carousel.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
    });
    
    carousel.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        
        const endX = e.changedTouches[0].clientX;
        const diffX = startX - endX;
        
        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
        
        startAutoPlay();
    });
    
    // Resize handler
    window.addEventListener('resize', () => {
        updateSlidesToShow();
        createDots();
    });
    
    // Inicializar
    updateSlidesToShow();
    createDots();
    updateCarousel();
    startAutoPlay();
});

// Preloader (opcional)
function hidePreloader() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
}

// Esconder preloader quando a página carregar
window.addEventListener('load', hidePreloader);

// ===== HERO VIDEO CONTROL =====
document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('.hero-video video');
    const videoContainer = document.querySelector('.video-container');
    
    if (video && videoContainer) {
        // Verificar se o vídeo existe e pode ser carregado
        video.addEventListener('loadstart', function() {
            console.log('Iniciando carregamento do vídeo MOV...');
        });
        
        video.addEventListener('canplay', function() {
            console.log('Vídeo pode ser reproduzido!');
            videoContainer.classList.add('video-loaded');
            video.style.display = 'block';
            
            // Tentar reproduzir
            video.play().catch(function(error) {
                console.log('Autoplay foi bloqueado:', error);
                // Tentar novamente após um pequeno delay
                setTimeout(function() {
                    video.play().catch(function(err) {
                        console.log('Segunda tentativa de autoplay falhou:', err);
                    });
                }, 1000);
            });
        });
        
        video.addEventListener('loadeddata', function() {
            console.log('Dados do vídeo carregados!');
        });
        
        video.addEventListener('error', function(e) {
            console.log('Erro ao carregar vídeo MOV:', e);
            console.log('Detalhes do erro:', video.error);
            // Manter a imagem como fallback
            videoContainer.classList.remove('video-loaded');
        });
        
        // Garantir que o vídeo continue em loop
        video.addEventListener('ended', function() {
            video.currentTime = 0;
            video.play();
        });
        
        // Tentar carregar o vídeo
        video.load();
        
        // Se não houver vídeo disponível, usar apenas a imagem
        setTimeout(function() {
            if (!videoContainer.classList.contains('video-loaded')) {
                console.log('Usando imagem como fallback - vídeo não disponível');
                // A imagem já está visível por padrão
            }
        }, 5000);
    }
});

// Melhorar performance com debounce
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

// Aplicar debounce ao scroll
const debouncedScroll = debounce(function() {
    // Código que executa no scroll
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Detectar dispositivo móvel
function isMobile() {
    return window.innerWidth <= 768;
}

// Ajustar comportamentos baseado no dispositivo
if (isMobile()) {
    // Desabilitar parallax em dispositivos móveis para melhor performance
    window.removeEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Log de erros JavaScript
window.addEventListener('error', function(e) {
    console.error('Erro JavaScript:', e.error);
    // Aqui você pode enviar o erro para um serviço de monitoramento
});

// Service Worker para cache (opcional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registrado com sucesso');
            })
            .catch(function(error) {
                console.log('Falha ao registrar ServiceWorker:', error);
            });
    });
}
