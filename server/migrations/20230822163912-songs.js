'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Song', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      artist: {
        type: Sequelize.STRING,
        allowNull: true
      },
      genre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      album: {
        type: Sequelize.STRING,
        allowNull: false
      },
      albumImageUrl: {
        type: Sequelize.STRING,
        defaultValue: false
      },
      youtubeId: {
        type: Sequelize.STRING,
        defaultValue: false
      },
      lyrics: {
        type: Sequelize.TEXT,
        defaultValue: false
      },
      tab: {
        type: Sequelize.TEXT,
        defaultValue: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Song')
  }
}
