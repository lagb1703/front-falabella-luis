import { useState } from "react";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { 
  useLogin, 
  useLoginClose 
} from "./loginForm.service";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Image,
  Box,
  Button,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  Link
} from '@chakra-ui/react'
import {Link as RouterLink} from 'react-router'


export default function LoginForm({ isOpen, onClose }) {
  useLoginClose(isOpen, onClose);
  const [showPassword, setShowPassword] = useState(false);
  const [correo, setEmail] = useState("");
  const [contrasena, setPassword] = useState("");

  const { login, isLoading, error } = useLogin();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Llama a la función login del servicio
      const response = await login(correo, contrasena);
      console.log("Inicio de sesión exitoso:", response);

      // Aquí puedes redirigir al usuario o guardar el token en localStorage
      // Por ejemplo:
      // localStorage.setItem("token", response.token);
      // window.location.href = "/dashboard";
    } catch (error) {
      console.error("Error durante el inicio de sesión:", error);
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size="sm">
      <ModalOverlay />
      <ModalContent
        pt="37px"
        pb="34px"
        pl="50px"
        pr="50px">
        <ModalHeader
          p="0"
        >
          <Box
            width="100%"
            height="100%"
            pb="20px"
            mb="20px"
            borderBottom="1px solid #f1f1f1">
            <ModalCloseButton
              color="#868686" />
            <Box
              width="93.5px">
              <Image
                src="https://images.contentstack.io/v3/assets/blt7c5c2f2f888a7cc3/blt9a6cb2faab703fa5/65a68ebb130790558acbf0cb/falabella.com_green_icon.svg"
                alt="logo de falabella"
              />
            </Box>
          </Box>
          <Text
            as="h3"
            color="#333"
            fontSize="19px"
            fontWeight="400"
            lineHeight="29px">
            Inicia sesión para comprar
          </Text>
        </ModalHeader>
        <ModalBody
          as="form"
          p="0"
          onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}

          <InputGroup
            width="100%"
            height="50px"
            margin="15px 0"
            display="flex"
            flexDirection="column">
            <Text
              as="label"
              color="#333"
              lineHeight="17px"
              fontSize="10px"
              htmlFor="email">Correo Electrónico</Text>
            <Input
              id="email"
              type="text"
              width="100%"
              height="100%"
              background="transparent"
              borderRadius="none"
              border="none"
              outline="none"
              borderBottom="1px solid #767676"
              color="#767676"
              pl="0px"
              pr="0px"
              pb="5px"
              pt="14px"
              placeholder="Ingresa tu correo electrónico"
              _placeholder={{ color: "#767676" }}
              _hover={{ background: "none", borderBottom: "1px solid #767676" }}
              value={correo}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup
            width="100%"
            height="50px"
            margin="15px 0"
            display="flex"
            flexDirection="column">
            <Text
              as="label"
              color="#333"
              lineHeight="17px"
              fontSize="10px"
              htmlFor="password">Contraseña</Text>
            <Input
              id="password"
              width="100%"
              height="100%"
              background="transparent"
              borderRadius="none"
              border="none"
              outline="none"
              borderBottom="1px solid #767676"
              color="#767676"
              pl="0px"
              pr="0px"
              pb="5px"
              pt="14px"
              _placeholder={{ color: "#767676" }}
              _hover={{ background: "none", borderBottom: "1px solid #767676" }}
              type={showPassword ? "text" : "password"}
              placeholder="Ingresa tu contraseña"
              value={contrasena}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <InputRightElement
              onClick={togglePasswordVisibility}
              display="flex"
              alignItems="center"
              justifyContent="center"
              top="40%"
              fontSize="16px"
              color="#868686">
              {showPassword ? <FiEye /> : <FiEyeOff />}
            </InputRightElement>
          </InputGroup>
          <Box 
            as="div"
            display="flex"
            alignItems="left">
            <Text
              textAlign= "left"
              color="#767676"
              lineHeight="17px"
              fontSize="10px">
              ¿Olvidaste tu contraseña? No te preocupes, pide un código verificador por&nbsp;
              <Link
                as={RouterLink}
                to="/recover/email"
                borderBottom="1px solid #495867"
                color="#495867">
                correo
              </Link>
              &nbsp;o&nbsp;
              <Link
                as={RouterLink}
                to="/recover/email"
                borderBottom="1px solid #495867"
                color="#495867">
                SMS
              </Link>
              &nbsp;para cambiar tu contraseña.
            </Text>
          </Box>
          <Box
            borderRadius="40px"
            fontSize="16px"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            pt="10px">
            <Button 
              variant="solid" 
              disabled={isLoading}
              borderRadius="23px"
              fontWeight="400"
              lineHeight="23px"
              height="45px"
              width="100%"
              fontSize="16px">
              {isLoading ? "Cargando..." : "Ingresar"}
            </Button>
            <Text
              as="p"
              textAlign= "left"
              color="#767676"
              lineHeight="17px"
              fontSize="10px"
              mt="20px">
              ¿Aún no tienes cuenta?&nbsp;
              <Link
                as={RouterLink}
                to="/registration"
                borderBottom="1px solid #495867"
                color="#495867">
                Regístrate
              </Link>
            </Text>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};