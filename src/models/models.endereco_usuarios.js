const { DataTypes } = require('sequelize');
const { connection } = require('../database/connection');

const endereco_usuario = connection.define('endereco_usuario', {
    cep_local: {
        type: DataTypes.STRING
    },
    latitude_endereco: {
        type: DataTypes.DOUBLE
    },
    longitude_endereco: {
        type: DataTypes.DOUBLE
    },
    logradouro_endereco: {
        type: DataTypes.STRING
    },
    numero_endereco: {
        type: DataTypes.NUMBER
    },
    bairro_endereco: {
        type: DataTypes.STRING
    },
    cidade_endereco: {
        type: DataTypes.STRING
    },
    estado_endereco: {
        type: DataTypes.STRING
    },
    complemento_endereco: {
        type: DataTypes.STRING
    }
});

module.exports = endereco_usuario;



