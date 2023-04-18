const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const { default: mongoose } = require('mongoose');
// POST request at /api/user/createuser
router.post('/createUser',[
    body('name','Enter a valid Name').isLength({min:1}),
    body('email','Enter a valid email').isEmail(),
    body('password','Enter a valid password').isLength({ min: 5 }),

], async (req,res)=>{
  // if there are errors than return bad request and return the errors
    // console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // check whether the user with same email exist already or not
    // findone is promises so we need to use await here 
    try{
    let user1 = await User.findOne({email:req.body.email});
    if (user1){
      return res.status(400).json({error:"Sorry a user with this email already existed "})
    }
    let user = await User.create({
        name: req.body.name,
        password: req.body.password,
        email:req.body.email,
      })
      // .then(user => res.json(user))
      // .catch(err=>{console.log(err)
      // res.json({error:"Please enter a unique value for email" , message:err.message})})
      res.json(user);
    }catch{
      console.error(error.message);
      res.status(500).send("Some error occured")
    }
    

})

module.exports = router;