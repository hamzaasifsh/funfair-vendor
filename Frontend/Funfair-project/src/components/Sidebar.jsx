import { useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "My Products", path: "/my-products" },
    { label: "Add Product", path: "/add-product" },
    { label: "Orders", path: "/orders" },
  ];

  return (
    <aside className="surface w-full rounded-xl p-3 md:sticky md:top-24 md:w-64 md:self-start">
      <div className="px-3 py-3">
        <p className="eyebrow">Vendor Panel</p>
        <h2 className="mt-1 text-lg font-bold text-slate-950">Workspace</h2>
      </div>

      <nav className="grid gap-1">
        {items.map((item) => {
          const active = location.pathname === item.path;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`rounded-lg px-4 py-3 text-left text-sm font-semibold ${
                active
                  ? "bg-slate-950 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm font-semibold text-amber-950">Stock health</p>
        <p className="mt-1 text-sm text-amber-800">
          Keep quantities current so customers only order what you can deliver.
        </p>
      </div>
    </aside>
  );
}
