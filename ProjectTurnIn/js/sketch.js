// sketch.js
const canvasHeight = 3600;
let titleFont, bodyFont, bgImage;
let eraBoxes = [];
let character, characterSpeed = 5;
let currentScene = 'timeline';

const backButton = { x: 0, y: 0, w: 200, h: 100 };
const headerImageY = 220;
let headerImageHeight = 0;

let finalVideoBox, finalVideoDiv;
let btsVideoBoxes = [], btsVideoDivs = [];

let introAudio, playAudioButton;
let audioPlayed = false;

// Era-specific globals
let gettingStartedVideos = [], videoBoxes = [];
let turningPointVideos = [], turningPointVideoBoxes = [];
let findingSuccessVideos = [], findingSuccessVideoBoxes = [];

function preload() {
  titleFont  = loadFont('assets/MangoGrotesque-BlackItalic.ttf');
  bodyFont   = loadFont('assets/MangoGrotesque-VF.ttf');
  bgImage    = loadImage('assets/taypic1.jpg');
  introAudio = loadSound('assets/intro.m4a');
}

function setup() {
  createCanvas(windowWidth, canvasHeight);
  frameRate(60);
  removeMargins();

  character = { x: width/2, y: headerImageY + 600, w: 50, h: 50 };

  drawStaticUI();
  setupTimeline();
  setupFinalAndBTSBoxes(headerImageY + headerImageHeight + 800);

  playAudioButton = createButton('▶️ Play Intro Audio')
    .position(width/2 - 100, headerImageY + headerImageHeight + 20);
  styleButton(playAudioButton);
  playAudioButton.mousePressed(handlePlayAudio);
}

function draw() {
  background('#2b2b2b');
  // Show or hide audio button only on timeline
  playAudioButton[ currentScene==='timeline' ? 'show' : 'hide' ]();

  if (currentScene === 'timeline') {
    drawStaticUI();
    drawTimeline();
    drawFinalVideoSection();
  } else {
    drawEraScene();
  }

  handleCharacterMovement();
  if (currentScene === 'timeline') checkCollision();

  // Always draw character last so it appears on top
  drawCharacter();
}

function windowResized() {
  resizeCanvas(windowWidth, canvasHeight);
  drawStaticUI();
  setupTimeline();
  setupFinalAndBTSBoxes(headerImageY + headerImageHeight + 800);
  playAudioButton.position(width/2 - 100, headerImageY + headerImageHeight + 20);
}

// ——— Utility Functions ———

function removeMargins() {
  document.body.style.margin = '0';
  document.body.style.padding = '0';
}

function styleButton(btn) {
  btn.size(200, 40)
     .style('font-size', '16px')
     .style('background-color', '#333')
     .style('color', '#fff')
     .style('border', 'none')
     .style('border-radius', '8px')
     .style('cursor', 'pointer');
}

function handlePlayAudio() {
  if (!audioPlayed) {
    introAudio.setVolume(0.3);
    introAudio.play();
    audioPlayed = true;
    playAudioButton.html('🔊 Playing Intro...');
    playAudioButton.attribute('disabled', true);
  }
}

// ——— Static UI ———

function drawStaticUI() {
  textFont(titleFont);
  textAlign(CENTER, TOP);
  textSize(90);
  fill(255); noStroke();
  text('Taylor Denton: Videography Journey', width/2, 50);

  textFont(bodyFont);
  textSize(24);
  fill(200);
  text('Scroll down to explore the exhibition', width/2, 170);

  const imgW = width * 0.6;
  headerImageHeight = (bgImage.height / bgImage.width) * imgW;
  image(bgImage, width/2 - imgW/2, headerImageY, imgW, headerImageHeight);
}

// ——— Timeline ———

function setupTimeline() {
  const baseY = headerImageY + headerImageHeight + 200;
  const boxW = 300, boxH = 150, spacing = width / 4;

  eraBoxes = [
    { label: 'Getting Started', x: spacing - boxW/2,   y: baseY - 200, w: boxW, h: boxH },
    { label: 'Turning Point',   x: 2*spacing - boxW/2, y: baseY + 50,  w: boxW, h: boxH },
    { label: 'Finding Success', x: 3*spacing - boxW/2, y: baseY - 200, w: boxW, h: boxH }
  ];
}

