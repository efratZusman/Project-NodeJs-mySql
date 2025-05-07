const mysql = require('mysql2/promise');
const connection = require('./connection');

const initDb = async () => {
  // const connection = await mysql.createConnection(db);

  try {
    await connection.query(`CREATE DATABASE IF NOT EXISTS my_project_db`);
    await connection.query(`USE my_project_db`);
  
    await connection.query(`DROP TABLE IF EXISTS Comments, Posts, Todos, Passwords, Users`);

    // יצירת טבלאות
    await connection.query(`
      CREATE TABLE Users (
        UserID INT PRIMARY KEY AUTO_INCREMENT,
        Username VARCHAR(50) NOT NULL,
        Email VARCHAR(100) NOT NULL UNIQUE,
        CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await connection.query(`
      CREATE TABLE Passwords (
        PasswordID INT PRIMARY KEY AUTO_INCREMENT,
        UserID INT NOT NULL,
        PasswordHash VARCHAR(255) NOT NULL,
        CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE
      )
    `);

    await connection.query(`
      CREATE TABLE Todos (
        TodoID INT PRIMARY KEY AUTO_INCREMENT,
        UserID INT NOT NULL,
        Title VARCHAR(100) NOT NULL,
        Description TEXT,
        IsCompleted BOOLEAN DEFAULT FALSE,
        CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE
      )
    `);

    await connection.query(`
      CREATE TABLE Posts (
        PostID INT PRIMARY KEY AUTO_INCREMENT,
        UserID INT NOT NULL,
        Title VARCHAR(100) NOT NULL,
        Content TEXT NOT NULL,
        CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE
      )
    `);

    await connection.query(`
      CREATE TABLE Comments (
        CommentID INT PRIMARY KEY AUTO_INCREMENT,
        PostID INT NOT NULL,
        UserID INT NOT NULL,
        Content TEXT NOT NULL,
        CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (PostID) REFERENCES Posts(PostID) ON DELETE CASCADE,
        FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE
      )
    `);

    // הכנסת מידע התחלתי
    await connection.query(`
      INSERT INTO Users (Username, Email) VALUES 
      ('john_doe', 'john.doe@example.com'),
      ('jane_smith', 'jane.smith@example.com'),
      ('alice_wonder', 'alice.wonder@example.com'),
      ('bob_builder', 'bob.builder@example.com'),
      ('charlie_brown', 'charlie.brown@example.com')
    `);

    await connection.query(`
      INSERT INTO Passwords (UserID, PasswordHash) VALUES 
      (1, 'hashed_password_for_john'),
      (2, 'hashed_password_for_jane'),
      (3, 'hashed_password_for_alice'),
      (4, 'hashed_password_for_bob'),
      (5, 'hashed_password_for_charlie')
    `);

    await connection.query(`
      INSERT INTO Todos (UserID, Title, Description, IsCompleted) VALUES 
      (1, 'Buy groceries', 'Milk, Bread, Eggs', FALSE),
      (2, 'Finish project', 'Complete the Node.js project', FALSE),
      (3, 'Plan vacation', 'Decide on destination and book tickets', FALSE),
      (4, 'Fix the sink', 'Repair the kitchen sink', FALSE),
      (5, 'Read a book', 'Start reading a new novel', FALSE)
    `);

    await connection.query(`
      INSERT INTO Posts (UserID, Title, Content) VALUES 
      (1, 'My first post', 'This is the content of my first post.'),
      (2, 'Hello world', 'Excited to join this platform!'),
      (3, 'Vacation ideas', 'Looking for suggestions for my next trip.'),
      (4, 'DIY tips', 'Sharing some home improvement tips.'),
      (5, 'Book recommendations', 'What are your favorite books?')
    `);

    await connection.query(`
      INSERT INTO Comments (PostID, UserID, Content) VALUES 
      (1, 2, 'Great post!'),
      (2, 1, 'Welcome to the platform!'),
      (3, 4, 'Check out Bali, it’s amazing!'),
      (4, 3, 'Thanks for the tips!'),
      (5, 2, 'I recommend "To Kill a Mockingbird".')
    `);

    console.log("Database initialized successfully.");
  } catch (err) {
    console.error("Error initializing database:", err);
  } finally {
    await connection.end();
  }
};

initDb();
