import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="w-72 bg-white rounded-2xl shadow-md border p-5 h-fit">
      <h2 className="text-lg font-bold text-slate-900 mb-4">Navigation</h2>

      <div className="space-y-2">
        <button
          onClick={() => navigate("/dashboard")}
          className="w-full text-left px-4 py-2 rounded-lg bg-blue-50 text-blue-600 font-semibold border"
        >
          Dashboard
        </button>

        <button
          onClick={() => navigate("/my-products")}
          className="w-full text-left px-4 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
        >
          My Products
        </button>

        <button
          onClick={() => navigate("/add-product")}
          className="w-full text-left px-4 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
        >
          Add Product
        </button>

        <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition">
          Orders
        </button>

        <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition">
          Settings
        </button>
      </div>

      <div className="mt-6 p-4 bg-slate-50 rounded-xl border">
        <p className="text-sm text-slate-600">
          Tip: Keep stock updated so customers always see correct availability.
        </p>
      </div>
    </div>
  );
}