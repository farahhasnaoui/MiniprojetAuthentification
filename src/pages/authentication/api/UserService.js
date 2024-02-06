
import axios from 'axios';

const API_URL =  'http://localhost:4000/api';

const register = (userData) => {
  return axios.post(`${API_URL}/users/register`, userData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const login = async (userData) => {
  return axios.post(`${API_URL}/users/login`, userData);
};

const getallusers = async (page, limit, search) => {
  const response = await axios.get(`${API_URL}/users/users`, {
    params: { page, limit, search },
  });
  return response.data;
};
const getProfile = async (accessToken) => {
  const response = await axios.get(`${API_URL}/users/profile`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  return response.data;
};
export default {
  register,
  login,
  getallusers,getProfile
};
