/*
Ivan Garcia-Sanchez
Rocket Patrol Mods
4/21/21
4 days to complete
*/


class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        
        scene.add.existing(this);
        this.isFiring = false;
        this.movementSpeed = 2;
        this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
        this.consecutiveHits = 0;

        //game.physics.enable(this, Phaser.Physics.ARCADE);
        
    }

    create() {
      //  input = this.input;
      //  this.mouse = Play.input.activePointer;
    }

    update () { 
        
        if(mouse.x < this.x && this.x >= borderUISize + this.width){
            if(this.isFiring){
                this.movementSpeed = 0.2;
            }
            this.x -= this.movementSpeed;

            this.movementSpeed = 2;
        }
        else if(mouse.x > this.x && this.x <= game.config.width - borderUISize - this.width){
            if(this.isFiring){
                this.movementSpeed = 0.2;
            }
            this.x += this.movementSpeed;
            this.movementSpeed = 2;
        }
        

        //fire button
        if(mouse.isDown && !this.isFiring){
            this.isFiring = true;
            this.sfxRocket.play();  // play sfx
        }
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding){
            this.y -= this.movementSpeed;
        }
        if(this.y <= borderUISize * 3 + borderPadding){
            this.isFiring = false;
            this.y = game.config.height - borderUISize - borderPadding;
            this.consecutiveHits = 0;
        }
        
    
    }

    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }

}
