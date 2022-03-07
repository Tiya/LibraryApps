//Accessing Mongose package
const mongoose=require('mongoose');

//Database connection
// mongoose.connect('mongodb://localhost:27017/library');
mongoose.connect('mongodb+srv://tiyamartin:Tiya.7256@tiyadatabase.bn7ry.mongodb.net/libraryApp?retryWrites=true&w=majority');
//Schema definition
const Schema= mongoose.Schema;

const BookSchema=new Schema({
    title: String,
    author: String,
    genre: String,
    image: String
});

//Model creation
var Bookdata= mongoose.model('bookdata',BookSchema);
module.exports=Bookdata;
