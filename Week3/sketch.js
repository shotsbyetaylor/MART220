//My Version

let shapes = []; 

function setup() {
  createCanvas(600, 400); 
  for (let i = 0; i < 5; i++) { // Make 5 shapes
    let shape = new MovingShape(); 
    shapes.push(shape); // Add it to the shapes array
  }
}

function draw() { //Title
  background(30, 144, 255); 
  fill(255); 
  textSize(16); 
  text("Interactive Art", 10, 20); 
  text("Taylor Denton", width - textWidth("Taylor Denton") - 10, height - 10); 

  for (let i = 0; i < shapes.length; i++) { // Loop through all shapes
    shapes[i].move(); // Update the shape's position
    shapes[i].display(); 
  }
}

function mousePressed() {
  let newShape = new MovingShape(mouseX, mouseY); // Create a new shape at the mouse
  shapes.push(newShape); 
}

class MovingShape {
  constructor(x, y) {
    if (x === undefined) {
      this.x = random(width); // Random x position
    } else {
      this.x = x;
    }
    
    if (y === undefined) {
      this.y = random(height); // Random y position
    } else {
      this.y = y;
    }
    
    this.size = random(20, 50); 
    this.speedX = random(-2, 2); 
    this.speedY = random(-2, 2); 
    this.color = color(random(255), random(255), random(255));
  }

  move() {
    this.x = this.x + this.speedX; 
    this.y = this.y + this.speedY; 
    
    if (this.x < 0 || this.x > width) { 
      this.speedX = this.speedX * -1; 
    }
    if (this.y < 0 || this.y > height) { 
      this.speedY = this.speedY * -1; 
    }
  }

  display() {
    fill(this.color); 
    ellipse(this.x, this.y, this.size, this.size); 
  }
}

