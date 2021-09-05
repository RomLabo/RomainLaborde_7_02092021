const express = require('express');
const app = express();


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());

app.post('/api/signin', (req, res, next) => {
    console.log(req.body.user);
    res.status(201).json({
      message: `Utilisateur ${req.body.user.name} créer !`
    });
});

app.post('/api/login', (req, res, next) => {
  console.log(req.body.email);
  console.log(req.body.password);
  res.status(201).json({
    message: `Utilisateur ${req.body.email} connecté !`
  });
});

module.exports = app;