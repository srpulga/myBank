const { Router } = require('express');

const UserController = require('./app/controllers/UserController');

const router = Router();

router.post('/user', UserController.store); // Criar
router.get('/user', UserController.index); // Listar

module.exports = router;