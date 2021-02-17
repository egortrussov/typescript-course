function resetCanvasSmoothing(ctx) {
    ctx.imageSmoothingEnabled =false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;

    return ctx;
}

function loadImgToCanvas(canv, ctx, src, value) {
    img = new Image;
    let newFw = 0, newFh = 0;

    img.onload = function() {
        var fw = (img.width / value)|0,
            fh = (img.height / value)|0;
        
        newFw = fw;
        newFh = fh;

        let newHeight = img.height / (img.width / 500); 

        ctx = resetCanvasSmoothing(ctx);
        canv.width = 500;
        canv.height = newHeight;


        ctx.drawImage(img, 0, 0,  fw, fh);
        ctx = resetCanvasSmoothing(ctx);
        ctx.drawImage(canv, 0, 0, fw, fh, 0, 0, 500, newHeight);
        console.log(ctx)
        ctx = resetCanvasSmoothing(ctx);

        console.log(ctx)
    }

    img.src = src

    console.log(newFw)

    return { fw: newFw, fh: newFh };
}

module.exports = {
    loadImgToCanvas,
    resetCanvasSmoothing
};