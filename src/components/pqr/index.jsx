import React, { useState } from 'react';
import { PiGreaterThanLight } from "react-icons/pi";
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
    </div>
  );
};

export default CentroAyuda;