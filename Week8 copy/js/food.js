class food {
  constructor(x, y, diameter) {
    this.x = x;
    this.y = y;
    this.diameter = diameter;

    let states = ["fresh", "burnt", "perfect"];
    this.state = random(states);

    this.isEaten = false;
  }

  drawCircle() {
    if (this.isEaten) return;

    if (this.state === "fresh") {
      fill(0, 200, 0);
    } else if (this.state === "burnt") {
      fill(80, 40, 20);
    } else if (this.state === "perfect") {
      fill(255, 215, 0);
    }

    circle(this.x, this.y, this.diameter);

    fill(255);
    textAlign(CENTER);
    textSize(12);
    text(this.state, this.x, this.y - this.diameter / 2 - 5);
  }
}