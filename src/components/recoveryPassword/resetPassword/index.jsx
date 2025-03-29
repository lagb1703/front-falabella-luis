import React, { useState } from "react";
import "./ResetPassword.css";
import { X } from "lucide-react";
import { useNavigate } from "react-router";
import { resetPasswordService } from "./ResetPassword.service";

const ResetPassword = () => {
  const [correo, setCorreo] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateCorreo = (correo) => {
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return correoRegex.test(correo);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setCorreo(value);
    setError(value && !validateCorreo(value) ? "Ingresa un correo electrónico válido" : "");
  };

  const handleOnBlur = () => {
    if (correo && !validateCorreo(correo)) {
      setError("Ingresa un correo electrónico válido");
    }
  };

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!correo || error) return;

    setIsLoading(true);
    setError("");

    try {
      // Paso 1: Verificar si el correo existe en la base de datos
      await resetPasswordService.verifyCorreo(correo);
      
      // Si todo sale bien, navegar al formulario de reset
      const userData = {
        correo: correo,
      };
      navigate("/recover/ResetPasswordForm", { state: userData });
    } catch (err) {
      setError(err.message || "Ocurrió un error al verificar el correo");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="card">
        <div className="title-container">
          <div className="icon-container">
            {/* <img src={lockImage} alt="password" /> */}
          </div>
          <h1 className="title">Restablecer contraseña</h1>
        </div>
        
        <p className="description">
          Ingresa tu correo electrónico y te enviaremos las instrucciones para una nueva contraseña.
        </p>
        
        <div className={`input-container ${error ? "error" : ""}`}>
          <label className="label">Correo electrónico</label>
          <div className="input-wrapper">
            <input
              type="email"
              className="input"
              placeholder="Ingresa tu correo electrónico"
              value={correo}
              onChange={handleChange}
              onBlur={handleOnBlur}
              disabled={isLoading}
            />
            {correo && !isLoading && (
              <X className="clear-icon" onClick={() => setCorreo("")} />
            )}
          </div>
          {error && <p className="error-message">{error}</p>}
        </div>
        
        <button 
          className={`button ${correo && !error ? "active" : ""}`} 
          disabled={!correo || error || isLoading}
          onClick={handleSubmit}
        >
          {isLoading ? "Procesando..." : "Continuar"}
        </button>
        
        <p className="link">
          <a href="#">Ya tengo el código verificador</a>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;