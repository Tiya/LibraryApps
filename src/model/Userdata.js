//Accessing Mongose package
const mongoose=require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const emailValidator=require('email-validator');

//Database connection
// mongoose.connect('mongodb://localhost:27017/library');
mongoose.connect('mongodb+srv://tiyamartin:Tiya.7256@tiyadatabase.bn7ry.mongodb.net/libraryApp?retryWrites=true&w=majority');
//Schema definition
const Schema= mongoose.Schema;

const UserSchema=new Schema({
    // name: String,
    // email: String,
    // password: String,
    // phone: String,
    name:{
        type: String,
        required: true,
        trim: true,
        index:{ unique:true},
        minlength:3,
    },
    email:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        index:{ unique:true},
        validate:{
            validator: emailValidator.validate,
            message: props=>`${props.value} is not a valid email address`,
        },
    },
    password:{
        type: String,
        required: true,
        trim: true,
        index:{ unique:true},
        minlength:8,
    },
});

UserSchema.plugin(passportLocalMongoose);
//Model creation
var Userdata= mongoose.model('userdata',UserSchema);
module.exports=Userdata;
