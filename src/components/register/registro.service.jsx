import { useState, useCallback } from "react";
import { useNavigate } from "react-router";
import {backendURL} from "@/pages"

export const registerUser = async (userData) => {
    try {
      const response = await fetch(`${backendURL}auth/register`, {
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

export function useFormData(){
    const [formData, setFormData] = useState({
      correo: '',
      nombres: '',
      apellidos: '',
      tipoDocumento_id: '',
      identificador: '',
      celular: '',
      contrasena: '',
    });
    const handleInputChange = useCallback((e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    }, [formData]);
    return {formData, handleInputChange};
}

export function usePostUserAccount(formData){
  const navigate = useNavigate();
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const handleCheckbox1Change = useCallback(() => {
    setIsChecked1(!isChecked1);
  }, [isChecked1]);
  const handleCheckbox2Change = useCallback(() => {
    setIsChecked2(!isChecked2);
  }, [isChecked2]);
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!isChecked2) {
      alert("Debes aceptar los términos y condiciones para registrarte.");
      return;
    }
    try {
      const response = await registerUser(formData);
      navigate("/");
    } catch (error) {
      console.error("Error durante el registro:", error);
      alert("Error durante el registro. Por favor, inténtalo de nuevo.");
    }
  }, [isChecked2, formData]);
  return {
    isChecked1, 
    isChecked2, 
    handleSubmit, 
    handleCheckbox1Change, 
    handleCheckbox2Change
  }
}

export function useVisibilityPassword(){
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return {
    showPassword, 
    togglePasswordVisibility
  }
}