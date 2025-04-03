var foods = [];
var myImage;
var myAnimation;
var animations = [];
var i = 0;

// Position of the animated character
var characterX = 100;
var characterY = 250;

function preload() {
    // If you decide to use loadImage later, this is where it goes
}

function setup() {
    createCanvas(800, 500);

    // Set up your animation frames manually (preserving your structure)
    myAnimation = new animationImages("./images/png/Idle__001.png", characterX, characterY, 100, 150);
    animations[0] = myAnimation;
    myAnimation = new animationImages("./images/png/Idle__002.png", characterX, characterY, 100, 150);
    animations[1] = myAnimation;
    myAnimation = new animationImages("./images/png/Idle__003.png", characterX, characterY, 100, 150);
    animations[2] = myAnimation;
    myAnimation = new animationImages("./images/png/Idle__004.png", characterX, characterY, 100, 150);
    animations[3] = myAnimation;
    myAnimation = new animationImages("./images/png/Idle__005.png", characterX, characterY, 100, 150);
    animations[4] = myAnimation;
    myAnimation = new animationImages("./images/png/Idle__006.png", characterX, characterY, 100, 150);
    animations[5] = myAnimation;
    myAnimation = new animationImages("./images/png/Idle__007.png", characterX, characterY, 100, 150);
    animations[6] = myAnimation;
    myAnimation = new animationImages("./images/png/Idle__008.png", characterX, characterY, 100, 150);
    animations[7] = myAnimation;
    myAnimation = new animationImages("./images/png/Idle__009.png", characterX, characterY, 100, 150);
    animations[8] = myAnimation;

    // Create 5 food items with random positions and sizes
    for (let j = 0; j < 5; j++) {
        let x = random(50, 750);
        let y = random(50, 450);
        let d = random(20, 50);
        foods.push(new food(x, y, d));
    }

    // Advance animation frame every 150ms
    setInterval(incrementIdleIndex, 150);
}

function draw() {
    background(120);

    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) { // A
        characterX -= 2;
    }
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) { // D
        characterX += 2;
    }
    if (keyIsDown(UP_ARROW) || keyIsDown(87)) { // W
        characterY -= 2;
    }
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) { // S
        characterY += 2;
    }


    // Update current animation frame's position
    animations[i].x = characterX;
    animations[i].y = characterY;
    animations[i].drawAnimation();

    // Draw all food objects
    for (let k = 0; k < foods.length; k++) {
        foods[k].drawCircle();
    }
}

function incrementIdleIndex() {
    i++;
    if (i >= animations.length) {
        i = 0;
    }
}
