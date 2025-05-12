const express = require('express');
const todoController = require('../controllers/TodoController');

const router = express.Router();
console.log("todo route");
router.get('/', todoController.getAllTodos);
router.post('/', todoController.createTodo);
router.get('/:id', todoController.getTodoById);
router.get('/user/:id', todoController.getTodosByUserId);
router.patch('/:id', todoController.patchTodoById);
router.put('/:id', todoController.updateTodoById);
router.delete('/:id', todoController.deleteTodoById);
module.exports = router;
