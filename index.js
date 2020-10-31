'use strict';
const express = require('express');
const path = require('path');
let {gus, flo} = require('./data');

// Express
const app = express();

// Serve up production assets
app.use('/dist', express.static('dist'));

// Serve the TEST_VAR_1 env var on the /env route (used for testing env)
app.get('/gus', (req, res) => {
    res.status(302).redirect(`/index?data=${encodeURIComponent(JSON.stringify(gus))}`)
});

app.get('/flo', (req, res) => {
    res.status(302).redirect(`/index?data=${encodeURIComponent(JSON.stringify(flo))}`)
});

app.get('/index', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'buttons.html'));
});

// Serve up the index.html if express doesn't recognize the route
//app.get('*', (req, res) => {
//  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
//});

exports.covidGus = app;

//gcloud functions deploy radioAgnesTwitterWebhook --entry-point radioAgnesTwitterWebhook --source functions/radioAgnesTwitterWebhook/ --runtime nodejs10 --service-account radio-agnes-bucket@radio-agnes.iam.gserviceaccount.com --trigger-http --allow-unauthenticated --env-vars-file .env
//npx @google-cloud/functions-framework --source functions/radioAgnesTwitterWebhook/ --target radioAgnesTwitterWebhook

// For env variable secrets
// https://www.sethvargo.com/secrets-in-serverless/