const { Router } = require('express') 
const LogoutController = require('../controllers/logoutController')

const logoutRoutes = new Router()


logoutRoutes.post('/', LogoutController.logout)


module.exports = logoutRoutes
