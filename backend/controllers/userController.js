const jwt = require('jsonwebtoken');
const { User } = require('../models/userData');

const UserController = {
  // Register a new user
  async register(req, res) {
    try {
      const { firstName, lastName, email, password } = req.body;

      const registeredUser = await User.create({
        firstName,
        lastName,
        email,
        password,
      });

      // remove the password
      const networkData = {
        _id: registeredUser._id,
        firstName: registeredUser.firstName,
        lastName: registeredUser.lastName,
        email: registeredUser.email,
      };

      res.status(201).json(networkData);
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
      if (!user || !user.matchPassword(password)) {
        return res.status(401).send('Invalid email or password');
      }
      //      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });

      const networkData = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };

      res.status(200).json(networkData);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  // Get user details along with favorite recipes
  async getUserDetails(req, res) {
    const id = req.params.id;
    try {
      const user = await User.findById(id).select('-password -createAt -updatedAt -__v').populate('favoriteRecipes');
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
      const { id, recipeId } = req.body;

      const user = await User.findById(id);
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
  },
};

module.exports = UserController;
