var myCircles = []; // declare a circle array
var character;
var animationFrames = [];
var frameIndex = 0;
var lastFrameTime = 0;
var frameDelay = 150; // Milliseconds per frame

// Class for food (unchanged)
class myCircle {
    constructor(x, y, diameter, redColor, greenColor, blueColor) {
        this.x = x;
        this.y = y;
        this.diameter = diameter;
        this.redColor = redColor;
        this.greenColor = greenColor;
        this.blueColor = blueColor;
    }

    draw() {
        fill(this.redColor, this.greenColor, this.blueColor);
        circle(this.x, this.y, this.diameter);
    }
}

// Character class with animation
class Character {
    constructor(x, y, animationFrames) {
        this.x = x;
        this.y = y;
        this.animationFrames = animationFrames;
    }

    animate() {
        // Control animation speed with a timer
        if (millis() - lastFrameTime > frameDelay) {
            frameIndex = (frameIndex + 1) % this.animationFrames.length;
            lastFrameTime = millis();
        }

        // Draw the current animation frame
        image(this.animationFrames[frameIndex], this.x, this.y, 50, 50);
    }
}

function preload() {
    // Load animation frames (replace with actual file names)
    for (var i = 0; i < 9; i++) {
        animationFrames[i] = loadImage(`./assets/png/idle__00${i}.png`); // Example frame names
    }
}

function setup() {
    createCanvas(800, 600);

    // Create food objects
    for (var i = 0; i < 5; i++) {
        myCircles[i] = new myCircle(random(10, 100), random(10, 200), random(5, 25), random(255), random(255), random(255));
    }

    // Create character object
    character = new Character(400, 300, animationFrames);
}

function draw() {
    background(0);

    // Draw food items
    for (var i = 0; i < myCircles.length; i++) {
        myCircles[i].draw();
    }

    // Animate character
    character.animate();
}
