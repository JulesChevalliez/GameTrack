const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { User } = require('../models');

const router = express.Router();


// Inscription
router.post('/register', async (req, res) => {
    console.log(req.body);
    const { pseudo, password, email } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ pseudo, password: hashedPassword, email });
        res.status(201).json({ message: 'Utilisateur créé avec succès', user: newUser });
    } catch (err) {
        res.status(500).json({ message: 'Erreur interne', error: err });
    }
});

// Connexion
router.post('/login', (req, res, next) => {
    console.log("Login attempt received", req.body); 
    passport.authenticate('local', (err, user, info) => {
        if (err) return res.status(500).json({ message: 'Erreur interne', error: err });
        if (!user) return res.status(401).json({ message: info.message });

        req.logIn(user, (err) => {
            if (err) return res.status(500).json({ message: 'Erreur lors de la connexion', error: err });
            res.status(200).json({ message: 'Connexion réussie', user });
        });
    })(req, res, next);
});

// Déconnexion
router.post('/logout', (req, res) => {
    req.logout((err) => {
        if (err) return res.status(500).json({ message: 'Erreur lors de la déconnexion', error: err });
        res.status(200).json({ message: 'Déconnexion réussie' });
    });
});

// Check de session
router.post('/isLoggedIn', (req, res) => {
    console.log("opopop", req.session);
    if (req.isAuthenticated()) {
        return res.status(200).json({ loggedIn: true, user: req.user });
    } else {
        return res.status(200).json({ loggedIn: false });
    }
});

module.exports = router;