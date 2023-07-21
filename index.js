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



const passport=require("./google")

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login', session:false }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log(req.user)
    res.redirect('/');
  });

app.get("/",(req,res)=>{
    res.send("Home Page")
})




app.listen(process.env.port,async(req,res)=>{
    try {
        await connection
        console.log("Connected to the mongoDB")
    } catch (error) {
        console.log(error)
    }
    console.log("Sever is running on port",process.env.port)
})