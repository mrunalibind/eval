let express=require("express");
let postRouter=express.Router();
var jwt = require('jsonwebtoken');

let {PostModel}=require("../model/post_model")

postRouter.post("/add",async(req,res)=>{
    try {
        let post=new PostModel(req.body);
        await post.save();
        res.status(200).send({"msg":"Post has been created"})
    } catch (error) {
        res.status(400).send({"msg":error.msg})
    }
})

postRouter.get("/",async(req,res)=>{
    let token=req.headers.authorization;
    let {id}=req.query;
    if(id){
        let note=await PostModel.find({_id:id})
        res.send(note);
    }
    else{
        jwt.verify(token, 'eval', async function(err, decoded) {
            if(decoded){
                let user=decoded.userId;
                let note=await PostModel.find({userId:user})
                res.send(note);
            } 
        });
    }
    
})

postRouter.get("/top",async(req,res)=>{
    let token=req.headers.authorization;
    jwt.verify(token, 'eval', async function(err, decoded) {
        if(decoded){
            let user=decoded.userId;
            let notes=await PostModel.find({userId:user})
            if(notes.length>0){
                let note=PostModel.find().sort({no_of_comments:1})
                res.send(note)
            }
            
        } 
    });
})

postRouter.patch("/update/:Id",async(req,res)=>{
    let {Id}=req.params;
    try {
        await PostModel.findByIdAndUpdate({_id:Id},req.body)
        res.status(200).send({"msg":"Post has been Updated"})
    } catch (error) {
        res.status(400).send({"msg":error.msg})
    }
})

postRouter.delete("/delete",async(req,res)=>{
    let {Id}=req.params;
    try {
        await PostModel.findByIdAndDelete({_id:Id})
        res.status(200).send({"msg":"Post has been Deleted"})
    } catch (error) {
        res.status(400).send({"msg":error.msg})
    }
})

module.exports={postRouter}

