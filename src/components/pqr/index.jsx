import React, { useState } from 'react';
import { PiGreaterThanLight } from "react-icons/pi";
import { FaWhatsapp,FaInstagram, FaFacebookF } from "react-icons/fa";
import './pqr.css';

const CentroAyuda = () => {
  const [topicoActivo, setTopicoActivo] = useState(null);
  const [opcionActiva, setOpcionActiva] = useState(null);

  const topicos = [
    {
      titulo: "Tus pedidos",
      descripcion: "Cómo administrar y hacer seguimiento de tus pedidos con envío a domicilio o retiro en un punto."
    },
    {
      titulo: "Devoluciones",
      descripcion: "Cambiar de opinión está bien. Revisa los pasos para tener una devolución exitosa."
    },
    {
      titulo: "Plazos de reembolsos",
      descripcion: "Conoce en cuánto tiempo recibirás el dinero en tu cuenta según el medio de pago utilizado en la compra."
    }
  ];

  const opciones = [
    {
      titulo: "Devoluciones, cancelaciones y reembolsos",
      subtemas: [
        "Devoluciones",
        "Cancelaciones",
        "Plazos de reembolsos y medios de pago"
      ]
    },
    {
      titulo: "Derecho de retracto y garantías",
      subtemas: [
        "Derecho de retracto",
        "Satisfacción garantizada",
        "Garantía legal y servicios técnicos",
        "Garantía extendida"
      ]
    },
    {
      titulo: "Pedidos, facturas y Mi cuenta",
      subtemas: [
        "Pedidos y tipos de entrega",
        "Facturas y otros documentos",
        "Mi cuenta"
      ]
    },
    {
      titulo: "Tiendas y puntos de retiro",
      subtemas: [
        "Horarios de tiendas",
        "Puntos de retiro"
      ]
    },
    {
      titulo: "Otros",
      subtemas: [
        "Evaluar productos",
        "Programa CMR Puntos y tarjeta CMR",
        "Cupones productos Falabella"
      ]
    }
  ];

  const toggleOpcion = (index) => {
    setOpcionActiva(opcionActiva === index ? null : index);
  };

  return (
    <div className="contenedor-centro-ayuda">
      <h1 className="titulo-principal">¿En qué te ayudamos? Revisa los temas más preguntados</h1>
      
      <div className="contenedor-topicos">
        {topicos.map((topico, index) => (
          <div 
            key={index}
            className={`tarjeta-topico ${topicoActivo === index ? 'activa' : ''}`}
            onClick={() => setTopicoActivo(index)}
          >
            <h3>{topico.titulo}</h3>
            <p>{topico.descripcion}</p>
          </div>
        ))}
      </div>
      
      <div className="contenedor-opciones">
        {opciones.map((opcion, index) => (
          <div 
            key={index} 
            className={`tarjeta-opcion ${opcionActiva === index ? 'activa' : ''}`}
          >
            <div 
              className="encabezado-opcion"
              onClick={() => toggleOpcion(index)}
            >
              <h2>{opcion.titulo}</h2>
              <PiGreaterThanLight className={`flecha ${opcionActiva === index ? 'abierta' : ''}`} />
            </div>
            
            {opcionActiva === index && (
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
        ))}
      </div>
      {/* Sección de Contáctanos */}
      <div className="seccion-contactanos">
        <h2 className="titulo-contactanos">Contáctanos</h2>
        
        <div className="contenedor-principal-contactos">
          <div className="contenedor-contactos">
            <div className="contacto-item">
              <FaWhatsapp className="icono-contacto" />
              <h3>Servicio al cliente</h3>
              <p>Peticiones, quejas y reclamos</p>
              <p className="telefono">+57 601 587 8002</p>
              <p>Lunes a sábado:</p>
              <p>09:00a.m. a 07:00p.m.</p>
              <button className="boton-llamar">Llamar</button>
            </div>
            
            <div className="contacto-item">
              <FaWhatsapp className="icono-contacto" />
              <h3>Whatsapp</h3>
              <p>Peticiones, quejas y reclamos</p>
              <p className="telefono">+57 1 897 7776</p>
              <p>Lunes a sábado:</p>
              <p>09:00a.m. a 07:00p.m.</p>
              <button className="boton-llamar">Contactar</button>
            </div>
            
            <div className="contacto-item">
              <FaWhatsapp className="icono-contacto" />
              <h3>Comprar por WhatsApp</h3>
              <p className="telefono">+57 301 638 4422</p>
              <p>Lunes a sábado:</p>
              <p>08:00a.m. a 08:30p.m.</p>
              <p>Domingos y festivos</p>
              <p>08:00a.m. a 07:30p.m.</p>
              <button className="boton-llamar">Comprar</button>
            </div>
            
            <div className="contacto-item">
              <FaWhatsapp className="icono-contacto" />
              <h3>Club de Novios, Bebé o Deco</h3>
              <p className="telefono">+57 301 633 4422</p>
              <p>Lunes a domingos</p>
              <p>10:00a.m. a 05:00p.m.</p>
              <button className="boton-llamar">Llamar</button>
            </div>
          </div>
        </div>
        
        <div className="footer-redes">
          <h3 className="titulo-redes">Síguenos en nuestras redes</h3>
          <div className="contenedor-iconos-redes">
            <a href="#" className="boton-redes instagram">
              <FaInstagram className="icono-red" />
            </a>
            <a href="#" className="boton-redes facebook">
              <FaFacebookF className="icono-red" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CentroAyuda;