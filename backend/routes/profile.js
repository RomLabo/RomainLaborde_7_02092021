const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/auth-admin');


router.get('/', auth, profileController.getProfile);

router.get('/:id', auth, authAdmin, profileController.getOneProfile);

router.delete('/', auth, profileController.deleteProfile);

router.delete('/:id', auth, authAdmin, profileController.deleteOneProfile);


module.exports = router;