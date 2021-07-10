var road1,road2,roadimage,npcimage,randspawn,npcimage2,randomspawn2,player,playerstanding,playerwalk,gun,gunimg,pointer,pointerimg,bullet,bullimg;
var angle;persongroup,person2group,bulletgroup,carimg,car,cargroup;
var pointergamestate="none"
var flag=0;
var pllives=3
var heart1,heart2,heart3,heartimg;
var hearts=[];

function preload(){
  roadimage=loadImage("Capture.PNG")
  npcimage=loadAnimation("5-removebg-preview.png","4-removebg-preview.png","3-removebg-preview.png","2-removebg-preview.png","1-removebg-preview.png")
npcimage2=loadAnimation("1rb.png","2rb.png","3rb.png","4rb.png","5rb.png","6-removebg-preview.png","7-removebg-preview.png","8-removebg-preview.png")
playerstanding=loadImage("stand-removebg-preview.png")
playerwalk=loadAnimation("person (3).png","person (2).png","person (1).png","person (7).png","person (6).png","person (5).png","person (4).png");
gunimg=loadImage("gun-removebg-preview.png");
bullimg=loadImage("images-removebg-preview.png");
pointerimg=loadImage("18554-removebg-preview.png");
carimg=loadImage("car1.png");
heartimg=loadImage("9.jpg");
}




function setup() {

  createCanvas(innerWidth-50,innerHeight-50);
  road1=createSprite(innerWidth/2-10,45,width,40);
  road1.addImage(roadimage); 
  road2=createSprite(innerWidth/2-10,560,width,40);
  road2.addImage(roadimage); 
  player=createSprite(200,200,20,20)
  player.addAnimation("standinganimation",playerstanding);
  player.addAnimation("playerani",playerwalk);
  gun=createSprite(player.x+10,player.y,10,10);
  gun.addImage(gunimg);
  gun.scale=0.2
  gun.visible=false;
  gun.scale=0.2
  
  player.scale=0.5;
  pointer=createSprite(20,20,10,10);
  pointer.addImage(pointerimg);
     pointer.scale=0.1
  pointer.visible=false;
  persongroup=new Group ();
  person2group=new Group ();
  bulletgroup=new Group ();
  cargroup=new Group ();
  heart1=createSprite(innerWidth-100,innerHeight-70,20,20);
  heart1.addImage(heartimg);
  heart1.scale=0.08
  heart2=createSprite(innerWidth-150,innerHeight-70,20,20);
  heart2.addImage(heartimg);
  heart2.scale=0.08
  heart3=createSprite(innerWidth-200,innerHeight-70,20,20);
  heart3.addImage(heartimg);
  heart3.scale=0.08
  hearts=[heart1,heart2,heart3];

  
  
  
  
  
 
}

function draw() {
  background(255,255,255);
  spawnPeople();  
  drawSprites();
  randspawn=Math.round(random(70,200))
  randomspawn2=Math.round(random(100,250))
  pointer.x=mouseX;
  pointer.y=mouseY

  //key 1
  if (keyDown(49)){
      gun.visible=true;
      pointer.visible=true;
      flag=1;
    if(bullet){
    bullet.visible=true;
    }
    else{
     // bullet.visible=false
    }
    console.log("true");
    //pointergamestate="on"
    
  }
  //2
  if (keyDown(50)){
    gun.visible=false;
    flag=2;
    if(bullet){
    bullet.visible=false;
    }
    console.log("true");
    pointer.visible=false;
    // pointergamestate="off"
    
  }
  gun.x=player.x+13;
  gun.y=player.y
 // player.debug=true;
if(keyDown("right")){

 player.changeAnimation("playerani",playerwalk);
  player.x=player.x+10
  player.y=player.y+0
}
else if(keyDown("left")){
  player.changeAnimation("playerani",playerwalk);
   player.x=player.x-5
   player.y=player.y+0
 }
 else if(keyDown("up")){
  player.changeAnimation("playerani",playerwalk);
   player.y=player.y-5
   player.x=player.x+0
 }
 else if(keyDown("down")){
  player.changeAnimation("playerani",playerwalk);
   player.y=player.y+5
   player.x=player.x+0
 }
 else{
  player.changeAnimation("standinganimation",playerstanding);
 }
if (keyDown("space")&&flag===1){
  generatebullet();
  bullet.x=gun.x+5
  bullet.y=gun.y;
  angle=(180/Math.PI)*Math.atan2(mouseY-bullet.y, mouseX-bullet.x);
  bullet.setSpeedAndDirection(10, angle);
  console.log(angle)

}

for(var x=0;x<person2group.length;x++)
{
  if (bulletgroup.isTouching(person2group[x])){
  person2group[x].destroy();
  bulletgroup.destroyEach();
  }
}
for(var x=0;x<persongroup.length;x++)
{
  if (bulletgroup.isTouching(persongroup[x])){
  persongroup[x].destroy();
  bulletgroup.destroyEach();
  }
  
}
spawncar();
for(var x=0;x<cargroup.length;x++)
{
    if(player.isTouching(cargroup[x]))
    {
      for(var i=0;i<hearts.length;i++)
      {
        if (player.isTouching(cargroup[x]))
        {
          cargroup[x].destroy();
          hearts[i].destroy();
          hearts.pop();
          console.log("destroy");
        }
      }
  }  
}


// if (pointergamestate==="on"){

//  pointer.visible=true;
//   pointer.addImage(pointerimg);
//   pointer.scale=0.2
// }

text(mouseX+" "+mouseY,mouseX,mouseY)
}

function spawnPeople()
{
  if(World.frameCount%randspawn===0)
 {
  
   var person2=createSprite(width-50,545,10,10)
   person2.velocityX=-3
   person2.addAnimation("npcanimate",npcimage);
   person2.scale=0.5;
   person2group.add(person2);
 }
 if(World.frameCount%randomspawn2===0)
 {
 var person=createSprite(50,50,10,10);
 person.velocityX=3;
 person.addAnimation("npcbusiness",npcimage2)
 person.scale=0.35
 persongroup.add(person);
 }

}
function generatebullet(){
  
  bullet=createSprite(200,200,20,20);
  bullet.addImage(bullimg);
  bullet.scale=0.2;
  bulletgroup.add(bullet);
}
function spawncar(){
  if (frameCount%Math.round(random(100,350))===0){
  car=createSprite(0,Math.round(random(60,500),20,20));
  car.addImage(carimg);
  car.velocityX=7;
  car.scale=0.8
  cargroup.add(car);
  car.debug=true
  car.setCollider("rectangle",0,0,40,40);
  }
}