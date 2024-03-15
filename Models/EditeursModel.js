const mongoose = require('mongoose')
const editeurSchema = new mongoose.Schema({
    nom:{type:String,required:true},
});
const Editeur = mongoose.model('editeur',editeurSchema);
module.exports = Editeur