import { Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import Shop from "./pages/shop";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddProduct from "./pages/AddProduct";
import MyProducts from "./pages/MyProducts";
import EditProduct from "./pages/EditProduct";
import DashboardLayout from "./components/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import Orders from "./pages/Orders";
import SmoothScroll from "./components/SmoothScroll";
import AdminPanel from "./pages/AdminPanel";
import CheckoutSuccess from "./pages/CheckoutSuccess";

function App() {
  return (
    <>
      <SmoothScroll />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/checkout-success" element={<CheckoutSuccess />} />
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminPanel />
            </AdminProtectedRoute>
          }
        />

        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/my-products" element={<MyProducts />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
