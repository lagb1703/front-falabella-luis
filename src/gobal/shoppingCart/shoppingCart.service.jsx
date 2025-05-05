import {
    useState,
    useEffect,
    useContext,
    useCallback,
} from "react";
import { isDevelopment, backendURL } from "@/pages";
import userContext from "@/gobal/user/user.context"
import cart from "./mock/cart.mock"

function useCartItems() {
    const [getCartItems, setCartItems] = useState([]);
    const { getUser } = useContext(userContext);
    const saveCartItem = useCallback(async (product, amount = 1) => {
        if (!product)
            return;
        const cartItems = [...getCartItems];
        const productIndex = cartItems.findIndex((item) => item.producto_id === product.producto_id);
        if (!getUser) {
            if (productIndex === -1) {
                cartItems.push({
                    ...product,
                    cantidad: amount
                });
            } else {
                cartItems[productIndex].cantidad += amount;
            }
        } else {
            const result = await saveCartItemsByUserIdAndProductId(getUser["usuario_id"], product.producto_id, amount);
            if (productIndex === -1) {
                cartItems.push({
                    ...result,
                    producto_id: product.producto_id,
                });
            } else {
                cartItems[productIndex].cantidad += amount;
            }
        }
        if (productIndex != -1) {
            if (cartItems[productIndex].cantidad <= 0)
                cartItems.splice(productIndex, 1);
        }
        setCartItems(cartItems);
    }, [getCartItems, setCartItems, getUser])
    useEffect(() => {
        const cartItems = localStorage.getItem("cartItems");
        if (cartItems) {
            setCartItems(JSON.parse(cartItems));
        }
    }, []);
    useEffect(() => {
        (async () => {

            const cartItems = await getCartItemsByUserId(getUser?.usuario_id);
            setCartItems(cartItems);
        })()
    }, [getUser]);
    useEffect(() => {
        const cartItems = JSON.stringify(getCartItems);
        localStorage.setItem("cartItems", cartItems);
    }, [getCartItems]);
    return {
        getCartItems,
        saveCartItem
    }
}

function useCartDetails(products) {
    const [getCartProductsDetails, setCartProductosdetails] = useState([]);
    const getProductsDetails = useCallback(async () => {
        const cartItems = await getAllProductsDetails(
            products
        );
        setCartProductosdetails(cartItems.map((item) => {
            return {
                ...item,
                cantidad: products.find(i => i.producto_id == item["_id"]).cantidad
            }
        }));
    }, [products.length]);
    return {
        getCartProductsDetails,
        getProductsDetails
    }
}

export default function useCart() {
    const cartItems = useCartItems();
    return {
        ...cartItems,
        ...useCartDetails(cartItems.getCartItems),
        getAllProductsDetails
    }
}

async function getCartItemsByUserId(userId) {
    if (isDevelopment)
        return cart;
    try {
        if (!userId)
            return [];
        const response = await fetch(`${backendURL}products/cart/${userId}`);
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

async function saveCartItemsByUserIdAndProductId(userId, productId, amount) {
    if (isDevelopment)
        return null;
    try {
        const response = await fetch(`${backendURL}products/cart/${userId}?product=${productId}&amount=${amount}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
        });
        if (!response.ok)
            throw new Error("Error al guardar el carrito");
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error(error);
        return null;
    }
}

async function getAllProductsDetails(products) {
    if (products?.length === 0)
        return [];
    if (isDevelopment)
        return [];
    try {
        const response = await fetch(`${backendURL}products/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(products.map(i => i.producto_id))
        });
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