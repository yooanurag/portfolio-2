(() => {
  "use strict";
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
      navLinks.classList.toggle("open", !isOpen);
    });
    navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    }));
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
        menuToggle.focus();
      }
    });
  }

  const filterButtons = [...document.querySelectorAll(".filter-button")];
  const creditItems = [...document.querySelectorAll(".credit-item")];
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      filterButtons.forEach(item => {
        const active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      creditItems.forEach(item => {
        item.hidden = filter !== "all" && item.dataset.category !== filter;
      });
    });
  });

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealItems = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || reduceMotion) {
    revealItems.forEach(item => item.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
    revealItems.forEach(item => observer.observe(item));
  }
})();
// Accessible photo lightbox for event and production images.
(() => {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;
  const lightboxImage = lightbox.querySelector('img');
  const caption = lightbox.querySelector('.lightbox-caption');
  const closeButton = lightbox.querySelector('.lightbox-close');
  const prevButton = lightbox.querySelector('.lightbox-prev');
  const nextButton = lightbox.querySelector('.lightbox-next');
  let currentItems = [];
  let currentIndex = 0;
  let previousFocus = null;

  function openImage(button) {
    const gallery = button.closest('.event-gallery-card');
    currentItems = gallery ? [...gallery.querySelectorAll('.gallery-thumb:not(.thumb-missing)')] : [button];
    currentIndex = Math.max(0, currentItems.indexOf(button));
    previousFocus = button;
    showImage();
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    closeButton.focus();
  }
  function showImage() {
    const button = currentItems[currentIndex];
    if (!button) return;
    const image = button.querySelector('img');
    const path = button.dataset.full || (image && image.getAttribute('src'));
    lightboxImage.src = path;
    lightboxImage.alt = image ? image.alt : 'Portfolio image';
    caption.textContent = lightboxImage.alt;
    const multiple = currentItems.length > 1;
    prevButton.hidden = !multiple;
    nextButton.hidden = !multiple;
  }
  function closeImage() {
    lightbox.hidden = true;
    lightboxImage.src = '';
    document.body.style.overflow = '';
    if (previousFocus) previousFocus.focus();
  }
  document.querySelectorAll('.image-open, .gallery-thumb').forEach(button => {
    button.addEventListener('click', () => openImage(button));
  });
  closeButton.addEventListener('click', closeImage);
  prevButton.addEventListener('click', () => { currentIndex = (currentIndex - 1 + currentItems.length) % currentItems.length; showImage(); });
  nextButton.addEventListener('click', () => { currentIndex = (currentIndex + 1) % currentItems.length; showImage(); });
  lightbox.addEventListener('click', event => { if (event.target === lightbox) closeImage(); });
  document.addEventListener('keydown', event => {
    if (lightbox.hidden) return;
    if (event.key === 'Escape') closeImage();
    if (event.key === 'ArrowLeft' && currentItems.length > 1) { currentIndex = (currentIndex - 1 + currentItems.length) % currentItems.length; showImage(); }
    if (event.key === 'ArrowRight' && currentItems.length > 1) { currentIndex = (currentIndex + 1) % currentItems.length; showImage(); }
  });
})();


// Upload a personal logo into the inner orbital circle (local preview only).
(() => {
  const input = document.getElementById('hero-logo-upload');
  const preview = document.getElementById('hero-logo-preview');
  const placeholder = document.getElementById('hero-logo-placeholder');
  if (!input || !preview) return;
  input.addEventListener('change', () => {
    const file = input.files && input.files[0];
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      preview.src = reader.result;
      preview.hidden = false;
      if (placeholder) placeholder.hidden = true;
    };
    reader.readAsDataURL(file);
  });
})();


// Unified production carousel: photos and videos share one 9:16 stage.
(() => {
  document.querySelectorAll('[data-carousel]').forEach(carousel => {
    const slides = [...carousel.querySelectorAll('.production-slide')];
    const counter = carousel.querySelector('.production-counter');
    const prev = carousel.querySelector('.production-prev');
    const next = carousel.querySelector('.production-next');
    if (!slides.length) return;
    let active = Math.max(0, slides.findIndex(slide => slide.classList.contains('is-active')));
    const stopVideos = except => slides.forEach(slide => slide.querySelectorAll('video').forEach(video => {
      if (video !== except) { video.pause(); try { video.currentTime = video.currentTime; } catch (_) {} }
    }));
    const show = (index, focusControl = false) => {
      stopVideos();
      active = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        const current = i === active;
        slide.classList.toggle('is-active', current);
        slide.setAttribute('aria-hidden', String(!current));
        slide.querySelectorAll('button,video,a,[tabindex]').forEach(el => { el.tabIndex = current ? 0 : -1; });
        if (!current) slide.querySelectorAll('video').forEach(video => { video.pause(); });
      });
      if (counter) {
        counter.textContent = `${String(active + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
        counter.setAttribute('aria-label', `Item ${active + 1} of ${slides.length}`);
      }
      carousel.dataset.activeIndex = String(active);
      if (focusControl) (active === 0 ? prev : next)?.focus();
    };
    prev?.addEventListener('click', () => show(active - 1));
    next?.addEventListener('click', () => show(active + 1));
    carousel.tabIndex = 0;
    carousel.addEventListener('keydown', event => {
      if (event.target.matches('video,button,input,a')) return;
      if (event.key === 'ArrowLeft') { event.preventDefault(); show(active - 1); }
      if (event.key === 'ArrowRight') { event.preventDefault(); show(active + 1); }
    });
    let touchX = null;
    carousel.addEventListener('touchstart', event => { touchX = event.changedTouches[0].clientX; }, {passive:true});
    carousel.addEventListener('touchend', event => {
      if (touchX === null) return;
      const delta = event.changedTouches[0].clientX - touchX;
      if (Math.abs(delta) > 45) show(active + (delta < 0 ? 1 : -1));
      touchX = null;
    }, {passive:true});
    show(active);
  });
})();

// Event-specific animated galleries with a unique panel per event and safe smooth scrolling.
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('.event-gallery-card').forEach((card, index) => {
    const button = card.querySelector('.gallery-toggle');
    const panel = card.querySelector('.event-gallery-thumbs');
    if (!button || !panel) return;
    if (!card.id) card.id = `event-gallery-${String(index + 1).padStart(2, '0')}`;
    if (!panel.id) panel.id = `${card.id}-photos`;
    button.setAttribute('aria-controls', panel.id);
    const setOpen = open => {
      card.classList.toggle('gallery-expanded', open);
      button.setAttribute('aria-expanded', String(open));
      panel.setAttribute('aria-hidden', String(!open));
      button.setAttribute('aria-label', `${open ? 'Collapse' : 'Expand'} photo gallery for ${card.querySelector('h3')?.textContent.trim() || 'this event'}`);
      const icon = button.querySelector('span');
      button.childNodes[0].textContent = open ? 'Hide gallery ' : 'View gallery ';
      if (icon) icon.textContent = open ? '−' : '↗';
    };
    setOpen(false);
    button.addEventListener('click', () => {
      const opening = button.getAttribute('aria-expanded') !== 'true';
      setOpen(opening);
      if (opening) {
        window.requestAnimationFrame(() => card.scrollIntoView({behavior: reduceMotion ? 'auto' : 'smooth', block:'start'}));
      }
    });
  });
})();
