// turningPoint.js
function setupTurningPointVideos() {
  turningPointVideos    = [];
  turningPointVideoBoxes= [];

  let boxWidth = width*0.6;
  let boxHeight= 400;
  let spacing  = 100;
  let startY   = 180;

  const urls = [
    "https://www.youtube.com/embed/duetIIW_y58?...",
    "https://www.youtube.com/embed/PwwJgoU5Doo?...",
    "https://www.youtube.com/embed/SOrAXuua7og?..."
  ];

  for (let i=0; i<urls.length; i++) {
    let x = width/2 - boxWidth/2;
    let y = startY + i*(boxHeight+spacing);
    turningPointVideoBoxes.push({ x, y, w:boxWidth, h:boxHeight });

    let iframe = createDiv(
      `<iframe width="100%" height="100%" src="${urls[i]}" frameborder="0" allowfullscreen></iframe>`
    );
    iframe.position(x, y);
    iframe.size(boxWidth, boxHeight);
    iframe.hide();
    turningPointVideos.push(iframe);
  }

  backButton.x = width/2 - 100;
  backButton.y = turningPointVideoBoxes[2].y + 520;
  backButton.w = 200;
  backButton.h = 100;
}

function drawTurningPointScene() {
  background(30);
  textFont(titleFont); textSize(48); fill(255);
  textAlign(CENTER, TOP);
  text("Turning Point Era", width/2, 50);

  for (let i=0; i<turningPointVideoBoxes.length; i++) {
    let b = turningPointVideoBoxes[i];
    fill(80); rect(b.x,b.y,b.w,b.h,20);

    if (isCharacterTouchingBox(b)) turningPointVideos[i].show();
    else                           turningPointVideos[i].hide();
  }

  // back button exactly as above…
  fill(100,100,255);
  rect(backButton.x, backButton.y, backButton.w, backButton.h,20);
  fill(255);
  textFont(bodyFont); textSize(24);
  textAlign(CENTER,CENTER);
  text("Back to Timeline", backButton.x+backButton.w/2, backButton.y+backButton.h/2);

  if (isCharacterTouchingBox(backButton)) {
    currentScene="timeline";
    window.scrollTo(0,0);
    character.x=width/2; character.y=100;
  }
}