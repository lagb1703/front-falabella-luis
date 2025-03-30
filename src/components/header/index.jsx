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
    MenuGroup,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Stack,
} from "@chakra-ui/react"
import {
    Menu,
    SearchIcon,
    Heart,
    ChevronDown,
    MapPin,
    X
} from "lucide-react"
import { 
    useShoppingCartNumberItems,
    useUserLogin,
    useUserLocationChance,
    defaultUserName,
    defaultUserLocation,
    useGetColombiaStatesMenuOption,
    useItemEvents,
    useAdministrateMenu,
    useGetColombiaCityMenuOption,
    useDeleteInput,
    useGetColombiaNeighborhoodMenuOption,
    saveClick
} from "./header.service"
import { v4 as uuid } from "uuid";
import LoginForm from "../loginForm";
import MenuComponent from "./../menu/";

export default function Header() {
    const isMobile = useBreakpointValue({ base: true, md: false });
    const { isOpen: isOpenMenu, onOpen: onOpenMenu, onClose:onCloseMenu } = useDisclosure();
    return (
        <Box
            as="header"
            width="100%"
            boxShadow="sm"
            bg="white" >
            <Flex
                as="section"
                width={{ base: "100%", md: "4500px" }}
                borderBottom="1px solid"
                borderColor="gray.200">
                <Link
                    href="#"
                    flexBasis={{ base: "33.33%", md: "150px" }}
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
                    flexBasis={{ base: "33.33%", md: "150px" }}
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
                    flexBasis={{ base: "33.33%", md: "150px" }}
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
                        <IconButton aria-label="Menu" icon={<Menu />} variant="ghost" mr={2} onClick={onOpenMenu} />
                    </GridItem>
                ) : null}
                <GridItem colSpan={6}>
                    <LinkRouter
                        className="min-w-[100px] w-[149px] max-w-[100%] h-full flex justify-center items-center px"
                        to="/">
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
                            onClick={onOpenMenu}
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
                <AccountBarMenu isMobile={isMobile}/>
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
            <MenuComponent isOpen={isOpenMenu} onClose={onCloseMenu}/>
        </Box>
    )
}

function UserCity() {
    const {
        getUserState,
        setUserState,
        getUserCity,
        setUserCity,
        getUserNeighborhood,
        setUserNeighborhood,
        isLocationModalOpen,
        onLocationModalClose,
        onLocationModalOpen
    } = useUserLocationChance();
    return (
        <>
            <Box>
                <Button
                    onClick={onLocationModalOpen}
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
                        {(getUserCity != null)?
                        (<>
                            Entrega en&nbsp;
                            <Text
                                as="b"
                                fontWeight="700">
                                {getUserCity.name}
                            </Text>
                        </>)
                        :
                        <>{defaultUserLocation}</>}
                    </Text>
                </Button>
            </Box>
            <PlaceModal 
                isOpen={isLocationModalOpen} 
                onClose={onLocationModalClose}
                setUserState={setUserState}
                setUserCity={setUserCity}
                setUserNeighborhood={setUserNeighborhood}
                getUserState={getUserState}
                getUserNeighborhood={getUserNeighborhood}
                getUserCity={getUserCity}/>
        </>
    );
}

