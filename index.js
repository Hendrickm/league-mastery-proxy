const express = require('express');
const request = require('request');

const app = express();

const API_KEY = 'RGAPI-1f4ffcd7-f589-467a-ac56-727ed9b7011d'

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/champion-mastery/by-summoner', (req, res) => {
  const {id, region} = req.query;
  request(
    { url: `https://${region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${id}?api_key=${API_KEY}` },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: error });
      }
      res.json(JSON.parse(body));
    }
  )
});

app.get('/summoners/by-name', (req, res) => {
  const {summonerName, region} = req.query;
  request(
    { url: `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${API_KEY}` },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: error });
      }
      res.json(JSON.parse(body));
    }
  )
});

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
