import { useContext } from "react";
import shoppingCartContext from "@/gobal/shoppingCart/shoppingCart.context";

export function useShoppingCartNumberItems(){
    const {getCartItems, ...rest} = useContext(shoppingCartContext);
    return getCartItems.length
}