const imgForm = document.querySelector('#image-form');
const preview = document.querySelector('#preview')
const canv = document.querySelector('#canv');

let ctx = canv.getContext('2d');

function loadImgToCanvas(imgData) {
    let img = new Image;

    img.onload = function() {
        // console.log(img)
        var fw = (img.width / 10)|0,
            fh = (img.height / 10)|0;

        let newHeight = img.height / (img.width / 500);
        
        // img.width = 500;
        // img.height = Math.round(newHeight);

        var oc = document.createElement('canvas'),
        octx = oc.getContext('2d');

        console.log(img)
        // ctx.imageSmoothingEnabled = true;
        canv.width = 500;
        canv.height = newHeight
        octx.drawImage(img, 0, 0,  fw, fh);
        // ctx.width = 500;
        // ctx.height = 500;

        ctx.drawImage(oc, 0, 0, fw, fh, 0, 0);
    }

    img.src = imgData;
}

imgForm.addEventListener('submit', (e) => {
    e.preventDefault()

    let formData = new FormData(imgForm);

    let input = formData.get('image');

    console.log(input)

    const reader = new FileReader();

    reader.onloadend = function () {
        // preview.src = reader.result;

        loadImgToCanvas(reader.result)
    }

    reader.readAsDataURL(input);
})