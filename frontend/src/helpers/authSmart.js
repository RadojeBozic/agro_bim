import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/smart",
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("smart_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (email, password) => {
  await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie", {
    withCredentials: true,
  });

  const res = await API.post("/login", { email, password });

  localStorage.setItem("smart_token", res.data.token);

  return res;
};

export const register = async (formData) => {
  await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie", {
    withCredentials: true,
  });
  return API.post("/register", formData);
};

export const getSmartUser = async () => {
  return API.get("/me");
};

export const logout = async () => {
  await API.post("/logout");
  localStorage.removeItem("smart_token");
};

export default API;
