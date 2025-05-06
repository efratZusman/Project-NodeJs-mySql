const express = require('express');
const userRoute = require('./routes/UserRoute');
// const mysql = require('mysql');
// const bodyParser = require('body-parser');

const app = express();
// const port = 3000;

// Middleware
app.use(express.json());

app.use("/users", userRoute);
// Routes



// Start the server
app.listen(3306, () => {
    console.log(`Server is running on http://localhost:3306`);
});