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
                title:'Register',
                success: req.query.success
            })
          }
      });
    })

    signupRouter.post('/register', function(req,res,next){
    // res.send("Hey I am Added");
   try{
    var item={
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
     
    }
    userDataModel.create(item, (err, item) => {
      if (err) {
          console.log(err);
      }
      else {
          console.log(item);
        var user=userDataModel(item);
        const savedUser= user.save();
        if(savedUser){
        return res.redirect('/login?success=true');
        }else{
          return next(new Error('Failed to save user'));
        }
      }
  });
  }catch(err){
    return next(err);
  }
    
});
  return signupRouter;
}
  
  module.exports=router;    
console.log("server listening at signup");
