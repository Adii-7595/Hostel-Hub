var express = require('express');
var userModel = require('./users')
var router = express.Router();

var passport = require('passport');
var session = require('express-session');

const LocalStrategy = require('passport-local').Strategy; 

passport.use(new LocalStrategy(userModel.authenticate())); 

// Go to home page

router.get('/', function(req, res, next) {

  res.render('index');

});

// Go to register page
// router.get('/register',function(req,res){

//   res.render('register');

// });

// Register user
router.post('/register',async function(req,res){

  // register if user exits
  await userModel.register(await new userModel({ name: req.body.name, username: req.body.username }), await req.body.password, function (err, user) { 

    if (err) { 
        res.json({ success: false, message: "Your account could not be saved. Error: " + err }); 
    } 
    else { 

      // authenticate
          passport.authenticate("local")(req, res, function(){

            // share in session 
            req.session.un=req.body.username;

            res.redirect("/login");
        });    
    } 
  }); 
});

// Go to login page
router.get('/login',function(req,res){

  res.render('login');
});

// Go to prfile page
router.get('/profile',isLogedin,async function(req,res){

  // to find user name to welcome
  var u = await userModel.findOne({username : req.session.un});

  res.render('profile',{
    name:u.name
  });
});

// To complete login process
router.post("/login", passport.authenticate("local",{ failureRedirect: "/login"}), 
function(req, res){

// share in session
req.session.un=req.body.username;

res.redirect('/');
});

// To logout
router.get("/logout", function(req, res,next){

  req.logout(function(err){

    if (err) { return next(err); }

    res.redirect("/");

  });
  
});

router.get('/paruluniversity',function(req,res){
  res.render('parul');
});

router.get('/contact',function(req,res){
  res.render('contact');
})

router.get('/blog',function(req,res){
  res.render('blog')
})

router.get('/about',function(req,res){
  res.render('about')
})

router.get('/product',function(req,res){
  res.render('product');
})
// To check if user in loged in or not
function isLogedin(req,res,next){

  if (req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
  
}

router.get('/err',function(req,res){
  res.render('err');
})

router.get('/cart',function(req,res){
  res.render('cart');
})


module.exports = router;
