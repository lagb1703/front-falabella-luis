import { backendURL } from '@/pages';
import axios from 'axios';

export const passwordResetService = {
  /**
   * Valida el código de verificación (PIN)
   * @param {string} correo - Correo electrónico del usuario
   * @param {string} pin - Código de verificación
   * @returns {Promise<Object>} Respuesta del servidor
   */
  async validarPin(correo, pin) {
    try {
      const response = await axios.post(`${backendURL}auth/validationPin`, {
        correo,
        pin
      });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Error de conexión');
    }
  },

  /**
   * Actualiza la contraseña del usuario
   * @param {string} correo - Correo electrónico del usuario
   * @param {string} pin - Código de verificación
   * @param {string} nueva_contrasena - Nueva contraseña
   
   * @returns {Promise<Object>} Respuesta del servidor
   */
  async actualizarContrasena(correo, pin, nueva_contrasena) {
    try {
      const response = await axios.post(`${backendURL}auth/change_password`, {
        correo,
        pin,
        nueva_contrasena
        
      });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Error al actualizar la contraseña');
    }
  },

  /**
   * Solicita un nuevo código de verificación
   * @param {string} correo - Correo electrónico del usuario
   * @returns {Promise<Object>} Respuesta del servidor
   */
  async solicitarNuevoCodigo(correo) {
    try {
      const response = await axios.post(`${backendURL}auth/change_password`, {
        correo
      });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Error al solicitar nuevo código');
    }
  }
};
  