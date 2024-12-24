const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/:id', async (req, res) => {
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
      res.status(200).json(response.data);
      
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

router.post('/search/:term', async (req, res) => {
  let term = req.params.term;
  let limit = req.body.limit ?? 10;
  let offset = req.body.offset ?? 0;
  let filter = `fields *, 
  cover.*, 
  genres.name, 
  platforms.*
  ; where name ~ *"${term}"*
  ; limit ${limit}
  ; offset ${offset}
  ; sort rating desc;`;

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
    res.status(200).json({
      data: [...response.data], 
      total: response.headers['x-count'],
      limit: limit,
      offset: offset
    });
  } catch (error) {
    console.error('Erreur lors de l’appel à l’API externe:', error.message);
    res.status(500).json({ message: 'Erreur lors de la récupération des données.' });
  }
})

  module.exports = router;