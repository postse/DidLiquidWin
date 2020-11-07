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
    const body = {
        apikey: '2Rm5zmfrhX3Tu7hzdnNMAu2GmUGsQsoCTJPNG6hXNpt4PzLSlR9r0vPnDxG2jO7IASy4cuHCLUroVTPzpxUfTlsbNuMOCZ3GQ5mXGysN8zebR1s1n8WvnTMydr2JbIte',
        wiki: 'counterstrike'
    };
    const response = await fetch('https://api.liquipedia.net/api/v1/match', {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'DidLiquidWin project for LiquidHacks',
            'Accept-Encoding': 'gzip'
        }
    });
    const json = await response.json();
    return json;
}