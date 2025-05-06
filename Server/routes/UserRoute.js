const express = require('express');
const userController = require('../controllers/UserController');

const router = express.Router();

// Route to handle getting all users
router.get('/', userController.getAllUsers);

// Route to handle creating a new user
router.post('/', userController.createUser);
// Route to handle getting a user by ID
router.get('/:id', userController.getUserById);

// Route to handle updating a user by ID
router.put('/:id', userController.updateUserById);

// Route to handle deleting a user by ID
router.delete('/:id', userController.deleteUserById);
module.exports = router;
// UserController.js

