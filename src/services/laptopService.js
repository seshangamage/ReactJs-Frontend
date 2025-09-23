import axios from 'axios';

const API_BASE_URL = 'https://sheshantestbackend-hxeugfb9bzf8baem.canadacentral-01.azurewebsites.net/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.url);
    console.log('Request method:', config.method);
    console.log('Request data:', config.data);
    console.log('Request headers:', config.headers);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('API Error Details:');
    console.error('Status:', error.response?.status);
    console.error('Status Text:', error.response?.statusText);
    console.error('Response Data:', error.response?.data);
    console.error('Request URL:', error.config?.url);
    console.error('Request Method:', error.config?.method);
    console.error('Request Data:', error.config?.data);
    return Promise.reject(error);
  }
);

const laptopService = {
  // Get all laptops
  getAllLaptops: async () => {
    try {
      const response = await api.get('/laptops');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch laptops: ${error.response?.data?.message || error.message}`);
    }
  },

  // Get laptop by ID
  getLaptopById: async (id) => {
    try {
      const response = await api.get(`/laptops/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch laptop: ${error.response?.data?.message || error.message}`);
    }
  },

  // Create new laptop
  createLaptop: async (laptopData) => {
    try {
      console.log('Creating laptop with data:', laptopData);
      
      // Validate the data before sending
      const validatedData = {
        brand: laptopData.brand || '',
        model: laptopData.model || '',
        price: parseFloat(laptopData.price) || 0,
        processor: laptopData.processor || '',
        ram: parseInt(laptopData.ram) || 0,
        storage: parseInt(laptopData.storage) || 0,
        gpu: laptopData.gpu || '',
        operatingSystem: laptopData.operatingSystem || '',
        screenSize: parseFloat(laptopData.screenSize) || 0,
        description: laptopData.description || '',
        isAvailable: Boolean(laptopData.isAvailable),
        stockQuantity: parseInt(laptopData.stockQuantity) || 0
      };
      
      console.log('Validated data being sent:', validatedData);
      
      const response = await api.post('/laptops', validatedData);
      return response.data;
    } catch (error) {
      console.error('Create laptop error:', error);
      const errorMessage = error.response?.data?.title || 
                          error.response?.data?.message || 
                          error.message;
      throw new Error(`Failed to create laptop: ${errorMessage}`);
    }
  },

  // Update laptop
  updateLaptop: async (id, laptopData) => {
    try {
      const response = await api.put(`/laptops/${id}`, laptopData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update laptop: ${error.response?.data?.message || error.message}`);
    }
  },

  // Delete laptop
  deleteLaptop: async (id) => {
    try {
      const response = await api.delete(`/laptops/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to delete laptop: ${error.response?.data?.message || error.message}`);
    }
  }
};

export default laptopService;