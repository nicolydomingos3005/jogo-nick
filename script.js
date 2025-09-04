const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const canvasSize = 800;  // Aumentei o tamanho do canvas

canvas.width = canvasSize;
canvas.height = canvasSize;

let snake;
let food;
let direction;
let npcSnakes;
let gameInterval;
let isGameOver = false;

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

function spawnFood() {
  return {
    x: randomPosition() + gridSize,  // Adicionando uma margem
    y: randomPosition() + gridSize,  // Adicionando uma margem
    color: `hsl(${Math.random() * 360}, 100%, 50%)`
  };
}

function init() {
  snake = createSnake("lime");
  snake.body = [
    { x: gridSize * 5, y: gridSize * 5 },
    { x: gridSize * 4, y: gridSize * 5 },
  ];
  direction = "RIGHT";
  npcSnakes = createMultipleNPCs(5);  // Agora com 5 NPCs
  npcSnakes.forEach(npc => {
    npc.body[0].x = randomPosition();
    npc.body[0].y = randomPosition();
  });
  food = spawnFood();
  isGameOver = false;
  document.getElementById("gameOver").style.display = "none";

  clearInterval(gameInterval);
  gameInterval = setInterval(gameLoop, 200);  // Aumentei o tempo entre os movimentos
}

function gameLoop() {
  if (isGameOver) return;

  moveSnake(snake);

  npcSnakes.forEach(npc => {
    moveNPC(npc);
  });

  if (checkCollision(snake)) {
    endGame();
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

  if (head.x === food.x && head.y === food.y) {
    food = spawnFood();
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

  // Próprio corpo
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

function draw() {
  ctx.clearRect(0, 0, canvasSize, canvasSize);

  drawFood(food);
  drawSnake(snake);

  npcSnakes.forEach(npc => {
    if (npc.alive) drawSnake(npc);
  });
}

function drawSnake(snakeObj) {
  ctx.fillStyle = snakeObj.color;
  snakeObj.body.forEach(part => {
    ctx.fillRect(part.x, part.y, gridSize, gridSize);
  });
}

function drawFood(foodObj) {
  ctx.fillStyle = foodObj.color;
  ctx.beginPath();
  ctx.arc(
    foodObj.x + gridSize / 2,
    foodObj.y + gridSize / 2,
    gridSize / 2 - 2,
    0,
    Math.PI * 2
  );
  ctx.fill();
}

function endGame() {
  isGameOver = true;
  clearInterval(gameInterval);
  document.getElementById("gameOver").style.display = "block";
}

function restartGame() {
  init();
}

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      if (direction !== "DOWN") direction = "UP";
      break;
    case "ArrowDown":
      if (direction !== "UP") direction = "DOWN";
      break;
    case "ArrowLeft":
      if (direction !== "RIGHT") direction = "LEFT";
      break;
    case "ArrowRight":
      if (direction !== "LEFT") direction = "RIGHT";
      break;
  }
  snake.direction = direction;
});

init();
