/* ─────────────────────────────────────────
   FILTER LOGIC
   ───────────────────────────────────────── */

const INITIAL_VISIBLE = 8;

function initFilters() {
  const pills   = document.querySelectorAll('.filter-pill');
  const rows    = document.querySelectorAll('.work-row');
  const loadBtn = document.getElementById('load-more');

  if (!pills.length) return;

  let activeFilter = 'all';
  let filteredRows = [];

  function applyFilter(filter) {
    activeFilter = filter;
    filteredRows = [];

    rows.forEach(row => {
      const tags = (row.dataset.tags || '').split(',');
      const match = filter === 'all' || tags.includes(filter);
      row.style.display = match ? 'grid' : 'none';
      if (match) filteredRows.push(row);
    });

    // Show only first INITIAL_VISIBLE
    filteredRows.forEach((row, i) => {
      row.style.display = i < INITIAL_VISIBLE ? 'grid' : 'none';
    });

    if (loadBtn) {
      loadBtn.style.display = filteredRows.length > INITIAL_VISIBLE ? 'block' : 'none';
    }
  }

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      applyFilter(pill.dataset.filter);
    });
  });

  // Initial state
  applyFilter('all');
}

/* ─────────────────────────────────────────
   LOAD MORE
   ───────────────────────────────────────── */

function loadMore() {
  const rows    = document.querySelectorAll('.work-row');
  const loadBtn = document.getElementById('load-more');
  let hidden    = 0;

  rows.forEach(row => {
    if (row.style.display === 'none') {
      row.style.display = 'grid';
      hidden++;
    }
  });

  if (loadBtn && hidden === 0) {
    loadBtn.style.display = 'none';
  }
}

/* ─────────────────────────────────────────
   FADE-IN ON SCROLL
   ───────────────────────────────────────── */

function initFadeIn() {
  const els = document.querySelectorAll('.fade-in');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger delay based on position in viewport batch
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  els.forEach(el => observer.observe(el));
}

/* ─────────────────────────────────────────
   INIT
   ───────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  initFilters();
  initFadeIn();
});
