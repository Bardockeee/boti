  document.querySelectorAll('.ver-mas-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.figura-card');
      const expanded = card.classList.toggle('expanded');
      btn.textContent = expanded ? 'Ver menos ↑' : 'Ver más ↓';
    });
  });