const express = require('express');
const app = express();
const port = 3000;
const http = require("http");
const https = require('https');

function doRequest(url, response) {
  https.get(url, (res) => {
    if (res.statusCode >= 300 && res.statusCode <= 400 && res.headers.location) {
      doRequest(res.headers.location);
    }
    res.on('data', (d) => {
      response.send(d);
    });

  }).on('error', (e) => {
    console.error(e);
  });
}
app.get('/', (request, response) => {
    response.sendfile('index.html');
})
app.get('/node_modules/angular/angular.js', (request, response) => {
    response.sendfile('node_modules/angular/angular.js');
})
app.get('/main.js', (request, response) => {
    response.sendfile('main.js');
})

app.get('/cex', (request, response) => {    
    var url = 'https://cex.io/api/ticker/BTC/USD';
    doRequest(url, response);
})
app.get('/livecoin', (request, response) => {    
    var url = 'https://api.livecoin.net/exchange/ticker?currencyPair=BTC/USD';
    doRequest(url, response);
})
app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`);
})