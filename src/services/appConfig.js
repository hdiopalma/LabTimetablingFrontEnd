import axios from 'axios';
const apiURL = axios.create({
    baseURL: import.meta.env.VITE_API_URL
  })
  const localURL = axios.create({
    baseURL: axios.defaults.baseURL
  })

export const AppConfig = {
    apiURL: apiURL,
    localURL: localURL,
    tokenKey: import.meta.env.VITE_TOKEN_KEY,
    // Add other global configurations here
};