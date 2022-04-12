var express=require("express");
var alert = require('alert');
const { check,sanitizeBody } = require('express-validator');
const loginRouter=express.Router();
const { validationResult, matchedData } = require('express-validator');

loginRouter.use(express.static('./public'));

const admin = require('../data/adminUser');
const users = require('../data/users');
var userName;
const UserdataModel=require('../model/Userdata')

function router(nav){
//using without passport

//Showing login form
loginRouter.get("/", function (req, res) {   
            res.render('login',{
              nav,
              title:'LogIn'             
          })   
            
});
 
loginRouter.post("/sign", [
check('email').notEmpty().withMessage('Email Address required').isEmail().withMessage('Email format incorrect'),
check('password').trim().notEmpty().withMessage('Password required')
], function(req,res){

    const errors= validationResult(req);
    if(!errors.isEmpty()){
      var errMsg= errors.mapped();
      var inputData = matchedData(req);  
      res.render('login', {
        errors:errMsg, 
        inputData:inputData,
        title:"Login",
        nav
      });
    }else{
        var inputData = matchedData(req);  
       // insert query will be written here
    
var checkuser = {
    uid:req.body.email,
    pwd:req.body.password
};

console.log(checkuser);
var adminflag=false;
var userflag=false;
UserdataModel.find().then(function(userdata){
    for(let i=0;i<admin.length;i++){
        if(checkuser.uid==admin[i].uid && checkuser.pwd==admin[i].pwd){
            adminflag=true;
            userName='Admin';
            break;
        }
    }
    for(let i=0;i<userdata.length;i++){
        if(checkuser.uid==userdata[i].email && checkuser.pwd==userdata[i].password){
            userflag=true;
            userName=userdata[i].name;
            console.log(userName)
            break;
        }
    }
   
        console.log(adminflag);
        console.log(userflag);
        
        if(adminflag==true){
            alert(userName+' logged in successfully');
        res.redirect("/home");
        }else if(userflag==true){
            alert(userName+' logged in successfully');
            res.redirect("/userhome");
        }
        else{
            alert('Incorrect username or password. If not registered, please register here!!');
        res.redirect("/signup");
        }
    
});
    }
});

//Handling user logout
loginRouter.get("/logout", function (req, res) {
    console.log(userName);
    alert(userName+' logged out successfully');
    //req.logout();
    res.redirect("/");
});
 
return loginRouter;
}
module.exports=router;    
console.log("server listening at login");