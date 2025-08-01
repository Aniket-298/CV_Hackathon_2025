  const express = require('express');
  const mongoose = require('mongoose');
  const bcrypt = require('bcryptjs');
  const cors = require('cors');
  const axios = require('axios');
  require('dotenv').config();

  const app = express();
  const PORT = 5000;

  // Import models
  const { User, UploadedRecipe, GeneratedRecipe } = require('./models/models');

  // Middleware
  app.use(cors({ origin: 'http://localhost:5173' }));
  app.use(express.json());

  // MongoDB Connection
  mongoose.connect(
    'mongodb+srv://aniketsonone2908:Anii_298ket@cluster0.zcvafnf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    { useNewUrlParser: true, useUnifiedTopology: true }
  ).then(() => console.log('MongoDB Connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

  // Dummy auth middleware (DEV ONLY)
  const auth = async (req, res, next) => {
    try {
      const user = await User.findOne();
      if (!user) {
        return res.status(401).json({ message: "No users in DB. Please sign up first." });
      }
      req.user = { _id: user._id, username: user.username };
      next();
    } catch (err) {
      res.status(401).json({ message: "Unauthorized" });
    }
  };

  // Signup Route
  app.post('/api/signup', async (req, res) => {
    try {
      const { firstName, lastName, email, password, username } = req.body;

      const existing = await User.findOne({ email });
      if (existing) return res.status(400).json({ message: 'Email already exists' });

      const hashed = await bcrypt.hash(password, 10);
      const newUser = new User({ username, email, password: hashed });
      await newUser.save();

      res.status(201).json({ message: 'Signup successful!' });
    } catch (err) {
      res.status(500).json({ message: 'Signup failed.', error: err.message });
    }
  });

  // Login Route
  app.post('/api/login', async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: 'User not found.' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: 'Incorrect password.' });

      res.status(200).json({ message: 'Login successful!', user });
    } catch (err) {
      res.status(500).json({ message: 'Login failed.', error: err.message });
    }
  });

  // POST - Create a new recipe (with auth middleware)
  app.post('/recipes', auth, async (req, res) => {
    try {
      const { title, instructions, mainIngredients, leftoverIngredients, image } = req.body;
      if (!title || !instructions) {
        return res.status(400).json({ error: 'Title and instructions are required' });
      }

      if (!mongoose.Types.ObjectId.isValid(req.user._id)) {
        return res.status(400).json({ error: 'Invalid user ID' });
      }

      const newRecipe = new UploadedRecipe({
        title,
        instructions,
        mainIngredients: mainIngredients || [],
        leftoverIngredients: leftoverIngredients || [],
        image,
        user: req.user._id,
        likes: [],
        comments: [],
        createdAt: new Date(),
      });

      await newRecipe.save();
      res.status(201).json(newRecipe);
    } catch (err) {
      console.error('Error saving recipe:', err.message);
      res.status(500).json({ error: 'Failed to save recipe', details: err.message });
    }
  });

  // GET - Fetch all recipes
  app.get('/recipes', async (req, res) => {
    try {
      const recipes = await UploadedRecipe.find()
        .sort({ createdAt: -1 })
        .populate('user', 'username firstName lastName');
      res.status(200).json(recipes);
    } catch (err) {
      console.error('Error fetching recipes:', err.message);
      res.status(500).json({ error: 'Failed to fetch recipes', details: err.message });
    }
  });

  // PATCH - Increment likes
  app.patch('/recipes/:id/like', auth, async (req, res) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.user._id)) {
        return res.status(400).json({ error: 'Invalid user ID' });
      }

      const recipe = await UploadedRecipe.findByIdAndUpdate(
        req.params.id,
        { $addToSet: { likes: req.user._id } },
        { new: true }
      ).populate('user', 'username firstName lastName');

      if (!recipe) {
        return res.status(404).json({ error: 'Recipe not found' });
      }

      res.status(200).json(recipe);
    } catch (err) {
      console.error('Error liking recipe:', err.message);
      res.status(500).json({ error: 'Failed to like recipe', details: err.message });
    }
  });

  // AI Recipe Route
  app.post("/ai-recipe", async (req, res) => {
    const { leftovers, userId } = req.body;

    if (!leftovers || !userId) {
      return res.status(400).json({ error: "Missing leftovers or userId" });
    }

    try {
      // Find user by email to get ObjectId
      const user = await User.findOne({ email: userId });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const aiRes = await axios.post(
        "https://api.sarvam.ai/v1/chat/completions",
        {
          model: "sarvam-llama-3-8b-instruct",
          messages: [
            {
              role: "system",
              content: "You are a helpful Indian chef specializing in creating creative recipes using leftover food. Respond in 3 short paragraphs: 1) Recipe Title, 2) Ingredients, 3) Cooking Method.",
            },
            {
              role: "user",
              content: `I have leftover: ${leftovers}. Please suggest a recipe using these.`,
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.SARVAM_API_KEY,
          },
        }
      );

      if (!aiRes.data?.choices?.[0]?.message?.content) {
        throw new Error("Invalid response from Sarvam AI API");
      }

      const result = aiRes.data.choices[0].message.content;
      const splitResult = result.split("\n\n");
      const title = splitResult[0].replace(/^Recipe Title:\s*/i, "").trim();
      const instructions = splitResult.slice(1).join("\n\n").trim();

      const savedRecipe = new GeneratedRecipe({
        userId: user._id,
        title,
        instructions,
        createdAt: new Date(),
      });
      await savedRecipe.save();

      res.json({ title, instructions });
    } catch (error) {
      console.error("AI Recipe Error:", {
        message: error.message,
        stack: error.stack,
        response: error.response?.data,
      });
      res.status(500).json({ error: "Failed to generate recipe", details: error.message });
    }
  });

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });

