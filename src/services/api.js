import axios from 'axios';

const api = axios.create({
    baseURL : 'http://127.0.0.1:8000/api/'     // Django backend URL
});

export const registerUser = (data) => api.post('register/', data);
export const loginUser = (data) => api.post('login/', data);  
export const getUsersByRole = (roleId) => api.get(`register/${roleId}/`);
export const updateUserDetails = (roleId, data) => api.put(`register/${roleId}/`, data); 
export const getMenuItem = () => api.get('menu-items/'); 
export const createMenuItem = (data) => api.post('menu-items/',data); 
export const updateMenuItem = (id,data) => api.put(`menu-items/${id}/`,data); 
export const deleteMenuItem = (id) => api.delete(`menu-items/${id}/`);    
export const getCategories = () => api.get('categories/'); 
export const createCategories = (data) => api.post('categories/',data); 
export const updateCategory = (id,data) => api.put(`categories/${id}/`,data);
export const deleteCategory = (id) => api.delete(`categories/${id}/`);  
export const getOrders = () => api.get('orders/'); 