let mongoose=require("mongoose")
let userSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String
},{
    versionkey:false
})

let UserModel=mongoose.model("user",userSchema)
module.exports={UserModel}