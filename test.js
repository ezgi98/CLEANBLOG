const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/pcat-test-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Photo = mongoose.model('Photo', PhotoSchema);

// Photo.create({
//     title: 'Photo Title 2',
//     description: 'Photo description 1 lorem ipsum',
// });