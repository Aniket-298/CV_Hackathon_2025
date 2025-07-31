// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom"; // ✅ Import for navigation
// import "./Dashboard.css";

// const Dashboard = () => {
//   const navigate = useNavigate(); // ✅ Hook to navigate
//   const [recipes, setRecipes] = useState([]);
//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     ingredients: "",
//     steps: "",
//     image: "",
//     leftovers: "",
//     time: "",
//   });
//   const [showForm, setShowForm] = useState(false);
//   const [formError, setFormError] = useState("");

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/recipes")
//       .then((res) => setRecipes(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.title.trim() || !form.steps.trim()) {
//       setFormError("Title and Instructions are required.");
//       return;
//     }
//     setFormError("");
//     const mappedForm = {
//       title: form.title.trim(),
//       instructions: form.steps.trim(),
//       mainIngredients: form.ingredients
//         ? form.ingredients.split(",").map((i) => i.trim()).filter(Boolean)
//         : [],
//       leftoverIngredients: form.leftovers
//         ? form.leftovers.split(",").map((i) => i.trim()).filter(Boolean)
//         : [],
//       image: form.image,
//     };
//     try {
//       const res = await axios.post("http://localhost:5000/recipes", mappedForm);
//       setRecipes([res.data, ...recipes]);
//       setForm({
//         title: "",
//         description: "",
//         ingredients: "",
//         steps: "",
//         image: "",
//         leftovers: "",
//         time: "",
//       });
//       setShowForm(false);
//     } catch (error) {
//       setFormError("Failed to upload recipe. Please try again.");
//       console.error("Error uploading recipe:", error);
//     }
//   };

//   const upvoteRecipe = async (id) => {
//     try {
//       const res = await axios.patch(`http://localhost:5000/recipes/${id}/like`);
//       setRecipes(recipes.map((r) => (r._id === id ? res.data : r)));
//     } catch (err) {
//       console.error("Upvote failed", err);
//     }
//   };

//   return (
//     <div className="dashboard">
//       <header className="header">
//         <div className="header-content">
//           <h1 className="logo">
//             <span className="logo-icon">🥗</span>
//             WasteNot Recipes
//           </h1>

//           {/* ✅ Share Recipe Button */}
//           <button
//             className={`toggle-form-btn ${showForm ? "active" : ""}`}
//             onClick={() => setShowForm(!showForm)}
//           >
//             <span className="btn-icon">📤</span>
//             {showForm ? "Cancel" : "Share Recipe"}
//           </button>

//           {/* ✅ AI Suggestion Button */}
//           <button
//             className="ai-suggestion-btn"
//             onClick={() => navigate("/ai-recipe")}
//           >
//             🤖 AI Recipe Suggestion
//           </button>
//         </div>
//       </header>

//       {/* Upload form */}
//       <div className={`upload-section ${showForm ? "show" : ""}`}>
//         <div className="form-container">
//           <h2 className="form-title">Create Your Leftover Recipe</h2>
//           {formError && (
//             <div style={{ color: "red", marginBottom: "10px" }}>{formError}</div>
//           )}
//           <form onSubmit={handleSubmit} className="upload-form">
//             <div className="form-row">
//               <div className="input-group">
//                 <input
//                   name="title"
//                   placeholder="Recipe Title"
//                   value={form.title}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="input-group">
//                 <input
//                   name="time"
//                   placeholder="Prep Time (e.g., 30 mins)"
//                   value={form.time}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//             </div>
//             <div className="input-group">
//               <textarea
//                 name="description"
//                 placeholder="Short description of your recipe..."
//                 value={form.description}
//                 onChange={handleChange}
//                 required
//                 rows="2"
//               />
//             </div>
//             <div className="form-row">
//               <div className="input-group">
//                 <input
//                   name="ingredients"
//                   placeholder="Main ingredients"
//                   value={form.ingredients}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="input-group">
//                 <input
//                   name="leftovers"
//                   placeholder="Leftover items used"
//                   value={form.leftovers}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//             </div>
//             <div className="input-group">
//               <textarea
//                 name="steps"
//                 placeholder="Step-by-step preparation instructions..."
//                 value={form.steps}
//                 onChange={handleChange}
//                 required
//                 rows="3"
//               />
//             </div>
//             <div className="input-group">
//               <input
//                 name="image"
//                 placeholder="Image URL (optional)"
//                 value={form.image}
//                 onChange={handleChange}
//               />
//             </div>
//             <button type="submit" className="submit-btn">
//               <span>✨</span> Share Recipe
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* Community Recipes */}
//       <main className="main-content">
//         <section className="recipe-list">
//           <div className="section-header">
//             <h2>🍽 Community Recipes</h2>
//             <span className="recipe-count">{recipes.length} recipes shared</span>
//           </div>

