const express = require('express');
const router = express.Router();
const Livre = require('../Models/LivresModels');
const Auteur = require('../Models/AuteursModel')
router.get('/all', (req, res) => {
    Auteur.find().then(auteurs => res.send(auteurs));
})
router.get('/names', (req, res) => {
    Auteur.find({}, { "nom": 1, _id: 0 }).then(names => res.send(names));
})
router.get('/editeurs', (req, res) => {
    Livre.aggregate([
        {
            $lookup: {
                from: "editeurs",
                localField: "editeurs",
                foreignField: '_id',
                as: 'editeurs'
            }
        },
        {
            $unwind: "$editeurs"
        },
        {
            $group: {
                _id: "$editeurs.nom",
                count: { $sum: 1 }
            }
        },
        {
            $project: {
                _id: 0,
                nom: "$_id",
                count: 1
            }
        }
    ]).then(auteur => res.send(auteur))
})
router.post('/add', (req, res) => {
    Auteur.create(req.body)
})
router.put('/update/:name', (req, res) => {
    Auteur.updateOne({ "nom": req.params.name }, { $set: req.body }).then(auteur => res.send(auteur))
})
router.delete('/update/:name', (req, res) => {
    Auteur.deleteOne({ "nom": req.params.name }, { $set: req.body }).then(auteur => res.send(auteur))
})
module.exports = router