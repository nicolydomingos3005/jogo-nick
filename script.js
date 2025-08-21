const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20; // Tamanho do grid (tamanho da "célula" da cobrinha e das frutas)
let snake = [{ x: 100, y: 100 }];  // Cobrinha começando na posição (100, 100)
let fruit = { x: 200, y: 200 };    // Fruta gerada aleatoriamente
let score = 0;
let dx = gridSize;  // Direção inicial (para a direita)
let dy = 0;
let changingDirection = false;  // Previne mudanças rápidas de direção

// Função para desenhar a cobrinha
function drawSnake() {
    snake.forEach(segment => {
        ctx.fillStyle = "#00FF00";  // Cor da cobrinha
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });
}

// Função para desenhar a fruta
function drawFruit() {
    ctx.fillStyle = "#FF0000";  // Cor da fruta
    ctx.fillRect(fruit.x, fruit.y, gridSize, gridSize);
}

// Função para movimentar a cobrinha
function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);  // Adiciona a nova cabeça da cobrinha no início do array

    // Verificar se a cobrinha comeu a fruta
    if (head.x === fruit.x && head.y === fruit.y) {
        score++;
        document.getElementById("scoreValue").textContent = score;
        generateFruit();  // Gera uma nova fruta
    } else {
        snake.pop();  // Remove o último segmento da cobrinha (movimento)
    }
}

// Função para gerar a fruta em uma posição aleatória
function generateFruit() {
    const x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
    const y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
    fruit = { x, y };
}

// Função para controlar a direção da cobrinha
function changeDirection(event) {
    if (changingDirection) return;
    changingDirection = true;

    if (event.key === "ArrowUp" && dy === 0) {
        dx = 0;
        dy = -gridSize;
    } else if (event.key === "ArrowDown" && dy === 0) {
        dx = 0;
        dy = gridSize;
    } else if (event.key === "ArrowLeft" && dx === 0) {
        dx = -gridSize;
        dy = 0;
    } else if (event.key === "ArrowRight" && dx === 0) {
        dx = gridSize;
        dy = 0;
    }
}

// Função para verificar colisões com a parede ou com a própria cobrinha
function checkCollisions() {
    const head = snake[0];

    // Colisão com a parede
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        return true;
    }

    // Colisão com a própria cobrinha
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }

    return false;
}

// Função principal de atualização
function update() {
    changingDirection = false;
    moveSnake();
    if (checkCollisions()) {
        resetGame();  // Reseta o jogo se houver colisão
    }
    drawGame();
}

// Função para desenhar o jogo
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Limpa o canvas
    drawSnake();
    drawFruit();
}

// Função para resetar o jogo
function resetGame() {
    snake = [{ x: 100, y: 100 }];
    dx = gridSize;
    dy = 0;
    score = 0;
    document.getElementById("scoreValue").textContent = score;
    generateFruit();
}

// Adicionando o evento de pressionar as teclas para mudar a direção
document.addEventListener("keydown", changeDirection);

// Inicia o jogo
function gameLoop() {
    update();
    setTimeout(gameLoop, 100);  // Controla a velocidade do jogo (100ms por frame)
}

// Inicia o loop do jogo
gameLoop();
