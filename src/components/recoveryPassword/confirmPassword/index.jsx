import React, { useState } from "react";
import "./ConfirmCard.css";
import { X } from "lucide-react"; 
// import lockImage from "../../assets/lock-gray-21-04-2023.svg"

const ConfirmCard = () => {
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

  return (
    <div className="page-container">
      <div className="card">
          <h1 className="title">Te damos la bienvenida a falabella.com</h1>
        <p className="description">
          Desde ahora puedes comenzar a comprar en nuestra app o sitio web y disfrutar de todos nuestros beneficios.
        </p>
        <button className={`button active`}>
          Ir a comprar
        </button>
      </div>
    </div>
  );
};

export default ConfirmCard;
