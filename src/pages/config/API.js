import axios from 'axios';

const API = axios.create({
  baseURL: process.env.BACK_URL || 'http://localhost:3001',
  // withCredentials: true,
});

export default API;
