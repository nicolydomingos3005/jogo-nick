const cores = ['vermelho', 'azul', 'verde', 'amarelo'];
const valores = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Reverso', 'Pular', 'Comprar Duas'];
const tiposEspeciais = ['Coringa', 'Coringa Comprar Quatro'];

let baralho = [];
let maoJogador = [];
let cartaAtual = null;
let jogoIniciado = false;

// Função para criar o baralho
function criarBaralho() {
  baralho = [];
  for (let cor of cores) {
    for (let valor of valores) {
      baralho.push({ cor, valor });
    }
  }
  // Cartas especiais
  for (let i = 0; i < 4; i++) {
    baralho.push({ cor: 'preto', valor: 'Coringa' });
    baralho.push({ cor: 'preto', valor: 'Coringa Comprar Quatro' });
  }
  // Embaralhando o baralho
  baralho = baralho.sort(() => Math.random() - 0.5);
}

// Função para iniciar o jogo
function iniciarJogo() {
  if (jogoIniciado) return;
  jogoIniciado = true;
  criarBaralho();
  maoJogador = baralho.splice(0, 7); // Jogador começa com 7 cartas
  cartaAtual = baralho.pop(); // Carta inicial
  
  document.getElementById('current-card').textContent = `${cartaAtual.valor} de ${cartaAtual.cor}`;
  atualizarMaoJogador();

  document.getElementById('draw-card-btn').disabled = false;
  document.getElementById('end-turn-btn').disabled = false;
}

// Função para atualizar as cartas na mão do jogador
function atualizarMaoJogador() {
  const maoElement = document.getElementById('player-hand');
  maoElement.innerHTML = '';

  maoJogador.forEach((carta, index) => {
    const cartaDiv = document.createElement('div');
    cartaDiv.classList.add('card');
    cartaDiv.textContent = `${carta.valor} de ${carta.cor}`;
    cartaDiv.onclick = () => jogarCarta(index);
    maoElement.appendChild(cartaDiv);
  });
}

// Função para verificar se uma carta pode ser jogada
function podeJogar(carta) {
  return carta.cor === cartaAtual.cor || carta.valor === cartaAtual.valor || carta.valor === 'Coringa' || carta.valor === 'Coringa Comprar Quatro';
}

// Função para jogar uma carta
function jogarCarta(index) {
  const cartaEscolhida = maoJogador[index];
  if (podeJogar(cartaEscolhida)) {
    cartaAtual = cartaEscolhida;
    maoJogador.splice(index, 1); // Remove a carta jogada
    document.getElementById('current-card').textContent = `${cartaAtual.valor} de ${cartaAtual.cor}`;
    atualizarMaoJogador();

    if (maoJogador.length === 0) {
      alert('Você venceu!');
      document.getElementById('draw-card-btn').disabled = true;
    }
  } else {
    alert('Essa carta não pode ser jogada!');
  }
}

// Função para comprar uma carta
function comprarCarta() {
  if (baralho.length === 0) {
    alert('O baralho está vazio!');
    return;
  }

  const cartaComprada = baralho.pop();
  maoJogador.push(cartaComprada);
  atualizarMaoJogador();
}

// Ação do botão de comprar carta
document.getElementById('draw-card-btn').addEventListener('click', comprarCarta);

// Ação do botão de iniciar jogo
document.getElementById('end-turn-btn').addEventListener('click', iniciarJogo);
