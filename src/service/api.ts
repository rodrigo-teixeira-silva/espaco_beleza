import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configurando a base URL
const api = axios.create({
  baseURL: 'http://192.168.100.13:3000', 
  timeout: 5000, 
  headers: {
    'Content-Type': 'application/json',
    
  },
});

// Interceptador para adicionar o token JWT em todas as requisições
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token'); // Obtendo o token armazenado
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Adicionando o token no cabeçalho
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export default api;
