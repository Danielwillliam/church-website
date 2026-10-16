/**
 * CSI Church of Resurrection - Mogappair West Pastorate
 * Interactive UI Controller: Mobile Drawer, Live Next-Service Status,
 * Hero Showcase Switcher, Schedule Tabs & Search, Gallery Filter & Lightbox,
 * Prayer Request Modal, Contact Form, and Scroll Spy.
 */

const GALLERY_ITEMS = [
  {
    id: 0,
    src: 'assets/images/church/church-exterior-panoramic.jpg',
    title: 'CSI Church of Resurrection — Full Exterior Facade',
    subtitle: 'Main Sanctuary Building & Illuminated Entrance Arch at Mogappair West',
    category: 'exterior',
    badge: 'Church Exterior'
  },
  {
    id: 1,
    src: 'assets/images/church/sanctuary-communion-altar.jpg',
    title: 'Carved Wooden Chancel & Holy Communion Altar',
    subtitle: 'Handcrafted teakwood sanctuary arch, stained-glass windows, and Communion table (“Worship the Lord in the beauty of holiness” — Psalm 29:2)',
    category: 'sanctuary',
    badge: 'Main Sanctuary'
  },
  {
    id: 2,
    src: 'assets/images/church/church-entrance-arch.jpg',
    title: 'Main Welcome Archway at Dusk',
    subtitle: 'Welcoming congregation and visitors to Mogappair West Pastorate, Chennai',
    category: 'exterior',
    badge: 'Entrance Arch'
  },
  {
    id: 3,
    src: 'assets/images/church/sanctuary-chancel-wide.jpg',
    title: 'Stained-Glass Windows & Illuminated Altar Cross',
    subtitle: 'Featuring the Eucharistic Bread & Chalice (left), Central Cross, and Holy Spirit Dove (right)',
    category: 'sanctuary',
    badge: 'Sacred Art'
  },
  {
    id: 4,
    src: 'assets/images/church/sanctuary-chancel-floral.jpg',
    title: '26th Church Anniversary Thanksgiving Chancel',
    subtitle: 'Sanctuary adorned with white and gold floral arrangements for our Annual Church Anniversary',
    category: 'anniversary',
    badge: '26th Anniversary'
  },
  {
    id: 5,
    src: 'assets/images/church/sanctuary-anniversary-arch.jpg',
    title: 'Carved Sanctuary Arch & Festive Altar',
    subtitle: 'Wide view through the carved wooden chancel arch during thanksgiving celebrations',
    category: 'anniversary',
    badge: 'Thanksgiving'
  }
];

let currentLightboxIndex = 0;

function openPrayerModal() {
  closeMobileMenu();
  const modal = document.getElementById('prayerModal');
  if (!modal) return;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  requestAnimationFrame(() => {
    modal.classList.add('active');
  });
  document.body.style.overflow = 'hidden';
}

function closePrayerModal() {
  const modal = document.getElementById('prayerModal');
  if (!modal) return;
  modal.classList.remove('active');
  setTimeout(() => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }, 220);
  document.body.style.overflow = '';
}

function openMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  const backdrop = document.getElementById('mobileMenuBackdrop');
  const panel = document.getElementById('mobileMenuPanel');
  if (!menu || !backdrop || !panel) return;

  menu.classList.remove('hidden');
  requestAnimationFrame(() => {
    backdrop.classList.remove('opacity-0');
    backdrop.classList.add('opacity-100');
    panel.classList.remove('-translate-x-full');
    panel.classList.add('translate-x-0');
  });
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  const backdrop = document.getElementById('mobileMenuBackdrop');
  const panel = document.getElementById('mobileMenuPanel');
  if (!menu || !backdrop || !panel) return;

  backdrop.classList.remove('opacity-100');
  backdrop.classList.add('opacity-0');
  panel.classList.remove('translate-x-0');
  panel.classList.add('-translate-x-full');
  setTimeout(() => {
    menu.classList.add('hidden');
  }, 280);
  document.body.style.overflow = '';
}

function openLightbox(index) {
  const modal = document.getElementById('lightboxModal');
  if (!modal) return;
  currentLightboxIndex = (index + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
  updateLightboxView();
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  requestAnimationFrame(() => {
    modal.classList.add('active');
  });
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const modal = document.getElementById('lightboxModal');
  if (!modal) return;
  modal.classList.remove('active');
  setTimeout(() => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }, 220);
  document.body.style.overflow = '';
}

