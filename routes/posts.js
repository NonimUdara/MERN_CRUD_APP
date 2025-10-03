const express = require('express');
const router = express.Router();

// Import controller functions
const {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
} = require('../controllers/posts');

// @route   POST /post/save
// @desc    Create a new post
router.post('/post/save', createPost);

// @route   GET /posts
// @desc    Get all posts
router.get('/posts', getAllPosts);

// @route   GET /post/:id
// @desc    Get a specific post by ID
router.get('/post/:id', getPostById);

// @route   PUT /post/update/:id
// @desc    Update a post by ID
router.put('/post/update/:id', updatePost);

// @route   DELETE /post/delete/:id
// @desc    Delete a post by ID
router.delete('/post/delete/:id', deletePost);

module.exports = router;