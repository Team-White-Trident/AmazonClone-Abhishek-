var express = require('express');
var morgan = require('morgan');
var mongoose= require('mongoose');
var modelUser= require('./models/user');
var bodyParser= require('body-parser');
var ejs= require('ejs');
var ejs_mate = require('ejs-mate');
var session= require('express-session');
var cookieParser=require('cookie-parser');
var expressflash= require('express-flash');

var app = express();
mongoose.connect('mongodb://root:abc123@ds153729.mlab.com:53729/amazoncloneabhishek',function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Connected to the database");
    }
});
//using middleware
app.use(express.static( __dirname+'/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
    resave:true,
    saveUninitialized: true,
    secret:"Abhishek@$%&"
}));
app.use(expressflash());

app.engine('ejs',ejs_mate);
app.set('view-engine','ejs');

var mainRoutes=require('./routes/main');
var userRoutes=require('./routes/user');
app.use(mainRoutes);
app.use(userRoutes);



// app.get('/', function(req, res) {
//     var name = 'Batman';
//     res.json("My name is " + name);
// });
 
// app.get('/contactus', function(req, res) {
//     var contact_us = 'abhishek.saharn@gmail.com';
//     res.json("Contact us at: " + contact_us);
// });


app.listen(3000, function(errs) {
    if (errs) throw errs;
    console.log("Server is listening port 3000");
});