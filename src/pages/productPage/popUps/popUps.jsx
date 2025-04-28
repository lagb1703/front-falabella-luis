import { Link as LinkRouter } from "react-router-dom"
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
} from "./popUps.service"
import { v4 as uuid } from "uuid";

export function DespachoDomicilio(
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