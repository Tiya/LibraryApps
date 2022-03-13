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
    link:'/login',name: 'Login'
  }
];

const booksRouter=require('./src/routes/bookRoutes')(nav)
const adminRouter=require('./src/routes/adminRoutes')(nav)
const signupRouter=require('./src/routes/signupRoutes')(nav)
const loginRouter=require('./src/routes/loginRoutes')(nav)
const authorsRouter=require('./src/routes/authorsRoutes')(nav)
const authorslistRouter=require('./src/routes/authorslistRoutes')(nav)

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

app.listen(5000);