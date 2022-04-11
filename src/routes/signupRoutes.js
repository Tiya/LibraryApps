var express=require("express");
var alert = require('alert');
const validationRule= require('../middlewares/validation-rule');
const signupRouter=express.Router();
const { validationResult, matchedData } = require('express-validator');

signupRouter.use(express.static('./public'));

var userDataModel = require('../model/Userdata');

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
            })
          }
      });
    })

    signupRouter.post('/register', validationRule.form, function(req,res){
    // res.send("Hey I am Added");
  
      const errors= validationResult(req);
      if(!errors.isEmpty()){
        var errMsg= errors.mapped();
        var inputData = matchedData(req);  
        res.render('signup', {
          errors:errMsg, 
          inputData:inputData,
          title:"Register",
          nav
        });
  
       }else{
          var inputData = matchedData(req);  
         // insert query will be written here
         
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
                
                alert('User registered successfully');
                return res.redirect('/login');
                
                
              }
            }
        });
       
      }
      
  

    //validation
  
    
});

  return signupRouter;
}
  
  module.exports=router;    
console.log("server listening at signup");
