const express = require('express')
const multer = require('multer')
const cors = require('cors');
const http = require('http');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(cors());

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage: storage
}) 

app.post('/upload', upload.single('photo'), (req, res) => {
    if (req.file) {
        res.json({ text: 'Success!' })
    } else {
        res.json({ text: 'Error' })
    }
})

app.get('/file', (req, res) => {
    var filePath = path.join(__dirname, '/uploads/05.03.2019, 19 48 08.jpg');
    res.header({
        'Content-Type': 'image/jpeg'
    })
    res.sendFile(filePath)

    // fs.readFile(
    //     path.join(__dirname, '/uploads/05.03.2019, 19 48 08.jpg'), 'base64',
    //     (err, base64Image) => {
    //         // 2. Create a data URL
    //         const dataUrl = `data:image/jpeg;base64, ${base64Image}`
    //         return res.send(`<img src=${dataUrl}>`);
    //     }
    // );
})

app.listen(process.env.PORT || 5000, () => {
    console.log('Server running...')
})