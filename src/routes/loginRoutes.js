var express=require("express");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");

const admin = require('../data/adminUser');
const users = require('../data/users');

const loginRouter=express.Router();

// loginRouter.use(require("express-session")({
//     secret: "Rusty is a dog",
//     resave: false,
//     saveUninitialized: false
// }));
 
// loginRouter.use(passport.initialize());
// loginRouter.use(passport.session());
 
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
function router(nav){
// Showing secret page
loginRouter.get("/secret", isLoggedIn, function (req, res) {
    res.render("secret");
});

//Showing login form
loginRouter.get("/", function (req, res) {   
            res.render('login',{
              nav,
              title:'LogIn'             
          })     
});
 
//Handling user login
// loginRouter.post("/", passport.authenticate("local", {
//     successRedirect: "home",
//     failureRedirect: "login"
// }), function (req, res) {
// });
loginRouter.post("/sign",function(req,res){
var checkuser = {
    uid:req.body.email,
    pwd:req.body.password
};

console.log(checkuser);
var adminflag=false;
var userflag=false;

//    var flagg = user.find((e)=>{
   for(let i=0;i<admin.length;i++){
    
    if(checkuser.uid==admin[i].uid && checkuser.pwd==admin[i].pwd)
    {
        
        adminflag=true;
        break;
    }else if(checkuser.uid==users[i].uid && checkuser.pwd==users[i].pwd)
    {
        
        userflag=true;
        break;
    }else{

        adminflag=false;
        userflag=false;

    }
    };

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
// alert("User Verification Failed");
res.redirect("/signup");
}

});



//Handling user logout
loginRouter.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});
 
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
}
return loginRouter;
}
module.exports=router;    
console.log("server listening at login");