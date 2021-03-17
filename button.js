class button{
    constructor(){
    }
    display(){
        feed = createButton("FEED");
        var addFood = createButton("ADD FOOD");
        addFood.position(500, 400);
        feed.position(400, 400); 
        addFood.mousePressed(function(){ 
            if(bottle < 10){
                database.ref("bottles").update({
                    milk : ++bottle
                  });
           }
        });
    }
}