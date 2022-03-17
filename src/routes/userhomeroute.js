const express = require('express'); 
const userhomeRouter = express.Router();
const Bookdata = require('../model/Bookdata');

function router(nav){
userhomeRouter.get('/',function(req,res){

  res.render('home', {
      nav,
      title:"Library App"
    });
  
})

userhomeRouter.get('/books',function(req,res){

    Bookdata.find()
        .then(function(books){
          res.render("books",{
            nav,
            title:"Books List",
            books
          });
        })
        
    
  })

  userhomeRouter.get('/:id',function(req,res){
    const id=req.params.id;
     Bookdata.findOne({_id:id})
     .then(function(book){
       res.render('book',{
         nav,
         title:"Library",
         book
       });
     })
    
   });

return userhomeRouter
}

module.exports = router;