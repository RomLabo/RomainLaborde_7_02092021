const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fpe = require('node-fpe');
require('dotenv').config()
const ascii = ' !"#$%&\'()*+,-./0123456789:;<=>?ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~'.split('');
const cipher = fpe({ secret: process.env.SECRET_CIP, domain: ascii });
const regexForSplitEmail =  /\@|\./;
const database = require('../models/data-base');

let encryptedEmail = "";
const encryptEmail = (email) => {
  const arrayOfEmailSubStrings = email.split(regexForSplitEmail, 3);
  const fisrtSubstringOfEmail = cipher.encrypt(arrayOfEmailSubStrings[0]);
  const secondSubStringOfEmail = cipher.encrypt(arrayOfEmailSubStrings[1]);
  const thirdSubStringOfEmail = cipher.encrypt(arrayOfEmailSubStrings[2]);
  encryptedEmail =  fisrtSubstringOfEmail + "@" + secondSubStringOfEmail + "." + thirdSubStringOfEmail;
};

exports.signin = (req, res, next) => {
    const userName = req.body.user.name;
    const userFirstName = req.body.user.firstName;
    encryptEmail(req.body.user.email);
    bcrypt.hash(req.body.user.password, 10)
      .then(hash => {
        database.query(`INSERT INTO User VALUES (NULL, '${userName}', '${userFirstName}', '${encryptedEmail}', '${hash}');`, function (err, result) {
            if (err) throw err;
            res.status(201).json({ message: 'Utilisateur créer !' });
        }); 
      })
      .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  encryptEmail(req.body.email);
  database.promise().query(`SELECT password FROM User WHERE email = '${encryptedEmail}';`)
    .then((row) => {
      const userInfo = (JSON.parse(JSON.stringify(row[0])))[0];
      bcrypt.compare(req.body.password, userInfo.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            user: req.body.email,
            token: jwt.sign(
              { user: req.body.email },
              process.env.SECRET_TOK,
              { expiresIn: '1h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));  
    })
    .catch(error => res.status(401).json({ error }));
};
