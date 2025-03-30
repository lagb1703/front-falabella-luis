import { 
    useContext, 
    useState, 
    useEffect, 
    useCallback,
    useRef
} from "react";
import shoppingCartContext from "@/gobal/shoppingCart/shoppingCart.context";
import userContext from "@/gobal/user/user.context"
import { useDisclosure } from "@chakra-ui/react";
import { v4 as uuid } from "uuid";
import colombiaStates from "./mocks/states.mock"
import colombiaCity from "./mocks/city.mock"
import colombiaNeighborhood from "./mocks/neighborhood.mock"
import { useLocation } from "react-router";

export const defaultUserName = "Inicia sesión";

export const defaultUserLocation = "Ingresa tu locación";

export function useShoppingCartNumberItems(){
    const {getCartItems, ...rest} = useContext(shoppingCartContext);
    return getCartItems.length
}

export function useUserLogin(onCloseUserMenu){
    const {
        isOpen: isOpenLogin, 
        onOpen: onOpenLogin, 
        onClose: onCloseLogin
    } = useDisclosure();
    useEffect(()=>{
        onCloseUserMenu();
    }, [isOpenLogin]);
    const defaultUserLinks = [
        {
            name: "Inicia sesión",
            href: "/",
            description: null,
            callback: (e) => {
                e.preventDefault()
                onOpenLogin(e);
            } 
        },
        {
            name: "Regístrate",
            href: "/registration",
            description: null,
            callback: null
        },
        {
            name: "Mi cuenta",
            href: "/",
            description: "Accede tus compras, tu perfil y más.",
            callback: null
        }
    ];
    const {getUser, setUser} = useContext(userContext);
    const userLinks = [
        {
            name: "Mi cuenta",
            href: "/myAccount",
            description: null,
            callback: null
        },
        {
            name: "Mis CMR puntos",
            href: "/",
            description: null,
            callback: null
        },
        {
            name: "Mis Compras",
            href: "/",
            description: null,
            callback: null
        },
        {
            name: "Cerrar sesión",
            href: "/",
            description: null,
            callback: (e)=>{
                e.preventDefault();
                setUser(null);
            }
        }
    ];
    const [getUserName, setUserName] = useState(defaultUserName);
    const [getMenuItems, setMenuItems] = useState(defaultUserLinks);
    useEffect(()=>{
        if(getUser){
            setUserName(getUser.nombres);
            setMenuItems(userLinks);
            return;
        }
        setUserName(defaultUserName);
        setMenuItems(defaultUserLinks)
    }, [getUser]);
    return {
        getUserName,
        getMenuItems,
        isOpenLogin,
        onOpenLogin,
        onCloseLogin
    };
}

export function useUserLocationChance(){
    const {
        getUserState,
        setUserState,
        getUserCity,
        setUserCity,
        getUserNeighborhood,
        setUserNeighborhood
    } = useContext(userContext);
    const {isOpen: isLocationModalOpen, onClose: onLocationModalClose, onOpen: onLocationModalOpen} = useDisclosure();
    useEffect(()=>{
        if(!isLocationModalOpen){
            document.body.style.overflowY = 'scroll';
            return
        }
        document.body.style.overflowY = 'hidden';
    }, [isLocationModalOpen]);
    return{
        getUserState,
        setUserState,
        getUserCity,
        setUserCity,
        getUserNeighborhood,
        setUserNeighborhood,
        isLocationModalOpen,
        onLocationModalClose,
        onLocationModalOpen
    }
}

export function useAdministrateMenu(){
    const {
        isOpen, 
        onOpen, 
        onClose
    } = useDisclosure();
    const inputRef = useRef();
    useEffect(()=>{
        if(isOpen)
            setTimeout(() => {
                if (inputRef.current) {
                    inputRef.current.focus();
                }
            }, 10);
    }, [isOpen]);
    return{
        isOpen, 
        onOpen, 
        onClose,
        inputRef
    }

}

