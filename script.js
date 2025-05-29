// Toggle Dark Mode
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  if(document.body.classList.contains('dark-mode')){
    darkModeToggle.textContent = 'Modo Claro';
  } else {
    darkModeToggle.textContent = 'Modo Escuro';
  }
});

// Busca funcional
const searchInput = document.getElementById('search');
const recipes = document.querySelectorAll('.recipe-card');

searchInput.addEventListener('input', () => {
  const filter = searchInput.value.toLowerCase();

  recipes.forEach(card => {
    const title = card.querySelector('h2').textContent.toLowerCase();
    if (title.includes(filter)) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
});
