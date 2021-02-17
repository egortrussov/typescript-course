/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/app.js":
/*!*******************!*\
  !*** ./js/app.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const imgForm = document.querySelector('#image-form');\r\nconst canv = document.querySelector('#canv');\r\nconst rangeInput = document.querySelector('#pixelate-value');\r\nconst generateBtn = document.querySelector('#generate');\r\n\r\nconst { loadImgToCanvas } = __webpack_require__(/*! ./loadImageToCanvas/loadImageToCanvas */ \"./js/loadImageToCanvas/loadImageToCanvas.js\");\r\nconst { createTextParsedImage } = __webpack_require__(/*! ./createTextParsedImage/createTextParsedImage */ \"./js/createTextParsedImage/createTextParsedImage.js\");\r\n\r\nlet ctx = canv.getContext('2d');\r\n\r\nlet value = 100;\r\nlet pixelsData = { \r\n    fw: canv.width, \r\n    fh: canv.height \r\n}\r\nlet src = null;\r\n\r\nimgForm.addEventListener('submit', (e) => {\r\n    e.preventDefault()\r\n\r\n    let formData = new FormData(imgForm);\r\n\r\n    let input = formData.get('image');\r\n\r\n    console.log(input)\r\n\r\n    const reader = new FileReader();\r\n\r\n    reader.onloadend = function () {\r\n        src = reader.result;\r\n\r\n        loadImgToCanvas(canv, ctx, src, value)\r\n    }\r\n\r\n    reader.readAsDataURL(input);\r\n})\r\n\r\nrangeInput.addEventListener(\"change\", (e) => {\r\n    let val = e.target.value;\r\n\r\n    value = val;\r\n\r\n    pixelsData = loadImgToCanvas(canv, ctx, src, val);\r\n    createTextParsedImage(canv, ctx, src, value);\r\n})\r\n\r\ngenerateBtn.addEventListener(\"click\", (e) => {\r\n    let textImage = createTextParsedImage(canv);\r\n})\n\n//# sourceURL=webpack://image-data-transformer/./js/app.js?");

/***/ }),

/***/ "./js/createTextParsedImage/createTextParsedImage.js":
/*!***********************************************************!*\
  !*** ./js/createTextParsedImage/createTextParsedImage.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\r\nconst { resetCanvasSmoothing } = __webpack_require__(/*! ../loadImageToCanvas/loadImageToCanvas */ \"./js/loadImageToCanvas/loadImageToCanvas.js\");\r\nconst { createText } = __webpack_require__(/*! ./createText/createText */ \"./js/createTextParsedImage/createText/createText.js\");\r\n\r\nfunction createTextParsedImage(canv, ctx, src, value) {\r\n\r\n    let virtualCanv = document.createElement('canvas');\r\n    let ctx1 = virtualCanv.getContext('2d')\r\n    console.log({src})\r\n\r\n    let img = new Image;\r\n\r\n    img.onload = function() {\r\n        var fw = (img.width / value)|0,\r\n            fh = (img.height / value)|0;\r\n        \r\n        newFw = fw;\r\n        newFh = fh;\r\n\r\n        let newHeight = img.height / (img.width / 500); \r\n\r\n        ctx1 = resetCanvasSmoothing(ctx1);\r\n        virtualCanv.width = fw;\r\n        virtualCanv.height = fh;\r\n\r\n\r\n        ctx1.drawImage(img, 0, 0,  fw, fh);\r\n        ctx1 = resetCanvasSmoothing(ctx1);\r\n        // document.body.appendChild(virtualCanv)\r\n        // console.log()\r\n        // \r\n\r\n        let text = createText(virtualCanv, ctx1)\r\n    }\r\n\r\n    img.src = src;\r\n}\r\n\r\nmodule.exports = {\r\n    createTextParsedImage\r\n}\n\n//# sourceURL=webpack://image-data-transformer/./js/createTextParsedImage/createTextParsedImage.js?");

/***/ }),

/***/ "./js/createTextParsedImage/createText/createText.js":
/*!***********************************************************!*\
  !*** ./js/createTextParsedImage/createText/createText.js ***!
  \***********************************************************/
