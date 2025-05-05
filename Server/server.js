const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// MySQL Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password', // Replace with your MySQL password
    database: 'my_database' // Replace with your database name
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

// Routes

// GET all items
app.get('/items', (req, res) => {
    const query = 'SELECT * FROM items';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching items');
        } else {
            res.json(results);
        }
    });
});

// GET a single item by ID
app.get('/items/:id', (req, res) => {
    const query = 'SELECT * FROM items WHERE id = ?';
    db.query(query, [req.params.id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching item');
        } else if (results.length === 0) {
            res.status(404).send('Item not found');
        } else {
            res.json(results[0]);
        }
    });
});

// POST a new item
app.post('/items', (req, res) => {
    const query = 'INSERT INTO items (name, description) VALUES (?, ?)';
    const { name, description } = req.body;
    db.query(query, [name, description], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error adding item');
        } else {
            res.status(201).send('Item added successfully');
        }
    });
});

// PUT (update) an item by ID
app.put('/items/:id', (req, res) => {
    const query = 'UPDATE items SET name = ?, description = ? WHERE id = ?';
    const { name, description } = req.body;
    db.query(query, [name, description, req.params.id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error updating item');
        } else if (results.affectedRows === 0) {
            res.status(404).send('Item not found');
        } else {
            res.send('Item updated successfully');
        }
    });
});

// DELETE an item by ID
app.delete('/items/:id', (req, res) => {
    const query = 'DELETE FROM items WHERE id = ?';
    db.query(query, [req.params.id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error deleting item');
        } else if (results.affectedRows === 0) {
            res.status(404).send('Item not found');
        } else {
            res.send('Item deleted successfully');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});