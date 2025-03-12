import {backendURL} from "@/pages"
export const registerUser = async (userData) => {
    try {
      const response = await fetch(`${backendURL}registro`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        throw new Error('Error en el registro. Por favor, inténtalo de nuevo.');
      }
  
      const data = await response.json();
      return data; // Retorna la respuesta del servidor (puede incluir un token, mensaje de éxito, etc.)
    } catch (error) {
      console.error('Error durante el registro:', error);
      throw error; // Lanza el error para manejarlo en el componente
    }
  };