const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    Nom_Complet:{type:String,required:true,min:5},
    username:{type:String,required:true,min:5},
    mdp:{type:String,required:true}
})
const User = mongoose.model('user',userSchema)
module.exports = User