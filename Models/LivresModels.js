const mongoose = require('mongoose')
const livreSchema = new mongoose.Schema({
    nom:{type:String,required:true},
    auteurs:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"auteurs"
    }],
    editeur:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"editeurs"
    }],
    categorie:{type:String,required:true},
    annee:{type:String,required:true}
});
const Livre = mongoose.model('livre',livreSchema);
module.exports = Livre