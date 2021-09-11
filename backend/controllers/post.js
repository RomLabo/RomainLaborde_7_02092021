const database = require('../models/data-base');



exports.getAllPosts = (req, res, next) => {
    database.promise().query('SELECT * FROM Post')
      .then(data => {
        console.log(JSON.parse(JSON.stringify(data[0])));
        res.status(200).json((JSON.parse(JSON.stringify(data[0]))))
      })
      .catch(error => res.status(500).json({ error }));
}