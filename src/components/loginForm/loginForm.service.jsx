import { useState } from "react";
const backendURL = 'https://25djsx5x-3000.use2.devtunnels.ms/'

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores
  const [userData, setUserData] = useState(null); // Estado para almacenar los datos del usuario

  const login = async (correo, contrasena) => {
    setIsLoading(true); // Activa el estado de carga
    setError(null); // Limpia cualquier error previo

    try {
      // Realiza la solicitud al backend
      const response = await fetch(`${backendURL}auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({correo, contrasena }), // Envía las credenciales
      });

      // Verifica si la respuesta es exitosa
      if (!response.ok) {
        throw new Error("Credenciales incorrectas o error en el servidor");
      }

      // Parsea la respuesta JSON
      const data = await response.json();

      // Guarda los datos del usuario (puede incluir un token JWT)
      setUserData(data);

      // Retorna los datos para que el componente los use
      return data;
    } catch (error) {
      // Maneja errores
      setError(error.message);
      throw error; // Lanza el error para que el componente lo maneje
    } finally {
      setIsLoading(false); // Desactiva el estado de carga
    }
  };

  return { login, isLoading, error, userData };
}