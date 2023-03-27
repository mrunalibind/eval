let express=require("express");
let userRouter=express.Router();
var jwt = require('jsonwebtoken');
let {UserModel}=require("../model/user_model")
let bcrypt=require("bcrypt");

userRouter.post("/register",async(req,res)=>{
    let {name,email,gender,password,age,city,is_married}=req.body
    age=Number(age);
    let userPresent=await UserModel.find({"email":email})
    // console.log(userPresent)
    if(userPresent.length==1){
        res.status(400).send({"msg":"User already exist, please login"})
    }
    else{
        try {
            bcrypt.hash(password, 5, async function(err, hash) {
                let user=new UserModel({name,email,gender,password:hash,age,city,is_married})
                await user.save();
                res.status(200).send({"msg":"User has been Created"})
            });
        } catch (error) {
            res.status(400).send({"msg":error.msg});
        }
    }
    
})

userRouter.post("/login",async(req,res)=>{
    let {email,password}=req.body;
    try {
        let user=await UserModel.find({email});
        console.log(user)
        if(user.length=1){
            console.log(user);
            bcrypt.compare(password, user[0].password, function(err, result) {
                if(result){
                    res.status(200).send({"msg":"Login Successful","token":jwt.sign({ userId: user[0]._id }, 'eval')})
                }
                else{
                    res.status(400).send({"msg":"Wrong Credential or User is not present"})
                }
            });
        }
        else{
            res.status(400).send({"msg":"Wrong Credential or User is not present"})
        }
    } catch (error) {
        res.status(400).send({"msg":error.msg});
    }
})

module.exports={userRouter}