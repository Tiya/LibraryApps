var express=require("express");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");

const admin = require('../data/adminUser');
const users = require('../data/users');

const UserdataModel=require('../model/Userdata')

const loginRouter=express.Router();

//using passport
loginRouter.use(require("express-session")({
    secret: "Rusty is a dog",
    resave: false,
    saveUninitialized: true
}));
 
loginRouter.use(passport.initialize());
loginRouter.use(passport.session());
 


function router(nav){
//using without passport

//Showing login form
loginRouter.get("/", function (req, res) {   
            res.render('login',{
              nav,
              title:'LogIn'             
          })   
            
});
 
loginRouter.post("/sign",function(req,res){
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
            break;
        }
    }
    for(let i=0;i<userdata.length;i++){
        if(checkuser.uid==userdata[i].email && checkuser.pwd==userdata[i].password){
            userflag=true;
            break;
        }
    }
   
        console.log(adminflag);
        console.log(userflag);
        
        if(adminflag==true){
        console.log("Admin Verified.Click to continue");
        res.redirect("/home");
        }else if(userflag==true){
            console.log("user Verified.Click to continue");
            res.redirect("/userhome");
        }
        else{
        res.redirect("/signup");
        }
    
});

});

//Handling user logout
loginRouter.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});
 
return loginRouter;
}
module.exports=router;    
console.log("server listening at login");