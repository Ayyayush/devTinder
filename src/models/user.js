const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // <-- Add this
const JWT_SECRET = "your_jwt_secret_key"; // <-- Add this or use process.env.JWT_SECRET

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 50,
    index: true,
    trim: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email Address");
      }
    },
  },
  password: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isStrongPassword(value)) {
        throw new Error("Enter a Strong Password");
      }
    },
  },
  age: {
    type: Number,
    min: 18,
  },
  gender: {
    type: String,
    enum: {
      values: ["male", "female", "others"],
      message: `{VALUE} is not a valid gender`,
    },
  },
  photoUrl: {
    type: String,
    default: "data:image/webp;base64,...", // truncated for brevity
    // validate(value) {
    //   if (!validator.isURL(value)) {
    //     throw new Error("Invalid Photo URL Address");
    //   }
    // },
  },
  about: {
    type: String,
    default: "This is a default about of the user!",
  },
  skills: {
    type: [String],
  },
},
{
  timestamps: true,
});

// Add virtual for full name
userSchema.virtual('name').get(function() {
  return `${this.firstName} ${this.lastName || ''}`.trim();
});

// Make sure virtual fields are included in JSON output
userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

// Add compound indexes for better query performance
userSchema.index({ firstName: 1, lastName: 1 }); // For searching by full name
userSchema.index({ age: 1, gender: 1 }); // For filtering by age and gender
userSchema.index({ skills: 1, age: 1 }); // For skill-based searches with age filter
userSchema.index({ email: 1, firstName: 1 }); // For user lookup optimizations

userSchema.methods.getJWT = function () {
  const user = this;
  const token = jwt.sign(
    { userId: user._id, email: user.email },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );
  return isPasswordValid;
};

module.exports = mongoose.model("User", userSchema);