import React, { useState } from "react";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";

export default function Design() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const handleLogin = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
  };
  return (
    <div>
      <div className="container mt-5">
        {!token ? (
          <Login onLogin={handleLogin} />
        ) : (
          <Dashboard onLogout={handleLogout} token={token} />
        )}
      </div>
    </div>
  );
}
