'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class messages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  messages.init({
    chatId: {
      type: DataTypes.STRING,
    },
    senderId: {
      type: DataTypes.STRING
    },
    text: {
      type: DataTypes.TEXT(1024)
    }
  }, {
    sequelize,
    modelName: 'messages'
  });
  return messages;
};