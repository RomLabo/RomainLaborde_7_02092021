const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');
const auth = require('../middleware/auth');
//const auth = require('../middleware/auth');
//const multer = require('../middleware/multer-config');

router.get('/', postController.getAllPosts);

router.get('/:id', postController.getOnePost);

router.get('/comments/:id', postController.getAllComments);

router.post('/comments/:id', postController.createComment);

router.post('/', postController.createPost);





module.exports = router;