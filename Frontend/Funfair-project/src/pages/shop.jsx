import { useEffect, useMemo, useRef, useState } from "react";
import Foot from "../components/Foot";
import Navbar from "../components/Navbar";
import { API_URL, imageUrl } from "../api/baseUrl";
import useGsapReveal from "../hooks/useGsapReveal";

const Shop = () => {
  const pageRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/products`);
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error loading shop products:", error);
      }
    };

    loadProducts();
  }, []);

  const categories = useMemo(() => {
    const unique = products
      .map((product) => product.category)
      .filter(Boolean)
      .sort();
    return ["All", ...new Set(unique)];
  }, [products]);

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  useGsapReveal(pageRef, [filteredProducts.length, selectedCategory]);

  const handleAddToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = existingCart.find((item) => item._id === product._id);

    const updatedCart = existingItem
      ? existingCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...existingCart, { ...product, quantity: 1 }];

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert("Product added to cart");
  };

  return (
    <div className="app-page">
      <Navbar />

      <main ref={pageRef} className="page-wrap animate-pageEnter py-8">
        <section
          data-gsap="fade-up"
          className="relative mb-8 min-h-[520px] overflow-hidden rounded-xl bg-slate-950 shadow-2xl"
        >
          <video
            className="absolute inset-0 h-full w-full object-contain"
            src="/shop-hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Muted premium shopping collection video"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/94 via-slate-950/48 to-slate-950/20" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-950/80 to-transparent" />

          <div className="relative z-10 flex min-h-[520px] flex-col justify-end gap-8 p-5 md:p-8 lg:flex-row lg:items-end lg:justify-between lg:p-10">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-200">
                Customer Storefront
              </p>
              <h1 className="mt-3 text-4xl font-extrabold leading-tight text-white md:text-6xl">
                Shop products
              </h1>
              <p className="mt-4 max-w-xl text-base leading-8 text-slate-200 md:text-lg">
                Browse fresh picks from Dukan vendors and add your favorites to
                cart.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
                  New arrivals
                </span>
                <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
                  Vendor picks
                </span>
                <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
                  Muted preview
                </span>
              </div>
            </div>

            <div className="max-w-full rounded-xl border border-white/15 bg-white/10 p-2 shadow-xl backdrop-blur-md lg:max-w-[520px]">
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold ${
                      selectedCategory === category
                        ? "bg-white text-slate-950"
                        : "text-white hover:bg-white/15"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {filteredProducts.length === 0 ? (
          <div data-gsap="fade-up" className="panel py-12 text-center">
            <h2 className="text-xl font-bold text-slate-950">
              No products available right now
            </h2>
            <p className="mt-2 text-slate-600">
              Check back after vendors add items to the catalog.
            </p>
          </div>
        ) : (
          <div data-gsap-stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <article
                key={product._id}
                className="surface group overflow-hidden rounded-xl"
              >
                {product.images?.[0] ? (
                  <img
                    src={imageUrl(product.images[0])}
                    alt={product.name}
                    className="h-56 w-full object-cover group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="grid h-56 w-full place-items-center bg-slate-100 text-sm font-semibold text-slate-400">
                    No Image
                  </div>
                )}

                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-indigo-600">
                        {product.category || "Product"}
                      </p>
                      <h2 className="mt-1 text-lg font-bold text-slate-950">
                        {product.name}
                      </h2>
                    </div>
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
                      {product.stock || 0} left
                    </span>
                  </div>

                  <p className="mt-3 line-clamp-2 min-h-[44px] text-sm leading-6 text-slate-600">
                    {product.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between gap-3">
                    <span className="text-2xl font-extrabold text-slate-950">
                      Rs {product.price}
                    </span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="btn-primary px-4 py-2.5"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
      <Foot />
    </div>
  );
};

export default Shop;
