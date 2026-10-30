const IMG = {
  "ceo": "images/ceo-new.jpg",
  "ceo-new": "images/ceo-new.jpg",
  "gate1": "images/gate1.jpg",
  "yard": "images/yard.jpg",
  "handover": "images/handover.jpg",
  "redtruck": "images/redtruck.jpg",
  "sewing": "images/sewing.jpg",
  "zanco": "images/zanco.jpg",
  "logo": "images/logo-clean.png",
  "logo-clean": "images/logo-clean.png",
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

// Central Service Category Selector (Tab switching between Transport and Trading)
const catTabs = document.querySelectorAll('.svc-cat-tab');
if (catTabs.length > 0) {
  catTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      catTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
        t.tabIndex = -1;
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      tab.tabIndex = 0;

      const targetId = tab.getAttribute('aria-controls');
      document.querySelectorAll('.svc-tab-panel').forEach(panel => {
        if (panel.id === targetId) {
          panel.removeAttribute('hidden');
          panel.classList.add('active');
        } else {
          panel.setAttribute('hidden', '');
          panel.classList.remove('active');
        }
      });
    });

    tab.addEventListener('keydown', e => {
      const tabsArr = Array.from(catTabs);
      const currIdx = tabsArr.indexOf(tab);
      let nextIdx = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextIdx = (currIdx + 1) % tabsArr.length;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') nextIdx = (currIdx - 1 + tabsArr.length) % tabsArr.length;
      if (nextIdx !== null) {
        e.preventDefault();
        tabsArr[nextIdx].click();
        tabsArr[nextIdx].focus();
      }
    });
  });
}

// Accordion Expandable Functionality (Hover on Desktop, Tap/Click & Accessible on Mobile)
document.querySelectorAll('.svc-accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    const item = header.closest('.svc-accordion-item');
    const isExpanded = header.getAttribute('aria-expanded') === 'true';

    header.setAttribute('aria-expanded', String(!isExpanded));
    item.classList.toggle('active', !isExpanded);
  });
});

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
      'Service requirement: ' + v('type'),
      '',
      'Message:',
      v('message')
    ].join('\n');

    const url = 'mailto:info@bhbinternational.com?subject=' + encodeURIComponent('Business enquiry: ' + v('type') + ' (' + v('name') + ')') + '&body=' + encodeURIComponent(body);
    st.className = 'status';
    st.textContent = 'Opening your email application with the enquiry prepared. If it does not open automatically, please send your email directly to info@bhbinternational.com.';
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


// ==========================================================================
// ADVANCED GLOBAL MICRO-INTERACTIONS & MOTION SYSTEM
// ==========================================================================

// 1. Subtle Parallax Effect for Hero Sections
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  const heroEl = document.querySelector('.hero');
  if (heroEl) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
          if (scrolled < 700) {
            heroEl.style.backgroundPositionY = `calc(35% + ${scrolled * 0.18}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // 2. Interactive 3D Perspective Tilt on Interactive Cards
  const tiltCards = document.querySelectorAll('.fact-card, .val-card, .step-card, .hsqe-block, .advantage-node, .process-node');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;
      
      const rotateX = -deltaY * 5; // max 5 deg tilt
      const rotateY = deltaX * 5;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}


// Sequential entrance animation for connected framework tracks
const trackObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-animated');
      const nodes = entry.target.querySelectorAll('.advantage-node, .process-node, .step-card');
      nodes.forEach((node, idx) => {
        setTimeout(() => {
          node.style.opacity = '1';
          node.style.transform = 'translateY(0)';
        }, idx * 140);
      });
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.advantage-track, .process-timeline, .steps-4grid').forEach(el => {
  trackObserver.observe(el);
});
