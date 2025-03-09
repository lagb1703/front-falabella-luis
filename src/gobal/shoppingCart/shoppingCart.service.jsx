import { useState, useEffect } from "react";

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

export default function useCart() {
    const [getCartItems, setCartItems] = useState([]);
    useEffect(() => {
        (async () => {
            const Authorization = getCookie('Authorization');
            if(Authorization)
                console.log("Se estan mandando los items");
        })()
    }, [getCartItems.length]);
    return {
        getCartItems,
        setCartItems
    }
}