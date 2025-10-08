// 🎨 Tema Geçişi
const toggleButton = document.getElementById('theme-toggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
toggleButton.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

toggleButton.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  toggleButton.textContent = newTheme === 'dark' ? '☀️' : '🌙';
});

// 🍔 Hamburger Menü
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.querySelector('.sidebar');

menuToggle.addEventListener('click', () => {
  sidebar.classList.toggle('active');
  menuToggle.classList.toggle('active');
});

// Sidebar açıkken dışarıya tıklayınca kapat
document.addEventListener('click', (e) => {
  if (
    sidebar.classList.contains('active') &&
    !sidebar.contains(e.target) &&
    !menuToggle.contains(e.target)
  ) {
    sidebar.classList.remove('active');
    menuToggle.classList.remove('active');
  }
});
