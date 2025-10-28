'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      username: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      firstName: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      lastName: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      bio: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      avatar: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: '/images/placeholders/avatar.png'
      },
      coverImage: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      country: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      city: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      location: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      website: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      instagram: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      twitter: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      facebook: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      youtube: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      socialLinks: {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: {}
      },
      role: {
        type: Sequelize.ENUM('user', 'verified', 'admin'),
        defaultValue: 'user'
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      isEmailVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      followerCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      followingCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      recipeCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      lastLoginAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    // Índices para mejorar performance
    await queryInterface.addIndex('users', ['email']);
    await queryInterface.addIndex('users', ['username']);
    await queryInterface.addIndex('users', ['role']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};