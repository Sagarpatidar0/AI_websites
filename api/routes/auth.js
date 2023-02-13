const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

// Registration Route
router.post('/register', async (req, res) => {
    try {
        const password = req.body.password;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({...req.body,password: hashedPassword});
        const newUser = await user.save();
        res.status(200).json(newUser);
    } catch (err) {
        res.status(500).json(err.message || err);
    }
});

// Login Route
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            if (await bcrypt.compare(req.body.password, user.password)) {
                const { password, ...other } = user._doc;
                res.status(200).json(other);
            } else {
                res.status(401).json({ message: 'Invalid Credentials' });
            }
        } else {
            res.status(401).json({ message: 'Invalid Credentials' });
        }
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;