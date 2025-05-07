const express = require('express');
const todoController = require('../controllers/TodoController');

const router = express.Router();

router.get('/', todoController.getAllTodos);
router.post('/', todoController.createTodo);
router.get('/:id', todoController.getTodoById);
router.put('/:id', todoController.updateTodoById);
router.delete('/:id', todoController.deleteTodoById);

module.exports = router;
