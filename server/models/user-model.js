const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
firstname:{
   type:String,
   required:true
},
lastname:{
  type: String  
} , 
email : {
    type: String,
    required: true,
    unique: true
},
address: {
   type: String,
   required: true,
},
city : {
   type: String,
   required: true,
},
phonenumber : {
   type:String,
   required: true,
},
password: {
    type: String,
    required: true
},
program : {
   type: String,
   required: true,
},
feedback: {
   type: String,
   required: true,
},
isAdmin:{
   type:Boolean,
   default:false,

}
});


userSchema.pre("save",async function(next){
   const user = this;
   if(!user.isModified("password")){
      return next();
   }
   try{
      const saltRound = await bcrypt.genSalt(10);
       let hashedPassword= await bcrypt.hash(user.password , saltRound);
       user.password = hashedPassword ;
   }catch(error){
      next(error);
   }
})

const Jwt_secrate = "mytoken";
//json web token
userSchema.methods.generateToken = async function(){
   try{
      return jwt.sign({
         userId:this._id.toString(),
         email:this.email,
         isAdmin:this.isAdmin,
      },
      Jwt_secrate,{
         expiresIn:"30days"
      }

      );
   }catch(error){
      console.error(error);
   }
};

//define the model or the collection name
const User = new mongoose.model('User',userSchema)

module.exports = User;

