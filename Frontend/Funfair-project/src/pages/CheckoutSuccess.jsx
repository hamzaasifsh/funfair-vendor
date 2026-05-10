import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { API_URL } from "../api/baseUrl";
import Foot from "../components/Foot";
import Navbar from "../components/Navbar";
import useGsapReveal from "../hooks/useGsapReveal";

const CheckoutSuccess = () => {
  const pageRef = useRef(null);
  const location = useLocation();
  const [status, setStatus] = useState({
    loading: true,
    paid: false,
    message: "Confirming your Stripe payment...",
    order: null,
  });

  useGsapReveal(pageRef, [status.loading, status.paid]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sessionId = params.get("session_id");

    const confirmPayment = async () => {
      if (!sessionId) {
        setStatus({
          loading: false,
          paid: false,
          message: "Stripe session was not found.",
          order: null,
        });
        return;
      }

      try {
        const res = await fetch(
          `${API_URL}/orders/checkout-success?session_id=${sessionId}`
        );
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Could not confirm payment");
        }

        const paid = data.paymentStatus === "paid";

        if (paid) {
          localStorage.removeItem("cart");
        }

        setStatus({
          loading: false,
          paid,
          message: paid
            ? "Payment received. Your order is confirmed."
            : "Payment is not marked as paid yet.",
          order: data.order,
        });
      } catch (error) {
        setStatus({
          loading: false,
          paid: false,
          message: error.message || "Could not confirm payment.",
          order: null,
        });
      }
    };

    confirmPayment();
  }, [location.search]);

  return (
    <div className="app-page">
      <Navbar />

      <main ref={pageRef} className="page-wrap grid min-h-[70vh] place-items-center py-12">
        <section data-gsap="pop" className="surface max-w-2xl overflow-hidden rounded-xl text-center shadow-2xl">
          <div className="bg-slate-950 p-8 text-white">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-200">
              Stripe checkout
            </p>
            <h1 className="mt-3 text-4xl font-extrabold">
              {status.loading
                ? "Confirming payment"
                : status.paid
                  ? "Payment successful"
                  : "Payment needs attention"}
            </h1>
          </div>

          <div className="p-7 md:p-9">
            <div
              className={`mx-auto grid h-16 w-16 place-items-center rounded-full text-2xl font-black ${
                status.paid
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-amber-100 text-amber-800"
              }`}
            >
              {status.loading ? "..." : status.paid ? "✓" : "!"}
            </div>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              {status.message}
            </p>

            {status.order && (
              <div className="mt-6 rounded-xl bg-slate-50 p-4 text-left text-sm text-slate-600">
                <p>
                  <span className="font-semibold text-slate-950">Order:</span>{" "}
                  {status.order._id}
                </p>
                <p className="mt-2">
                  <span className="font-semibold text-slate-950">Total:</span>{" "}
                  ${status.order.totalAmount}
                </p>
              </div>
            )}

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link to="/shop" className="btn-primary">
                Continue Shopping
              </Link>
              <Link to="/" className="btn-secondary">
                Back Home
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Foot />
    </div>
  );
};

export default CheckoutSuccess;
