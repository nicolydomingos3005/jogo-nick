const cores = ['vermelho', 'azul', 'verde', 'amarelo'];
const valores = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Reverso', 'Pular', 'Comprar Duas'];
const tiposEspeciais = ['Coringa', 'Coringa Comprar Quatro'];
let baralho = [];
let maoJogador = [];
let cartaAtual = null;

// Função para criar o baralho
function criarBaralho() {
  baralho = [];

  // Cartas normais
  for (let cor of cores) {
    for (let valor of valores) {
      baralho.push({ cor, valor });
    }
  }

  // Cartas especiais (Coringa e Coringa Comprar Quatro)
  for (let i = 0; i < 4; i++) {
    baralho.push({ cor: 'preto', valor: 'Coringa' });
    baralho.push({ cor: 'preto', valor: 'Coringa Comprar Quatro' });
  }

  // Embaralhar
  baralho = baralho.sort(() => Math.random() - 0.5);
}

// Função para iniciar o jogo
function iniciarJogo() {
  criarBaralho();
  maoJogador = baralho.splice(0, 7); // Jogador começa com 7 cartas

  cartaAtual = baralho.pop(); // A carta inicial é retirada do baralho

  document.getElementById('cartaAtual').textContent = `${cartaAtual.valor} de ${cartaAtual.cor}`;
  atualizarMaoJogador();

  // Habilitar botão de "Comprar Carta"
  document.getElementById('comprarCartaBtn').disabled = false;
}

// Função para atualizar as cartas na mão do jogador
function atualizarMaoJogador() {
  const maoElement = document.getElementById('cartasMao');
  maoElement.innerHTML = '';

  maoJogador.forEach((carta, index) => {
    const cartaDiv = document.createElement('div');
    cartaDiv.classList.add('carta');
    cartaDiv.textContent = `${carta.valor} de ${carta.cor}`;
    cartaDiv.onclick = () => jogarCarta(index);
    maoElement.appendChild(cartaDiv);
  });
}

// Função para jogar uma carta
function jogarCarta(index) {
  const cartaEscolhida = maoJogador[index];

  // Verifica se a carta pode ser jogada
  if (podeJogar(cartaEscolhida)) {
    cartaAtual = cartaEscolhida;
    maoJogador.splice(index, 1); // Remove a carta jogada
    document.getElementById('cartaAtual').textContent = `${cartaAtual.valor} de ${cartaAtual.cor}`;
    atualizarMaoJogador();

    if (maoJogador.length === 0) {
      document.getElementById('vencedor').textContent = 'Você venceu!';
      document.getElementById('comprarCartaBtn').disabled = true;
    }
  } else {
    alert('Você não pode jogar esta carta!');
  }
}

// Função para verificar se a carta pode ser jogada
function podeJogar(carta) {
  return carta.cor === cartaAtual.cor || carta.valor === cartaAtual.valor || carta.valor === 'Coringa' || carta.valor === 'Coringa Comprar Quatro';
}

// Função para comprar uma carta
function comprarCarta() {
  if (baralho.length === 0) {
    alert('Baralho vazio!');
    return;
  }

  const cartaComprada = baralho.pop();
  maoJogador.push(cartaComprada);
  atualizarMaoJogador();
}

// Ação do botão Comprar Carta
document.getElementById('comprarCartaBtn').addEventListener('click', () => {
  comprarCarta();
});

// Iniciar o jogo ao carregar a página
window.onload = iniciarJogo;
