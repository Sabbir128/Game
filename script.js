const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

// Player properties
const player = {
  x: canvas.width / 2,
  y: canvas.height - 50,
  width: 50,
  height: 50,
  color: "blue",
  speed: 5
};

// Bullets array
const bullets = [];
const bulletSpeed = 7;

// Enemy properties
const enemies = [];
const enemySpeed = 2;
let spawnInterval = 1000;

// Handle player movement
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && player.x > 0) player.x -= player.speed;
  if (e.key === "ArrowRight" && player.x + player.width < canvas.width) player.x += player.speed;
  if (e.key === " " || e.key === "ArrowUp") shootBullet();
});

// Function to shoot bullet
function shootBullet() {
  bullets.push({ x: player.x + player.width / 2, y: player.y, width: 5, height: 10, color: "red" });
}

// Function to spawn enemies
function spawnEnemy() {
  enemies.push({
    x: Math.random() * (canvas.width - 50),
    y: -50,
    width: 50,
    height: 50,
    color: "green"
  });
}

// Update game objects
function update() {
  // Update bullets
  bullets.forEach((bullet, index) => {
    bullet.y -= bulletSpeed;
    if (bullet.y < 0) bullets.splice(index, 1);
  });

  // Update enemies
  enemies.forEach((enemy, index) => {
    enemy.y += enemySpeed;
    if (enemy.y > canvas.height) enemies.splice(index, 1);
  });

  // Check for collisions
  bullets.forEach((bullet, bIndex) => {
    enemies.forEach((enemy, eIndex) => {
      if (
        bullet.x < enemy.x + enemy.width &&
        bullet.x + bullet.width > enemy.x &&
        bullet.y < enemy.y + enemy.height &&
        bullet.y + bullet.height > enemy.y
      ) {
        bullets.splice(bIndex, 1);
        enemies.splice(eIndex, 1);
      }
    });
  });
}

// Draw game objects
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw player
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // Draw bullets
  bullets.forEach((bullet) => {
    ctx.fillStyle = bullet.color;
    ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
  });

  // Draw enemies
  enemies.forEach((enemy) => {
    ctx.fillStyle = enemy.color;
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
  });
}

// Game loop
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop();
setInterval(spawnEnemy, spawnInterval);
                          
