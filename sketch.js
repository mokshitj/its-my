var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;
var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound

function preload(){
  trex_running = loadAnimation("");
  
  
  groundImage = loadImage("ground2.png");
  
 // cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("");
 
  
  restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
  
//  jumpSound = loadSound("jump.mp3")
 // dieSound = loadSound("die.mp3")
//  checkPointSound = loadSound("checkPoint.mp3")
}

function setup() {
  createCanvas(displayWidth, displayHeight);

  var message = "This is a message";
 console.log(message)
  
  trex = createSprite(50,displayHeight-375,20,50);
  trex.addAnimation("running", trex_running);
 

  trex.scale = 0.5;
  
  ground = createSprite(200,displayHeight-400,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  gameOver = createSprite(800,300);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(830,400);
  restart.addImage(restartImg);
  
 
  gameOver.scale = 1.0;
  restart.scale = 1.0;
  
  invisibleGround = createSprite(200,displayHeight-375,400,10);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
 
  
 
  //trex.debug = true
  
  score = 0;
  
}

function draw() {
  


  background(180);
  //displaying score
  textSize(30);
  text("Score: "+ score, 800,200);
  
  
  if(gameState === PLAY){

    gameOver.visible = false;
    restart.visible = false;
    
    ground.velocityX = -(4 + 3* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/60);
    
    if(score>0 && score%100 === 0){
       checkPointSound.play() 
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& trex.y >= 159) {
        trex.velocityY = -12;
        jumpSound.play();
    }
    
    //add gravity
    trex.velocityY = trex.velocityY + 0.8
  
   
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(trex)){
        //trex.velocityY = -12;
        //jumpSound.play();
        gameState = END;
        dieSound.play()
      
    }
  }
   else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
     
     //change the trex animation
     
    
     
     
      ground.velocityX = 0;
      trex.velocityY = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
   
     
     obstaclesGroup.setVelocityXEach(0);
     
     
     if(mousePressedOver(restart)) {
      reset();
    }
   }
  
 
  //stop trex from falling down
 
  
  


  drawSprites();
}

function reset(){
  gameState=PLAY;
  restart.visible=false;
  gameOver.visible=false;
  obstaclesGroup.destroyEach();
 
 
  score=0;
}


function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(displayWidth-1000,displayHeight-400,10,40);
   obstacle.velocityX = -(6 + score/100);
   
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
     
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

