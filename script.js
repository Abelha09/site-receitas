const recipesGrid = document.getElementById('recipesGrid');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const modal = document.getElementById('modal');
const modalClose = document.getElementById('modalClose');
const modalTitle = document.getElementById('modalTitle');
const modalImage = document.getElementById('modalImage');
const modalIngredients = document.getElementById('modalIngredients');
const modalInstructions = document.getElementById('modalInstructions');
const modalSourceUrl = document.getElementById('modalSourceUrl');
const darkModeToggle = document.getElementById('darkModeToggle');

const API_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=Brazilian';
const API_SEARCH_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

let currentRecipes = [];

// Função para criar um card da receita
function createRecipeCard(recipe) {
  const card = document.createElement('div');
  card.className = 'recipe-card';

  const img = document.createElement('img');
  img.src = recipe.strMealThumb;
  img.alt = recipe.strMeal;

  const content = document.createElement('div');
  content.className = 'recipe-content';

  const title = document.createElement('h2');
  title.textContent = recipe.strMeal;

  const button = document.createElement('button');
  button.textContent = 'Ver receita';
  button.addEventListener('click', () => openModal(recipe.idMeal));

  content.appendChild(title);
  content.appendChild(button);

  card.appendChild(img);
  card.appendChild(content);

  return card;
}

// Abre o modal com dados da receita
async function openModal(meal
