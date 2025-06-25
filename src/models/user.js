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
  },  gender: {
    type: String,
    enum: 
    {
      values:["male", "female", "others"],
      message:`{VALUE} is not a valid gender` ,

    }
    // validate(value) {
    //   if (!["male", "female", "others"].includes(value)) {
    //     throw new Error("Gender data is not valid");
    //   }
    // },
  },
  photoUrl: {
    type: String,
    default: "data:image/webp;base64,...", // truncated for brevity
    // validate(value) {
    //   if (!validator.isURL(value)) {
    //     throw new Error("Invalid Photo URL Address");
    //   }
     //},
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