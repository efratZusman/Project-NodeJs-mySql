const express = require('express');
const userRoute = require('./routes/UserRoute');
// const mysql = require('mysql');
// const bodyParser = require('body-parser');

const app = express();
// const port = 3000;

// Middleware
app.use(express.json());
app.use("/users", userRoute);
app.use("/", (req, res) =>{
    try {
     
        res.status(200).json("sari");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Routes



// Start the server
app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
});
