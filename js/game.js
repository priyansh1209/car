class Game{
    constructor(){

    }
    getState(){
        var gameStateRef = db.ref("gameState")
        gameStateRef.on("value", function(data){
            gameState = data.val()
        })
    }
    update(state){
        db.ref("/").update({
            gameState:state
        })
    }
   async start(){
        if(gameState === 0){
            player = new Player()
            var playerCountRef = await db.ref("playerCount").once("value")
            if(playerCountRef.exists()){
                playerCount = playerCountRef.val()
                player.getPlayerCount() 
            }
            form = new Form()
            form.display()
        }
        car1 = createSprite(100,200)
        car2 = createSprite(300,200)
        car3 = createSprite(500,200)
        car4 = createSprite(700,200)
        cars = [car1,car2,car3,car4]
    }
    play(){
        form.hide()
        Player.getPlayerInfo()
        if(allPlayers !== undefined){
            var index = 0
            var x = 100
            var y 
            for(var w in allPlayers){
                index = index + 1
                x = x + 200
                y = displayHeight-allPlayers[w].distance
                cars[index-1].x = x
                cars[index-1].y = y
                if(index === player.index){
                    cars[index-1].shapeColor = "red"
                    camera.position.x = displayWidth/2
                    camera.position.y = cars[index-1].y
                }
            }
        }
        if(keyIsDown(UP_ARROW) && player.index !== null){
            player.distance = player.distance + 5
            player.update()
        }
        drawSprites()
    }
}