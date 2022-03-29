var wallpaperImg,wallpaper
var rocketImg,rocket
var meteorImg,meteor
var meteorsGroup
var gameState="play"

function preload(){
wallpaperImg=loadImage("tower.png")
rocketImg=loadImage("rocket-removebg-preview.png")
meteorImg=loadImage("m-removebg-preview.png")
}

function setup() {
    createCanvas(600, 600);

    wallpaper = createSprite(300,300)
    wallpaper.addImage("background",wallpaperImg)
    wallpaper.velocityY=1

    meteorsGroup = new Group()

    rocket = createSprite(200,200,50,50)
    rocket.addImage("rocket",rocketImg)
    rocket.scale=0.5

}

function draw() {
  
    background(0)

    if (gameState="play"){

        if(keyDown("left_arrow")){
            rocket.x -= 2;
        }
        
        if(keyDown("right_arrow")){
            rocket.x +=  2;
        }
        if(keyDown("space")){
            rocket.velocityY = -5
        }

        rocket.velocityY = rocket.velocityY + 0.8

        if(wallpaper.y > 400){
            wallpaper.y = 300
        }

        spawnMeteors()

        if( rocket.y > 600||meteorsGroup.isTouching(rocket)){
            rocket.destroy();
            gameState = "end"
        }

        drawSprites()

    }

 if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }

}

function spawnMeteors(){

    if(frameCount%200===0){
        meteor = createSprite(200,-50)
        meteor.addImage("meteor",meteorImg)
        meteor.velocityY=2
        meteor.scale = random(0.1,0.5)
        meteor.x = Math.round(random(100,400))
        rocket.depth = meteor.depth;
        meteor.lifetime=600
        meteorsGroup.add(meteor)
    }
}