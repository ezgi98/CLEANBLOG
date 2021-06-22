const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pcat-test-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const ejs = require('ejs');
const bodyParser = require("body-parser");
const Photo = require('./models/Photo');
//Template Engine
app.set("view engine", "ejs");
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.urlencoded({ extended: true }))
// app.use(express.json())

// app.get('/', (req, res) => {
//     res.render('index');
// })

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
    console.log("eeee");
    console.log(req.body);
    await Photo.create(req.body);
    res.redirect('/');
})

const port = 3000;
app.listen(port, () => {
    console.log(`Sunucu ${port} portunda başlatıldı..`);
});