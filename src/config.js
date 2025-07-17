const API_BASE_URL = 'http://localhost:5001/api';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    USER: `${API_BASE_URL}/auth/user`
  },
  PAYMENT: {
    CREATE_ORDER: `${API_BASE_URL}/payment/orders`,
    CAPTURE: (orderId) => `${API_BASE_URL}/payment/capture/${orderId}`
  }
};
