const express = require('express');
const router = express.Router();
const User = require('../Models/UserModel');
router.get('/all',(req,res)=>{
    User.find().then(users => res.send(users));
})
router.get('/names',(req,res)=>{
    User.find({},{"Nom_Complet":1,_id:0}).then(names => res.send(names));
})
router.post('/add',(req,res)=>{
    User.create(req.body)
})
router.put('/update/:name',(req,res)=>{
    User.updateOne({"Nom_Complet":req.params.name},{$set:req.body}).then(user => res.send(user))
})
router.delete('/update/:name',(req,res)=>{
    User.deleteOne({"Nom_Complet":req.params.name},{$set:req.body}).then(user => res.send(user))
})
module.exports = router