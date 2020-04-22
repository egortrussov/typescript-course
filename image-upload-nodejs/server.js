const express = require('express')
const multer = require('multer')
const cors = require('cors');

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

app.listen(process.env.PORT || 5000, () => {
    console.log('Server running...')
})