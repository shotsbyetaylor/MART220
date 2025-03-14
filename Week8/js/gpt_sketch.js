
//Chat GPT Version

let shapes = []; // Array to store all moving shapes

function setup() {
    createCanvas(600, 400);
    for (let i = 0; i < 5; i++) {
      shapes.push(new MovingShape());
    }
  }
  
  function draw() {
    background(30, 144, 255);
    fill(255);
    textSize(16);
    text("Interactive Art", 10, 20);
    text("Taylor Denton", width - textWidth("Taylor Denton") - 10, height - 10);
  
    for (let shape of shapes) {
      shape.move();
      shape.display();
    }
  }
  
  function mousePressed() {
    shapes.push(new MovingShape(mouseX, mouseY));
  }
  
  function keyPressed() {
    if (key === ' ') {
      shapes = [];
    }
  }
  
  class MovingShape {
    constructor(x, y) {
      this.x = x || random(width);
      this.y = y || random(height);
      this.size = random(20, 50);
      this.speedX = random(-2, 2);
      this.speedY = random(-2, 2);
      this.color = color(random(255), random(255), random(255));
    }
  
    move() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > width) this.speedX *= -1;
      if (this.y < 0 || this.y > height) this.speedY *= -1;
    }
  
    display() {
      fill(this.color);
      ellipse(this.x, this.y, this.size);
    }
  }
  
  var img;
function preload() {
  img = loadImage('images/pic1.JPEG');
}

    // Display images
    if (img1) image(img1, 100, 200, 150, 150);
    if (img2) image(img2, 300, 200, 150, 150);
    if (img3) image(img3, x, 300, 100, 100); // Moving image
    else {
        fill(100);
        rect(x, 300, 100, 100); // Placeholder box
    }
