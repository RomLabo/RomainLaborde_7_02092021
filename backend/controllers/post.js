const database = require('../models/data-base');
const jwt = require('jsonwebtoken');



exports.getAllPosts = (req, res, next) => {
    database.promise().query('SELECT * FROM Post ORDER BY id DESC;')
      .then(data => {
        res.status(200).json((JSON.parse(JSON.stringify(data[0]))))
      })
      .catch(error => res.status(500).json({ error }));
}

exports.getOnePost = (req, res, next) => {
  database.promise().query(`SELECT * FROM Post WHERE id= ${req.params.id};`)
    .then(data => {
      res.status(200).json((JSON.parse(JSON.stringify(data[0])))[0])
    })
    .catch(error => res.status(500).json({ error }));
}

exports.getAllComments = (req, res, next) => {
  database.promise().query(`SELECT * FROM Comment WHERE post_id= ${req.params.id} ORDER BY id DESC;`)
      .then(data => {
        res.status(200).json((JSON.parse(JSON.stringify(data[0]))))
      })
      .catch(error => res.status(500).json({ error }));
}

exports.createPost = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
  const user = decodedToken.user;
  database.query(`INSERT INTO Post (id, user_email, content, title, user_name, user_firstname) 
    VALUES (NULL, '${user}', '${req.body.postText}', '${req.body.postTitle}', (SELECT name FROM User WHERE email='${user}'), (SELECT first_name FROM User WHERE email='${user}'));`, 
    function (err, result) {
    if (err) throw err;
    res.status(201).json({ message: 'Post créer !' });
  });
}

exports.createComment = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
  const user = decodedToken.user;
  database.query(`INSERT INTO Comment (id, post_id, user_email_comment, content, user_name_comment, user_firstname_comment) 
    VALUES (NULL, ${req.params.id}, '${user}', '${req.body.commentText}', (SELECT name FROM User WHERE email='${user}'), (SELECT first_name FROM User WHERE email='${user}'));`, 
    function (err, result) {
    if (err) throw err;
    res.status(201).json({ message: 'Commentaire créer !' });
  });
}

