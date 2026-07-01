import axios from "axios";

const api = axios.create({
    baseURL: "https://zawara-backend.onrender.com/api/admin/",
    // baseURL: "http://127.0.0.1:8000/api/admin/",


});

export default api;