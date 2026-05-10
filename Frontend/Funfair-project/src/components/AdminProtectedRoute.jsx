import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../api/api";

const AdminProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const [state, setState] = useState({ loading: true, allowed: false });

  useEffect(() => {
    const checkAdmin = async () => {
      if (!token) {
        setState({ loading: false, allowed: false });
        return;
      }

      try {
        const res = await api.get("/vendors/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setState({
          loading: false,
          allowed: res.data?.role === "admin",
        });
      } catch {
        setState({ loading: false, allowed: false });
      }
    };

    checkAdmin();
  }, [token]);

  if (state.loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#f7f8fb] px-4 text-center">
        <div className="surface rounded-xl p-6">
          <p className="eyebrow">Admin</p>
          <p className="mt-2 font-semibold text-slate-700">
            Checking admin access...
          </p>
        </div>
      </div>
    );
  }

  if (!state.allowed) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminProtectedRoute;
