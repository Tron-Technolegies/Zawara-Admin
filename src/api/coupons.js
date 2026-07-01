import api from "./api";


export const getCoupons = () => {
    return api.get("coupons/view/");
};

// export const getCoupon = (couponId) => {
//     return api.get(`coupon/view/${couponId}/`);
// };

export const createCoupon = (data) => {
    return api.post("coupon/create/", data);
};

export const updateCoupon = (couponId, data) => {
    return api.post(`coupon/update/${couponId}/`, data);
};

export const deleteCoupon = (couponId) => {
    return api.delete(`coupon/delete/${couponId}/`);
};