export function useGetColombiaStatesMenuOption(getColombiaStateName){
    const [getColombiaStates, setColombiaStates] = useState([]);
    useEffect(()=>{
        setColombiaStates(colombiaStates.map(item => {
            item.keyid = uuid()
            return item;
        }).filter((item)=>item.name.toLowerCase().includes(getColombiaStateName.toLowerCase())));
    }, [getColombiaStateName])
    return getColombiaStates
}

export function useGetColombiaCityMenuOption(getColombiaStateItem, getColombiaCityName){
    const [getColombiaCity, setColombiaCity] = useState([]);
    useEffect(()=>{
        setColombiaCity(colombiaCity.map(item => {
            item.keyid = uuid()
            return item;
        }).filter(
            (item)=>{
                return (
                    item.name.toLowerCase().includes(getColombiaCityName.toLowerCase()) && 
                    item.state_id == getColombiaStateItem?.state_id
                )
            }
            )
        );
    }, [getColombiaStateItem, getColombiaCityName])
    return getColombiaCity
}

export function useGetColombiaNeighborhoodMenuOption(getColombiaCityItem, getColombiaNeighborhoodName){
    const [getColombiaNeighborhood, setColombiaNeighborhood] = useState([]);
    useEffect(()=>{
        setColombiaNeighborhood(colombiaNeighborhood.map(item => {
            item.keyid = uuid()
            return item;
        }).filter(
            (item)=>{
                return (
                    item.name.toLowerCase().includes(getColombiaNeighborhoodName.toLowerCase()) && 
                    item.city_id == getColombiaCityItem?.city_id
                )
            }
            )
        );
    }, [getColombiaCityItem, getColombiaNeighborhoodName])
    return getColombiaNeighborhood;
}

export function useDeleteInput(getItem, inputRef, setOtherItem, setName){
    useEffect(()=>{
        if(getItem == null && inputRef.current){
            inputRef.current.value = "";
            setOtherItem(null);
            setName("");
        }
    }, [getItem]);
}

export function useItemEvents(inputRef, setGlobalItem, {isMenuOpen,onMenuOpen,onMenuClose}){
    const [getItem, setItem] = useState(null);
    const [getClose, setClose] = useState(true);
    const [getName, setName] = useState("");
    useEffect(()=>{
        if(inputRef.current)
            setName(inputRef.current.value);
    }, [isMenuOpen]);
    useEffect(()=>{
        onMenuClose();
    }, [getClose]);
    const hover = useCallback((item)=>{
        return () => {
            setItem(item);
        }
    }, [])
    const change = useCallback(()=>{
        return (e)=>{
            e.preventDefault();
            setName(e.target.value);
            if(!isMenuOpen){
                onMenuOpen(e);
            }
        }
    }, []);
    const click = useCallback((item)=>{
        return (e)=>{
            e.preventDefault();
            inputRef.current.value = item.name;
            setItem(item);
            setName(item.name);
            setClose(op => !op);
        }
    }, [])
    const clickReset = useCallback((e)=>{
        e.preventDefault();
        inputRef.current.value = "";
        setItem(null);
        //setGlobalItem(null);
        setName("");
        setClose(op => !op);
    }, [])
    return {
        getItem,
        setItem,
        setName,
        hover,
        getName,
        change,
        click,
        clickReset
    }
}

export function saveClick(
    {
        getStateItem, 
        getCityItem,
        getNeighborhoodItem,
        saveState,
        saveCity,
        saveNeighborhood,
        onClose
    }){
        return (e)=>{
            e.preventDefault();
            if(!getStateItem)
                return
            saveState(getStateItem)
            if(!getCityItem)
                return
            saveCity(getCityItem)
            if(!getNeighborhoodItem)
                return
            saveNeighborhood(getNeighborhoodItem)
            onClose(e);
        }
}