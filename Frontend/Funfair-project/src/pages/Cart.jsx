import { useRef, useState } from "react";
import Foot from "../components/Foot";
import Navbar from "../components/Navbar";
import { API_URL, imageUrl } from "../api/baseUrl";
import useGsapReveal from "../hooks/useGsapReveal";

const Cart = () => {
  const pageRef = useRef(null);
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    return storedCart;
  });
  const [cartNotice, setCartNotice] = useState(null);
  const [customerEmail, setCustomerEmail] = useState("");
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const updateCart = (updatedItems) => {
    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  const increaseQty = (id) => {
    const updatedItems = cartItems.map((item) =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updatedItems);
  };

  const decreaseQty = (id) => {
    const updatedItems = cartItems
      .map((item) =>
        item._id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);

    updateCart(updatedItems);
  };

  const removeItem = (id) => {
    const updatedItems = cartItems.filter((item) => item._id !== id);
    updateCart(updatedItems);
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0
  );

  useGsapReveal(pageRef, [cartItems.length]);

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      setCartNotice({
        title: "Cart is not ready yet",
        message: "Add a few products first, then your checkout will be ready.",
        type: "empty",
      });
      return;
    }

    try {
      setCheckoutLoading(true);

      const res = await fetch(`${API_URL}/orders/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
          })),
          customerEmail,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Could not start Stripe checkout");
      }

      window.location.href = data.url;
    } catch (error) {
      console.error("Checkout error:", error);
      setCartNotice({
        title: "Checkout could not start",
        message:
          error.message ||
          "Please check Stripe setup and try checkout again.",
        type: "empty",
      });
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <div className="app-page">
      <Navbar />

      <main ref={pageRef} className="page-wrap animate-pageEnter py-8">
        <section
          data-gsap="fade-up"
          className="relative mb-8 min-h-[420px] overflow-hidden rounded-xl bg-slate-950 shadow-2xl"
        >
          <img
            src="/cart-luxe-preview.png"
            alt="Luxury ecommerce cart preview"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/92 via-slate-950/52 to-slate-950/10" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-950/85 to-transparent" />

          <div className="relative z-10 flex min-h-[420px] flex-col justify-end gap-8 p-5 md:p-8 lg:flex-row lg:items-end lg:justify-between lg:p-10">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-200">
                Checkout
              </p>
              <h1 className="mt-3 text-4xl font-extrabold leading-tight text-white md:text-6xl">
                My Cart
              </h1>
              <p className="mt-4 max-w-xl text-base leading-8 text-slate-200 md:text-lg">
                Review quantities and place your order when everything looks
                right.
              </p>
            </div>

            <div className="w-full max-w-sm rounded-xl border border-white/15 bg-white/10 p-5 text-white shadow-xl backdrop-blur-md">
              <p className="text-sm font-semibold text-slate-300">
                Cart status
              </p>
              <h2 className="mt-2 text-2xl font-extrabold">
                {cartItems.length > 0 ? "Ready to checkout" : "Waiting for items"}
              </h2>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-white/10 p-3">
                  <p className="text-xs font-semibold text-slate-300">Items</p>
                  <p className="mt-1 text-2xl font-extrabold">
                    {cartItems.length}
                  </p>
                </div>
                <div className="rounded-lg bg-white/10 p-3">
                  <p className="text-xs font-semibold text-slate-300">Total</p>
                  <p className="mt-1 text-2xl font-extrabold">
                    Rs {totalAmount}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {cartItems.length === 0 ? (
          <div data-gsap="fade-up" className="surface overflow-hidden rounded-xl">
            <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="relative min-h-[280px] bg-slate-950">
                <img
                  src="/cart-luxe-preview.png"
                  alt="Luxury shopping preview"
                  className="absolute inset-0 h-full w-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-slate-950/45" />
              </div>
              <div className="p-8 md:p-10">
                <p className="eyebrow">Cart check</p>
                <h2 className="mt-3 text-3xl font-extrabold text-slate-950">
                  Your cart is empty
                </h2>
                <p className="mt-3 leading-7 text-slate-600">
                  Add products from the shop to start an order. Once items are
                  here, this page will show your total and checkout status.
                </p>
                <button
                  onClick={() =>
                    setCartNotice({
                      title: "Cart is not ready yet",
                      message: "Your cart needs at least one product before checkout.",
                      type: "empty",
                    })
                  }
                  className="btn-primary mt-6"
                >
                  Check Cart Status
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <div data-gsap-stagger className="space-y-4">
              {cartItems.map((item) => (
                <article
                  key={item._id}
                  className="surface flex flex-col gap-4 rounded-xl p-4 sm:flex-row sm:items-center"
                >
                  {item.images?.[0] ? (
                    <img
                      src={imageUrl(item.images[0])}
                      alt={item.name}
                      className="h-32 w-full rounded-lg object-cover sm:w-32"
                    />
                  ) : (
                    <div className="grid h-32 w-full place-items-center rounded-lg bg-slate-100 text-sm font-semibold text-slate-400 sm:w-32">
                      No Image
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <h2 className="text-xl font-bold text-slate-950">
                      {item.name}
                    </h2>
                    <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-600">
                      {item.description}
                    </p>
                    <p className="mt-3 text-lg font-extrabold text-slate-950">
                      Rs {item.price}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decreaseQty(item._id)}
                      className="grid h-10 w-10 place-items-center rounded-lg bg-slate-100 text-lg font-bold text-slate-700 hover:bg-slate-200"
                    >
                      -
                    </button>
                    <span className="grid h-10 min-w-10 place-items-center rounded-lg border border-slate-200 px-3 font-bold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => increaseQty(item._id)}
                      className="grid h-10 w-10 place-items-center rounded-lg bg-slate-100 text-lg font-bold text-slate-700 hover:bg-slate-200"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item._id)}
                    className="btn-danger"
                  >
                    Remove
                  </button>
                </article>
              ))}
            </div>

            <aside data-gsap="fade-up" className="surface h-fit rounded-xl p-5">
              <p className="text-sm font-semibold text-slate-500">
                Order Summary
              </p>
              <div className="mt-4 space-y-3 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>Items</span>
                  <span>{cartItems.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>Rs {totalAmount}</span>
                </div>
              </div>
              <div className="mt-5 border-t border-slate-200 pt-5">
                <label className="block text-sm font-semibold text-slate-600">
                  Email for receipt
                </label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(event) => setCustomerEmail(event.target.value)}
                  className="field mt-2"
                  placeholder="customer@example.com"
                />
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-950">Total</span>
                  <span className="text-2xl font-extrabold text-slate-950">
                    Rs {totalAmount}
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={checkoutLoading}
                  className="btn-primary mt-5 w-full"
                >
                  {checkoutLoading ? "Opening Stripe..." : "Pay with Stripe"}
                </button>
              </div>
            </aside>
          </div>
        )}
      </main>

      {cartNotice && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm">
          <div
            data-gsap="fade-up"
            className="surface max-w-md overflow-hidden rounded-xl text-center shadow-2xl"
          >
            <div className="relative h-44 bg-slate-950">
              <img
                src="/cart-luxe-preview.png"
                alt="Cart status preview"
                className="absolute inset-0 h-full w-full object-cover opacity-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent" />
              <div
                className={`absolute bottom-5 left-1/2 grid h-16 w-16 -translate-x-1/2 place-items-center rounded-full text-2xl font-black shadow-xl ${
                  cartNotice.type === "success"
                    ? "bg-emerald-400 text-emerald-950"
                    : "bg-amber-300 text-amber-950"
                }`}
              >
                {cartNotice.type === "success" ? "✓" : "!"}
              </div>
            </div>
            <div className="p-7">
              <p className="eyebrow">
                {cartNotice.type === "success" ? "Checkout" : "Cart status"}
              </p>
              <h2 className="mt-3 text-3xl font-extrabold text-slate-950">
                {cartNotice.title}
              </h2>
              <p className="mt-3 leading-7 text-slate-600">
                {cartNotice.message}
              </p>
              <button
                onClick={() => setCartNotice(null)}
                className="btn-primary mt-7 w-full"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
      <Foot />
    </div>
  );
};

export default Cart;
