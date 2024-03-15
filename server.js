
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const User = require('./Models/UserModel')
const PORT = process.env.PORT;
const URL_MONGOOSE = process.env.URL_MONGOOSE;
const DBNAME = process.env.DBNAME;
const TOKEN_SECRET = require('crypto').randomBytes(48).toString('hex');
app.use(cors());
app.use(express.json());
mongoose.connect(URL_MONGOOSE + '/' + DBNAME)
app.use('/auteur', require('./Routes/auteur'));
app.use('/editeur', require('./Routes/editeur'));
app.use('/livre', require('./Routes/livre'));
app.use('/user', require('./Routes/user'))

app.post('/register', async (req, res) => {
    const { email, Nom_Complet,username,mdp } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ message: "deja !!." });
    }
    const password = await bcrypt.hash(mdp, 10);
    await User.create({ email, mdp: password ,Nom_Complet,username});
    res.status(201).json({ message: "creer !!." });
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "Utilisateur non trouvé." });
    }
    const passwordMatch = await bcrypt.compare(password, user.mdp);
    if (!passwordMatch) {
        return res.status(401).json({ message: "Mot de passe incorrect." });
    }
    const token = jwt.sign({ userId: user._id },TOKEN_SECRET);
    process.env.TOKEN = token
    res.status(200).json({ token });
});
app.listen(PORT, (error) => {
    if (!error) {
        console.log(`Ecoute dans le port ${PORT}`);
    } else {
        console.log(`Errer de lancement`);
    }
})