import React, { useState } from "react";
import "./NewPassword.css";
import { useLocation, useNavigate } from "react-router";
import { passwordResetService } from "./NewPassword.service";

const NewPassword = () => {
  const [pin, setPin] = useState("");
  const [nueva_contrasena, setNuevaContrasena] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [valid, setValid] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    noSpaces: false,
    noSpecialChars: false
  });

  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  const validatePassword = (pwd) => {
    const requirements = {
      length: pwd.length >= 8,
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      number: /\d/.test(pwd),
      noSpaces: !/\s/.test(pwd),
      noSpecialChars: !/[\\^;'"`%~çÑ]/.test(pwd)
    };
    
    setPasswordRequirements(requirements);
    setValid(Object.values(requirements).every(req => req === true));
  };
  
  const handleSubmit = async () => {
    if (!valid || !pin) {
      setError("Por favor completa todos los campos correctamente");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      // 1. Validar el PIN primero
      await passwordResetService.validarPin(data.correo, pin);
      
      // 2. Si el PIN es válido, actualizar la contraseña
      const response = await passwordResetService.actualizarContrasena(
        data.correo, 
        nueva_contrasena
      );
      
      // 3. Si todo es correcto, navegar a la página de confirmación
      if (response.success) {
        
        navigate("/recover/ConfirmPasswordForm")
        
      } else {
        setError(response.message || "Ocurrió un error al actualizar la contraseña");
      }
    } catch (err) {
      // Manejo específico para errores comunes
      if (err.message.includes("PIN inválido")) {
        setError("El código de verificación es incorrecto");
      } else if (err.message.includes("PIN expirado")) {
        setError("El código de verificación ha expirado. Solicita uno nuevo");
      } else if (err.message.includes("contraseña")) {
        setError("La contraseña no cumple con los requisitos");
      } else {
        setError(err.message || "Ocurrió un error al actualizar la contraseña");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewCode = async (e) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      setError("");
      setSuccess("");
      
      const response = await passwordResetService.solicitarNuevoCodigo(data.correo);
  
      if (response.success) {
        setSuccess("Se ha enviado un nuevo código a tu correo electrónico");
      } else {
        setError(response.message || "Error al solicitar nuevo código");
      }
    } catch (err) {
      setError(err.message || "Error al solicitar nuevo código");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="reset-container">
      <div className="reset-card">
        <div className="reset-card-title-container">
          <img
            src="https://images.falabella.com/v3/assets/blt7c5c2f2f888a7cc3/blt9660ce37645fb03c/644234960de4a8509dbb84d0/lock-gray-21-04-2023.svg"
            alt="password"
            className="lock-icon"
          />
          <h2>Restablecer contraseña</h2>
        </div>
        
        <div className="success-message">
          <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M10 0C4.5 0 0 4.5 0 10s4.5 10 10 10 10-4.5 10-10S15.5 0 10 0zm0 1.333c4.834 0 8.667 3.833 8.667 8.667 0 4.833-3.834 8.666-8.667 8.666S1.334 14.833 1.334 10c0-4.834 3.833-8.667 8.666-8.667zM8.383 15l7.867-8.973L14.93 5 8.1 12.791l-3.328-2.336-1.022 1.293L8.383 15z" fill="#186F07"/>
          </svg>
          <span>Instrucciones enviadas a tu correo.</span>
        </div>

        <p>Ingresa una nueva contraseña para tu cuenta.</p>

        <label>Correo electrónico</label>
        <p className="correo">{data.correo}</p>

        <label>Código verificador</label>
        <input
          className="input"
          type="text"
          placeholder="Ingresa el código verificador"
          value={pin}
          onChange={(e) => {
            setPin(e.target.value);
            setError("");
          }}
          disabled={isLoading}
        />

        <label>Nueva contraseña</label>
        <div className="password-container">
          <input
            className="input"
            type={showPassword ? "text" : "password"}
            placeholder="Ingresa tu nueva contraseña"
            value={nueva_contrasena}
            onChange={(e) => {
              setNuevaContrasena(e.target.value);
              validatePassword(e.target.value);
              setError("");
            }}
            disabled={isLoading}
          />
          <button 
            className="show-password-button"
            onClick={() => setShowPassword(!showPassword)}
            type="button"
          >
            {showPassword ? "Ocultar" : "Mostrar"}
          </button>
        </div>
        
        <ul className="password-rules">
          <li className={passwordRequirements.length ? "valid" : ""}>Mínimo 8 caracteres</li>
          <li className={passwordRequirements.uppercase ? "valid" : ""}>Al menos 1 mayúscula</li>
          <li className={passwordRequirements.lowercase ? "valid" : ""}>Al menos 1 minúscula</li>
          <li className={passwordRequirements.number ? "valid" : ""}>Al menos 1 número</li>
          <li className={passwordRequirements.noSpaces ? "valid" : ""}>Sin espacios</li>
          <li className={passwordRequirements.noSpecialChars ? "valid" : ""}>Sin caracteres especiales</li>
        </ul>
        
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        
        <button 
          className={`button ${(!valid || !pin) ? "disabled" : ""}`} 
          disabled={!valid || !pin || isLoading}
          onClick={handleSubmit}
        >
          {isLoading ? "Procesando..." : "Actualizar Contraseña"}
        </button>

        <p className="help-text">
          ¿No recibiste el código? {' '}
          <a href="#" onClick={handleNewCode}>Solicitar nuevo código</a>.
        </p>
      </div>
    </div>
  );
};

export default NewPassword;