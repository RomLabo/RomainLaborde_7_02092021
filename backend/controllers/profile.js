const database = require('../models/data-base');
const jwt = require('jsonwebtoken');

exports.getProfile = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
  const user = decodedToken.user;
  database.promise().query(`SELECT * FROM User WHERE email= '${user}';`)
    .then(data => {
      res.status(200).json((JSON.parse(JSON.stringify(data[0])))[0])
    })
    .catch(error => res.status(500).json({ error }))
  ;
}

exports.getOneProfile = (req, res, next) => {
  database.promise().query(`SELECT * FROM User WHERE email= '${req.params.id}';`)
    .then(data => {
      if ((data[0])[0] == null) {
        console.log('echec');
        return res.status(404).json({ error: 'Aucun utilisateur n\'est enregistré avec cette email' })
      }
      res.status(200).json((JSON.parse(JSON.stringify(data[0])))[0]);
    })
    .catch(error => res.status(500).json({ error }))
  ;
}

exports.deleteProfile = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
  const user = decodedToken.user;
  database.promise().query(`DELETE FROM User WHERE email= '${user}';`)
    .then(() =>{
      res.status(201).json({ message: 'Votre profil a été supprimé!' });
    })
    .catch(error => res.status(500).json({ error }))
  ;  
}

exports.deleteOneProfile = (req, res, next) => {
  database.promise().query(`DELETE FROM User WHERE email= '${req.params.id}';`)
    .then(() =>{
      res.status(201).json({ message: 'Ce profil a été supprimé!' });
    })
    .catch(error => res.status(500).json({ error }))
  ;  
}