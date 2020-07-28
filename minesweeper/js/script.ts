let board: HTMLDivElement = document.querySelector('#board');

let h: number = 20;
let w: number = 20;

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
        let newLine: HTMLDivElement = document.createElement('div');
        for (let j: number = 0; j < w; j++) {
            let newNode: HTMLDivElement = document.createElement('div');
            let currNode: { isMine: boolean; mineNum: number } = grid[i][j];
            newNode.classList.add('node');
            if (currNode.isMine) 
                newNode.classList.add('mine');
            newNode.id = `${ i }-${ j }`;
            newLine.appendChild(newNode);
        }
        board.appendChild(newLine)
    }
}

init();