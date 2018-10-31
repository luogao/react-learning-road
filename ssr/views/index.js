"use strict";

var express = require('express');

var app = express();

var template = require('./views/template');

var path = require('path'); // Serving static files


app.use('/assets', express.static(path.resolve(__dirname, 'assets')));
app.use('/media', express.static(path.resolve(__dirname, 'media'))); // hide powered by express

app.disable('x-powered-by'); // start the server

app.listen(process.env.PORT || 3000); // our apps data model

var data = require('./assets/data.json');

var initialState = {
  isFetching: false,
  apps: data //SSR function import

};

var ssr = require('./views/server'); // server rendered home page


app.get('/', function (req, res) {
  var _ssr = ssr(initialState),
      preloadedState = _ssr.preloadedState,
      content = _ssr.content;

  var response = template("Server Rendered Page", preloadedState, content);
  res.setHeader('Cache-Control', 'assets, max-age=604800');
  res.send(response);
}); // Pure client side rendered page

app.get('/client', function (req, res) {
  var response = template('Client Side Rendered page');
  res.setHeader('Cache-Control', 'assets, max-age=604800');
  res.send(response);
}); // tiny trick to stop server during local development

app.get('/exit', function (req, res) {
  if (process.env.PORT) {
    res.send("Sorry, the server denies your request");
  } else {
    res.send("shutting down");
    process.exit(0);
  }
});