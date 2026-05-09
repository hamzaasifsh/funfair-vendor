import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const settingsRef = useRef(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [account, setAccount] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [settingsMessage, setSettingsMessage] = useState("");

  useEffect(() => {
    const loadAccount = async () => {
      if (!token) {
        setAccount(null);
        return;
      }

      try {
        const res = await api.get("/vendors/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAccount(res.data);
      } catch (error) {
        console.error("Account load error:", error);
      }
    };

    loadAccount();
  }, [token]);

  useEffect(() => {
    const handleClickAway = (event) => {
      if (!settingsRef.current?.contains(event.target)) {
        setSettingsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickAway);
    return () => document.removeEventListener("mousedown", handleClickAway);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setAccount(null);
    setSettingsOpen(false);
    navigate("/login");
  };

  const deleteAccount = async () => {
    try {
      await api.delete("/vendors/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      localStorage.removeItem("token");
      localStorage.removeItem("cart");
      setConfirmDelete(false);
      setSettingsOpen(false);
      navigate("/register");
    } catch (error) {
      setSettingsMessage(
        error.response?.data?.message || "Could not delete account right now."
      );
    }
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
        <div className="flex w-full items-center gap-2 md:w-[420px]">
          {token && (
            <div ref={settingsRef} className="relative shrink-0">
              <button
                type="button"
                onClick={() => setSettingsOpen((current) => !current)}
                className={`grid h-11 w-11 place-items-center rounded-xl text-lg font-black shadow-sm ${
                  settingsOpen
                    ? "bg-slate-950 text-white"
                    : "border border-slate-200 bg-white text-slate-800 hover:bg-slate-50"
                }`}
                aria-label="Open settings"
              >
                Set
              </button>

              {settingsOpen && (
                <div className="absolute left-0 top-14 z-[60] w-[320px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl">
                  <div className="bg-slate-950 p-5 text-white">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-200">
                      Settings
                    </p>
                    <h2 className="mt-2 text-xl font-extrabold">
                      {account?.stallName || account?.name || "Vendor account"}
                    </h2>
                    <p className="mt-1 break-all text-sm text-slate-300">
                      {account?.email || "Loading account details..."}
                    </p>
                  </div>

                  <div className="grid gap-2 p-3">
                    <div className="rounded-lg bg-slate-50 p-4">
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-indigo-600">
                        About account
                      </p>
                      <div className="mt-3 space-y-2 text-sm text-slate-600">
                        <p>
                          <span className="font-semibold text-slate-950">
                            Name:
                          </span>{" "}
                          {account?.name || "Vendor"}
                        </p>
                        <p>
                          <span className="font-semibold text-slate-950">
                            Stall:
                          </span>{" "}
                          {account?.stallName || "Not added"}
                        </p>
                        <p>
                          <span className="font-semibold text-slate-950">
                            Phone:
                          </span>{" "}
                          {account?.phone || "Not added"}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={logout}
                      className="rounded-lg px-4 py-3 text-left text-sm font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      Logout
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSettingsMessage("");
                        setConfirmDelete(true);
                      }}
                      className="rounded-lg px-4 py-3 text-left text-sm font-semibold text-rose-700 hover:bg-rose-50"
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="relative min-w-0 flex-1">
          <input
            type="text"
            aria-label="Search products"
            className="field h-11"
            placeholder="Search products, stalls, categories"
          />
          </div>
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
            ) : null}
          </nav>
        </div>
      </div>

      {confirmDelete && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm">
          <div className="surface max-w-md overflow-hidden rounded-xl text-center shadow-2xl">
            <div className="bg-rose-600 p-6 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-rose-100">
                Delete Account
              </p>
              <h2 className="mt-2 text-3xl font-extrabold">
                Are you sure?
              </h2>
            </div>
            <div className="p-6">
              <p className="leading-7 text-slate-600">
                This will delete your vendor account and your product listings.
                You will be logged out after deletion.
              </p>
              {settingsMessage && (
                <p className="mt-4 rounded-lg bg-rose-50 p-3 text-sm font-semibold text-rose-700">
                  {settingsMessage}
                </p>
              )}
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setConfirmDelete(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={deleteAccount}
                  className="btn-danger"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
