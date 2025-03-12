import React, { useState } from "react";
import "./NewPassword.css";
import { useLocation, useNavigate } from "react-router-dom";

const NewPassword = () => {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [valid, setValid] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  const validatePassword = (pwd) => {
    const isValid =
      pwd.length >= 8 &&
      /[A-Z]/.test(pwd) &&
      /[a-z]/.test(pwd) &&
      /\d/.test(pwd) &&
      !/\s/.test(pwd) &&
      !/[\\^;'"`%~çÑ]/.test(pwd);
    setValid(isValid);
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
        <p className="email">{data.email}</p>

        <label>Código verificador</label>
        <input
          className="input"
          type="text"
          placeholder="Ingresa un código verificador"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <label>Nueva contraseña</label>
        <div className="password-container">
          <input
          className="input"
            type={showPassword ? "text" : "password"}
            placeholder="Ingresa una contraseña"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validatePassword(e.target.value);
            }}
          />
        </div>
        <ul className="password-rules">
          <li className={password.length >= 8 ? "valid" : ""}>Min. 8 caracteres</li>
          <li className={/[A-Z]/.test(password) ? "valid" : ""}>1 mayúscula</li>
          <li className={/[a-z]/.test(password) ? "valid" : ""}>1 minúscula</li>
          <li className={/\d/.test(password) ? "valid" : ""}>1 número</li>
          <li className={!/\s/.test(password) ? "valid" : ""}>Sin espacios</li>
          <li className={!/[\\^;'"`%~çÑ]/.test(password) ? "valid" : ""}>Sin caracteres especiales</li>
        </ul>
        <button className="button" disabled={!valid} onClick={() => {navigate("/Confirm")}}>Crear</button>

        <p className="help-text">
          ¿Aún no te llega? Puedes pedir un nuevo código por <a href="#">correo</a>.
        </p>
      </div>
    </div>
  );
};

export default NewPassword;
