import { format } from 'morgan';
import express from 'express';


import userModel from "../models/user.js"
import postModel  from "../models/posts.js"
import localStrategy   from"passport-local";
import passport from'passport';
passport.authenticate(new localStrategy(userModel.authenticate()))
/* GET home page. */
const router =  express.Router();
router.get('/', function(req, res, next) {
  res.send("<h1>homepage</h1>");
});

router.get('/profile',isLoggedin, function(req, res, next) {
  res.send(profile);
});

router.post("/register", async (req, res) => {
  try {
    const { username, fullname, email, password } = req.body;

    // Check for missing fields
    if (!username || !fullname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newUser = new userModel({ username, fullname, email });

    // Await passport-local-mongoose register
    const user = await userModel.register(newUser, password);

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error(error); // For debugging
    res.status(500).json({ message: "User not registered", error: error.message });
  }
});


router.post("/login",passport.authenticate("local",{
  successredirect : "/profile",
  failureredirect : "/"
}),function(req,res,next){

})

router.post('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

function isLoggedin(req,res,next){
  if(req.isAuthenticated()) return next()
  res.redirect("/")
}



export default router
