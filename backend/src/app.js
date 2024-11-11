const express = require('express');
const cors = require('cors');
const mysql2 = require('mysql2')
const finnhub = require('finnhub');

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = process.env.Finnhub_API_Key
const finnhubClient = new finnhub.DefaultApi();

const app = express();
app.use(express.json());