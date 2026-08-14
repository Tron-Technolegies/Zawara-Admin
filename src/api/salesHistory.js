import api from "./api";

export const getSalesHistory = () => {
    return api.get("sales-history/");
};