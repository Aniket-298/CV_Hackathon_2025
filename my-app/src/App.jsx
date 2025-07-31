    import React from "react";
    import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
    import AuthPage from "./components/login/login"
    import Dashboard from "./components/Dashboard/Dash_board";
    import AISuggestion from "./components/Ai/AISuggestion";

    function App() {
      // ✅ Check login status from localStorage
      const isLoggedIn = localStorage.getItem("userLoggedIn") === "true";

      return (
        <Router>
          <Routes>
            {/* Default route (login page) */}
            <Route path="/" element={<AuthPage />} />

            {/* Protected dashboard route */}
            <Route
              path="/dashboard"
              element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />}
            />

            {/* AI Recipe Generator route - protected */}
            <Route
              path="/ai-recipe"
              element={isLoggedIn ? <AISuggestion /> : <Navigate to="/" />}
            />
          </Routes>
        </Router>
      );
    }

    export default App;
