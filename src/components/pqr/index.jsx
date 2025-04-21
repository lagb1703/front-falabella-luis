import React from 'react';
import { PiGreaterThanLight } from "react-icons/pi";
import { FaWhatsapp, FaInstagram, FaFacebookF } from "react-icons/fa";
import { 
  TOPICOS, 
  OPCIONES, 
  CONTACTOS, 
  REDES_SOCIALES, 
  useCentroAyuda 
} from './pqr.service';
import './pqr.css';

// Componentes presentacionales
const TarjetaTopico = ({ topico, activo, onClick }) => (
  <div 
    className={`tarjeta-topico ${activo ? 'activa' : ''}`}
    onClick={onClick}
  >
    <h3>{topico.titulo}</h3>
    <p>{topico.descripcion}</p>
  </div>
);

const TarjetaOpcion = ({ opcion, activa, index, toggleOpcion }) => (
  <div className={`tarjeta-opcion ${activa ? 'activa' : ''}`}>
    <div className="encabezado-opcion" onClick={() => toggleOpcion(index)}>
      <h2>{opcion.titulo}</h2>
      <PiGreaterThanLight className={`flecha ${activa ? 'abierta' : ''}`} />
    </div>
    
    {activa && (
      <div className="contenido-opcion">
        <ul>
          {opcion.subtemas.map((subtema, i) => (
            <React.Fragment key={i}>
              <li>
                <a href="#">{subtema}</a>
              </li>
              {i < opcion.subtemas.length - 1 && <hr className="separador-subtema" />}
            </React.Fragment>
          ))}
        </ul>
      </div>
    )}
  </div>
);

const ContactoItem = ({ contacto }) => {
  const Icono = contacto.icono === "whatsapp" ? FaWhatsapp : null;
  
  return (
    <div className="contacto-item">
      {Icono && <Icono className="icono-contacto" />}
      <h3>{contacto.titulo}</h3>
      {contacto.descripcion && <p>{contacto.descripcion}</p>}
      <p className="telefono">{contacto.telefono}</p>
      {contacto.horarios.map((horario, i) => (
        <p key={i}>{horario}</p>
      ))}
      <button className="boton-llamar">{contacto.textoBoton}</button>
    </div>
  );
};

const RedSocialButton = ({ red }) => {
  const Icono = red.nombre === "instagram" ? FaInstagram : FaFacebookF;
  const claseColor = red.nombre === "instagram" ? "instagram" : "facebook";
  
  return (
    <a href={red.url} className={`boton-redes ${claseColor}`}>
      <Icono className="icono-red" />
    </a>
  );
};

// Componente principal
const CentroAyuda = () => {
  const { 
    topicoActivo, 
    setTopicoActivo, 
    opcionActiva, 
    toggleOpcion 
  } = useCentroAyuda();

  return (
    <div className="contenedor-centro-ayuda">
      <h1 className="titulo-principal">¿En qué te ayudamos? Revisa los temas más preguntados</h1>
      
      <div className="contenedor-topicos">
        {TOPICOS.map((topico, index) => (
          <TarjetaTopico
            key={index}
            topico={topico}
            activo={topicoActivo === index}
            onClick={() => setTopicoActivo(index)}
          />
        ))}
      </div>
      
      <div className="contenedor-opciones">
        {OPCIONES.map((opcion, index) => (
          <TarjetaOpcion
            key={index}
            opcion={opcion}
            activa={opcionActiva === index}
            index={index}
            toggleOpcion={toggleOpcion}
          />
        ))}
      </div>
      
      {/* Sección de Contáctanos */}
      <div className="seccion-contactanos">
        <h2 className="titulo-contactanos">Contáctanos</h2>
        
        <div className="contenedor-principal-contactos">
          <div className="contenedor-contactos">
            {CONTACTOS.map((contacto, index) => (
              <ContactoItem key={index} contacto={contacto} />
            ))}
          </div>
        </div>
        
        <div className="footer-redes">
          <h3 className="titulo-redes">Síguenos en nuestras redes</h3>
          <div className="contenedor-iconos-redes">
            {REDES_SOCIALES.map((red, index) => (
              <RedSocialButton key={index} red={red} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CentroAyuda;