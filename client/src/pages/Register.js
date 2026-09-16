import { API_URL } from "../config";
import "../App.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [agreementError, setAgreementError] = useState("");

  async function handleRegister() {
    let hasError = false;

    if (username.length < 3) {
      setUsernameError("Username must be at least 3 characters");
      hasError = true;
    }

    if (!email) {
      setEmailError("Email is required");
      hasError = true;
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      hasError = true;
    }

    if (!agreed) {
      setAgreementError("You must agree before registering");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setUsernameError(data.message);
      return;
    }

    navigate("/");
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>DevConnect</h1>
        <h2>Create Account</h2>

        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={function (event) {
              setUsername(event.target.value);
              setUsernameError("");
            }}
          />
          {usernameError && <span className="error">{usernameError}</span>}
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={function (event) {
              setEmail(event.target.value);
              setEmailError("");
            }}
          />
          {emailError && <span className="error">{emailError}</span>}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={function (event) {
              setPassword(event.target.value);
              setPasswordError("");
            }}
          />
          {passwordError && <span className="error">{passwordError}</span>}
        </div>

        <div className={agreementError ? "agreement-error" : ""}>
          <label>
            <input
              type="checkbox"
              checked={agreed}
              onChange={function (event) {
                setAgreed(event.target.checked);
                setAgreementError("");
              }}
            />
            I agree to the terms
          </label>

          {agreementError && <p className="error">{agreementError}</p>}
        </div>

        <button onClick={handleRegister}>Register</button>

        <button
          onClick={function () {
            navigate("/");
          }}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default Register;
