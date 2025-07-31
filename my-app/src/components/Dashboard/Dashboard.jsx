// import React, { useState } from 'react';
// import './dashboard.css';

// const Dashboard = () => {
//   const [recipes, setRecipes] = useState([]);
//   const [form, setForm] = useState({
//     title: '',
//     description: '',
//     ingredients: '',
//     steps: '',
//     image: '',
//     leftovers: '',
//     time: ''
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setRecipes([...recipes, { ...form, id: Date.now(), upvotes: 0 }]);
//     setForm({ title: '', description: '', ingredients: '', steps: '', image: '', leftovers: '', time: '' });
//     setShowForm(false); // Hide form after submission
//   };

//   const upvoteRecipe = (id) => {
//     setRecipes(
//       recipes.map((r) =>
//         r.id === id ? { ...r, upvotes: r.upvotes + 1 } : r
//       )
//     );
//   };

//   const [showForm, setShowForm] = useState(false);

//   return (
//     <div className="dashboard">
//       <header className="header">
//         <h1>🥗 WasteNot Recipes</h1>
//         <button className="toggle-form-btn" onClick={() => setShowForm(!showForm)}>
//           📤 Share a Leftover Recipe
//         </button>
//       </header>

//       {/* Upload Form (toggle) */}
//       {showForm && (
//         <section className="upload-section">
//           <form onSubmit={handleSubmit} className="upload-form">
//             <input name="title" placeholder="Recipe Title" value={form.title} onChange={handleChange} required />
//             <input name="description" placeholder="Short Description" value={form.description} onChange={handleChange} required />
//             <input name="ingredients" placeholder="Ingredients" value={form.ingredients} onChange={handleChange} required />
//             <textarea name="steps" placeholder="Preparation Steps" value={form.steps} onChange={handleChange} required></textarea>
//             <input name="leftovers" placeholder="Leftover Items Used" value={form.leftovers} onChange={handleChange} required />
//             <input name="time" placeholder="Preparation Time" value={form.time} onChange={handleChange} required />
//             <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />
//             <button type="submit">Submit Recipe</button>
//           </form>
//         </section>
//       )}

//       {/* Main Content */}
//       <main className="main-content">
//         <section className="recipe-list">
//           <h2>🍽 Community Recipes</h2>
//           {recipes.map((recipe) => (
//             <div className="recipe-card" key={recipe.id}>
//               {recipe.image && <img src={recipe.image} alt={recipe.title} />}
//               <h3>{recipe.title}</h3>
//               <p>{recipe.description}</p>
//               <p><strong>Leftovers Used:</strong> {recipe.leftovers}</p>
//               <p><strong>Time:</strong> {recipe.time}</p>
//               <button onClick={() => upvoteRecipe(recipe.id)}>👍 Upvote ({recipe.upvotes})</button>
//             </div>
//           ))}
//         </section>

//         <aside className="tips-section">
//           <h2>🌍 Food Waste Tips</h2>
//           <ul>
//             <li>Store your food properly to extend shelf life.</li>
//             <li>Plan meals to avoid buying excess ingredients.</li>
//             <li>Use leftovers creatively!</li>
//           </ul>
//         </aside>
//       </main>

//       <footer className="footer">© 2025 WasteNot Recipes | Reduce. Reuse. Relish.</footer>
//     </div>
//   );
// };

// export default Dashboard;
