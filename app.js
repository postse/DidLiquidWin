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
    const response = await fetch('https://api.liquipedia.net/api/v1/matchfeed', {
        method: 'post',
        body: `apikey=4jI9yKlutNoZZskUvyDPeAm5mVWNHIN6SZn84ouI7l8UPdl1djD6YdYBd2771uuIId0EqMkiSliAfeYJ4mskk1iREbSqpDJ6uCRExFO111vHAbKzYXSLY7ur8qR5o61t&wiki=counterstrike&type=team&name=Team Liquid&order=date DESC&limit=1`,
        headers: {
            'User-Agent': 'DidLiquidWin project for LiquidHacks',
            'Accept-Encoding': 'gzip',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    const json = await response.json();
    return json;
}