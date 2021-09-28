const { Router } = require('express');
const CategoryController = require('./app/controllers/CategoryController');

const UserController = require('./app/controllers/UserController');

const router = Router();

router.post('/users', UserController.store); // Create User
router.get('/users', UserController.index); // Find All
router.get('/users/:id', UserController.show); // Find By Id

router.post('/categories', CategoryController.store); // Create Category
router.get('/categories', CategoryController.index); // Find All

router.delete('/categories/:id', CategoryController.delete); // Delete Category

module.exports = router;