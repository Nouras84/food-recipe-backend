// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

// // Create a schema for the User
// const userSchema = new mongoose.Schema(
//   {
//     // Username field, must be unique and is required
//     username: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true, // Trims whitespace from the username
//     },
//     // Email field, must be unique and is required
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true, // Trims whitespace is a process of automatically removing any extra spaces before or after the email text in a user's input.
//     },
//     // Password field, is required
//     password: {
//       type: String,
//       required: true,
//     },
//     // Profile picture field, optional with a default value
//     profilePicture: {
//       type: String,
//       default: "", // Default can be a link to a standard profile image
//     },
//     // Bio field, optional with a default value
//     bio: {
//       type: String,
//       trim: true,
//       default: "",
//     },
//     // Following array, contains references to other User documents, which users following Takhsiin
//     following: [
//       {
//         type: mongoose.Schema.Types.ObjectId, // References another user by their ObjectId
//         ref: "User", // Specifies that the ObjectId references the User model
//       },
//     ],
//     // Followers array, similar structure to the following array
//     followers: [
//       {
//         type: mongoose.Schema.Types.ObjectId, // References another user by their ObjectId
//         ref: "User", // Specifies that the ObjectId references the User model
//       },
//     ],
//     // Favorites array, contains references to Recipe documents
//     favorites: [
//       {
//         type: mongoose.Schema.Types.ObjectId, // References a recipe by its ObjectId
//         ref: "Recipe", // Specifies that the ObjectId references the Recipe model
//       },
//     ],
//   },
//   { timestamps: true }
// ); // Automatically adds createdAt and updatedAt fields to the schema

// // Create the User model from the schema
// const User = mongoose.model("User", userSchema);

// // Export the User model for use in other parts of the application
// module.exports = User;

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

// Create a schema for the User
const userSchema = new mongoose.Schema(
  {
    // Username field, must be unique and is required
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    // Email field, must be unique and is required
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    // Password field, is required
    password: {
      type: String,
      required: true,
    },
    // Profile picture field, optional with a default value
    profilePicture: {
      type: String,
      default: "",
    },
    // Bio field, optional with a default value
    bio: {
      type: String,
      trim: true,
      default: "",
    },
    // Following array, contains references to other User documents
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    // Followers array, similar structure to the following array
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    // Favorites array, contains references to Recipe documents
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe",
      },
    ],
  },
  { timestamps: true }
);

// Pre-save hook to hash password before saving
userSchema.pre("save", function (next) {
  let user = this;

  // Only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // Generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);

    // Hash the password using the new salt
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);

      // Replace the password with the hash
      user.password = hash;
      next();
    });
  });
});

const User = mongoose.model("User", userSchema);
module.exports = User;
