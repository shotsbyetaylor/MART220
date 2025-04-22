let redSquare;
let blueCircles = [];
let greenCircles = [];
let movingGreenCircles = [];
let currentLevel = 0;
let score = 0;

let startTime;
let totalTime = 0;
let gameWon = false;

const levels = [level1, level2, level3, level4];

function setup() {
  createCanvas(960, 540);
  redSquare = { x: 0, y: 0, size: 25, speed: 3 };
  loadLevel(currentLevel);
  startTime = millis();
}

function draw() {
  if (gameWon) {
    drawWinScreen();
    return;
  }

  background(40);

  if (levels[currentLevel].drawBackground) {
    levels[currentLevel].drawBackground();
  }

  fill('red');
  rect(redSquare.x, redSquare.y, redSquare.size, redSquare.size);

  fill('blue');
  for (let i = blueCircles.length - 1; i >= 0; i--) {
    let obj = blueCircles[i];
    ellipse(obj.x, obj.y, obj.radius * 2);
    if (collidesWithCircle(redSquare, obj)) {
      blueCircles.splice(i, 1);
      score++;
    }
  }

  fill('green');
  for (let enemy of greenCircles) {
    ellipse(enemy.x, enemy.y, enemy.radius * 2);
    if (collidesWithCircle(redSquare, enemy)) {
      resetLevel();
    }
  }

  for (let enemy of movingGreenCircles) {
    enemy.y += enemy.direction * 2;

    if (enemy.y <= 40 || enemy.y >= height - 40) {
      enemy.direction *= -1;
    }

    fill('green');
    ellipse(enemy.x, enemy.y, enemy.radius * 2);

    if (collidesWithCircle(redSquare, enemy)) {
      resetLevel();
    }
  }

  movePlayer();

  fill(255);
  textSize(20);
  text(`Score: ${score}`, 20, 20);

  textAlign(RIGHT, TOP);
  let currentTime = (millis() - startTime) / 1000;
  if (!gameWon) {
    totalTime = currentTime;
  }
  text(`Time: ${totalTime.toFixed(1)}s`, width - 20, 20);
  textAlign(LEFT, TOP);

  if (blueCircles.length === 0) {
    nextLevel();
  }
}

function movePlayer() {
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) redSquare.x -= redSquare.speed;
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) redSquare.x += redSquare.speed;
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) redSquare.y -= redSquare.speed;
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) redSquare.y += redSquare.speed;

  redSquare.x = constrain(redSquare.x, 0, width - redSquare.size);
  redSquare.y = constrain(redSquare.y, 0, height - redSquare.size);
}

function collidesWithCircle(square, circle) {
  let closestX = constrain(circle.x, square.x, square.x + square.size);
  let closestY = constrain(circle.y, square.y, square.y + square.size);
  let dx = circle.x - closestX;
  let dy = circle.y - closestY;
  return sqrt(dx * dx + dy * dy) < circle.radius;
}

function loadLevel(index) {
  const level = levels[index];
  redSquare.x = level.redStart.x;
  redSquare.y = level.redStart.y;
  score = 0;

  blueCircles = level.blueCircles.map(obj => ({ ...obj, radius: 15 }));
  greenCircles = level.greenCircles.map(obj => ({ ...obj, radius: 15 }));

  movingGreenCircles = level.movingGreenCircles
    ? level.movingGreenCircles.map(obj => ({ ...obj, radius: 15 }))
    : [];
}

function resetLevel() {
  console.log("💥 Hit by enemy! Resetting level...");
  loadLevel(currentLevel);
}

function nextLevel() {
  console.log("nextLevel triggered");

  currentLevel++;
  if (currentLevel < levels.length) {
    console.log("Level complete!");
    loadLevel(currentLevel);
  } else {
    console.log("All levels complete!");
    gameWon = true;
  }
}

function drawWinScreen() {
  background(20);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(40);
  text("You win!", width / 2, height / 2 - 20);
  textSize(24);
  text(`Final Time: ${totalTime.toFixed(1)} seconds`, width / 2, height / 2 + 30);
}
