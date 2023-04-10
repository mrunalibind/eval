// let user=document.getElementById("user");
let express=require("express")
let userRoute=express.Router();
let {UserModel}=require("../model/user_model")
let bcrypt=require("bcrypt")
let jwt=require("jsonwebtoken")


userRoute.post("/register",async(req,res)=>{
    let {name,email,password}=req.body;
    let user=await UserModel.find({email});
        // console.log(user.length)
        if(user.length==0) {
            try {
                bcrypt.hash(password, 5,async function(err, hash) {
                    // Store hash password in your DB.
                    let user=new UserModel({name,email,password:hash});
                    await user.save();
                    res.status(200).send({"msg":"Registration Successfully"})
                });
            }catch (error) {
                res.status(400).send({"msg":error.msg});
            }
        }
        else{
            res.status(200).send({"msg":"User is already present with same email"})
        }
})

userRoute.post("/login",async(req,res)=>{
    let {email,password}=req.body;
    try {
        let user=await UserModel.find({email});
        if(user.length==0){
            res.status(400).send({"msg":"Wrong credential, Login Failed"});
        }
        else{
            bcrypt.compare(password, user[0].password,function(err,result) {
                if(result){
                    res.status(200).send({"msg":"Login Successfully","token":jwt.sign({ userID:user[0]._id}, 'masai')}) ;
                }
                else{
                    res.status(400).send({"msg":"Wrong credential, Login Failed"});
                }
            });
        }
        
    } catch (error) {
        res.status(400).send({"msg":error.msg});
    }
})

module.exports={userRoute}