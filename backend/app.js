const express = require('express');
const userRoutes = require('./routes/user');
const path = require('path');
const cookieSession = require('cookie-session');
const helmet = require("helmet");
const mysql = require('mysql2');
require('dotenv').config()

//connection mysql
const db = mysql.createConnection({
  host: "localhost",
  user: process.env.USER_DATABASE,
  password: process.env.PWD_DATABASE,
  database: "groupomania"
});

db.connect(function(err) {
  if (err) throw err;
  console.log("Connecté à la base de données MySQL!");
});

const app = express();

app.use(helmet());

//app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json());

app.use(cookieSession({
  name: 'session',
  maxAge: 5 * 60 * 60 * 1000,
  keys: [process.env.COOKIE_KEY]
}))

//app.use('/api/home', homeRoutes);

app.use('/api/auth', userRoutes);


module.exports = app;