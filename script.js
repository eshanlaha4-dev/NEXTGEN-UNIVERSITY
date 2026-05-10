document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('#mainNav');
  const searchToggle = document.querySelector('#searchToggle');
  const searchOverlay = document.querySelector('#searchOverlay');
  const searchClose = document.querySelector('#searchClose');
  const searchBackdrop = document.querySelector('.search-backdrop');
  const searchInput = document.querySelector('#searchInput');
  const hero = document.querySelector('.hero-section');
  const tiltItems = document.querySelectorAll('[data-tilt-card]');
  const counters = document.querySelectorAll('[data-counter]');
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const testimonialDots = document.querySelectorAll('.dot');

  let testimonialIndex = 0;
  let testimonialTimer = null;

  const updateNavbar = () => {
    nav?.classList.toggle('scrolled', window.scrollY > 30);
  };

  const openSearch = () => {
    searchOverlay?.classList.add('open');
    searchOverlay?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    searchInput?.focus();
  };

  const closeSearch = () => {
    searchOverlay?.classList.remove('open');
    searchOverlay?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (searchInput) searchInput.value = '';
  };

  const setTestimonial = (index) => {
    testimonialCards.forEach((card, idx) => card.classList.toggle('active', idx === index));
    testimonialDots.forEach((dot, idx) => dot.classList.toggle('active', idx === index));
    testimonialIndex = index;
  };

  const rotateTestimonials = () => {
    testimonialIndex = (testimonialIndex + 1) % testimonialCards.length;
    setTestimonial(testimonialIndex);
  };

  const animateCounters = () => {
    counters.forEach((counter) => {
      const target = Number(counter.dataset.counter) || 0;
      const duration = 1800;
      const startTime = performance.now();

      const step = (currentTime) => {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = Math.floor(eased * target).toLocaleString('en-US');
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };

      requestAnimationFrame(step);
    });
  };

  if (counters.length) {
    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.disconnect();
        }
      });
    }, { threshold: 0.4 });

    statsObserver.observe(document.querySelector('#stats'));
  }

  searchToggle?.addEventListener('click', openSearch);
  searchClose?.addEventListener('click', closeSearch);
  searchBackdrop?.addEventListener('click', closeSearch);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && searchOverlay?.classList.contains('open')) {
      closeSearch();
    }
  });

  searchInput?.addEventListener('input', (event) => {
    const value = event.target.value.trim().toLowerCase();
    document.querySelectorAll('.search-suggestions li').forEach((item) => {
      const text = item.textContent?.toLowerCase() || '';
      item.style.display = text.includes(value) ? 'block' : 'none';
    });
  });

  tiltItems.forEach((card) => {
    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const rotateX = (y - 0.5) * 10;
      const rotateY = (x - 0.5) * -10;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  hero?.addEventListener('mousemove', (event) => {
    const x = event.clientX / window.innerWidth;
    const y = event.clientY / window.innerHeight;
    hero.style.setProperty('--pointer-x', `${x * 100}%`);
    hero.style.setProperty('--pointer-y', `${y * 100}%`);
  });

  testimonialDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const index = Number(dot.dataset.index);
      setTestimonial(index);
      clearInterval(testimonialTimer);
      testimonialTimer = setInterval(rotateTestimonials, 5200);
    });
  });

  setTestimonial(0);
  testimonialTimer = setInterval(rotateTestimonials, 5200);
  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();
});

// Enhanced search functionality
document.getElementById('searchToggle').addEventListener('click', () => {
  document.getElementById('searchOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
});

document.getElementById('searchClose').addEventListener('click', () => {
  document.getElementById('searchOverlay').classList.remove('active');
  document.body.style.overflow = 'auto';
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Scroll animation trigger
AOS.init({
  duration: 800,
  once: true
});

// Tilt effect initialization
$(document).ready(function() {
  $('.tilt').tilt({
    maxTilt: 15,
    perspective: 1000,
    easing: "cubic-bezier(.03,.98,.52,.99)",
    scale: 1.05,
    speed: 300
  });
});

// Stats counter animation
function animateCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-counter');
    let current = 0;
    
    const updateCounter = () => {
      current++;
      counter.textContent = current;
      if (current < target) {
        requestAnimationFrame(updateCounter);
      }
    };
    
    updateCounter();
  });
}

// Trigger counters on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

observer.observe(document.querySelector('#stats'));

// Testimonial slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');

function showTestimonial(index) {
  testimonials.forEach((testimonial, i) => {
    testimonial.classList.toggle('active', i === index);
    dots[i].classList.toggle('active', i === index);
  });
}

document.querySelectorAll('.dot').forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentTestimonial = index;
    showTestimonial(currentTestimonial);
  });
});

// Auto-rotate testimonials
setInterval(() => {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
}, 5000);

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.getElementById('mainNav');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});
