//where the mongoose schema goes
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new mongoose.Schema({
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    favoriteRecipes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Recipe',
      }
    ],
  });
  
  module.exports = mongoose.model('User', userSchema);