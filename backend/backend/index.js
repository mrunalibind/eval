let express=require("express");
const { connection } = require("./db");
let app=express();
app.use(express.json())
let {userRoute}=require("./routes/user_route")
const cors=require("cors")
app.use(cors())
require("dotenv").config()
app.use("/users",userRoute)

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("Connected to mongoDB");
    } catch (error) {
         console.log(error)
    }
    console.log("Server is running on port no",process.env.port)
})