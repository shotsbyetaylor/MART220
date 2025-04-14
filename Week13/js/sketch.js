let myModel;
let myTexture;
var rotateSpeed = .01;
var spiderX = 10;
var spiderY = 10;

var spiderX2 = 200;
var spiderY2 = 200;
var modelSpider;
let grass;
let tree;
let donut;
let corn;
let block;

let treeArray = [];
let grassArray = [];
let torusArray = [];
let coneArray = [];
let boxArray = [];

let myFont;





function preload()
{
    myModel = loadModel("./assets/SimpleSurvivalist.obj");
    myTexture = loadImage("./assets/grass.jpg");
    grass = loadImage("assets/grass.jpg");
    tree = loadImage("assets/tree.jpg");
    donut = loadImage('assets/donut.jpg');
    corn = loadImage('assets/cone.jpg');
    grass = loadImage('assets/block.jpeg');
    
    myFont = loadFont("assets/MangoGrotesque.ttf");

}

function setup()
{
    createCanvas(1080,768, WEBGL);
    modelSpider = new modelClass(spiderX, spiderY, rotateSpeed, myModel, myTexture);
  
    treeArray.push({ x: -100, y: 0, z: 0, r: 20, h: 50 });
    treeArray.push({ x: 0, y: 0, z: 0, r: 20, h: 60 });
    treeArray.push({ x: 100, y: 0, z: 0, r: 15, h: 40 });

    grassArray.push({ x: 0, y: 200, z: 0, w: 100, d: 100 });
    grassArray.push({ x: 200, y: 200, z: 0, w: 100, d: 100 });

    torusArray.push({ r1: 30, r2: 10, y: 0 });
    torusArray.push({ r1: 40, r2: 15, y: 20 });
  
    coneArray.push({ r: 20, h: 60, y: 0 });
    coneArray.push({ r: 30, h: 50, y: -20 });
  
    boxArray.push({ w: 40, h: 40, d: 40, y: 0 });
    boxArray.push({ w: 60, h: 20, d: 60, y: 30 });
}

function draw() {
    background(20);
    normalMaterial();
    ambientLight(250,200,150);

    modelSpider.render();
  
    //Trees
    texture(tree);
    for (let i = 0; i < treeArray.length; i++) {
      let t = treeArray[i];
      let angle = frameCount * 0.01 + i;
      let radius = 200;
  
      let x = cos(angle) * radius + modelSpider.x;
      let z = sin(angle) * radius;
  
      push();
      translate(x, modelSpider.y, z);
      cylinder(t.r, t.h);
      pop();
    }
  
    //Grass
    texture(grass);
    for (let i = 0; i < grassArray.length; i++) {
      let g = grassArray[i];
      let angle = frameCount * 0.01 + i;
      let radius = 250;
  
      let gx = cos(angle) * radius + modelSpider.x;
      let gz = sin(angle) * radius;
  
      push();
      translate(gx, modelSpider.y, gz);
      beginShape();
      vertex(0, 0, 0);
      vertex(g.w, 0, 0);
      vertex(g.w, 0, g.d);
      vertex(0, 0, g.d);
      endShape(CLOSE);
      pop();
    }
      //Torus
    texture(donut);
  for (let i = 0; i < torusArray.length; i++) {
    let t = torusArray[i];
    let angle = -frameCount * 0.01 + i;
    let radius = 300;
    let x = cos(angle) * radius + modelSpider.x;
    let z = sin(angle) * radius;

    push();
    translate(x, t.y, z);
    torus(t.r1, t.r2);
    pop();
  }

      //Cone
    texture(corn);
  for (let i = 0; i < coneArray.length; i++) {
    let c = coneArray[i];
    let angle = -frameCount * 0.01 + i;
    let radius = 330;
    let x = cos(angle) * radius + modelSpider.x;
    let z = sin(angle) * radius;

    push();
    translate(x, c.y, z);
    cone(c.r, c.h);
    pop();
  }

      //Box
    texture(grass);
  for (let i = 0; i < boxArray.length; i++) {
    let b = boxArray[i];
    let angle = frameCount * 0.01 + i;
    let radius = 360;
    let x = cos(angle) * radius + modelSpider.x;
    let z = sin(angle) * radius;

    push();
    translate(x, b.y, z);
    box(b.w, b.h, b.d);
    pop();
  }

    resetMatrix();
    camera();

    textFont(myFont);
    textAlign(CENTER, TOP);
    textSize(36);
    fill(255);
    text("Taylor Denton – 3D Spider Forest", -height / 2, 20);
    
  }
  
  

  function mousePressed()
  {
      rotateSpeed += .2;
      modelSpider.updateSpeed(rotateSpeed);
      console.log("Speed:", -rotateSpeed);
  
      for (let i = 0; i < torusArray.length; i++) {
          torusArray[i].y += random(-100, 100);
      }
  
      for (let i = 0; i < coneArray.length; i++) {
          coneArray[i].y += random(-100, 100);
      }
  }
  

function mouseReleased()
{
    rotateSpeed -= .2;
    modelSpider.updateSpeed(rotateSpeed);
}

function mouseDragged()
{
    spiderX = mouseX-width/2;
    spiderY = mouseY-height/2;
    modelSpider.updateX(spiderX);
    modelSpider.updateY(spiderY);
}