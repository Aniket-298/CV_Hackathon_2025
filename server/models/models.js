// const mongoose = require('mongoose');

// // 1. User Schema
// const UserSchema = new mongoose.Schema({
//   firstName: { type: String },
//   lastName: { type: String },
//   username: { type: String, required: true, unique: true },
//   email: { type: String },
//   password: { type: String }, // Hashed password
//   createdAt: { type: Date, default: Date.now }
// });

// const User = mongoose.model('User', UserSchema);

// // 2. Uploaded Recipe Schema (public posts like Instagram)
// const UploadedRecipeSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   instructions: { type: String, required: true },
//   mainIngredients: [String],
//   leftoverIngredients: [String],
//   image: { type: String }, // Image URL or base64
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
//   comments: [
//     {
//       user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//       text: String,
//       createdAt: { type: Date, default: Date.now }
//     }
//   ],
//   createdAt: { type: Date, default: Date.now }
// });

// const UploadedRecipe = mongoose.model('UploadedRecipe', UploadedRecipeSchema);

// // 3. Generated Recipe Schema (AI-generated from leftovers)
// const GeneratedRecipeSchema = new mongoose.Schema({   
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   leftoverItems: [String],
//   recipeGenerated: { type: String, required: true },
//   youtubeLink: { type: String },
//   createdAt: { type: Date, default: Date.now }
// });

// const GeneratedRecipe = mongoose.model('GeneratedRecipe', GeneratedRecipeSchema);

// // Export all models
// module.exports = {
//   User,
//   UploadedRecipe,
//   GeneratedRecipe
// };

const mongoose = require('mongoose');

// 1. User Schema
const UserSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);

// 2. Uploaded Recipe Schema (public posts like Instagram)
const UploadedRecipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  instructions: { type: String, required: true },
  mainIngredients: [{ type: String }],
  leftoverIngredients: [{ type: String }],
  image: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      text: { type: String, required: true },
      createdAt: { type: Date, default: Date.now }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

const UploadedRecipe = mongoose.model('UploadedRecipe', UploadedRecipeSchema);

// 3. Generated Recipe Schema (AI-generated from leftovers)
const GeneratedRecipeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipeGenerated: { type: String, required: true },
  leftoverItems: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

const GeneratedRecipe = mongoose.model('GeneratedRecipe', GeneratedRecipeSchema);

// Export all models
module.exports = {
  User,
  UploadedRecipe,
  GeneratedRecipe
};