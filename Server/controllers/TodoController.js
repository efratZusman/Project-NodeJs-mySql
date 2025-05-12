const TodoService = require('../service/TodoService');

// Get all todos
exports.getAllTodos = async (req, res) => {
    try {
        const todos = await TodoService.getAllTodos();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get todo by ID
exports.getTodoById = async (req, res) => {
    try {
        const todo = await TodoService.getTodoById(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        console.log(res.status(200).json(todo));
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create new todo
exports.createTodo = async (req, res) => {
    try {
        const newTodo = await TodoService.createTodo(req.body);
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update todo by ID
exports.updateTodoById = async (req, res) => {
    try {
        const updated = await TodoService.updateTodoById(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete todo by ID
exports.deleteTodoById = async (req, res) => {
    try {
        const deleted = await TodoService.deleteTodoById(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getTodosByUserId = async (req, res) => {
    try {
        const todos = await TodoService.getTodosByUserId(req.params.id);
        res.status(200).json(todos); // שולח ישירות את המערך
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

