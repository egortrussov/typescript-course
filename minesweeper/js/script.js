var board = document.querySelector('#board');
var h = 20;
var w = 20;
var isPlaying = true;
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
        for (var j = 0; j < w; j++) {
            var mineNum = 0;
            if (i)
                if (grid[i - 1][j].isMine)
                    mineNum++;
            if (j)
                if (grid[i][j - 1].isMine)
                    mineNum++;
            if (i && j) {
                if (grid[i - 1][j - 1].isMine)
                    mineNum++;
            }
            if (i < w - 1 && j) {
                if (grid[i + 1][j - 1].isMine)
                    mineNum++;
            }
            if (i < h - 1)
                if (grid[i + 1][j].isMine)
                    mineNum++;
            if (j < w - 1)
                if (grid[i][j + 1].isMine)
                    mineNum++;
            if (i && j < h - 1) {
                if (grid[i - 1][j + 1].isMine)
                    mineNum++;
            }
            if (i < w - 1 && j < h - 1) {
                if (grid[i + 1][j + 1].isMine)
                    mineNum++;
            }
            grid[i][j].mineNum = mineNum;
        }
    }
    for (var i = 0; i < h; i++) {
        var newLine = document.createElement('div');
        var _loop_1 = function (j) {
            var newNode = document.createElement('div');
            var currNode = grid[i][j];
            newNode.classList.add('node');
            if (currNode.isMine)
                newNode.classList.add('mine');
            newNode.id = i + "-" + j;
            newNode.addEventListener('click', function (e) {
                if (currNode.isMine) {
                    gameOver();
                    return;
                }
                var target = e.target;
                target.innerHTML = currNode.mineNum.toString();
            });
            newLine.appendChild(newNode);
        };
        for (var j = 0; j < w; j++) {
            _loop_1(j);
        }
        board.appendChild(newLine);
    }
}
function gameOver() {
    isPlaying = false;
    alert('Game over!');
}
init();
