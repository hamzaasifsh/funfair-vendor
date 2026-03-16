import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import api from "../api/api";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    stallName: "",
    phone: "",
  });

  const onChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const fireCelebration = () => {
    const duration = 2200;
    const animationEnd = Date.now() + duration;
    const defaults = {
      startVelocity: 28,
      spread: 360,
      ticks: 70,
      zIndex: 9999,
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: 0.15, y: 0.5 },
      });

      confetti({
        ...defaults,
        particleCount,
        origin: { x: 0.85, y: 0.5 },
      });
    }, 250);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/vendors/register", form);
      localStorage.setItem("token", res.data.token);

      fireCelebration();
      setShowSuccess(true);
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  const goToLogin = () => {
    setShowSuccess(false);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 relative overflow-hidden">
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left side */}
        <div className="hidden md:block">
          <h1 className="text-4xl font-extrabold text-slate-900 leading-tight">
            Start selling on <span className="text-blue-600">Funfair</span>
          </h1>
          <p className="mt-3 text-slate-600">
            Register your stall and manage products like Flipkart sellers.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-4">
            {[
              ["Fast Setup", "Create account in 1 minute"],
              ["Secure", "JWT login system"],
              ["Products", "Add, update & delete"],
              ["Dashboard", "Seller style panel"],
            ].map(([t, d]) => (
              <div key={t} className="rounded-xl border bg-white p-4 shadow-sm">
                <div className="font-semibold text-slate-900">{t}</div>
                <div className="text-sm text-slate-600 mt-1">{d}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side card */}
        <div className="bg-white rounded-2xl shadow-lg border p-6 md:p-8">
          <h2 className="text-2xl font-bold text-slate-900">Create Account</h2>
          <p className="text-slate-500 text-sm mt-1">
            Enter your details to register as vendor
          </p>

          <form onSubmit={handleRegister} className="mt-6 space-y-4">
            <input
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={onChange}
              required
            />

            <input
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={onChange}
              required
            />

            <input
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={onChange}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="stallName"
                placeholder="Stall Name"
                value={form.stallName}
                onChange={onChange}
              />
              <input
                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={onChange}
              />
            </div>

            <button
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <p className="text-sm text-slate-600 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* Celebration Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-[9998] bg-black/50 flex items-center justify-center px-4">
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 text-center animate-[fadeIn_0.4s_ease]">
            <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-red-500 via-yellow-400 to-red-500 rounded-t-3xl" />

            <div className="mt-4 text-6xl">🎉</div>

            <h2 className="mt-4 text-3xl font-extrabold text-slate-900">
              Congratulations!
            </h2>

            <p className="mt-3 text-lg text-slate-600 leading-relaxed">
              Your vendor account has been created successfully.
            </p>

            <p className="mt-2 text-slate-500">
              Your Funfair stall is now officially open.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full font-semibold">
              ✂️ Ribbon Cut Ceremony Complete
            </div>

            <button
              onClick={goToLogin}
              className="mt-8 w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Continue to Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}