import { useEffect, useRef, useState } from "react";
import { API_URL } from "../api/baseUrl";
import useGsapReveal from "../hooks/useGsapReveal";

const statusStyles = {
  Pending: "bg-amber-100 text-amber-800",
  Confirmed: "bg-indigo-100 text-indigo-800",
  Shipped: "bg-sky-100 text-sky-800",
  Delivered: "bg-emerald-100 text-emerald-800",
};

const Orders = () => {
  const pageRef = useRef(null);
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const res = await fetch(`${API_URL}/orders/vendor-orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setOrders(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    loadOrders();
  }, [token]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await fetch(`${API_URL}/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  useGsapReveal(pageRef, [orders.length]);

  return (
    <div ref={pageRef} className="animate-pageEnter">
      <div data-gsap="slide-left" className="mb-6">
        <p className="eyebrow">Fulfillment</p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-950">
          Orders
        </h1>
        <p className="mt-2 text-slate-600">
          Review customer orders and keep each status up to date.
        </p>
      </div>

      {orders.length === 0 ? (
        <div data-gsap="fade-up" className="panel py-12 text-center">
          <h2 className="text-xl font-bold text-slate-950">No orders yet</h2>
          <p className="mt-2 text-slate-600">
            New orders will appear here after customers checkout.
          </p>
        </div>
      ) : (
        <div data-gsap-stagger className="space-y-4">
          {orders.map((order) => (
            <article
              key={order._id}
              data-gsap-hover="lift"
              className="surface rounded-xl p-5"
            >
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
                      statusStyles[order.status] || statusStyles.Pending
                    }`}
                  >
                    {order.status}
                  </span>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className="field w-full sm:w-44"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>

              <div className="mt-5 rounded-xl bg-slate-50 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-500">
                    Items
                  </span>
                  <span className="text-xl font-extrabold text-slate-950">
                    Rs {order.vendorTotalAmount}
                  </span>
                </div>

                <div className="divide-y divide-slate-200">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
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
        </div>
      )}
    </div>
  );
};

export default Orders;