/***/ ((module) => {

eval("\r\n\r\nfunction getGreyScale(r, g, b) {\r\n    return Math.floor((r + g + b) / 3);\r\n}\r\n\r\nfunction createText(canv, ctx) {\r\n    let imgData = ctx.getImageData(0, 0, canv.height, canv.width).data;\r\n    let width = canv.height;\r\n    \r\n    let vals = [];\r\n    \r\n    for (let i = 0; i < imgData.length / 4; i++) {\r\n        if (i % width === 0) vals.push([]);\r\n        vals[vals.length - 1].push(getGreyScale(imgData[i * 4], imgData[i * 4 + 1], imgData[i * 4 + 2]))\r\n    }\r\n\r\n    // let codes = [176, 177, 178, 179];\r\n    let codes = ['░', '▒', '▓', '█'];\r\n    codes = codes.reverse()\r\n    let depth = codes.length;\r\n\r\n    let text = []\r\n\r\n    console.log(vals)\r\n\r\n    for (let i = 0; i < vals.length; i++) {\r\n        text.push([]);\r\n\r\n        for (let j = 0; j < vals[i].length; j++) {\r\n            let inx = Math.floor(vals[i][j] / (255 / depth));\r\n            // console.log(code)\r\n\r\n            inx = Math.max(0, inx);\r\n            inx = Math.min(depth - 1, inx);\r\n\r\n            text[text.length - 1].push(codes[inx]);\r\n        }\r\n    }\r\n\r\n    let cont = document.querySelector('.text-container');\r\n\r\n    cont.innerHTML = '';\r\n\r\n    for (let i = 0; i < text.length; i++) {\r\n        let div = document.createElement('div');\r\n\r\n        let row = '';\r\n\r\n        for (let j = 0; j < text[i].length; j++) {\r\n            row += text[i][j];\r\n        }\r\n\r\n        console.log(row)\r\n\r\n        div.innerText = row;\r\n\r\n        cont.appendChild(div)\r\n    }\r\n\r\n    console.log(text)\r\n}\r\n\r\nmodule.exports = {\r\n    createText\r\n}\n\n//# sourceURL=webpack://image-data-transformer/./js/createTextParsedImage/createText/createText.js?");

/***/ }),

/***/ "./js/loadImageToCanvas/loadImageToCanvas.js":
/*!***************************************************!*\
  !*** ./js/loadImageToCanvas/loadImageToCanvas.js ***!
  \***************************************************/
/***/ ((module) => {

eval("function resetCanvasSmoothing(ctx) {\r\n    ctx.imageSmoothingEnabled =false;\r\n    ctx.webkitImageSmoothingEnabled = false;\r\n    ctx.mozImageSmoothingEnabled = false;\r\n\r\n    return ctx;\r\n}\r\n\r\nfunction loadImgToCanvas(canv, ctx, src, value) {\r\n    img = new Image;\r\n    let newFw = 0, newFh = 0;\r\n\r\n    img.onload = function() {\r\n        var fw = (img.width / value)|0,\r\n            fh = (img.height / value)|0;\r\n        \r\n        newFw = fw;\r\n        newFh = fh;\r\n\r\n        let newHeight = img.height / (img.width / 500); \r\n\r\n        ctx = resetCanvasSmoothing(ctx);\r\n        canv.width = 500;\r\n        canv.height = newHeight;\r\n\r\n\r\n        ctx.drawImage(img, 0, 0,  fw, fh);\r\n        ctx = resetCanvasSmoothing(ctx);\r\n        ctx.drawImage(canv, 0, 0, fw, fh, 0, 0, 500, newHeight);\r\n        console.log(ctx)\r\n        ctx = resetCanvasSmoothing(ctx);\r\n\r\n        console.log(ctx)\r\n    }\r\n\r\n    img.src = src\r\n\r\n    console.log(newFw)\r\n\r\n    return { fw: newFw, fh: newFh };\r\n}\r\n\r\nmodule.exports = {\r\n    loadImgToCanvas,\r\n    resetCanvasSmoothing\r\n};\n\n//# sourceURL=webpack://image-data-transformer/./js/loadImageToCanvas/loadImageToCanvas.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./js/app.js");
/******/ 	
/******/ })()
;