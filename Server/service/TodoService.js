const db = require('../../DB/connection');

// Create a new todo
exports.createTodo = async function createTodo(todoData) {
    const { UserID, Title, IsCompleted = false } = todoData;
    const query = `
        INSERT INTO Todos (UserID, Title, IsCompleted) 
        VALUES (?, ?, ?)
    `;
    const values = [UserID, Title, IsCompleted];

    try {
        const [result] = await db.execute(query, values);
        const insertedTodoQuery = 'SELECT * FROM Todos WHERE TodoID = ?';
        console.log(result);
          console.log("jjjjjjjjjjjjjjjjjjjj");
        const [insertedTodo] = await db.execute(insertedTodoQuery, [result.insertId]);
        return insertedTodo[0];
    } catch (error) {
        throw new Error('Error creating todo: ' + error.message);
    }
};

exports.patchTodoById = async (id, updates) => {
    try {
        const fields = Object.keys(updates).map((key) => `${key} = ?`).join(', ');
        const values = Object.values(updates);
        const query = `UPDATE todos SET ${fields} WHERE id = ?`;
        const [result] = await connection.execute(query, [...values, id]);
        return result.affectedRows > 0 ? { id, ...updates } : null;
    } catch (error) {
        console.error('Error in patchTodoById service:', error);
        throw error;
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
    const { Title, IsCompleted } = todoData;
    const query = `
        UPDATE Todos 
        SET Title = ?,  IsCompleted = ?
        WHERE TodoID = ?
    `;
    const values = [Title, IsCompleted, todoId];

    try {
        const [result] = await db.execute(query, values);
        if (result.affectedRows > 0) {
            const updatedTodoQuery = 'SELECT * FROM Todos WHERE TodoID = ?';
            const [updatedTodo] = await db.execute(updatedTodoQuery, [todoId]);
            return updatedTodo[0];
        }
        return null;
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

