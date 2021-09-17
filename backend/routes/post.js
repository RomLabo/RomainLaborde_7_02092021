const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/', auth, postController.getAllPosts);

router.get('/:id', auth, postController.getOnePost);

router.get('/comments/:id', auth, postController.getAllComments);

router.post('/comments/:id', auth, postController.createComment);

router.post('/', auth, multer, postController.createPost);

router.post('/:id/like', auth, postController.createStateLike);

router.get('/like/:id', auth, postController.getOneLiker);

router.delete('/:id', auth, postController.deleteOnePost);





module.exports = router;