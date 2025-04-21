import { useState, useEffect, useContext, useCallback } from "react";
import shoppingCartContext from "@/gobal/shoppingCart/shoppingCart.context";

export function useProductCart(productId) {
    const { getCartItems, saveCartItem } = useContext(shoppingCartContext);
    const [getAmount, setAmount] = useState(0);
    useEffect(() => {
        const product = getCartItems.find((product) => product.producto_id === productId);
        if (product) {
            setAmount(product.cantidad);
        }
    }, [getCartItems, productId]);
    const addAmount = useCallback((e) => {
        e.preventDefault();
        if (getAmount < 20) {
            setAmount((prevAmount) => prevAmount + 1);
            saveCartItem({ producto_id: productId }, 1);
        }
    }, [getAmount]);
    const removeAmount = useCallback((e) => {
        e.preventDefault();
        if (getAmount > 1) {
            setAmount((prevAmount) => prevAmount - 1);
            saveCartItem({ producto_id: productId }, -1);
        }
    }, [getAmount]);
    return {
        getAmount,
        removeAmount,
        addAmount
    }
}

export const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO').format(price);
};