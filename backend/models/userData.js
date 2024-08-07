//where the mongoose schema goes
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
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
      },
    ],
  },
  {
    timestamps: true,
  }
);
const SALT_WORK_FACTOR = process.env.SALT_WORK_FACTOR || 12;

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSaltSync(Number(SALT_WORK_FACTOR));
    this.password = await bcrypt.hashSync(this.password, salt);
  }
  next();
});

module.exports = mongoose.model('User', userSchema);

const User = mongoose.model('User', userSchema);
module.exports = { User }; 