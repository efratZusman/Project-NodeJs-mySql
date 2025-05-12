const db = require('../../DB/connection');

// Create a new todo
exports.createTodo = async function createTodo(todoData) {
    const { userId, title, description, isCompleted = false } = todoData;
    const query = `
        INSERT INTO Todos (UserID, Title, Description, IsCompleted) 
        VALUES (?, ?, ?, ?)
    `;
    const values = [userId, title, description, isCompleted];

    try {
        const [result] = await db.execute(query, values);
        return result.insertId;
    } catch (error) {
        throw new Error('Error creating todo: ' + error.message);
    }
};

// Get todo by ID
exports.getTodoById = async function getTodoById(todoId) {
    const query = 'SELECT * FROM Todos WHERE TodoID = ?';
    try {
        const [rows] = await db.execute(query, [todoId]);
        console.log(rows[0]);
        console.log(rows);
        return rows;
    } catch (error) {
        throw new Error('Error fetching todo: ' + error.message);
    }
};

// Get all todos (optionally by user ID)
exports.getAllTodos = async function getAllTodos(userId = null) {
    const query = userId 
        ? 'SELECT * FROM Todos WHERE UserID = ?'
        : 'SELECT * FROM Todos';
    const params = userId ? [userId] : [];

    try {
        const [rows] = await db.execute(query, params);
        return rows;
    } catch (error) {
        throw new Error('Error fetching todos: ' + error.message);
    }
};

// Update todo by ID
exports.updateTodoById = async function updateTodoById(todoId, todoData) {
    const { title, description, isCompleted } = todoData;
    const query = `
        UPDATE Todos 
        SET Title = ?, Description = ?, IsCompleted = ?
        WHERE TodoID = ?
    `;
    const values = [title, description, isCompleted, todoId];

    try {
        const [result] = await db.execute(query, values);
        return result.affectedRows > 0;
    } catch (error) {
        throw new Error('Error updating todo: ' + error.message);
    }
};

// Delete todo by ID
exports.deleteTodoById = async function deleteTodoById(todoId) {
    const query = 'DELETE FROM Todos WHERE TodoID = ?';
    try {
        const [result] = await db.execute(query, [todoId]);
        return result.affectedRows > 0;
    } catch (error) {
        throw new Error('Error deleting todo: ' + error.message);
    }
};

exports.getTodosByUserId = async function(userId) {
    const query = 'SELECT * FROM Todos WHERE UserID = ?';
    try {
        const [rows] = await db.execute(query, [userId]);
        console.log(rows);
        return rows; // זה מערך של todos
    } catch (error) {
        throw new Error('Error fetching todos: ' + error.message);
    }
};

