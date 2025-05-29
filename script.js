const recipesGrid = document.getElementById('recipesGrid');
const searchInput = document.getElementById('searchInput');
const searchForm = document.getElementById('searchForm');
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

// Cria um card para a receita
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

// Abre modal com detalhes completos da receita
async function openModal(mealId) {
  try {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    const data = await res.json();
    const meal = data.meals[0];

    modalTitle.textContent = meal.strMeal;
    modalImage.src = meal.strMealThumb;
    modalImage.alt = meal.strMeal;

    // Limpar ingredientes anteriores
    modalIngredients.innerHTML = '';

    // Os ingredientes e quantidades estão em strIngredient1..20 e strMeasure1..20
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== '') {
        const li = document.createElement('li');
        li.textContent = `${measure ? measure : ''} ${ingredient}`;
        modalIngredients.appendChild(li);
      }
    }

    modalInstructions.textContent = meal.strInstructions;

    modalSourceUrl.href = meal.strSource ? meal.strSource : `https://www.themealdb.com/meal/${mealId}`;
    modalSourceUrl.textContent = 'Fonte da receita';

    modal.hidden = false;
  } catch (error) {
    alert('Erro ao carregar a receita. Tente novamente.');
    console.error(error);
  }
}

// Fecha o modal
function closeModal() {
  modal.hidden = true;
}

// Exibe as receitas no grid
function displayRecipes(recipes) {
  recipesGrid.innerHTML = '';

  if (!recipes || recipes.length === 0) {
    recipesGrid.textContent = 'Nenhuma receita encontrada.';
    return;
  }

  recipes.forEach(recipe => {
    const card = createRecipeCard(recipe);
    recipesGrid.appendChild(card);
  });
}

// Busca receitas pela API usando o termo
async function searchRecipes(term) {
  try {
    const res = await fetch(API_SEARCH_URL + encodeURIComponent(term));
    const data = await res.json();
    displayRecipes(data.meals);
  } catch (error) {
    alert('Erro na busca. Tente novamente.');
    console.error(error);
  }
}

// Carrega as receitas brasileiras iniciais
async function loadInitialRecipes() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    currentRecipes = data.meals;
    displayRecipes(currentRecipes);
  } catch (error) {
    alert('Erro ao carregar receitas brasileiras.');
    console.error(error);
  }
}

// Toggle modo escuro
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  darkModeToggle.textContent = isDark ? 'Modo Claro' : 'Modo Escuro';
  darkModeToggle.setAttribute('aria-pressed', isDark);
}

// EVENTOS
searchForm.addEventListener('submit', e => {
  e.preventDefault();
  const searchTerm = searchInput.value.trim();
  if (searchTerm) {
    searchRecipes(searchTerm);
  } else {
    displayRecipes(currentRecipes);
  }
});

modalClose.addEventListener('click', closeModal);

modal.addEventListener('click', e => {
  if (e.target === modal) {
    closeModal();
  }
});

darkModeToggle.addEventListener('click', toggleDarkMode);

// Inicializa
loadInitialRecipes();

