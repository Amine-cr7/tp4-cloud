const mongoose = require('mongoose')
const auteurSchema = new mongoose.Schema({
    nom:{type:String,required:true},
});
const Auteur = mongoose.model('auteur',auteurSchema);
module.exports = Auteur