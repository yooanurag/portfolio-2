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
// Expand/collapse event photo grids.
document.querySelectorAll('.gallery-toggle').forEach(button => {
  button.addEventListener('click', () => {
    const card = button.closest('.event-gallery-card');
    const expanded = card.classList.toggle('gallery-expanded');
    button.setAttribute('aria-expanded', String(expanded));
    button.innerHTML = expanded ? 'Hide gallery <span>−</span>' : 'View gallery <span>＋</span>';
  });
});

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
