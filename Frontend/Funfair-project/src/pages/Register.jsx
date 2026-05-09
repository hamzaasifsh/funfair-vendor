import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import api from "../api/api";
import useGsapReveal from "../hooks/useGsapReveal";

export default function Register() {
  const navigate = useNavigate();
  const pageRef = useRef(null);
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
    const duration = 1800;
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
        origin: { x: 0.2, y: 0.45 },
      });

      confetti({
        ...defaults,
        particleCount,
        origin: { x: 0.8, y: 0.45 },
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

  useGsapReveal(pageRef, [showSuccess]);

  return (
    <div ref={pageRef} className="grid min-h-screen bg-slate-950 lg:grid-cols-[0.95fr_1.05fr]">
      <section data-gsap="fade-up" className="hidden p-8 lg:flex lg:flex-col lg:justify-between">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-3 text-left"
        >
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-white text-lg font-black text-slate-950">
            D
          </span>
          <span className="text-xl font-extrabold text-white">Dukan</span>
        </button>

        <div className="max-w-xl">
          <p className="eyebrow text-indigo-300">Seller Setup</p>
          <h1 className="mt-4 text-5xl font-extrabold leading-tight text-white">
            Open your vendor account in minutes.
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Build a storefront, upload products, and manage orders from a
            polished dashboard made for everyday selling.
          </p>
        </div>

        <div data-gsap-stagger className="grid grid-cols-2 gap-3">
          {[
            ["Fast Setup", "Create your account quickly"],
            ["Secure Login", "JWT protected workspace"],
            ["Product Tools", "Add, edit, and track stock"],
            ["Orders", "Review customer purchases"],
          ].map(([title, desc]) => (
            <div key={title} className="rounded-xl bg-white/10 p-4">
              <p className="font-bold text-white">{title}</p>
              <p className="mt-1 text-sm text-slate-300">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section data-gsap="fade-up" className="flex animate-pageEnter items-center justify-center bg-[#f7f8fb] px-4 py-10">
        <div className="w-full max-w-xl">
          <div className="surface rounded-xl p-6 md:p-8">
            <p className="eyebrow">Register</p>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-950">
              Create Account
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Enter your vendor details to get started.
            </p>

            <form onSubmit={handleRegister} className="mt-6 space-y-4">
              <input
                className="field"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={onChange}
                required
              />

              <input
                className="field"
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={onChange}
                required
              />

              <input
                className="field"
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={onChange}
                required
              />

              <div className="grid gap-4 md:grid-cols-2">
                <input
                  className="field"
                  name="stallName"
                  placeholder="Stall Name"
                  value={form.stallName}
                  onChange={onChange}
                />
                <input
                  className="field"
                  name="phone"
                  placeholder="Phone"
                  value={form.phone}
                  onChange={onChange}
                />
              </div>

              <button disabled={loading} className="btn-primary w-full">
                {loading ? "Creating..." : "Create Account"}
              </button>
            </form>

            <p className="mt-5 text-sm text-slate-600">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-indigo-700">
                Login
              </Link>
            </p>
          </div>
        </div>
      </section>

      {showSuccess && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-slate-950/70 px-4">
          <div data-gsap="fade-up" className="surface max-w-lg rounded-xl p-8 text-center shadow-2xl animate-[fadeIn_0.4s_ease]">
            <p className="eyebrow">Success</p>
            <h2 className="mt-3 text-3xl font-extrabold text-slate-950">
              Congratulations!
            </h2>
            <p className="mt-3 text-slate-600">
              Your vendor account has been created successfully.
            </p>
            <button onClick={goToLogin} className="btn-primary mt-8 w-full">
              Continue to Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
