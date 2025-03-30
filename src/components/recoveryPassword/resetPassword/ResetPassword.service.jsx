import { backendURL } from '@/pages';
import axios from 'axios';

export const resetPasswordService = {
  async verifyCorreo(correo) {
    try {
      const response = await axios.post(`${backendURL}auth/verificate_email`, { correo });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Error de conexión');
    }
  }
}