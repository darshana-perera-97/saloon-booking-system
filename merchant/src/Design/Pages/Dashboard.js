import React, { useEffect, useState } from "react";

function Dashboard({ onLogout, token }) {
  const [message, setMessage] = useState("");
  const [merchant, setMerchant] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      const response = await fetch("http://localhost:5009/merchant", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setMerchant(data.merchant);
      } else {
        setMessage(data.error || "Failed to load dashboard");
      }
    };

    fetchDashboard();
  }, [token]);

  return (
    <div className="card p-4 shadow-sm">
      <h2 className="mb-3">Merchant Dashboard</h2>
      <p>{message}</p>
      {merchant && (
        <div>
          <h5>Welcome, {merchant.email}</h5>
          <p>Merchant ID: {merchant.merchantId}</p>
        </div>
      )}
      <button className="btn btn-danger w-100 mt-3" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
