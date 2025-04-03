class food {
    constructor(x, y, diameter) {
        this.x = x;
        this.y = y;
        this.diameter = diameter;

        let states = ["fresh", "burnt", "perfect"];
        this.state = random(states);
    }

    drawCircle() {
        if (this.state === "fresh") {
            fill(0, 200, 0);
        } else if (this.state === "burnt") {
            fill(80, 40, 20);
        } else if (this.state === "perfect") {
            fill(255, 215, 0);
        }

        circle(this.x, this.y, this.diameter);
    }
}