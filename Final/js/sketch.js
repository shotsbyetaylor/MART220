let canvasHeight = 2000;
let titleFont;
let bodyFont;
let bgImage;

let eraBoxes = [];

let character;
let characterSpeed = 5;
let isColliding = false;

function preload() {
  titleFont = loadFont('assets/MangoGrotesque-BlackItalic.ttf');
  bodyFont = loadFont('assets/MangoGrotesque-VF.ttf');
  bgImage = loadImage('assets/taypic1.jpg');
}

function setup() {
  noCanvas();
  createCanvas(windowWidth, canvasHeight);
  removeMargins();

  character = {
    x: width / 2,
    y: 1000,
    w: 50,
    h: 50,
  };

  background('#2b2b2b');

  setupTimeline();
}

function draw() {
  background('#2b2b2b');

  drawStaticUI();

  drawTimeline();

  handleCharacterMovement();
  checkCollision();
  drawCharacter();
}

function windowResized() {
  resizeCanvas(windowWidth, canvasHeight);
}

function removeMargins() {
  let body = document.body;
  body.style.margin = "0";
  body.style.padding = "0";
}

function drawStaticUI() {
  // Title
  textFont(titleFont);
  textAlign(CENTER, TOP);
  textSize(90);
  fill(255);
  noStroke();
  text("Taylor Denton: Videography Journey", width / 2, 50);

  // Scroll Down
  textFont(bodyFont);
  textSize(24);
  fill(200);
  text("Scroll down to explore the exhibition", width / 2, 170);

  // Background Image
  let imgWidth = width * 0.8;
  let imgHeight = (bgImage.height / bgImage.width) * imgWidth;
  image(bgImage, width/2 - imgWidth/2, 220, imgWidth, imgHeight);
}

function setupTimeline() {
  let y = 1150;
  let boxWidth = 300;
  let boxHeight = 150;
  let spacing = width / 4;

  eraBoxes = [
    { label: "Getting Started", x: spacing - boxWidth/2, y: y - 200, w: boxWidth, h: boxHeight },
    { label: "Turning Point", x: 2 * spacing - boxWidth/2, y: y + 50, w: boxWidth, h: boxHeight },
    { label: "Finding Success", x: 3 * spacing - boxWidth/2, y: y - 200, w: boxWidth, h: boxHeight },
  ];
}

function drawTimeline() {
  let y = 1150;

  stroke(200);
  strokeWeight(4);
  line(50, y, width - 50, y);

  noStroke();
  textFont(bodyFont);
  textSize(20);

  for (let box of eraBoxes) {
    fill(80);
    rect(box.x, box.y, box.w, box.h, 20);
    fill(255);
    textAlign(CENTER, CENTER);
    text(box.label, box.x + box.w/2, box.y + box.h/2);
  }
}

function handleCharacterMovement() {
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    character.x -= characterSpeed;
  }
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    character.x += characterSpeed;
  }
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
    character.y -= characterSpeed;
  }
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
    character.y += characterSpeed;
  }

  character.x = constrain(character.x, 0, width - character.w);
  character.y = constrain(character.y, 0, height - character.h);
}

function drawCharacter() {
  fill(255, 100, 100);
  noStroke();
  rect(character.x, character.y, character.w, character.h);

  if (isColliding) {
    fill(255);
    textFont(bodyFont);
    textSize(24);
    textAlign(CENTER, BOTTOM);
    text("Load New Page", character.x + character.w / 2, character.y - 10);
  }
}

function checkCollision() {
  isColliding = false;

  for (let box of eraBoxes) {
    if (character.x < box.x + box.w &&
        character.x + character.w > box.x &&
        character.y < box.y + box.h &&
        character.y + character.h > box.y) {
      isColliding = true;
      break;
    }
  }
}
