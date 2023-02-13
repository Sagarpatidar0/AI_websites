const Post = require("../models/post");
const express = require("express");
const router = express.Router();

router.get("/posts", async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});
router.get("/post/:email", async (req, res) => {
    const email = req.params.email;
    try {
        const posts = await Post.find({email: email});
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/post', async (req, res)=> {
    const newPost = new Post({
        prompt: req.body.prompt,
        email: req.body.email,
        image: req.body.image
        });
        try {
            const post = await newPost.save();
            res.status(200).json(post);
        } catch (error) {
            res.status(error.status).json(error.message);
        }
});

module.exports = router; 