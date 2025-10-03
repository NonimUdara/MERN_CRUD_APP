const Posts = require('../models/posts');

// @desc    Create a new post
// @route   POST /post/save
// @access  Public
const createPost = async (req, res) => {
    try {
        const newPost = new Posts(req.body);
        await newPost.save();
        
        return res.status(200).json({
            success: "Posts saved successfully"
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
};

// @desc    Get all posts
// @route   GET /posts
// @access  Public
const getAllPosts = async (req, res) => {
    try {
        const posts = await Posts.find().exec();
        
        return res.status(200).json({
            success: true,
            existingPosts: posts
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
};

// @desc    Get a specific post by ID
// @route   GET /post/:id
// @access  Public
const getPostById = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Posts.findById(postId);
        
        if (!post) {
            return res.status(404).json({
                success: false,
                error: "Post not found"
            });
        }
        
        return res.status(200).json({
            success: true,
            post
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            error: err.message
        });
    }
};

// @desc    Update a post by ID
// @route   PUT /post/update/:id
// @access  Public
const updatePost = async (req, res) => {
    try {
        const post = await Posts.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );
        
        if (!post) {
            return res.status(404).json({
                error: "Post not found"
            });
        }
        
        return res.status(200).json({
            success: "Updated Successfully",
            post
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
};

// @desc    Delete a post by ID
// @route   DELETE /post/delete/:id
// @access  Public
const deletePost = async (req, res) => {
    try {
        const deletedPost = await Posts.findByIdAndRemove(req.params.id).exec();
        
        if (!deletedPost) {
            return res.status(404).json({
                message: "Delete Unsuccessful",
                error: "Post not found"
            });
        }
        
        return res.status(200).json({
            message: "Delete Successful",
            deletedPost
        });
    } catch (err) {
        return res.status(400).json({
            message: "Delete Unsuccessful",
            error: err.message
        });
    }
};

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
};
