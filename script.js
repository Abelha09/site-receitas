// script.js

const recipeContainer = document.querySelector('main');
const searchInput = document.getElementById('search');
const filterSelect = document.getElementById('filter');
const scrollTopBtn = document.getElementById('scrollTopBtn');
const darkModeToggle = document.querySelector('.toggle-dark-mode');

// Dark Mode
if (localStorage.getItem('dark-mode') === 'enabled') {
  document.body.classList.add('dark-mode');
}

darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('dark-mode', document.body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
});

// Scroll To Top
window.addEventListener('scroll', () => {
  scrollTopBtn.style.display = window.scrollY > 200 ? 'block' : 'none';
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Fetch recipes from API
async function fetchRecipes(query = '') {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const data = await response.json();
    displayRecipes(data.meals);
  } catch (error) {
    recipeContainer.innerHTML = '<p>Erro ao carregar receitas.</p>';
  }
}

// Render recipe cards
function displayRecipes(recipes) {
  recipeContainer.innerHTML = '';
  if (!recipes) {
    recipeContainer.innerHTML = '<p>Nenhuma receita encontrada.</p>';
    return;
  }

  recipes.forEach(recipe => {
    const card = document.createElement('div');
    card.classList.add('recipe-card');
    card.innerHTML = `
      <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
      <h2>${recipe.strMeal}</h2>
      <p><strong>Categoria:</strong> ${recipe.strCategory}</p>
      <p><strong>Área:</strong> ${recipe.strArea}</p>
      <p>${recipe.strInstructions.substring(0, 100)}...</p>
    `;
    recipeContainer.appendChild(card);
  });
}

// Search functionality
searchInput?.addEventListener('input', (e) => {
  const query = e.target.value.trim();
  fetchRecipes(query);
});

// Initial load
fetchRecipes();
