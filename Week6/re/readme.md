// Chat GPT Version + Food Project

let shapes = []; // Array to store moving shapes
let img1, img2, img3, customFont;
let x = 50;
let speed = 3;

function preload() {
    console.log("Preloading assets...");

    // Load images
    img1 = loadImage('images/pic1.JPEG', imgSuccess, imgError);
    img2 = loadImage('images/Pic2.JPEG', imgSuccess, imgError);
    img3 = loadImage('images/Pic3.jpeg', imgSuccess, imgError);

    // Load custom font (Ensure the file exists in the 'fonts' folder)
    customFont = loadFont('fonts/custom-font.ttf', fontSuccess, fontError);
}

// Success/Error handlers for debugging
function imgSuccess() { console.log("Image loaded successfully"); }
function imgError() { console.log("Error loading image"); }
function fontSuccess() { console.log("Font loaded successfully"); }
function fontError() { console.log("Error loading font"); }

function setup() {
    createCanvas(800, 600);
    console.log("Canvas created successfully!");

    // Apply font if loaded
    if (customFont) {
        textFont(customFont);
    } else {
        console.log("Font not loaded, using default");
    }

    moveImage(); // Start the timer function

    // Initialize interactive art
    for (let i = 0; i < 5; i++) {
        shapes.push(new MovingShape());
    }
}

function draw() {
    background(30, 144, 255); // Blue background

    // Title & Name
    textSize(32);
    fill(255);
    text("My Favorite Food Project", 50, 50);
    textSize(24);
    text("By Taylor Denton", width - textWidth("By Taylor Denton") - 20, height - 40);

    // Display images
    if (img1) image(img1, 100, 200, 150, 150);
    if (img2) image(img2, 300, 200, 150, 150);
    if (img3) image(img3, x, 300, 100, 100); // Moving image
    else {
        fill(100);
        rect(x, 300, 100, 100); // Placeholder box
    }

    // Move image back and forth
    x += speed;
    if (x > width - 100 || x < 0) {
        speed *= -1;
    }

    // Interactive Art - Moving Shapes
    for (let shape of shapes) {
        shape.move();
        shape.display();
    }
}

// Timer function to move image every second
function moveImage() {
    x += 10;
    setTimeout(moveImage, 1000);
}

// Handle mouse clicks to add new shapes
function mousePressed() {
    shapes.push(new MovingShape(mouseX, mouseY));
}

// Handle spacebar press to clear all shapes
function keyPressed() {
    if (key === ' ') {
        shapes = [];
    }
}

// Moving Shape Class
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
