import falabellaLetrasSVG from "./../../assets/icons/logo-falabella-letras.svg"
import falabellaMiniSVG from "./../../assets/icons/logo-falabella-mini.svg"
import homeCenterLetrasSVG from "./../../assets/icons/logo-homecenter-letras.svg"
import homeCenterMiniSVG from "./../../assets/icons/logo-homecenter-mini.svg"
import linioLetrasSVG from "./../../assets/icons/logo-linio-letras.svg"
import linioMiniSVG from "./../../assets/icons/logo-linio-mini.svg"
import falabellaLogo from "./../../assets/falabellacom.svg"
import { Link as LinkRouter } from "react-router"
import { BsCart3 } from "react-icons/bs";
import { FaRegCircle } from "react-icons/fa";
import {
    Box,
    Flex,
    Input,
    InputGroup,
    InputRightElement,
    IconButton,
    Image,
    Text,
    Button,
    Link,
    Badge,
    useDisclosure,
    useBreakpointValue,
    Grid,
    GridItem,
    Menu as MenuChakra,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    MenuGroup
} from "@chakra-ui/react"
import {
    Menu,
    SearchIcon,
    Heart,
    ChevronDown,
    MapPin
} from "lucide-react"
import { useShoppingCartNumberItems } from "./Header.service"
import { v4 as uuid } from "uuid";
import { LoginForm } from "../LoginForm/Index";
import { useState } from "react";

export default function Header() {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const isMobile = useBreakpointValue({ base: true, md: false })
    return (
        <Box
            as="header"
            width="100%"
            boxShadow="sm"
            bg="white" >
            <Flex
                as="section"
                width={{ base: "100%", md: "300px" }}
                borderBottom="1px solid"
                borderColor="gray.200">
                <Link
                    href="#"
                    flexBasis={{ base: "33.33%", md: "100px" }}
                    backgroundColor="neutral.200"
                    borderColor="neutral.200"
                    maxHeight="27px"
                    borderRight="1px"
                    borderRightColor="#eee"
                    borderBottom="2px"
                    borderBottomColor="primary.500"
                    py={{ base: "3px", md: 0 }}
                    px="0.9rem">
                    <Image
                        src={(isMobile) ? falabellaMiniSVG : falabellaLetrasSVG}
                        alt="Falabella"
                        height="100%"
                        m="auto" />
                </Link>
                <Link
                    href="https://homecenter.falabella.com.co/homecenter-co"
                    flexBasis={{ base: "33.33%", md: "100px" }}
                    maxHeight="27px"
                    borderRight="1px"
                    borderRightColor="#eee"
                    py={{ base: "4px", md: 0 }}
                    px="0.5rem">
                    <Image
                        src={(isMobile) ? homeCenterMiniSVG : homeCenterLetrasSVG}
                        alt="Falabella"
                        height="100%"
                        m="auto" />
                </Link>
                <Link
                    href="https://linio.falabella.com.co/linio-co"
                    flexBasis={{ base: "33.33%", md: "100px" }}
                    maxHeight="27px"
                    borderRight="1px"
                    borderRightColor="#eee"
                    py={{ base: "5px", md: "2px" }}
                    px="0.9rem">
                    <Image
                        src={(isMobile) ? linioMiniSVG : linioLetrasSVG}
                        alt="Falabella"
                        height="100%"
                        mx="auto" />
                </Link>
            </Flex>
            <Grid
                as="section"
                justifyContent="center"
                alignItems="center"
                px={{ base: "2", md: "9" }}
                height={{ base: "fit-content", md: "52px" }}
                bgColor="background"
                wrap="wrap"
                width="100%"
                templateColumns="repeat(48, 1fr)"
                templateRows={{ base: "repeat(2, 1fr)", md: "repeat(1, 1fr)" }}
                gap="1"
                borderBottom="1px solid"
                borderTop="1px solid"
                borderColor="gray.200">
                {isMobile ? (
                    <GridItem colSpan={1}>
                        <IconButton aria-label="Menu" icon={<Menu />} variant="ghost" mr={2} onClick={onOpen} />
                    </GridItem>
                ) : null}
                <GridItem colSpan={6}>
                    <LinkRouter
                        className="min-w-[100px] w-[149px] max-w-[100%] h-full flex justify-center items-center px"
                        href="/">
                        <Image
                            src={falabellaLogo}
                            alt="Falabella"
                            fallbackSrc={falabellaLetrasSVG}
                        />
                    </LinkRouter>
                </GridItem>
                {!isMobile && (
                    <GridItem
                        pt="3"
                        colStart={9}
                        colSpan={1}>
                        <Button
                            leftIcon={<Menu />}
                            color="#343E49"
                            variant="link"
                            ml={4}>
                            Menú
                        </Button>
                    </GridItem>
                )}
                <GridItem
                    colStart={{ base: 1, md: 11 }}
                    rowStart={{ base: 2, md: 1 }}
                    colSpan={{ base: 48, md: 25 }}>
                    <InputGroup
                        size="md">
                        <Input
                            bg="white"
                            placeholder="Buscar en falabella.com"
                            borderRadius="full"
                            borderColor="black"
                        />
                        <InputRightElement>
                            <Box
                                width="100%"
                                height="100%">
                                <IconButton
                                    aria-label="Search"
                                    icon={
                                        <SearchIcon
                                            width="20px"
                                            height="20px" />
                                    }
                                    borderRadius="full"
                                    bg="#343e49"
                                    color="white"
                                />
                            </Box>
                        </InputRightElement>
                    </InputGroup>
                </GridItem>
                <AccountBarMenu />
            </Grid>
            <Flex
                direction="row"
                justifyContent="space-between"
                width="100%"
                px="9"
                py="1.5">
                <UserCity />
                <HelpBarMenu isMobile={isMobile} />
            </Flex>
        </Box>
    )
}

