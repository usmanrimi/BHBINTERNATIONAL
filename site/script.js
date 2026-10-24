const IMG = {
  "ceo": "images/ceo.jpg",
  "gate1": "images/gate1.jpg",
  "yard": "images/yard.jpg",
  "handover": "images/handover.jpg",
  "redtruck": "images/redtruck.jpg",
  "sewing": "images/sewing.jpg",
  "zanco": "images/zanco.jpg",
  "logo": "images/logo.png",
  "gate2": "images/gate2.jpg",
  "zango": "images/zango.jpg",
  "bow": "images/bow.jpg",
  "dock": "images/dock.jpg",
  "apapa": "images/apapa.jpg",
  "event": "images/event.jpg",
  "tugs": "images/tugs.jpg",
  "silos": "images/silos.jpg"
};

// Render images mapped by data-img
document.querySelectorAll('img[data-img]').forEach(i => {
  const key = i.dataset.img;
  if (IMG[key]) {
    i.src = IMG[key];
  }
});

// Mobile menu toggle
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');

if (burger && menu) {
  burger.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', isOpen);
  });

  menu.addEventListener('click', e => {
    if (e.target.closest('a')) {
      menu.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });

  // Close menu on click outside
  document.addEventListener('click', e => {
    if (!menu.contains(e.target) && !burger.contains(e.target) && menu.classList.contains('open')) {
      menu.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });
}

// Active page link detection in header navigation
(function highlightActivePage() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const page = href.split('#')[0];
    if (page === currentPath || (currentPath === '' && page === 'index.html') || (currentPath === 'index.html' && page === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

// Scroll header elevation effect
const headerNav = document.querySelector('header.nav');
if (headerNav) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      headerNav.classList.add('scrolled');
    } else {
      headerNav.classList.remove('scrolled');
    }
  }, { passive: true });
}

// Service tabs functionality
const tabs = [...document.querySelectorAll('.tab')];
function selectServiceTab(idx, focus) {
  tabs.forEach((tab, k) => {
    const isSelected = k === idx;
    tab.setAttribute('aria-selected', isSelected);
    tab.tabIndex = isSelected ? 0 : -1;
    const panel = document.getElementById('p' + k);
    if (panel) {
      panel.hidden = !isSelected;
      if (isSelected) {
        panel.style.opacity = '0';
        panel.style.transform = 'translateY(6px)';
        setTimeout(() => {
          panel.style.transition = 'opacity 0.28s ease, transform 0.28s ease';
          panel.style.opacity = '1';
          panel.style.transform = 'translateY(0)';
        }, 10);
      }
    }
  });
  if (focus && tabs[idx]) tabs[idx].focus();
}

if (tabs.length > 0) {
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => selectServiceTab(i));
    tab.addEventListener('keydown', e => {
      let nextIndex = null;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') nextIndex = (i + 1) % tabs.length;
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') nextIndex = (i - 1 + tabs.length) % tabs.length;
      if (e.key === 'Home') nextIndex = 0;
      if (e.key === 'End') nextIndex = tabs.length - 1;
      if (nextIndex !== null) {
        e.preventDefault();
        selectServiceTab(nextIndex, true);
      }
    });
  });

  // Check URL hash for direct tab link (e.g. #t2)
  if (window.location.hash) {
    const hash = window.location.hash.replace('#', '');
    const tabMatch = tabs.findIndex(t => t.id === hash || t.getAttribute('aria-controls') === hash);
    if (tabMatch !== -1) {
      selectServiceTab(tabMatch);
    }
  }
}

// Enquiry form handler
const enqForm = document.getElementById('enq');
if (enqForm) {
  enqForm.addEventListener('submit', e => {
    e.preventDefault();
    const f = e.target;
    const st = document.getElementById('status');
    const v = n => f.elements[n] ? f.elements[n].value.trim() : '';

    if (!v('name') || !v('email') || !v('message')) {
      st.className = 'status err';
      st.textContent = 'Please provide your name, email address, and message.';
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(v('email'))) {
      st.className = 'status err';
      st.textContent = 'Please enter a valid email address.';
      return;
    }

    const body = [
      'Name: ' + v('name'),
      'Organisation: ' + v('org'),
      'Email: ' + v('email'),
      'Phone: ' + v('phone'),
      'Enquiry type: ' + v('type'),
      '',
      'Message:',
      v('message')
    ].join('\n');

    const url = 'mailto:info@bhbinternational.com?subject=' + encodeURIComponent('Business enquiry: ' + v('type') + ' (' + v('name') + ')') + '&body=' + encodeURIComponent(body);
    st.className = 'status';
    st.textContent = 'Opening your email client with the enquiry prepared. If it does not open automatically, please send your email directly to info@bhbinternational.com.';
    window.location.href = url;
  });
}

// Scroll-triggered animations via Intersection Observer
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.1
  });

  document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
    revealObserver.observe(el);
  });
} else {
  document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
    el.classList.add('is-visible');
  });
}