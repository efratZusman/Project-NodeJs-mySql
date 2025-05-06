const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost', // Replace with your database host
    user: "root", // Replace with your database username from environment variables
    password: 'Sari2005', // Replace with your database password from environment variables
    Port: 3000,
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
 module.exports = connection.promise();