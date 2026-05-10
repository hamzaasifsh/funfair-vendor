import { useMemo, useRef, useState } from "react";
import { API_URL } from "../api/baseUrl";
import useGsapReveal from "../hooks/useGsapReveal";

const AddProduct = () => {
  const pageRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "Clothing",
    images: [],
  });

  const token = localStorage.getItem("token");

  const previewUrl = useMemo(() => {
    return formData.images.map((image) => URL.createObjectURL(image));
  }, [formData.images]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: name === "images" ? Array.from(files || []) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();

      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("stock", formData.stock);
      formDataToSend.append("category", formData.category);

      formData.images.forEach((image) => {
        formDataToSend.append("images", image);
      });

      if (formData.images.length === 0) {
        throw new Error("Please add at least one product image");
      }

      const res = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to add product");
      }

      alert("Product added successfully");

      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "Clothing",
        images: [],
      });

      e.target.reset();
    } catch (error) {
      console.error("Add product error:", error);
      alert(error.message || "Something went wrong");
    }
  };

  useGsapReveal(pageRef, []);

  return (
    <div ref={pageRef} className="animate-pageEnter">
      <div data-gsap="slide-left" className="mb-6">
        <p className="eyebrow">Catalog</p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-950">
          Add Product
        </h1>
        <p className="mt-2 text-slate-600">
          Create a polished product listing with clear details, stock, and
          product images customers can trust.
        </p>
      </div>

      <div data-gsap-stagger className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <form onSubmit={handleSubmit} data-gsap="slide-left" className="panel space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Product name"
            value={formData.name}
            onChange={handleChange}
            className="field"
            required
          />

          <textarea
            name="description"
            placeholder="Product description"
            value={formData.description}
            onChange={handleChange}
            className="field h-36 resize-none"
            required
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="field"
              required
            />

            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={formData.stock}
              onChange={handleChange}
              className="field"
              required
            />
          </div>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="field"
          >
            <option value="Clothing">Clothing</option>
            <option value="Beauty">Beauty</option>
            <option value="Food">Food</option>
            <option value="Accessories">Accessories</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={handleChange}
            className="field"
            required
          />

          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
            <h3 className="font-bold text-slate-950">Product images</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Upload clear photos from different angles. You can add up to 5
              images, each under 5 MB.
            </p>
          </div>

          <button type="submit" className="btn-primary">
            Add Product
          </button>
        </form>

        <aside data-gsap="pop" data-gsap-hover="lift" className="surface h-fit overflow-hidden rounded-xl">
          {previewUrl.length > 0 ? (
            <div className="grid gap-2 p-2">
              <img
                src={previewUrl[0]}
                alt="Main product preview"
                className="h-64 w-full rounded-lg object-cover"
              />
              {previewUrl.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {previewUrl.slice(1, 5).map((url, index) => (
                    <img
                      key={url}
                      src={url}
                      alt={`Product preview ${index + 2}`}
                      className="h-20 rounded-lg object-cover"
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="grid h-64 place-items-center bg-slate-100 text-sm font-semibold text-slate-400">
              Image Preview
            </div>
          )}
          <div className="p-5">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-indigo-600">
              {formData.category}
            </p>
            <h2 className="mt-2 text-xl font-bold text-slate-950">
              {formData.name || "Product title"}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {formData.description || "Product description will appear here."}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-2xl font-extrabold text-slate-950">
                Rs {formData.price || 0}
              </span>
              <span className="status-pill bg-emerald-100 text-emerald-800">
                {formData.stock || 0} stock
              </span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default AddProduct;
