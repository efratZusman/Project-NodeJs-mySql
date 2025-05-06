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

// Get user by ID
exports.getUserById = async function getUserById(req, res) {
    try {
        const userId = req.params.id;
        const user = await UserService.getUserById(userId);
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
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an existing user
exports.updateUserById = async function updateUserById(req, res) {
    try {
        const userId = req.params.id;
        const userData = req.body;
        const updatedUser = await UserService.updateUserById(userId, userData);
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a user
exports.deleteUserById = async function deleteUserById(req, res) {
    try {
        const userId = req.params.id;
        const deleted = await UserService.deleteUserById(userId);
        if (!deleted) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
