const express = require('express');
const router = express.Router();
const controller = require('../controllers/chatController');

router.post('/', controller.createChat);
router.get('/:userId', controller.findUserChat);
router.post('/find/:firstId/:secondId', controller.findChat);

module.exports = router;
