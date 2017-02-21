
var mongoose= require('mongoose')
mongoose.connect('mongodb://testuser:12345678@ds153729.mlab.com:53729/amazoncloneabhishek',function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Connected to the database");
    }
});