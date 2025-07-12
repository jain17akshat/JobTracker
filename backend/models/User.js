const mongoose=require('mongoose')


const UserSchema=new mongoose.Schema({

    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
      },
      
    name: {
        type:String,
        required:[true,"Please add a name"]
    },

    email:{
        type:String,
        required:[true,"Please add a email"],
        unique:true
    },


    password:{
        type:String,
        required:[true,"Please add a password"]
    },
},{timestamps:true});
module.exports=mongoose.model("User",UserSchema);