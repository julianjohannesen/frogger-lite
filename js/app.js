// The Enemy class sets up properties and methods for our vehicles/bugs.
class Enemy {
    // Set up a sprite, initial x, y coordinates, and a speed
    constructor(sprite, x, y, speed){
        this.sprite = sprite;
        this.x = x;
        this.y = y;
        this.speed = speed;
    }

    // update checks to see a bug has run off the screen, in which case it's
    // moved back to the left side of the screen. It also sets the speed of
    // each bug by creating a step and multipliers for horizontal movement
    // Finally, it calls collision check to make sure the new move hasn't 
    // resulted in a collision
    update(dt) {
        if(this.x >= 505) this.x = -101;
        this.x = this.x + 0.3 * this.speed * dt;
        this.collisionCheck();

    }

    // collisionCheck will check to see whether the positions of the player
    // and any of the bugs overlaps. If so, it will simply alert the loss
    // and move the player back to the starting position.
    collisionCheck(){
        // Axis-aligned rectangle collision detection from: 
        // https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
        if ( this.x < (player.x + 46) && 
            (this.x + 60.5) > player.x &&
             this.y < (player.y + 51) && 
            (this.y + 48.5) > player.y) {
            // The objects are touching
            console.log("There was a collision!");
            alert("Woops! The bug got you! Back to the beginning!");
            player.x = 252-36;
            player.y = 432;
            
        }

    }
    // render uses canvas's drawImage method to draw the sprite at its
    // starting location
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

};
// The Player class extends the enemy class. We leave out speed, but use the 
// sprite, x, and y parameters. The render method is unchanged.
class Player extends Enemy {
    constructor(sprite, x, y){
        super(sprite, x, y);
    }

    // youWon is called when the player reaches the correct position at the 
    // top of the screen. It moves player back to the start position and alerts
    // the win.
    youWon(){
        this.x = 252-36;
        this.y = 432;
        alert("You won!");

    }

    // update in this case performs a series of checks to make sure the player
    // is not attempting to move off of the screen. If they are, we simply
    // move them back. If the player tries to move off the top of the screen,
    // we call youWon
    update(){
        this.x > 432  ? this.x = 432 :
        this.y > 470  ? this.y = 470 :
        this.x < 0    ? this.x = 0 :
        this.y < 65   ? this.youWon() : 
        null;

    }

    // handleInput fires when an arrow key press is detected and moves the
    // player certain distance up, down, left, or right.
    handleInput(keyPressed){
        keyPressed === 'left'  ? this.x -= 50.5 :
        keyPressed === 'right' ? this.x += 50.5 :
        keyPressed === 'up'    ? this.y -= 42 :
        keyPressed === 'down'  ? this.y += 42 : 
        null
    }

}

// makeEnemies takes a number and then loops that number of time, creating
// a new instance of a bug on each loop. The starting y coordinate and speed
// are randomized to make the game more difficult.
function makeEnemies(num){
    const enemiesArray = [];
    for(let i = 0; i < num;  i++){
        let y = Math.floor(Math.random() * (315 - 142) + 142);
        let speed = Math.floor(Math.random() * (1500 - 1) + 1);
        enemiesArray[i]  = new Enemy('images/enemy-bug2.png', 0, y, speed);
    }
    return enemiesArray;
}

// allEnemies contains our array of enemies
const allEnemies = makeEnemies(5);

// player contains our Player instance
const player = new Player('images/char-boy2.png', (252-36), 475);

// The listener lists for a key press and calls handleInput, passing in the
// the key value: up, down, left, or right.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    console.log(allowedKeys[e.keyCode])
    player.handleInput(allowedKeys[e.keyCode]);
});
