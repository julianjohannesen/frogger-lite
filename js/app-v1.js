// Enemies our player must avoid
const Entity = function(sprite, initLocation, speed){
    this.sprite = sprite;
    this.initLocation = initLocation;
    this.speed = speed;
}
// Update the enemy's position
Entity.prototype.update = function(dt) { let speedThing = dt * movement; };
// Draw the enemy on the screen
Entity.prototype.render = function() { ctx.drawImage(Resources.get(this.sprite), this.x, this.y); };
// Handle player input
Entity.prototype.handleInput = function(direction){
    if(direction === 37) return moveLeft();
    if(direction === 38) return moveUp();
    if(direction === 39) return moveRight();
    if(direction === 40) return moveDown();
}

// The enemy
const Enemy = function(){
    Entity.call(this, sprite, initLocation, speed)
}
// Our player
const Player = function(){
    Entity.call(this, sprite, location, speed);
};


// Array containing enemy instances
const enemy1 = new Enemy(); //can this go inside the array
const allEnemies = [enemy1];

// Player instance
const player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {37: 'left', 38: 'up', 39: 'right', 40: 'down'};
    player.handleInput(allowedKeys[e.keyCode]);
});
