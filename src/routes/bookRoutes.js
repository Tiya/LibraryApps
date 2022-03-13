const express=require(`express`);
const booksRouter=express.Router();
const Bookdata = require('../model/Bookdata');
function router(nav){
    // var books=[
    //     {
    //       title:'Tom and Jerry',
    //       author: 'Joseph Barbera',
    //       genre:'Cartoon',
    //       img:"tomjerry.jpg"
    //     },
    //     {
    //       title:'Harry Potter',
    //       author: 'JK Rowling',
    //       genre:'Fantasy',
    //       img:"harry.jfif"
    //     },
    //     {
    //       title:'Jungle Book',
    //       author: 'Joseph Barbera',
    //       genre:'Cartoon',
    //       img:"jungle.jpg"
    //     }
    //   ]

      
      booksRouter.get('/',function(req,res){
        Bookdata.find()
        .then(function(books){
          res.render("books",{
            nav,
            title:"Books List",
            books
          });
        })
        
      
      });
     
      // booksRouter.get('/single',function(req,res){
      //   res.send("Hey I am a single Book");
      // });
     
      booksRouter.get('/:id',function(req,res){
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

//router to delete book
booksRouter.post('/delete', function (req, res) {

  const id = req.body.id;  
  
  Bookdata.findOneAndDelete({ _id: id })
    .then(function () {

     res.redirect('/books')

    })  
  })

      return booksRouter;
}


  module.exports=router;

