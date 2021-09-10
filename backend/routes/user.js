const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const validPassword = require('../middleware/valid-password');
const rateLimiter = require('../middleware/rate-limiter');

router.post('/signin', userController.signin);

router.post('/login', rateLimiter, userController.login);

router.get('/home', userController.allPost);

module.exports = router;