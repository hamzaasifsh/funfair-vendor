import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import useGsapReveal from "../hooks/useGsapReveal";

export default function Login() {
  const navigate = useNavigate();
  const pageRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("123456");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/vendors/login", { email, password });
      localStorage.setItem("token", res.data.token);
      alert("Login Success");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  useGsapReveal(pageRef, []);

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
          <p className="eyebrow text-indigo-300">Vendor Access</p>
          <h1 className="mt-4 text-5xl font-extrabold leading-tight text-white">
            Welcome back to your selling workspace.
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Manage products, stock, orders, and customer activity from one clean
            dashboard.
          </p>
        </div>

        <div data-gsap-stagger className="grid grid-cols-3 gap-3 text-white">
          {["Products", "Orders", "Stock"].map((item) => (
            <div key={item} className="rounded-xl bg-white/10 p-4">
              <p className="text-sm font-semibold text-slate-300">{item}</p>
              <p className="mt-2 text-2xl font-extrabold">Live</p>
            </div>
          ))}
        </div>
      </section>

      <section data-gsap="fade-up" className="flex animate-pageEnter items-center justify-center bg-[#f7f8fb] px-4 py-10">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-3 text-left"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-slate-950 text-lg font-black text-white">
                D
              </span>
              <span className="text-xl font-extrabold text-slate-950">
                Dukan
              </span>
            </button>
          </div>

          <div className="surface rounded-xl p-6 md:p-8">
            <p className="eyebrow">Sign In</p>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-950">
              Vendor Login
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Enter your email and password to continue.
            </p>

            <form onSubmit={handleLogin} className="mt-6 space-y-4">
              <input
                className="field"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                className="field"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button disabled={loading} className="btn-primary w-full">
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className="mt-5 text-sm text-slate-600">
              New vendor?{" "}
              <Link to="/register" className="font-semibold text-indigo-700">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
