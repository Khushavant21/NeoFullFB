import React, { useState ,useEffect} from "react";
import "./AdminLogin.css";

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

 const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 🔹 Step 1: Call your backend API
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerIdOrEmail: email,
          password: password,
        }),
      });

      // 🔹 Step 2: Check response
      if (response.ok) {
        const data = await response.json();
        console.log("Login Success:", data);

        // 🔹 Step 3: Store token in localStorage
        localStorage.setItem("adminToken", data.token); // <-- TOKEN STORED HERE
        console.log("stored access token", data.token)
        localStorage.setItem("adminEmail", email); // optional: store admin email

        // 🔹 Step 4: Move to next screen (Dashboard, etc.)
        onLogin();
      } else {
        const errData = await response.json();
        setError(errData.message || "Invalid email or password");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    const inputEmail = prompt("Enter your admin email to reset password:");
    if (inputEmail === "admin@neobank.com") {
      alert("Password reset link sent to your email!");
    } else {
      alert("Email not recognized.");
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-card">
        <div className="admin-logo-container">
          <div className="admin-logo-icon">A</div>
        </div>

        <h2 className="admin-title">Admin Login</h2>

        <form className="admin-form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="admin-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="admin-input"
          />
          <button type="submit" className="admin-btn">
            Login
          </button>
        </form>
        {error && <p className="admin-error">{error}</p>}

        <p className="forgot-password" onClick={handleForgotPassword}>
          Forgot Password?
        </p>

        <p className="admin-info">
          Use <strong>admin@neobank.com</strong> / <strong>Admin123</strong> for demo
        </p>
      </div>
    </div>
  );
}
