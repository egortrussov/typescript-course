let board: HTMLDivElement = document.querySelector('#board');

let h: number = 20;
let w: number = 20;
let isPlaying: boolean = true;

interface Node {
    isMine: boolean,
    mineNum: number
}

interface NodeConstructor {
    new (isMine: boolean, mineNum: number): Node;
}

let grid: ({ isMine: boolean; mineNum: number }[])[] = [];

function init(): void {
    for (let i: number = 0; i < h; i++) {
        let gridLine: { isMine: boolean; mineNum: number }[] = [];

        for (let j: number = 0; j < w; j++) {
            let choice: number = Math.floor(Math.random() * 10);
            let newNode = { isMine: choice === 1, mineNum: 0 };
            gridLine.push(newNode)
        }

        grid.push(gridLine);
    }

    for (let i: number = 0; i < h; i++) {
        for (let j: number = 0; j < w; j++) {   
            let mineNum: number = 0;
            if (i) 
                if (grid[i - 1][j].isMine) mineNum++;
            if (j) 
                if (grid[i][j - 1].isMine) mineNum++;
            if (i && j) {
                if (grid[i - 1][j - 1].isMine) mineNum++;
            }
            if (i < w - 1 && j) {
                if (grid[i + 1][j - 1].isMine) mineNum++;
            }
            if (i < h - 1) 
                if (grid[i + 1][j].isMine) mineNum++;
            if (j < w - 1) 
                if (grid[i][j + 1].isMine) mineNum++;
            if (i && j < h - 1) {
                if (grid[i - 1][j + 1].isMine) mineNum++;
            }
            if (i < w - 1 && j < h - 1) {
                if (grid[i + 1][j + 1].isMine) mineNum++;
            }
            grid[i][j].mineNum = mineNum;
        }
    }

    for (let i: number = 0; i < h; i++) {
        let newLine: HTMLDivElement = document.createElement('div');
        for (let j: number = 0; j < w; j++) {
            let newNode: HTMLDivElement = document.createElement('div');
            let currNode: { isMine: boolean; mineNum: number } = grid[i][j];
            newNode.classList.add('node');
            if (currNode.isMine) 
                newNode.classList.add('mine');
            newNode.id = `${ i }-${ j }`;
            
            newNode.addEventListener('click', function(e: Event): void {
                if (currNode.isMine) {
                    gameOver();
                    return;
                }

                let target: HTMLDivElement = <HTMLDivElement>e.target;
                target.innerHTML = currNode.mineNum.toString();
            })

            newLine.appendChild(newNode);
        }
        board.appendChild(newLine)
    }
}

function gameOver(): void {
    isPlaying = false;
    alert('Game over!')
} 

init();