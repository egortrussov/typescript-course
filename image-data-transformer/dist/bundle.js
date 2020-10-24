/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/*!*******************!*\
  !*** ./js/app.js ***!
  \*******************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
eval("const imgForm = document.querySelector('#image-form');\r\nconst preview = document.querySelector('#preview')\r\nconst canv = document.querySelector('#canv');\r\nconst rangeInput = document.querySelector('#pixelate-value');\r\n\r\nlet ctx = canv.getContext('2d');\r\n\r\nctx.imageSmoothingEnabled =false;\r\nctx.webkitImageSmoothingEnabled = false;\r\nctx.mozImageSmoothingEnabled = false;\r\n\r\nlet img = new Image;\r\nlet src = '';\r\n\r\nfunction loadImgToCanvas(value) {\r\n\r\n    img.onload = function() {\r\n        // console.log(img)\r\n        var fw = (img.width / value)|0,\r\n            fh = (img.height / value)|0;\r\n\r\n        let newHeight = img.height / (img.width / 500);\r\n        \r\n        // img.width = 500;\r\n        // img.height = Math.round(newHeight);\r\n\r\n        \r\n\r\n        var oc = document.createElement('canvas'),\r\n        octx = oc.getContext('2d');\r\n\r\n        console.log(img)\r\n        // ctx.imageSmoothingEnabled = true;\r\n        ctx.imageSmoothingEnabled = false;\r\n        canv.width = 500;\r\n        canv.height = newHeight\r\n        ctx.drawImage(img, 0, 0,  fw, fh);\r\n        ctx.imageSmoothingEnabled = false;\r\n        // ctx.width = 500;\r\n        // ctx.height = 500;\r\n\r\n        ctx.drawImage(canv, 0, 0, fw, fh, 0, 0, 500, newHeight);\r\n        ctx.imageSmoothingEnabled = false;\r\n    }\r\n\r\n    img.src = src\r\n}\r\n\r\nimgForm.addEventListener('submit', (e) => {\r\n    e.preventDefault()\r\n\r\n    let formData = new FormData(imgForm);\r\n\r\n    let input = formData.get('image');\r\n\r\n    console.log(input)\r\n\r\n    const reader = new FileReader();\r\n\r\n    reader.onloadend = function () {\r\n        // preview.src = reader.result;\r\n\r\n        src = reader.result;\r\n\r\n        loadImgToCanvas(20)\r\n    }\r\n\r\n    reader.readAsDataURL(input);\r\n})\r\n\r\nrangeInput.addEventListener(\"change\", (e) => {\r\n    let val = e.target.value;\r\n    console.log(val)\r\n    loadImgToCanvas(val)\r\n})\n\n//# sourceURL=webpack://image-data-transformer/./js/app.js?");
/******/ })()
;