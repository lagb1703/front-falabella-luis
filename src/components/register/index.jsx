import './registro.css';
import { FiEyeOff, FiEye } from 'react-icons/fi';
import { AiOutlineBell, AiOutlineFileText, AiOutlineStar, AiOutlineCreditCard } from "react-icons/ai";
import { SlPresent } from "react-icons/sl";
import { 
  useFormData, 
  usePostUserAccount, 
  useVisibilityPassword 
} from './registro.service';

export default function Registro() {
  const { formData, handleInputChange } = useFormData();
  const {
    isChecked1, 
    isChecked2, 
    handleSubmit, 
    handleCheckbox1Change, 
    handleCheckbox2Change
  } = usePostUserAccount(formData);
  const {
    showPassword, 
    togglePasswordVisibility
  } = useVisibilityPassword();
  
  const password = formData.contrasena || '';
  
  // Validaciones de contraseña
  const validLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasNoSpaces = !/\s/.test(password);
  const hasNoSpecialChars = !/[\\¡¿"ºª·`´çñÑ]/.test(password);
  
  const isPasswordValid = validLength && hasUpperCase && hasLowerCase && 
                         hasNumber && hasNoSpaces && hasNoSpecialChars;

  // Validación para el botón
  const isButtonActive = isChecked2 && isPasswordValid && formData.celular?.length === 10;

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
              {formData.correo?.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo) && (
                <span style={{ color: 'red', fontSize: '12px' }}>Ingresa un correo válido.</span>
              )}
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
              {formData.nombres?.length > 0 && /[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/.test(formData.nombres) && (
                <span style={{ color: 'red', fontSize: '12px' }}>Ingresa un nombre sin símbolos ni caracteres especiales.</span>
              )}
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
              {formData.apellidos?.length > 0 && /[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/.test(formData.apellidos) && (
                <span style={{ color: 'red', fontSize: '12px' }}>Ingresa apellidos sin símbolos ni caracteres especiales.</span>
              )}
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
              {formData.identificador?.length > 0 && !/^\d+$/.test(formData.identificador) && (
                <span style={{ color: 'red', fontSize: '12px' }}>Ingresa un Carnet de Extranjería válido</span>
              )}
            </div>

            <div className="input-box">
              <label>Celular</label>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ marginRight: '5px' }}>+57</span>
                <input
                  type="tel"
                  name="celular"
                  placeholder="Ingresa tu número de celular"
                  value={formData.celular}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                    handleInputChange({
                      target: {
                        name: 'celular',
                        value: value
                      }
                    });
                  }}
                  style={{ flex: 1 }}
                  pattern="[0-9]{10}"
                  required
                />
              </div>
              {formData.celular?.length > 0 && formData.celular?.length < 10 && (
                <span style={{ color: 'red', fontSize: '12px' }}>Ingresa número de celular válido</span>
              )}
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
              {formData.contrasena?.length === 0 && (
                <span style={{ color: 'red', fontSize: '12px' }}>Recuerda ingresar una contraseña.</span>
              )}

              <ul className="password-rules">
                <li className={validLength ? "valid" : ""}>Min. 8 caracteres</li>
                <li className={hasUpperCase ? "valid" : ""}>1 mayúscula</li>
                <li className={hasLowerCase ? "valid" : ""}>1 minúscula</li>
                <li className={hasNumber ? "valid" : ""}>1 número</li>
                <li className={hasNoSpaces ? "valid" : ""}>Sin espacios</li>
                <li className={hasNoSpecialChars ? "valid" : ""}>Sin caracteres especiales</li>
              </ul>
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

            <div className="button-container">
              <button 
                type="submit" 
                className={`register-button ${isButtonActive ? 'active' : ''}`}
                disabled={!isButtonActive}
              >
                Registrarse
              </button>
            </div>
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
}