function PlaceModal(
    { 
        isOpen, 
        onClose,
        setUserState,
        getUserState,
        setUserCity,
        getUserCity,
        setUserNeighborhood,
        getUserNeighborhood
     }){
    const {
        isOpen:isDepartamentMenuOpen,
        onOpen: onDepartamentMenuOpen,
        onClose: onDepartamentMenuClose,
        inputRef: inputDepartament
    } = useAdministrateMenu();
    const {
        getItem,
        hover,
        getName:getColombiaStateName,
        change,
        click,
        clickReset
    } = useItemEvents(
        inputDepartament, 
        setUserState,
        {
            isMenuOpen:isDepartamentMenuOpen,
            onMenuOpen:onDepartamentMenuOpen,
            onMenuClose:onDepartamentMenuClose
        }
    );
    const getColombiaStates = useGetColombiaStatesMenuOption(getColombiaStateName);
    const {
        isOpen:isCityMenuOpen,
        onOpen: onCityMenuOpen,
        onClose: onCityMenuClose,
        inputRef: inputCity
    } = useAdministrateMenu(getUserCity);
    const {
        getItem: getCityItem,
        setItem: setCityItem,
        setName: setCityName,
        hover: cityHover,
        getName:getColombiaCityName,
        change: cityChange,
        click: cityClick,
        clickReset: cityClickReset
    } = useItemEvents(
        inputCity, 
        setUserCity,
        {
            isMenuOpen:isCityMenuOpen,
            onMenuOpen:onCityMenuOpen,
            onMenuClose:onCityMenuClose
        }
    );
    useDeleteInput(getItem, inputCity, setCityItem, setCityName);
    const getColombiaCities = useGetColombiaCityMenuOption(getItem, getColombiaCityName);
    const {
        isOpen:isNeighborhoodMenuOpen,
        onOpen: onNeighborhoodMenuOpen,
        onClose: onNeighborhoodMenuClose,
        inputRef: inputNeighborhood
    } = useAdministrateMenu();
    const {
        getItem: getNeighborhoodItem,
        setItem: setNeighborhoodItem,
        setName: setNeighborhoodName,
        hover: neighborhoodHover,
        getName:getColombiaNeighborhoodName,
        change: neighborhoodChange,
        click: neighborhoodClick,
        clickReset: neighborhoodClickReset
    } = useItemEvents(
        inputNeighborhood, 
        setUserNeighborhood,
        {
            isMenuOpen:isNeighborhoodMenuOpen,
            onMenuOpen:onNeighborhoodMenuOpen,
            onMenuClose:onNeighborhoodMenuClose
        }
    );
    useDeleteInput(getCityItem, inputNeighborhood, setNeighborhoodItem, setNeighborhoodName);
    const getColombiaNeighborhoods = useGetColombiaNeighborhoodMenuOption(getCityItem, getColombiaNeighborhoodName);
    return (
          <Modal 
            isOpen={isOpen} 
            onClose={onClose}
            blockScrollOnMount={false}
            isCentered>
            <ModalOverlay />
            <ModalContent
                maxWidth= "500px"
                height= "491px"
                overflow= "visible"
                borderRadius= "3px"
                p= "10px 15px">
              <ModalHeader>
                <Flex
                    width="100%"
                    height="100%"
                    direction="row"
                    alignItems="center"
                    gap="5">
                    <MapPin
                        width="20px"
                        height="20px"
                        color="#495867"
                        strokeWidth="2" />
                    <Text>
                        Ingresa tu ubicación
                    </Text>
                </Flex>
                </ModalHeader>
              <ModalCloseButton 
                    color="#bbbbbb"
                    width="15px"
                    height="15px"
                    top= "33px"
                    right= "25.52px"/>
              <ModalBody>
                    <Text
                        fontSize= "14px"
                        lineHeight= "20px"
                        color= "#4a4a4a"
                        mb= "27px">
                        Ingresa tu ubicación y te mostraremos los productos disponibles con tiempos y costos de entrega precisos.
                    </Text>
                <Stack
                    spacing="10">
                    <Box 
                        position="relative"
                        onClick={onDepartamentMenuOpen}>
                        {
                        (getColombiaStateName != "" || isDepartamentMenuOpen)?
                        <Text
                            position="absolute"
                            bg="white"
                            top="-11px"
                            left="14px"
                            zIndex="1"
                            background= "#fff"
                            fontSize= "14px"
                            color= "#4a4a4a"
                            transition= ".3s"
                            padding= "2px 8px 1px"
                            >
                            Departamento
                        </Text>:
                        <></>}
                        <InputGroup size="md">
                            <Input
                                ref={inputDepartament}
                                height= "48px"
                                type="text"
                                border="1px solid #767676"
                                boxSizing= "border-box"
                                borderRadius= "4px"
                                padding= "16px 90px 15px 15px"
                                outline= "none"
                                fontWeight= "400"
                                fontSize= "16px"
                                lineHeight= "19px"
                                color= "#333"
                                _placeholder={{ color: '#7e849a' }}
                                placeholder="Ingresa un Departamento"
                                onChange={change()}
                                value={getColombiaStateName}
                            />
                            <InputRightElement
                                as="span"
                                top="4%"
                                right="1px"
                                fontSize="16px"
                                transition=".3s"
                                borderRadius="5px"
                                bottom="1px"
                                onClick={clickReset}
                                cursor={(getColombiaStateName != "" || isDepartamentMenuOpen)?"pointer":"auto"}
                            >
                                <Flex
                                    width="100%"
                                    height="100%"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    {(getColombiaStateName == "") ? (
                                        <SearchIcon
                                            width="20px"
                                            height="20px"
                                            color="#bbbbbb"
                                        />
                                    ) : (
                                        <Box
                                            width="20px"
                                            height="20px">
                                                <X
                                                    width="20px"
                                                    height="20px"
                                                    color="#bbbbbb"
                                                />
                                        </Box>
                                    )
                                    }
                                </Flex>
                            </InputRightElement>
                        </InputGroup>
                        <MenuChakra
                            isOpen={isDepartamentMenuOpen}
                            onClose={onDepartamentMenuClose}
                            closeOnSelect={true}
                            >
                            <MenuList
                                minW="422px"
                                maxH="150px"
                                position="absolute"
                                overflowY="scroll"
                                top="48px"
                                pt="0">
                                {getColombiaStates.map((item)=>{
                                    return(
                                        <MenuItem 
                                            cursor="pointer"
                                            fontSize= "10px"
                                            lineHeight= "16px"
                                            transition= ".3s"
                                            padding= "15px 15px 14px"
                                            borderTop= "1.5px solid #fafafa"
                                            borderBottom= "1.5px solid #fafafa"
                                            onClick={click(item)}
                                            bg={
                                                item.keyid != getItem?.keyid?
                                                "#ffffff":
                                                "#f7f7f7"}
                                            borderLeft= {
                                                item.keyid != getItem?.keyid?
                                                "2px solid #fafafa":
                                                "2px solid black"
                                            }
                                            key={item.keyid}
                                            keyid={item.keyid}
                                            onMouseEnter={hover(item)}>
                                            {item.name}
                                        </MenuItem>
                                    );
                                })}
                            </MenuList>
                        </MenuChakra>
                    </Box>
                    <Box 
                        position="relative"
                        onClick={onCityMenuOpen}>
                        {
                        (getColombiaCityName != "" || isCityMenuOpen)?
                        <Text
                            position="absolute"
                            bg="white"
                            top="-11px"
                            left="14px"
                            zIndex="1"
                            background= "#fff"
                            fontSize= "14px"
                            color= "#4a4a4a"
                            transition= ".3s"
                            padding= "2px 8px 1px"
                            >
                            Ciudad
                        </Text>:
                        <></>}
                        <InputGroup size="md">
                            <Input
                                ref={inputCity}
                                height= "48px"
                                type="text"
                                border="1px solid #767676"
                                boxSizing= "border-box"
                                borderRadius= "4px"
                                padding= "16px 90px 15px 15px"
                                outline= "none"
                                fontWeight= "400"
                                fontSize= "16px"
                                lineHeight= "19px"
                                color= "#333"
                                _placeholder={{ color: '#7e849a' }}
                                disabled={getItem == null}
                                placeholder="Ingresa una Ciudad"
                                onChange={cityChange()}
                                value={getColombiaCityName}
                            />
                            <InputRightElement
                                as="span"
                                top="4%"
                                right="1px"
                                fontSize="16px"
                                transition=".3s"
                                borderRadius="5px"
                                bottom="1px"
                                onClick={cityClickReset}
                                cursor={(getColombiaCityName != "" || isCityMenuOpen)?"pointer":"auto"}
                            >
                                <Flex
                                    width="100%"
                                    height="100%"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    {(getColombiaCityName == "") ? (
                                        <SearchIcon
                                            width="20px"
                                            height="20px"
                                            color="#bbbbbb"
                                        />
                                    ) : (
                                        <Box
                                            width="20px"
                                            height="20px">
                                                <X
                                                    width="20px"
                                                    height="20px"
                                                    color="#bbbbbb"
                                                />
                                        </Box>
                                    )
                                    }
                                </Flex>
                            </InputRightElement>
                        </InputGroup>
                        <MenuChakra
                            isOpen={isCityMenuOpen}
                            onClose={onCityMenuClose}
                            closeOnSelect={true}
                            >
                            <MenuList
                                minW="422px"
                                maxH="150px"
                                position="absolute"
                                overflowY="scroll"
                                top="48px"
                                pt="0">
                                {getColombiaCities.map((item)=>{
                                    return(
                                        <MenuItem 
                                            cursor="pointer"
                                            fontSize= "10px"
                                            lineHeight= "16px"
                                            transition= ".3s"
                                            padding= "15px 15px 14px"
                                            borderTop= "1.5px solid #fafafa"
                                            borderBottom= "1.5px solid #fafafa"
                                            onClick={cityClick(item)}
                                            bg={
                                                item.keyid != getCityItem?.keyid?
                                                "#ffffff":
                                                "#f7f7f7"}
                                            borderLeft= {
                                                item.keyid != getCityItem?.keyid?
                                                "2px solid #fafafa":
                                                "2px solid black"
                                            }
                                            key={item.keyid}
                                            keyid={item.keyid}
                                            onMouseEnter={cityHover(item)}>
                                            {item.name}
                                        </MenuItem>
                                    );
                                })}
                            </MenuList>
                        </MenuChakra>
                    </Box>             
                    <Box 
                        position="relative"
                        onClick={onNeighborhoodMenuOpen}>
                        {
                        (getColombiaNeighborhoodName != "" || isNeighborhoodMenuOpen)?
                        <Text
                            position="absolute"
                            bg="white"
                            top="-11px"
                            left="14px"
                            zIndex="1"
                            background= "#fff"
                            fontSize= "14px"
                            color= "#4a4a4a"
                            transition= ".3s"
                            padding= "2px 8px 1px"
                            >
                            Barrio
                        </Text>:
                        <></>}
                        <InputGroup size="md">
                            <Input
                                ref={inputNeighborhood}
                                height= "48px"
                                type="text"
                                border="1px solid #767676"
                                boxSizing= "border-box"
                                borderRadius= "4px"
                                padding= "16px 90px 15px 15px"
                                outline= "none"
                                fontWeight= "400"
                                fontSize= "16px"
                                lineHeight= "19px"
                                color= "#333"
                                _placeholder={{ color: '#7e849a' }}
                                disabled={getCityItem == null}
                                placeholder="Ingresa un Barrio"
                                onChange={neighborhoodChange()}
                                value={getColombiaNeighborhoodName}
                            />
                            <InputRightElement
                                as="span"
                                top="4%"
                                right="1px"
                                fontSize="16px"
                                transition=".3s"
                                borderRadius="5px"
                                bottom="1px"
                                onClick={neighborhoodClickReset}
                                cursor={(getColombiaNeighborhoodName != "" || isNeighborhoodMenuOpen)?"pointer":"auto"}
                            >
                                <Flex
                                    width="100%"
                                    height="100%"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    {(getColombiaNeighborhoodName == "") ? (
                                        <SearchIcon
                                            width="20px"
                                            height="20px"
                                            color="#bbbbbb"
                                        />
                                    ) : (
                                        <Box
                                            width="20px"
                                            height="20px">
                                                <X
                                                    width="20px"
                                                    height="20px"
                                                    color="#bbbbbb"
                                                />
                                        </Box>
                                    )
                                    }
                                </Flex>
                            </InputRightElement>
                        </InputGroup>
                        <MenuChakra
                            isOpen={isNeighborhoodMenuOpen}
                            onClose={onNeighborhoodMenuClose}
                            closeOnSelect={true}
                            >
                            <MenuList
                                minW="422px"
                                maxH="150px"
                                position="absolute"
                                overflowY="scroll"
                                top="48px"
                                pt="0">
                                {getColombiaNeighborhoods.map((item)=>{
                                    return(
                                        <MenuItem 
                                            cursor="pointer"
                                            fontSize= "10px"
                                            lineHeight= "16px"
                                            transition= ".3s"
                                            padding= "15px 15px 14px"
                                            borderTop= "1.5px solid #fafafa"
                                            borderBottom= "1.5px solid #fafafa"
                                            onClick={neighborhoodClick(item)}
                                            bg={
                                                item.keyid != getNeighborhoodItem?.keyid?
                                                "#ffffff":
                                                "#f7f7f7"}
                                            borderLeft= {
                                                item.keyid != getNeighborhoodItem?.keyid?
                                                "2px solid #fafafa":
                                                "2px solid black"
                                            }
                                            key={item.keyid}
                                            keyid={item.keyid}
                                            onMouseEnter={neighborhoodHover(item)}>
                                            {item.name}
                                        </MenuItem>
                                    );
                                })}
                            </MenuList>
                        </MenuChakra>
                    </Box>
                    <Flex
                        width="100%"
                        height="100%"
                        justifyContent="center"
                        alignItems="center">
                        <Button 
                            onClick={saveClick({
                                getStateItem: getItem,
                                getCityItem: getCityItem,
                                getNeighborhoodItem: getNeighborhoodItem,
                                saveState: setUserState,
                                saveCity: setUserCity,
                                saveNeighborhood: setUserNeighborhood,
                                onClose: onClose
                            })}
                            borderRadius= "20px"
                            width= "240px"
                            height= "40px"
                            letterSpacing= "0"
                            disabled={getItem == null || getCityItem == null || getNeighborhoodItem == null}
                            _hover={{}}
                            >
                        Guardar
                        </Button>
                    </Flex>
                </Stack>
              </ModalBody>
            </ModalContent>
          </Modal>
      )
}

