const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const passport = require('passport');
const passportConfig = require('./config/passport-config');
const sequelize = require("./utils/database");

const authRoutes = require('./routes/auth');
const gamesRoutes = require('./routes/games');

dotenv.config(); // Charger le fichier .env

const app = express();
const PORT = 3000;  

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configuration de la session
const sessionStore = new SequelizeStore({
  db: sequelize, 
});


// Activer CORS
app.use(cors({
  origin: 'http://localhost:4200', // Replace with your frontend's URL
  credentials: true // Allow cookies to be sent
}));

// Session
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
        cookie: {
          httpOnly: true,    // Empêche l'accès JavaScript
          secure: false,      // Seulement pour HTTPS
          maxAge: 900000    // 15 mins
      }
    })
);

// Passport.js
app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);

// Synchroniser la table des sessions
sessionStore.sync().then(() => {
  console.log('Table de sessions synchronisée');
});


// AUTH
app.use('/api/auth', authRoutes);

// GAME
app.use('/api/games', gamesRoutes);
    
module.exports = app;


// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
