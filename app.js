const express=require(`express`);
const app=express();
const path = require('path');

const nav=[
  {
    link:'/books',name:'Books'
  },
  {
    link:'/authorslist',name: 'Authors'
  },
  {
    link:'/admin',name: 'Add Book'
  },
  {
    link:'/addauthor',name: 'Add Authors'
  },
  {
    link:'/signup',name: 'User Registration'
  },
  {
    link:'/login',name: 'Logout'
  }
];

const navPublic=[
 
  {
    link:'/signup',name: 'User Registration'
  },
  {
    link:'/login',name: 'Login'
  }
];

const navUser=[
 
  {
    link:'/books',name:'Books'
  },
  {
    link:'/authorslist',name: 'Authors'
  },
  {
    link:'/login',name: 'Logout'
  }
];

const booksRouter=require('./src/routes/bookRoutes')(nav)
const adminRouter=require('./src/routes/adminRoutes')(nav)
const signupRouter=require('./src/routes/signupRoutes')(navPublic)
const loginRouter=require('./src/routes/loginRoutes')(navPublic)
const authorsRouter=require('./src/routes/authorsRoutes')(nav)
const authorslistRouter=require('./src/routes/authorslistRoutes')(nav)
const homeRouter = require('./src/routes/homeroute')(nav)
const userhomeRouter = require('./src/routes/userhomeroute')(navUser)

app.use(express.urlencoded({extended:true}));
app.use(express.static('./public'));
app.set('view engine','ejs');
app.set('views',__dirname+'/src/views')
app.use('/books',booksRouter);
app.use('/admin', adminRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/addauthor', authorsRouter);
app.use('/authorslist', authorslistRouter);
app.use('/home',homeRouter); 
app.use('/userhome',userhomeRouter); 



app.get('/',function(req,res){
  //  res.send("Hello Welcome!!");
 // res.sendFile(__dirname+"/src/views/index.html")
 //res.render("index");
res.render("index",
{
  nav,
  title:"Library App"
});
});

// app.listen(5000);
app.listen(process.env.PORT || 5000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});