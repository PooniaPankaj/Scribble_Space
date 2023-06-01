const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const { default: mongoose } = require('mongoose');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const fetchuser = require("../middleware/fetchuser");

// ROUTE 1 :  POST request at /api/user/createuser
router.post('/createUser', [
  body('name', 'Enter a valid Name').isLength({ min: 1 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Enter a valid password').isLength({ min: 5 }),

], async (req, res) => {
  // if there are errors than return bad request and return the errors
  // console.log(req.body)
  var success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array() });
  }
  // check whether the user with same email exist already or not
  // findone is promises so we need to use await here 
  try {
    
    let user1 = await User.findOne({ email: req.body.email });
    if (user1) {
      return res.status(400).json({success, error: "Sorry a user with this email already existed " })
    }
    
    const salt = await bcrypt.genSalt(10)
    // we are making it await bcz it will return promises 
    const secpassword = await bcrypt.hash(req.body.password, salt);
    let user = await User.create({
      name: req.body.name,
      password: secpassword,
      email: req.body.email,
    })
    const data = {
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(data, "JWT_SECRET");
    // console.log(userToken);
    // .then(user => res.json(user))
    // .catch(err=>{console.log(err)
    // res.json({error:"Please enter a unique value for email" , message:err.message})})
    var success = true;
    res.json({ success , authToken });
  } catch {
    // console.error(error.message);
    res.status(500).send("Internal server error ");
  }


})
// ROUTE 2 : creating a post request for login a user
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists()
], async (req, res) => {
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    var success = false;
    return res.status(400).json({ success, errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    var success = false;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({success, Error: "Please try to login with correct credentials " });

    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({success, Error: "Please try to login with correct credentials " });
    }
    const data = {
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(data, "JWT_SECRET");
    success = true;
    res.json({success, authToken });

  }
  catch (error) {
    var success = false;
    res.status(500).send(success, "Internal server error ");
  }


}
)

// ROUTE 3: Get loogedIn details using POST "api/auth/getuser" . login required

router.post('/getuser', fetchuser, async (req, res) => {
  try {
    var userId = req.user.id;
    const user = await User.findById(userId);
    res.send(user);
  } catch (error) {
    res.status(500).send("Internal server error ");
  }
})
module.exports = router;