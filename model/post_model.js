let mongoose=require("mongoose");

// {
//     "title":"String",
//     "body":"String",
//     "device":"String",
//     "no_of_comments":Number
// }

let postSchema=mongoose.Schema({
    title:String,
    body:String,
    device:String,
    no_of_comments:Number,
    userId:String
},{
    versionKey:false
})

let PostModel=mongoose.model("post",postSchema);

module.exports={PostModel}