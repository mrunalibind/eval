var jwt=require('jsonwebtoken');

let auth=(req,res,next)=>{
        const token=req.headers.authorization
        if(token){
            let decoded=jwt.verify(token,'masai');
            if(decoded){
                // console.log(decoded)
                req.body.userId=decoded.userID
                // console.log(req.body);
                next();
            }
            else{
                alert("Please login first")
            }
        }
        else{
            alert("Please login first")
        }
    
}
module.exports={auth};