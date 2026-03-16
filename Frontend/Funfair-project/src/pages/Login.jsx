import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("123456");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/vendors/login", { email, password });
      localStorage.setItem("token", res.data.token);
      alert("Login Success ✅");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left section */}
        <div className="hidden md:block">
          <h1 className="text-4xl font-extrabold text-slate-900 leading-tight">
            Welcome back to <span className="text-blue-600">Funfair</span>
          </h1>
          <p className="mt-3 text-slate-600">
            Login to manage products, prices, stock & orders.
          </p>

          <div className="mt-6 rounded-2xl bg-blue-600 text-white p-6 shadow-lg">
            <div className="text-lg font-bold">Seller Tip ✅</div>
            <div className="mt-2 text-white/90 text-sm">
              Keep products updated with correct stock to avoid order issues.
            </div>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg border p-6 md:p-8">
          <h2 className="text-2xl font-bold text-slate-900">Vendor Login</h2>
          <p className="text-slate-500 text-sm mt-1">
            Enter your email & password
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <input
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-sm text-slate-600 mt-4">
            New Vendor?{" "}
            <Link to="/register" className="text-blue-600 font-semibold">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}