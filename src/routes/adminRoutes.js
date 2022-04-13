const express=require('express');
const adminRouter=express.Router();
const BookdataModel=require('../model/Bookdata')
const multer = require('multer');
const path = require('path');
var fs = require('fs');
var alert = require('alert');
require("dotenv")
  .config();
  var dir = './public/uploads';

  if (!fs.existsSync(dir)){
    console.log("new: "+dir);
      fs.mkdirSync(dir);
  }
  console.log("old: "+dir);

// set up multer for storing uploaded files
const storage=multer.diskStorage({
  //destination for files
  destination:function(request,file,callback){
    callback(null,'../LibraryApps/public/uploads');
  },
  //add back the extensions
  filename:function(request,file, callback){
  
    callback(null,file.fieldname+Date.now()+path.extname(file.originalname));
  }
})

//upload parameters for mutter
const upload = multer({ 
  storage: storage,
  limits:{
    fileSize: 1000000
  },
  fileFilter:function(req,file,callback){
    checkFileType(file, callback);
  }
});
//Check file type
function checkFileType(file, callback){

  // allowed extension
  const filetypes = /jpeg|jpg|png|gif/;
  //check extension
  const extname=filetypes.test(path.extname(file.originalname).toLowerCase());
  //check mime
  const mimetype=filetypes.test(file.mimetype);
  if(mimetype&&extname){
    return callback(null, true);
  }else{
    callback('Error: Images only');
  }
}

function router(nav){
adminRouter.get('/',function(req,res){
   

  BookdataModel.find({}, (err, items) => {
      if (err) {
          console.log(err);
          res.status(500).send('An error occurred', err);
      }
      else {
          //res.render('imagesPage', { items: items });
          res.render('addbook',{
            nav,
            title:'Library'
            
        })
      }
  });
})

adminRouter.post('/add',upload.single(`image`), function(req,res){
  // res.send("Hey I am Added");
 
  var item={
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    //image: req.file.image,
    image: {
      data: fs.readFileSync(path.join('../LibraryApps/public/uploads/' + req.file.filename)), 
      contentType: 'image/png',
          }
  }
  BookdataModel.create(item, (err, item) => {
    if (err) {
        console.log(err);
    }
    else {
      var book=BookdataModel(item);
      book.save();
      alert('Book '+book.title+' added successfully');
      res.redirect('/books');
    }
});
 

});

return adminRouter;
}

module.exports=router;