function drawTimeline() {
  const y = headerImageY + headerImageHeight + 250;
  textFont(titleFont); textSize(60); fill(255); textAlign(CENTER, BOTTOM);
  text('Choose Your Era', width/2, y - 40);

  stroke(200); strokeWeight(4);
  line(50, y, width - 50, y);
  strokeWeight(3);
  line(50, y - 15, 50, y + 15);
  line(width - 50, y - 15, width - 50, y + 15);

  noStroke(); textFont(bodyFont); textSize(20);
  eraBoxes.forEach(b => {
    fill(80); rect(b.x, b.y, b.w, b.h, 20);
    fill(255); textAlign(CENTER, CENTER);
    text(b.label, b.x + b.w/2, b.y + b.h/2);
    stroke(200); strokeWeight(3);
    const cx = b.x + b.w/2;
    line(cx, y - 10, cx, y + 10);
    noStroke();
  });
}

// ——— Final + BTS Videos ———

function setupFinalAndBTSBoxes(startY) {
  const w = width * 0.6, h = 400;
  finalVideoBox = { x: width/2 - w/2, y: startY, w, h };
  finalVideoDiv = createDiv(
    `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/MuCa0GGzi6E?si=ccxK7_tLTemM3uVa" frameborder="0" allowfullscreen></iframe>`
  ).position(finalVideoBox.x, finalVideoBox.y).size(w, h).hide();

  btsVideoBoxes = [];
  btsVideoDivs  = [];
  const urls = [
    'https://www.youtube.com/embed/IYTAuXsHUBE?si=fUbJufiF78GXxtO6',
    'https://www.youtube.com/embed/ojjxHyxKeKo?si=A7rU2Foa5cv5J3Ec'
  ];
  const yStart = finalVideoBox.y + h + 250;

  urls.forEach((url, i) => {
    const y = yStart + i * (h + 50);
    const box = { x: width/2 - w/2, y, w, h };
    btsVideoBoxes.push(box);

    const iframe = createDiv(
      `<iframe width="100%" height="100%" src="${url}" frameborder="0" allowfullscreen></iframe>`
    ).position(box.x, box.y).size(w, h).hide();
    btsVideoDivs.push(iframe);
  });
}

function drawFinalVideoSection() {
  textFont(titleFont); textSize(48); fill(255); textAlign(CENTER, TOP);
  text('Final Video - Junior Bergen Draft', width/2, finalVideoBox.y - 80);

  fill(80); rect(finalVideoBox.x, finalVideoBox.y, finalVideoBox.w, finalVideoBox.h, 20);
  (isCharacterTouchingBox(finalVideoBox) ? finalVideoDiv.show : finalVideoDiv.hide).call(finalVideoDiv);

  textFont(bodyFont); textSize(24); fill(200); textAlign(LEFT, TOP);
  text(
    'This is the most important video… I found success.',
    finalVideoBox.x,
    finalVideoBox.y + finalVideoBox.h + 30,
    finalVideoBox.w
  );

  textFont(titleFont); textSize(40); fill(255); textAlign(CENTER, TOP);
  text('Behind The Scenes (Extra)', width/2, btsVideoBoxes[0].y - 80);

  btsVideoBoxes.forEach((b, i) => {
    fill(80); rect(b.x, b.y, b.w, b.h, 20);
    (isCharacterTouchingBox(b) ? btsVideoDivs[i].show : btsVideoDivs[i].hide).call(btsVideoDivs[i]);
  });
}

// ——— Era Scenes ———

function drawEraScene() {
  const config = {
    gettingStarted: {
      title: 'Getting Started Era',
      setup:  setupGettingStartedVideos,
      videos: gettingStartedVideos,
      boxes:  videoBoxes
    },
    turningPoint: {
      title: 'Turning Point Era',
      setup:  setupTurningPointVideos,
      videos: turningPointVideos,
      boxes:  turningPointVideoBoxes
    },
    findingSuccess: {
      title: 'Finding Success Era',
      setup:  setupFindingSuccessVideos,
      videos: findingSuccessVideos,
      boxes:  findingSuccessVideoBoxes
    }
  }[currentScene];

  if (!config.videos.length) config.setup();

  background(30);
  textFont(titleFont); textSize(48); fill(255); textAlign(CENTER, TOP);
  text(config.title, width/2, 50);

  config.boxes.forEach((b, i) => {
    fill(80); rect(b.x, b.y, b.w, b.h, 20);
    (isCharacterTouchingBox(b) ? config.videos[i].show : config.videos[i].hide).call(config.videos[i]);
  });

  // Back button
  fill(100,100,255); rect(backButton.x, backButton.y, backButton.w, backButton.h, 20);
  fill(255);
  textFont(bodyFont); textSize(24); textAlign(CENTER, CENTER);
  text('Back to Timeline', backButton.x + backButton.w/2, backButton.y + backButton.h/2);

  if (isCharacterTouchingBox(backButton)) {
    currentScene = 'timeline';
    window.scrollTo(0,0);
    character.x = width/2; character.y = 100;
  }
}

