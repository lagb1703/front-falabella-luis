import React, { useState } from "react";
import "./ResetPassword.css";
import { X } from "lucide-react"; 
import lockImage from "../../assets/lock-gray-21-04-2023.svg"
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setError(value && !validateEmail(value));
  };

  const handleOnBlur = () => {
    setError(!validateEmail(email));
  };

  const navigate = useNavigate();

  const enviarDatos = () => {
    const userData = {
      nombre: "Juan",
      email: email,
    };

    navigate("/ResetPasswordForm", { state: userData }); 
  };

  return (
    <div className="page-container">
      <div className="card">
        <div className="title-container">
          <div className="icon-container">
            <img
              src={lockImage}
              alt="password"
            />
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
              value={email}
              onChange={handleChange}
              onBlur={handleOnBlur}
            />
            {email && (
              <X className="clear-icon" onClick={() => setEmail("")} />
            )}
          </div>
          {error && <p className="error-message">Ingresa un correo electrónico válido</p>}
        </div>
        <button className={`button ${email && !error ? "active" : ""}`} disabled={!email || error} onClick={enviarDatos}>
          Continuar
        </button>
        <p className="link">
          <a href="#">Ya tengo el código verificador</a>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
