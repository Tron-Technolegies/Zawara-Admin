import api from "./api";

export const getProducts = () => {
    return api.get("product/");
};


export const addProduct = (formData) => {
    return api.post("product/add/", formData);
};

export const updateProduct = (id, data) => {
    return api.post(
        `product/update/${id}/`,
        data
    );
};

export const deleteProduct = (id) => {
    return api.delete(
        `product/delete/${id}/`
    );
};