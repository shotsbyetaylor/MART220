let characterX = 100;
let characterY = 250;
let characterW = 100;
let characterH = 150;

let health = 100;
const maxHealth = 100;

let boulders = [];
let foods = [];
let idlePaths = [];
let i = 0;
let animations = [];
let timeLeft = 60;
let gameOver = false;
let score = 0;

let knightImage;

let obstacles = [];

function preload() {
  knightImage = loadImage('./images/png/KnightIdle__001.png');
  idlePaths = loadStrings("./images/idle.txt");
}

function setup() {
  createCanvas(800, 500);
  textFont('Arial');

  // Optional knight sprite if you want to display image
  kingSprite = createGraphics(characterW, characterH);
  kingSprite.image(knightImage, 0, 0, characterW, characterH);

  // Generate obstacles
  for (let i = 0; i < 3; i++) {
    let obs = {
      x: random(100, 700),
      y: random(100, 400),
      w: 80,
      h: 80
    };
    obstacles.push(obs);
  }

  // Generate food
  for (let j = 0; j < 5; j++) {
    let x = random(50, 750);
    let y = random(50, 450);
    let d = random(20, 50);
    foods.push(new food(x, y, d));
  }

  setInterval(decreaseTime, 1000);
  setInterval(incrementIdleIndex, 150);
}

function draw() {
  background(120);

  // UI
  fill(255);
  textSize(18);
  textAlign(LEFT);
  text("Score: " + score, 20, 30);
  text("Time Left: " + timeLeft + "s", 20, 55);

  // Health Bar
  fill(255);
  text("Health:", 20, 80);
  fill(200, 0, 0);
  rect(90, 67, maxHealth, 15);
  fill(0, 255, 0);
  rect(90, 67, health, 15);

  // Game over check
  if (gameOver || health <= 0) {
    fill(255, 50, 50);
    textSize(40);
    textAlign(CENTER, CENTER);
    text("GAME OVER", width / 2, height / 2);
    return;
  }

  // Draw obstacles
  fill(100);
  for (let obs of obstacles) {
    rect(obs.x, obs.y, obs.w, obs.h);
  }

  // Movement with collision check
  let nextX = characterX;
  let nextY = characterY;

  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) nextX -= 2;
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) nextX += 2;
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) nextY -= 2;
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) nextY += 2;

  // Collision check with obstacles
  let collision = false;
  for (let obs of obstacles) {
    if (nextX < obs.x + obs.w &&
        nextX + characterW > obs.x &&
        nextY < obs.y + obs.h &&
        nextY + characterH > obs.y) {
      collision = true;
      break;
    }
  }

  if (!collision) {
    characterX = nextX;
    characterY = nextY;
  } else {
    health -= 0.5;
    health = max(0, health);
  }

  // Draw knight image
  image(knightImage, characterX, characterY, characterW, characterH);

  // Food collision
  for (let f of foods) {
    if (
      !f.isEaten &&
      checkCollision(characterX, characterY, characterW, characterH, f.x, f.y, f.diameter)
    ) {
      f.isEaten = true;
      if (f.state === "perfect") {
        score += 3;
      } else if (f.state === "fresh") {
        score += 1;
      } else if (f.state === "burnt") {
        score += 0;
      }
    }
    f.drawCircle();
  }
}

function incrementIdleIndex() {
  if (!gameOver) {
    i++;
    if (i >= animations.length) i = 0;
  }
}

function decreaseTime() {
  if (!gameOver) {
    timeLeft--;
    if (timeLeft <= 0) {
      gameOver = true;
    }
  }
}

function checkCollision(rx, ry, rw, rh, cx, cy, cd) {
  let closestX = constrain(cx, rx, rx + rw);
  let closestY = constrain(cy, ry, ry + rh);
  let distance = dist(cx, cy, closestX, closestY);
  return distance < cd / 2;
}