const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const canvasSize = 600;  // Tamanho do canvas

canvas.width = canvasSize;
canvas.height = canvasSize;

let snake;
let food = [];
let direction;
let npcSnakes;
let gameInterval;
let isGameOver = false;
let lives = 3;  // Vidas extras (inicializando com 3 vidas)

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

food.push(...spawnFood(1));

