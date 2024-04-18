const { chat } = require("../models");
const { Sequelize, DataTypes } = require('sequelize');

const createChat = async (req, res) => {
    try {
        const { firstId, secondId } = req.body;

        const Chat = await chat.findOne({
            where: {
                members: {
                    [Sequelize.Op.and]: [
                        { [Sequelize.Op.contains]: [firstId] },
                        { [Sequelize.Op.contains]: [secondId] }
                    ]
                }
            }
        })
        if (Chat) return res.status(200).json(Chat);

        await chat.create({ members: [firstId, secondId] }).then(data => res.status(200).json({data}));
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error)
    }
}

const findUserChat = async (req, res) => {
    try {
        const userId = req.params.userId;

        const chats = await chat.findAll({
            where: {
                members: {
                    [Sequelize.Op.contains]: [userId]
                }
            }
        })

       return  res.status(200).json(chats)

    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error)
    }
}
const findChat = async (req, res) => {
    try {
        const { firstId, secondId } = req.params;

        const chata = await chat.findOne({
            where: {
                members: {
                    [Sequelize.Op.and]: [
                        { [Sequelize.Op.contains]: [firstId] },
                        { [Sequelize.Op.contains]: [secondId] }
                    ]
                }
            }
        })

        return res.status(200).json(chata)

    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error)
    }
}
module.exports = {
    createChat,
    findUserChat,
    findChat
}