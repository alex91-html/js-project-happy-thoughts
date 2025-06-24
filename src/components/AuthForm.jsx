import React, { useState } from "react";

const API_URL = "http://localhost:8080"; // Change if needed for production

const AuthForm = ({ onAuthSuccess, onClose }) => {
  const [mode, setMode] = useState("login"); // 'login' or 'register'
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setUsername("");
    setPassword("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const endpoint = mode === "register" ? "/auth/register" : "/auth/login";
      const body = { username, password };
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (response.ok) {
        onAuthSuccess(data.accessToken, data.username);
        resetForm();
        onClose();
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-72">
      <h2 className="text-2xl font-bold text-center mb-2">
        {mode === "login" ? "Login" : "Register"}
      </h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
        minLength={3}
        className="border rounded px-3 py-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        minLength={6}
        className="border rounded px-3 py-2"
      />
      {error && <div className="text-red-500 text-sm text-center">{error}</div>}
      <button
        type="submit"
        className="bg-pink-400 text-white font-semibold rounded py-2 hover:bg-pink-500 transition cursor-pointer"
        disabled={loading}
      >
        {loading ? (mode === "login" ? "Logging in..." : "Registering...") : (mode === "login" ? "Login" : "Register")}
      </button>
      <div className="text-center text-sm">
        {mode === "login" ? (
          <>
            Don't have an account?{' '}
            <button type="button" className="text-blue-500 underline cursor-pointer" onClick={() => { setMode("register"); setError(""); }}>
              Register
            </button>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <button type="button" className="text-blue-500 underline cursor-pointer" onClick={() => { setMode("login"); setError(""); }}>
              Login
            </button>
          </>
        )}
      </div>
    </form>
  );
};

export default AuthForm;
