import { end } from './pages/end';
import { game } from './pages/game';
import { home } from './pages/home'
import './style.css'

const app = document.querySelector("#app")
const size = 400;
const cellSize = 20;
const cols = Math.floor(size / cellSize)
let score = 0
let snake = []
let fruit = null
let direction = null
let oldDirection = null
const timeBetweenLoops = 300
let interval = null
let isPaused = false


function startApp() {
  app.innerHTML = home()
  const startButton = document.querySelector("#start")
  startButton.addEventListener("click", newGame)
  startButton.focus()
}

function newGame() {
  score = 0
  snake = [{ x: 0, y: 0 }]
  fruit = randomFruitPosition()
  direction = { dx: 1, dy: 0 }
  isPaused = false

  app.innerHTML = game(size)
  const pauseButton = document.querySelector("#pause")
  pauseButton.addEventListener("click", pauseGame)
  pauseButton.focus()
  document.querySelector("#overlay-unpause").addEventListener("click", pauseGame)
  document.querySelector("#overlay-restart").addEventListener("click", () => {
    clearInterval(interval)
    newGame()
  })
  document.querySelector("#overlay-end").addEventListener("click", () => {
    clearInterval(interval)
    startApp()
  })

  updateScore()

  interval = setInterval(() => {
    gameLoop()
  }, timeBetweenLoops);
}

function addKeyboardEvents() {
  document.addEventListener("keydown", (event) => {
    const directions = {
      ArrowLeft: { dx: -1, dy: 0 },
      ArrowUp: { dx: 0, dy: -1 },
      ArrowRight: { dx: 1, dy: 0 },
      ArrowDown: { dx: 0, dy: 1 }
    };

    if (event.code === "Escape") {
      pauseGame()
      return
    }

    if (!directions[event.code]) {
      return
    }

    if (direction.dx + directions[event.code].dx === 0 || direction.dy + directions[event.code].dy === 0) {
      return
    }
    if (oldDirection && (oldDirection.dx + directions[event.code].dx === 0 || oldDirection.dy + directions[event.code].dy === 0)) {
      return
    }

    oldDirection = direction
    direction = directions[event.code] ?? direction
  })
}

function pauseGame() {
  isPaused = !isPaused

  const pauseOverlay = document.querySelector("#pause-overlay")
  const overlayUnpauseButton = document.querySelector("#overlay-unpause")
  const pauseButton = document.querySelector("#pause")

  pauseOverlay.classList.toggle("hidden")
  pauseButton.classList.toggle("hidden")

  if (isPaused) {
    overlayUnpauseButton.focus()
  } else {
    pauseButton.focus()
  }
}

function gameLoop() {
  if (isPaused) {
    return
  }

  const canvas = document.querySelector("canvas")
  const ctx = canvas.getContext("2d")
  ctx.fillStyle = "yellow"
  ctx.fillRect(0, 0, size, size)
  drawFruit(ctx)
  drawSnake(ctx)
  updateScore()
  checkWallsCollision()
  checkTailCollision()
  moveSnake()
  oldDirection = null
}

function checkTailCollision() {
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      endGame()
    }
  }
}

function checkWallsCollision() {
  if (snake[0].x < 0 || snake[0].y < 0 || snake[0].x >= cols || snake[0].y >= cols) {
    endGame()
  }
}

function endGame() {
  clearInterval(interval)
  app.innerHTML = end(score)
  const restartButton = document.querySelector("#restart")
  restartButton.addEventListener("click", newGame)
  restartButton.focus()
}

function moveSnake() {
  snake.unshift({ x: snake[0].x + direction.dx, y: snake[0].y + direction.dy })
  if (snake[0].x === fruit.x && snake[0].y === fruit.y) {
    score += 1
    fruit = randomFruitPosition()
  } else {
    snake.pop()
  }
}

function updateScore() {
  document.querySelector("#score").textContent = score
}

function isOnSnake(x, y) {
  for (let i = 0; i < snake.length; i++) {
    if (snake[i].x === x && snake[i].y === y) {
      return true
    }
  }
  return false
}

function randomFruitPosition() {
  let x = 0
  let y = 0
  do {
    x = Math.floor(Math.random() * cols)
    y = Math.floor(Math.random() * cols)
  } while (isOnSnake(x, y));
  return { x: x, y: y }
}

function drawFruit(ctx) {
  ctx.fillStyle = "red"
  ctx.fillRect(fruit.x * cellSize, fruit.y * cellSize, cellSize, cellSize)
}

function drawSnake(ctx) {
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = "green"
    ctx.fillRect(snake[i].x * cellSize, snake[i].y * cellSize, cellSize, cellSize)
  }
}

startApp()
addKeyboardEvents()
