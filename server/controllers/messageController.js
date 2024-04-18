const { messages } = require("../models");

async function createMessage(req, res) {
    try {
        const { chatId, senderId, text } = req.body;
        await messages.create({ chatId, senderId, text }).then(data => res.status(200).json(data))
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error)
    }
}

async function getMessage(req, res) {
    try {
        const { chatId } = req.params;

        const Messages = await messages.findAll({where: {chatId}})

        return res.status(200).json(Messages);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error)
    }
}

module.exports = {
    createMessage,
    getMessage
}