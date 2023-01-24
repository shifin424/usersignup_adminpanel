var express = require('express');
const { addUser } = require('../helpers/adminhelpers');
const adminhelpers = require('../helpers/adminhelpers');
var router = express.Router();
const admin = { username: 'Adminlogin', password: '12345677' }
const adminHelpers=require('../helpers/adminhelpers')
const adminDetails = require('../helpers/adminhelpers');
const { findUserwithName } = require('../helpers/user-helpers');




//Admin login
router.get('/',(req,res,next)=>{
  let admin=req.session.admin
  if(admin){
    adminHelpers.getAllusers().then((users)=>{
      res.render('adminpage',{users})
    })
   
  }else{
    res.render('adminlog')
  }
  
})

router.get('/adminhome',(req,res)=>{
  console.log("session noticed");
  let admin=req.session.admin
  //console.log(admin);
    if(admin){
      adminHelpers.getAllusers().then((users)=>{
      res.render('adminpage',{users})
    })
    }else{
      //console.log("no session");
      res.render('adminlog')
    }

 

})

router.post('/postAdmin',(req,res)=>{
  if (req.body.username === admin.username && req.body.password === admin.password){
    req.session.admin = req.body.username
      res.redirect('/admin/adminhome')
  }else{
    res.render('adminlog',{invalid:"invalid user name or password"})
  }

})

//admin delete function
router.get('/delete-user/:id',(req,res)=>{
  let userId = req.params.id
  adminHelpers.deleteUser(userId).then((response) => {
            
            res.redirect('/admin/adminhome')
        }).catch(err => console.log(err))
})

//admin edit function
router.get('/edit-user/:id',(req,res)=>{  
  let admin=req.session.admin
  let userId = req.params.id 
  adminhelpers.editUser(userId).then((data)=>{
    if(admin){
    console.log(data);
    res.render('edit-user',{data})
    }else{
      res.redirect('/admin')
    }
  })
 
})

router.post('/edit-user/:id',(req,res)=>{
  adminDetails.editUserDetails(req.params.id,req.body).then(()=>{
    res.redirect('/admin/adminhome');
  });
});

router.get("/searchUser",async(req,res)=>{
 // console.log(req.query);
  let users=await findUserwithName(req.query)
  res.render('adminpage',{users,message:(users.length>0)?null:'No user found'})
})


router.get('/add-users',(req,res)=>{
  let admin=req.session.admin
  if(admin){
    res.render('create-user')
  }else{
    res.redirect('/admin')
  }
  
})

router.post('/add-users',(req,res)=>{
  userData=req.body
  adminDetails.addUser(userData).then((userData)=>{
    res.redirect('/admin/adminhome')
  })
  
})

router.get('/signout', (req, res) => {
  req.session.admin=null
  res.redirect('/admin')
});
module.exports = router;
