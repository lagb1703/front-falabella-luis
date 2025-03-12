import { useState } from "react";
import './registro.css';
import { FiEyeOff, FiEye } from 'react-icons/fi';
import { AiOutlineBell, AiOutlineFileText, AiOutlineStar, AiOutlineCreditCard } from "react-icons/ai";
import { SlPresent } from "react-icons/sl";
import { registerUser } from './registro.service';

export default function Registro(){
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [formData, setFormData] = useState({
    correo: '',
    nombres: '',
    apellidos: '',
    tipoDocumento_id: '',
    identificador: '',
    celular: '',
    contrasena: '',
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleCheckbox1Change = () => {
    setIsChecked1(!isChecked1);
  };

  const handleCheckbox2Change = () => {
    setIsChecked2(!isChecked2);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isChecked2) {
      alert("Debes aceptar los términos y condiciones para registrarte.");
      return;
    }

    try {
      const response = await registerUser(formData); // Llama al servicio de registro
      console.log("Registro exitoso:", response);
      alert("Registro exitoso. ¡Bienvenido!");
      // Redirige al usuario o realiza otras acciones después del registro
    } catch (error) {
      console.error("Error durante el registro:", error);
      alert("Error durante el registro. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className="wrapper1">
      <div className="container">
        <div className="formulario">
          <h1>Inicia sesión o regístrate para comprar</h1>
          <p className="subtitle">Ingresa tus datos personales y disfruta de una experiencia de compra más rápida.</p>

          <form onSubmit={handleSubmit}>
            <div className="input-box">
              <label>Correo electrónico</label>
              <input
                type="email"
                name="correo"
                placeholder="Ingresa tu correo electrónico"
                value={formData.correo}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="input-box">
              <label>Nombre</label>
              <input
                type="text"
                name="nombres"
                placeholder="Ingresa tu nombre"
                value={formData.nombres}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="input-box">
              <label>Apellidos</label>
              <input
                type="text"
                name="apellidos"
                placeholder="Ingresa tus apellidos"
                value={formData.apellidos}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="input-box">
              <label>Tipo de documento</label>
              <div className="document-input">
                <select
                  className="document-type"
                  name="tipoDocumento_id"
                  value={formData.tipoDocumento_id}
                  onChange={handleInputChange}
                >
                  <option value='1'>CC</option>
                  <option value='2'>CE</option>
                </select>
                <input
                  type="text"
                  name="identificador"
                  placeholder="Número de documento"
                  value={formData.identificador}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="input-box">
              <label>Celular</label>
              <input
                type="tel"
                name="celular"
                placeholder="Ingresa tu número de celular"
                value={formData.celular}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="input-box password-input">
              <label>Contraseña</label>
              <input
                type={showPassword ? "text" : "password"}
                name="contrasena"
                placeholder="Ingresa tu contraseña"
                value={formData.contrasena}
                onChange={handleInputChange}
                required
              />
              <span className="icon" onClick={togglePasswordVisibility}>
                {showPassword ? <FiEye /> : <FiEyeOff />}
              </span>

              <div className="password-requerimientos-flex">
                <div className="requerimientos-fila">
                  <div className="requerimientos">• Mín. 8 caracteres</div>
                  <div className="requerimientos">• 1 número</div>
                  <div className="requerimientos">• 1 mayúscula</div>
                </div>
                <div className="requerimientos-fila">
                  <div className="requerimientos">• 1 minúscula</div>
                  <div className="requerimientos">• Sin espacio</div>
                  <div className="requerimientos">• Sin usar \¡¿"ºª·`´çñÑ</div>
                </div>
              </div>
            </div>

            <div>
              <input
                type="checkbox"
                id="checkbox1"
                checked={isChecked1}
                onChange={handleCheckbox1Change}
              />
              <label htmlFor="checkbox1" className="checkbox-label">
                Quiero acumular CMR Puntos en mis compras según el reglamento del programa y autorizo el tratamiento de mis datos personales.
              </label>
            </div>

            <div>
              <input
                type="checkbox"
                id="checkbox2"
                checked={isChecked2}
                onChange={handleCheckbox2Change}
              />
              <label htmlFor="checkbox2" className="checkbox-label">
                Acepto los términos y condiciones de falabella.com y autorizo el tratamiento de mis datos personales.
              </label>
            </div>

            <button type="submit" disabled={!isChecked2}>
              Registrarse
            </button>
          </form>
        </div>

        <div className="beneficios">
          <h2>Beneficios Falabella.com</h2>
          <div className="beneficios-item">
            <AiOutlineBell className="beneficios-icon" />
            <span>Recibir notificaciones en tiempo real de tus pedidos.</span>
          </div>
          <div className="beneficios-item">
            <AiOutlineFileText className="beneficios-icon" />
            <span>Revisar tus boletas online.</span>
          </div>
          <div className="beneficios-item">
            <AiOutlineStar className="beneficios-icon" />
            <span>Guardar medios de pago y direcciones favoritas.</span>
          </div>
          <div className="beneficios-item">
            <img
              src="https://www.cmrpuntos.com.co/static/media/logo.9c098baf.svg"
              alt="logo CMR"
              className="cmr"
            />
            <span>Ser parte de CMR Puntos, el mejor programa de beneficios.</span>
          </div>
          <div className="beneficios-item">
            <AiOutlineCreditCard className="beneficios-icon" />
            <span>Canje de productos, experiencias, viajes y Gift Cards.</span>
          </div>
          <div className="beneficios-item">
            <SlPresent className="beneficios-icon" />
            <span>Promociones especiales, cupones de descuento y más.</span>
          </div>
        </div>
      </div>
    </div>
  );
};