import { useRef, useState } from "react";
import Navbar from "../components/Navbar";
import useGsapReveal from "../hooks/useGsapReveal";

const imageUrl = (src) => {
  if (!src) return "";
  return src.startsWith("/uploads") ? `http://localhost:5000${src}` : src;
};

const Cart = () => {
  const pageRef = useRef(null);
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    return storedCart;
  });

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
    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            productId: item._id,
            vendorId: item.vendorId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          totalAmount,
        }),
      });

      await res.json();
      alert("Order placed successfully");

      localStorage.removeItem("cart");
      setCartItems([]);
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  return (
    <div className="app-page">
      <Navbar />

      <main ref={pageRef} className="page-wrap animate-pageEnter py-8">
        <div data-gsap="fade-up" className="mb-8">
          <p className="eyebrow">Checkout</p>
          <h1 className="mt-2 text-4xl font-extrabold text-slate-950">
            My Cart
          </h1>
          <p className="mt-2 text-slate-600">
            Review quantities and place your order when everything looks right.
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div data-gsap="fade-up" className="panel py-12 text-center">
            <h2 className="text-xl font-bold text-slate-950">
              Your cart is empty
            </h2>
            <p className="mt-2 text-slate-600">
              Add products from the shop to start an order.
            </p>
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
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-950">Total</span>
                  <span className="text-2xl font-extrabold text-slate-950">
                    Rs {totalAmount}
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="btn-primary mt-5 w-full"
                >
                  Place Order
                </button>
              </div>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;
