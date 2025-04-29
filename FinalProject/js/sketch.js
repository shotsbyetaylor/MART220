// sketch.js

let canvasHeight = 3600;
let titleFont, bodyFont, bgImage;
let eraBoxes = [];               // ← DECLARED ONCE HERE
let character, characterSpeed = 5;
let currentScene = "timeline";

let backButton = { x: 0, y: 0, w: 200, h: 100 };
let headerImageHeight = 0, headerImageY = 220;

let finalVideoBox = {}, finalVideoDiv;
let btsVideoBoxes = [], btsVideoDivs = [];  // ← DECLARED ONCE HERE

let introAudio, playAudioButton, audioPlayed = false;

function preload() {
  titleFont   = loadFont('assets/MangoGrotesque-BlackItalic.ttf');
  bodyFont    = loadFont('assets/MangoGrotesque-VF.ttf');
  bgImage     = loadImage('assets/taypic1.jpg');
  introAudio  = loadSound('assets/intro.m4a');
}

function setup() {
  createCanvas(windowWidth, canvasHeight);
  frameRate(60);
  removeMargins();

  character = { x: width/2, y: headerImageY + 600, w: 50, h: 50 };

  drawStaticUI();
  setupTimeline();                            // assigns eraBoxes
  setupFinalAndBTSBoxes(headerImageY + headerImageHeight + 800);

  playAudioButton = createButton("▶️ Play Intro Audio");
  playAudioButton.position(width/2 - 100, headerImageY + headerImageHeight + 20);
  styleButton(playAudioButton);
  playAudioButton.mousePressed(() => {
    if (!audioPlayed) {
      introAudio.setVolume(0.3);
      introAudio.play();
      audioPlayed = true;
      playAudioButton.html("🔊 Playing Intro...");
      playAudioButton.attribute("disabled", "true");
    }
  });
}

function draw() {
  background('#2b2b2b');
  playAudioButton?.[currentScene==='timeline'?'show':'hide']();

  if (currentScene === "timeline") {
    drawStaticUI();
    drawTimeline();
    drawFinalVideoSection();
  } else if (currentScene === "gettingStarted") {
    drawGettingStartedScene();
  } else if (currentScene === "turningPoint") {
    drawTurningPointScene();
  } else if (currentScene === "findingSuccess") {
    drawFindingSuccessScene();
  }

  handleCharacterMovement();
  if (currentScene === "timeline") checkCollision();
  drawCharacter();
}

function windowResized() {
  resizeCanvas(windowWidth, canvasHeight);
  drawStaticUI();
  setupTimeline();
  setupFinalAndBTSBoxes(headerImageY + headerImageHeight + 800);
  playAudioButton.position(width/2 - 100, headerImageY + headerImageHeight + 20);
}

function removeMargins() {
  document.body.style.margin = "0";
  document.body.style.padding = "0";
}

function styleButton(btn) {
  btn.size(200,40);
  btn.style("font-size","16px");
  btn.style("background-color","#333");
  btn.style("color","#fff");
  btn.style("border","none");
  btn.style("border-radius","8px");
  btn.style("cursor","pointer");
}

function drawStaticUI() {
  textFont(titleFont);
  textAlign(CENTER,TOP);
  textSize(90);
  fill(255); noStroke();
  text("Taylor Denton: Videography Journey", width/2, 50);

  textFont(bodyFont);
  textSize(24);
  fill(200);
  text("Scroll down to explore the exhibition", width/2, 170);

  let imgW = width * 0.6;
  headerImageHeight = (bgImage.height/bgImage.width)*imgW;
  image(bgImage, width/2 - imgW/2, headerImageY, imgW, headerImageHeight);
}

function setupTimeline() {
  let baseY = headerImageY + headerImageHeight + 200;
  let boxW = 300, boxH = 150, spacing = width/4;

  eraBoxes = [ // ← REASSIGN only (no `let` here)
    { label:"Getting Started", x: spacing - boxW/2,   y: baseY - 200, w: boxW, h: boxH },
    { label:"Turning Point",   x: 2*spacing - boxW/2, y: baseY + 50,  w: boxW, h: boxH },
    { label:"Finding Success", x: 3*spacing - boxW/2, y: baseY - 200, w: boxW, h: boxH }
  ];
}

