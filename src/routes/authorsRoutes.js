const express = require('express'); 
var alert = require('alert');
const authorsRouter = express.Router();
// const authors = require('../data/authors');
const authordataModel = require('../model/Authordata');
const path = require('path');
var fs = require('fs');
const multer = require('multer');
 
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
      callback(null,'../LibraryApps/public/uploads/');
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

//router to render add authors page
function router(nav){
authorsRouter.get('/',function(req,res){

      
    authordataModel.find({}, (err, items) => {
    if (err) {
        console.log(err);
        res.status(500).send('An error occurred', err);
    }
    else {
       
        res.render('addauthor',{
          nav,
          title:'Add Authors'
          
      })
    }
});
})


//router to add author
authorsRouter.post('/add', upload.single(`image`),function (req, res) {

    var item={
        title:req.body.title,
        image: {
            data: fs.readFileSync(path.join('../LibraryApps/public/uploads/' + req.file.filename)), 
            contentType: 'image/png',
                },
        about:req.body.about
       
    }
    authordataModel.create(item, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(item);
            const author = authordataModel(item);
            author.save();
            alert(author.title+' details added successfully');
            res.redirect('/authorslist');
        }
    })

});

return authorsRouter;
}

module.exports = router;
console.log("server listening at authors");
