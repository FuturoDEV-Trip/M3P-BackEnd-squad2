const { DataTypes } = require('sequelize');
const { connection } = require('../database/connection');

const Usuarios = connection.define('usuarios', {
    nome: {
        type: DataTypes.STRING
    },
    data_nascimento: {
        type: DataTypes.DATE
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    sexo: {
        type: DataTypes.STRING
    },
    cpf: {
        type: DataTypes.STRING
    },
    id_endereco: {
        type: DataTypes.INTEGER,
    references: {
            model: 'endereco_usuarios',
            key: 'id_endereco'                   
                }
    }
});

module.exports = Usuarios;



