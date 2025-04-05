class boulderImage {
    constructor(fileName, x, y, w, h) {
      this.fileName = fileName;
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.boulder;
    }
  
    loadBoulder() {
      this.boulder = loadImage(this.fileName);
    }
  
    drawBoulder() {
      image(this.boulder, this.x, this.y, this.w, this.h);
    }
  }
  