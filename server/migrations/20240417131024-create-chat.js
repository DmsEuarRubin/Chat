'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('chats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      members: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('chats');
  }
};