const express=require(`express`);
const authorlistRouter=express.Router();
const Authordata = require('../model/Authordata');
var alert = require('alert');
const path = require('path');
var fs = require('fs');
const multer = require('multer');

var authorName;
 
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
  
    authorlistRouter.get('/',function(req,res){
        Authordata.find()
        .then(function(authors){
          
          res.render("authorslist",{
            nav,
            title:"Authors List",
            authors,
            user:true,
          });
        })  
      });
      
     
      // booksRouter.get('/single',function(req,res){
      //   res.send("Hey I am a single Book");
      // });
     
      authorlistRouter.get('/:id',function(req,res){
       const id=req.params.id;
     
       Authordata.findOne({_id:id})
        .then(function(author){
          authorName= author.title;
          console.log(author.title)
          res.render('author',{
            nav,
            title:"Library",
            author,
            user:true,
          });
        })
       
      });


      //router to delete Author
      authorlistRouter.post('/delete', function (req, res) {

    const id = req.body.id;  
    
    Authordata.findOneAndDelete({ _id: id })
      .then(function () {
      alert(authorName+' deleted successfully');
       res.redirect('/authorslist')
  
      })  
    })
  

    //router to edit author
    authorlistRouter.post('/edit', function (req, res) {

  Authordata.findById(req.body.id, function(err, author){
      if (err) {
          throw err;
      }
      else {
        console.log("in edit")
          res.render('editauthor', {
            nav,
            title:"Library",
            author
          })
      }
  })
})

//router to update author
authorlistRouter.post('/update', upload.single('image'), function (req, res) {
  
  if (req.file) {
    var updates={
      title:req.body.title,
      image: {
          data: fs.readFileSync(path.join('../LibraryApps/public/uploads/images/' + req.file.filename)), 
          contentType: 'image/png',
              },
      about:req.body.about
     
  }
  }
  

  Authordata.findByIdAndUpdate(req.body.id, { $set: updates },function (err, data) {
    authorName=updates.title;
    if (err) {
        res.json({ status: "Failed" });
    }
    else if (data.n == 0) {
        res.json({ status: "No match Found" });
    }
    else {
      console.log(updates);
      alert(authorName+' details updated successfully');
        res.redirect("/authorslist")
    }

})  

});


      return authorlistRouter;
}


  module.exports=router;

