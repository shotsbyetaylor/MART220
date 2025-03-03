var myCircles = [];
var character;
var animationFrames = [];
var frameIndex = 0;
var lastFrameTime = 0;
var frameDelay = 150;
var score = 0;
var timer = 60; // 1 minute countdown
var lastTimerUpdate = 0;

// moving food
class MyCircle {
    constructor(x, y, diameter, redColor, greenColor, blueColor) {
        this.x = x;
        this.y = y;
        this.diameter = diameter;
        this.redColor = redColor;
        this.greenColor = greenColor;
        this.blueColor = blueColor;
        this.speedX = random(-2, 2);
        this.speedY = random(-2, 2);
    }

    move() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // bounce
        if (this.x < 0 || this.x > width) this.speedX *= -1;
        if (this.y < 0 || this.y > height) this.speedY *= -1;
    }

    draw() {
        fill(this.redColor, this.greenColor, this.blueColor);
        circle(this.x, this.y, this.diameter);
    }
}

// character class
class Character {
    constructor(x, y, animationFrames) {
        this.x = x;
        this.y = y;
        this.speed = 4;
        this.animationFrames = animationFrames;
    }

    move() {
        if (keyIsDown(LEFT_ARROW)) this.x -= this.speed;
        if (keyIsDown(RIGHT_ARROW)) this.x += this.speed;
        if (keyIsDown(UP_ARROW)) this.y -= this.speed;
        if (keyIsDown(DOWN_ARROW)) this.y += this.speed;
    }

    animate() {
        if (millis() - lastFrameTime > frameDelay) {
            frameIndex = (frameIndex + 1) % this.animationFrames.length;
            lastFrameTime = millis();
        }
        image(this.animationFrames[frameIndex], this.x, this.y, 50, 50);
    }
}

function preload() {
    for (var i = 0; i < 9; i++) {
        animationFrames[i] = loadImage(`./assets/png/idle__00${i}.png`);
    }
}

function setup() {
    createCanvas(800, 600);
    for (var i = 0; i < 5; i++) {
        myCircles[i] = new MyCircle(random(50, 750), random(50, 550), random(20, 40), random(255), random(255), random(255));
    }
    character = new Character(400, 300, animationFrames);
    setInterval(updateTimer, 1000); // timer countdown
}

function draw() {
    background(0);
    
    // food
    for (var i = 0; i < myCircles.length; i++) {
        myCircles[i].move();
        myCircles[i].draw();
        
        // check collision 
        if (dist(character.x, character.y, myCircles[i].x, myCircles[i].y) < 35) { // Increased from 25 to 35
            score++;
            myCircles[i].x = random(50, 750);
            myCircles[i].y = random(50, 550);
        }
    }

    character.move();
    character.animate();
    
    // score + timer
    fill(255);
    textSize(20);
    text(`Score: ${score}`, 20, 30);
    text(`Time: ${timer}`, 700, 30);
    
    // eng game
    if (timer <= 0) {
        noLoop();
        textSize(40);
        textAlign(CENTER, CENTER);
        text("Game Over!", width / 2, height / 2);
    }
}

function updateTimer() {
    if (timer > 0) {
        timer--;
    }
}