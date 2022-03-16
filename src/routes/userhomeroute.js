const express = require('express'); 
const userhomeRouter = express.Router();
function router(nav){


userhomeRouter.get('/',function(req,res){

  res.render('home', {
      nav,
      title:"Library App"
    });
  
})

return userhomeRouter
}

module.exports = router;