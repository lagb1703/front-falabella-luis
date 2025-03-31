import { useState, useEffect, useContext } from "react";
import { backendURL } from "@/pages";
import userContext from "@/gobal/user/user.context";
import { useLocation } from 'react-router';
export function useLogin(onClose) {
  const { setUser } = useContext(userContext);
  const [isLoading, setIsLoading] = useState(false); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores

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
        body: JSON.stringify({ correo, contrasena }), // Envía las credenciales
      });

      // Verifica si la respuesta es exitosa
      if (!response.ok) {
        throw new Error("Credenciales incorrectas o error en el servidor");
      }

      // Parsea la respuesta JSON
      const data = await response.json();

      // Guarda los datos del usuario (puede incluir un token JWT)
      setUser(data.usuario);
      onClose();
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

  return { login, isLoading, error };
}

export function useLoginClose(isOpen, onClose) {
  const location = useLocation();
  useEffect(() => {
    if (isOpen)
      onClose()
  }, [location]);
}