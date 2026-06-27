import api from "./api";

export const getCustomers = () => {
    return api.get("customers/");
};

export const deleteCustomer = (id) => {
    return api.delete(`customers/${id}/delete/`);
};