// Enemies our player must avoid
class Enemy {
    constructor(sprite, x, y, speed){
        this.sprite = sprite;
        this.x = x;
        this.y = y;
        this.speed = speed;
    }

    update(dt) {
        this.x *= dt;
        this.y *= dt;

        // check for collisions

    }

    render() {
        console.log(Resources.get(this.sprite));
        console.log(this.x, this.y)
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player extends Enemy {
    constructor(sprite, x, y, speed){
        super(sprite, x, y, speed);
    }

    handleInput(keyPressed){
        // edit this to make sure the player doesn't go off the board
        keyPressed === 'left' ? this.x -= 1 :
        keyPressed === 'right' ? this.x += 1 :
        keyPressed === 'up' ? this.y += 1 :
        keyPressed === 'down' ? this.y -= 1 : null
    }
}

function makeEnemies(num){
    const enemiesArray = [];
    for(let i = 0; i < num;  i++){
        let y = Math.floor(Math.random() * (6 - 2) + 2);
        let speed = Math.floor(Math.random() * (10 - 1) + 1);
        enemiesArray[i]  = new Enemy('images/enemy-bug.png', 0, y, speed);
    }
    return enemiesArray;
}
const allEnemies = makeEnemies(3);

const player = new Player('images/char-boy.png', 3, 3, 0);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
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
