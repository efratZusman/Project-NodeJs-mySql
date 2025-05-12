const CommentService = require('../service/CommentService');

// Get all comments
exports.getAllComments = async (req, res) => {
    try {
        const comments = await CommentService.getAllComments();
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.partialUpdateCommentById = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body; // הנתונים לעדכון מגיעים מגוף הבקשה
        const updatedComment = await commentService.partialUpdateCommentById(id, updates);
        if (!updatedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(200).json(updatedComment);
    } catch (error) {
        console.error('Error patching comment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get comment by Post ID
exports.getCommentByPostId = async (req, res) => {
    try {
        const comment = await CommentService.getCommentByPostId(req.params.id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create new comment
exports.createComment = async (req, res) => {
    try {
        const newComment = await CommentService.createComment(req.body);
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update comment by ID
exports.updateCommentById = async (req, res) => {
    try {
        const updated = await CommentService.updateCommentById(req.params.id, req.body.content);
        if (!updated) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete comment by ID
exports.deleteCommentById = async (req, res) => {
    try {
        const deleted = await CommentService.deleteCommentById(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
