const express = require('express');
const router = express.Router();
const controller = require('../controllers/messageController');

router.post('/', controller.createMessage);
router.get('/:chatId', controller.getMessage);

module.exports = router;