//           {recipes.length === 0 ? (
//             <div className="empty-state">
//               <div className="empty-icon">🍳</div>
//               <h3>No recipes yet!</h3>
//               <p>Be the first to share a leftover recipe with the community.</p>
//             </div>
//           ) : (
//             <div className="recipe-grid">
//               {recipes.map((recipe) => (
//                 <div className="recipe-card" key={recipe._id}>
//                   {recipe.image && (
//                     <div className="recipe-image">
//                       <img src={recipe.image} alt={recipe.title} />
//                     </div>
//                   )}
//                   <div className="recipe-content">
//                     <h3 className="recipe-title">{recipe.title}</h3>

//                     <p className="recipe-ingredients">
//                       <strong>Ingredients:</strong>{" "}
//                       {Array.isArray(recipe.mainIngredients)
//                         ? recipe.mainIngredients.join(", ")
//                         : ""}
//                     </p>
//                     <p className="recipe-steps">
//                       <strong>Instructions:</strong> {recipe.instructions}
//                     </p>

//                     <div className="recipe-details">
//                       <div className="detail-item">
//                         <span className="detail-label">Leftovers:</span>
//                         <span className="detail-value">
//                           {Array.isArray(recipe.leftoverIngredients)
//                             ? recipe.leftoverIngredients.join(", ")
//                             : ""}
//                         </span>
//                       </div>
//                     </div>

//                     <button
//                       className="upvote-btn"
//                       onClick={() => upvoteRecipe(recipe._id)}
//                     >
//                       <span className="upvote-icon">👍</span>
//                       <span>{recipe.likes ? recipe.likes.length : 0}</span>
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </section>

//         <aside className="tips-section">
//           <h2>🌍 Reduce Food Waste</h2>
//           <div className="tips-list">
//             <div className="tip-item">
//               <span className="tip-icon">📦</span>
//               <div>
//                 <h4>Smart Storage</h4>
//                 <p>
//                   Store food properly to extend shelf life and maintain freshness.
//                 </p>
//               </div>
//             </div>
//             <div className="tip-item">
//               <span className="tip-icon">📝</span>
//               <div>
//                 <h4>Meal Planning</h4>
//                 <p>Plan your meals to avoid buying excess ingredients.</p>
//               </div>
//             </div>
//             <div className="tip-item">
//               <span className="tip-icon">♻️</span>
//               <div>
//                 <h4>Creative Leftovers</h4>
//                 <p>Transform leftovers into exciting new dishes!</p>
//               </div>
//             </div>
//           </div>

//           <div className="stats-card">
//             <h3>Impact Stats</h3>
//             <div className="stat">
//               <span className="stat-number">{recipes.length}</span>
//               <span className="stat-label">Recipes Shared</span>
//             </div>
//             <div className="stat">
//               <span className="stat-number">
//                 {recipes.reduce((sum, r) => sum + (r.upvotes || 0), 0)}
//               </span>
//               <span className="stat-label">Community Votes</span>
//             </div>
//           </div>
//         </aside>
//       </main>

