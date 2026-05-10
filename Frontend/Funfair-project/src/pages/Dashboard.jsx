import { useEffect, useRef, useState } from "react";
import { API_URL } from "../api/baseUrl";
import useGsapReveal from "../hooks/useGsapReveal";

const Dashboard = () => {
  const pageRef = useRef(null);
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
        const res = await fetch(`${API_URL}/products/my-products`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        const products = Array.isArray(data) ? data : [];

        const totalProducts = products.length;
        const totalStock = products.reduce(
          (sum, item) => sum + Number(item.stock || 0),
          0
        );
        const inventoryValue = products.reduce(
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

  const metrics = [
    ["Total Products", stats.totalProducts, "Items in your catalog"],
    ["Total Stock", stats.totalStock, "Units ready to sell"],
    ["Inventory Value", `Rs ${stats.inventoryValue}`, "Current stock value"],
    ["Earnings", `Rs ${stats.earnings}`, "Order revenue tracked"],
  ];

  useGsapReveal(pageRef, []);

  return (
    <div ref={pageRef} className="animate-pageEnter">
      <div data-gsap="slide-left" className="mb-6">
        <p className="eyebrow">Overview</p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-950">
          Vendor Dashboard
        </h1>
        <p className="mt-2 text-slate-600">
          A quick view of catalog health, stock, and selling activity.
        </p>
      </div>

      <div data-gsap-stagger className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map(([label, value, helper]) => (
          <div key={label} data-gsap-hover="lift" className="metric-card">
            <p className="text-sm font-semibold text-slate-500">{label}</p>
            <p className="mt-3 text-3xl font-extrabold text-slate-950">
              {value}
            </p>
            <p className="mt-2 text-sm text-slate-500">{helper}</p>
          </div>
        ))}
      </div>

      <div data-gsap-stagger className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
        <section data-gsap="slide-left" className="panel">
          <h2 className="text-xl font-bold text-slate-950">
            Store Performance
          </h2>
          <div className="mt-5 h-56 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5">
            <div data-gsap-bars className="flex h-full items-end gap-3">
              {[42, 64, 38, 78, 56, 88, 70].map((height, index) => (
                <div
                  key={index}
                  className="flex-1 rounded-t-lg bg-indigo-600/80"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>
        </section>

        <section data-gsap="slide-right" className="panel">
          <h2 className="text-xl font-bold text-slate-950">Next Actions</h2>
          <div className="mt-4 space-y-3">
            {[
              "Add product photos for stronger listings",
              "Check low stock before the next busy hour",
              "Review new customer orders",
            ].map((item) => (
              <div
                key={item}
                data-gsap-hover="lift"
                className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm font-medium text-slate-700"
              >
                {item}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
