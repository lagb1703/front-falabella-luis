import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const ConfirmPassword = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    // Iniciar el contador
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/"); // Redirige a la página principal
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(timer);
  }, [navigate]);

  const handleManualRedirect = () => {
    navigate("/"); // Redirige manualmente a la página principal
  };

  return (
    <div className="page-container">
      <div className="card">
        <div className="icon-success">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="#4CAF50"/>
          </svg>
        </div>
        <h1 className="title">Te damos la bienvenida a falabella.com</h1>
        <p className="description">
          Desde ahora puedes comenzar a comprar en nuestra app o sitio web y disfrutar de todos nuestros beneficios.
        </p>
        <button 
          className={`button active`} 
          onClick={handleManualRedirect}
        >
          Ir a comprar ahora
        </button>
      </div>
    </div>
  );
};

export default ConfirmPassword;
