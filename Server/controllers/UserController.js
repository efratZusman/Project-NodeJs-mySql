const UserService = require('../service/UserService');

// Get all users
exports.getAllUsers = async function getAllUsers(req, res) {
    try {
        const users = await UserService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get user by username
exports.getUserByUsername = async function getUserByUsername(req, res) {
    try {
        const username = req.params.username;
        const user = await UserService.getUserByUsername(username);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new user
exports.createUser = async function createUser(req, res) {
    try {
        const userData = req.body;
        const newUser = await UserService.createUser(userData);
        res.status(201).json({ userId: newUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an existing user by username
exports.updateUserByUsername = async function updateUserByUsername(req, res) {
    try {
        const username = req.params.username;
        const userData = req.body;
        const updated = await UserService.updateUserByUsername(username, userData);
        if (!updated) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a user by username
exports.deleteUserByUsername = async function deleteUserByUsername(req, res) {
    try {
        const username = req.params.username;
        const deleted = await UserService.deleteUserByUsername(username);
        if (!deleted) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};