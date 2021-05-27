const express = require('express');
const path = require('path');
const app = express();
const ejs = require('ejs');

//Template Engine
app.set("view engine", "ejs");
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
})
app.get('/about', (req, res) => {
    res.render('about');
})
app.get('/add', (req, res) => {
    res.render('add');
})

const port = 3000;
app.listen(port, () => {
    console.log(`Sunucu ${port} portunda başlatıldı..`);
});