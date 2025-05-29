// Simula uma API que retorna uma Promise de receitas (com delay)
const apiFakeReceitas = (query = '') => {
  const todasReceitas = [
    {
      titulo: "Feijoada Completa",
      descricao: "Tradicional prato brasileiro com feijão preto, carnes defumadas e acompanhamentos.",
      imagem: "https://images.unsplash.com/photo-1613145999459-c2dfca0d5f36?auto=format&fit=crop&w=800&q=80"
    },
    {
      titulo: "Pão de Queijo Mineiro",
      descricao: "Deliciosos pães de queijo quentinhos, crocantes por fora e macios por dentro.",
      imagem: "https://images.unsplash.com/photo-1579445918263-56b0d4e0f0c9?auto=format&fit=crop&w=800&q=80"
    },
    {
      titulo: "Brigadeiro",
      descricao: "O doce mais amado do Brasil, feito com leite condensado, chocolate e granulado.",
      imagem: "https://images.unsplash.com/photo-1613145999464-2a1e1f4d67bb?auto=format&fit=crop&w=800&q=80"
    },
    {
      titulo: "Moqueca Baiana",
      descricao: "Prato à base de peixe, leite de coco, azeite de dendê e temperos típicos da Bahia.",
      imagem: "https://images.unsplash.com/photo-1613145999471-6a8d5d7b6a5b?auto=format&fit=crop&w=800&q=80"
    },
    {
      titulo: "Coxinha de Frango",
      descricao: "Salgadinho frito recheado com frango cremoso, muito popular nas festas brasileiras.",
      imagem: "https://images.unsplash.com/photo-1588167104893-28b5ef03c7c1?auto=format&fit=crop&w=800&q=80"
    }
  ];

  return new Promise((resolve) => {
    setTimeout(() => {
      if (!query) {
        resolve(todasReceitas);
      } else {
        const filtro = query.toLowerCase();
        const filtradas = todasReceitas.filter(r =>
          r.titulo.toLowerCase().includes(filtro) ||
          r.descricao.toLowerCase().includes(filtro)
        );
        resolve(filtradas);
      }
    }, 500); // simula atraso de 0,5s
  });
};

const container = document.getElementById('recipes-container');
const input = document.getElementById('search-input');
const btn = document.getElementById('search-btn');

// Função para mostrar receitas na tela
function mostrarReceitas(lista) {
  container.innerHTML = '';
  if (lista.length === 0) {
    container.innerHTML = '<p>Nenhuma receita encontrada.</p>';
    return;
  }
  lista.forEach(r => {
    const card = document.createElement('article');
    card.className = 'recipe-card';
    card.innerHTML = `
      <img src="${r.imagem}" alt="Foto da receita ${r.titulo}" />
      <h2>${r.titulo}</h2>
      <p>${r.descricao}</p>
    `;
    container.appendChild(card);
  });
}

// Função que busca receitas na "API" e atualiza a UI
async function buscarReceitas() {
  const termo = input.value.trim();
  container.innerHTML = '<p>Carregando receitas...</p>';
  try {
    const receitas = await apiFakeReceitas(termo);
    mostrarReceitas(receitas);
  } catch (e) {
    container.innerHTML = '<p>Erro ao carregar receitas.</p>';
    console.error(e);
  }
}

// Eventos
btn.addEventListener('click', buscarReceitas);
input.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    buscarReceitas();
  }
});

// Carrega todas ao abrir página
buscarReceitas();
