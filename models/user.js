var mongoose=require('mongoose');
var bcrypt=require('bcrypt-nodejs');
///// The user schema attributes
var Schema=mongoose.Schema;
var userSchema = Schema({
    email: {type: String, unique: true, lowercase: true},
    password: {type:String},
     profile: {
         name: {type: String, default: ''},
         picture: {type: String, default: ''}
     },
     address: String,
     history: [{
         date: Date,
         price: {type: String, default: 0}
     }]

});

///// hashing password

userSchema.pre('save',function(next){             // pre is a builtin method in Mongoose. as a middleware it will preprocess the data before saving
  var user=this;
  if(!user.isModified('password')) return next();  // this pre hook is happening serialy so we use next method.

  bcrypt.genSalt(10,function(err,salt){            //a Salt is generated which is used for HASHins the password
      if(err)next(err);
      bcrypt.hash(user.password,salt,null,function(err,hash){      // at the end has will contain encrypted password
          
          if(err)return next(err);
          user.password=hash;
          next();
      });
  });

});

////// comparing password

userSchema.methods.comparPassword= function(password){    //when making you own methods use "methods" 
 
 return bcrypt.compareSync(password,this.password);

}
module.exports = mongoose.model('user',userSchema); 