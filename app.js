const express = require("express");
const fetch = require("node-fetch");
const app = express();
let data, lastRequested;

app.use(express.static("static"));

app.get('/data/:game', async (req, res) => {
    let game = req.params.game;

    async function getData() {
      if (!data || !lastRequested || (new Date().getTime() - lastRequested.getTime()) > 30000) {
        data = await callAPI(game);
        lastRequested = new Date();
      } else {
          console.log("Already updated within last 5 minutes")
      }
      return data;
    }

    let response = await getData()
    res.send(response)
});

app.listen(8080, function () {
    console.log("Listening");
    // do every 5 minutes
});

async function callAPI(game) {
    const response = await fetch('https://api.liquipedia.net/api/v1/match', {
        method: 'post',
        body: 'apikey=4h3fs3WXhI7Z5hpIS1J9qx99AxUeKnabiZsBeCO0uOzyRDXXd8gAohZOxMueMlZ6hGxqmYOJ2mUmGcEFG2idR50n2uBCXpIJu4usbytzBFLQC3AqK5955EedR4W45FPu' + 
        '&wiki='+game+
        '&type=team'+
        '&conditions=[[finished::1]]AND([[opponent1::Team Liquid]]OR[[opponent2::Team Liquid]])'+
        '&query=opponent1,opponent2,opponent1score,opponent2score,winner, date, tournament'+
        '&order=date DESC'+
        '&limit=1',
        headers: {
            'User-Agent': 'DidLiquidWin project for LiquidHacks',
            'Accept-Encoding': 'gzip',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    const json = await response.json();
    return json;
}