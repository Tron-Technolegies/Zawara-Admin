import api from "./api";

export const getCategories = () => {
    return api.get("categories/");
};

export const addCategories = (formData) => {
    return api.post("categories/add/", formData);
};

export const deleteCategories = (id) => {
    return api.delete(`categories/delete/${id}/`);
};

export const updateCategories = (id, data) => {
    return api.post(`/categories/update/${id}/`, data);
}
