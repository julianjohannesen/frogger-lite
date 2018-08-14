// Enemies our player must avoid
const Enemy = function(){ this.sprite = '../images/enemy-bug.png'; };
// Update the enemy's position
Enemy.prototype.update = function(dt) { /* Multiply any movement by the dt parameter to ensure the game runs at the same speed for all computers.*/ };
// Draw the enemy on the screen
Enemy.prototype.render = function() { ctx.drawImage(Resources.get(this.sprite), this.x, this.y); };

// Our player
const Player = function(){ this.sprite = '../images/char-boy.png'; };
// Update the player's position
Player.prototype.update = function(){}
// Draw the player on the screen
Player.prototype.render = function(){ ctx.drawImage(Resources.get(this.sprite), this.x, this.y); }
Player.prototype.handleInput = function(keyCode){
    if(keyCode === 37) return moveLeft;
    if(keyCode === 38) return moveUp;
    if(keyCode === 39) return moveRight;
    if(keyCode === 40) return moveDown;
}

// Array containing enemy instances
const allEnemies = [new Enemy(), new Enemy(), new Enemy()];

// Player instance
const player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {37: 'left', 38: 'up', 39: 'right', 40: 'down'};
    player.handleInput(allowedKeys[e.keyCode]);
});
