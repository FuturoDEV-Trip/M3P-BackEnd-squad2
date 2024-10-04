const { Router, query } = require('express') // 
const Usuarios = require('../models/models.usuarios')
const { auth } = require('../middleware/auth')
const UsuariosController = require('../controllers/usuariosController')

const usuariosRoutes = new Router()

usuariosRoutes.post('/', UsuariosController.cadastrar );

usuariosRoutes.get('/',  UsuariosController.consultar);

usuariosRoutes.delete('/:id',  UsuariosController.deletar);

usuariosRoutes.put('/:id', UsuariosController.alterar)

module.exports = usuariosRoutes