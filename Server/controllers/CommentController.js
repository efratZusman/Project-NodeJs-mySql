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

// Get comment by ID
exports.getCommentById = async (req, res) => {
    try {
        const comment = await CommentService.getCommentById(req.params.id);
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
