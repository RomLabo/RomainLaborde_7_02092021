const express = require('express');
const router = express.Router();
const sauceController = require('../controllers/post');
//const auth = require('../middleware/auth');
//const multer = require('../middleware/multer-config');

router.get('/', sauceController.getAllPosts);



module.exports = router;