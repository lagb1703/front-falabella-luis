import React, { useState } from "react";
import { RiCloseLargeFill } from "react-icons/ri";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { useLogin } from "./loginForm.service"; // Importa el servicio  
import "./loginForm.css";

export default function LoginForm({onClose}){ //Modificación para el cierre del submenu
  const [showPassword, setShowPassword] = useState(false);
  const [correo, setEmail] = useState("");
  const [contrasena, setPassword] = useState("");

  // Usa el hook useLogin
  const { login, isLoading, error, userData } = useLogin();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Llama a la función login del servicio
      const response = await login(correo, contrasena);
      console.log("Inicio de sesión exitoso:", response);

      // Aquí puedes redirigir al usuario o guardar el token en localStorage
      // Por ejemplo:
      // localStorage.setItem("token", response.token);
      // window.location.href = "/dashboard";
    } catch (error) {
      console.error("Error durante el inicio de sesión:", error);
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <div className="close" onClick={onClose}>
          <RiCloseLargeFill />
        </div>

        <div className="logo">
          <img
            src="https://images.contentstack.io/v3/assets/blt7c5c2f2f888a7cc3/blt9a6cb2faab703fa5/65a68ebb130790558acbf0cb/falabella.com_green_icon.svg"
            alt="logo de falabella"
            style={{ width: "100px", height: "auto", borderRadius: "10px" }}
          />
        </div>

        <h1>Inicia sesión para comprar</h1>

        {error && <div className="error-message">{error}</div>}

        <div className="input-box">
          <input
            type="text"
            placeholder="Ingresa tu correo electrónico"
            value={correo}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-box">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Ingresa tu contraseña"
            value={contrasena}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span className="icon" onClick={togglePasswordVisibility}>
            {showPassword ? <FiEye /> : <FiEyeOff />}
          </span>
        </div>

        <div className="remember">
          <p>
            ¿Olvidaste tu contraseña? No te preocupes, pide un código verificador por{" "}
            <a href="#">correo</a> o <a href="#">SMS</a>
          </p>
        </div>

        <div className="button">
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Cargando..." : "Ingresar"}
          </button>
        </div>

        <div className="register-link">
          <p>
            ¿Aún no tienes cuenta? <a href="#">Regístrate</a>
          </p>
        </div>
      </form>
    </div>
  );
};