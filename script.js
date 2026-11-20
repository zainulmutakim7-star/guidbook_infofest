/**
 * INFOFEST 2026 - SumoBot Autonomous Guidebook
 * Interactive Features Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================
  // 1. THEME TOGGLE (DARK / LIGHT MODE)
  // ==========================================================
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;

  // Read saved theme or default to dark (high-tech aesthetic)
  const savedTheme = localStorage.getItem('infofest_theme');
  if (savedTheme) {
    if (savedTheme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  } else {
    // Default to dark
    html.classList.add('dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        localStorage.setItem('infofest_theme', 'light');
      } else {
        html.classList.add('dark');
        localStorage.setItem('infofest_theme', 'dark');
      }
    });
  }

  // ==========================================================
  // 2. SCROLL PROGRESS BAR
  // ==========================================================
  const progressBar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progressPercent = (window.scrollY / totalHeight) * 100;
      if (progressBar) {
        progressBar.style.width = `${progressPercent}%`;
      }
    }
  });

  // ==========================================================
  // 3. TABLE OF CONTENTS SCROLLSPY & SYNC
  // ==========================================================
  const sections = document.querySelectorAll('.guide-section');
  const tocLinks = document.querySelectorAll('.toc-link');

  const observerOptions = {
    root: null,
    rootMargin: '-10% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        tocLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));

  // ==========================================================
  // 4. MOBILE TOC DRAWER
  // ==========================================================
  const mobileTocBtn = document.getElementById('mobile-toc-btn');
  const mobileTocDrawer = document.getElementById('mobile-toc-drawer');
  const closeTocBtn = document.getElementById('close-toc-btn');
  const mobileTocLinksContainer = document.getElementById('mobile-toc-links');

  // Populate mobile drawer from desktop nav
  if (mobileTocLinksContainer) {
    tocLinks.forEach((link) => {
      const clone = link.cloneNode(true);
      clone.classList.remove('active');
      clone.classList.add('p-2', 'rounded-lg', 'hover:bg-slate-100', 'dark:hover:bg-slate-800', 'flex', 'items-center', 'justify-between');
      clone.addEventListener('click', () => {
        mobileTocDrawer.classList.add('hidden');
      });
      mobileTocLinksContainer.appendChild(clone);
    });
  }

  if (mobileTocBtn && mobileTocDrawer) {
    mobileTocBtn.addEventListener('click', () => {
      mobileTocDrawer.classList.remove('hidden');
    });
  }

  if (closeTocBtn && mobileTocDrawer) {
    closeTocBtn.addEventListener('click', () => {
      mobileTocDrawer.classList.add('hidden');
    });
  }

  if (mobileTocDrawer) {
    mobileTocDrawer.addEventListener('click', (e) => {
      if (e.target === mobileTocDrawer) {
        mobileTocDrawer.classList.add('hidden');
      }
    });
  }

  // ==========================================================
  // 5. LIVE SEARCH & FILTERING
  // ==========================================================
  const desktopSearch = document.getElementById('global-search');
  const mobileSearch = document.getElementById('global-search-mobile');
  const clearSearchBtn = document.getElementById('clear-search');
  const searchStatusBar = document.getElementById('search-status-bar');
  const searchTermDisplay = document.getElementById('search-term-display');
  const resetSearchBtn = document.getElementById('reset-search-btn');

  function handleSearch(term) {
    const query = term.trim().toLowerCase();

    if (!query) {
      // Reset view
      sections.forEach((section) => {
        section.classList.remove('hidden');
      });
      if (searchStatusBar) searchStatusBar.classList.add('hidden');
      if (clearSearchBtn) clearSearchBtn.classList.add('hidden');
      return;
    }

    if (clearSearchBtn) clearSearchBtn.classList.remove('hidden');
    if (searchStatusBar) {
      searchStatusBar.classList.remove('hidden');
      searchTermDisplay.textContent = query;
    }

    let matchCount = 0;
    sections.forEach((section) => {
      const sectionText = section.textContent.toLowerCase();
      if (sectionText.includes(query)) {
        section.classList.remove('hidden');
        matchCount++;
      } else {
        section.classList.add('hidden');
      }
    });

    if (matchCount === 0) {
      if (searchTermDisplay) {
        searchTermDisplay.textContent = `${query} (Tidak ditemukan hasil yang cocok)`;
      }
    }
  }

  if (desktopSearch) {
    desktopSearch.addEventListener('input', (e) => {
      const val = e.target.value;
      if (mobileSearch) mobileSearch.value = val;
      handleSearch(val);
    });
  }

  if (mobileSearch) {
    mobileSearch.addEventListener('input', (e) => {
      const val = e.target.value;
      if (desktopSearch) desktopSearch.value = val;
      handleSearch(val);
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      if (desktopSearch) desktopSearch.value = '';
      if (mobileSearch) mobileSearch.value = '';
      handleSearch('');
    });
  }

  if (resetSearchBtn) {
    resetSearchBtn.addEventListener('click', () => {
      if (desktopSearch) desktopSearch.value = '';
      if (mobileSearch) mobileSearch.value = '';
      handleSearch('');
    });
  }

  // ==========================================================
  // 6. INTERACTIVE SELF-CHECK UJI KELAYAKAN ROBOT
  // ==========================================================
  const checklistItems = document.querySelectorAll('.checklist-item');
  const checklistScore = document.getElementById('checklist-score');
  const checklistResultBanner = document.getElementById('checklist-result-banner');

  function updateChecklist() {
    let checkedCount = 0;
    checklistItems.forEach((item) => {
      if (item.checked) checkedCount++;
    });

    const total = checklistItems.length;
    if (checklistScore) {
      checklistScore.textContent = `${checkedCount} / ${total} Selesai`;
    }

    if (checklistResultBanner) {
      if (checkedCount === total) {
        checklistResultBanner.className = 'mt-4 p-3.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold text-center transition-all';
        checklistResultBanner.innerHTML = '🎉 SEMPURNA! Robot Anda telah memenuhi 100% parameter uji kelayakan resmi. Siap bertanding di arena Infofest 2026!';
      } else if (checkedCount > 0) {
        checklistResultBanner.className = 'mt-4 p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs text-center transition-all';
        checklistResultBanner.innerHTML = `⚠️ Masih ada <strong>${total - checkedCount} poin</strong> yang perlu dipastikan agar robot tim Anda lolos verifikasi wasit.`;
      } else {
        checklistResultBanner.className = 'mt-4 p-3 rounded-lg bg-slate-800 text-center text-xs font-semibold text-slate-300';
        checklistResultBanner.textContent = 'Centang setiap parameter di atas untuk melihat status kelayakan robot tim Anda.';
      }
    }
  }

  checklistItems.forEach((item) => {
    item.addEventListener('change', updateChecklist);
  });

  // Initial call
  updateChecklist();
});

