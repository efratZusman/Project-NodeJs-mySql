const mysql = require('mysql');

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost', // Replace with your database host
    user: process.env.DB_USER, // Replace with your database username from environment variables
    password: process.env.DB_PASSWORD, // Replace with your database password from environment variables
    database: 'ProjectMysql'   // Replace with your database name
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL!');
});

// Export the connection for use in other files
 module.exports = connection;