import { useEffect, useMemo, useRef, useState } from "react";
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
        <div data-gsap="fade-up" className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Customer Storefront</p>
            <h1 className="mt-2 text-4xl font-extrabold text-slate-950">
              Shop products
            </h1>
            <p className="mt-2 max-w-2xl text-slate-600">
              Browse fresh picks from Dukan vendors and add your favorites to
              cart.
            </p>
          </div>

          <div className="flex gap-2 overflow-x-auto rounded-xl bg-white p-1 shadow-sm scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-lg px-4 py-2 text-sm font-semibold whitespace-nowrap ${
                  selectedCategory === category
                    ? "bg-slate-950 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

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
    </div>
  );
};

export default Shop;
