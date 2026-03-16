import axios from "axios";

const api = axios.create({
  baseURL: "/api", // this uses Vite proxy
});

export default api;