import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/api/admin";

export const getNotifications = async () => {
    const res = await axios.get(`${API_BASE}/notifications/`);
    return res.data;
};

export const markNotificationRead = async (id) => {
    const res = await axios.post(`${API_BASE}/notifications/read/${id}/`);
    return res.data;
};

export const markAllNotificationsRead = async () => {
    const res = await axios.post(`${API_BASE}/notifications/read-all/`);
    return res.data;
};