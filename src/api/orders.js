import api from "./api";

export const getAdminOrders = () => {
    return api.get("admin_get_orders/");
};

export const updateAdminOrderStatus = (orderId, status) => {
    return api.post(`admin_update_order_status/${orderId}/`, {
        orderStatus: status,
    });
};