function setupGettingStartedVideos() {
  gettingStartedVideos = [];
  videoBoxes = [];
  const boxW = width*0.6, boxH = 400, spacing = 100, startY = 180;
  const urls = [
    'https://www.youtube.com/embed/BGGA9Xhh0Y0?...',
    'https://www.youtube.com/embed/gqSSpSoFZEw?...',
    'https://www.youtube.com/embed/IdrW8ivCqqE?...'
  ];

  urls.forEach((src, i) => {
    const y = startY + i*(boxH + spacing);
    const box = { x: width/2 - boxW/2, y, w: boxW, h: boxH };
    videoBoxes.push(box);

    const iframe = createDiv(
      `<iframe width="100%" height="100%" src="${src}" frameborder="0" allowfullscreen></iframe>`
    ).position(box.x, box.y).size(boxW, boxH).hide();
    gettingStartedVideos.push(iframe);
  });

  backButton.x = width/2 - 100;
  backButton.y = videoBoxes[2].y + 520;
}

function setupTurningPointVideos() {
  turningPointVideos     = [];
  turningPointVideoBoxes = [];
  const boxW = width*0.6, boxH = 400, spacing = 100, startY = 180;
  const urls = [
    'https://www.youtube.com/embed/duetIIW_y58?...',
    'https://www.youtube.com/embed/PwwJgoU5Doo?...',
    'https://www.youtube.com/embed/SOrAXuua7og?...'
  ];

  urls.forEach((src, i) => {
    const y = startY + i*(boxH + spacing);
    const box = { x: width/2 - boxW/2, y, w: boxW, h: boxH };
    turningPointVideoBoxes.push(box);

    const iframe = createDiv(
      `<iframe width="100%" height="100%" src="${src}" frameborder="0" allowfullscreen></iframe>`
    ).position(box.x, box.y).size(boxW, boxH).hide();
    turningPointVideos.push(iframe);
  });

  backButton.x = width/2 - 100;
  backButton.y = turningPointVideoBoxes[2].y + 520;
}

function setupFindingSuccessVideos() {
  findingSuccessVideos     = [];
  findingSuccessVideoBoxes = [];
  const boxW = width*0.6, boxH = 400, spacing = 100, startY = 180;
  const urls = [
    'https://www.youtube.com/embed/SA1mRbkFJto?...',
    'https://www.youtube.com/embed/ozpeuy6oxAo?...',
    'https://www.youtube.com/embed/wfLTGntqxFc?...'
  ];

  urls.forEach((src, i) => {
    const y = startY + i*(boxH + spacing);
    const box = { x: width/2 - boxW/2, y, w: boxW, h: boxH };
    findingSuccessVideoBoxes.push(box);

    const iframe = createDiv(
      `<iframe width="100%" height="100%" src="${src}" frameborder="0" allowfullscreen></iframe>`
    ).position(box.x, box.y).size(boxW, boxH).hide();
    findingSuccessVideos.push(iframe);
  });

  backButton.x = width/2 - 100;
  backButton.y = findingSuccessVideoBoxes[2].y + 520;
}

// ——— Movement & Collision ———

function handleCharacterMovement() {
  if (keyIsDown(65) || keyIsDown(LEFT_ARROW))  character.x -= characterSpeed;
  if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) character.x += characterSpeed;
  if (keyIsDown(87) || keyIsDown(UP_ARROW))    character.y -= characterSpeed;
  if (keyIsDown(83) || keyIsDown(DOWN_ARROW))  character.y += characterSpeed;

  character.x = constrain(character.x, 0, width - character.w);
  character.y = constrain(character.y, 0, height - character.h);
}

function checkCollision() {
  for (let b of eraBoxes) {
    if (isCharacterTouchingBox(b)) {
      setupEraScene(b.label);
      break;
    }
  }
}

function setupEraScene(label) {
  const map = {
    'Getting Started': 'gettingStarted',
    'Turning Point':   'turningPoint',
    'Finding Success': 'findingSuccess'
  };
  currentScene = map[label];
  window.scrollTo(0,0);
  character.x = width/2;
  character.y = 100;
}

function isCharacterTouchingBox(box) {
  return character.x < box.x + box.w &&
         character.x + character.w > box.x &&
         character.y < box.y + box.h &&
         character.y + character.h > box.y;
}

function drawCharacter() {
  fill(255,100,100);
  noStroke();
  rect(character.x, character.y, character.w, character.h);
}
