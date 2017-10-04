'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('Ratings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      rate: {
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        unique: true,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      recipeId: {
        type: Sequelize.INTEGER,
        unique: true,
        onDelete: 'CASCADE',
        references: {
          model: 'Recipes',
          key: 'id',
          as: 'ratings',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Ratings');
  }
};