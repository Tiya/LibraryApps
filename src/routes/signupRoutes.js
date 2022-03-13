var express=require("express");

const signupRouter=express.Router();


var userDataModel = require('../model/Userdata');

function router(nav){
    signupRouter.get('/',function(req,res){
       
    
      userDataModel.find({}, (err, items) => {
          if (err) {
              console.log(err);
              res.status(500).send('An error occurred', err);
          }
          else {
              res.render('signup',{
                nav,
                title:'Register'
                
            })
          }
      });
    })

    signupRouter.post('/register', function(req,res){
    // res.send("Hey I am Added");
   
    var item={
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone
    }

    userDataModel.create(item, (err, item) => {
      if (err) {
          console.log(err);
      }
      else {
          console.log(item);
        var user=userDataModel(item);
        user.save();
        res.redirect('/books');
      }
  });
});
  return signupRouter;
}
  
  module.exports=router;    
console.log("server listening at signup");
