
const { resetCanvasSmoothing } = require('../loadImageToCanvas/loadImageToCanvas');
const { createText } = require('./createText/createText');

function createTextParsedImage(canv, ctx, src, value) {

    let virtualCanv = document.createElement('canvas');
    let ctx1 = virtualCanv.getContext('2d')
    console.log({src})

    let img = new Image;

    img.onload = function() {
        var fw = (img.width / value)|0,
            fh = (img.height / value)|0;
        
        newFw = fw;
        newFh = fh;

        let newHeight = img.height / (img.width / 500); 

        ctx1 = resetCanvasSmoothing(ctx1);
        virtualCanv.width = fw;
        virtualCanv.height = fh;


        ctx1.drawImage(img, 0, 0,  fw, fh);
        ctx1 = resetCanvasSmoothing(ctx1);
        // document.body.appendChild(virtualCanv)
        // console.log()
        // 

        let text = createText(virtualCanv, ctx1)
    }

    img.src = src;
}

module.exports = {
    createTextParsedImage
}