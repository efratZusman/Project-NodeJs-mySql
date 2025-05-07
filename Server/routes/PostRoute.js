const express = require('express');
const postController = require('../controllers/PostController');

const router = express.Router();

router.get('/', postController.getAllPosts);
router.post('/', postController.createPost);
router.get('/:id', postController.getPostById);
router.put('/:id', postController.updatePostById);
router.delete('/:id', postController.deletePostById);

module.exports = router;
