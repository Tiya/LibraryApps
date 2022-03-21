var express=require("express");

const signupRouter=express.Router();

const session = require('express-session');
const flash = require('connect-flash');

var userDataModel = require('../model/Userdata');

signupRouter.use(session({
  secret:'tiyamartin',
  saveUninitialized: true,
  resave: true,
  cookie: { maxAge: 60000 }
}));
signupRouter.use(flash());

signupRouter.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

function router(nav){
  signupRouter.get('/login',function(req,res){

    res.render('login',{
      message: req.flash("success"),
      nav,
      title:'Login',
    })
  });

    signupRouter.get('/',function(req,res){
       
    
      userDataModel.find({}, (err, items) => {
          if (err) {
              console.log(err.code);
              res.status(500).send('An error occurred', err);          
          }
          else {
              res.render('signup',{
                nav,
                title:'Register',
                message: req.flash('success'),
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
          req.flash('success', 'Registration successfully');
          res.locals.message = req.flash();
          console.log(res.locals.message);
          res.redirect('/login');
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
