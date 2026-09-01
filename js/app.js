// QuickTools - Core App Logic
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initSearch();
});

function initNav() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove('open');
      }
    });
  }
}

function initSearch() {
  const input = document.getElementById('toolSearch');
  if (!input) return;
  input.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    document.querySelectorAll('.tool-card[data-name]').forEach(card => {
      const match = card.dataset.name.toLowerCase().includes(q) ||
                    card.textContent.toLowerCase().includes(q);
      card.style.display = match ? '' : 'none';
    });
    document.querySelectorAll('.tool-section').forEach(sec => {
      const visible = sec.querySelectorAll('.tool-card[style=""],.tool-card:not([style])');
      sec.style.display = visible.length ? '' : 'none';
    });
  });
}

function showToast(msg) {
  let t = document.querySelector('.toast');
  if (!t) {
    t = document.createElement('div');
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2000);
}

function copyText(text) {
  navigator.clipboard.writeText(text).then(() => showToast('Copied!'));
}

function formatCurrency(n) {
  return '$' + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function formatNumber(n) {
  return n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
