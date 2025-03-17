import { useContext, useState, useEffect } from "react";
import shoppingCartContext from "@/gobal/shoppingCart/shoppingCart.context";
import userContext from "@/gobal/user/user.context"

export const defaultUserName = "Inicia sesión";

export function useShoppingCartNumberItems(){
    const {getCartItems, ...rest} = useContext(shoppingCartContext);
    return getCartItems.length
}

export function useUserLogin(){
    const [ showLoginForm, setShowLoginForm ] = useState(false);
    const defaultUserLinks = [
        {
            name: "Inicia sesión",
            href: "/",
            description: null,
            callback: (e) => {
                e.preventDefault()
                setShowLoginForm(true);
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
            href: "/",
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
        showLoginForm, 
        setShowLoginForm
    };
}