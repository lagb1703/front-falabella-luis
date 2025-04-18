import React, { useState } from 'react';

// Datos de servicio
export const TOPICOS = [
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

export const OPCIONES = [
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

export const CONTACTOS = [
  {
    icono: "whatsapp",
    titulo: "Servicio al cliente",
    descripcion: "Peticiones, quejas y reclamos",
    telefono: "+57 601 587 8002",
    horarios: ["Lunes a sábado:", "09:00a.m. a 07:00p.m."],
    textoBoton: "Llamar"
  },
  {
    icono: "whatsapp",
    titulo: "Whatsapp",
    descripcion: "Peticiones, quejas y reclamos",
    telefono: "+57 1 897 7776",
    horarios: ["Lunes a sábado:", "09:00a.m. a 07:00p.m."],
    textoBoton: "Contactar"
  },
  {
    icono: "whatsapp",
    titulo: "Comprar por WhatsApp",
    descripcion: "",
    telefono: "+57 301 638 4422",
    horarios: [
      "Lunes a sábado:", 
      "08:00a.m. a 08:30p.m.", 
      "Domingos y festivos", 
      "08:00a.m. a 07:30p.m."
    ],
    textoBoton: "Comprar"
  },
  {
    icono: "whatsapp",
    titulo: "Club de Novios, Bebé o Deco",
    descripcion: "",
    telefono: "+57 301 633 4422",
    horarios: ["Lunes a domingos", "10:00a.m. a 05:00p.m."],
    textoBoton: "Llamar"
  }
];

export const REDES_SOCIALES = [
  {
    nombre: "instagram",
    url: "#"
  },
  {
    nombre: "facebook",
    url: "#"
  }
];

// Hook personalizado para la lógica del componente
export const useCentroAyuda = () => {
  const [topicoActivo, setTopicoActivo] = useState(null);
  const [opcionActiva, setOpcionActiva] = useState(null);

  const toggleOpcion = (index) => {
    setOpcionActiva(opcionActiva === index ? null : index);
  };

  return {
    topicoActivo,
    setTopicoActivo,
    opcionActiva,
    toggleOpcion
  };
};