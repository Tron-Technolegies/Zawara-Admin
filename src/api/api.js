import axios from "axios";

const api = axios.create({
    baseURL: "https://zawara-backend.onrender.com/api/admin/",
});

export default api;