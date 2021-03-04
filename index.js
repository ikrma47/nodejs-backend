const express = require('express');
const cors = require('cors');
const passport = require('passport');
require('dotenv').config();

// eslint-disable-next-line new-cap
const app = new express();
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());
require('./config/passport')(passport);

passport.initialize();

app.use('/', require('./routes'));

module.exports = app;