function UserCity() {
    const [getCity, setcity] = useState("Viterbo");
    return (
        <Box>
            <Button
                leftIcon={
                    <MapPin
                        width="15"
                        height="15"
                        strokeWidth="2" />
                }
                variant="link"
                color="#495867"
                fontSize="11px"
                _hover={{ textDecoration: "none" }}
                lineHeight="22px">
                <Text
                    fontWeight="100"
                    as="p">
                    Entrega en&nbsp;
                    <Text
                        as="b"
                        fontWeight="700">
                        {getCity}
                    </Text>
                </Text>
            </Button>
        </Box>
    );
}

function HelpBarMenu({ isMobile }) {
    if (isMobile)
        return (
            <>
            </>
        );
    return (
        <Flex
            direction="row"
            justifyContent="center"
            alignItems="center"
            fontSize="10px"
            gap="10px">
            <Link
                color="#495867"
                _hover={{ textDecoration: "none" }}>
                Vende Falabella.com
            </Link>
            <Button
                variant="link"
                fontWeight="normal"
                color="#495867"
                fontSize="10px"
                rightIcon={
                    <ChevronDown
                        width="10px"
                        height="10px"
                        className="ml-[-5px]" />
                }
                _hover={{ textDecoration: "none" }}>
                Tarjetas y cuentas
            </Button>
            <Link
                color="#495867"
                _hover={{ textDecoration: "none" }}>
                Novios
            </Link>
            <Button
                variant="link"
                fontWeight="normal"
                color="#495867"
                fontSize="10px"
                rightIcon={
                    <ChevronDown
                        width="10px"
                        height="10px"
                        className="ml-[-5px]" />
                }
                _hover={{ textDecoration: "none" }}>
                Ayuda
            </Button>
        </Flex>
    )
}

