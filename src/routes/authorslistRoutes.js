const express=require(`express`);
const authorlistRouter=express.Router();
const Authordata = require('../model/Authordata');
function router(nav){
  
    authorlistRouter.get('/',function(req,res){
        Authordata.find()
        .then(function(authors){
          res.render("authorslist",{
            nav,
            title:"Authors List",
            authors
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
          res.render('author',{
            nav,
            title:"Library",
            author
          });
        })
       
      });
      return authorlistRouter;
}


  module.exports=router;

