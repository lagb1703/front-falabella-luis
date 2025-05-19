import { useState, useEffect, useContext } from "react";
import { backendURL, isDevelopment } from "@/pages";
import userContext from "@/gobal/user/user.context";
import { useLocation } from 'react-router';
import userMock from "./mock/user.mock.json"
export function useLogin(onClose) {
  const { setUser } = useContext(userContext);
  const [isLoading, setIsLoading] = useState(false); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores

  const login = async (correo, contrasena) => {
    setIsLoading(true); // Activa el estado de carga
    setError(null); // Limpia cualquier error previo
    try {
      const data = await getLogin(correo, contrasena);
      // Guarda los datos del usuario (puede incluir un token JWT)
      setUser(data);
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

async function getLogin(correo, contrasena) {
  if(isDevelopment)
    return userMock;
  const response = await fetch(`${backendURL}auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ correo, contrasena }),
  });
  if (!response.ok) {
    throw new Error("Credenciales incorrectas o error en el servidor");
  }
  const data = await response.json();
  return data.usuario;
}

export function useLoginClose(isOpen, onClose) {
  const location = useLocation();
  useEffect(() => {
    if (isOpen)
      onClose()
  }, [location]);
}