function AccountBarMenu({ isMobile }) {
    const cartCount = useShoppingCartNumberItems();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ showLoginForm, setShowLoginForm ] = useState(false); // estado para mostrar el formulario de inicio de sesión
    const userLinks = [
        {
            name: "Inicia sesión",
            href: "/",
            description: null,
            callback: () => {
                console.log("Galvis Prieto")
                setShowLoginForm(true);
            } 
        },
        {
            name: "Regístrate",
            href: "/",
            description: null
        },
        {
            name: "Mi cuenta",
            href: "/",
            description: "Accede tus compras, tu perfil y más."
            }
    ];
    if (isMobile)
        return (
            <GridItem
                colStart={41}
                colEnd={48}>
                <Flex
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    gap="5">
                    <Button
                        textAlign="center"
                        height="100%"
                        color="text.400"
                        variant="link"
                        lineHeight="0"
                        fontWeight="600"
                        fontSize="13px"
                        mt="-1px"
                        textDecorationLine="underline">
                        Inicia sesión
                    </Button>
                    <Box
                        width="100%"
                        height="100%">
                        <Box
                            position="relative"
                            width="fit-content">
                            <IconButton
                                aria-label="Shopping cart"
                                fontSize="2xl"
                                icon={<BsCart3 />}
                                variant="ghost" />
                            <Badge
                                position="absolute"
                                top="3px"
                                right="3px"
                                borderRadius="full"
                                bg="gray.800"
                                color="white"
                                fontSize="3xs"
                                width="13px"
                                height="13px"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                            >
                                {cartCount}
                            </Badge>
                        </Box>
                    </Box>
                </Flex>
            </GridItem>
        );
    return (
        <GridItem
            colStart={37}
            colEnd={48}>
            <Flex>
                <Box
                    py="1"
                    onMouseEnter={onOpen}
                    onMouseLeave={onClose}
                    cursor="pointer">
                    <Flex
                        borderRight="1px"
                        borderColor="gray.400"
                        direction="column"
                        lineHeight="16px"
                        fontFamily="Lato,sans-serif"
                        py="1"
                        pr="2"
                        height="100%">
                        <Text
                            as="span"
                            fontSize="13px"
                            fontWeight="600"
                            letterSpacing="0">
                            Hola,<br />
                        </Text>
                        <MenuChakra
                            closeOnSelect={true}
                            isLazy
                            isOpen={isOpen}
                            placement="top">
                            <MenuButton
                                width="100%"
                                textAlign="center"
                                height="100%"
                                color="text.400"
                                variant="link"
                                fontWeight="600"
                                fontSize="13px"
                                _hover={{ textStyle: "none" }}>
                                <Flex
                                    width="100%"
                                    direction="row">
                                    Inicia sesión
                                    <ChevronDown
                                        width="10px"
                                        height="10px"
                                        className="mt-[4px]"
                                    />
                                </Flex>
                            </MenuButton>
                            <MenuList
                                onMouseEnter={onOpen}
                                onMouseLeave={onClose}
                                p="1rem">
{/* 
                                <MenuGroup>
                                    {userLinks.map((item) => {
                                        return (
                                            <MenuItem key={uuid()}>

                                                

                                                <LinkRouter
                                                    href={item.href}>
                                                    <Text
                                                        as="p"
                                                        fontWeight="550"
                                                        color="#495867"
                                                        fontSize="10px">
                                                        {item.name}
                                                    </Text>
                                                    {
                                                        item.description &&
                                                        <Text
                                                            as="span"
                                                            fontWeight="400"
                                                            color="#495867"
                                                            fontSize="10px">
                                                            {item.description}
                                                        </Text>
                                                    }
                                                </LinkRouter>
                                            </MenuItem>
                                        );
                                    })}
                                </MenuGroup> */}
                                
                                <MenuGroup>
                                    {userLinks.map((item) => {
                                        return (
                                            <MenuItem key={uuid()}>
                                                {item.callback ? (
                                                    // Si hay callback, usamos un botón que lo ejecute
                                                    <div 
                                                        onClick={() => item.callback()}
                                                        style={{ cursor: 'pointer' }}
                                                    >
                                                        <Text
                                                            as="p"
                                                            fontWeight="550"
                                                            color="#495867"
                                                            fontSize="10px">
                                                            {item.name}
                                                        </Text>
                                                        {
                                                            item.description &&
                                                            <Text
                                                                as="span"
                                                                fontWeight="400"
                                                                color="#495867"
                                                                fontSize="10px">
                                                                {item.description}
                                                            </Text>
                                                        }
                                                    </div>
                                                ) : (
                                                    // Si no hay callback, usamos el LinkRouter normal
                                                    <LinkRouter href={item.href}>
                                                        <Text
                                                            as="p"
                                                            fontWeight="550"
                                                            color="#495867"
                                                            fontSize="10px">
                                                            {item.name}
                                                        </Text>
                                                        {
                                                            item.description &&
                                                            <Text
                                                                as="span"
                                                                fontWeight="400"
                                                                color="#495867"
                                                                fontSize="10px">
                                                                {item.description}
                                                            </Text>
                                                        }
                                                    </LinkRouter>
                                                )}
                                            </MenuItem>
                                        );
                                    })}
                                </MenuGroup>

                                {showLoginForm && (
                                <LoginForm onClose={() => setShowLoginForm(false)} />
                                )}

                                <MenuDivider />
                                <MenuGroup>
                                    <MenuItem
                                        icon={<FaRegCircle />}>
                                        <LinkRouter href="">
                                            <Text
                                                as="p"
                                                fontWeight="550"
                                                color="#495867"
                                                fontSize="10px">
                                                CMR Puntos
                                            </Text>
                                        </LinkRouter>
                                    </MenuItem>
                                </MenuGroup> 
                            </MenuList>
                        </MenuChakra>
                    </Flex>
                </Box>
                <Box
                    py="3px">
                    <Box
                        height="100%"
                        borderRight="1px"
                        lineHeight="15px"
                        borderColor="gray.400"
                        px="2.5">
                        <LinkRouter
                            className="h-full flex flex-col justify-center">
                            Mis
                            <Text
                                as="b"
                                fontSize="14px">
                                compras
                            </Text>
                        </LinkRouter>
                    </Box>
                </Box>
                <Box
                    py="3px">
                    <Flex
                        height="100%"
                        borderRight="1px"
                        justifyContent="center"
                        alignItems="center"
                        borderColor="gray.400"
                        px="2">
                        <Heart
                            color="#343E49" />
                    </Flex>
                </Box>
                <Box
                    py="3px">
                    <Box
                        position="relative">
                        <IconButton
                            aria-label="Shopping cart"
                            fontSize="2xl"
                            icon={<BsCart3 />}
                            variant="ghost" />
                        <Badge
                            position="absolute"
                            top="-5px"
                            right="-5px"
                            borderRadius="full"
                            bg="gray.800"
                            color="white"
                            fontSize="xs"
                            width="20px"
                            height="20px"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            {cartCount}
                        </Badge>
                    </Box>
                </Box>
            </Flex>
        </GridItem>
    );
}