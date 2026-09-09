import api from "./api";

export const getAdminOrders = () => {
    return api.get("admin_get_orders/");
};

export const updateAdminOrderStatus = (orderId, status) => {
    return api.post(`admin_update_order_status/${orderId}/`, {
        orderStatus: status,
    });
};

export const updateAdminTrackingLink = (orderId, trackingLink) => {
    return api.post(`admin_update_tracking_link/${orderId}/`, {
        trackingLink: trackingLink,
    });
};

export const updateAdminTrackingNumber = (orderId, trackingNumber) => {
    return api.post(`admin_update_tracking_number/${orderId}/`, {
        trackingNumber: trackingNumber,
    });
};