const game = document.querySelector(".game");
const dino = document.getElementById("dino");

let cactuses = [];
let spawnTimeout;

let score = 0;
let scoreInterval;
let speed = 1.5;
let isGameRunning = false;
let gameInterval;

function jump() {
  if (!dino.classList.contains("jump")) {
    dino.classList.add("jump");

    setTimeout(() => {
      dino.classList.remove("jump");
    }, 500);
  }
}

function createCactus() {
  const cactus = document.createElement("div");
  cactus.classList.add("cactus");

  cactus.style.animation = `cactusMove ${speed}s linear`;

  game.appendChild(cactus);
  cactuses.push(cactus);

  setTimeout(() => {
    cactus.remove();
    cactuses = cactuses.filter((c) => c !== cactus);
  }, speed * 1000);
}

function checkCollision() {
  const dinoRect = dino.getBoundingClientRect();

  const dinoHitbox = {
    left: dinoRect.left + 5,
    right: dinoRect.right - 5,
    top: dinoRect.top + 5,
    bottom: dinoRect.bottom - 5,
  };

  cactuses.forEach((cactus) => {
    const cactusRect = cactus.getBoundingClientRect();

    if (
      dinoHitbox.right > cactusRect.left &&
      dinoHitbox.left < cactusRect.right &&
      dinoHitbox.bottom > cactusRect.top &&
      dinoHitbox.top < cactusRect.bottom
    ) {
      gameOver();
    }
  });
}

function gameOver() {
  isGameRunning = false;

  clearInterval(gameInterval);
  clearInterval(scoreInterval);
  clearTimeout(spawnTimeout);

  cactuses.forEach((c) => c.remove());
  cactuses = [];

  alert(
    "Game Over 💀\nScore: " + score + "\nEnter Space button to restart game",
  );
}

document.addEventListener("keydown", function (e) {
  if (e.code === "Space") {
    if (!isGameRunning) {
      startGame();
    } else {
      jump();
    }
  }
});

function startGame() {
  if (isGameRunning) return;

  isGameRunning = true;

  score = 0;
  speed = 1.5;
  document.getElementById("score").innerText = "Score: 0";

  cactuses.forEach((c) => c.remove());
  cactuses = [];

  gameInterval = setInterval(checkCollision, 10);

  scoreInterval = setInterval(() => {
    score++;
    document.getElementById("score").innerText = "Score: " + score;

    if (score % 100 === 0 && speed > 0.6) {
      speed -= 0.1;
    }
  }, 100);

  spawnCactus();
}

function spawnCactus() {
  if (!isGameRunning) return;

  createCactus();

  spawnTimeout = setTimeout(spawnCactus, Math.random() * 1500 + 800);
}
