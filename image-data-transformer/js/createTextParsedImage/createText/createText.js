

function getGreyScale(r, g, b) {
    return Math.floor((r + g + b) / 3);
}

function createText(canv, ctx) {
    let imgData = ctx.getImageData(0, 0, canv.height, canv.width).data;
    let width = canv.height;
    
    let vals = [];
    
    for (let i = 0; i < imgData.length / 4; i++) {
        if (i % width === 0) vals.push([]);
        vals[vals.length - 1].push(getGreyScale(imgData[i * 4], imgData[i * 4 + 1], imgData[i * 4 + 2]))
    }

    // let codes = [176, 177, 178, 179];
    let codes = ['░', '▒', '▓', '█'];
    codes = codes.reverse()
    let depth = codes.length;

    let text = []

    console.log(vals)

    for (let i = 0; i < vals.length; i++) {
        text.push([]);

        for (let j = 0; j < vals[i].length; j++) {
            let inx = Math.floor(vals[i][j] / (255 / depth));
            // console.log(code)

            inx = Math.max(0, inx);
            inx = Math.min(depth - 1, inx);

            text[text.length - 1].push(codes[inx]);
        }
    }

    let cont = document.querySelector('.text-container');

    cont.innerHTML = '';

    for (let i = 0; i < text.length; i++) {
        let div = document.createElement('div');

        let row = '';

        for (let j = 0; j < text[i].length; j++) {
            row += text[i][j];
        }

        console.log(row)

        div.innerText = row;

        cont.appendChild(div)
    }

    console.log(text)
}

module.exports = {
    createText
}