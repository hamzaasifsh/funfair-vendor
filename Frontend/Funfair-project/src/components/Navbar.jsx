import { useNavigate, useLocation } from "react-router-dom";
import { useRef } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const scrollRef = useRef(null);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -150, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 150, behavior: "smooth" });
  };

  const navBtn = (path) =>
    `px-4 py-2 rounded-lg font-medium transition whitespace-nowrap ${
      location.pathname === path
        ? "bg-white text-blue-700 shadow"
        : "text-white hover:bg-white/15"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 grid md:grid-cols-3 items-center gap-4">

        {/* Left Search */}
        <div className="flex justify-center md:justify-start">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full md:w-72 px-4 py-2 rounded-xl text-black outline-none"
          />
        </div>

        {/* Middle Logo */}
        <div className="flex justify-center">
          <h1
            onClick={() => navigate("/")}
            className="text-2xl font-extrabold cursor-pointer"
          >
            Dukan
          </h1>
        </div>

        {/* Right Navigation with arrows */}
        <div className="flex items-center gap-2">

          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            className="bg-white/20 px-2 py-1 rounded hover:bg-white/30"
          >
            ◀
          </button>

          {/* Scrollable Nav */}
          <div
            ref={scrollRef}
            className="flex gap-2 overflow-x-hidden scroll-smooth"
          >
            <button onClick={() => navigate("/")} className={navBtn("/")}>
              Home
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className={navBtn("/dashboard")}
            >
              My Account
            </button>

            {!token && (
              <>
                <button
                  onClick={() => navigate("/register")}
                  className={navBtn("/register")}
                >
                  Create Account
                </button>

                <button
                  onClick={() => navigate("/login")}
                  className={navBtn("/login")}
                >
                  Login
                </button>
              </>
            )}

            {token && (
              <button
                onClick={logout}
                className="bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold"
              >
                Logout
              </button>
            )}
          </div>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="bg-white/20 px-2 py-1 rounded hover:bg-white/30"
          >
            ▶
          </button>

        </div>
      </div>
    </header>
  );
}