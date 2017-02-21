//it will contain js related to main page
var router=require('express').Router();


router.get('/',function(req,res){

    res.render('main/home.ejs');

});


module.exports=router;