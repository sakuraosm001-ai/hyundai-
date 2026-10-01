document.addEventListener('DOMContentLoaded', () => {
  const pageName = window.location.pathname.split('/').pop() || 'index.html';
  const isHomePage = pageName === 'index.html' || pageName === '';
  const navigationItems = [
    ['index.html', 'ГЛАВНАЯ'],
    ['models.html', 'МОДЕЛЬНЫЙ РЯД'],
    ['body-builders.html', 'НАДСТРОЙКИ'],
    ['chassis.html', 'ШАССИ В НАЛИЧИИ'],
    ['leasing.html', 'ЛИЗИНГ'],
    ['service.html', 'СЕРВИС И ЗАПЧАСТИ'],
    ['about.html', 'О КОМПАНИИ'],
    ['contacts.html', 'КОНТАКТЫ']
  ];

  const header = document.querySelector('.site-header');
  if (header) {
    header.innerHTML = `
      <div class="container header-inner">
        <div class="header-branding">
          <a href="index.html" class="brand" aria-label="Hyundai Truck & Bus Кыргызстан">
            <span class="brand__text">HYUNDAI TRUCK &amp; BUS KYRGYZSTAN</span>
          </a>
        </div>
        <div class="header-main">
          <nav class="site-nav" aria-label="Основное меню">
            <ul>
              ${navigationItems.map(([href, label]) => `<li class="nav-card${pageName === href ? ' is-active' : ''}"><a href="${href}">${label}</a></li>`).join('')}
            </ul>
          </nav>
          <div class="header-tools">
            <a class="mini-card phone-link" href="tel:+996558003003">+996 (558) 00 30 03</a>
            <a class="mini-card social-link" href="https://wa.me/996558003003" target="_blank" rel="noreferrer">WhatsApp</a>
            <a class="mini-card social-link" href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
            <button class="btn btn-primary btn-small" type="button" data-track="contact-button">Получить консультацию</button>
          </div>
        </div>
        <button class="menu-toggle" type="button" aria-label="Открыть меню" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>`;
  }

  if (!isHomePage) {
    document.body.classList.add('is-interior-page');
    const main = document.querySelector('main');
    if (main && !main.querySelector('.page-back')) {
      const back = document.createElement('div');
      back.className = 'container page-back-wrap';
      back.innerHTML = '<a class="page-back" href="index.html#menu">← Назад</a>';
      main.prepend(back);
    }
  }

  const yearNode = document.getElementById('year');
  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }

  const siteHeader = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');

  const applyHeaderState = () => {
    if (!siteHeader) return;
    const scrolled = window.scrollY > 24;
    siteHeader.classList.toggle('scrolled', scrolled);
  };

  window.addEventListener('scroll', applyHeaderState, { passive: true });
  applyHeaderState();

  if (menuToggle && nav) {
    if (isHomePage && window.location.hash === '#menu') {
      nav.classList.add('is-open');
      menuToggle.setAttribute('aria-expanded', 'true');
      menuToggle.setAttribute('aria-label', 'Закрыть меню');
    }

    menuToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Открыть меню');
      });
    });
  }

  const accordions = document.querySelectorAll('.accordion-item');
  accordions.forEach((item) => {
    const trigger = item.querySelector('.accordion-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      accordions.forEach((allItems) => {
        allItems.classList.remove('is-open');
        const btn = allItems.querySelector('.accordion-trigger');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  const trackButtons = document.querySelectorAll('[data-track]');
  trackButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const eventName = button.dataset.track;
      if (typeof window !== 'undefined' && typeof window.trackAnalyticsEvent === 'function') {
        window.trackAnalyticsEvent(eventName);
      }
    });
  });

});

