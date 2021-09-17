const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile');
const auth = require('../middleware/auth');



router.get('/', auth, profileController.getProfile);

router.delete('/', auth, profileController.deleteProfile);


module.exports = router;