const db = require('../../DB/connection');

// Create new post
exports.createPost = async function createPost(postData) {
    const { userId, title, content } = postData;
    const query = `
        INSERT INTO Posts (UserID, Title, Content)
        VALUES (?, ?, ?)
    `;
    const values = [userId, title, content];

    try {
        const [result] = await db.execute(query, values);
        return result.insertId;
    } catch (error) {
        throw new Error('Error creating post: ' + error.message);
    }
};

// Get post by ID
exports.getPostById = async function getPostById(postId) {
    const query = 'SELECT * FROM Posts WHERE PostID = ?';
    try {
        const [rows] = await db.execute(query, [postId]);
        return rows[0];
    } catch (error) {
        throw new Error('Error fetching post: ' + error.message);
    }
};

// Get all posts (optionally by user)
exports.getAllPosts = async function getAllPosts(userId = null) {
    const query = userId 
        ? 'SELECT * FROM Posts WHERE UserID = ?'
        : 'SELECT * FROM Posts';
    const values = userId ? [userId] : [];

    try {
        const [rows] = await db.execute(query, values);
        return rows;
    } catch (error) {
        throw new Error('Error fetching posts: ' + error.message);
    }
};

// Update post by ID
exports.updatePostById = async function updatePostById(postId, postData) {
    const { title, content } = postData;
    const query = `
        UPDATE Posts 
        SET Title = ?, Content = ?
        WHERE PostID = ?
    `;
    const values = [title, content, postId];

    try {
        const [result] = await db.execute(query, values);
        return result.affectedRows > 0;
    } catch (error) {
        throw new Error('Error updating post: ' + error.message);
    }
};

// Delete post by ID
exports.deletePostById = async function deletePostById(postId) {
    const query = 'DELETE FROM Posts WHERE PostID = ?';
    try {
        const [result] = await db.execute(query, [postId]);
        return result.affectedRows > 0;
    } catch (error) {
        throw new Error('Error deleting post: ' + error.message);
    }
};
