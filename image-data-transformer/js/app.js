const imgForm = document.querySelector('#image-form');
const canv = document.querySelector('#canv');
const rangeInput = document.querySelector('#pixelate-value');
const generateBtn = document.querySelector('#generate');

const { loadImgToCanvas } = require('./loadImageToCanvas/loadImageToCanvas');
const { createTextParsedImage } = require('./createTextParsedImage/createTextParsedImage');

let ctx = canv.getContext('2d');

let value = 100;
let pixelsData = { 
    fw: canv.width, 
    fh: canv.height 
}
let src = null;

imgForm.addEventListener('submit', (e) => {
    e.preventDefault()

    let formData = new FormData(imgForm);

    let input = formData.get('image');

    console.log(input)

    const reader = new FileReader();

    reader.onloadend = function () {
        src = reader.result;

        loadImgToCanvas(canv, ctx, src, value)
    }

    reader.readAsDataURL(input);
})

rangeInput.addEventListener("change", (e) => {
    let val = e.target.value;

    value = val;

    pixelsData = loadImgToCanvas(canv, ctx, src, val);
    createTextParsedImage(canv, ctx, src, value);
})

generateBtn.addEventListener("click", (e) => {
    let textImage = createTextParsedImage(canv);
})