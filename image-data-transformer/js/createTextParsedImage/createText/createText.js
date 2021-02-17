function createText(canv, ctx) {
    ctx = canv.getContext('2d')
    document.body.appendChild(canv)
    let imgData = ctx.createImageData(canv.height, canv.width).data;
    console.log(imgData)
}

module.exports = {
    createText
}