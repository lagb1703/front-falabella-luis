import { useState, useEffect, useContext } from "react";
import { isDevelopment } from "@/pages";
import userContext from "../user/user.context";
import cart from "./mock/cart.mock"

export default function useCart() {
    const [getCartItems, setCartItems] = useState([]);
    const {getUser} = useContext(userContext);
    useEffect(() => {
        window.addEventListener("beforeunload", () => {
            if(getUser && getUser.id) {
                const cartItems = localStorage.getItem("cartItems");
                saveCartItemsByUserId(getUser.id, cartItems);
            }
        });
        const cartItems = localStorage.getItem("cartItems");
        if(cartItems) {
            setCartItems(JSON.parse(cartItems));
        }
    }, []);
    useEffect(() => {
        if(!getUser)
            return;
        (async () => {
            const cartItems = await getCartItemsByUserId(getUser.id);
            setCartItems(cartItems);
        })()
    }, [getUser]);
    useEffect(() => {
        (async () => {
            const cartItems = JSON.stringify(getCartItems);
            localStorage.setItem("cartItems", cartItems);
        })()
    }, [getCartItems]);
    return {
        getCartItems,
        setCartItems
    }
}

async function getCartItemsByUserId(userId){
    if(isDevelopment)
        return cart;
    try {
        const response = await fetch(`productos/cart/${userId}`);
        if (!response.ok)
            throw new Error("Error al obtener el carrito");
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error(error);
        return [];
    }
}

async function saveCartItemsByUserId(userId, cartItems){
    if(isDevelopment)
        return cart;
    try {
        const response = await fetch(`productos/cart?id=${userId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: cartItems
        });
        if (!response.ok)
            throw new Error("Error al guardar el carrito");
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error(error);
        return [];
    }
}