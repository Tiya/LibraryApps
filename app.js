const express=require(`express`);
const app=express();
const multer = require('multer');
const path = require('path');

const nav=[
  {
    link:'/books',name:'Books'
  },
  {
    link:'/authors',name: 'Authors'
  },
  {
    link:'/admin',name: 'Add Book'
  }
];

const booksRouter=require('./src/routes/bookRoutes')(nav)
const adminRouter=require('./src/routes/adminRoutes')(nav)

app.use(express.urlencoded({extended:true}));
app.use(express.static('./public'));
app.set('view engine','ejs');
app.set('views',__dirname+'/src/views')
app.use('/books',booksRouter);
app.use('/admin', adminRouter);

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