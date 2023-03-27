let mongoose=require("mongoose");

let userSchema=mongoose.Schema({
    name :String,
    email :String,
    gender :String,
    password :String,
    age :Number,
    city :String,
    is_married : Boolean
},{
    versionKey:false
})

let UserModel=mongoose.model("user",userSchema);

module.exports={UserModel}