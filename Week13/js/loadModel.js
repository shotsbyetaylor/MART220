class modelClass {
    constructor(x, y, speed, myModel, myTexture) {
      this.x = x;
      this.y = y;
      this.speed = speed;
      this.myModel = myModel;
      this.myTexture = myTexture;
    }
  
    updateSpeed(speed) {
      this.speed = speed;
    }
  
    updateX(x) {
      this.x = x;
    }
  
    updateY(y) {
      this.y = y;
    }
  
    render() {
      push();
      translate(this.x, this.y, -500);
      scale(2);
      rotateX(frameCount * this.speed);
      rotateY(frameCount * this.speed);
      normalMaterial();
      smooth();
      noStroke();
      if (this.myTexture) {
        texture(this.myTexture);
      }
      model(this.myModel);
      pop();
    }
  }
  