function stepLightbox(delta) {
  currentLightboxIndex = (currentLightboxIndex + delta + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
  updateLightboxView();
}

function updateLightboxView() {
  const item = GALLERY_ITEMS[currentLightboxIndex];
  if (!item) return;
  const imgEl = document.getElementById('lightboxImage');
  const titleEl = document.getElementById('lightboxTitle');
  const subEl = document.getElementById('lightboxSubtitle');
  const badgeEl = document.getElementById('lightboxBadge');
  const countEl = document.getElementById('lightboxCounter');

  const domImg = document.querySelector(`[data-gallery-index="${currentLightboxIndex}"] img`);
  const resolvedSrc = domImg ? domImg.getAttribute('src') : item.src;

  if (imgEl) {
    imgEl.src = resolvedSrc;
    imgEl.alt = item.title;
  }
  if (titleEl) titleEl.textContent = item.title;
  if (subEl) subEl.textContent = item.subtitle;
  if (badgeEl) badgeEl.textContent = item.badge;
  if (countEl) countEl.textContent = `${currentLightboxIndex + 1} / ${GALLERY_ITEMS.length}`;
}

function switchHeroPhoto(slotIndex) {
  const slides = document.querySelectorAll('.hero-showcase-slide');
  const tabs = document.querySelectorAll('.hero-photo-tab');
  slides.forEach((slide, idx) => {
    if (idx === slotIndex) {
      slide.classList.remove('hidden', 'opacity-0');
      slide.classList.add('block', 'opacity-100');
    } else {
      slide.classList.add('hidden', 'opacity-0');
      slide.classList.remove('block', 'opacity-100');
    }
  });
  tabs.forEach((tab, idx) => {
    if (idx === slotIndex) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });
}

function showToast(message, type = 'success', waUrl = '') {
  let toast = document.getElementById('toastNotification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotification';
    document.body.appendChild(toast);
  }

  const bgClass = type === 'error'
    ? 'bg-red-700 border-red-400/40'
    : 'bg-emerald-900 border-emerald-400/40';

  toast.className = `fixed bottom-5 right-5 left-5 sm:left-auto z-50 sm:max-w-md px-5 py-4 rounded-2xl shadow-2xl border flex items-start gap-3.5 text-white transition-all duration-300 ${bgClass}`;

  const waActionHtml = waUrl
    ? `<a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 text-xs font-bold uppercase tracking-wider text-emerald-100 transition-colors">
         <i class="fa-brands fa-whatsapp text-sm"></i> Send via WhatsApp
       </a>`
    : '';

  toast.innerHTML = `
    <div class="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0 mt-0.5">
      <i class="fa-solid ${type === 'error' ? 'fa-circle-exclamation' : 'fa-circle-check'} text-base"></i>
    </div>
    <div class="flex-1 text-xs sm:text-sm leading-relaxed">
      <div class="font-semibold">${message}</div>
      ${waActionHtml}
    </div>
    <button type="button" id="toastCloseBtn" class="text-white/70 hover:text-white p-1" aria-label="Close notification">
      <i class="fa-solid fa-xmark"></i>
    </button>
  `;

  const closeBtn = document.getElementById('toastCloseBtn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      toast.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
    });
  }

  if (toast._timer) clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
  }, 6500);
}

function initLiveServiceStatus() {
  const badgeText = document.getElementById('liveServiceText');
  if (!badgeText) return;

  const now = new Date();
  const day = now.getDay();
  const hours = now.getHours() + now.getMinutes() / 60;

  let status = 'Sunday Worship: 6:45 AM, 8:30 AM & 6:30 PM';
  if (day === 0) {
    if (hours < 6.75) status = 'Today: First Sunday Service at 6:45 AM';
    else if (hours < 8.5) status = 'Today: Main Sunday Service at 8:30 AM';
    else if (hours < 10.5) status = 'Happening Now: Sunday Morning Worship & Fellowships';
    else if (hours < 18.5) status = 'Today: Sunday Evening Service at 6:30 PM';
    else status = 'Next Gathering: Tuesday Cottage Prayer';
  } else if (day === 2) {
    status = 'Today: Cottage Prayer Meeting (Evening)';
  } else if (day === 5) {
    if (hours < 12) status = 'Today: Friday Fasting Prayer at 10:00 AM';
    else status = 'Tomorrow: Women’s Fellowship (5:30 PM) & Choir Practice';
  } else if (day === 6) {
    status = 'Today: Women’s Fellowship (5:30 PM) & Choir Rehearsals';
  }
  badgeText.textContent = status;
}

function initScheduleFilter() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const scheduleCards = document.querySelectorAll('.schedule-card');
  const searchInput = document.getElementById('scheduleSearchInput');
  const emptyState = document.getElementById('scheduleEmptyState');
  let activeCategory = 'all';

  function applyFilter() {
    const query = (searchInput ? searchInput.value : '').trim().toLowerCase();
    let visibleCount = 0;

    scheduleCards.forEach(card => {
      const cat = card.getAttribute('data-category');
      const text = card.textContent.toLowerCase();
      const matchesCat = activeCategory === 'all' || cat === activeCategory;
      const matchesQuery = !query || text.includes(query);

      if (matchesCat && matchesQuery) {
        card.classList.remove('hidden');
        card.classList.add('flex');
        visibleCount++;
      } else {
        card.classList.add('hidden');
        card.classList.remove('flex');
      }
    });

    if (emptyState) {
      if (visibleCount === 0) {
        emptyState.classList.remove('hidden');
      } else {
        emptyState.classList.add('hidden');
      }
    }
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = btn.getAttribute('data-tab') || 'all';
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilter();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', applyFilter);
  }
}

