const jwt = require("jsonwebtoken");
const { User } = require("../models/userData");

const UserController = {
  generateToken(userId) {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "2h" });
  },

  // Register a new user
  async register(req, res) {
    try {
      const { firstName, lastName, email, password } = req.body;

      let user = await User.create({
        firstName,
        lastName,
        email,
        password,
      });

      const token = UserController.generateToken(user._id);

      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 2 * 60 * 60 * 1000, // <----- 2 hours
      });

      // convert to plain old javascript object, rather than mongoose object to delete properties
      user = user.toObject();
      delete user.password;
      delete user.createdAt;
      delete user.updatedAt;
      delete user.__v;

      res.status(201).json(user);
    } catch (error) {
      if (error.code === 11000) {
        res.status(409).send("Email already in use");
      } else {
        res.status(500).send(error.message);
      }
    }
  },
  // Authenticate a user
  async login(req, res) {
    try {
      const { email, password } = req.body;
      let user = await User.findOne({ email }).populate("favoriteRecipes");
      const isMatch = await user.matchPassword(password, user.password);

      if (!user || !isMatch) {
        return res.status(401).send("Invalid email or password");
      }

      const token = UserController.generateToken(user._id);

      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 2 * 60 * 60 * 1000, // <----- 2 hours
      });

      // convert to plain old javascript object, rather than mongoose object to delete properties
      user = user.toObject();
      delete user.password;
      delete user.createdAt;
      delete user.updatedAt;
      delete user.__v;

      res.status(200).json(user);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  async logout(req, res) {
    res.clearCookie('token');
    res.status(200).send('Logged out successfully');
  },

  // Get user details along with favorite recipes
  async getUserDetails(req, res) {
    const id = req.userId;
    console.log(id)
    try {
      const user = await User.findById(id)
        .select("-password -createAt -updatedAt -__v")
        .populate("favoriteRecipes");
      if (!user) {
        return res.status(404).send("User not found");
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  // Update favorite recipes
  async updateFavorites(req, res) {
    console.log("hit");
    const id = req.userId;
    try {
      const { recipeId } = req.body;

      const user = await User.findById(id);
      const index = user.favoriteRecipes.indexOf(recipeId);

      if (index > -1) {
        user.favoriteRecipes.splice(index, 1); // Remove if already exists
      } else {
        user.favoriteRecipes.push(recipeId); // Add if not exists
      }
      await user.save();
      res.status(200).send("Favorites updated successfully");
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
};

module.exports = UserController;
