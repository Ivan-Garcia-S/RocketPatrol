/*
Ivan Garcia-Sanchez
Rocket Patrol Mods
4/21/21
4 days to complete
------------------
POINTS BREAKDOWN
20 - particle explosion when rocket hits ship
20 - mouse control for player movement and click to fire
20 - .5 seconds added to clock for each hit and 1 second added after 3 consecutive hits
20 - alternating 2 player mode
10 - randomized 4 new explosion noises
5 - rocket can be controlled after firing (It really slowly moves left and right once fired to not make the game too easy)
5 - high score is tracked and displayed
*/


let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [Menu, Play]
  }
  
let game = new Phaser.Game(config);
let keyF, keyR, keyLEFT, keyRIGHT, mouse;




// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let highScore = 0;