function initGalleryFilter() {
  const buttons = document.querySelectorAll('.gallery-tab-btn');
  const cards = document.querySelectorAll('.gallery-card');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-gallery-tab') || 'all';
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      cards.forEach(card => {
        const cardCat = card.getAttribute('data-gallery-cat');
        if (cat === 'all' || cardCat === cat) {
          card.classList.remove('hidden');
          card.classList.add('flex');
        } else {
          card.classList.add('hidden');
          card.classList.remove('flex');
        }
      });
    });
  });

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.getAttribute('data-gallery-index') || '0', 10);
      openLightbox(idx);
    });
  });
}

function initForms() {
  const prayerForm = document.getElementById('prayerForm');
  if (prayerForm) {
    prayerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('prayerName')?.value.trim() || 'Church Member';
      const phone = document.getElementById('prayerPhone')?.value.trim() || 'Not specified';
      const category = document.getElementById('prayerCategory')?.value || 'General Prayer';
      const requestText = document.getElementById('prayerText')?.value.trim() || '';
      const sendWa = document.getElementById('prayerSendWhatsapp')?.checked;

      if (!requestText) {
        showToast('Please enter your prayer request details before submitting.', 'error');
        return;
      }

      const waMessage = encodeURIComponent(
        `*Prayer Request - CSI Church of Resurrection*\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Category:* ${category}\n\n*Request:* ${requestText}`
      );
      const waUrl = `https://api.whatsapp.com/send?text=${waMessage}`;

      closePrayerModal();
      prayerForm.reset();

      showToast(
        `Thank you, ${name}. Your prayer request has been received and will be lifted up during Friday Fasting Prayer and pastoral intercession.`,
        'success',
        waUrl
      );

      if (sendWa) {
        window.open(waUrl, '_blank', 'noopener,noreferrer');
      }
    });
  }

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName')?.value.trim() || 'Friend';
      const phone = document.getElementById('contactPhone')?.value.trim() || '';
      const subject = document.getElementById('contactSubject')?.value || 'General Inquiry';
      const message = document.getElementById('contactMessage')?.value.trim() || '';

      if (!name || !message) {
        showToast('Please fill in your name and message.', 'error');
        return;
      }

      const waMessage = encodeURIComponent(
        `*Parish Inquiry - CSI Church of Resurrection*\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Subject:* ${subject}\n\n*Message:* ${message}`
      );
      const waUrl = `https://api.whatsapp.com/send?text=${waMessage}`;

      contactForm.reset();
      showToast(
        `Thank you, ${name}! Your "${subject}" message has been recorded for the Mogappair West Pastorate Office.`,
        'success',
        waUrl
      );
    });
  }
}

function initScrollSpyAndNavbar() {
  const navbar = document.getElementById('mainNavbar');
  const navLinks = document.querySelectorAll('.nav-pill-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (navbar) {
      if (window.scrollY > 24) {
        navbar.classList.add('shadow-md', 'bg-white/95', 'backdrop-blur-md');
        navbar.classList.remove('bg-white');
      } else {
        navbar.classList.remove('shadow-md', 'bg-white/95', 'backdrop-blur-md');
        navbar.classList.add('bg-white');
      }
    }

    let currentId = 'home';
    const scrollPos = window.scrollY + 140;
    sections.forEach(sec => {
      if (scrollPos >= sec.offsetTop) {
        currentId = sec.getAttribute('id') || 'home';
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${currentId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initLiveServiceStatus();
  initScheduleFilter();
  initGalleryFilter();
  initForms();
  initScrollSpyAndNavbar();

  const menuBtn = document.getElementById('mobileMenuBtn');
  const closeBtn = document.getElementById('mobileMenuClose');
  const backdrop = document.getElementById('mobileMenuBackdrop');
  if (menuBtn) menuBtn.addEventListener('click', openMobileMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMobileMenu);
  if (backdrop) backdrop.addEventListener('click', closeMobileMenu);

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  document.querySelectorAll('.open-prayer-modal').forEach(btn => {
    btn.addEventListener('click', openPrayerModal);
  });
  document.querySelectorAll('.close-prayer-modal').forEach(btn => {
    btn.addEventListener('click', closePrayerModal);
  });
  const prayerModal = document.getElementById('prayerModal');
  if (prayerModal) {
    prayerModal.addEventListener('click', (e) => {
      if (e.target === prayerModal) closePrayerModal();
    });
  }

  const lbModal = document.getElementById('lightboxModal');
  const lbClose = document.getElementById('lightboxCloseBtn');
  const lbPrev = document.getElementById('lightboxPrevBtn');
  const lbNext = document.getElementById('lightboxNextBtn');
  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lbPrev) lbPrev.addEventListener('click', () => stepLightbox(-1));
  if (lbNext) lbNext.addEventListener('click', () => stepLightbox(1));
  if (lbModal) {
    lbModal.addEventListener('click', (e) => {
      if (e.target === lbModal) closeLightbox();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closePrayerModal();
      closeLightbox();
      closeMobileMenu();
    } else if (lbModal && !lbModal.classList.contains('hidden')) {
      if (e.key === 'ArrowLeft') stepLightbox(-1);
      if (e.key === 'ArrowRight') stepLightbox(1);
    }
  });
});
