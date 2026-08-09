document.addEventListener('DOMContentLoaded', function() {
    const popupModal = document.getElementById('popupModal');

    fetch('content.json')
        .then(response => response.json())
        .then(data => {
            if (data.hero) {
                const heroTitle = document.querySelector('.hero-content h1');
                const heroDesc = document.querySelector('.hero-content p');
                const heroImg = document.querySelector('.hero-image img');
                const badge1 = document.getElementById('heroBadge1');
                const badge2 = document.getElementById('heroBadge2');

                if (heroTitle && data.hero.title) heroTitle.textContent = data.hero.title;
                if (heroDesc && data.hero.description) heroDesc.textContent = data.hero.description;
                if (heroImg && data.hero.image) {
                    heroImg.src = data.hero.image;
                    heroImg.alt = 'Мастер ремонтирует стиральную машину на дому';
                }
                if (badge1 && data.hero.badge1) badge1.textContent = data.hero.badge1;
                if (badge2 && data.hero.badge2) badge2.textContent = data.hero.badge2;
            }

            if (data.advantages) {
                const advImg = document.getElementById('advantagesImage');
                if (advImg && data.advantages.image) advImg.src = data.advantages.image;
            }

            if (data.contacts) {
                document.querySelectorAll('a[href^="tel:"]').forEach(link => {
                    link.href = `tel:${data.contacts.phone_raw}`;
                    if (link.classList.contains('phone-link') || link.closest('.mobile-cta')) {
                        const svg = link.querySelector('svg');
                        link.textContent = ' ' + data.contacts.phone;
                        if (svg) link.prepend(svg);
                    }
                });

                document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
                    link.href = `mailto:${data.contacts.email}`;
                    link.textContent = data.contacts.email;
                });
            }

            if (data.team && data.team.length) {
                const teamGrid = document.getElementById('teamGrid');
                if (teamGrid) {
                    teamGrid.innerHTML = data.team.map(member => `
                        <div class="team-member">
                            <div class="team-photo">
                                <img src="${member.photo}" alt="${member.name} — ${member.role}" loading="lazy" width="200" height="200">
                            </div>
                            <h3>${member.name}</h3>
                            <p class="team-role">${member.role}</p>
                            <p class="team-bio">${member.bio}</p>
                        </div>
                    `).join('');
                }
            }
        })
        .catch(err => console.error('Error loading content:', err));

    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const widgetToggle = document.getElementById('widgetToggle');
    const popupOverlay = document.getElementById('popupOverlay');
    const popupClose = document.getElementById('popupClose');
    const openPopupButtons = document.querySelectorAll('.open-popup');
    const forms = document.querySelectorAll('form');

    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', navMenu.classList.contains('active'));
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });

    widgetToggle.addEventListener('click', function() {
        popupModal.classList.add('active');
    });

    popupClose.addEventListener('click', function() {
        popupModal.classList.remove('active');
    });

    popupOverlay.addEventListener('click', function() {
        popupModal.classList.remove('active');
    });

    function openPopup(e) {
        e.preventDefault();
        popupModal.classList.add('active');
    }

    openPopupButtons.forEach(button => {
        button.addEventListener('click', openPopup);
    });

    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (form.classList.contains('popup-form')) {
                alert('Спасибо за заявку! Мы перезвоним вам в течение 15 минут.');
                popupModal.classList.remove('active');
            } else {
                alert('Спасибо за заявку! Мы свяжемся с вами в течение 15 минут.');
            }
            form.reset();
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offset = target.getBoundingClientRect().top + window.pageYOffset - 80;
                    window.scrollTo({ top: offset, behavior: 'smooth' });
                }
            }
        });
    });

    const problemBtns = document.querySelectorAll('.problem-btn');
    const problemDisplay = document.getElementById('problemDisplay');

    const problemData = {
        'no-drain': {
            title: 'Не сливает воду',
            desc: 'Засор в фильтре, неисправность насоса или проблема со сливным шлангом — всё это устраняем быстро и без лишних затрат.',
            time: '30–60 минут',
            price: 'от 800 руб.',
            tag: 'Самая частая проблема',
            icon: '<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/><path d="M16 12l-4 4-4-4"/></svg>'
        },
        'no-spin': {
            title: 'Не крутит барабан',
            desc: 'Причиной может быть износ щёток двигателя, обрыв ремня или неисправность модуля управления. Проведём диагностику и вернём барабан в движение.',
            time: '45–90 минут',
            price: 'от 1200 руб.',
            icon: '<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>'
        },
        'leak': {
            title: 'Течёт вода',
            desc: 'Повреждение манжеты люка, патрубков или бака. Важно устранить течь сразу, чтобы избежать повреждения электроники и залива соседей.',
            time: '30–75 минут',
            price: 'от 900 руб.',
            icon: '<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>'
        },
        'no-power': {
            title: 'Не включается',
            desc: 'Проблема в сетевом шнуре, кнопке включения или плате управления. Мастер проверит цепи питания и восстановит работоспособность.',
            time: '45–90 минут',
            price: 'от 1500 руб.',
            icon: '<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" y1="2" x2="12" y2="12"/></svg>'
        },
        'noise': {
            title: 'Сильно шумит / прыгает',
            desc: 'Скорее всего, изношены подшипники или амортизаторы. Заменим детали на новые, чтобы машина работала тихо и устойчиво.',
            time: '1,5–3 часа',
            price: 'от 2500 руб.',
            icon: '<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>'
        }
    };

    function renderProblem(key, activeBtn) {
        const data = problemData[key];
        if (!data) return;

        problemBtns.forEach(btn => {
            const isActive = btn === activeBtn;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-selected', isActive);
        });

        problemDisplay.innerHTML = `
            <div class="display-content">
                <div class="display-icon">${data.icon}</div>
                <div class="display-text">
                    ${data.tag ? `<div class="featured-tag">${data.tag}</div>` : ''}
                    <h3>${data.title}</h3>
                    <p>${data.desc}</p>
                    <div class="repair-stats">
                        <div class="stat-item">
                            <span>Срок ремонта:</span>
                            <strong>${data.time}</strong>
                        </div>
                        <div class="stat-item">
                            <span>Стоимость:</span>
                            <strong>${data.price}</strong>
                        </div>
                    </div>
                    <a href="#" class="btn btn-primary open-popup">Устранить проблему</a>
                </div>
            </div>
        `;

        problemDisplay.querySelector('.open-popup').addEventListener('click', openPopup);
    }

    problemBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            renderProblem(this.getAttribute('data-problem'), this);
        });
    });

    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .review-card, .guarantee-item, .team-member, .problem-interactive, .process-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
});
