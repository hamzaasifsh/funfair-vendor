import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL, imageUrl } from "../api/baseUrl";
import useGsapReveal from "../hooks/useGsapReveal";

const EditProduct = () => {
  const pageRef = useRef(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "Clothing",
    existingImages: [],
    images: [],
  });

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await fetch(`${API_URL}/products/my-products`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        const product = Array.isArray(data)
          ? data.find((item) => item._id === id)
          : null;

        if (product) {
          setFormData({
            name: product.name || "",
            description: product.description || "",
            price: product.price || "",
            stock: product.stock || "",
            category: product.category || "Clothing",
            existingImages: product.images || [],
            images: [],
          });
        }
      } catch (error) {
        console.error("Error loading product:", error);
      }
    };

    loadProduct();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: name === "images" ? Array.from(files || []) : value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();

      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("stock", formData.stock);
      formDataToSend.append("category", formData.category);
      formDataToSend.append(
        "existingImages",
        JSON.stringify(formData.existingImages)
      );
      formData.images.forEach((image) => {
        formDataToSend.append("images", image);
      });

      const res = await fetch(`${API_URL}/products/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const data = await res.json();
      alert(data.message || "Product updated successfully");
      navigate("/my-products");
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  useGsapReveal(pageRef, []);

  return (
    <div ref={pageRef} className="animate-pageEnter">
      <div data-gsap="fade-up" className="mb-6">
        <p className="eyebrow">Catalog</p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-950">
          Edit Product
        </h1>
        <p className="mt-2 text-slate-600">
          Update product details, stock, and product images.
        </p>
      </div>

      <form onSubmit={handleUpdate} data-gsap="fade-up" className="panel max-w-3xl space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Product name"
          value={formData.name}
          onChange={handleChange}
          className="field"
        />

        <textarea
          name="description"
          placeholder="Product description"
          value={formData.description}
          onChange={handleChange}
          className="field h-36 resize-none"
        />

        {formData.existingImages.length > 0 && (
          <div className="grid gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="font-bold text-slate-950">Current images</h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {formData.existingImages.map((image) => (
                <img
                  key={image}
                  src={imageUrl(image)}
                  alt="Current product"
                  className="h-24 rounded-lg object-cover"
                />
              ))}
            </div>
          </div>
        )}

        <input
          type="file"
          name="images"
          accept="image/*"
          multiple
          onChange={handleChange}
          className="field"
        />

        <p className="text-sm leading-6 text-slate-500">
          Add new images to replace or expand the product gallery. Use clear
          photos under 5 MB each.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="field"
          />

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
            className="field"
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

        <div className="flex flex-col gap-3 sm:flex-row">
          <button type="submit" className="btn-primary">
            Update Product
          </button>
          <button
            type="button"
            onClick={() => navigate("/my-products")}
            className="btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
