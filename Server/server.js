const express = require('express');
const cors = require('cors');
const userRoute = require('./routes/UserRoute');
const postRoute = require('./routes/PostRoute');
const commentRoute = require('./routes/CommentRoute');
const todoRoute = require('./routes/TodoRoute');
// const mysql = require('mysql');
// const bodyParser = require('body-parser');

const app = express();
// const port = 3000;
app.use(cors({
    origin: 'http://localhost:5173'
  }));

  console.log("cors");
// Middleware
app.use(express.json());
app.use("/users", userRoute);
app.use("/todos", todoRoute);
app.use("/comments", commentRoute);
app.use("/posts", postRoute);




app.use("/", (req, res) =>{
    try {
     
        res.status(200).json("sari");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
});
