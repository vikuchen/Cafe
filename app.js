(function() {
  // === 1. DATA REPOSITORIES ===
  const menuData = [
    { name: "Classic Latte", description: "Smooth espresso with steamed milk.", price: "4.50", image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=500" },
    { name: "Butter Croissant", description: "Flaky, golden, baked fresh.", price: "3.80", image: "https://images.unsplash.com/photo-1612366747681-e4ca6992b1e9?w=500" },
    { name: "Caramel Macchiato", description: "Vanilla, caramel, espresso.", price: "5.20", image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500" },
    { name: "Matcha Latte", description: "Japanese matcha, creamy oat milk.", price: "5.00", image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=500" },
    { name: "Blueberry Muffin", description: "Wild blueberries, streusel top.", price: "4.20", image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=500" },
    { name: "Chocolate Cookie", description: "Belgian chocolate chunks.", price: "3.50", image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500" }
  ];

  const scrollerData = [
    { name: "Classic Latte", price: "4.50", image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=500" },
    { name: "Butter Croissant", price: "3.80", image: "https://images.unsplash.com/photo-1612366747681-e4ca6992b1e9?w=500" },
    { name: "Caramel Macchiato", price: "5.20", image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500" },
    { name: "Matcha Latte", price: "5.00", image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=500" },
    { name: "Iced Latte", price: "4.80", image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500" },
    { name: "Mocha Frappe", price: "6.00", image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500" }
  ];

  const galleryUrls = [
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800",
    "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800",
    "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800",
    "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800"
  ];

  // === 2. DYNAMIC RENDERING ENGINES ===
  function renderMenu(filter = "") {
    const container = document.getElementById("menuGrid");
    if (!container) return;

    const term = filter.toLowerCase().trim();
    const filtered = menuData.filter(i => term === "" || i.name.toLowerCase().includes(term));
    
    container.innerHTML = filtered.map(item => `
      <div class="menu-card">
        <div class="menu-card-image" style="background-image: url('${item.image}');"></div>
        <div class="menu-card-content">
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <div class="price">$${item.price}</div>
          <button class="order-btn" data-item="${item.name} - $${item.price}">
            <i class="fas fa-shopping-cart"></i> Order Now
          </button>
        </div>
      </div>
    `).join('');

    // Reattach structural actions on newly updated DOM elements
    document.querySelectorAll('.order-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        alert(`🛒 Demo: "${btn.getAttribute('data-item')}" added.\nFull admin panel manages real orders.`);
      });
    });
  }

  function renderScroller() {
    const scrollerDiv = document.getElementById("productScroller");
    if (!scrollerDiv) return;

    scrollerDiv.innerHTML = scrollerData.map(item => `
      <div class="scroller-card">
        <div class="scroller-img" style="background-image: url('${item.image}');"></div>
        <div class="scroller-content" style="padding:1rem;">
          <h4>${item.name}</h4>
          <div class="price">$${item.price}</div>
        </div>
      </div>
    `).join('');
  }

  function renderGallery() {
    const galleryDiv = document.getElementById("galleryGrid");
    if (!galleryDiv) return;

    galleryDiv.innerHTML = galleryUrls.map(url => `
      <div class="gallery-item" data-image="${url}" style="background-image: url('${url}');">
        <div class="gallery-overlay"><i class="fas fa-search-plus"></i></div>
      </div>
    `).join('');

    const items = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImage');

    items.forEach(el => {
      el.addEventListener('click', () => {
        lightboxImg.src = el.getAttribute('data-image');
        lightbox.style.display = 'flex';
      });
    });

    lightbox?.addEventListener('click', () => lightbox.style.display = 'none');
  }

  // === 3. INTERACTION CONTROLLERS & EVENT LISTENERS ===
  
  // Search Functions
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  
  function handleSearch() { 
    renderMenu(searchInput?.value || ""); 
  }
  
  searchBtn?.addEventListener('click', handleSearch);
  searchInput?.addEventListener('keyup', (e) => { 
    if (e.key === 'Enter') handleSearch(); 
  });

  // Trending Scroller Controls
  const scrollerEl = document.getElementById('productScroller');
  document.getElementById('scrollLeftBtn')?.addEventListener('click', () => {
    scrollerEl?.scrollBy({ left: -280, behavior: 'smooth' });
  });
  document.getElementById('scrollRightBtn')?.addEventListener('click', () => {
    scrollerEl?.scrollBy({ left: 280, behavior: 'smooth' });
  });

  // Dark Theme Management State Engine
  const darkToggle = document.getElementById('darkModeToggle');
  if (darkToggle) {
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark');
    }
    darkToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    });
  }

  // Mobile Hamburger Toggle Component
  const hamburger = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  
  hamburger?.addEventListener('click', () => navMenu?.classList.toggle('show'));
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => navMenu?.classList.remove('show'));
  });

  // Scroll Utility Actions (Back to Top)
  const backBtn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (backBtn) {
      backBtn.style.display = window.scrollY > 400 ? 'flex' : 'none';
    }
  });
  backBtn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Scroll Spy Active State Synchronization
  const sections = document.querySelectorAll('section[id]');
  function updateActiveNav() {
    let current = '';
    const scrollPos = window.scrollY + 110;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const bottom = top + sec.offsetHeight;
      if (scrollPos >= top && scrollPos < bottom) {
        current = sec.getAttribute('id');
      }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', updateActiveNav);

  // === 4. SYSTEM INITIALIZATION ===
  function init() {
    updateActiveNav();
    renderMenu();
    renderScroller();
    renderGallery();
  }

  init();
})();