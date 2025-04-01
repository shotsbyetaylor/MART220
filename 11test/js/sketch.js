
var idlePaths = [];
var myAnimation;
var myWalkAnimation;
var walkPaths = [];
var attackPaths = [];
var catImage;
const particles = [];
var health = 100;

function preload() {
    idlePaths = loadStrings("./images/idle/idle.txt");
    walkPaths = loadStrings("./images/walk/walk.txt");
    attackPaths = loadStrings("./images/attack/attack.txt");
}

function setup() {
    createCanvas(800, 600);
    myAnimation = new animationImage(200, 200, 150, 150);
    myAnimation.loadAnimation('idle', idlePaths);
    myAnimation.loadAnimation('walk', walkPaths);
    myAnimation.loadAnimation('attack', attackPaths);

    //compact way to add an image
    catImage = createSprite(450, 200, 100, 100, 'static');
    catImage.img = "./images/cat.jpg";
    catImage.scale = 0.05;
    catImage.diameter = 150;

}

// display all the frames using the draw function as a loop
function draw() {

    background(120);

    if (kb.pressing('d')) {
        myAnimation.updatePosition('forward');
        myAnimation.drawAnimation('walk');
        if (catImage != null) {
            if (myAnimation.isColliding(catImage)) {
                myAnimation.drawAnimation('idle');
                myAnimation.updatePosition('idle');
            }

        }
    }
    else if (kb.pressing('a')) {
        myAnimation.updatePosition('reverse');
        myAnimation.drawAnimation('walk');
    }
    else if (kb.pressing('x')) {
        myAnimation.drawAnimation('attack');
        if (catImage != null) {
            if (dist(myAnimation.getCurrentAnimation().position.x, myAnimation.getCurrentAnimation().position.y, catImage.position.x, catImage.position.y) < 200) {
                createParticles(catImage.position.x, catImage.positon.y);
                health -= 1;
                if(health <= 0)
                {
                catImage.remove();
                catImage = null;
                }
            }
        }

    }
    else {
        myAnimation.drawAnimation('idle');
    }

    catImage.debug = mouseIsPressed;

}