import {
    Box,
    Text,
    Tooltip,
    Image,
    Flex,
    Icon,
    Input,
    InputGroup,
    InputRightElement,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    ModalFooter
} from "@chakra-ui/react";
import {
    X
} from "lucide-react";
import {
    FaCircleInfo
} from "react-icons/fa6";
import {
    GoPencil
} from "react-icons/go";
import {
    useGetInputPersonalInformation,
    useGetPersonalInformation,
    useValidateValue,
    useOpenChangeNumberModal,
    useChangeUserInformation
} from "./personalInformation.service"

export default function PersonalInformation() {
    const inputPersonalInformation = useGetInputPersonalInformation();
    const personalInformation = useGetPersonalInformation();
    const handleChange = useChangeUserInformation();
    const {
        isOpen,
        onOpen,
        onClose
    } = useOpenChangeNumberModal();
    return (
        <>
            <Flex
                as="form"
                width="100%"
                h="fit-content"
                direction="column">
                <Flex
                    width="100%"
                    direction="column"
                    flexWrap="wrap"
                    mb="12px"
                    pt={{ base: "0", md: "20px" }}
                    pl="20px"
                    pr="20px"
                    pb="20px"
                    bg="#fff"
                >
                    <Box
                        mb="12px">
                        <Text
                            as="h1"
                            fontSize="1.2rem"
                            fontWeight="400"
                            color="#333">Datos Personales</Text>
                    </Box>
                    <Flex
                        flexWrap="wrap"
                        flexDirection="row"
                        justifyContent="space-between"
                        alignItems="stretch"
                        marginBottom="16px"
                        marginTop="16px"
                    >

                        {
                            inputPersonalInformation.map((item) => {
                                const {
                                    isValid,
                                    getValue,
                                    handleChange,
                                    handleCloseButtom
                                } = useValidateValue(
                                    item.regex,
                                    personalInformation,
                                    item.defaultValueName
                                )
                                return (
                                    <Flex
                                        key={item.id}
                                        direction="column"
                                        flexBasis={{ base: "100%", lg: "250px" }}>
                                        <Text
                                            as="label"
                                            fontWeight="400"
                                            fontSize="0.8rem"
                                            color="#333"
                                            htmlFor="userName">
                                            {item.label}
                                        </Text>
                                        <InputGroup>
                                            <Input
                                                id={item.id}
                                                value={getValue}
                                                onChange={handleChange}
                                                width="100%"
                                                height="100%"
                                                background="transparent"
                                                borderRadius="none"
                                                border="none"
                                                outline="none"
                                                borderBottom={isValid ? "1px solid #767676" : "1px solid #e4022d"}
                                                color="#333"
                                                pl="0px"
                                                pr="0px"
                                                pb="5px"
                                                pt="14px"
                                                _placeholder={{ color: "#767676" }}
                                                _hover={{ background: "none", borderBottom: "1.5px solid #767676" }}
                                                type="text"
                                                placeholder={item?.placeholder}
                                                required />
                                            <InputRightElement>
                                                {(getValue.length > 0) &&
                                                    <Icon
                                                        as={X}
                                                        onClick={handleCloseButtom}
                                                        cursor="pointer"
                                                        color={isValid ? "#767676" : "#e4022d"} />}
                                            </InputRightElement>
                                        </InputGroup>
                                        {!isValid &&
                                            <Text
                                                as="label"
                                                fontWeight="400"
                                                fontSize="0.7rem"
                                                color="#e4022d"
                                                htmlFor="userName">
                                                {item?.invalidMessage}
                                            </Text>}
                                    </Flex>
                                )
                            })
                        }
                    </Flex>
                    <Flex
                        flexWrap="wrap"
                        flexDirection="row"
                        justifyContent="space-between"
                        alignItems="stretch"
                        marginBottom="16px"
                        marginTop="16px">
                        <Flex
                            flexBasis={{ base: "100%", lg: "250px" }}
                            direction="column">
                            <Text
                                fontWeight="400"
                                color="#333"
                                fontSize="0.8rem">
                                Tipo de documento
                            </Text>
                            <Text
                                mt="9px"
                                fontWeight="400"
                                color="#888"
                                fontSize="0.8rem">
                                CC
                                &nbsp;
                                {personalInformation ? personalInformation["identificador"] : ""}
                            </Text>
                        </Flex>
                        <Flex
                            flexBasis={{ base: "100%", lg: "250px" }}
                            direction="column">
                            <Text
                                fontWeight="400"
                                color="#333"
                                fontSize="0.8rem">
                                Celular
                            </Text>
                            <Flex
                                direction="row"
                                justifyContent="space-between">
                                <Text
                                    mt="9px"
                                    fontWeight="400"
                                    color="#888"
                                    fontSize="0.8rem">
                                    +57
                                    &nbsp;
                                    {personalInformation ? personalInformation["celular"] : ""}
                                </Text>
                                <Box
                                    w="35px"
                                    cursor="pointer"
                                    onClick={onOpen}
                                    h="36px">
                                    <Image
                                        src="https://images.falabella.com/v3/assets/blt7c5c2f2f888a7cc3/bltf750db3019ac2ef8/64d4daba52b8b24ba0efa811/edit-phone-icon-10-8-2023.svg"
                                        alt="button phone edith" />
                                </Box>
                            </Flex>
                        </Flex>
                        <Flex
                            flexBasis={{ base: "100%", lg: "250px" }}
                            direction="column">
                            <Text
                                fontWeight="400"
                                color="#333"
                                fontSize="0.8rem">
                                Correo electrónico
                            </Text>
                            <Flex
                                mt="9px"
                                direction="row"
                                justifyContent="space-between">
                                <Text
                                    fontWeight="400"
                                    color="#888"
                                    fontSize="0.8rem">
                                    {personalInformation ? personalInformation["correo"] : ""}
                                </Text>
                                <Tooltip
                                    hasArrow
                                    label='Por tu seguridad, no es posible editar tu correo electrónico.'
                                    bg='#FFFFFF'
                                    placement="top"
                                    w="100px"
                                    color='black'>
                                    <Icon
                                        cursor="pointer"
                                        color="#888888"
                                        as={FaCircleInfo} />
                                </Tooltip>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex
                    flexWrap="wrap"
                    justifyContent="center"
                    alignItems="center"
                    mb="12px"
                    pt="20px"
                    pl="20px"
                    pr="20px"
                    pb="20px"
                    bg="#fff"
                >
                    <Button
                        onClick={handleChange}
                        borderRadius="55px"
                        fontWeight="700"
                        height="40px"
                        flexBasis="160px"
                        _hover={{}}
                        fontSize="1rem">
                        Guardar
                    </Button>
                </Flex>
            </Flex>
            <ChangePhoneNumber isOpen={isOpen} onClose={onClose} />
        </>
    )
}

