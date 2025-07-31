// AuthPage.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./login.css";

export default function AuthPage() {
  const [step, setStep] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:5000/api/login", {
      email,
      password,
    });
    setMessage(res.data.message);
    // Store email and login status in localStorage
    localStorage.setItem("userEmail", email); // Add this line to store the email
    // Navigate to dashboard
    navigate("/dashboard");
  } catch (error) {
    setMessage(error.response?.data?.message || "Login failed.");
  }
};

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/signup", {
        firstName,
        lastName,
        email,
        password,
        username,
      });
      setMessage(res.data.message);
      setStep("login");
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
      setUsername("");
    } catch (error) {
      setMessage(error.response?.data?.message || "Signup failed.");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={step === "login" ? handleLogin : handleSignup} className="auth-form">
        <h2>{step === "login" ? "Login" : "Sign Up"}</h2>

        {step === "signup" && (
          <>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">{step === "login" ? "Login" : "Sign Up"}</button>

        <p className="switch">
          {step === "login" ? (
            <span onClick={() => setStep("signup")}>Don't have an account? Sign up</span>
          ) : (
            <span onClick={() => setStep("login")}>Already have an account? Login</span>
          )}
        </p>

        {message && <div className="auth-message">{message}</div>}
      </form>
    </div>
  );
}