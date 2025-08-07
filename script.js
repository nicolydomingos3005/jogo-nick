let playerCards = [];
let computerCards = [];
let centerCard = {};
let gameStarted = false;

const colors = ['red', 'green', 'blue', 'yellow'];
const values = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'skip', 'reverse', 'draw2'];

const startBtn = document.getElementById('start-btn');
const playerCardsList = document.getElementById('player-cards-list');
const centerCardDisplay = document.getElementById('center-card-display');
const messageDisplay = document.getElementById('message');

function startGame() {
    gameStarted = true;
    startBtn.disabled = true;
    messageDisplay.textContent = "Jogo Iniciado!";

    playerCards = generateCards(7);
    computerCards = generateCards(7);
    centerCard = generateCard();

    updateDisplay();
    gameLoop();
}

function generateCard() {
    const color = colors[Math.floor(Math.random() * colors.length)];
    const value = values[Math.floor(Math.random() * values.length)];
    return { color, value };
}

function generateCards(number) {
    let cards = [];
    for (let i = 0; i < number; i++) {
        cards.push(generateCard());
    }
    return cards;
}

function updateDisplay() {
    // Atualiza as cartas do jogador
    playerCardsList.innerHTML = '';
    playerCards.forEach((card, index) => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        cardDiv.textContent = card.value;
        cardDiv.style.backgroundColor = card.color;
        cardDiv.onclick = () => playCard(index);
        playerCardsList.appendChild(cardDiv);
    });

    // Atualiza a carta central
    centerCardDisplay.textContent = centerCard.value;
    centerCardDisplay.style.backgroundColor = centerCard.color;

    // Atualiza a mensagem do jogo
    messageDisplay.textContent = "Sua vez de jogar!";
}

function playCard(cardIndex) {
    const card = playerCards[cardIndex];
    
    if (card.color === centerCard.color || card.value === centerCard.value) {
        centerCard = card;
        playerCards.splice(cardIndex, 1);
        messageDisplay.textContent = "Você jogou a carta " + card.value + "!";
        checkGameStatus();
        setTimeout(() => computerTurn(), 1000); // Computador joga após 1 segundo
    } else {
        messageDisplay.textContent = "A carta não pode ser jogada, escolha outra.";
    }
}

function computerTurn() {
    messageDisplay.textContent = "Agora é a vez do computador...";

    setTimeout(() => {
        const playableCards = computerCards.filter(card => card.color === centerCard.color || card.value === centerCard.value);
        
        if (playableCards.length > 0) {
            const randomCard = playableCards[Math.floor(Math.random() * playableCards.length)];
            centerCard = randomCard;
            computerCards = computerCards.filter(card => card !== randomCard);
            messageDisplay.textContent = "O computador jogou a carta " + randomCard.value;
        } else {
            messageDisplay.textContent = "O computador não tem cartas para jogar, ele passa a vez.";
        }

        checkGameStatus();
    }, 1000);
}

function checkGameStatus() {
    if (playerCards.length === 0) {
        messageDisplay.textContent = "Parabéns! Você venceu!";
        startBtn.disabled = false;
    } else if (computerCards.length === 0) {
        messageDisplay.textContent = "O computador venceu!";
        startBtn.disabled = false;
    } else {
        updateDisplay();
    }
}
