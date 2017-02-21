
var router=require('express').Router();
var mUser = require('../models/user')

router.get('/signup',function(req,res){

    res.render('accounts/signup.ejs', {
        errors: req.flash('errors')
    });

});

router.post('/signup',function(req,res,next){
    var user = new mUser();
    user.profile.name=req.body.name;
    user.email=req.body.email;
    user.password=req.body.pass;

    mUser.findOne({email:req.body.email},function(err,existingUser){
      //  if(err){return handleError(err);}
        if(existingUser){  req.flash('errors','Account already exists'); return res.redirect('/signup');}
        else{
            if(err){next(err);}
            else{
                user.save(function(err,user){
                    if(err) return next(err);
                    res.redirect('/')
                });

            }
        }
    });

});

module.exports= router;


// router.post('/signup',function(req,res,next){
//     var user=new modelUser();
//     user.profile.name= req.body.name;
//     user.email=req.body.email;
//     user.password= req.body.pass;

//     user.save(function(err){
//         if(err) return next(err);

//         res.json("Succussfully Created");

//     });

// });