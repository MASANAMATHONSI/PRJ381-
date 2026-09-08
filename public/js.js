document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('menuToggle');
  const closeBtn = document.getElementById('closeDrawer');
  const overlay = document.getElementById('drawerOverlay');
  const drawer = document.getElementById('sidebarDrawer');

  function openSidebar() {
    if (!drawer || !overlay) return;
    drawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    if (!drawer || !overlay) return;
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (toggleBtn) toggleBtn.addEventListener('click', openSidebar);
  if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
  if (overlay) overlay.addEventListener('click', closeSidebar);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer && drawer.classList.contains('active')) {
      closeSidebar();
    }
  });
});