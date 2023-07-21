//These is the anchor tag when you click on
// Continue with google 
// http://localhost:8050/auth/google



let express=require("express");
let app=express();
app.use(express.json())

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

app.get("/auth/google_oauth",(req,res)=>{
    res.send("Authenticated By Google")
})

app.listen(8050,()=>{
    console.log("Server is running on 8050");
})

