const User = require("../models/user.model");

const registerUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ message: 'Error creating user.', err });
    }
}

module.exports = { registerUser };


