var PLAY, END, gamestate; 

var sword, swordImage, fruit1, fruit2, fruit3, fruit4, monsters, monsters_moving, fruitGroup, enemyGroup;

var gameoverImage, GOSound, KSSound;

var score;

function preload(){
  monsters_moving = loadAnimation("alien1.png","alien2.png");
  
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  
  swordImage = loadImage("sword.png");
  
  gameoverImage = loadImage("gameover.png");
  GOSound = loadSound("gameover.mp3");
  KSSound = loadSound("knifeSwooshSound.mp3");
  
}

function setup(){
  createCanvas(400, 400);
  sword = createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale = 0.7;
  
  PLAY = 1;
  END = 0;
  gamestate=PLAY;
  
  score = 0;
  
  fruitGroup = createGroup();
  enemyGroup = createGroup();
  
}

function draw(){
  background(220)
  text("Score:"+score,20,20);
  if(gamestate===PLAY){
    sword.x = World.mouseX;
    sword.y = World.mouseY;
   
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      score = score+2;
      KSSound.play();
      
    }
    if(enemyGroup.isTouching(sword)){
      gamestate=END;
      GOSound.play();
    }
    fruit();
    enemy();
  }
  if(gamestate===END){
    sword.addImage(gameoverImage);
    sword.x=200;
    sword.y=200;
    enemyGroup.setVelocityXEach(0);
    fruitGroup.setVelocityXEach(0);
    enemyGroup.setLifetimeEach(-1);
    fruitGroup.setLifetimeEach(-1);
    if(mousePressedOver(sword)){
      reset();
    }
    
  }
  drawSprites();
  
  
}
function fruit(){
  if(World.frameCount%80===0){
    var fruits = createSprite(400,200,20,20);
    fruits.scale = 0.2
    var r = Math.round(random(1,4));
    if(r===1){
      fruits.addImage(fruit1)
    } else if(r===2){
      fruits.addImage(fruit2)
    } else if(r===3){
      fruits.addImage(fruit3)
    } else {
      fruits.addImage(fruit4)
    }
  
  fruits.y = Math.round(random(50,350));
  fruits.velocityX = -7;
  fruits.setLifetime = 100;
  
  fruitGroup.add(fruits)
  }
}
function enemy(){
  if(World.frameCount%250===0){
    monsters = createSprite(300,60,20,20);
    monsters.addAnimation("moving",monsters_moving);
    monsters.y = Math.round(50,350);
    monsters.velocityX=-8;
    monsters.setLifetime = 75;
    enemyGroup.add(monsters)
  }
}
function reset(){
  gamestate = PLAY;
  sword.addImage(swordImage);
  enemyGroup.destroyEach();
  fruitGroup.destroyEach();
  score=0
}
