document.addEventListener('DOMContentLoaded', function() {

    // Lógica do Menu Hambúrguer
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        // Toggle (abre/fecha) o menu
        navLinks.classList.toggle('nav-active');
        document.body.classList.toggle('no-scroll');

        // Animação dos links aparecendo
        links.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Animação do ícone do hambúrguer para "X"
        hamburger.classList.toggle('toggle');
    });

    // Fecha o menu ao clicar em um link (melhora a experiência do usuário)
    navLinks.addEventListener('click', () => {
        if (navLinks.classList.contains('nav-active')) {
            hamburger.click();
        }
    });

    // Scroll suave para links de navegação
    const allLinks = document.querySelectorAll('.nav-links a, .cta-button, .logo');

    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Verifica se é um link de âncora
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Validação do formulário de contato
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
            formStatus.textContent = 'Por favor, preencha todos os campos.';
            formStatus.style.color = '#ff6b6b';
            return;
        }

        formStatus.textContent = 'Enviando sua mensagem...';
        formStatus.style.color = 'var(--accent-color)';

        setTimeout(() => {
            formStatus.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
            formStatus.style.color = 'var(--accent-color)';
            contactForm.reset();
        }, 2000);
    });

    // Adiciona a animação de fade-in para os links no CSS
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
        @keyframes navLinkFade {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0px);
            }
        }
    `;
    document.head.appendChild(styleSheet);
});