function HelpBarMenu({ isMobile }) {
    const { isOpen: isOpenCard, onOpen: onOpenCard, onClose: onCloseCard } = useDisclosure();
    const { isOpen: isOpenHelp, onOpen: onOpenHelp, onClose: onCloseHelp } = useDisclosure();
    const Cards = [
        {
            name: "Tarjeta CMR",
            href: "/"
        },
        {
            name: "Cuenta de ahorros",
            href: "/"
        },
        {
            name: "Oportunidades Únicas",
            href: "/"
        }
    ];
    const Help = [
        {
            name: "Centro de ayuda",
            href: "/"
        },
        {
            name: "Devoluciones y cambios",
            href: "/"
        },
        {
            name: "Horario de tiendas",
            href: "/"
        }
    ];
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
            mr="3vw"
            gap="7">
            <Link
                color="#495867"
                _hover={{ textDecoration: "none" }}>
                Vende Falabella.com
            </Link>
            <MenuChakra
                closeOnSelect={true}
                isLazy
                isOpen={isOpenCard}
                placement="top"
                onMouseEnter={onOpenCard}
                onMouseLeave={onCloseCard}
                cursor="pointer">
                <MenuButton
                    variant="link"
                    fontWeight="normal"
                    color="#495867"
                    fontSize="10px"
                    onMouseEnter={onOpenCard}
                    onMouseLeave={onCloseCard}
                    _hover={{ textDecoration: "none" }}>
                    <Flex
                        width="100%"
                        direction="row">
                        Tarjetas y cuentas
                        <ChevronDown
                            width="10px"
                            height="10px"
                            className="mt-[4px]"
                        />
                    </Flex>
                </MenuButton>
                <MenuList
                    onMouseEnter={onOpenCard}
                    onMouseLeave={onCloseCard}
                    p="1rem">
                    {
                        Cards.map((item) => {
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
                        })
                    }
                </MenuList>
            </MenuChakra>
            <Link
                color="#495867"
                _hover={{ textDecoration: "none" }}>
                Novios
            </Link>
            <MenuChakra
                closeOnSelect={true}
                isLazy
                isOpen={isOpenHelp}
                placement="top"
                onMouseEnter={onOpenHelp}
                onMouseLeave={onCloseHelp}
                cursor="pointer">
                <MenuButton
                    variant="link"
                    fontWeight="normal"
                    color="#495867"
                    fontSize="10px"
                    onMouseEnter={onOpenHelp}
                    onMouseLeave={onCloseHelp}
                    _hover={{ textDecoration: "none" }}>
                    <Flex
                        width="100%"
                        direction="row">
                        Ayuda
                        <ChevronDown
                            width="10px"
                            height="10px"
                            className="mt-[4px]"
                        />
                    </Flex>
                </MenuButton>
                <MenuList
                    onMouseEnter={onOpenHelp}
                    onMouseLeave={onCloseHelp}
                    p="1rem">
                    {
                        Help.map((item) => {
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
                        })
                    }
                </MenuList>
            </MenuChakra>
        </Flex>
    )
}

function AccountBarMenu({ isMobile }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        getUserName,
        getMenuItems,
        isOpenLogin,
        onOpenLogin,
        onCloseLogin
    } = useUserLogin(onClose);
    const cartCount = useShoppingCartNumberItems();
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
                        {getUserName}
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
                            fontSize="1px"
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
                                    {getUserName}
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
                                <MenuGroup>
                                    {getMenuItems.map((item) => {
                                        return (
                                            <LinkRouter
                                                key={uuid()}
                                                to={item.href}
                                                onClick={item.callback}>
                                                <MenuItem
                                                    flexDirection="column"
                                                    justifyContent="flex-start"
                                                    alignItems="flex-start">
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
                                                </MenuItem>
                                            </LinkRouter>
                                        );
                                    })}
                                </MenuGroup>
                                {
                                (defaultUserName == getUserName)?
                                <>
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
                                </>
                                :
                                <></>
                                }
                                 
                            </MenuList>
                        </MenuChakra>
                    </Flex>
                </Box>
                <LoginForm 
                    isOpen={isOpenLogin}
                    onClose={onCloseLogin} />
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