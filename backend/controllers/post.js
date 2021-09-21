const database = require('../models/data-base');
const jwt = require('jsonwebtoken');
const fs = require('fs');



exports.getAllPosts = (req, res, next) => {
    database.promise().query('SELECT * FROM Post ORDER BY id DESC;')
      .then(data => {
        res.status(200).json((JSON.parse(JSON.stringify(data[0]))))
      })
      .catch(error => res.status(500).json({ error }));
}

exports.getOnePost = (req, res, next) => {
  database.promise().query(`SELECT * FROM Post WHERE id= ?`, [req.params.id])
  .then(data => {
    res.status(200).json((JSON.parse(JSON.stringify(data[0])))[0])
  })
  .catch(error => res.status(500).json({ error }));
}


exports.getAllComments = (req, res, next) => {
  database.promise().query(`SELECT * FROM Comment WHERE post_id= ? ORDER BY id DESC;`, [req.params.id])
      .then(data => {
        res.status(200).json((JSON.parse(JSON.stringify(data[0]))))
      })
      .catch(error => res.status(500).json({ error }));
}

exports.createPost = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
  const user = decodedToken.user;
  const reqHost = req.get('host');
  const postTitle = JSON.parse(req.body.postTitle);
  const postText = JSON.parse(req.body.postText);
  let imageUrl = 'imageUrl';
  if (req.file) {
    imageUrl = `${req.protocol}://${reqHost}/images/${req.file.filename}`;
  }
  database.query(`INSERT INTO Post (id, user_email, content, title, image_url, user_name, user_firstname) 
    VALUES (NULL, ?, ?, ?, ?, (SELECT name FROM User WHERE email= ?), (SELECT first_name FROM User WHERE email= ?));`,
    [user, postText, postTitle, imageUrl, user, user], 
    function (err, result) {
    if (err) throw err;
    res.status(201).json({ message: 'Post créer !' });
  });
}

exports.modifyPost = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
  const user = decodedToken.user;
  const reqHost = req.get('host');
  const postTitle = JSON.parse(req.body.postTitle);
  const postText = JSON.parse(req.body.postText);
  if (req.file) {
    database.promise().query(`SELECT * FROM Post WHERE id= ?`, [req.params.id])
    .then(data => {
      const post = (JSON.parse(JSON.stringify(data[0])))[0];
      const fileName = post.image_url.split('/images/')[1];
      fs.unlink (`images/${fileName}`, () => {
        imageUrl = `${req.protocol}://${reqHost}/images/${req.file.filename}`;
        database.query(`UPDATE Post SET content= ?, title= ?, image_url= ? WHERE id= ? AND user_email= ?;`, [postText, postTitle, imageUrl, req.params.id, user], 
          function (err, result) {
          if (err) throw err;
          res.status(201).json({ message: 'Post modifier !' });
        });
      })
    })
    .catch(error => res.status(500).json({ error }));
  } else {
    database.query(`UPDATE Post SET content='${postText}', title='${postTitle}' WHERE id=${req.params.id} AND user_email='${user}';`, 
      function (err, result) {
      if (err) throw err;
      res.status(201).json({ message: 'Post modifier !' });
    });
  }
}

exports.createComment = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
  const user = decodedToken.user;
  database.query(`INSERT INTO Comment (id, post_id, user_email_comment, content, user_name_comment, user_firstname_comment) 
    VALUES (NULL, ?, ?, ?, (SELECT name FROM User WHERE email= ?), (SELECT first_name FROM User WHERE email= ?));`,
    [req.params.id, user, req.body.commentText, user, user], 
    function (err, result) {
    if (err) throw err;
    res.status(201).json({ message: 'Commentaire créer !' });
  });
}

exports.createStateLike = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
  const user = decodedToken.user;
  switch (req.body.likeNumber) {
    case 0 :
      database.promise().query(`SELECT * FROM Like_state WHERE user_like_email= ?;`, [user])
        .then(data => {
          const userLike = (JSON.parse(JSON.stringify(data[0])))[0];
          const userLikeStatus = userLike.user_like;
          if (userLikeStatus === 1) {
            database.query(`UPDATE Post SET post_like =post_like - 1 WHERE id= ?`, [req.params.id],
              function (err, result) {
              if (err) throw err;
              database.promise().query(`DELETE FROM Like_state WHERE user_like_email= ?;`,[user])
              res.status(201).json({ message: 'Votre vote a été annulé !' });
            })
          } else {
            database.query(`UPDATE Post SET post_like =post_like + 1 WHERE id= ?`,[req.params.id],
              function (err, result) {
              if (err) throw err;
              database.promise().query(`DELETE FROM Like_state WHERE user_like_email= ?;`,[user])
              res.status(201).json({ message: 'Votre vote a été annulé !' });
            })
          }
        })
        .catch(error => res.status(500).json({ error })); 
      break; 
    case 1:
      database.query(`UPDATE Post SET post_like = post_like + 1 WHERE id= ?`,[req.params.id], 
        function (err, result) {
        if (err) throw err;
        database.query(`INSERT INTO Like_state (user_like_email, post_id, user_like) VALUES (?, ?, ?)`,[user, req.params.id, req.body.likeNumber], 
          function (err, result) {
          if (err) throw err;
          res.status(201).json({ message: 'Votre vote a bien été enregistré !' });
        });
      });
      break;
    case -1:
      database.query(`UPDATE Post SET post_like =post_like - 1 WHERE id= ?`,[req.params.id],
        function (err, result) {
        if (err) throw err;
        database.query(`INSERT INTO Like_state (user_like_email, post_id, user_like) VALUES (?, ?, ?)`,[user, req.params.id, req.body.likeNumber], 
          function (err, result) {
          if (err) throw err;
          res.status(201).json({ message: 'Votre vote a bien été enregistré !' });
        });
      });
      break;
  }
}

exports.getOneLiker = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
  const user = decodedToken.user;
  database.promise().query(`SELECT * FROM Like_state WHERE user_like_email= ? AND post_id= ?`,[user, req.params.id])
    .then(data => {
      res.status(200).json((JSON.parse(JSON.stringify(data[0])))[0])
    })
    .catch(error => res.status(500).json({ error }));
}

exports.deleteOnePost = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
  const user = decodedToken.user;
  const userAdmin = decodedToken.userIsAdmin;
  database.promise().query(`SELECT * FROM Post WHERE id= ?`, [req.params.id])
  .then(data => {
    const post = (JSON.parse(JSON.stringify(data[0])))[0];
    if (userAdmin === 1 ) {
      const fileName = post.image_url.split('/images/')[1];
      fs.unlink (`images/${fileName}`, () => {
        database.promise().query(`CALL admin_delete_post(?);`,[req.params.id])
        .then(() => {
          res.status(200).json({ message: 'Le post a bien été supprimé'})
        })
        .catch(error => res.status(500).json({ error }));
      })
    } else {
      const fileName = post.image_url.split('/images/')[1];
      fs.unlink (`images/${fileName}`, () => {
        database.promise().query(`CALL delete_post(?, ?);`,[req.params.id, user])
        .then(() => {
          res.status(200).json({ message: 'Votre post a bien été supprimé'})     
        })
        .catch(error => res.status(500).json({ error }));
      })
    }
  })
  .catch(error => res.status(500).json({ error }));
}

exports.deleteOneComment = (req, res, next) => {
  database.promise().query(`DELETE FROM Comment WHERE id= ?;`,[req.params.id])
    .then(() =>{
      res.status(200).json({ message: 'Le commentaire a bien été supprimé'})
    })
    .catch(error => res.status(500).json({ error }));
}

