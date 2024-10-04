'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'endereco_usuarios',
      {
        id_endereco: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        cep_enderecol: {
            type: Sequelize.STRING
        },
        latitude_endereco: {
            type: Sequelize.DOUBLE
        },
        longitude_endereco: {
            type: Sequelize.DOUBLE
        },
        logradouro_endereco: {
          allowNull: false,
          type: Sequelize.STRING
        },
        numero_endereco: {
          allowNull: false,
          type: Sequelize.NUMERIC
        },
        bairro_endereco: {
          allowNull: false,
          type: Sequelize.STRING
        },
        cidade_endereco: {
          allowNull: false,
          type: Sequelize.STRING
        },
        estado_endereco: {
          allowNull: false,
          type: Sequelize.STRING
        },
        complemento_endereco: {
          allowNull: false,
          type: Sequelize.STRING
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

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('endereco_usuarios');
  }
};