function setupFinalAndBTSBoxes(startY) {
  let w = width*0.6, h = 400;

  finalVideoBox = { x:width/2 - w/2, y:startY, w, h };
  finalVideoDiv = createDiv(
    `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/MuCa0GGzi6E?si=ccxK7_tLTemM3uVa" frameborder="0" allowfullscreen></iframe>`
  );
  finalVideoDiv.position(finalVideoBox.x, finalVideoBox.y);
  finalVideoDiv.size(w,h);
  finalVideoDiv.hide();

  btsVideoBoxes = [];
  btsVideoDivs = [];
  let btsY = finalVideoBox.y + h + 250;
  const urls = [
    "https://www.youtube.com/embed/IYTAuXsHUBE?si=fUbJufiF78GXxtO6",
    "https://www.youtube.com/embed/ojjxHyxKeKo?si=A7rU2Foa5cv5J3Ec"
  ];

  for (let i=0; i<urls.length; i++) {
    let y = btsY + i*(h+50);
    let box = { x:width/2 - w/2, y, w, h };
    btsVideoBoxes.push(box);

    let iframe = createDiv(`<iframe width="100%" height="100%" src="${urls[i]}" frameborder="0" allowfullscreen></iframe>`);
    iframe.position(box.x, box.y);
    iframe.size(w,h);
    iframe.hide();
    btsVideoDivs.push(iframe);
  }
}

function drawTimeline() {
  let y = headerImageY + headerImageHeight + 250;
  textFont(titleFont); textSize(60); fill(255); textAlign(CENTER,BOTTOM);
  text("Choose Your Era", width/2, y-40);

  stroke(200); strokeWeight(4); line(50,y,width-50,y);
  strokeWeight(3); line(50,y-15,50,y+15); line(width-50,y-15,width-50,y+15);

  noStroke(); textFont(bodyFont); textSize(20);
  for (let b of eraBoxes) {
    fill(80); rect(b.x,b.y,b.w,b.h,20);
    fill(255); textAlign(CENTER,CENTER);
    text(b.label, b.x+b.w/2, b.y+b.h/2);
    stroke(200); strokeWeight(3);
    let cx = b.x + b.w/2;
    line(cx,y-10,cx,y+10);
    noStroke();
  }
}

function drawFinalVideoSection() {
  textFont(titleFont); textSize(48); fill(255); textAlign(CENTER,TOP);
  text("Final Video - Junior Bergen Draft", width/2, finalVideoBox.y-80);

  fill(80); rect(finalVideoBox.x, finalVideoBox.y, finalVideoBox.w, finalVideoBox.h, 20);

  if (isCharacterTouchingBox(finalVideoBox)) finalVideoDiv.show();
  else                                    finalVideoDiv.hide();

  textFont(bodyFont); textSize(24); fill(200);
  textAlign(LEFT,TOP);
  text("This is the most important video… I found success.",
       finalVideoBox.x,
       finalVideoBox.y + finalVideoBox.h + 30,
       finalVideoBox.w);

  textFont(titleFont); textSize(40); fill(255);
  textAlign(CENTER,TOP);
  text("Behind The Scenes (Extra)", width/2, btsVideoBoxes[0].y - 80);

  for (let i=0; i<btsVideoBoxes.length; i++) {
    let b = btsVideoBoxes[i];
    fill(80); rect(b.x,b.y,b.w,b.h,20);
    if (isCharacterTouchingBox(b)) btsVideoDivs[i].show();
    else                           btsVideoDivs[i].hide();
  }
}

function handleCharacterMovement() {
  if (keyIsDown(65)||keyIsDown(LEFT_ARROW))  character.x -= characterSpeed;
  if (keyIsDown(68)||keyIsDown(RIGHT_ARROW)) character.x += characterSpeed;
  if (keyIsDown(87)||keyIsDown(UP_ARROW))    character.y -= characterSpeed;
  if (keyIsDown(83)||keyIsDown(DOWN_ARROW))  character.y += characterSpeed;

  character.x = constrain(character.x, 0, width-character.w);
  character.y = constrain(character.y, 0, height-character.h);
}

function checkCollision() {
  for (let b of eraBoxes) {
    if (isCharacterTouchingBox(b)) {
      if (b.label==="Getting Started")  setupGettingStartedVideos(),   currentScene="gettingStarted";
      if (b.label==="Turning Point")    setupTurningPointVideos(),    currentScene="turningPoint";
      if (b.label==="Finding Success")  setupFindingSuccessVideos(),  currentScene="findingSuccess";
      window.scrollTo(0,0);
      character.x=width/2; character.y=100;
      break;
    }
  }
}

function isCharacterTouchingBox(box) {
  return character.x < box.x+box.w &&
         character.x+character.w > box.x &&
         character.y < box.y+box.h &&
         character.y+character.h > box.y;
}

function drawCharacter() {
  fill(255,100,100); noStroke();
  rect(character.x,character.y,character.w,character.h);
}
