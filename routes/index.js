var express = require('express');
var router = express.Router();
const userModel = require("./users")
const postModel = require("./posts")
const localStrategy  = require("passport-local");
const passport = require('passport');
passport.authenticate(new localStrategy(userModel.authenticate()))
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/profile',isLoggedin, function(req, res, next) {
  res.send(profile);
});

router.post("/register",function(req,res,next){
  const {username,fullname,email}= req.body
  let newUser = new userModel({username,fullname,email})
  userModel.register(newUser,req.body.password)
  .then(function(){
    passport.authenticate("local")(req,res,function(){
      res.redirect("/profile")
    })
  })
})

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



module.exports = router;
