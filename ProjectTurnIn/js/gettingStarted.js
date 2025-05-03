// gettingStarted.js
function setupGettingStartedVideos() {
  gettingStartedVideos = [];    // REASSIGN the global array
  videoBoxes           = [];

  let boxWidth = width * 0.6;
  let boxHeight= 400;
  let spacing  = 100;
  let startY   = 180;

  // create your three iframes just as before…
  for (let i = 0; i < 3; i++) {
    let x = width / 2 - boxWidth/2;
    let y = startY + i*(boxHeight+spacing);
    let box = { x, y, w: boxWidth, h: boxHeight };
    videoBoxes.push(box);

    let src = [
      "https://www.youtube.com/embed/BGGA9Xhh0Y0?...",
      "https://www.youtube.com/embed/gqSSpSoFZEw?...",
      "https://www.youtube.com/embed/IdrW8ivCqqE?..."
    ][i];

    let iframe = createDiv(
      `<iframe width="100%" height="100%" src="${src}" frameborder="0" allowfullscreen></iframe>`
    );
    iframe.position(x, y);
    iframe.size(boxWidth, boxHeight);
    iframe.hide();
    gettingStartedVideos.push(iframe);
  }

  backButton.x = width/2 - 100;
  backButton.y = videoBoxes[2].y + 520;
  backButton.w = 200;
  backButton.h = 100;
}

function drawGettingStartedScene() {
  background(30);
  textFont(titleFont); textSize(48); fill(255);
  textAlign(CENTER, TOP);
  text("Getting Started Era", width/2, 50);

  for (let i = 0; i < videoBoxes.length; i++) {
    let b = videoBoxes[i];
    fill(80); rect(b.x, b.y, b.w, b.h, 20);

    if (isCharacterTouchingBox(b))  gettingStartedVideos[i].show();
    else                             gettingStartedVideos[i].hide();
  }

  // back button…
  fill(100,100,255);
  rect(backButton.x, backButton.y, backButton.w, backButton.h, 20);
  fill(255); textFont(bodyFont); textSize(24);
  textAlign(CENTER, CENTER);
  text("Back to Timeline", backButton.x+backButton.w/2, backButton.y+backButton.h/2);

  if (isCharacterTouchingBox(backButton)) {
    currentScene = "timeline";
    window.scrollTo(0,0);
    character.x = width/2; character.y = 100;
  }
}