const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fpe = require('node-fpe');
require('dotenv').config()
const ascii = ' !"#$%&\'()*+,-./0123456789:;<=>?ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~'.split('');
const cipher = fpe({ secret: process.env.SECRET_CIP, domain: ascii });
const regexForSplitEmail =  /\@|\./;
const mysql = require('mysql2');
const { error } = require('npmlog');

let encryptedEmail = "";
const encryptEmail = (email) => {
  const arrayOfEmailSubStrings = email.split(regexForSplitEmail, 3);
  const fisrtSubstringOfEmail = cipher.encrypt(arrayOfEmailSubStrings[0]);
  const secondSubStringOfEmail = cipher.encrypt(arrayOfEmailSubStrings[1]);
  const thirdSubStringOfEmail = cipher.encrypt(arrayOfEmailSubStrings[2]);
  encryptedEmail =  fisrtSubstringOfEmail + "@" + secondSubStringOfEmail + "." + thirdSubStringOfEmail;
};
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

exports.signin = (req, res, next) => {
    const userName = req.body.user.name;
    const userFirstName = req.body.user.firstName;
    const userEmail = req.body.user.email;
    const userPassword = req.body.user.password;
    db.query(`INSERT INTO User VALUES (NULL, '${userName}', '${userFirstName}', '${userEmail}', '${userPassword}');`, function (err, result) {
        if (err) throw err;
        res.status(201).json({ message: 'Utilisateur créer !' });
    }); 
};

/*exports.signup = (req, res, next) => {
  encryptEmail(req.body.email);
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: encryptedEmail,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};*/

/*exports.login = (req, res, next) => {
  encryptEmail(req.body.email);
  User.findOne({ email: encryptedEmail })
  .then(user => {
    if (!user) {
      return res.status(401).json({ error: 'Utilisateur non trouvé !' });
    }
    bcrypt.compare(req.body.password, user.password)
      .then(valid => {
        if (!valid) {
          return res.status(401).json({ error: 'Mot de passe incorrect !' });
        }
        res.status(200).json({
          userId: user._id,
          token: jwt.sign(
            { userId: user._id },
            process.env.SECRET_TOK,
            { expiresIn: '1h' }
          )
        });
      })
      .catch(error => res.status(500).json({ error }));
  })
  .catch(error => res.status(500).json({ error }));
};*/