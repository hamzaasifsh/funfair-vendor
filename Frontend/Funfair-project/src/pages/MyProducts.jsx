import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL, imageUrl } from "../api/baseUrl";
import useGsapReveal from "../hooks/useGsapReveal";

const MyProducts = () => {
  const pageRef = useRef(null);
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/products/my-products`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    loadProducts();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      alert(data.message);

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  useGsapReveal(pageRef, [products.length]);

  return (
    <div ref={pageRef} className="animate-pageEnter">
      <div data-gsap="fade-up" className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Catalog</p>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-950">
            My Products
          </h1>
          <p className="mt-2 text-slate-600">
            Manage your listings, pricing, categories, and availability.
          </p>
        </div>
        <button onClick={() => navigate("/add-product")} className="btn-primary">
          Add Product
        </button>
      </div>

      {products.length === 0 ? (
        <div data-gsap="fade-up" className="panel py-12 text-center">
          <h2 className="text-xl font-bold text-slate-950">
            No products added yet
          </h2>
          <p className="mt-2 text-slate-600">
            Add your first product to start building the storefront.
          </p>
        </div>
      ) : (
        <div data-gsap-stagger className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <article key={product._id} className="surface overflow-hidden rounded-xl">
              {product.images?.[0] ? (
                <img
                  src={imageUrl(product.images[0])}
                  alt={product.name}
                  className="h-48 w-full object-cover"
                />
              ) : (
                <div className="grid h-48 w-full place-items-center bg-slate-100 text-sm font-semibold text-slate-400">
                  No Image
                </div>
              )}

              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-indigo-600">
                      {product.category}
                    </p>
                    <h2 className="mt-1 text-lg font-bold text-slate-950">
                      {product.name}
                    </h2>
                  </div>
                  <span className="status-pill bg-emerald-100 text-emerald-800">
                    {product.stock} stock
                  </span>
                </div>

                <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
                  {product.description}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-2xl font-extrabold text-slate-950">
                    Rs {product.price}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/edit-product/${product._id}`)}
                      className="btn-secondary px-4 py-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProducts;
