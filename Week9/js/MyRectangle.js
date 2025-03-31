class MyRectangle
{
    constructor(path, x,y)
    {
        this.path = path;
        // need the image
        this.myImage = loadImage(this.path);
        this.x = x;
        this.y = y;
        this.imageWidth = 150;
        this.imageHeight = 200;
    }

    draw()
    {
        // image draw

        //rect(this.x,this.y, this.myImage.width, this.myImage.height);
        image(this.myImage, this.x, this.y, 150, 200);
    }
}