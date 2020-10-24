const imgForm = document.querySelector('#image-form');
const preview = document.querySelector('#preview')
const canv = document.querySelector('#canv');
const rangeInput = document.querySelector('#pixelate-value');

let ctx = canv.getContext('2d');

ctx.imageSmoothingEnabled =false;
ctx.webkitImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;

let img = new Image;
let src = '';

function loadImgToCanvas(value) {

    img.onload = function() {
        // console.log(img)
        var fw = (img.width / value)|0,
            fh = (img.height / value)|0;

        let newHeight = img.height / (img.width / 500);
        
        // img.width = 500;
        // img.height = Math.round(newHeight);

        

        var oc = document.createElement('canvas'),
        octx = oc.getContext('2d');

        console.log(img)
        // ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingEnabled = false;
        canv.width = 500;
        canv.height = newHeight
        ctx.drawImage(img, 0, 0,  fw, fh);
        ctx.imageSmoothingEnabled = false;
        // ctx.width = 500;
        // ctx.height = 500;

        ctx.drawImage(canv, 0, 0, fw, fh, 0, 0, 500, newHeight);
        ctx.imageSmoothingEnabled = false;
    }

    img.src = src
}

imgForm.addEventListener('submit', (e) => {
    e.preventDefault()

    let formData = new FormData(imgForm);

    let input = formData.get('image');

    console.log(input)

    const reader = new FileReader();

    reader.onloadend = function () {
        // preview.src = reader.result;

        src = reader.result;

        loadImgToCanvas(20)
    }

    reader.readAsDataURL(input);
})

rangeInput.addEventListener("change", (e) => {
    let val = e.target.value;
    console.log(val)
    loadImgToCanvas(val)
})