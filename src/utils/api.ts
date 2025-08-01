import axios from "axios";
import type { Order, Product } from "../types/order";

const API_URL = "http://localhost:3001/api/v1";

console.log('API URL:', API_URL);

const api = axios.create({
  baseURL: API_URL,
});

// Add request interceptor for logging
api.interceptors.request.use((config) => {
  console.log('Making request to:', config.url);
  console.log('Request config:', config);
  
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  console.error('Request error:', error);
  return Promise.reject(error);
});

// Add response interceptor for logging
api.interceptors.response.use((response) => {
  console.log('Response received:', {
    url: response.config.url,
    status: response.status,
    data: response.data
  });
  return response;
}, (error) => {
  console.error('Response error:', {
    url: error.config?.url,
    status: error.response?.status,
    data: error.response?.data
  });
  return Promise.reject(error);
});

export const createOrder = async (orderData: Order) => {
  try {
    const response = await api.post("/order", orderData);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const getOrder = async (id: string) => {
  try {
    const response = await api.get(`/order/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
};

export const getProducts = async (): Promise<Product[]> => {
  console.log('getProducts called');
  try {
    console.log('Making GET request to /product');
    const response = await api.get("/product");
    console.log('Raw response:', response);
    
    if (!response.data) {
      console.error('No data in response');
      return [];
    }
    
    // ตรวจสอบว่าข้อมูลอยู่ที่ .data หรือ .data.data
    const products = response.data.data || response.data;
    console.log('Processed products:', products);
    
    if (!Array.isArray(products)) {
      console.error('Products is not an array:', products);
      return [];
    }
    
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    if (axios.isAxiosError(error)) {
      console.error('Detailed error:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        config: error.config
      });
    }
    throw error;
  }
};

export const getRooms = async () => {
  try {
    const response = await api.get("/room");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw error;
  }
};

export const getTeams = async () => {
  try {
    const response = await api.get("/team");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching teams:", error);
    throw error;
  }
};

export const getBranchs = async () => {
  try {
    const response = await api.get("/branch");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching branchs:", error);
    throw error;
  }
};

export const getYears = async () => {
  try {
    const response = await api.get("/grade-level");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching years:", error);
    throw error;
  }
};



