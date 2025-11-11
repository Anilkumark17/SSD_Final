import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/authService";
import { loginSchema } from "../validations/AuthValidation";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setSuccessMsg("Login successful!");
      navigate("/test/dashboard");
      console.log("Response:", data);
      // Optional: Store token and redirect
      // localStorage.setItem("token", data.token);
      // navigate("/dashboard");
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    const formData = { email, password };
    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    mutate(formData);
  };

  return (
    <div className="login-container">
      <h2>Welcome Back</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}
        {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>

        <div className="login-footer">
          <a href="/forgot-password">Forgot Password?</a>
          <p>
            Don't have an account? <a href="/signup">Sign up</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
