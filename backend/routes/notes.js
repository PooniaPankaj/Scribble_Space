const express = require('express')
const router = express.Router();
const { body, validationResult } = require('express-validator');

// fetching user using token by using middleware

const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');

// ROUTER 1: Get all the notes  using GET "/api/notes/fetchallnotes"  
  router.get('/fetchallnotes',fetchuser, async (req,res)=>{
    try{
    const notes = await Notes.find({user:req.user.id});
    res.json(notes);
    }catch(error){
        res.status(500).send("Internal server error ");
    }
})
// ROUTER 2: add a new notes  using post "/api/notes/addnote"  
router.post('/addnote',fetchuser,[
    body('title','Enter a valid Title').isLength({min:3}),
    body('description','Description must be atleast 5 characters').isLength({min:5}),
    // body('password','Enter a valid password').isLength({ min: 5 }),

], async (req,res)=>{
    try 
    {const {title,description,tag} = req.body;
    // if there is any error than return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const note = new Notes({
        title,description,tag,user:req.user.id
    })  
    const savedNote = await  note.save()
    
    res.json(savedNote);}
    catch(error){
        res.status(500).send("Internal server error ");

    }
})
module.exports = router