//       <footer className="footer">
//         <div className="footer-content">
//           <p>&copy; 2025 WasteNot Recipes</p>
//           <p className="footer-tagline">Reduce. Reuse. Relish.</p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    ingredients: "",
    steps: "",
    image: "",
    leftovers: "",
    time: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [formError, setFormError] = useState("");

  // Function to validate image URL or base64 string
  const isValidImageUrl = (url) => {
    if (!url) return false;
    // Check for valid URL
    try {
      new URL(url);
      return true;
    } catch {
      // Check for valid base64
      return url.startsWith("data:image/") && url.includes("base64,");
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/recipes")
      .then((res) => setRecipes(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.steps.trim()) {
      setFormError("Title and Instructions are required.");
      return;
    }
    setFormError("");
    const mappedForm = {
      title: form.title.trim(),
      instructions: form.steps.trim(),
      mainIngredients: form.ingredients
        ? form.ingredients.split(",").map((i) => i.trim()).filter(Boolean)
        : [],
      leftoverIngredients: form.leftovers
        ? form.leftovers.split(",").map((i) => i.trim()).filter(Boolean)
        : [],
      image: form.image,
    };
    try {
      const res = await axios.post("http://localhost:5000/recipes", mappedForm);
      setRecipes([res.data, ...recipes]);
      setForm({
        title: "",
        description: "",
        ingredients: "",
        steps: "",
        image: "",
        leftovers: "",
        time: "",
      });
      setShowForm(false);
    } catch (error) {
      setFormError("Failed to upload recipe. Please try again.");
      console.error("Error uploading recipe:", error);
    }
  };

  const upvoteRecipe = async (id) => {
    try {
      const res = await axios.patch(`http://localhost:5000/recipes/${id}/like`);
      setRecipes(recipes.map((r) => (r._id === id ? res.data : r)));
    } catch (err) {
      console.error("Upvote failed", err);
    }
  };

  return (
    <div className="dashboard">
      <header className="header">
        <div className="header-content">
          <h1 className="logo">
            <span className="logo-icon">🥗</span>
            WasteNot Recipes
          </h1>
          <button
            className={`toggle-form-btn ${showForm ? "active" : ""}`}
            onClick={() => setShowForm(!showForm)}
          >
            <span className="btn-icon">📤</span>
            {showForm ? "Cancel" : "Share Recipe"}
          </button>
          <button
            className="ai-suggestion-btn"
            onClick={() => navigate("/ai-recipe")}
          >
            🤖 AI Recipe Suggestion
          </button>
        </div>
      </header>

      <div className={`upload-section ${showForm ? "show" : ""}`}>
        <div className="form-container">
          <h2 className="form-title">Create Your Leftover Recipe</h2>
          {formError && (
            <div style={{ color: "red", marginBottom: "10px" }}>{formError}</div>
          )}
          <form onSubmit={handleSubmit} className="upload-form">
            <div className="form-row">
              <div className="input-group">
                <input
                  name="title"
                  placeholder="Recipe Title"
                  value={form.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  name="time"
                  placeholder="Prep Time (e.g., 30 mins)"
                  value={form.time}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="input-group">
              <textarea
                name="description"
                placeholder="Short description of your recipe..."
                value={form.description}
                onChange={handleChange}
                required
                rows="2"
              />
            </div>
            <div className="form-row">
              <div className="input-group">
                <input
                  name="ingredients"
                  placeholder="Main ingredients"
                  value={form.ingredients}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  name="leftovers"
                  placeholder="Leftover items used"
                  value={form.leftovers}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="input-group">
              <textarea
                name="steps"
                placeholder="Step-by-step preparation instructions..."
                value={form.steps}
                onChange={handleChange}
                required
                rows="3"
              />
            </div>
            <div className="input-group">
              <input
                name="image"
                placeholder="Image URL (optional)"
                value={form.image}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="submit-btn">
              <span>✨</span> Share Recipe
            </button>
          </form>
        </div>
      </div>

      <main className="main-content">
        <section className="recipe-list">
          <div className="section-header">
            <h2>🍽 Community Recipes</h2>
            <span className="recipe-count">{recipes.length} recipes shared</span>
          </div>

          {recipes.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🍳</div>
              <h3>No recipes yet!</h3>
              <p>Be the first to share a leftover recipe with the community.</p>
            </div>
          ) : (
            <div className="recipe-grid">
              {recipes.map((recipe) => (
                <div className="recipe-card" key={recipe._id}>
                  {recipe.image && isValidImageUrl(recipe.image) && (
                    <div className="recipe-image">
                      <img src={recipe.image} alt={recipe.title} />
                    </div>
                  )}
                  <div className="recipe-content">
                    <h3 className="recipe-title">{recipe.title}</h3>
                    <p className="recipe-ingredients">
                      <strong>Ingredients:</strong>{" "}
                      {Array.isArray(recipe.mainIngredients)
                        ? recipe.mainIngredients.join(", ")
                        : ""}
                    </p>
                    <p className="recipe-steps">
                      <strong>Instructions:</strong> {recipe.instructions}
                    </p>
                    <div className="recipe-details">
                      <div className="detail-item">
                        <span className="detail-label">Leftovers:</span>
                        <span className="detail-value">
                          {Array.isArray(recipe.leftoverIngredients)
                            ? recipe.leftoverIngredients.join(", ")
                            : ""}
                        </span>
                      </div>
                    </div>
                    <button
                      className="upvote-btn"
                      onClick={() => upvoteRecipe(recipe._id)}
                    >
                      <span className="upvote-icon">👍</span>
                      <span>{recipe.likes ? recipe.likes.length : 0}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <aside className="tips-section">
          <h2>🌍 Reduce Food Waste</h2>
          <div className="tips-list">
            <div className="tip-item">
              <span className="tip-icon">📦</span>
              <div>
                <h4>Smart Storage</h4>
                <p>
                  Store food properly to extend shelf life and maintain freshness.
                </p>
              </div>
            </div>
            <div className="tip-item">
              <span className="tip-icon">📝</span>
              <div>
                <h4>Meal Planning</h4>
                <p>Plan your meals to avoid buying excess ingredients.</p>
              </div>
            </div>
            <div className="tip-item">
              <span className="tip-icon">♻️</span>
              <div>
                <h4>Creative Leftovers</h4>
                <p>Transform leftovers into exciting new dishes!</p>
              </div>
            </div>
          </div>

          <div className="stats-card">
            <h3>Impact Stats</h3>
            <div className="stat">
              <span className="stat-number">{recipes.length}</span>
              <span className="stat-label">Recipes Shared</span>
            </div>
            <div className="stat">
              <span className="stat-number">
                {recipes.reduce((sum, r) => sum + (r.upvotes || 0), 0)}
              </span>
              <span className="stat-label">Community Votes</span>
            </div>
          </div>
        </aside>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2025 WasteNot Recipes</p>
          <p className="footer-tagline">Reduce. Reuse. Relish.</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;