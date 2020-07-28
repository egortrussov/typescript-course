var board = document.querySelector('#board');
var h = 20;
var w = 20;
var grid = [];
function init() {
    for (var i = 0; i < h; i++) {
        var gridLine = [];
        for (var j = 0; j < w; j++) {
            var choice = Math.floor(Math.random() * 10);
            var newNode = { isMine: choice === 1, mineNum: 0 };
            gridLine.push(newNode);
        }
        grid.push(gridLine);
    }
    for (var i = 0; i < h; i++) {
        var newLine = document.createElement('div');
        for (var j = 0; j < w; j++) {
            var newNode = document.createElement('div');
            var currNode = grid[i][j];
            newNode.classList.add('node');
            if (currNode.isMine)
                newNode.classList.add('mine');
            newNode.id = i + "-" + j;
            newLine.appendChild(newNode);
        }
        board.appendChild(newLine);
    }
}
init();
