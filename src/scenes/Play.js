class Play extends Phaser.Scene {
    constructor () {
        super("playScene");
    }

    preload() {
        this.load.image("starfield", "./assets/starfield.png");
        this.load.image("rocket", "./assets/rocket.png");
        this.load.image("spaceship", "./assets/spaceship.png");   
        
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, 
            startFrame: 0, endFrame: 9});
    }
    //comment to commit
    create (){
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 
            "starfield").setOrigin(0,0);

        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height 
            - borderUISize - borderPadding, "rocket").setOrigin(.5,0);
        
        this.p2Rocket = new Rocket(this, game.config.width/2, game.config.height 
                - borderUISize - borderPadding, "rocket").setOrigin(.5,0);
        this.p2Rocket.alpha = 0;


        // add spaceships (x3)
        this.ship1 = new Ship(this, game.config.width + borderUISize*6, borderUISize*4, "spaceship", 0, 30).setOrigin(0, 0);
        this.ship2 = new Ship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, "spaceship", 0, 20).setOrigin(0,0);
        this.ship3 = new Ship(this, game.config.width, borderUISize*6 + borderPadding*4, "spaceship", 0, 10).setOrigin(0,0);
        


        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 
            0x00FF00).setOrigin(0, 0);      
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 
            0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 
            0xFFFFFF).setOrigin(0, 0);


        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // animation config
        this.anims.create({ key: 'explode', frames: this.anims.generateFrameNumbers('explosion', 
        { start: 0, end: 9, first: 0}), frameRate: 30 });
        
        // initialize score
        this.p1Score = 0;
        this.p2Score = 0;
        
        // display score
        let scoreConfig = {
        fontFamily: 'Courier',
        fontSize: '28px',
        backgroundColor: '#F3B141',
        color: '#843605',
        align: 'right',
        padding: {
        top: 5,
        bottom: 5,
        },
        fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + 
            borderPadding*2, this.p1Score, scoreConfig);

        this.scoreRight = this.add.text(game.config.width - 140, borderUISize + 
                borderPadding*2, this.p2Score, scoreConfig);
        

        // GAME OVER flag
        this.gameOver = false;  
        this.gameOver2 = false;  

        this.extraTime = 0;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.addTime(this.extraTime);
            /*this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', 
            scoreConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', 
            scoreConfig).setOrigin(0.5);
            this.gameOver = true;
            */
        }, null, this);
        

        

    }
 
    update() {
        
        
        // check key input for restart
        if (this.gameOver2 && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        
        this.starfield.tilePositionX -= 4;
        if(!this.gameOver){
            this.p1Rocket.update();
            this.ship1.update();               // update spaceships (x3)
            this.ship2.update();
            this.ship3.update();

        }

        

        if (this.gameOver2 && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        if(!this.gameOver){
            
            
            // check collisions
            if(this.checkCollision(this.p1Rocket, this.ship3)) {
                this.p1Rocket.reset();
                this.shipExplode(this.ship3);
                
                this.p1Rocket.consecutiveHits += 1;
                if(this.p1Rocket.consecutiveHits > 3){
                    this.extraTime += 3000;
                }
                else{
                    this.extraTime += this.p1Rocket.consecutiveHits*1000;
                }

            }
            if (this.checkCollision(this.p1Rocket, this.ship2)) {
                this.p1Rocket.reset();
                this.shipExplode(this.ship2);
                
                this.p1Rocket.consecutiveHits += 1;
                if(this.p1Rocket.consecutiveHits > 3){
                    this.extraTime += 3000;
                }
                else{
                    this.extraTime += this.p1Rocket.consecutiveHits*1000;
                }

            }
            if (this.checkCollision(this.p1Rocket, this.ship1)) {
                this.p1Rocket.reset();
                this.shipExplode(this.ship1);
                
                this.p1Rocket.consecutiveHits += 1;
                if(this.p1Rocket.consecutiveHits > 3){
                    this.extraTime += 3000;
                }
                else{
                    this.extraTime += this.p1Rocket.consecutiveHits*1000;
                }
            }

        }
        else if(this.gameOver && !this.gameOver2){

                this.p2Rocket.update();
                this.ship1.update();               // update spaceships (x3)
                this.ship2.update();
                this.ship3.update();
    
            // check collisions
            if(this.checkCollision(this.p2Rocket, this.ship3)) {
                this.p2Rocket.reset();
                this.shipExplode(this.ship3);
                
                this.p2Rocket.consecutiveHits += 1;
                if(this.p2Rocket.consecutiveHits > 3){
                    this.extraTime += 3000;
                }
                else{
                    this.extraTime += this.p2Rocket.consecutiveHits*1000;
                }

            }
            if (this.checkCollision(this.p2Rocket, this.ship2)) {
                this.p2Rocket.reset();
                this.shipExplode(this.ship2);
                
                this.p2Rocket.consecutiveHits += 1;
                if(this.p2Rocket.consecutiveHits > 3){
                    this.extraTime += 3000;
                }
                else{
                    this.extraTime += this.p2Rocket.consecutiveHits*1000;
                }

            }
            if (this.checkCollision(this.p2Rocket, this.ship1)) {
                this.p2Rocket.reset();
                this.shipExplode(this.ship1);
                
                this.p2Rocket.consecutiveHits += 1;
                if(this.p2Rocket.consecutiveHits > 3){
                    this.extraTime += 3000;
                }
                else{
                    this.extraTime += this.p2Rocket.consecutiveHits*1000;
                }
            }

        }

        /*if (!this.gameOver) {               
            this.p1Rocket.update();         // update rocket sprite
            this.ship1.update();           // update spaceships (x3)
            this.ship2.update();
            this.ship3.update();
        } */
    }

    
    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
            
            return true;
        } 
        else {
            return false;
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
          ship.reset();                         // reset ship position
          ship.alpha = 1;                       // make ship visible again
          boom.destroy();                       // remove explosion sprite
        });   
        
        // score add and repaint
        if(!this.gameOver){
            this.p1Score += ship.points;
            this.scoreLeft.text = this.p1Score; 
        }
        else{
            this.p2Score += ship.points;
            this.scoreRight.text = this.p2Score;
        }
        this.sound.play('sfx_explosion');
      }

    addTime(time){
        
        if(!this.gameOver){
            if(time == 0){
                this.add.text(game.config.width/2, game.config.height/2, 'PLAYER 1 TURN OVER', 
                this.scoreConfig).setOrigin(0.5);
                
                this.gameOver = true;
                this.p1Rocket.alpha = 0;
                this.p2Rocket.alpha = 1;
                this.extraTime = 0;

                this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
                    this.addTime(this.extraTime);   
                }, null, this); 
            }    
            else{
                this.clock = this.time.delayedCall(time, () => {
                    this.addTime(this.extraTime);   
                }, null, this); 
                this.extraTime = 0;
            }
            
        }
        
        else{
            if(time == 0){
                this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', 
                this.scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', 
                this.scoreConfig).setOrigin(0.5);
                
                this.gameOver2 = true;
            }    
            else{
                this.clock = this.time.delayedCall(time, () => {
                    this.addTime(this.extraTime);   
                }, null, this); 
                this.extraTime = 0;
            }
            
        }
    }

}
