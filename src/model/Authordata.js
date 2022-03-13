const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://tiyamartin:Tiya.7256@tiyadatabase.bn7ry.mongodb.net/libraryApp?retryWrites=true&w=majority');

const Schema = mongoose.Schema;


const AuthorSchema = new Schema({
    title : String,
    image:{
        data: Buffer,
        contentType: String
    },
    about: String
});

const Authordata = mongoose.model('authordata',AuthorSchema);

module.exports = Authordata;