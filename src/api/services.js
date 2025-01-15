import axios from "axios";

const api = axios.create({
  baseURL: "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
