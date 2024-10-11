const { Router, query } = require('express') // 
const { auth } = require('../middleware/auth')
const locaisController = require('../controllers/locaisController');

const locaisRoutes = new Router()

locaisRoutes.post('/', auth, locaisController.cadastrarCEP);

locaisRoutes.get('/local', auth, locaisController.consultar);

locaisRoutes.delete('/local/:local_id', auth, locaisController.deletar);

locaisRoutes.put('/local/:local_id', auth, locaisController.alterar);



module.exports = locaisRoutes