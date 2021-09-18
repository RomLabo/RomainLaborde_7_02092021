const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const database = require('../models/data-base');


exports.signin = (req, res, next) => {
    bcrypt.hash(req.body.user.password, 10)
      .then(hash => {
        database.query(`INSERT INTO User VALUES ('${req.body.user.email}', '${hash}', '${req.body.user.name}', '${req.body.user.firstName}', NULL, 0);`, function (err, result) {
            if (err) throw err;
            res.status(201).json({ message: 'Utilisateur créer !' });
        }); 
      })
      .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  database.promise().query(`SELECT * FROM User WHERE email = '${req.body.email}';`)
    .then((row) => {
      const userInfo = (JSON.parse(JSON.stringify(row[0])))[0];
      bcrypt.compare(req.body.password, userInfo.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userName: userInfo.name,
            userFirstName: userInfo.first_name,
            user: req.body.email,
            userIsAdmin: userInfo.is_admin,
            token: jwt.sign(
              { user: req.body.email },
              process.env.SECRET_TOK,
              { expiresIn: '1h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));  
    })
    .catch(error => res.status(404).json({ error: 'Aucun utilisateur n\'est enregistré avec cette email' }));
};
