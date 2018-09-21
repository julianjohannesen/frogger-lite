//engine3.js

class Engine {
    constructor(width, height){
        this.doc = document;
        this.win = window;
        this.lastTime = 0;

        this.canvas = doc.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.doc.body.appendChild(canvas);
    }

    main() {
        let now = Date.now(),
            dt = (now - this.lastTime) / 1000.0;
        update(dt);
        render();
        this.lastTime = now;
        this.win.requestAnimationFrame(main);
        window.ctx = this.ctx;
    }

    init() {
        reset();
        this.lastTime = Date.now();
        main();
    }

    update(dt) {
        updateEntities(dt);
    }

    updateEntities(dt) {
        allEnemies.forEach(function(enemy) {enemy.update(dt);});
        player.update();
    }

    render() {
        const rowImages = [
                'images/water-block.png',   // Top row is water
                'images/stone-block.png',   // Row 1 of 3 of stone
                'images/stone-block.png',   // Row 2 of 3 of stone
                'images/stone-block.png',   // Row 3 of 3 of stone
                'images/grass-block.png',   // Row 1 of 2 of grass
                'images/grass-block.png'    // Row 2 of 2 of grass
            ],
            numRows = 6,
            numCols = 5;
        let row, col;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                this.ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }

        renderEntities();
    }

    renderEntities() {
        allEnemies.forEach(function(enemy) { enemy.render();});
        player.render();
    }

    reset() {
        render();
    }
    
}

Resources.load([
    'images/stone-block.png',
    'images/water-block.png',
    'images/grass-block.png',
    'images/enemy-bug2.png',
    'images/char-boy2.png'
]);

const engine = new Engine(505, 606);
Resources.onReady(engine.init());
