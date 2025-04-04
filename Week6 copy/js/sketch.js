var foods = [];
var myAnimation;
var animations = [];
var i = 0;
var characterX = 100;
var characterY = 250;
var idlePaths = [];
var boulders = [];
var timeLeft = 60; // ⏱️ 60-second timer
var gameOver = false;
var score = 0;

function preload() {
  idlePaths = loadStrings("./images/idle.txt");
}

function setup() {
  createCanvas(800, 500);
  textFont('Arial');

  // Load boulders
  for (let b = 0; b < 5; b++) {
    let myBoulder = new boulderImage("/images/boulder.png", random(10, 600), random(10, 400), 75, 75);
    myBoulder.loadBoulder();
    boulders[b] = myBoulder;
  }

  // Load animation frames
  for (let a = 0; a < idlePaths.length; a++) {
    myAnimation = new animationImages(
      idlePaths[a],
      characterX,
      characterY,
      100,
      150
    );
    animations[a] = myAnimation;
  }

  // Generate food
  for (let j = 0; j < 5; j++) {
    let x = random(50, 750);
    let y = random(50, 450);
    let d = random(20, 50);
    foods.push(new food(x, y, d));
  }

  setInterval(incrementIdleIndex, 150);
  setInterval(decreaseTime, 1000); // ⏱️ call every second
}

function draw() {
  background(120);

  // ⏱️ Show time left
  fill(255);
  textSize(18);
  textAlign(LEFT);
  text("Score: " + score, 20, 30);
  text("Time Left: " + timeLeft + "s", 20, 55);

  if (gameOver) {
    fill(255, 50, 50);
    textSize(40);
    textAlign(CENTER, CENTER);
    text("GAME OVER", width / 2, height / 2);
    return;
  }

  

  // Draw boulders
  for (let b = 0; b < boulders.length; b++) {
    boulders[b].drawBoulder();
  }

  // Movement
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) characterX -= 2;
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) characterX += 2;
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) characterY -= 2;
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) characterY += 2;

  // Update animation position & draw
  animations[i].x = characterX;
  animations[i].y = characterY;
  animations[i].drawAnimation();

  // Food & collision
  for (let k = 0; k < foods.length; k++) {
    let f = foods[k];

    if (
      !f.isEaten &&
      checkCollision(characterX, characterY, 100, 150, f.x, f.y, f.diameter)
    ) {
      f.isEaten = true;
      console.log("Yum! Ate a " + f.state + " food");
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
