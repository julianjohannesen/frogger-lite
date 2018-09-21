// Enemies our player must avoid
class Enemy {
    constructor(sprite, x, y, speed){
        this.sprite = sprite;
        this.x = x;
        this.y = y;
        this.speed = speed;
    }

    update(dt) {
        if(this.x >= 505) this.x = -171;
        console.log(this.x);
        this.x = this.x + 0.3 * this.speed * dt;
        
        // Axis-aligned rectangle collision detection from: 
        // https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
        if (this.x < player.x + player.width && 
            this.x + this.width > player.x &&
            this.y < player.y + player.height && 
            this.y + this.height > player.y) {
            // The objects are touching
            console.log("collision!")
        }
    }

    render() {
        // console.log(Resources.get(this.sprite));
        // console.log(this.x, this.y)
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

};
class Player extends Enemy {
    constructor(sprite, x, y){
        super(sprite, x, y);
    }

    update(){
        // something about the time delta?
        this.x > 404  ? this.x = 404 :
        this.y > 405  ? this.y = 405 :
        this.x < 0 ? this.x = 0 :
        this.y < 0 ? this.y = 0 :
        null
    }

    handleInput(keyPressed){
        // edit this to make sure the player doesn't go off the board
        keyPressed === 'left'  ? this.x -= 50.5 :
        keyPressed === 'right' ? this.x += 50.5 :
        keyPressed === 'up'    ? this.y -= 42 :
        keyPressed === 'down'  ? this.y += 42 : 
        null
    }
}

function makeEnemies(num){
    const enemiesArray = [];
    for(let i = 0; i < num;  i++){
        let y = Math.floor(Math.random() * (247.5 - 50) + 50);
        let speed = Math.floor(Math.random() * (1500 - 1) + 1);
        enemiesArray[i]  = new Enemy('images/enemy-bug.png', 0, y, speed);
    }
    return enemiesArray;
}
const allEnemies = makeEnemies(5);

const player = new Player('images/char-boy.png', (252-50.5), 405);

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
