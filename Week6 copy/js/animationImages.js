class animationImages
{

    constructor(fileName, x, y, w, h)
    {
        this.fileName = fileName;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.cat = this.loadAnimation();
    }

    loadAnimation()
    {
        return loadImage(this.fileName);
    }

    drawAnimation() 
    {
        image(this.cat, this.x, this.y, this.w, this.h);
    }





}