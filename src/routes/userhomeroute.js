const express = require('express'); 
const userhomeRouter = express.Router();
const Bookdata = require('../model/Bookdata');
userhomeRouter.use(express.static('./public'));
const Authordata = require('../model/Authordata');

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
            books,
            user:false,
          });
        })
        
    
  })

  userhomeRouter.get('/books/:id',function(req,res){
    const id=req.params.id;
     Bookdata.findOne({_id:id})
     .then(function(book){
       res.render('userbooks',{
         nav,
         title:"Library",
         book
       });
     })
    
   });

   userhomeRouter.get('/authorslist',function(req,res){
    Authordata.find()
    .then(function(authors){
      res.render("authorslist",{
        nav,
        title:"Authors List",
        authors,
        user:false,
      });
    })  
  });

  userhomeRouter.get('/authorslist/:id',function(req,res){
    const id=req.params.id;
    Authordata.findOne({_id:id})
     .then(function(author){
       res.render('author',{
         nav,
         title:"Library",
         author,
         user:false,
       });
     })
    
   });

return userhomeRouter
}

module.exports = router;