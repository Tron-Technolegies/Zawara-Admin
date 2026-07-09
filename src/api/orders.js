import api from "./api";

export const getAdminOrders = () => {
    return api.get("admin_get_orders/");
};