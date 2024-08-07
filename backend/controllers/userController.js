const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userData'); 

const UserController = {
    // Register a new user
    async register(req, res) {
        try {
            const { email, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                email,
                password: hashedPassword
            });
            await newUser.save();
            res.status(201).send('User registered successfully');
        } catch (error) {
            if (error.code === 11000) {
                res.status(409).send('Email already in use');
            } else {
                res.status(500).send(error.message);
            }
        }
    },

    // Authenticate a user
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(401).send('Invalid email or password');
            }
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
            res.status(200).json({ token });
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    // Get user details along with favorite recipes
    async getUserDetails(req, res) {
        try {
            const user = await User.findById(req.user.userId).populate('favoriteRecipes');
            if (!user) {
                return res.status(404).send('User not found');
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    // Update favorite recipes
    async updateFavorites(req, res) {
        try {
            const { userId } = req.user;
            const { recipeId } = req.body;
            const user = await User.findById(userId);
            const index = user.favoriteRecipes.indexOf(recipeId);
            if (index > -1) {
                user.favoriteRecipes.splice(index, 1); // Remove if already exists
            } else {
                user.favoriteRecipes.push(recipeId); // Add if not exists
            }
            await user.save();
            res.status(200).send('Favorites updated successfully');
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
};

module.exports = UserController;
