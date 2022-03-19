const express=require(`express`);
const booksRouter=express.Router();
const Bookdata = require('../model/Bookdata');
const multer = require('multer');
const path = require('path');
var fs = require('fs');

require("dotenv")
  .config();


// set up multer for storing uploaded files
const storage=multer.diskStorage({
  //destination for files
  destination:function(request,file,callback){
    callback(null,'../LibraryApps/public/uploads/images');
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
    
      booksRouter.get('/',function(req,res){
        Bookdata.find()
        .then(function(books){
          res.render("books",{
            nav,
            title:"Books List",
            books,
            user:true,
          });
        })
        
      
      });
      
      booksRouter.get('/:id',function(req,res){
       const id=req.params.id;
        Bookdata.findOne({_id:id})
        .then(function(book){
          res.render('book',{
            nav,
            title:"Library",
            book,
            user:true,
          });
        })
       
      });

//router to delete book
booksRouter.post('/delete', function (req, res) {

  const id = req.body.id;  
  
  Bookdata.findOneAndDelete({ _id: id })
    .then(function () {

     res.redirect('/books')

    })  
  })

 //router to edit book
 booksRouter.post('/edit', function (req, res) {

  Bookdata.findById(req.body.id, function(err, book){
      if (err) {
          throw err;
      }
      else {
        console.log("in edit book")
          res.render('editbook', {
            nav,
            title:"Edit Book",
            book
          })
      }
  })
})

  //router to update book
  booksRouter.post('/update', upload.single('image'), function (req, res) {
  
  if (req.file) {
    var updates={
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      image: {
        data: fs.readFileSync(path.join('../LibraryApps/public/uploads/images/' + req.file.filename)), 
        contentType: 'image/png',
            }
    }
  }
  
  Bookdata.findByIdAndUpdate(req.body.id, { $set: updates },function (err, data) {
    if (err) {
        res.json({ status: "Failed" });
    }
    else if (data.n == 0) {
        res.json({ status: "No match Found" });
    }
    else {
        res.redirect("/books")
    }

})  

});

      return booksRouter;
}


  module.exports=router;