function ChangePhoneNumber({ isOpen, onClose }) {
    const isValid = true;
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <Flex
                        direction="row"
                        flexFlow="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        pb="20px"
                    >
                        <Image
                            src="https://images.falabella.com/v3/assets/blt7c5c2f2f888a7cc3/blt1f24ad66fd3f9fa0/64d4d95e1b474afe95a4c9ec/phone-number-edit-simple-10-08-2023.svg" />
                        <Text
                            as="span"
                            fontSize="24px"
                            fontStyle="normal"
                            fontWeight="400"
                            lineHeight="32px"
                            ml="20px"
                            pb="24px"
                            pt="24px"
                        >
                            Editar celular
                        </Text>
                    </Flex>
                </ModalHeader>
                <ModalCloseButton
                    color="black" />
                <ModalBody>
                    <Text
                        as="span">
                        Para editar tu número de celular necesitamos validar tu identidad. Al continuar, <b>enviaremos un código verificador al correo
                            ran******@gmail.com.</b>
                    </Text>
                    <Flex
                        direction="column"
                        width={{ base: "100%", lg: "300px" }}>
                        <Text
                            as="label"
                            fontWeight="400"
                            fontSize="0.8rem"
                            color="#333"
                            htmlFor="userName">
                            Celular
                        </Text>
                        <InputGroup>
                            <Input
                                id="userName"
                                width="100%"
                                height="100%"
                                background="transparent"
                                borderRadius="none"
                                border="none"
                                outline="none"
                                borderBottom={isValid ? "1px solid #767676" : "1px solid #e4022d"}
                                color="#333"
                                pl="0px"
                                pr="0px"
                                pb="5px"
                                pt="14px"
                                _placeholder={{ color: "#767676" }}
                                _hover={{ background: "none", borderBottom: "1.5px solid #767676" }}
                                type="text"
                                placeholder="Ingresa tu numero de celular"
                                required />
                        </InputGroup>
                        {!isValid &&
                            <Text
                                as="label"
                                fontWeight="400"
                                fontSize="0.7rem"
                                color="#e4022d"
                                htmlFor="userName">
                                Ingresa un número de celular válido
                            </Text>}
                    </Flex>
                </ModalBody>
                <ModalFooter>
                    <Flex
                        direction="row"
                        width="100%"
                        justifyContent="space-between">
                        <Button
                            height="44px"
                            fontSize="1rem"
                            letterSpacing="1px"
                            color="#343E49"
                            bg="#fefeff"
                            borderRadius="55px"
                            fontWeight="400"
                            textAlign="center"
                            width="180px"
                            cursor="pointer"
                        >
                            Cancelar
                        </Button>
                        <Button
                            height="44px"
                            fontSize="1rem"
                            letterSpacing="1px"
                            borderRadius="55px"
                            fontWeight="400"
                            textAlign="center"
                            width="180px"
                            cursor="pointer"
                        >
                            Continuar
                        </Button>
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}