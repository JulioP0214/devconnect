import { API_URL } from "../config";
import "../App.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  async function handleLogin() {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      setError(data.message);
      return;
    }
    localStorage.setItem("user", JSON.stringify(data.user));
    navigate("/dashboard");
  }
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>DevConnect</h1>
        <h2>Login</h2>

        {error && <p className="error">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={function (event) {
            setUsername(event.target.value);
            setError("");
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={function (event) {
            setPassword(event.target.value);
            setError("");
          }}
        />

        <button onClick={handleLogin}>Login</button>

        <button
          onClick={function () {
            navigate("/register");
          }}
        >
          Create Account
        </button>
      </div>
    </div>
  );
}

export default Login;
