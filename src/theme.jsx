// theme.js
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    background:"#FAFAFA",
    unfocusedBackground:"#EEEEEE",
    gradient: "linear-gradient(90deg, #668F00 0%, #8FCA00 100%)",
    footer:{
      500: "#1e364b",
      600: "#0c2941"
    },
    subfooter:{
      500: "#1e364b",
      600: "#F6F6F6"
    },
    text: {
        200: "#495867",
        300: "#4a4a4a",
        400: "#343E49",
        500:"#212529",
        666: "#525252",
        777: "#515151",
    },
    ofertText: "#e4022d",
    primary: {
      500: "#AAD500", // color principal
      700: "#668F00",
    },
    neutral: {
      200: "#fafafa",
      500: "#7e7e7e",
    },
  },
  fonts: {
    heading: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    body: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    products: {
      title:"Lato",
    },
    footer: {
      p: "Lato, sans-serif"
    }
  },
  styles: {
    global: {
      // Estilos globales para toda la aplicación
      "html, body": {
        backgroundColor: "background",   // Fondo limpio
        color: "text.500",       // Texto oscuro para buen contraste
        fontFamily: "Lato,sans-serif",
        fontSize: "1rem",
        fontWeight: "400",
        lineHeight: "1.5",
        textAlign: "left",
      },
      a: {
        color: "text.700",
        textDecoration: "none",
        _hover: {
          textDecoration: "none"
        }
      },
      button: {
        fontWeight: "bold",
      },
      li: {
        listStyle:"none"
      }
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold",
      },
      variants: {
        solid: {
          bg: "text.400",
          color: "white"
        }
      },
    },
  },
});

export default theme;
