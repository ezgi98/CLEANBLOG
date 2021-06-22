const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const fs = require('fs');
const fileUpload = require('express-fileupload');
const ejs = require('ejs');
const bodyParser = require("body-parser");
const Photo = require('./models/Photo');

mongoose.connect('mongodb://localhost/pcat-test-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//Template Engine
app.set("view engine", "ejs");

//MIDDLEWARES
app.use(fileUpload());              // save as an middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/', async (req, res) => {
    const photos = await Photo.find({})
    res.render('index', {
        photos
    })
});

app.get('/photos/:id', async (req, res) => {
    console.log(req.params.id);
    const photo = await Photo.findById(req.params.id);
    res.render('photo', { photo });
    //res.render('about');
})

app.get('/about', (req, res) => {
    res.render('about');
})
app.get('/add', (req, res) => {
    res.render('add');
})

app.post('/photos', async (req, res) => {
    const uploadDir = 'public/uploads';

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }

    let uploadeImage = req.files.image;
    let uploadPath = __dirname + '/public/uploads/' + uploadeImage.name;

    uploadeImage.mv(uploadPath, async () => {
        await Photo.create({
            ...req.body,
            image: '/uploads/' + uploadeImage.name,
        });
        res.redirect('/');
    });
});


const port = 3000;
app.listen(port, () => {
    console.log(`Sunucu ${port} portunda başlatıldı..`);
});