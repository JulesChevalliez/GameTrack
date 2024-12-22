const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config(); // Charger le fichier .env

const app = express();
const PORT = 3000;

// Activer CORS
app.use(cors());

//GAME DETAILS
app.get('/api/games/:id', async (req, res) => {
    let gameId = req.params.id;
    let filter = `fields *, 
      screenshots.image_id, 
      genres.name, 
      involved_companies.company.name, involved_companies.company.description, involved_companies.developer, involved_companies.company.logo.image_id,
      platforms.*, platforms.platform_logo.image_id
      ; where id = ${gameId};`;

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${process.env.GAME_API_URL}/games/`,
      headers: { 
        'Client-ID': `${process.env.GAME_API_KEY}`, 
        'Authorization': `Bearer ${process.env.GAME_API_BEARER}`,
        'Content-Type': 'text/plain'
      },
      data : filter
    };
    

    try {
        const response = await axios.request(config);
        res.json(response.data);

    // let config = {
    //     method: 'post',
    //     maxBodyLength: Infinity,
    //     url: 'https://id.twitch.tv/oauth2/token?client_id=6v7na56gh5fw9qe5xom16ztg0tgl8x&client_secret=18in16akb81f5uvhptw40ywi8jfikl&grant_type=client_credentials',
    //     headers: { }
    //   };
      
    //   axios.request(config)
    //   .then((response) => {
    //     console.log(JSON.stringify(response.data));
    //   })
    
    } catch (error) {
     console.error('Erreur lors de l’appel à l’API externe:', error.message);
     res.status(500).json({ message: 'Erreur lors de la récupération des données.' });
    }
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});