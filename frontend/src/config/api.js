const API_BASE_URL = "http://localhost:3000";


const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  REGISTER: `${API_BASE_URL}/api/auth/register`,
  LOGOUT: `${API_BASE_URL}/api/auth/logout`,
  GET_PROFILE: `${API_BASE_URL}/api/auth/me`,
  CLIENT_REQUESTS: `${API_BASE_URL}/api/client-requests`,
};

export default API_ENDPOINTS;
