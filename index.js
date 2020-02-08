const express = require('express');
const request = require('request');

const app = express();

const API_KEY = 'RGAPI-61c00181-a8f6-485b-b31f-d696dfbb0728'

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/champion-mastery/by-summoner', (req, res) => {
  const {id, region} = req.query;
  console.log(id)
  console.log(region)
  request(
    { url: `https://${region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${id}?api_key=${API_KEY}` },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: err });
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
        return res.status(500).json({ type: 'error', message: err.message });
      }
      res.json(JSON.parse(body));
    }
  )
});

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
