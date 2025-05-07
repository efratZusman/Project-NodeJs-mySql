const db = require('../../DB/connection');

// Create a new user with password (using transaction)
exports.createUser = async function createUser(userData) {
    const { username, email, passwordHash } = userData;
    const userQuery = 'INSERT INTO Users (Username, Email) VALUES (?, ?)';
    const passwordQuery = 'INSERT INTO Passwords (UserID, PasswordHash) VALUES (?, ?)';
    const userValues = [username, email];

    try {
        await db.beginTransaction();

        const [userResult] = await db.execute(userQuery, userValues);
        const userId = userResult.insertId;

        const passwordValues = [userId, passwordHash];
        await db.execute(passwordQuery, passwordValues);

        await db.commit();
        return userId;
    } catch (error) {
        await db.rollback();
        throw new Error('Error creating user: ' + error.message);
    }
};

// Get user by ID
exports.getUserById = async function getUserById(userId) {
    const query = `
        SELECT Users.UserID, Users.Username, Users.Email, Users.CreatedAt, Passwords.PasswordHash 
        FROM Users 
        LEFT JOIN Passwords ON Users.UserID = Passwords.UserID 
        WHERE Users.UserID = ?
    `;
    try {
        const [rows] = await db.execute(query, [userId]);
        return rows[0];
    } catch (error) {
        throw new Error('Error fetching user: ' + error.message);
    }
};

// Get all users
exports.getAllUsers = async function getAllUsers() {
    const query = 'SELECT * FROM Users';
    try {
        const [rows] = await db.execute(query);
        return rows;
    } catch (error) {
        throw new Error('Error fetching users: ' + error.message);
    }
};

// Update user info and password (using transaction)
exports.updateUserById = async function updateUserById(userId, userData) {
    const { username, email, passwordHash } = userData;
    const userQuery = 'UPDATE Users SET Username = ?, Email = ? WHERE UserID = ?';
    const passwordQuery = 'UPDATE Passwords SET PasswordHash = ? WHERE UserID = ?';
    const userValues = [username, email, userId];
    const passwordValues = [passwordHash, userId];

    try {
        await db.beginTransaction();

        await db.execute(userQuery, userValues);
        await db.execute(passwordQuery, passwordValues);

        await db.commit();
        return true;
    } catch (error) {
        await db.rollback();
        throw new Error('Error updating user: ' + error.message);
    }
};

// Delete user by ID
exports.deleteUserById = async function deleteUserById(userId) {
    const query = 'DELETE FROM Users WHERE UserID = ?';
    try {
        const [result] = await db.execute(query, [userId]);
        return result.affectedRows > 0;
    } catch (error) {
        throw new Error('Error deleting user: ' + error.message);
    }
};
