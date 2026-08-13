document.addEventListener('DOMContentLoaded', function() {
    const popupModal = document.getElementById('popupModal');

    fetch('content.json')
        .then(response => response.json())
        .then(data => {
            if (data.header) {
                const logo = document.querySelector('.logo');
                const status = document.querySelector('.status-indicator');
                const navCta = document.querySelector('.nav-cta');
                const navMenu = document.querySelector('.nav-menu');
                if (logo && data.header.logo) logo.textContent = data.header.logo;
                if (status && data.header.status) status.textContent = data.header.status;
                if (navCta && data.header.cta) navCta.textContent = data.header.cta;

                if (navMenu && Array.isArray(data.header.navItems)) {
                    const navLinks = navMenu.querySelectorAll('li a:not(.nav-cta)');
                    data.header.navItems.forEach((item, index) => {
                        const link = navLinks[index];
                        if (!link) return;
                        link.href = item.href || '#';
                        link.textContent = item.label || link.textContent;
                    });
                }
            }

            if (data.hero) {
                const heroTitle = document.querySelector('.hero-content h1');
                const heroDesc = document.querySelector('.hero-content p');
                const heroImg = document.querySelector('.hero-media img');
                const badge1 = document.getElementById('heroBadge1');
                const badge2 = document.getElementById('heroBadge2');
                const heroPrimaryCta = document.querySelector('.hero-cta .btn-primary');
                const heroSecondaryCta = document.querySelector('.hero-cta .btn-secondary');
                const trustItems = document.querySelectorAll('.trust-item span');

                if (heroTitle && data.hero.title) heroTitle.textContent = data.hero.title;
                if (heroDesc && data.hero.description) heroDesc.textContent = data.hero.description;
                if (badge1 && data.hero.badge1) badge1.textContent = data.hero.badge1;
                if (badge2 && data.hero.badge2) badge2.textContent = data.hero.badge2;
                if (heroPrimaryCta && data.hero.primaryCta) heroPrimaryCta.textContent = data.hero.primaryCta;
                if (heroSecondaryCta && data.hero.secondaryCta) heroSecondaryCta.textContent = data.hero.secondaryCta;
                if (trustItems.length && Array.isArray(data.hero.trustIndicators)) {
                    data.hero.trustIndicators.forEach((text, index) => {
                        if (trustItems[index]) trustItems[index].textContent = text;
                    });
                }
            }

            if (data.trustBar && Array.isArray(data.trustBar.items)) {
                const trustBarItems = document.querySelectorAll('.trust-bar-item');
                trustBarItems.forEach((item, index) => {
                    const title = item.querySelector('strong');
                    const subtitle = item.querySelector('span');
                    const content = data.trustBar.items[index];
                    if (title && content) title.textContent = content.title;
                    if (subtitle && content) subtitle.textContent = content.subtitle;
                });
            }

            if (data.problem) {
                const problemTitle = document.querySelector('.problem .section-header h2');
                const problemSubtitle = document.querySelector('.problem .section-header p');
                const problemButtons = document.querySelectorAll('.problem-btn span');
                const problemDisplay = document.getElementById('problemDisplay');
                problemItems = Array.isArray(data.problem.items) ? data.problem.items : [];
                if (problemTitle && data.problem.title) problemTitle.textContent = data.problem.title;
                if (problemSubtitle && data.problem.subtitle) problemSubtitle.textContent = data.problem.subtitle;
                problemButtons.forEach((btn, index) => {
                    const item = problemItems[index];
                    if (item && btn) btn.textContent = item.label;
                });
                if (problemDisplay && problemItems.length) {
                    const first = problemItems[0];
                    const activeKey = data.problem.defaultKey || first?.key || 'no-drain';
                    const activeItem = problemItems.find(item => item.key === activeKey) || first;
                    if (activeItem) {
                        problemDisplay.innerHTML = `
                            <div class="display-content">
                                <div class="display-icon">
                                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/><path d="M16 12l-4 4-4-4"/></svg>
                                </div>
                                <div class="display-text">
                                    ${activeItem.tag ? `<div class="featured-tag">${activeItem.tag}</div>` : ''}
                                    <h3>${activeItem.title}</h3>
                                    <p>${activeItem.description}</p>
                                    <div class="repair-stats">
                                        <div class="stat-item">
                                            <span>Срок ремонта:</span>
                                            <strong>${activeItem.time}</strong>
                                        </div>
                                        <div class="stat-item">
                                            <span>Стоимость:</span>
                                            <strong>${activeItem.price}</strong>
                                        </div>
                                    </div>
                                    <a href="#" class="btn btn-primary open-popup">${activeItem.cta}</a>
                                </div>
                            </div>`;
                    }
                }
            }

            if (data.services) {
                const servicesHeader = document.querySelector('#services .section-header h2');
                const servicesSubtitle = document.querySelector('#services .section-header p');
                const serviceCards = document.querySelectorAll('#services .service-card');
                if (servicesHeader && data.services.title) servicesHeader.textContent = data.services.title;
                if (servicesSubtitle && data.services.subtitle) servicesSubtitle.textContent = data.services.subtitle;
                serviceCards.forEach((card, index) => {
                    const item = data.services.items?.[index];
                    const title = card.querySelector('h3');
                    const desc = card.querySelector('p');
                    const link = card.querySelector('a');
                    if (title && item) title.textContent = item.title;
                    if (desc && item) desc.textContent = item.description;
                    if (link && item) link.textContent = item.linkText;
                });
            }

            if (data.advantages) {
                const advTitle = document.querySelector('#advantages h2');
                const advDesc = document.querySelector('#advantages .advantages-text > p');
                const advImg = document.getElementById('advantagesImage');
                const advList = document.querySelectorAll('#advantages .advantages-list li span');
                const advCta = document.querySelector('#advantages .section-cta .btn');
                if (advTitle && data.advantages.title) advTitle.textContent = data.advantages.title;
                if (advDesc && data.advantages.description) advDesc.textContent = data.advantages.description;
                advList.forEach((item, index) => {
                    if (data.advantages.list?.[index]) item.textContent = data.advantages.list[index];
                });
                if (advCta && data.advantages.cta) advCta.textContent = data.advantages.cta;
            }

            if (data.process) {
                const processTitle = document.querySelector('#process h2');
                const processSubtitle = document.querySelector('#process > .container > p');
                const processCards = document.querySelectorAll('#process .process-card');
                if (processTitle && data.process.title) processTitle.textContent = data.process.title;
                if (processSubtitle && data.process.subtitle) processSubtitle.textContent = data.process.subtitle;
                processCards.forEach((card, index) => {
                    const item = data.process.steps?.[index];
                    const badge = card.querySelector('.step-badge');
                    const title = card.querySelector('h3');
                    const desc = card.querySelector('p');
                    if (badge && item) badge.textContent = item.badge;
                    if (title && item) title.textContent = item.title;
                    if (desc && item) desc.textContent = item.description;
                });
            }

            if (data.reviews) {
                const reviewsTitle = document.querySelector('#reviews h2');
                const reviewCards = document.querySelectorAll('#reviews .review-card');
                if (reviewsTitle && data.reviews.title) reviewsTitle.textContent = data.reviews.title;
                reviewCards.forEach((card, index) => {
                    const item = data.reviews.items?.[index];
                    const quote = card.querySelector('p');
                    const author = card.querySelector('.review-author span:first-child');
                    const meta = card.querySelector('.review-author span:last-child');
                    if (quote && item) quote.textContent = item.quote;
                    if (author && item) author.textContent = item.name;
                    if (meta && item) meta.textContent = item.meta;
                });
            }

            if (data.guarantees) {
                const guaranteesTitle = document.querySelector('.guarantees h2');
                const guaranteeItems = document.querySelectorAll('.guarantee-item');
                if (guaranteesTitle && data.guarantees.title) guaranteesTitle.textContent = data.guarantees.title;
                guaranteeItems.forEach((item, index) => {
                    const content = data.guarantees.items?.[index];
                    const title = item.querySelector('h3');
                    const desc = item.querySelector('p');
                    if (title && content) title.textContent = content.title;
                    if (desc && content) desc.textContent = content.description;
                });
            }

            if (data.team) {
                const teamTitle = document.querySelector('.team h2');
                const teamDesc = document.querySelector('.team > .container > p');
                const teamGrid = document.getElementById('teamGrid');
                if (teamTitle && data.team.title) teamTitle.textContent = data.team.title;
                if (teamDesc && data.team.description) teamDesc.textContent = data.team.description;
                if (teamGrid && Array.isArray(data.team.items)) {
                    const members = teamGrid.querySelectorAll('.team-member');
                    data.team.items.forEach((member, index) => {
                        const card = members[index];
                        if (!card) return;
                        const name = card.querySelector('h3');
                        const role = card.querySelector('.team-role');
                        const bio = card.querySelector('.team-bio');
                        if (name && member.name) name.textContent = member.name;
                        if (role && member.role) role.textContent = member.role;
                        if (bio && member.bio) bio.textContent = member.bio;
                    });
                }
            }

            if (data.faq) {
                const faqTitle = document.querySelector('#faq h2');
                const faqList = document.querySelectorAll('#faq .faq-item');
                const faqCta = document.querySelector('#faq .section-cta .btn');
                if (faqTitle && data.faq.title) faqTitle.textContent = data.faq.title;
                faqList.forEach((item, index) => {
                    const content = data.faq.items?.[index];
                    const summary = item.querySelector('summary');
                    const answer = item.querySelector('p');
                    if (summary && content) summary.textContent = content.question;
                    if (answer && content) answer.textContent = content.answer;
                });
                if (faqCta && data.faq.cta) faqCta.textContent = data.faq.cta;
            }

            if (data.contact) {
                const contactTitle = document.querySelector('#contact h2');
                const contactDesc = document.querySelector('#contact .contact-info > p');
                const urgency = document.querySelector('#contact .urgency-badge-large');
                const phoneLink = document.querySelector('#contact .contact-item a[href^="tel:"]');
                const emailLink = document.querySelector('#contact .contact-item a[href^="mailto:"]');
                const hours = document.querySelectorAll('#contact .contact-item span')[2];
                const serviceAreaTitle = document.querySelector('#contact .service-areas h4');
                const serviceAreaText = document.querySelector('#contact .service-areas p');
                const formTitle = document.querySelector('#contact .contact-form h3');
                const formSubtitle = document.querySelector('#contact .contact-form .form-subtitle');
                const formButton = document.querySelector('#contact .contact-form button');
                const formNote = document.querySelector('#contact .contact-form .form-note');
                const contactNotePhone = document.querySelectorAll('#contact .contact-item .contact-note')[0];
                const contactNoteEmail = document.querySelectorAll('#contact .contact-item .contact-note')[1];
                const contactNoteHours = document.querySelectorAll('#contact .contact-item .contact-note')[2];
                if (contactTitle && data.contact.title) contactTitle.textContent = data.contact.title;
                if (contactDesc && data.contact.description) contactDesc.textContent = data.contact.description;
                if (urgency && data.contact.urgency) urgency.textContent = data.contact.urgency;
                if (phoneLink && data.contact.phone) phoneLink.textContent = data.contact.phone;
                if (emailLink && data.contact.email) emailLink.textContent = data.contact.email;
                if (hours && data.contact.hours) hours.textContent = data.contact.hours;
                if (serviceAreaTitle && data.contact.serviceAreaTitle) serviceAreaTitle.textContent = data.contact.serviceAreaTitle;
                if (serviceAreaText && data.contact.serviceAreaText) serviceAreaText.textContent = data.contact.serviceAreaText;
                if (formTitle && data.contact.formTitle) formTitle.textContent = data.contact.formTitle;
                if (formSubtitle && data.contact.formSubtitle) formSubtitle.textContent = data.contact.formSubtitle;
                if (formButton && data.contact.buttonText) formButton.textContent = data.contact.buttonText;
                if (formNote && data.contact.formNote) formNote.textContent = data.contact.formNote;
                if (contactNotePhone && data.contact.contactNotePhone) contactNotePhone.textContent = data.contact.contactNotePhone;
                if (contactNoteEmail && data.contact.contactNoteEmail) contactNoteEmail.textContent = data.contact.contactNoteEmail;
                if (contactNoteHours && data.contact.contactNoteHours) contactNoteHours.textContent = data.contact.contactNoteHours;
            }

            if (data.footer) {
                const footerTitle = document.querySelector('.footer-section h3');
                const footerDesc = document.querySelector('.footer-section p');
                const footerQuickTitle = document.querySelectorAll('.footer-section h4')[0];
                const footerContactsTitle = document.querySelectorAll('.footer-section h4')[1];
                const footerBottom = document.querySelector('.footer-bottom p');
                if (footerTitle && data.footer.title) footerTitle.textContent = data.footer.title;
                if (footerDesc && data.footer.description) footerDesc.textContent = data.footer.description;
                if (footerQuickTitle && data.footer.quickLinksTitle) footerQuickTitle.textContent = data.footer.quickLinksTitle;
                if (footerContactsTitle && data.footer.contactsTitle) footerContactsTitle.textContent = data.footer.contactsTitle;
                if (footerBottom && data.footer.copyright) footerBottom.textContent = data.footer.copyright;
            }

            if (data.popup) {
                const popupTitle = document.querySelector('.popup-content h3');
                const popupDesc = document.querySelector('.popup-content p');
                const popupButton = document.querySelector('.popup-form .btn');
                const popupLink = document.querySelector('.popup-full-form');
                if (popupTitle && data.popup.title) popupTitle.textContent = data.popup.title;
                if (popupDesc && data.popup.description) popupDesc.textContent = data.popup.description;
                if (popupButton && data.popup.buttonText) popupButton.textContent = data.popup.buttonText;
                if (popupLink && data.popup.fullFormLink) popupLink.textContent = data.popup.fullFormLink;
            }

            if (data.mobileCta) {
                const mobileButton = document.querySelector('.mobile-cta .btn');
                if (mobileButton && data.mobileCta.text) mobileButton.lastChild.textContent = data.mobileCta.text;
            }

            if (data.contact) {
                document.querySelectorAll('a[href^="tel:"]').forEach(link => {
                    link.href = `tel:${data.contact.phone_raw}`;
                    if (link.classList.contains('phone-link') || link.closest('.mobile-cta')) {
                        const svg = link.querySelector('svg');
                        link.textContent = ' ' + data.contact.phone;
                        if (svg) link.prepend(svg);
                    }
                });

                document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
                    link.href = `mailto:${data.contact.email}`;
                    link.textContent = data.contact.email;
                });
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
    let problemItems = [];

    function renderProblem(key, activeBtn) {
        const item = problemItems.find(problem => problem.key === key);
        if (!item) return;

        problemBtns.forEach(btn => {
            const isActive = btn === activeBtn;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-selected', isActive);
        });

        problemDisplay.innerHTML = `
            <div class="display-content">
                <div class="display-icon">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/><path d="M16 12l-4 4-4-4"/></svg>
                </div>
                <div class="display-text">
                    ${item.tag ? `<div class="featured-tag">${item.tag}</div>` : ''}
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <div class="repair-stats">
                        <div class="stat-item">
                            <span>Срок ремонта:</span>
                            <strong>${item.time}</strong>
                        </div>
                        <div class="stat-item">
                            <span>Стоимость:</span>
                            <strong>${item.price}</strong>
                        </div>
                    </div>
                    <a href="#" class="btn btn-primary open-popup">${item.cta}</a>
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
