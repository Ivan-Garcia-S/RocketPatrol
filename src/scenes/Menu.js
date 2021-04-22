/*
Ivan Garcia-Sanchez
Rocket Patrol Mods
4/21/21
4 days to complete
*/


class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion1', './assets/explosion1.wav');
        this.load.audio('sfx_explosion2', './assets/explosion2.wav');
        this.load.audio('sfx_explosion3', './assets/explosion3.wav');
        this.load.audio('sfx_explosion4', './assets/explosion4.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
    }
      

    create() {
        this.twoPlayer = false;

        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 0
        }

        //show menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - 
            borderPadding, "ROCKET PATROL", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 , "Use mouse to move & left-click to fire", 
        menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = "#00FF00";
        menuConfig.color = "#000";
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + 
            borderPadding, "Press <- for Novice or -> for Expert", menuConfig).setOrigin(0.5);
        this.twos = this.add.text(game.config.width/2, game.config.height/2 + 2*borderUISize + 
            2*borderPadding, "Press R key for 2-Player mode", menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        //game.highScore = 0;
    }


    update() {
        if(Phaser.Input.Keyboard.JustDown(keyR)){
          this.twoPlayer = true;
          this.twos.destroy();
        }      
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000,   
            twoPlayers: this.twoPlayer
          }
          this.sound.play("sfx_select");
          this.scene.start("playScene");    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000,  
            twoPlayers: this.twoPlayer  
          }
          this.sound.play("sfx_select");
          this.scene.start("playScene");    
        }
    }
    

}