var dog,happyDog,database,foodS,foodStock;
var dogImg,happyDogImg;
function preload()
{
  dogImg = loadImage("dogImg.png");
  happyDogImg = loadImage("dogImg1.png");
}

function setup() {
  database = firebase.database();
  console.log(database);
  createCanvas(500,500);
  dog = createSprite(250,250,15,15);
  dog.addImage(dogImg);
  dog.scale = 0.25;
  foodStock = database.ref('Food');
  foodStock.on("value",readStock)
}


function draw() {
  background(46,139,87);  

  if(keyWentDown(UP_ARROW))
  {
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }
  if(keyCode !== UP_ARROW)
  {
    dog.addImage(dogImg);
  }
  drawSprites();
  fill("white");
  textSize(20);
  text("Food Remaining: "+foodS,170,100);

}
function readStock(data)
{
  foodS = data.val();
}
function writeStock(x)
{
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })
}



