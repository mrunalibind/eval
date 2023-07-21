const express=require("express")
const {UserModel}=require("../Model/user.model")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
//const {main}=require("../middleware/nodemailer");
const {client}=require("../Connections/redis");
const nodeMailer=require("nodemailer")
const userRouter=express.Router()

// DEPLOYED LINK
// https://determined-cuff-links.cyclic.app/

userRouter.post("/register",async(req,res)=>{
const {name,email,gender,password}=req.body
try {
    bcrypt.hash(password, 5,async(err, hash)=>{
        if(err){
            res.status(500).send("something went wrong")
        }
        if(hash){
            const user=new UserModel({name,email,gender,password:hash})
            await user.save()
            res.status(200).send({"msg":"Registration has been done!"})
        } 
    });
} catch (error) {
    res.status(400).send({"msg":error.message})
}
})


userRouter.post("/login",async(req,res)=>{
const{email,password}=req.body
try {
    const user=await UserModel.findOne({email})
   if(user){
    bcrypt.compare(password, user.password,async(err, result)=> {
        if(result){
            res.status(200).send({"msg":"login successfull","token":jwt.sign({"userID":user._id},"masai")})
        }else{
            res.status(400).send({"msg":"Wrong credentials"})
        }
      
    });
   
   }
} catch (error) {
    res.status(400).send("Wrong Credentials")
}
})


// generate otp and send to client and also store it in redis.

// userRouter.post("/sendmail",async(req,res)=>{
//     const {email}=req.body;
//     try{
//         //let user= await UserModel.findOne({email});
//         // console.log(user);
//         // const otp=Math.floor((Math.random()*1000000)+1);
//         // await client.set(user.email,otp,"EX",15*60);
       
//         // let mailOptions = {
//         //     from: 'joestheticclub@gmail.com',
//         //     to: user.email,
//         //     subject: 'TRANSCTION OTP',
//         //     text: `YOUR OTP FOR PAYMENT OF RS ${amount} FOR Vlink PLAN IS : ${otp}
//         //     note:- This OTP is valid for only 15 minutes.`
//         // };
//         // console.log(mailOptions)

//         // transporter.sendMail(mailOptions, (error, info) => {
//         //     if (error) {
//         //         res.status(401).send({"error":"Internal server error"});
//         //     } else {
//         //         res.status(200).send({"msg":"Email sent successfully"});
//         //     }
//         // });
        
              
//               main(email);

//     }catch(err){
//         res.status(401).send(err);
//     }
// });


userRouter.post("/sendmail",async(req,res)=>{
    const {email}=req.body;
    try{
        let user= await UserModel.findOne({email});
        if(user){
            async function main(){
                let transporter = nodeMailer.createTransport({
                  host: "smtp.gmail.com",
                  port: 587,
                  secure: false, // true for 465, false for other ports
                  auth: {
                    user:"joestheticclub@gmail.com",
                    pass:"bhfhyuylyvzfjpls" // generated ethereal password
                  },
                });
              
                const otp = Math.floor(100000 + Math.random() * 900000);
                client.set(otp,otp);
            
                let info = await transporter.sendMail ({
                  from: 'joestheticclub@gmail.com', // sender address
                  to: user.email, // list of receivers
                  subject: "OTP Verification", // Subject line
                  text: `Your OTP: ${otp}`, // plain text body
                });
                if(info){
                    res.status(200).send({msg:"Mail sent successfully"}) 
                }else{
                    res.status(400).send({msg:"Internal Errord"})
                }
                
            }
            main();
            
        }else{
            res.status(400).send({msg:"User not found"})
        }
        
    }catch(err){
        res.status(401).send(err);
    }
});

//verify otp from redis

userRouter.post("/verify",async(req,res)=>{
    try{
        const {otp}=req.body;
        // const id=req.body.userID;
        // const user= await UserModel.findOne({_id:id});
        // // console.log(user);
        const data= await client.get(otp);
        // console.log(data);
        if(otp==data){
            // const {plan,price}=req.body;
            // const userdata= new PaidModel({plan,price});
            // await userdata.save();
            res.status(200).send({"msg":true});
        }else{
            res.status(400).send({"msg":false});
        }

    }catch(err){
        res.status(401).send({"error":err});
    }
})







module.exports={userRouter}