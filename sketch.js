var dog, database, foodS, foodStock, lastFed,food1;
var food = 20;
var addFood, feedFood, fedTime, lastFed, foodObj;
function preload(){
  img1 = loadImage("Dog.png");
  img2 = loadImage("happydog.png");
  img3 = loadImage("Milk.png");
}

function setup() {
  createCanvas(500, 500);
  dog = createSprite(300,270);
  dog.addImage(img1);
  dog.scale = 0.3;

  milk = createSprite(190,310);
  milk.addImage(img3);
  milk.scale = 0.15;
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value", function(data){
    foodS = data.val();
  });
  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){
    fedTime=data.val();
  })

  food1 = new Food();

  feed = createButton("Feed the Dog");
  feed.position(500,150);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(600,150);
  addFood.mousePressed(addFoods);
  
  
}


function draw() {  
  background(46, 139, 87);
  currentTime = hour(); 
  fill(255);
  textSize(20);
  text("Press the up arrow key to feed the dog milk!", 50, 55);
  text("Milk Left: " + foodS, 190, 80);
  if(fedTime>=12){
        fill("white");
        textSize(15); 
        text("Last Fed : "+ fedTime%12 + " PM", 350,30);
  }
  else if(fedTime==0){
    fill("white");
    textSize(15); 
    text("Last Fed : 12 AM",350,30);
  }
  else{
    fill("white");
    textSize(15); 
    text("Last Fed : "+ fedTime + " AM", 350,30);
  }
  food1.display();
  drawSprites();
  //add styles here

}

//Function to write values in DB function 
function writeStock(x){
   if(x<=0){
      x=0 
    }
    else{
       x=x-1
    } 
  database.ref('/').update({Food:x})
 }

 function feedDog(){
   dog.addImage(img2);
   foodS--;
   database.ref('/').update({
     Food : foodS
   })
   fedTime = hour(); 
 }
 function addFoods(){
   foodS++;
   database.ref('/').update({
     Food:foodS
   })
 }

