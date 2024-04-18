const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

router.post('/createUser', controller.createUser);
router.post('/loginUser', controller.loginUser);
router.get('/find/:userId', controller.findUser );

module.exports = router;
