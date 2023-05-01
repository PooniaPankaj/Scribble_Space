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

// ROUTE 3: Updating a existing note put /api/note/updatenote :: Login required


router.put('/updatenote/:id',fetchuser, async (req,res)=>{
    const {title,description,tag} = req.body;
    try{
    // create a newNote object
    const newNote ={};
    if (title){newNote.title = title};
    if (description){newNote.description = description};
    if (tag){newNote.tag = tag};

    // find the note to be updated
    //  const note = Notes.findByIdAndUpdate()
    let note = await Notes.findById(req.params.id);
    if (!note){
        res.status(404).send("Not found")
    }
    if (note.user.toString()!== req.user.id){
        return res.status(401).send("Not allowed");
    }

    note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json({note});
    }catch(error){
        res.status(500).send("Internal server error ");
    }
      


})
// ROUTE 4: delete a exiating note using delete /api/note/deletenote 

router.delete('/deletenote/:id',fetchuser, async (req,res)=>{
    // create a newNote object
    try {
        // find the note to be deleted and delete it

    //  const note = Notes.findByIdAndUpdate()
    let note = await Notes.findById(req.params.id);
    if (!note){
        res.status(404).send("Not found")
    }
    // Allow deletion if and only if user owns this note

    if (note.user.toString()!== req.user.id){
        return res.status(401).send("Not allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({"success":"Note has been deleted "});
    } catch (error) {
        res.status(500).send("Internal server error ");
    }
    
    
      
})

module.exports = router