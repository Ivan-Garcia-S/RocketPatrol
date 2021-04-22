/*
Ivan Garcia-Sanchez
Rocket Patrol Mods
4/21/21
4 days to complete
*/


class Ship extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y,texture,frame, pointValue){
        super(scene,x,y,texture,frame);
        
        scene.add.existing(this);
        this.points = pointValue;
        this.movementSpeed = game.settings.spaceshipSpeed;
    }

    update(){
        this.x -= this.movementSpeed;

        if(this.x <= 0 - this.width){
            this.reset();
        }
    }

    reset() {
        this.x = game.config.width;
    }

}