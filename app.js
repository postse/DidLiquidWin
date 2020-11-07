const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.use(express.static("static"));

app.get('/data', async (req, res) => {
    let data, lastRequested;
    console.log(await getData());

    async function getData() {
      if (!data || !lastRequested || (new Date().getTime() - lastRequested.getTime()) > 30000) {
        data = await callAPI();
        lastRequested = new Date();
      } else {
          console.log("Already updated within last 5 minutes")
      }
      return data;
    }
});

app.listen(8080, function () {
    console.log("Listening");
    // do every 5 minutes
});

async function callAPI() {
    const response = await fetch('https://api.liquipedia.net/api/v1/match', {
        method: 'post',
        body: 'apikey=2q0cobTlhOD0kr474KCTEAUFQF34H6nxpXu8H04HoOyCVslD8Zosb7ZZo5u7Uv7UiWudTF7Avx0Rclo5zKjzafZoqXdz5dyYhul0WzCSvJYEZRdfJ2rSggB8yCPZWfSu&wiki=counterstrike',
        headers: {
            'User-Agent': 'DidLiquidWin project for LiquidHacks',
            'Accept-Encoding': 'gzip',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    const json = await response.json();
    return json;
}