import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { API_URL, imageUrl } from "../api/baseUrl";
import Foot from "../components/Foot";
import Navbar from "../components/Navbar";
import useGsapReveal from "../hooks/useGsapReveal";

const tabs = ["Overview", "Vendors", "Products", "Orders"];
const orderStatuses = ["Pending", "Confirmed", "Shipped", "Delivered"];

const AdminPanel = () => {
  const pageRef = useRef(null);
  const token = localStorage.getItem("token");
  const [activeTab, setActiveTab] = useState("Overview");
  const [stats, setStats] = useState(null);
  const [vendors, setVendors] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");

  const headers = useMemo(
    () => ({ Authorization: `Bearer ${token}` }),
    [token]
  );

  const requestAdminData = useCallback(async () => {
    const [statsRes, vendorsRes, productsRes, ordersRes] = await Promise.all([
      fetch(`${API_URL}/admin/stats`, { headers }),
      fetch(`${API_URL}/admin/vendors`, { headers }),
      fetch(`${API_URL}/admin/products`, { headers }),
      fetch(`${API_URL}/admin/orders`, { headers }),
    ]);

    const [statsData, vendorsData, productsData, ordersData] =
      await Promise.all([
        statsRes.json(),
        vendorsRes.json(),
        productsRes.json(),
        ordersRes.json(),
      ]);

    return {
      statsData,
      vendorsData,
      productsData,
      ordersData,
    };
  }, [headers]);

  const applyAdminData = ({
    statsData,
    vendorsData,
    productsData,
    ordersData,
  }) => {
    setStats(statsData);
    setVendors(Array.isArray(vendorsData) ? vendorsData : []);
    setProducts(Array.isArray(productsData) ? productsData : []);
    setOrders(Array.isArray(ordersData) ? ordersData : []);
  };

  const loadAdminData = async () => {
    try {
      applyAdminData(await requestAdminData());
    } catch (error) {
      console.error("Admin data error:", error);
      setMessage("Could not load admin data right now.");
    }
  };

  useEffect(() => {
    let active = true;

    const loadInitialData = async () => {
      try {
        const adminData = await requestAdminData();
        if (active) {
          applyAdminData(adminData);
        }
      } catch (error) {
        console.error("Admin data error:", error);
        if (active) {
          setMessage("Could not load admin data right now.");
        }
      }
    };

    loadInitialData();

    return () => {
      active = false;
    };
  }, [requestAdminData]);

  useGsapReveal(pageRef, [
    activeTab,
    vendors.length,
    products.length,
    orders.length,
  ]);

  const adminMetrics = [
    ["Vendors", stats?.totalVendors || 0, "Registered seller accounts"],
    ["Products", stats?.totalProducts || 0, "Listings across the marketplace"],
    ["Orders", stats?.totalOrders || 0, "Customer checkouts"],
    ["Revenue", `Rs ${stats?.totalRevenue || 0}`, "Total order value"],
  ];

  const deleteVendor = async (vendorId) => {
    if (!confirm("Delete this vendor and related listings?")) return;

    try {
      const res = await fetch(`${API_URL}/admin/vendors/${vendorId}`, {
        method: "DELETE",
        headers,
      });
      const data = await res.json();
      setMessage(data.message || "Vendor deleted");
      await loadAdminData();
    } catch {
      setMessage("Could not delete vendor.");
    }
  };

  const deleteProduct = async (productId) => {
    if (!confirm("Delete this product?")) return;

    try {
      const res = await fetch(`${API_URL}/admin/products/${productId}`, {
        method: "DELETE",
        headers,
      });
      const data = await res.json();
      setMessage(data.message || "Product deleted");
      await loadAdminData();
    } catch {
      setMessage("Could not delete product.");
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      await fetch(`${API_URL}/admin/orders/${orderId}/status`, {
        method: "PUT",
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      setOrders((current) =>
        current.map((order) =>
          order._id === orderId ? { ...order, status } : order
        )
      );
    } catch {
      setMessage("Could not update order status.");
    }
  };

  return (
    <div className="app-page">
      <Navbar />

      <main ref={pageRef} className="page-wrap py-8">
        <section
          data-gsap="hero-pop"
          className="relative overflow-hidden rounded-xl bg-slate-950 p-6 text-white shadow-2xl md:p-8"
        >
          <div className="absolute right-8 top-8 h-24 w-24 rounded-full bg-indigo-400/20 blur-2xl" />
          <div className="absolute bottom-6 right-28 h-16 w-16 rounded-full bg-emerald-300/20 blur-2xl" />

          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p data-gsap-hero-child className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-200">
                Platform control center
              </p>
              <h1 data-gsap-hero-child className="mt-3 text-4xl font-extrabold leading-tight md:text-6xl">
                Admin Panel
              </h1>
              <p data-gsap-hero-child className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
                Review vendors, products, and orders from one premium control
                dashboard built for marketplace owners.
              </p>
            </div>

            <div data-gsap-hero-child className="flex gap-2 overflow-x-auto rounded-xl border border-white/10 bg-white/10 p-2 backdrop-blur">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold ${
                    activeTab === tab
                      ? "bg-white text-slate-950"
                      : "text-white hover:bg-white/15"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </section>

        {message && (
          <div data-gsap="pop" className="mt-5 rounded-xl border border-indigo-100 bg-indigo-50 p-4 text-sm font-semibold text-indigo-800">
            {message}
          </div>
        )}

        {activeTab === "Overview" && (
          <section className="mt-6">
            <div data-gsap-stagger className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {adminMetrics.map(([label, value, helper]) => (
                <div key={label} data-gsap-hover="lift" className="metric-card">
                  <p className="text-sm font-semibold text-slate-500">
                    {label}
                  </p>
                  <p className="mt-3 text-3xl font-extrabold text-slate-950">
                    {value}
                  </p>
                  <p className="mt-2 text-sm text-slate-500">{helper}</p>
                </div>
              ))}
            </div>

            <div data-gsap-stagger className="mt-6 grid gap-6 lg:grid-cols-2">
              <section className="panel">
                <h2 className="text-xl font-bold text-slate-950">
                  Marketplace Health
                </h2>
                <div data-gsap-bars className="mt-5 flex h-56 items-end gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5">
                  {[62, 84, 48, 92, 71, 58, 76].map((height, index) => (
                    <div
                      key={index}
                      className="flex-1 rounded-t-lg bg-slate-950"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </section>

              <section className="panel">
                <h2 className="text-xl font-bold text-slate-950">
                  Admin Priorities
                </h2>
                <div className="mt-4 grid gap-3">
                  {[
                    "Review new vendor accounts before featuring them",
                    "Remove weak or duplicate product listings",
                    "Keep order statuses updated for buyer trust",
                  ].map((item) => (
                    <div
                      key={item}
                      data-gsap-hover="lift"
                      className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-700"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </section>
        )}

        {activeTab === "Vendors" && (
          <section data-gsap-stagger className="mt-6 grid gap-4 lg:grid-cols-2">
            {vendors.map((vendor) => (
              <article key={vendor._id} data-gsap-hover="lift" className="surface rounded-xl p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="eyebrow">{vendor.role}</p>
                    <h2 className="mt-2 text-xl font-extrabold text-slate-950">
                      {vendor.stallName || vendor.name}
                    </h2>
                    <p className="mt-1 break-all text-sm text-slate-600">
                      {vendor.email}
                    </p>
                  </div>
                  <span className="status-pill bg-indigo-100 text-indigo-800">
                    {vendor.role}
                  </span>
                </div>
                <div className="mt-4 grid gap-2 text-sm text-slate-600">
                  <p>Name: {vendor.name}</p>
                  <p>Phone: {vendor.phone || "Not added"}</p>
                </div>
                <button
                  onClick={() => deleteVendor(vendor._id)}
                  className="btn-danger mt-5"
                  disabled={vendor.role === "admin"}
                >
                  Delete Vendor
                </button>
              </article>
            ))}
          </section>
        )}

        {activeTab === "Products" && (
          <section data-gsap-stagger className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <article key={product._id} data-gsap-hover="lift" className="surface overflow-hidden rounded-xl">
                {product.images?.[0] ? (
                  <img
                    src={imageUrl(product.images[0])}
                    alt={product.name}
                    className="h-48 w-full object-cover"
                  />
                ) : (
                  <div className="grid h-48 place-items-center bg-slate-100 text-sm font-semibold text-slate-400">
                    No Image
                  </div>
                )}
                <div className="p-4">
                  <p className="eyebrow">{product.category}</p>
                  <h2 className="mt-2 text-xl font-extrabold text-slate-950">
                    {product.name}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
                    {product.description}
                  </p>
                  <p className="mt-3 text-sm font-semibold text-slate-500">
                    Vendor: {product.vendorId?.stallName || product.vendorId?.name || "Unknown"}
                  </p>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="text-2xl font-extrabold text-slate-950">
                      Rs {product.price}
                    </span>
                    <span className="status-pill bg-emerald-100 text-emerald-800">
                      {product.stock} stock
                    </span>
                  </div>
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="btn-danger mt-5 w-full"
                  >
                    Delete Product
                  </button>
                </div>
              </article>
            ))}
          </section>
        )}

        {activeTab === "Orders" && (
          <section data-gsap-stagger className="mt-6 grid gap-4">
            {orders.map((order) => (
              <article key={order._id} data-gsap-hover="lift" className="surface rounded-xl p-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-500">
                      Order ID
                    </p>
                    <h2 className="mt-1 break-all text-lg font-bold text-slate-950">
                      {order._id}
                    </h2>
                    <p className="mt-2 text-sm text-slate-500">
                      Created {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <span
                      className={`status-pill ${
                        order.paymentStatus === "paid"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {order.paymentProvider || "manual"}:{" "}
                      {order.paymentStatus || "pending"}
                    </span>
                    <span className="status-pill bg-slate-100 text-slate-800">
                      Rs {order.totalAmount || 0}
                    </span>
                    <select
                      value={order.status}
                      onChange={(event) =>
                        updateOrderStatus(order._id, event.target.value)
                      }
                      className="field w-full sm:w-44"
                    >
                      {orderStatuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-5 rounded-xl bg-slate-50 p-4">
                  <p className="mb-3 text-sm font-semibold text-slate-500">
                    Items
                  </p>
                  <div className="divide-y divide-slate-200">
                    {order.items?.map((item, index) => (
                      <div
                        key={`${item.productId || item.name}-${index}`}
                        className="flex items-center justify-between gap-4 py-3 text-sm"
                      >
                        <span className="font-semibold text-slate-700">
                          {item.name}
                        </span>
                        <span className="text-slate-500">
                          {item.quantity} x Rs {item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}
      </main>

      <Foot />
    </div>
  );
};

export default AdminPanel;
