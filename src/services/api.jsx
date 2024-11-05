import axios from 'axios';
import API_CONFIG from '../configs/api_config';

const api = axios.create({
    baseURL : API_CONFIG.BASE_URL,    // Using the base URL from the config
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