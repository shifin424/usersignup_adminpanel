var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient
var connection  = require('../config/connection');
const { doSignup, doLogin } = require('../helpers/user-helpers');
const userHelpers = require('../helpers/user-helpers')

/* GET login page. */
router.get('/', function(req, res, next) {
//  res.render('login')

let errmsg = req.session.errmsg;
const  session=req.session.user
//console.log(session);
   if(session){
    res.redirect('/home')
   }else{
    req.session.errmsg = null;
    res.render('login',{errmsg});
   }
});


//Login to home
router.post('/postLogin', (req,res) => {
     const body = req.body
     doLogin(req.body.username,req.body.password).then((user)=>{
      if(user){
        req.session.user = user.username
        res.redirect('/home')
      }else{
        console.log("else")
      }
     }).catch(()=>{
      console.log("catch")
      req.session.errmsg = " Invalid username or password "
      //console.log(req.session.errmsg)
      res.redirect('/')
     })
     

})
// home page
router.get('/home',(req,res)=>{
  const session =req.session.user
 if(session){
  const cards=[
    {id:1},
    {id:2},
    {id:3},
    {id:4},
    {id:5},
    {id:6},
  ]

  res.render("home",{cards});
  //console.log(session);
 }
 else{
  res.redirect("/")
  //console.log("no session");
 }
})


//Sign out 
router.get('/logout',(req,res)=>{
  req.session.user=null
 res.redirect('/');
});


//signup
router.get('/signup',(req,res)=>{
  const  session=req.session.user

   if(session){
    res.redirect('/home')
   }else{
  res.render('signup')
   }
})


router.post('/submit',async(req,res)=>{
//console.log(req.body)
userHelpers.doSignup(req.body).then((responce)=>{
  //console.log(responce);
  req.session.user=true
  res.redirect('/home')
})

})



module.exports = router;
