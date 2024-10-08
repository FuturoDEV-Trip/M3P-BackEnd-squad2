const { Router, query } = require('express') // 
const { auth } = require('../middleware/auth')
const locaisController = require('../controllers/locaisController');

const locaisRoutes = new Router()

locaisRoutes.post('/:info', auth, locaisController.cadastrarCEP);

locaisRoutes.post('/:lat/:long', auth, locaisController.cadastrarLatLong);

locaisRoutes.get('/local', auth, locaisController.consultar);

locaisRoutes.get('/local/:local_id', auth, locaisController.consultarUm);

locaisRoutes.delete('/local/:local_id', auth, locaisController.deletar);

locaisRoutes.put('/local/:local_id', auth, locaisController.alterar);



module.exports = locaisRoutes