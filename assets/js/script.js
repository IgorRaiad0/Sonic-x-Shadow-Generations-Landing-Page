// DADOS DOS JOGOS
const games = [
  {
    name: "Sonic the Hedgehog (1991)",
    image: "./assets/img/images.jpeg",
    description: "O jogo que iniciou tudo! Sonic corre através de zonas coloridas coletando anéis e derrotando robôs "
  },
  {
    name: "Sonic 2", 
    image: "./assets/img/sonicGenerations.jpg",
    description: "Introduziu Tails como personagem jogável e o famoso Spin Dash. Trouxe as Chaos Emerald"
  },
  {
    name: "Sonic 3 & Knuckles",
    image: "./assets/img/images.jpeg",
    description: "A aventura mais épica do Sonic clássico! Knuckles se junta como novo."
  }
];

// VARIÁVEIS GLOBAIS
let currentIndex = 0; // Índice do card atual
const totalCards = games.length;

// ELEMENTOS DO DOM
const gameImage = document.getElementById('character-image');
const gameName = document.getElementById('character-name');
const gameText = document.getElementById('character-text');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const currentCardSpan = document.getElementById('current-card');
const totalCardsSpan = document.getElementById('total-cards');

// FUNÇÃO PARA ATUALIZAR O CARD
function updateCard() {
  const game = games[currentIndex];
  
  // Adiciona efeito de fade out
  gameImage.style.opacity = '0';
  
  // Após a animação, atualiza o conteúdo
  setTimeout(() => {
    // Atualiza imagem, nome e descrição
    gameImage.src = game.image;
    gameImage.alt = game.name;
    gameName.textContent = game.name;
    gameText.textContent = game.description;
    
    // Atualiza indicador
    currentCardSpan.textContent = currentIndex + 1;
    
    // Fade in da nova imagem
    gameImage.style.opacity = '1';
  }, 250);
  
  // Atualiza estado dos botões
  updateButtonStates();
}

// FUNÇÃO PARA ATUALIZAR ESTADO DOS BOTÕES
function updateButtonStates() {
  // Desabilita botão "Anterior" se estiver no primeiro card
  prevBtn.disabled = currentIndex === 0;
  
  // Desabilita botão "Próximo" se estiver no último card
  nextBtn.disabled = currentIndex === totalCards - 1;
}

// FUNÇÃO PARA IR PARA O PRÓXIMO CARD
function nextCard() {
  if (currentIndex < totalCards - 1) {
    currentIndex++;
    updateCard();
  }
}

// FUNÇÃO PARA IR PARA O CARD ANTERIOR
function prevCard() {
  if (currentIndex > 0) {
    currentIndex--;
    updateCard();
  }
}

// EVENT LISTENERS
document.addEventListener('DOMContentLoaded', function() {
  // Inicializa o total de cards
  totalCardsSpan.textContent = totalCards;
  
  // Carrega o primeiro jogo
  updateCard();
  
  // Adiciona eventos aos botões
  nextBtn.addEventListener('click', nextCard);
  prevBtn.addEventListener('click', prevCard);
  
  // Adiciona navegação por teclado (opcional)
  document.addEventListener('keydown', function(event) {
    // Verifica se estamos na sessão de cards
    const cardsSection = document.getElementById('jogos');
    const rect = cardsSection.getBoundingClientRect();
    const isInView = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (isInView) {
      if (event.key === 'ArrowLeft') {
        prevCard();
      } else if (event.key === 'ArrowRight') {
        nextCard();
      }
    }
  });
});

