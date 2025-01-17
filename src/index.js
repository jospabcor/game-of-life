const canvas = document.querySelector('#gameboard-main');
const ctx = canvas.getContext('2d');

import { GameLife } from './game/core/GameLife.js'
import { Rectangle } from './game/core/structures/CartesianPlane.js'

// ---
const width = 1900.5;
const height = 900.5;

const drawGrid = () => {
    
    ctx.moveTo(0.5,0.5);
    ctx.lineWidth = 0.8;
    const color = '#626567';
    ctx.strokeStyle = color;
    
    
    for (let x = 0.5; x < width; x+=20) {
        
        ctx.moveTo(x,0.5);
        ctx.lineTo(x, height);
    }
    
    for (let y = 0.5; y < height; y+=20) {
        ctx.moveTo(0.5, y);
        ctx.lineTo(width, y);
    }
    ctx.stroke();
}

const clearCells = () => {
    ctx.clearRect(0, 0, width, height);
    drawGrid();
}
// ---

var game = new GameLife();

// Testing patern
game.bornCell(100-25,100-25);
game.bornCell(50-25,50-25);
game.bornCell(51-25,50-25);
game.bornCell(52-25,50-25);
game.bornCell(51-25,49-25);
game.bornCell(50-25,50-25);
game.bornCell(51-25,51-25);
game.bornCell(51-25,52-25);
game.bornCell(50-25,52-25);
game.bornCell(49-25,52-25);
game.bornCell(100+3-25,10+30-25);
game.bornCell(50+3-25,50+3-25);
game.bornCell(51+3-25,50+3-25);
game.bornCell(52+3-25,50+3-25);
game.bornCell(51+3-25,49+3-25);
game.bornCell(50+3-25,50+3-25);
game.bornCell(51+3-25,51+3-25);
game.bornCell(51+3-25,52+3-25);
game.bornCell(50+3-25,52+3-25);
game.bornCell(49+3-25,52+3-25);

// game.setCell(50,50);
// game.setCell(51,51);
// game.setCell(52,51);
// game.setCell(51,52);
// game.setCell(50,52);

drawGrid();

game.startEvolution({
    onNextGeneration: (size, board) => {

        clearCells();
        ctx.fillStyle = '#ffffff';
        
        // Offsets
        const x_offset = size.point1.x;
        const y_offset = size.point1.y;

        // Grid
        const row_gap = 0.5;
        const column_gap = 0.5;

        const row_size = 20;
        const column_size = 20;

        const cell_size = 18;

        for (let x = 0; x < size.point2.x; x++) {
            for (let y = 0; y < size.point2.y; y++) {
                const isAlive = board.getPoint(x, y);
        
                if(isAlive){
                    const cell_x = row_size*x+row_gap+x_offset+1;
                    const cell_y = column_size*y+column_gap+y_offset+1;

                    ctx.fillRect(cell_x, cell_y, cell_size, cell_size);
                }
            }
        }

    },
    delayDuration: 100,
    size: new Rectangle(-100, -100, 200, 200)
})