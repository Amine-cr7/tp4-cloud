const express = require('express');
const router = express.Router();
const Editeur = require('../Models/EditeursModel');
router.get('/all',(req,res)=>{
    Editeur.find().then(editeurs => res.send(editeurs));
})
router.get('/names',(req,res)=>{
    Editeur.find({},{"nom":1,_id:0}).then(names => res.send(names));
})
router.post('/add',(req,res)=>{
    Editeur.create(req.body)
})
router.put('/update/:name',(req,res)=>{
    Editeur.updateOne({"nom":req.params.name},{$set:req.body}).then(editeur => res.send(editeur))
})
router.delete('/delete/:name',(req,res)=>{
    Editeur.deleteOne({"nom":req.params.name}).then(editeur => res.send(editeur))
})
module.exports = router