const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const canvasSize = 600;
const initialSpeed = 150;  // Velocidade inicial (menor é mais lento)

canvas.width = canvasSize;
canvas.height = canvasSize;

let snake;
let food = [];
let direction;
let npcSnakes;
let gameInterval;
let isGameOver = false;
let lives = 5;  // O jogador começa com 5 vidas
let speed = initialSpeed;
let score = 0;

function randomPosition() {
  const pos = Math.floor(Math.random() * (canvasSize / gridSize));
  return pos * gridSize;
}

function createSnake(color) {
  return {
    body: [{ x: gridSize * 5, y: gridSize * 5 }],
    direction: "RIGHT",
    color: color,
    alive: true,
  };
}

function createMultipleNPCs(num) {
  let npcs = [];
  for (let i = 0; i < num; i++) {
    npcs.push(createSnake(`hsl(${Math.random() * 360}, 100%, 50%)`));
  }
  return npcs;
}

function spawnFood(num) {
  let newFood = [];
  for (let i = 0; i < num; i++) {
    newFood.push({
      x: randomPosition(),
      y: randomPosition(),
      color: `hsl(${Math.random() * 360}, 100%, 50%)`
    });
  }
  return newFood;
}

function init() {
  snake = createSnake("lime");
  snake.body = [
    { x: gridSize * 5, y: gridSize * 5 },
    { x: gridSize * 4, y: gridSize * 5 },
  ];
  direction = "RIGHT";
  npcSnakes = createMultipleNPCs(5); // NPCs adversários
  npcSnakes.forEach(npc => {
    npc.body[0].x = randomPosition();
    npc.body[0].y = randomPosition();
  });
  food = spawnFood(10); // Gerar mais bolinhas de comida
  score = 0;
  lives = 5; // O jogador começa com 5 vidas
  isGameOver = false;
  document.getElementById("gameOver").style.display = "none";

  clearInterval(gameInterval);
  gameInterval = setInterval(gameLoop, speed); // Usando um intervalo controlado por variável
}

function gameLoop() {
  if (isGameOver) return;

  moveSnake(snake);

  npcSnakes.forEach(npc => {
    moveNPC(npc);
  });

  if (checkCollision(snake)) {
    handleLifeLoss();
    return;
  }

  npcSnakes.forEach(npc => {
    if (checkCollision(npc)) {
      npc.alive = false;
    }
  });

  draw();
}

function moveSnake(snakeObj) {
  const head = { ...snakeObj.body[0] };

  switch (snakeObj.direction) {
    case "RIGHT": head.x += gridSize; break;
    case "LEFT": head.x -= gridSize; break;
    case "UP": head.y -= gridSize; break;
    case "DOWN": head.y += gridSize; break;
  }

  snakeObj.body.unshift(head);

  // Verificar colisão com a comida
  food.forEach((foodObj, index) => {
    if (head.x === foodObj.x && head.y === foodObj.y) {
      food.splice(index, 1); // Remover a bolinha comida
      food.push(...spawnFood(1)); // Gerar uma nova bolinha de comida
      score += 10; // Aumentar a pontuação
      speed = Math.max(100, speed - 5); // Aumentar a velocidade conforme a pontuação
      clearInterval(gameInterval);
      gameInterval = setInterval(gameLoop, speed); // Atualizar intervalo com a nova velocidade
    }
  });

  if (head.x === food.x && head.y === food.y) {
    food = spawnFood(10);  // Gerar novas bolinhas de comida
  } else {
    snakeObj.body.pop();
  }
}

function moveNPC(npc) {
  if (!npc.alive) return;
  const directions = ["UP", "DOWN", "LEFT", "RIGHT"];
  if (Math.random() < 0.1) {
    npc.direction = directions[Math.floor(Math.random() * 4)];
  }
  moveSnake(npc);
}

function checkCollision(snakeObj) {
  const head = snakeObj.body[0];

  // Paredes
  if (
    head.x < 0 || head.x >= canvasSize ||
    head.y < 0 || head.y >= canvasSize
  ) return true;

  // Corpo da cobra
  for (let i = 1; i < snakeObj.body.length; i++) {
    if (head.x === snakeObj.body[i].x && head.y === snakeObj.body[i].y) {
      return true;
    }
  }

  // Outras cobras
  const allSnakes = [snake, ...npcSnakes.filter(n => n.alive)];
  for (let s of allSnakes) {
    if (s === snakeObj) continue;
    for (let part of s.body) {
      if (head.x === part.x && head.y === part.y) {
        return true;
      }
    }
  }

  return false;
}

function handleLifeLoss() {
  lives--;  // Perde uma vida
  if (lives <= 0) {
    endGame();  // Se não tiver mais vidas, termina o jogo
  } else {
    resetGame();  // Reinicia a posição da cobra e a comida
  }
}

function resetGame() {
  // Reposicionar a cobra no meio
  snake.body = [
    { x: gridSize * 5, y: gridSize * 5 },
    { x: gridSize * 4, y: gridSize * 5 },
  ];

  food = spawnFood(10);  // Gerar novas bolinhas de comida
  document.getElementById("gameOver").style.display = "none";  // Ocultar a tela de 'Game Over'
}

function endGame() {
  isGameOver = true;
  clearInterval(gameInterval);
  document.getElementById("gameOver").style.display = "block";
  document.getElementById("gameOver").innerHTML = `
    <h2>Você perdeu todas as vidas!</h2>
    <button onclick="restartGame()">Tentar novamente</button>
  `;
}

function restartGame() {
  init();  // Reinicia o jogo
