// Use environment variable if available, otherwise fallback to local development
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// Ensure the API base URL ends with /api
const getBaseUrl = () => {
  const baseUrl = API_BASE_URL.endsWith('/api') 
    ? API_BASE_URL 
    : `${API_BASE_URL}/api`;
  return baseUrl;
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${getBaseUrl()}/auth/login`,
    REGISTER: `${getBaseUrl()}/auth/register`,
    USER: `${getBaseUrl()}/auth/user`
  },
  PAYMENT: {
    CREATE_ORDER: `${getBaseUrl()}/payment/orders`,
    CAPTURE: (orderId) => `${getBaseUrl()}/payment/capture/${orderId}`
  }
};

// Log the API configuration in development for debugging
if (import.meta.env.DEV) {
  console.log('API Configuration:', {
    baseUrl: getBaseUrl(),
    endpoints: API_ENDPOINTS
  });
}
