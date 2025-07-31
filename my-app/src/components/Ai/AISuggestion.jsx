// import React, { useState } from "react";
// import axios from "axios";

// const AISuggestion = () => {
//   const [leftovers, setLeftovers] = useState("");
//   const [recipe, setRecipe] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setRecipe(null);
//     setErrorMessage("");

//     try {
//       const userEmail = localStorage.getItem("userEmail");
//       if (!userEmail) {
//         throw new Error("User not found in localStorage.");
//       }
//       const payload = { leftovers, userId: userEmail };
//       console.log("Sending payload:", payload);
//       const res = await axios.post("http://localhost:5000/ai-recipe", payload);
//       setRecipe(res.data);
//     } catch (err) {
//       console.error("Error fetching AI recipe:", err.response?.data || err.message);
//       setErrorMessage(err.response?.data?.details || "Something went wrong. Please try again.");
//       setRecipe({ title: "Error", instructions: "No instructions available." });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="ai-suggestion" style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
//       <h2>AI Recipe Suggestion</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={leftovers}
//           onChange={(e) => setLeftovers(e.target.value)}
//           placeholder="Enter leftover ingredients..."
//           required
//           style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
//         />
//         <button type="submit" style={{ padding: "10px 20px" }}>Get Recipe</button>
//       </form>

//       {loading && <p>Generating recipe...</p>}
//       {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

//       {recipe && (
//         <div className="recipe-result" style={{ marginTop: "20px" }}>
//           <h3>{recipe.title}</h3>
//           <p><strong>Instructions:</strong></p>
//           <p>{recipe.instructions}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AISuggestion;


import React, { useState } from "react";
import axios from "axios";

const AISuggestion = () => {
  const [leftovers, setLeftovers] = useState("");
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setRecipe(null);
    setErrorMessage("");

    try {
      const userEmail = localStorage.getItem("userEmail");
      if (!userEmail) {
        throw new Error("User not found in localStorage.");
      }
      const payload = { leftovers, userId: userEmail };
      console.log("Sending payload:", payload);
      const res = await axios.post("http://localhost:5000/ai-recipe", payload);
      setRecipe(res.data);
    } catch (err) {
      console.error("Error fetching AI recipe:", err.response?.data || err.message);
      setErrorMessage(err.response?.data?.details || "Something went wrong. Please try again.");
      setRecipe({ title: "Error", instructions: "No instructions available." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-suggestion" style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>AI Recipe Suggestion</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={leftovers}
          onChange={(e) => setLeftovers(e.target.value)}
          placeholder="Enter leftover ingredients..."
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <button type="submit" style={{ padding: "10px 20px" }}>Get Recipe</button>
      </form>

      {loading && <p>Generating recipe...</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      {recipe && (
        <div className="recipe-result" style={{ marginTop: "20px" }}>
          <h3>{recipe.title}</h3>
          <p><strong>Instructions:</strong></p>
          <p>{recipe.instructions}</p>
        </div>
      )}
    </div>
  );
};

export default AISuggestion;