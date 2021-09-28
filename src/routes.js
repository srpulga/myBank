const { Router } = require('express');

const UserController = require('./app/controllers/UserController');

const router = Router();

router.post('/users', UserController.store); // Create User
router.get('/users', UserController.index); // Find All
router.get('/users/:id', UserController.show); // Find By Id

module.exports = router;