import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalStock: 0,
    inventoryValue: 0,
    earnings: 0,
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products/my-products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        const totalProducts = data.length;
        const totalStock = data.reduce((sum, item) => sum + Number(item.stock || 0), 0);
        const inventoryValue = data.reduce(
          (sum, item) => sum + Number(item.price || 0) * Number(item.stock || 0),
          0
        );

        setStats({
          totalProducts,
          totalStock,
          inventoryValue,
          earnings: 0,
        });
      } catch (error) {
        console.error("Dashboard error:", error);
      }
    };

    loadStats();
  }, [token]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Vendor Dashboard</h1>

      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white shadow rounded-lg p-4 border">
          <h2 className="text-gray-500">Total Products</h2>
          <p className="text-2xl font-bold">{stats.totalProducts}</p>
        </div>

        <div className="bg-white shadow rounded-lg p-4 border">
          <h2 className="text-gray-500">Total Stock</h2>
          <p className="text-2xl font-bold">{stats.totalStock}</p>
        </div>

        <div className="bg-white shadow rounded-lg p-4 border">
          <h2 className="text-gray-500">Inventory Value</h2>
          <p className="text-2xl font-bold">₹{stats.inventoryValue}</p>
        </div>

        <div className="bg-white shadow rounded-lg p-4 border">
          <h2 className="text-gray-500">Earnings</h2>
          <p className="text-2xl font-bold">₹{stats.earnings}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;