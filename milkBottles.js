class milkBottles{
    constructor(){
        this.image = loadImage("Milk.png");
    }
    display(x){
        image(this.image,x, 200, 70, 70);
    }
}