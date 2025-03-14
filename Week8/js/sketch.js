let character;
let foods = [];
let badFoods = [];
let score = 0;
let timer = 60;
let bgMusic, goodFoodSound, badFoodSound;

function preload() {
    bgMusic = loadSound('sounds/background.mp3.mp3', 
        () => console.log('Background music loaded!'), 
        () => console.error('Failed to load background music.')
    );
    goodFoodSound = loadSound('sounds/goodFood.wav', 
        () => console.log('Good food sound loaded!'), 
        () => console.error('Failed to load good food sound.')
    );
    badFoodSound = loadSound('sounds/badFood.wav', 
        () => console.log('Bad food sound loaded!'), 
        () => console.error('Failed to load bad food sound.')
    );
}

function setup() {
    createCanvas(800, 600);
    character = new Character();
    for (let i = 0; i < 10; i++) {
        foods.push(new Food(random(width), random(height)));
        badFoods.push(new BadFood(random(width), random(height)));
    }
    bgMusic.loop();
    
}

function draw() {
    background(220);
    character.display();
    character.move();
    
    for (let food of foods) {
        food.display();
        if (collideRectCircle(character.x, character.y, character.w, character.h, food.x, food.y, food.d)) {
            score++;
            goodFoodSound.play();
            foods.splice(foods.indexOf(food), 1);
        }
    }
    
    for (let badFood of badFoods) {
        badFood.display();
        if (collideRectCircle(character.x, character.y, character.w, character.h, badFood.x, badFood.y, badFood.d)) {
            score--;
            badFoodSound.play();
            badFoods.splice(badFoods.indexOf(badFood), 1);
        }
    }
    
    fill(0);
    textSize(20);
    text(`Score: ${score}`, 10, 20);
    text(`Time: ${timer}`, 10, 40);
    
    if (frameCount % 60 === 0 && timer > 0) {
        timer--;
    }
}

class Character {
    constructor() {
        this.x = width / 2;
        this.y = height - 50;
        this.w = 40;
        this.h = 40;
    }
    move() {
        if (keyIsDown(LEFT_ARROW)) this.x -= 5;
        if (keyIsDown(RIGHT_ARROW)) this.x += 5;
        if (keyIsDown(UP_ARROW)) this.y -= 5;
        if (keyIsDown(DOWN_ARROW)) this.y += 5;
    }
    display() {
        fill(0, 0, 255);
        rect(this.x, this.y, this.w, this.h);
    }
}

class Food {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.d = 20;
    }
    display() {
        fill(0, 255, 0);
        ellipse(this.x, this.y, this.d);
    }
}

class BadFood {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.d = 20;
    }
    display() {
        fill(255, 0, 0);
        ellipse(this.x, this.y, this.d);
    }
}
