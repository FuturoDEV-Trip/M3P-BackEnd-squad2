const { Router } = require("express");

const usuariosRoutes = require("./usuario.route");
const locaisRoutes = require("./local.route");

const routes = Router()
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


routes.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
routes.use('/usuarios', usuariosRoutes)
routes.use('/local', locaisRoutes)


module.exports = routes