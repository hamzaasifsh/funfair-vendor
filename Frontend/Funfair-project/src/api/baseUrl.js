const rawApiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const API_BASE_URL = rawApiBaseUrl.replace(/\/api\/?$/, "").replace(/\/$/, "");

export const API_URL = `${API_BASE_URL}/api`;

export const imageUrl = (src) => {
  if (!src) return "";
  return src.startsWith("/uploads") ? `${API_BASE_URL}${src}` : src;
};
