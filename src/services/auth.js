import api from './api';
import { toast } from 'react-toastify';

export const login = async (email, password) => {
  try {
    const response = await api.post('/api/auth/login', { email, password });
    localStorage.setItem('jwt_token', response.data.data.token);
    toast.success('Login realizado com sucesso!');
    return response.data;
  } catch (error) {
    console.error(error.response?.data?.message || error.message || 'Erro desconhecido');
  }
};

export const register = async (name, email, password) => {
  try {
    const response = await api.post('/api/auth/register', { name, email, password });
    toast.success('Cadastro realizado com sucesso! Faça login para continuar.');
    console.log('Registro realizado com sucesso!');
    return response.data;
  } catch (error) {
    console.error(error.response?.data?.message || error.message || 'Erro desconhecido');
  }
};

export const logout = () => {
  localStorage.removeItem('jwt_token');
  toast.success('Logout realizado com sucesso!');
};