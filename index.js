let express=require("express");
let app=express();
app.use(express.json());
require("dotenv").config()
let {connection}=require("./db")

let {userRouter}=require("./routes/user_route");
app.use("/users",userRouter)
let {auth}=require("./middleware/auth_midd")
app.use(auth)
let {postRouter}=require("./routes/post_route")
app.use("/posts",postRouter)

app.listen(process.env.port,async(req,res)=>{
    try {
        await connection
        console.log("Connected to the mongoDB")
    } catch (error) {
        console.log(error)
    }
    console.log("Sever is running on port",process.env.port)
})