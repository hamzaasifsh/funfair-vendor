import { useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const links = [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/shop" },
    { label: "Cart", path: "/cart" },
    { label: "Dashboard", path: "/dashboard" },
  ];

  const navBtn = (path) =>
    `shrink-0 rounded-lg px-3 py-2 text-sm font-semibold whitespace-nowrap ${
      location.pathname === path
        ? "bg-slate-950 text-white shadow-sm"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="page-wrap grid min-h-[72px] gap-3 py-3 md:grid-cols-[1fr_auto_1fr] md:items-center">
        <div className="relative w-full md:w-80">
          <input
            type="text"
            aria-label="Search products"
            className="field h-11"
            placeholder="Search products, stalls, categories"
          />
        </div>

        <button
          onClick={() => navigate("/")}
          className="flex items-center justify-center gap-3 text-left"
          aria-label="Go to home"
        >
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-slate-950 text-lg font-black text-white">
            D
          </span>
          <span>
            <span className="block text-xl font-extrabold text-slate-950">
              Dukan
            </span>
            <span className="block text-xs font-medium text-slate-500">
              Vendor marketplace
            </span>
          </span>
        </button>

        <div className="flex justify-start md:justify-end">
          <nav className="flex max-w-full gap-1 overflow-x-auto rounded-xl bg-slate-50 p-1 scrollbar-hide">
            {links.map((link) => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className={navBtn(link.path)}
              >
                {link.label}
              </button>
            ))}

            {!token ? (
              <>
                <button
                  onClick={() => navigate("/register")}
                  className={navBtn("/register")}
                >
                  Register
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className={navBtn("/login")}
                >
                  Login
                </button>
              </>
            ) : (
              <button
                onClick={logout}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-50"
              >
                Logout
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
