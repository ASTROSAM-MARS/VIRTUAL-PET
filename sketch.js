var dog,sadDog,happyDog;
var buttons;
var database;
var bottle = 0;
var  milk;
var hour = null, minutes = 23;
var feed;
var c = 0;
var milkImage, milkSprite;


function preload(){
  sadDog=loadImage("Dog.png");
  happyDog=loadImage("happy dog.png");
  milkImage = loadImage("Milk.png");
}



function setup() {
  createCanvas(1000,400);
  database = firebase.database();

  updateTime();
  foodStock();

  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
  milk = new milkBottles();
  buttons = new button();
  buttons.display();
  feed.mousePressed(function(){
    getTime();
    if(bottle != 0) {
      database.ref("bottles").update({
        milk : --bottle
      });
     c = 1;
      dog.addImage(happyDog);
      }
      database.ref("time").set({
        hour : hour,
        minutes : minutes
      }); 
  });

  
  
}

function draw() {
  background(46,139,87);
  fill(0);
  text("DOG NAME - LOLLY!", 450 ,50);
  var i;
  drawSprites();
   for( i = 1, x = 0; i <= bottle ; i++){
      milk.display(x);
      x+=70;
  } 
  if(c == 1){
    milkSprite = createSprite(x+35, 235);
    milkSprite.addImage("milkIsHere", milkImage);
    milkSprite.scale = 0.09;
    milkSprite.lifetime = Math.round((750-x)/6);
     c = 0;
  }

  if(milkSprite != null){
  milkSprite.velocityX= 6;
  console.log(milkSprite.x);
  }
  fill(0);
  textSize(20);
  text("LAST FED : ", 100, 100);
  
  if(hour>=00 && hour<=23)
  text(hour+":"+minutes, 220, 100);

}

//function to read food Stock
function foodStock(){
  var bottleRef = database.ref("bottles/milk");
  bottleRef.on("value", function(data){
  bottle = data.val();
  });
}

//function to update food stock and last fed time
async function getTime(){
  var response = await fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJson = await response.json();
  var datetime = responseJson.datetime;
  console.log(responseJson);
   hour = datetime.slice(11,13);
   minutes = datetime.slice(14, 16);
  console.log(hour+":"+ minutes);
 
}

function updateTime(){
  var hourRef = database.ref("time/hour");
  hourRef.on("value", function (data){
    hour = data.val();
  });
  var minRef = database.ref("time/minutes");
  minRef.on("value", function (data){
    minutes = data.val();
  });
  console.log(hour);
}
